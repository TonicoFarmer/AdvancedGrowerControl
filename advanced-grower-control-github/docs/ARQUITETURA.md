# ASTRAYA — Plataforma Agronômica · Arquitetura e Lógica do Código Base

> Documento de referência da base atual (extraída de `plataforma-agronomica-com-exclusao-usuarios.zip`).
> Serve como contrato para evolução: novas seções, campos e coleções devem seguir o que está descrito aqui.
> Complemento operacional: [`GUIA-EVOLUCAO.md`](./GUIA-EVOLUCAO.md) e [`SECOES.md`](./SECOES.md).

---

## 1. Visão geral

Aplicação web (SPA + API no mesmo processo Node) para a associação **ASTRAYA** — Associação de Desenvolvimento e Pesquisa em Cannabis e Fitoterápicos. Cobre:

| Módulo | Conteúdo |
|---|---|
| **1. Agricultura** | 1.1 Deficiências nutricionais · 1.2 Pragas & MIP · 1.3 KNF/JADAM · 1.4 Bioinsumos · 1.5 Análise de solo · 1.6 Cultivo (madres, ciclos, canteiros outdoor) |
| **2. Calendário** | 2.1 Manutenção do cultivo (eventos) · 2.2 Registro MIP |
| **3. Meteorologia** | 3.1 Estação meteorológica outdoor (Open-Meteo + VPD + lua + fotoperíodo) · IA clima/diagnóstico |
| **4. Ferramentas** | Calculadora de substrato/solo · Biblioteca de PDFs (Google Drive) |
| **Transversal** | IA agronômica (Gemini), autenticação multiusuário com papéis, publicação de conteúdo do admin para os demais, tema claro/escuro |

Características estruturais que definem a base:

- **Sem roteador**: navegação 100% por estado (`activeCategory` + submenu) com renderização condicional.
- **Sem ORM**: PostgreSQL acessado com `pg` puro e DDL idempotente no boot.
- **Persistência em 3 camadas**: `localStorage` → `IndexedDB` → PostgreSQL (JSONB por coleção).
- **Conteúdo por coleção inteira**: cada gravação substitui o documento JSON completo ("last write wins").
- **Dois níveis de dado**: acervo pessoal (`app_user_data`) e acervo publicado (`app_published_content`).
- **Servidor único monolítico** (`server.ts`, ~1.210 linhas) que também serve o Vite em desenvolvimento.

---

## 2. Stack e execução

| Camada | Tecnologia |
|---|---|
| UI | React 19 + TypeScript 5.8 (`strict` desligado), Tailwind CSS 4 (plugin Vite), lucide-react, motion, leaflet |
| Build | Vite 6 (front) + esbuild (bundle do servidor em CJS) |
| Servidor | Express 4, `tsx` em dev, Node 22 no container |
| Banco | PostgreSQL 16 (Docker Compose), driver `pg` |
| IA | `@google/genai` (Gemini), chave via `GEMINI_API_KEY` |
| Clima | Open-Meteo (`api.open-meteo.com`) + RainViewer/Windy no cliente |
| Deploy | Docker multi-stage (`Dockerfile`) + `compose.yaml` (serviços `app` e `db`) |

### Scripts (`package.json`)

```
dev    tsx server.ts                # Express + Vite middleware (NODE_ENV != production)
build  vite build && esbuild server.ts --bundle --platform=node --format=cjs \
       --packages=external --sourcemap --outfile=dist/server.cjs
start  node dist/server.cjs         # serve dist/ + API
lint   tsc --noEmit                 # único "teste" automatizado do projeto
```

### Variáveis de ambiente (`.env.example`)

| Variável | Uso |
|---|---|
| `GEMINI_API_KEY` | IA agronômica. Sem ela `/api/ai/diagnose` responde 500 |
| `APP_URL` / `APP_PORT` | Porta publicada no host (padrão 3000) |
| `DB_NAME` / `DB_USER` / `DB_PASSWORD` | Credenciais do Postgres criadas pelo compose |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Bootstrap do primeiro admin (senha ≥ 12 caracteres) |
| `COOKIE_SECURE` | `true` sob HTTPS (adiciona `Secure` ao cookie de sessão) |
| `DATABASE_URL` ou `PGHOST/PGPORT/...` | Conexão do `pg.Pool` |

### Modo sem banco

Se nem `DATABASE_URL` nem `PGHOST` existirem, o servidor **sobe assim mesmo** (`databasePool = null`): `/api/health`, `/api/ai/diagnose` e `/api/weather/inmet` funcionam; todo o resto responde `503 { error: "Banco de dados não configurado." }`. Isso permite rodar a UI para explorar telas, mas **sem login**.

---

## 3. Mapa de arquivos

```
.
├── server.ts                  # API + auth + IA + clima + serving do SPA
├── vite.config.ts             # react + tailwind, alias "@" → raiz, HMR controlado por DISABLE_HMR
├── index.html                 # <div id="root">, CSS do Leaflet via unpkg (CDN)
├── compose.yaml / Dockerfile  # app + postgres:16-alpine, volume nomeado
├── RUNBOOK-IMPLANTACAO.md     # instalação/atualização/rollback na VPS
├── README-Docker.md           # operação, papéis, publicação, backup
├── docs/                      # esta documentação (arquitetura, seções, guia)
└── src/
    ├── main.tsx               # createRoot + StrictMode
    ├── App.tsx                # sessão, workspace, TODAS as coleções e a navegação
    ├── types.ts               # contratos de domínio (fonte da verdade)
    ├── index.css              # Tailwind + overrides do tema claro
    ├── components/            # Header, SubMenu, BottomNav, seções e modais
    ├── data/                  # seeds tipados (deficiencies, pests, knfJadam, bioinputs, madres, documents)
    └── utils/                 # dataSync (API), idbStorage (IndexedDB), imageUtils
```

Tamanho (linhas, contagem real): `CultivoSection` 2.868 · `SoilAnalysisSection` 1.293 · `server.ts` 1.210 · `WeatherView` 1.120 · `DeficienciesSection` 1.037 · `App.tsx` 1.020 · `PestsSection` 765 · `CalendarView` 621 · `ToolsView` 407 · `AdminManagerModal` 364 · `AdminUsersPanel` 268 · `types.ts` 189.

---

## 4. Backend (`server.ts`)

### 4.1 Bootstrap (`startServer`, linhas 199-1210)

1. Cria o `Pool` (timeout 3 s, máx. 10 conexões) e registra `databasePool.on("error")`: falha em cliente ocioso (ex.: banco reiniciou) é apenas logada — o pool descarta o cliente e reconecta na próxima consulta, **sem derrubar o processo**.
2. Roda `initializeDatabase()`: `SCHEMA_SQL` + `ALTER TABLE` aditivos + bootstrap do admin.
3. Se o schema falhar no boot, o processo **não sobe** (throw → `process.exit(1)`).
4. `express.json({ limit: "20mb" })` + handler de erro dedicado (413 / 400 JSON inválido).
5. Registra rotas de API.
6. Em dev monta o Vite em `middlewareMode`; em produção serve `dist/` com fallback SPA (`app.get("*")`).
7. `app.listen(PORT, "0.0.0.0")`.

### 4.2 Schema (linhas 48-89)

```sql
users(id uuid pk, email text unique, name text, password_hash text,
      role text check in ('admin','operator','reader') default 'reader',
      is_active boolean default true, created_at timestamptz)

sessions(token_hash char(64) pk, user_id uuid fk→users on delete cascade,
         expires_at timestamptz, created_at timestamptz)
  + índices sessions_user_id_idx, sessions_expires_at_idx

app_user_data(user_id uuid fk→users on delete cascade,
              key text check in (<10 chaves>),
              value jsonb, updated_at timestamptz,
              primary key (user_id, key))

app_published_content(key text pk check in (<10 chaves>),
                      value jsonb, published_by uuid fk→users on delete set null,
                      published_at timestamptz)
```

`initializeDatabase` ainda executa, a cada boot (linhas 174-180): adiciona `users.is_active`, força default `reader`, troca o CHECK de role e converte `role = 'user'` → `'operator'`.

**Chaves de coleção** (`COLLECTION_KEYS`, linhas 12-23) — a lista está **duplicada em 3 lugares**: `server.ts`, `SCHEMA_SQL` (dois CHECKs) e `src/utils/dataSync.ts`.

```
astraya_deficiencies_v6 · astraya_pests_v5 · astraya_bioinputs_v5 · astraya_documents_v5
astraya_events · astraya_mip_logs · astraya_madres_v1 · astraya_indoor_batches_v1
astraya_outdoor_plots_v1 · astraya_cycle_folders_v1
```

> Os sufixos `_v5/_v6` são versionamento manual de payload: quando o formato muda de forma incompatível, cria-se uma chave nova (e o merge por seed cobre a migração).

### 4.3 Autenticação e sessão (linhas 91-348)

- **Senha**: `scrypt` (N padrão, keylen 64, `maxmem` 64 MB) com salt de 16 bytes; formato `scrypt$<salt b64url>$<hash b64url>`; comparação com `timingSafeEqual`.
- **Sessão**: token aleatório de 32 bytes (b64url) no cookie `astraya_session`; no banco fica apenas `sha256(token)`. `Path=/; HttpOnly; SameSite=Lax` (+ `Secure` se `COOKIE_SECURE`), `Max-Age` 7 dias.
- **`requireAuth`**: valida hash + `expires_at > now()` + `users.is_active`.
- **Rate limit**: `createRateLimiter(10, 15 min)` por IP em `/register` e `/login` (memória do processo).
- **Anti-CSRF**: `checkMutationOrigin` compara `Origin` com o header `Host` em todas as mutações.
- **Logout**: apaga a sessão e zera o cookie. **Reset de senha pelo admin**: apaga todas as sessões do usuário.
- **Bootstrap do admin**: se `ADMIN_EMAIL`+`ADMIN_PASSWORD` existem, promove o e-mail existente ou cria a conta `admin` (valida e-mail e senha ≥ 12 caracteres).

### 4.4 Papéis e autorização

| Papel | Lê os próprios dados | Escreve os próprios dados | Gerencia usuários | Publica conteúdo | Abre dados de terceiros |
|---|---|---|---|---|---|
| `reader` | ✅ | ❌ (403 no servidor) | ❌ | ❌ | ❌ |
| `operator` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `admin` | ✅ | ✅ | ✅ | ✅ | ✅ (`?userId=`) |

Regras de integridade administrativa:
- ninguém rebaixa/desativa/exclui a **própria** conta;
- não é possível remover/desativar o **último admin ativo** (lock `pg_advisory_xact_lock(741028613)` + `FOR UPDATE`);
- a conta de bootstrap (`ADMIN_EMAIL`) não pode ser excluída enquanto as variáveis existirem no `.env` (409 com instrução).

### 4.5 Rotas

| Método | Rota | Guardas | Função |
|---|---|---|---|
| POST | `/api/auth/register` | DB, origin, rate limit | cria `reader`, abre sessão (201) |
| POST | `/api/auth/login` | DB, origin, rate limit | valida senha ativa, limpa sessões expiradas, abre sessão |
| POST | `/api/auth/logout` | DB, origin | encerra sessão (204) |
| GET | `/api/auth/me` | DB, auth | usuário da sessão |
| GET | `/api/published-content` | DB, auth | todas as coleções publicadas + autor/data |
| PUT | `/api/admin/published-content` | DB, auth, **admin**, origin | publica 1..N coleções em transação e devolve o que foi publicado |
| GET | `/api/admin/users` | admin | lista contas + flag `is_bootstrap_admin` |
| POST | `/api/admin/users` | admin | cria conta com papel escolhido |
| PATCH | `/api/admin/users/:id` | admin | altera `name`/`role`/`is_active` (desativar apaga sessões) |
| DELETE | `/api/admin/users/:id` | admin | exclui conta (cascata em dados/sessões) |
| POST | `/api/admin/users/:id/password` | admin | redefine senha e encerra sessões |
| GET | `/api/data` | auth | coleções do próprio usuário (admin: `?userId=`) + `isEmpty` |
| POST | `/api/data/import` | auth, origin | importação única de dados legados (só se a conta estiver vazia) |
| PUT | `/api/data/:key` | auth, origin | grava uma coleção inteira (reader → 403) |
| GET | `/api/health` | — | status + estado do banco (503 se o `SELECT 1` falhar) |
| POST | `/api/ai/diagnose` | DB, origin, auth, rate limit (20/5 min) | diagnóstico Gemini (texto e/ou imagem), prompt ≤ 4.000 caracteres, imagem ≤ ~8 MB |
| GET | `/api/weather/inmet` | **nenhuma** | payload meteorológico agregado por cidade |

Limites: corpo 20 MB por requisição; `DATA_BODY_MAX_BYTES` 20 MB por coleção/publicação/importação.

### 4.6 Semântica de dados e publicação

- **Pessoal**: `PUT /api/data/:key` faz `INSERT ... ON CONFLICT (user_id,key) DO UPDATE` — substitui o documento inteiro.
- **Importação legada**: só ocorre se a conta não tem **nenhuma** linha; roda em transação com `FOR UPDATE` no usuário; retorna `imported: false` quando já há dados.
- **Publicado**: o admin publica a partir do **próprio workspace**; `PUT /api/admin/published-content` grava todas as chaves pedidas em uma transação e devolve `{ collections }` com autor e data. Conteúdo publicado **não** é apagado quando a conta autora é excluída (`published_by` vira `NULL`).
- **Leitura**: `GET /api/published-content` é acessível a qualquer sessão autenticada (o filtro por papel acontece na UI).

### 4.7 IA agronômica (linhas 736-865)

- `GoogleGenAI` criado por requisição (`getGenAI`), `User-Agent: aistudio-build`.
- `systemInstruction` fixo: assistente agronômico ASTRAYA (deficiências, MIP, KNF/JADAM, solo/CTC, VPD/clima), respostas estruturadas com dosagens, tom profissional.
- `userMessage` concatena `category`, `plantStage`, `temp/humidity/vpd` e o prompt.
- Suporta imagem: `imageBase64` (data URL) → detecta MIME e envia `inlineData` + texto.
- Tenta modelos em cascata: `gemini-3.1-flash-lite` → `gemini-3.8-flash`; `temperature: 0.4`; devolve `{ text, model }`.
- Falha total → `500` com mensagem genérica ("alta demanda momentânea").
- **Proteções aplicadas** (rota não é mais pública): exige sessão (`requireAuth`), valida `Origin`, limita a 20 chamadas por IP a cada 5 minutos, rejeita prompt acima de 4.000 caracteres e imagem acima de ~8 MB; `category`/`plantStage` são truncados a 120 caracteres antes de entrar no prompt.

> ⚠️ Os nomes de modelo acima precisam ser validados contra a API vigente do Gemini; se estiverem obsoletos, todo diagnóstico cai no 500.

### 4.8 Meteorologia (linhas 867-1184)

- **Fonte real**: Open-Meteo (`/v1/forecast`) — apesar do nome da rota e dos rótulos "INMET" na UI.
- **Cidades fixas** (mapa no servidor, 6 entradas): Ibiúna (default), Cotia, Vargem Grande Paulista, Sorocaba, São Roque, Piedade — cada uma com lat/lon, altitude e `stationRef` fictícia/associada.
- **Cache**: memória do processo, TTL 2 min por cidade; em erro devolve cache expirado se existir, senão 500.
- **Cálculos no servidor**:
  - VPD (Magnus): `svp = 0.61078 · exp(17.27·T / (T + 237.3))`; `avp = svp · UR/100`; `VPD = svp − avp`.
  - Faixas: `< 0.4` (alerta umidade/Botrytis) · `0.4-0.8` (mudas/veg inicial) · `0.8-1.2` (veg avançado/floração média) · `1.2-1.5` (floração avançada/maturação) · `> 1.5` (seco/estresse).
  - Fotoperíodo: diferença `sunset − sunrise` do dia.
  - Fase da lua: dias desde a lua nova de `2024-01-11T11:57Z` módulo 29,530588, em 8 faixas com dica agronômica.
  - Direção do vento (16 setores), tradução de códigos WMO para pt-BR, radiação (DNI da hora atual), chuva 24 h, probabilidade, umidade do solo.
- **Payload**: ~30 campos + `forecast[6]` já formatado (manhã/tarde/noite/amanhã/+2/+3). A UI consome strings prontas — não recalcula nada.

---

## 5. Frontend

### 5.1 Composição

```
main.tsx → <App>                         (sessão, conteúdo publicado, workspace)
            ├─ AuthScreen                (quando não autenticado)
            └─ <AgronomyApp>             (key = `${user.id}:${dataOwnerId}` força remontagem)
                 ├─ Header               (logo, tema, IA, painel, logout, faixa de workspace)
                 ├─ SubMenu              (abas numeradas por categoria)
                 ├─ main → seção ativa   (7 seções + 4 telas)
                 ├─ BottomNav            (4 categorias, fixo)
                 ├─ AiAssistantModal     (global)
                 ├─ AdminManagerModal    (edição de deficiência/praga/bioinsumo)
                 └─ AdminUsersPanel      (somente admin)
```

`ErrorBoundary` envolve o `AgronomyApp` e oferece recarregar/limpar cache local.

### 5.2 Navegação (sem router)

- `activeCategory: 'agricultura' | 'calendario' | 'meteorologia' | 'ferramentas'` (default `agricultura`).
- Subestados independentes: `agriSub` (`deficiencias` default), `calSub`, `weatSub`, `toolSub`.
- `SubMenu` renderiza a lista da categoria ativa; rótulos numerados (`1.1`, `1.2`, …).
- Não há URL/deep-link, histórico do navegador nem persistência da aba ativa (volta ao default ao recarregar).

### 5.3 Estado e persistência (o fluxo mais importante da base)

```
                    ┌──────────── localStorage (inicializador do useState)
login/refresh ──────┤
                    ├──────────── IndexedDB (AstrayaStorageDB / app_data_store, só coleções grandes)
                    └── GET /api/data ── hidrata e SOBRESCREVE os dois caches
                                              │
                    edição (setState) ────────┴──► useEffect por coleção ──► localStorage + IndexedDB + PUT /api/data/:key
```

Detalhes que precisam ser respeitados ao criar novas coleções:

1. O `useState` inicial lê `localStorage` e aplica a função de **merge** com o seed (`mergeDeficiencies`, `mergePests`, `normalizeMadres`, `dedupeById`…).
2. `hydrateUserCollections()` roda **antes** de montar o `AgronomyApp` e regrava os caches locais com o que veio do banco; se a conta está vazia e o navegador nunca pertenceu a outra conta (`astraya_db_owner_id`), faz o **import único** dos dados legados.
3. Cada coleção tem um `useEffect` que persiste em `localStorage` (try/catch para `QuotaExceededError`), opcionalmente em IndexedDB, e chama `persistCollection(key, value)`.
4. `persistCollection` só grava se `canWrite` (admin ou operator dono do workspace) e enfileira as gravações **por chave** (`pendingSaves`) para evitar PUTs fora de ordem; erro vira faixa `syncError` no topo.
5. Coleções grandes/base64 vão para IndexedDB (`IDB_KEYS` em `dataSync.ts`): deficiências, pragas, madres, canteiros outdoor, pastas de ciclo.

Consequências conhecidas: **last write wins**, ~10 PUTs no mount (todos os efeitos disparam na primeira renderização), e o `PUT` substitui a coleção inteira.

### 5.4 Visão publicada × pessoal (`publishedView`, App.tsx 119-136)

```
admin         → vê apenas os próprios dados (localItems)
não-admin     → itens publicados  +  itens pessoais que NÃO estão publicados e NÃO são seed
```

Regras:
- para `reader`/`operator`, `view*` é o array "público + pessoal residual"; os setters (`setEventsFromView`, `setMipLogsFromView`, `setDocumentsFromView`) filtram os IDs publicados antes de gravar, para não sobrescrever o acervo coletivo;
- `CultivoSection` recebe `publishedMadreIds`/`publishedOutdoorIds`/`publishedCycleFolderIds` para bloquear edição de item publicado na visão de terceiros;
- `canWrite = isAdmin || (operator && dataOwnerId === user.id)`;
- `publishActiveModule` só aparece para **admin no próprio workspace** e publica as coleções do módulo ativo (Cultivo publica madres + canteiros + pastas de uma vez).

### 5.5 Workspace administrativo

`AdminUsersPanel` → "Abrir dados" chama `onOpenWorkspace(user)` → `hydrateUserCollections(admin.id, alvo.id)` → `managedDataUser` → `dataOwnerId` muda → `key` do `AgronomyApp` muda → remonta com os dados do alvo. O `Header` mostra a faixa "Visualizando dados de X" com botão de retorno (recarrega o próprio workspace).

### 5.6 Tema e design system

- Tema **escuro** por padrão; `localStorage.astraya_theme`; classe `light-theme` em `<html>`/`<body>`.
- O tema claro é feito por **overrides CSS com `!important`** em `index.css` (sobrescreve `bg-slate-900/950`, textos, bordas, inputs). Qualquer novo componente deve usar as mesmas classes utilitárias para herdar o tema.
- Paleta: fundo `slate-950`, superfícies `slate-900`/`slate-800`, borda `emerald-800/700`, ação `emerald-500/600`, admin/alertas `amber`, perigo `rose`/`red`.
- Formas: `rounded-xl/2xl/3xl`, sombras `shadow-md/2xl`, ícones 16-20 px (`lucide-react`), tipografia pequena (`text-xs`/`text-sm`), micro-rótulos em maiúsculas.
- Layout: `max-w-7xl` no `main`, `p-4 sm:p-6`, `pb-24` no wrapper por causa da `BottomNav` fixa; cabeçalho `sticky top-0 z-40`.

### 5.7 Imagens

- `SafeImage` normaliza a URL (`formatImageUrl`), tenta CDN direto do Drive (`lh3.googleusercontent.com/d/ID`), depois thumbnail do Drive, depois fallback local; `loading="lazy"`, `referrerPolicy="no-referrer"`.
- `imageUtils` cobre: links `/file/d/ID/`, `?id=`, `lh3.../d/ID`, pastas do Drive, Dropbox (`dl=0`→`raw=1`), `http:`→`https:`.
- Fallbacks locais versionados em `public/images/{deficiencies,pests,cultivo}` (também duplicados em `src/assets/images`).

### 5.8 Seeds e merge

- `src/data/*.ts` exportam arrays tipados: 11 deficiências, 10 pragas, 9 receitas KNF/JADAM, 10 bioinsumos, 4 madres, 2 lotes indoor, 1 canteiro outdoor, 3 pastas de ciclo, 6 documentos.
- O merge preserva a **imagem empacotada** (`/images/...`) do seed mesmo que o registro salvo tenha outra, e mantém itens personalizados (`id` fora do seed) ao final.
- `INITIAL_INDOOR_BATCHES` existe no seed e a coleção `astraya_indoor_batches_v1` é sincronizada — porém **não há UI que consuma lotes indoor** (ver dívidas).

### 5.9 Idiomas (i18n)

- **Fonte**: `src/i18n/index.tsx` (dicionários base herdados do V1, 4 idiomas) + `src/i18n/v2.ts` (mensagens exclusivas da V2: autenticação, publicação, painel, navegação) + `src/i18n/content/{en,es,de}.ts` (tradução do acervo técnico por `id`).
- **API**: `useI18n()` → `{ lang, locale, setLang, t }`; `t('chave', { var })` interpola `{var}`. `useTerm()` traduz termos técnicos pontuais (ex.: nomes de pragas).
- **Idiomas**: `pt` (Português Brasil, principal), `en`, `es`, `de`; escolha persistida em `localStorage` na chave `astraya_lang`; `<html lang>` e `document.title` acompanham.
- **UI**: barra de idiomas no topo (`Header`), abaixo da linha principal: PT (com marcador de principal), EN, ES, DE.
- **Conteúdo**: `localizeItems(items, overrides)` aplica as traduções do acervo por `id` **apenas na exibição** em `App.tsx`; ids, permissões e persistência não mudam. Como a edição salva o objeto exibido, editar em outro idioma pode gravar texto traduzido — mantenha o idioma PT ao editar conteúdo administrativo.
- **Pendente**: as telas grandes (1.1, 1.2, 1.5, 1.6, 2.x, 3.1, 4.x) têm dicionários `COPY` no V1 que ainda precisam ser portados para o JSX da V2.

---

## 6. Modelo de dados

### 6.1 Tipos de domínio (`src/types.ts`)

| Tipo | Campos-chave | Coleção |
|---|---|---|
| `NutritionalDeficiency` | element, symbol, type (Macro/Secundário/Micro), mobility, targetLeaves, symptoms[], causes[], correctiveOrganic[], correctiveMineral[], solubilizingMicroorganisms[], companionPlants[], astrayaTips, imageUrl, images[], figures[], pdfDriveUrl | `astraya_deficiencies_v6` |
| `PestPois` | name, scientificName, category, identification, damageSymptoms[], prevention[], biologicalControl[], organicRecipes[], chemicalOrMineral[], severity, imageUrl, images[], pdfDriveUrl | `astraya_pests_v5` |
| `BioInput` | productName, activeAgent, category, dosage, targetPestOrDisease, astrayaNotes | `astraya_bioinputs_v5` |
| `KnfJadamRecipe` | method (KNF/JADAM/KYUSEI EM), name, description, ingredients[{name,ratio}], steps[], applicationDosage, benefits[] | **somente leitura** (seed) |
| `MotherGenetics` | genetica, banco, porcentagemThcCbd, diaInicio, ultimoDia, dificuldadeCultivo, ataquePragas, clonesPorTemporada, saudeClones, enraizamento, casaVegetacao, observacoes, status, archived, cycleFolderId/Label/archivedAt/archiveNotes, images[] | `astraya_madres_v1` |
| `OutdoorCropPlot` | nomeCanteiro, genetica, quantidadePlantas, faseFotoperiodo, tipoSubstrato, protecaoClimatica, dataPlantio, previsaoColheita, observacoes, archived, cycleFolderId… | `astraya_outdoor_plots_v1` |
| `CycleFolder` | name, periodLabel, startDate, endDate, notes, createdAt | `astraya_cycle_folders_v1` |
| `IndoorCropBatch` | nomeSala, genetica, quantidadePlantas, estagio, iluminacao, tempUmidade, dataInicio, previsaoColheita, observacoes | `astraya_indoor_batches_v1` (sem UI) |
| `CalendarEvent` | date, type (6 valores), title, notes, completed, dosageOrVolume | `astraya_events` |
| `MipLogEntry` | date, zone, pestObserved, severityLevel 1-5, actionTaken, responsible | `astraya_mip_logs` |
| `DriveDocument` | title, category, description, url, updatedAt | `astraya_documents_v5` |
| `SoilAnalysisData` | ph, organicMatter, nitrogen, phosphorus, potassium, calcium, magnesium, ctc | estado local (não persistido) |

### 6.2 Chaves locais

`astraya_theme`, `astraya_db_owner_id`, as 10 chaves de coleção e, no IndexedDB, `AstrayaStorageDB` / store `app_data_store`.

---

## 7. Build, deploy e operação

- **Imagem**: estágio `build` (npm ci + npm run build) → estágio `production-dependencies` (`npm ci --omit=dev`) → runtime `node:22-alpine`, usuário `node`, healthcheck HTTP em `/api/health`.
- **Compose**: `app` (porta `APP_PORT:3000`) + `db` (`postgres:16-alpine`, sem porta publicada, healthcheck `pg_isready`, volume `astraya_agronomica_postgres_data`), rede `astraya-internal`.
- **Migrações**: DDL aditivo no boot (`SCHEMA_SQL` + `ALTER`). Não existe executor de migrações versionadas; mudanças destrutivas exigem script manual documentado no runbook.
- **Atualização**: staging + `rsync --dry-run` → `rsync` (sem `--delete`) → `docker compose build app` → `up -d app`; backup com `pg_dump` antes. Nunca `docker compose down -v`.

---

## 8. Limitações e dívidas técnicas (estado atual)

**Segurança**
1. `/api/weather/inmet` segue **público** (sem auth) — só leitura e com cache de 2 min, mas ainda permite uso anônimo do proxy de clima. `/api/ai/diagnose` foi protegido (sessão + rate limit + limites de payload).
2. Sem CSP/helmet; CSS do Leaflet vem de CDN externo (`unpkg`).
3. `tsconfig` sem `strict`; muitos `any` (payload de clima, itens de admin).

**Correção (impacto alto)**
4. ~~**Perda de dados na edição**~~ — **corrigido**: `AdminManagerModal` agora faz spread do item original e preserva `solubilizingMicroorganisms`, `companionPlants`, `chemicalOrMineral`, imagens, figuras e PDF; o formulário é limpo ao abrir "Novo". No mesmo arquivo, o **formulário de pragas não era renderizado** (o modal abria sem campos) — foi restaurado com nome, nome científico, categoria, gravidade, identificação, danos, prevenção, controle biológico, receitas e correção mineral.
5. Hooks após `if (!isOpen) return null` em `AiAssistantModal` e `AdminManagerModal` → ordem de hooks muda ao abrir; em React 19 isso quebra/avisa. **Corrigido**: guardas movidos para depois dos hooks.
6. `AiAssistantModal` depende de `GEMINI_API_KEY` e de nomes de modelo possivelmente inválidos.
7. `WeatherView` usa fallbacks fixos quando a API falha (UR 88% dispara alerta falso) e `||` no lugar de `??` (0 vira default); a instância do Leaflet fica órfã ao voltar da aba de IA (mapa em branco).
8. `CalendarView` usa `toISOString()` (UTC) para "hoje" — entre 21h e 0h em America/Sao_Paulo o dia já é o seguinte; não há edição de evento/MIP.
9. `SoilAnalysisSection` mistura unidade global e por elemento (rótulo pode errar por 10×), ignora PRNT nos calcários e assume densidade 1 kg/L ao converter g/dm³ → litros.
10. Upload de fotos por seção em 1.1/1.2 é **código morto** (o estado que abriria o modal nunca é acionado); em Pragas não há nenhuma via de upload local.
11. `mergeDeficiencies`/`mergePests` reimpõem a imagem empacotada como capa: excluir a foto local "volta" no reload.
12. Calculadora KNF deriva a dose por `includes()` no texto de `applicationDosage` — erra JMS (10×), biopesticida JADAM e EM5.

**Estrutura**
13. `App.tsx` concentra 10 coleções, navegação e publicação (~1.020 linhas); `CultivoSection` tem 2.868 linhas.
14. `astraya_indoor_batches_v1`: estado, seed e sincronização sem UI.
15. Lista de coleções duplicada em 3 pontos + CHECK constraints inline (novas chaves exigem `ALTER TABLE`).
16. Banco de cidades duplicado (servidor × WeatherView) e rótulos "INMET" sobre dados Open-Meteo.
17. Sem testes automatizados; `lint` é apenas `tsc --noEmit`.
18. Imagens duplicadas em `src/assets` e `public` (~12 MB redundantes).
19. Permissão inconsistente: 1.1/1.2/1.4 recebem `isAdmin` (papel) e Cultivo/Calendário recebem `canWrite` (papel + dono) — operador não edita catálogos agronômicos.

O detalhamento por seção, com linhas e comportamento, está em [`SECOES.md`](./SECOES.md); as receitas de evolução e o checklist estão em [`GUIA-EVOLUCAO.md`](./GUIA-EVOLUCAO.md).
