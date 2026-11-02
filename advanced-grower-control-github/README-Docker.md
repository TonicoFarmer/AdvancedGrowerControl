# ASTRAYA Plataforma Agronômica — Docker

## Serviços

- `app`: aplicação React/Vite compilada e servidor Express em Node.js, publicada na porta configurada em `APP_PORT` (padrão `3000`).
- `db`: PostgreSQL 16, acessível apenas pela rede interna do Compose.
- `postgres_data`: volume nomeado para manter os dados do PostgreSQL após recriações dos containers.

## Iniciar

1. Instale Docker Engine e o plugin Docker Compose.
2. Na raiz do projeto — a mesma pasta que contém `compose.yaml` — copie `.env.example` para `.env` e edite esse arquivo:

   ```bash
   cp .env.example .env
   nano .env
   ```

3. No `.env`, defina uma senha única e forte em `DB_PASSWORD`. Informe `GEMINI_API_KEY` para habilitar o assistente de IA.
4. **Defina o usuário administrador inicial no próprio `.env`**, na raiz do projeto. Descomente ou acrescente estas três linhas e substitua pelos seus dados:

   ```env
   ADMIN_NAME=Nome do Administrador
   ADMIN_EMAIL=seu-email@dominio.com
   ADMIN_PASSWORD=coloque-uma-senha-forte-com-12-caracteres-ou-mais
   ```

   `ADMIN_EMAIL` será o usuário usado na tela de login; `ADMIN_PASSWORD` será a senha inicial. Não é necessário inserir esse usuário manualmente no PostgreSQL: o servidor cria a conta com role `admin` na primeira inicialização. Se o email já estiver cadastrado, a inicialização promove essa conta, mas mantém a senha que ela já tinha. Sem essas variáveis, o cadastro público cria contas `reader`; um administrador pode promovê-las pelo painel.
5. Se publicar por HTTPS atrás de um proxy, defina `COOKIE_SECURE=true`. Em HTTP local, mantenha `false`.
6. Inicie os serviços:

   ```bash
   docker compose up -d --build
   ```

7. Abra `http://localhost:3000` (ou a porta definida em `APP_PORT`) e entre com o `ADMIN_EMAIL` e `ADMIN_PASSWORD` definidos no `.env`. Para consultar a saúde da aplicação e conexão com o banco, use `http://localhost:3000/api/health`.

Comandos úteis:

```bash
docker compose ps
docker compose logs -f app db
docker compose down
```

`docker compose down` preserva o volume de dados. Para apagar também os dados persistidos do PostgreSQL, é necessário executar explicitamente `docker compose down -v` — essa ação é destrutiva.

## Instalação e atualização em produção

Para os procedimentos operacionais completos — primeira instalação, atualização, backup, uso de `rsync`, rebuild, migração de schema e rollback — siga o [Runbook de instalação e atualização](RUNBOOK-IMPLANTACAO.md).

Os parâmetros definidos para a VPS são: ZIP em `/tmp/arquivo.zip` e aplicação em `/opt/plataforma-agronomica`. Na atualização, o runbook extrai o pacote em staging, mostra primeiro o `rsync --dry-run`, preserva `.env` e o volume `astraya_agronomica_postgres_data`, e evita `rsync --delete` e `docker compose down -v`. Gere e verifique o dump do banco antes de sincronizar arquivos.

O rebuild de produção é feito com `docker compose build app` e `docker compose up -d app`. O servidor aplica automaticamente o `SCHEMA_SQL` ao iniciar. A versão atual cria `app_published_content` com `CREATE TABLE IF NOT EXISTS`; não é necessário executar `CREATE TABLE` manualmente. Use scripts SQL manuais somente para migrações versionadas que não possam ser aplicadas com segurança pelo bootstrap, conforme o runbook.

## Autenticação e dados por usuário

O app oferece cadastro e login. Senhas são armazenadas com `scrypt`; a sessão usa cookie `HttpOnly` e token aleatório, persistindo apenas seu hash no PostgreSQL. A role é definida e validada no servidor; não pode ser elevada pelo navegador. A migração do schema transforma contas antigas com role `user` em `operator`, mantendo a capacidade de edição dos próprios dados.

### Perfis e painel administrativo

- **Admin:** botão **Painel** no cabeçalho; cria contas, atribui perfis, ativa/desativa usuários, redefine senhas e abre os dados de qualquer conta para leitura ou edição. A desativação encerra sessões e preserva os registros. O administrador também pode excluir outras contas permanentemente; a operação apaga os dados privados e sessões, mas mantém conteúdo já publicado sem a associação ao usuário. A interface impede excluir a própria conta ou a conta cujo workspace está aberto, e o servidor protege o último administrador ativo. A conta configurada como administrador inicial em `ADMIN_EMAIL`/`ADMIN_PASSWORD` deve ter essas variáveis removidas do `.env` e o serviço recriado antes da exclusão, para não ser recriada no próximo início.
- **Operador:** cria, lê, edita e exclui registros apenas da própria conta. Não administra usuários nem os catálogos reservados ao admin.
- **Leitor:** consulta somente os próprios dados. Alterações são bloqueadas no servidor, mesmo que alguém tente chamar a API diretamente.
- **Cadastro público:** toda nova conta começa como `reader`; o admin pode alterá-la para `operator` no painel. Usuários criados pelo formulário do painel recebem o perfil selecionado.

### Publicação de conteúdo compartilhado

O administrador publica explicitamente o módulo aberto pelo botão **Publicar para operadores e leitores**. A publicação abrange os catálogos de deficiências, pragas e bioinsumos; os registros e imagens de cultivo/ciclos; os eventos de manutenção; os registros MIP; e os documentos da Biblioteca Drive. As publicações ficam em `app_published_content`, separadas de `app_user_data`, com autor e data da última publicação. Cada ação que publica várias coleções (por exemplo, Cultivo e Ciclos) é transacional.

Operadores e leitores consultam o conteúdo publicado em modo somente leitura. Registros pessoais não são enviados automaticamente ao acervo compartilhado; itens pessoais compatíveis continuam separados no workspace de cada conta. O botão só aparece para o administrador no próprio workspace, e o servidor exige sessão administrativa para gravar publicações, mesmo que alguém tente chamar a API diretamente. Módulos somente de consulta ou ferramentas temporárias sem persistência (como cálculos de solo e meteorologia) não têm ação de publicação.

Ao subir a nova versão, o servidor ajusta o schema automaticamente: cria o campo de status e converte o role antigo `user` para `operator`, preservando contas e registros existentes. Essa migração não exige apagar nem recriar o volume PostgreSQL.

As coleções da aplicação são armazenadas em `app_user_data` com chave composta pelo dono dos dados e nome da coleção. Operadores e leitores só acessam o próprio workspace. A identidade efetiva vem da sessão; a rota aceita alvo diferente exclusivamente para um admin autenticado, para suportar o painel. O tema visual continua como preferência local.

Na primeira autenticação neste navegador, se a conta ainda não tiver coleções no banco e o navegador não estiver marcado como pertencente a outra conta, os dados legados de `localStorage`/IndexedDB são enviados em uma única operação transacional para essa conta. A cópia local é mantida como contingência. Se trocar para uma conta diferente no mesmo navegador, os dados locais da conta anterior não são importados; o cache é substituído pelo conteúdo da conta autenticada.

Após a carga inicial, alterações são gravadas automaticamente no PostgreSQL e também mantidas localmente como cache. O endpoint `/api/health` verifica a conexão com o banco. A aplicação mantém coleções como JSONB, com limite de 20 MB por coleção; a importação legada agregada também tem limite de 20 MB. Fotos já armazenadas como base64 contam para esses limites. Como cada gravação substitui uma coleção inteira, edições simultâneas da mesma conta e coleção em mais de um navegador são do tipo “última gravação vence”; use uma sessão de edição por conta ou atualize a página antes de editar no outro dispositivo.

Por segurança, a porta do PostgreSQL não é publicada no host. A aplicação acessa o serviço pelo nome `db` dentro da rede Docker.

## Backup do PostgreSQL

Para gerar um dump lógico:

```bash
docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB"' > astraya_agronomica.sql
```

Para restaurar em uma instalação já inicializada, faça primeiro um backup do estado atual e então:

```bash
cat astraya_agronomica.sql | docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

Guarde `.env` e dumps fora do repositório e com permissões restritas.
