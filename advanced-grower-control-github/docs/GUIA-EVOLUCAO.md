# Guia de evolução — como estender a base ASTRAYA sem quebrá-la

> Ler junto com [`ARQUITETURA.md`](./ARQUITETURA.md) (mapa geral) e [`SECOES.md`](./SECOES.md) (detalhe por seção).
> Regra número 1: **toda seção nova copia o padrão de uma seção existente** — mesmo fluxo de estado, mesma camada de persistência, mesmas classes visuais.

---

## 1. Princípios do código base

1. **Estado central no `App.tsx`.** Componentes de seção são "burros": recebem dados e callbacks (`onSaveX`, `onDeleteX`, `isAdmin`, `publishedIds`). Não crie `fetch` dentro de seção, exceto para APIs de leitura puras (clima/IA) como já ocorre em `WeatherView`.
2. **Persistência em 3 camadas por coleção**: `localStorage` (cache rápido) + `IndexedDB` (coleções grandes) + `PUT /api/data/:key` (fonte da verdade). Novas coleções seguem exatamente esse ciclo.
3. **Seed é fallback, não verdade.** `src/data/*.ts` define o conteúdo inicial; o merge por `id` preserva o que o usuário salvou e mantém itens personalizados.
4. **Permissão é decidida no servidor.** A UI esconde botões, mas quem manda é `requireAuth`/`requireAdmin` + `role`/`is_active` da sessão. Nunca aceite papel vindo do corpo da requisição.
5. **Publicação é explícita.** O admin publica o módulo aberto; leitores/operadores veem `publicado + pessoal`, nunca o inverso.
6. **Português (pt-BR)** em UI, mensagens de erro, comentários de domínio e docs. Nomes de código em inglês (`getPublishedCollections`, `persistCollection`) ou português quando o domínio é agronômico (`madres`, `canteiros`, `deficiencias`).
7. **Sem dependências novas sem necessidade.** O projeto já traz React, Tailwind, lucide, motion, leaflet, express, pg, @google/genai. Não introduza router/estado global/ORM sem decisão explícita.

---

## 2. Convenções

| Item | Convenção |
|---|---|
| Componentes | PascalCase, um por arquivo, `export const X: React.FC<Props>` ou `export function X(props)` |
| Props | `interface XProps` no topo do arquivo; callbacks nomeados `onSaveX`, `onDeleteX`, `onEditItem`, `onAddNew` |
| Tipos de domínio | `src/types.ts`; uniões fechadas para enums de UI (`'Macro' \| 'Secundário' \| 'Micro'`) |
| Coleções | `astraya_<dominio>_v<n>`; subir a versão só em mudança incompatível de payload |
| IDs | slugs legíveis no seed (`def-n`, `pest-spidermite`) e `'prefixo-' + Date.now()` para itens criados na UI |
| Datas | `YYYY-MM-DD` em campos de data; `toISOString()` só quando o dado é instante (evite para "hoje" — use data local) |
| Dinheiro/doses | hoje são `string` livre (ex.: `"1,0 g/L"`); ao criar campo novo, prefira `{ valor: number; unidade: string }` |
| Classes | Tailwind inline, sem `clsx`; cartões `bg-slate-900 border border-slate-800 rounded-2xl`, inputs `bg-slate-950 border border-slate-700 rounded-xl`, ação `bg-emerald-600` |
| Tema | use **apenas** classes já cobertas por `index.css` (slate-800/900/950, emerald-950, amber-950, text-slate-100..400). Cores fora dessa lista ficam ilegíveis no tema claro |
| Ícones | `lucide-react`, 16-20 px (`h-4 w-4`) |
| Erros de API | `{ error: "mensagem em pt-BR" }` + status correto (400/401/403/404/409/413/429/500/503) |

---

## 3. Receitas

### R1 — Nova sub-aba em uma categoria existente (ex.: "1.7 Irrigação")

1. `src/types.ts`: acrescente o id na união (`AgricultureSubMenu`).
2. `src/components/SubMenu.tsx`: adicione `{ id: 'irrigacao', label: '1.7 Irrigação' }` na lista da categoria.
3. `src/components/IrrigacaoSection.tsx`: crie o componente seguindo o cabeçalho padrão (banner gradiente + tile de ícone + título + subtítulo).
4. `src/App.tsx`:
   - importe o componente;
   - renderize `{agriSub === 'irrigacao' && <IrrigacaoSection ... />}` dentro do bloco da categoria;
   - se a seção edita dados, passe `isAdmin={canWrite}` (não `isAdmin`, que ignora operador) e os callbacks;
   - se a seção persiste, siga R3; se publica, siga R6.
5. Atualize `docs/SECOES.md` (uma seção por módulo, com números de linha).

### R2 — Nova categoria principal (ex.: "Financeiro")

1. `src/types.ts`: amplie `MainCategory` e crie a união de submenu (`FinanceiroSubMenu`).
2. `src/components/BottomNav.tsx`: novo item no array `navItems` e ajuste `grid-cols-4` → `grid-cols-5` (verifique largura no celular).
3. `src/components/SubMenu.tsx`: novo `render...SubMenu()` + ramo no JSX.
4. `src/App.tsx`: novo par de estado (`finSub`) + bloco `{activeCategory === 'financeiro' && ...}`.
5. `activeCategoryName` do `Header` é string livre — ajuste o rótulo se necessário.
6. Lembre: **não há rota/URL**; recarregar volta para `agricultura`/`deficiencias`. Se precisar de deep-link, isso é uma decisão de arquitetura (não existe today).

### R3 — Nova coleção persistida (o passo mais delicado)

Exemplo: `astraya_irrigacao_v1` (array de objetos JSON).

1. **Servidor** (`server.ts`):
   - adicione a chave em `COLLECTION_KEYS` (linhas 12-23);
   - adicione a chave nos **dois** `CHECK (...)` do `SCHEMA_SQL` (`app_user_data` e `app_published_content`);
   - como `CREATE TABLE IF NOT EXISTS` **não altera** tabelas existentes, acrescente em `initializeDatabase()` o `ALTER` idempotente (sem isso, o `INSERT` falha com `23514` em banco já existente):

```sql
ALTER TABLE app_user_data DROP CONSTRAINT IF EXISTS app_user_data_key_check;
ALTER TABLE app_user_data ADD CONSTRAINT app_user_data_key_check CHECK (key IN (
  'astraya_deficiencies_v6', 'astraya_pests_v5', 'astraya_bioinputs_v5',
  'astraya_documents_v5', 'astraya_events', 'astraya_mip_logs',
  'astraya_madres_v1', 'astraya_indoor_batches_v1',
  'astraya_outdoor_plots_v1', 'astraya_cycle_folders_v1',
  'astraya_irrigacao_v1'
));
ALTER TABLE app_published_content DROP CONSTRAINT IF EXISTS app_published_content_key_check;
ALTER TABLE app_published_content ADD CONSTRAINT app_published_content_key_check CHECK (key IN ( /* mesma lista */ ));
```

2. **Cliente** (`src/utils/dataSync.ts`): acrescente a chave em `COLLECTION_KEYS`; se o payload for grande ou contiver base64, acrescente também em `IDB_KEYS`.
3. **Tipos** (`src/types.ts`): interface da entidade.
4. **Seed** (`src/data/irrigacao.ts`): `INITIAL_IRRIGACAO` tipado (pode ser `[]`).
5. **`src/App.tsx`**:
   ```tsx
   const [irrigacao, setIrrigacao] = useState<Irrigacao[]>(() => {
     const saved = localStorage.getItem('astraya_irrigacao_v1');
     if (saved) { try { return dedupeById(JSON.parse(saved)); } catch { return INITIAL_IRRIGACAO; } }
     return INITIAL_IRRIGACAO;
   });

   useEffect(() => {
     try { localStorage.setItem('astraya_irrigacao_v1', JSON.stringify(irrigacao)); } catch (e) { console.warn(e); }
     setIdbItem('astraya_irrigacao_v1', irrigacao);            // só se estiver em IDB_KEYS
     persistCollection('astraya_irrigacao_v1', irrigacao);     // só grava se canWrite
   }, [irrigacao, persistCollection]);

   const viewIrrigacao = publishedView(irrigacao, publishedCollections, 'astraya_irrigacao_v1', INITIAL_IRRIGACAO, isAdmin);
   ```
6. Handlers `handleSaveX`/`handleDeleteX` com `dedupeById` + replace-or-prepend (padrão das madres).
7. Passe `viewIrrigacao` para a seção; se não-admin puder editar os próprios itens, use um setter "from view" que remove os IDs publicados (padrão `setEventsFromView`).
8. Se o módulo for publicável, siga R6.

> ⚠️ Esquecer o `ALTER` é o erro mais comum: funciona em banco novo (criado com a lista atual) e falha em produção (banco antigo).

### R4 — Novo campo em um tipo existente

1. Declare **opcional** (`campo?: Tipo`) para não quebrar JSON já salvo.
2. Preencha no seed e no formulário de edição.
3. Exiba na seção (ou o campo vira dado morto — ver dívidas).
4. **`AdminManagerModal`**: já faz spread do item original (`{ ...(existing ?? {}), ...camposEditados }`), então campos que o formulário não edita são preservados. Mantenha esse padrão ao adicionar campos novos e lembre de incluí-los no bloco de reset do `useEffect`.
5. Se o campo for obrigatório na leitura, trate `undefined` na renderização (`?? []`, `?? ''`).

### R5 — Nova rota de API

```ts
app.post("/api/irrigacao/preview", requireDatabase, checkMutationOrigin, requireAuth, async (req, res) => {
  // 1) validar tipos e limites do body (nunca confiar no cliente)
  // 2) consultar com parâmetros ($1, $2) — jamais interpolar SQL
  // 3) responder pt-BR; erros com console.error e status coerente
});
```

Guardas disponíveis: `requireDatabase` (503 sem banco), `requireAuth` (401), `requireAdmin` (403), `checkMutationOrigin` (403 CSRF), `authRateLimit` (429).
Regras: transação (`BEGIN/COMMIT/ROLLBACK` + `client.release()`) quando gravar mais de uma linha; `FOR UPDATE`/advisory lock quando houver invariantes (ex.: último admin); limite de payload (20 MB).

### R6 — Tornar um módulo publicável

1. Em `App.tsx`, adicione o ramo em `activePublication` (título + coleções). Ex.: Cultivo publica 3 coleções de uma vez.
2. Em `publishedView`, use a chave correta e o seed correspondente para filtrar "itens pessoais".
3. Em `publishedIds(key)`, exponha os IDs bloqueados para a seção.
4. A barra de publicação já é genérica: aparece para **admin no próprio workspace** e chama `publishCollections`.
5. Lembre: publicar **não** copia nada do usuário — o snapshot é o do admin.

### R7 — Tela de cálculo puro (sem persistência)

Padrão `SoilAnalysisSection`/`ToolsView` (substrato): `useState` local, sem props, sem `persistCollection`, sem publicação. Se o cálculo for relevante, ofereça "Copiar Laudo" (clipboard) e mantenha as fórmulas em constantes nomeadas no topo do arquivo, com comentário da unidade.

---

## 4. Checklist antes de entregar

**Código**
- [ ] `npm run lint` (= `tsc --noEmit`) sem erros.
- [ ] `npm run build` (Vite + esbuild) funcionando no ambiente de build/CI (o sandbox local pode bloquear o `esbuild`).
- [ ] Nenhum `console.log` de depuração; erros de rede tratados (banner `syncError` ou mensagem local).
- [ ] Hooks **antes** de qualquer `return` condicional (ver dívida dos modais).
- [ ] `key` estável em listas; nenhum índice de array como key em listas mutáveis.

**Dados**
- [ ] Nova chave adicionada nos 3 pontos + `ALTER` das constraints.
- [ ] `dedupeById` no estado e no merge; IDs criados sem risco de colisão.
- [ ] Payload abaixo de 20 MB; imagens locais em `public/images/...` (e não base64 gigante).
- [ ] Reload preserva o que foi salvo; outro navegador recebe o mesmo conteúdo (PUT efetivo).

**Permissões**
- [ ] Admin: vê e edita tudo, publica no próprio workspace.
- [ ] Operador: edita só o próprio workspace; catálogos publicados são somente leitura.
- [ ] Leitor: nenhum botão de escrita; API responde 403 se forçar.
- [ ] Admin em workspace de terceiro: edita a coleção do dono e **não** publica por ele.

**UI**
- [ ] Tema escuro **e** claro (classes cobertas pelo `index.css`).
- [ ] 360 px de largura (BottomNav + `pb-24`), toques ≥ 40 px.
- [ ] Estados vazio/carregando/erro quando há fetch.
- [ ] Textos em pt-BR, acentuação correta.

**Operação**
- [ ] `SCHEMA_SQL` idempotente (rodar o servidor duas vezes não quebra).
- [ ] `.env` não versionado; nenhum segredo no ZIP.
- [ ] `docs/` atualizado (ARQUITETURA se mudou o fluxo; SECOES se mudou a seção).

---

## 5. Armadilhas conhecidas (leia antes de codar)

1. **CHECK constraints inline** — `app_user_data_key_check` / `app_published_content_key_check` não são atualizadas por `CREATE TABLE IF NOT EXISTS`.
2. **Lista de coleções em 3 lugares** — servidor, schema (2×) e `dataSync.ts`. Divergiu, o PUT falha.
3. **`publishedView` sem seed** — se você passar `[]` como `bundledItems`, os itens de seed do usuário passam a contar como "pessoais" e aparecem duplicados.
4. **`isAdmin` vs `canWrite`** — nas seções 1.1/1.2/1.4 o `App` passa `isAdmin` (papel), então operador não edita. Ao criar seção editável, use `canWrite`.
5. **Setters "from view"** — sem o filtro de IDs publicados, o operador sobrescreve o acervo coletivo com a própria cópia.
6. **`||` vs `??`** — `0` é valor válido em clima/cálculos; `||` transforma zero em default.
7. **UTC vs local** — `toISOString().split('T')[0]` erra o dia após 21h em America/Sao_Paulo.
8. **Merge de seed reimpõe imagem** — `mergeDeficiencies`/`mergePests` forçam `/images/...` na capa; exclusão de foto não persiste.
9. **Base64 em JSON** — cada foto comprimida (~500 px, JPEG 0.65) vai para o PostgreSQL; 20 MB por coleção é o teto.
10. **`localStorage` ~5 MB** — sempre `try/catch`; IndexedDB é o alívio.
11. **Hooks condicionais** — `if (!isOpen) return null` antes dos `useState` quebra a ordem de hooks; mova o early return para depois ou monte o modal condicionalmente no pai.
12. **Sem roteador** — trocar de sub-aba desmonta a seção e zera estado local (buscas, filtros, formulários). Se precisar manter, eleve o estado para o `App` ou persista.
13. **`esbuild` no sandbox** — `vite build`/`tsx` podem falhar com `spawn EPERM`; valide build no Docker/CI.

---

## 6. Dívidas priorizadas (sugestão de ordem de ataque)

| Prioridade | Item | Onde |
|---|---|---|
| **P0** | ✅ `AdminManagerModal` não destrói campos no save + formulário limpo em "Novo" | `AdminManagerModal.tsx` |
| **P0** | ✅ Hooks depois do early return nos dois modais | `AiAssistantModal.tsx` · `AdminManagerModal.tsx` |
| **P0** | ✅ Autenticar/limitar `/api/ai/diagnose` (sessão + 20/5 min + limites de payload) | `server.ts` |
| **P1** | Validar nomes de modelo Gemini | `server.ts` 820-823 |
| **P1** | Corrigir unidade/PRNT/densidade no cálculo de solo | `SoilAnalysisSection.tsx` 239-323 |
| **P1** | `WeatherView`: fallback falso, `||`, Leaflet órfão | `WeatherView.tsx` 280-387, 362 |
| **P1** | `CalendarView`: data local + edição de evento | `CalendarView.tsx` 60-130 |
| **P1** | Upload de fotos: ligar ou remover o código morto | `DeficienciesSection.tsx` 869-1033 · `PestsSection.tsx` 605-739 |
| **P2** | Extrair `SectionBanner`, `SearchBar`, `AccordionCard`, `GallerySlider`, `useGalleryUpload` | 1.1/1.2/1.3/1.4 |
| **P2** | Dar UI a `indoor_batches` (ou remover a coleção) | `App.tsx` 368-434 |
| **P2** | Unificar `isAdmin`/`canWrite` nas seções | `App.tsx` 783/794/809 |
| **P2** | Deduplicar banco de cidades e corrigir rótulo "INMET" | `server.ts` 911 · `WeatherView.tsx` 431 |
| **P2** | Remover imagens duplicadas `src/assets` × `public` | build |
| **P3** | `strict: true` gradual + testes (Vitest/Playwright) | `tsconfig.json` |
