# Runbook de instalação e atualização — Plataforma Agronômica ASTRAYA

Este documento descreve a primeira instalação e a atualização da aplicação em Docker Compose na VPS.

## Parâmetros fixos deste procedimento

- ZIP recebido no servidor: `/tmp/arquivo.zip`

- Diretório da aplicação: `/opt/plataforma-agronomica`

- Raiz do projeto dentro do ZIP: `ASTRAYA---Plataforma-Agronomica-main/`

- Serviços Compose: `app` e `db`

- Volume PostgreSQL nomeado: `astraya_agronomica_postgres_data`

- Porta publicada padrão: `3000` (ajuste as verificações se `APP_PORT` tiver outro valor)

Execute os comandos como `root` ou após `sudo -i`. Não execute `docker compose down -v`, não apague o volume e não use `rsync --delete` neste runbook.

## 1. Primeira instalação

### 1.1 Pré-requisitos e validação

Instale Docker Engine, Docker Compose v2 e `rsync`, `unzip`, `curl` e `openssl` no servidor. Confirme que o ZIP foi enviado para `/tmp/arquivo.zip` e que não há uma instalação prévia no caminho de destino. Se o diretório ou volume já existir, pare e confirme se se trata de uma instalação anterior antes de continuar.

```bash
set -euo pipefail
ZIP=/tmp/arquivo.zip
APP_DIR=/opt/plataforma-agronomica
STAGE="$(mktemp -d /tmp/astraya-install.XXXXXX)"

unzip -t "$ZIP" >/dev/null
unzip -q "$ZIP" -d "$STAGE"
COMPOSE_FILE="$(find "$STAGE" -type f -name compose.yaml -print -quit)"
if [ -z "$COMPOSE_FILE" ]; then
  echo "Não encontrei compose.yaml dentro do ZIP." >&2
  find "$STAGE" -maxdepth 4 -type f -print >&2
  exit 1
fi
SRC="${COMPOSE_FILE%/compose.yaml}"
test -f "$SRC/compose.yaml"
test -f "$SRC/Dockerfile"
test -f "$SRC/.env.example"

if [ -e "$APP_DIR/compose.yaml" ] || [ -e "$APP_DIR/.env" ]; then
  echo "Já existe uma instalação ou .env em $APP_DIR; interrompendo para evitar sobrescrita." >&2
  exit 1
fi
if [ -d "$APP_DIR" ] && [ -n "$(find "$APP_DIR" -mindepth 1 -maxdepth 1 -print -quit)" ]; then
  echo "O diretório $APP_DIR não está vazio; revise-o antes da primeira instalação." >&2
  exit 1
fi
if docker volume inspect astraya_agronomica_postgres_data >/dev/null 2>&1; then
  echo "O volume astraya_agronomica_postgres_data já existe; confirme se contém dados antes de continuar." >&2
  exit 1
fi

mkdir -p "$APP_DIR"
rsync -a --checksum --itemize-changes "$SRC/" "$APP_DIR/"
```

### 1.2 Configurar o ambiente

Crie o `.env` a partir do exemplo e restrinja suas permissões. Gere senhas novas; não mantenha os valores de exemplo. Os comandos `openssl rand -hex 32` geram valores seguros para copiar ao arquivo.

```bash
cd /opt/plataforma-agronomica
cp .env.example .env
chmod 600 .env
openssl rand -hex 32
nano .env
```

Preencha pelo menos `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `APP_PORT` e as credenciais do primeiro administrador (`ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`). A senha de administrador deve ter no mínimo 12 caracteres. Informe `GEMINI_API_KEY` se o assistente de IA for usado. Defina `COOKIE_SECURE=true` quando a aplicação for acessada por HTTPS; em HTTP local, use `false`. Preserve a mesma configuração de `APP_PORT` que será usada pelo proxy reverso.

O servidor cria o primeiro usuário `admin` na primeira inicialização, quando as variáveis `ADMIN_*` estão configuradas. Se o e-mail já existir, ele promove essa conta, mas mantém a senha já cadastrada. Depois de iniciar, entre com esse usuário e confirme o acesso ao painel administrativo. Guarde o `.env` fora do repositório e não o envie junto com o ZIP.

### 1.3 Iniciar e verificar

```bash
cd /opt/plataforma-agronomica
docker compose config -q
docker compose up -d --build
docker compose ps
docker compose logs --tail=100 app db
curl -fsS http://127.0.0.1:3000/api/health
```

A resposta de `/api/health` deve indicar que o banco está conectado. Confirme também no proxy reverso e no navegador que a tela de login abre. Se a aplicação usa outra porta, substitua `3000` na verificação pelo valor configurado em `APP_PORT`.

O Compose cria o volume `astraya_agronomica_postgres_data`. Não o remova ao atualizar ou recriar os containers.

## 2. Atualização de uma instalação existente

### 2.1 Pré-checagens e cópias de segurança

Confirme que o ZIP novo está em `/tmp/arquivo.zip`, que a aplicação atual responde e que o banco está acessível. O backup abaixo fica em `/root/astraya-backups`, fora do diretório da aplicação. Ele inclui um dump PostgreSQL, uma cópia do código anterior e uma cópia restrita do `.env`.

```bash
set -euo pipefail
APP_DIR=/opt/plataforma-agronomica
BACKUP_DIR=/root/astraya-backups
STAMP="$(date +%Y%m%d-%H%M%S)"
ZIP=/tmp/arquivo.zip

cd "$APP_DIR"
test -f compose.yaml
test -f .env
test -s "$ZIP"
docker compose ps
curl -fsS http://127.0.0.1:3000/api/health

install -d -m 700 "$BACKUP_DIR"
umask 077
docker compose exec -T db sh -c 'pg_dump -Fc -U "$POSTGRES_USER" -d "$POSTGRES_DB"' \
  > "$BACKUP_DIR/agronomica-pre-update-$STAMP.dump"
test -s "$BACKUP_DIR/agronomica-pre-update-$STAMP.dump"
sha256sum "$BACKUP_DIR/agronomica-pre-update-$STAMP.dump" \
  > "$BACKUP_DIR/agronomica-pre-update-$STAMP.dump.sha256"
cp -a .env "$BACKUP_DIR/plataforma-agronomica-$STAMP.env"
tar --exclude='./.env' --exclude='./node_modules' --exclude='./dist' \
  -czf "$BACKUP_DIR/plataforma-agronomica-$STAMP.tar.gz" -C /opt plataforma-agronomica
chmod 600 "$BACKUP_DIR"/*
```

Se o serviço `db` não estiver saudável, ou se o dump/cópia falhar, interrompa a atualização e resolva o problema antes de copiar arquivos. Não troque `DB_NAME`, `DB_USER` ou `DB_PASSWORD` de uma instalação existente sem um procedimento planejado para o banco. Alterar `DB_PASSWORD` apenas no `.env` não troca a senha já armazenada pelo PostgreSQL.

### 2.2 Extrair em staging e revisar o `rsync`

O conteúdo do ZIP é extraído em uma pasta temporária; a raiz do projeto é validada antes da sincronização. Primeiro rode o `rsync` em modo de simulação e revise a lista. Ele atualiza/adiciona arquivos modificados, preserva o `.env`, ignora os artefatos locais e **não apaga** arquivos de destino.

```bash
STAGE="$(mktemp -d /tmp/astraya-update.XXXXXX)"
unzip -t /tmp/arquivo.zip >/dev/null
unzip -q /tmp/arquivo.zip -d "$STAGE"
COMPOSE_FILE="$(find "$STAGE" -type f -name compose.yaml -print -quit)"
if [ -z "$COMPOSE_FILE" ]; then
  echo "Não encontrei compose.yaml dentro do ZIP." >&2
  find "$STAGE" -maxdepth 4 -type f -print >&2
  exit 1
fi
SRC="${COMPOSE_FILE%/compose.yaml}"
APP_DIR=/opt/plataforma-agronomica
test -f "$SRC/compose.yaml"
test -f "$SRC/server.ts"
test -f "$APP_DIR/.env"

rsync -a --dry-run --checksum --itemize-changes \
  --exclude='/.env' --exclude='/node_modules/' --exclude='/dist/' \
  "$SRC/" "$APP_DIR/"
```

Se a lista mostrar o conteúdo esperado, execute a mesma sincronização sem `--dry-run`. Não acrescente `--delete`: isso poderia remover arquivos de runtime ou conteúdo não incluído no ZIP. Se uma versão deixar de usar um arquivo antigo, revise-o e remova-o explicitamente somente depois de conferir o backup e o diff.

```bash
rsync -a --checksum --itemize-changes \
  --exclude='/.env' --exclude='/node_modules/' --exclude='/dist/' \
  "$SRC/" "$APP_DIR/"
chmod 600 "$APP_DIR/.env"
```

### 2.3 Rebuild, migração automática e verificação

A imagem `app` contém o build de produção; não é necessário instalar Node/npm no host. Faça o rebuild do serviço da aplicação e recrie-o, sem parar ou recriar deliberadamente o PostgreSQL:

```bash
cd /opt/plataforma-agronomica
docker compose config -q
docker compose build app
docker compose up -d app
docker compose ps
docker compose logs --tail=150 app db
curl -fsS http://127.0.0.1:3000/api/health
```

O servidor executa `initializeDatabase()` antes de começar a atender: aplica o `SCHEMA_SQL` e as alterações aditivas definidas no código. Para esta versão, isso cria a tabela `app_published_content` com `CREATE TABLE IF NOT EXISTS`; portanto, **não rode um `CREATE TABLE` manual duplicado**. A criação da tabela é automática no primeiro início da nova imagem, e os dados antigos em `app_user_data` e o volume PostgreSQL são preservados.

Verifique a tabela nova após a aplicação iniciar:

```bash
docker compose exec -T db sh -c \
  'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\\d+ app_published_content"'
```

O comando deve descrever `public.app_published_content`. Confirme também nos logs a mensagem `PostgreSQL schema initialized and available.` e a resposta de saúde com banco conectado. Se a tabela não aparecer, ou se os logs mostrarem `PostgreSQL schema initialization failed`, **pare aqui**: preserve backups e logs, confira conectividade/credenciais e corrija a versão antes de tentar comandos SQL manuais.

Depois da verificação, remova somente a pasta temporária da extração:

```bash
rm -rf "$STAGE"
```

Faça uma navegação básica no sistema, teste login e confira o painel. A tabela nova não publica dados por si só: o administrador deve abrir cada módulo e acionar **Publicar para operadores e leitores** para compartilhar sua versão.

## 3. Procedimento para novas tabelas e migrações futuras

### 3.1 Tabela nova com criação automática no startup (padrão deste projeto)

Para uma tabela nova e aditiva, o procedimento padrão é:

1. Adicionar o DDL em `SCHEMA_SQL` no `server.ts`, usando `CREATE TABLE IF NOT EXISTS`, constraints/relacionamentos e índices necessários. Se houver uma lista de coleções permitidas, atualizar também a validação correspondente no servidor e no cliente.

1. Rodar `npm run lint` e `npm run build` antes de empacotar.

1. Atualizar pelo processo da seção 2, mantendo o backup e executando `docker compose up -d app`.

1. O bootstrap do servidor executa o DDL ao iniciar. Conferir logs e a tabela com `\\d+ nome_da_tabela` no `psql` do serviço `db`.

1. Testar a aplicação e as permissões. Não executar `docker compose down -v` nem criar uma tabela manualmente se o DDL já estiver em `SCHEMA_SQL`.

Esta versão segue esse padrão para `app_published_content`; a tabela é criada pelo servidor automaticamente.

### 3.2 Mudança que exige script SQL manual

Transformações de dados, renomeações, backfills ou alterações que não possam ser expressas com segurança como DDL idempotente no bootstrap devem vir acompanhadas de um arquivo versionado de migração no projeto e de instruções específicas de ordem/rollback. Antes de executá-lo: faça dump, revise o SQL, defina janela de manutenção e confirme compatibilidade com a versão da aplicação. Execute com `ON_ERROR_STOP` para abortar no primeiro erro:

```bash
cd /opt/plataforma-agronomica
# Exemplo de forma; use apenas o arquivo de migração fornecido para aquela versão.
test -f migrations/NNN_descricao.sql
docker compose exec -T db sh -c \
  'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"' \
  < migrations/NNN_descricao.sql
```

O diretório `migrations/` e esse mecanismo manual só devem ser usados quando forem criados para a migração em questão; **não existe um executor automático de arquivos SQL versionados neste projeto**. Cada migração manual precisa registrar claramente se pode ser repetida e como reverter. Não improvise SQL em produção nem use um dump inteiro como migração.

## 4. Falha após atualização e reversão

Se o app não ficar saudável após o rebuild, consulte `docker compose logs --tail=200 app db` e preserve o estado do banco. Para retornar ao código anterior, selecione o arquivo `plataforma-agronomica-AAAAMMDD-HHMMSS.tar.gz` criado na seção 2.1 e substitua o nome de exemplo abaixo pelo timestamp correto. O comando restaura somente os arquivos do código, excluindo o `.env`, `node_modules` e `dist`.

```bash
set -euo pipefail
BACKUP_CODE=/root/astraya-backups/plataforma-agronomica-AAAAMMDD-HHMMSS.tar.gz
ROLLBACK_STAGE="$(mktemp -d /tmp/astraya-rollback.XXXXXX)"
tar -xzf "$BACKUP_CODE" -C "$ROLLBACK_STAGE"
SRC="$ROLLBACK_STAGE/plataforma-agronomica"
APP_DIR=/opt/plataforma-agronomica
test -f "$SRC/compose.yaml"
rsync -a --checksum --itemize-changes \
  --exclude='/.env' --exclude='/node_modules/' --exclude='/dist/' \
  "$SRC/" "$APP_DIR/"
cd "$APP_DIR"
docker compose config -q
docker compose build app
docker compose up -d app
docker compose logs --tail=150 app db
curl -fsS http://127.0.0.1:3000/api/health
rm -rf "$ROLLBACK_STAGE"
```

A nova tabela aditiva pode permanecer: a versão anterior simplesmente não a utiliza. Se o `.env` foi alterado durante a tentativa, compare-o com a cópia de segurança e restaure-o conscientemente antes do rebuild.

Restaurar o dump PostgreSQL altera dados e pode sobrescrever mudanças feitas após o backup; não faça isso como primeira tentativa de rollback. Use restauração somente após avaliar o impacto, confirmar o arquivo correto e aceitar a perda de dados posteriores ao horário do dump. Nunca use `docker compose down -v` como forma de reversão.

## 5. Regras de segurança resumidas

- Não envie `.env`, senha, dump ou backup dentro do ZIP/repositório.

- Faça backup antes de cada atualização e guarde-o com permissão restrita fora de `/opt/plataforma-agronomica`.

- Use `rsync` com `--dry-run` para revisar e não use `--delete` neste procedimento.

- Preserve `.env`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, a configuração do proxy e o volume `astraya_agronomica_postgres_data`.

- Não publique dados com `docker compose down -v`, `docker volume rm` ou remoção manual de diretórios do Docker.
