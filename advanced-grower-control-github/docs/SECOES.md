# Detalhamento por seção (1.1 → 4.4)

> Mapa de comportamento de cada módulo: props, estados, regras, persistência e pontos de atenção.
> Números de linha referem-se aos arquivos no estado atual (contagem real do arquivo).
> Visão geral em [`ARQUITETURA.md`](./ARQUITETURA.md); receitas em [`GUIA-EVOLUCAO.md`](./GUIA-EVOLUCAO.md).

| # | Seção | Arquivo | Linhas | Props | Persiste | Publica |
|---|---|---|---|---|---|---|
| 1.1 | Deficiências | `DeficienciesSection.tsx` | 1.037 | dados, `isAdmin`, editar/novo, `pdfUrl`, `onSaveDeficiency` | ✅ `_v6` | ✅ |
| 1.2 | Pragas & MIP | `PestsSection.tsx` | 765 | dados, `isAdmin`, editar/novo, `pdfUrl`, `onSavePest` | ✅ `_v5` | ✅ |
| 1.3 | KNF/JADAM | `KnfJadamSection.tsx` | 185 | `recipes` | ❌ | ❌ |
| 1.4 | Bioinsumos | `BioinputsSection.tsx` | 126 | dados, `isAdmin`, `onAddNew` | ✅ `_v5` | ✅ |
| 1.5 | Análise de solo | `SoilAnalysisSection.tsx` | 1.293 | — | ❌ | ❌ |
| 1.6 | Cultivo | `CultivoSection.tsx` | 2.868 | madres, canteiros, pastas + CRUD | ✅ 3 coleções | ✅ |
| 2.1 | Manutenção | `CalendarView.tsx` | 621 | eventos + setter | ✅ | ✅ |
| 2.2 | Registro MIP | `CalendarView.tsx` | 621 | logs + setter | ✅ | ✅ |
| 3.1 | Estação | `WeatherView.tsx` | 1.120 | `subCategory` | ❌ | ❌ |
| 3.2 | IA clima | `WeatherView.tsx` | 1.120 | `subCategory` | ❌ | ❌ |
| 4.3 | Substrato | `ToolsView.tsx` | 407 | — | ❌ | ❌ |
| 4.4 | Biblioteca | `ToolsView.tsx` | 407 | documentos + setter, `isAdmin`, `publishedDocumentIds` | ✅ `_v5` | ✅ |

---

## 1.1 Deficiências nutricionais — `DeficienciesSection.tsx`

### Estrutura
- **Sem abas.** Banner (368-405) com "Galeria Fotos Drive" + "Abrir PDF no Drive"; busca (475-481) + 2 selects (485-504): posição da folha (`all | velhas | novas`) e tipo (`all | Macro | Secundário | Micro`).
- **Wizard de diagnóstico** (407-468): dois selects (local do sintoma × tipo de sintoma) → `getWizardMatches()` (319-340) cruza `targetLeaves` com palavras-chave em `symptoms[]` (`amarel|clorose`, `mancha|necrót`, `queimad|borda`, `deform|gancho`). O resultado só faz `setExpandedId`.
- **Lista em acordeão** (520-825), 1 item aberto por vez (`expandedId` inicia no primeiro). Cabeçalho (537-576): símbolo + tipo, elemento, badge de mobilidade, `targetLeaves`, botão editar (admin).
- **Expandido**: galeria com SafeImage (582-717), sintomas + causas (719-742), atlas de figuras (745-772), 3 colunas — correção orgânica/KNF, microrganismos solubilizadores, plantas companheiras (774-811) e nota ASTRAYA (813-819).
- **Galeria**: `images[]` (fallback `imageUrl`), setas, contador "n/total", zoom em modal (827-867). Upload local **apenas por drag-and-drop** (586-598), comprimindo para canvas ≤ 500 px / JPEG 0.65 (58-105) e gravando **data URL base64** no próprio JSON.
- **Código morto**: modal "Upload Independente de Fotos" (869-1033) — `setIsSectionUploadOpen(true)` não existe em nenhum lugar do repositório.

### Regras e dados
- 17 estados locais, todos voláteis (trocar de sub-aba desmonta a seção).
- Campos exibidos: `element`, `symbol`, `type`, `mobility` (só rótulo), `targetLeaves` (filtro/wizard), `symptoms`, `causes`, `correctiveOrganic`, `solubilizingMicroorganisms`, `companionPlants`, `astrayaTips`, `figures` (só `title`/`description`), `images`.
- **Não exibidos**: `correctiveMineral` (editável no modal administrativo desde a correção dos P0, mas ainda não renderizado no card), `pdfDriveUrl` por item, `figures[].figureNumber`, `figures[].imageUrl`.
- Seed: 11 itens (N, P, K, Ca, Mg, S, B, Cu, Mn, Zn, Fe), 31 figuras com numeração furada (faltam 1-2, 24-25, 29-30, 32, 35-38; "Figura 31" no Fe), 33 referências de imagem (11 JPGs locais + 22 Unsplash repetidos).

### Pontos de atenção
- **Corrigido**: editar não apaga mais campos — o modal faz spread do item original e preserva `solubilizingMicroorganisms`, `companionPlants`, `figures`, `images` e `pdfDriveUrl`; o formulário é limpo ao abrir "Novo".
- Excluir a foto empacotada não persiste: `mergeDeficiencies` (App 52-79) a repõe como capa no reload.
- O wizard pode abrir um item que os filtros escondem (não limpa busca/filtros).
- Upload sem dica visual; `alert()` para validação de arquivo; classes `animate-fadeIn`/`no-scrollbar` não existem no CSS.
- ⚠️ `isAdmin` aqui é o **papel** (App 783), não `canWrite`: operador não edita catálogo.

---

## 1.2 Pragas & MIP — `PestsSection.tsx`

### Estrutura
- Banner com PDF (286-314); busca (320-326) em `name`, `scientificName`, `identification`; select de categoria (330-342) com 6 opções fixas.
- **Lista plana** (356-603), sem agrupamento por categoria. Card: thumb 48 px + nome + badge de gravidade (rose/amber/emerald) + nome científico/categoria.
- Expandido: foto/carrossel + lightbox (429-538, 741-762); identificação + sintomas de dano (540-559); prevenção + controle biológico (562-585); receitas orgânicas/JADAM (587-597).
- **Código morto**: modal de upload (605-739); `handleImageUpload` (83) nunca é chamado → **não há nenhuma via de upload local** nesta seção.

### Regras e dados
- 12 estados locais; `severity` só rótulo; `chemicalOrMineral` nunca renderizado.
- Seed: 10 pragas — Ácaro 2, Inseto Sugador 3, Praga do Solo 1, Fungo/Bactéria 2, Nematoide 2, **Lagarta/Broca 0**; gravidade Alta 8 / Média 2 / Baixa 0. Só o item de ácaro tem `images[]`; 9 dependem de `imageUrl` (Unsplash repetido).
- `CATEGORY` no `<option>` inclui "Lagarta/Broca" sem itens e não há como criar categoria nova.

### Pontos de atenção
- **Corrigido**: a edição preserva `chemicalOrMineral` e o `pdfDriveUrl` de cada item; o formulário de praga do modal administrativo, que **não era renderizado** (abria sem campos), foi restaurado com todos os campos do tipo.
- Não há exclusão de praga em nenhuma tela.
- Galeria sem clamp de índice ao remover foto (diferente de 1.1).

---

## 1.3 KNF / JADAM — `KnfJadamSection.tsx`

### Estrutura
- Banner + calculadora de volume (37-65) + chips de método (67-82: `all`, KNF, JADAM, KYUSEI EM) + acordeão (84-182).
- Cada receita: descrição, ingredientes (nome/ratio), passos, benefícios e a **dosagem calculada**.

### Regra de cálculo (frágil)
```ts
// 91-94 — heurística por includes() no texto livre applicationDosage
const ratio = dosage.includes('1:1000') ? 1000 : dosage.includes('1:500') ? 500 : 1000;
const dose = (targetVolumeLiters / ratio).toFixed(1); // mL/L aproximado
```
Erra JMS ("até 1:10" → assume 1000, subdosagem ~10×), biopesticida JADAM (mistura de 3 produtos com doses diferentes) e EM5 ("1:500 a 1:200" → usa 1:500). Sem parse de unidade, sem faixa, sem clamp de volume.

### Dados
- 9 receitas (KNF 4: FPJ, LAB, FAA, FFJ · JADAM 3: JMS, JWA, biopesticida · KYUSEI EM 2). Sem imagens, sem PDF.
- `recipes` é `useState(INITIAL_KNF_JADAM_RECIPES)` sem persistência (App 273) → **módulo 100% estático**, sem edição e sem publicação.

---

## 1.4 Bioinsumos — `BioinputsSection.tsx`

### Estrutura
- Busca (productName/activeAgent/targetPestOrDisease) + select de categoria + botão "novo" (admin) + grid 2 colunas (88-123).
- Cards sem acordeão: todos os 7 campos visíveis.

### Dados e lacunas
- 10 itens: Biofungicida 2, Bioinseticida 4, Inoculante 1, Bioestimulante 2, **Bionematicida 1** — mas o `<select>` (69-72) **não tem** a opção `Bionematicida`: o 10º item só aparece em "Todas".
- Não há `onEditItem` (não é possível editar) nem exclusão.

---

## 1.5 Análise de solo — `SoilAnalysisSection.tsx`

### Estrutura
Página única em 5 blocos, **sem props e sem persistência** (estado local, perdido ao trocar de aba):

1. Banner + select global de unidade (`cmolc` × `mmolc`) + "Copiar Laudo" (381-429).
2. Entradas (431-613): pH, MO, Ca, Mg, K (cada cátion com unidade própria), CTC, e volume de solo (presets 50/100/300/500/1000 L).
3. Saídas (615-744): Ca:Mg, V%, Ca:K, Mg:K; 3 barras de saturação; diagnóstico textual.
4. Alerta de Mg crítico (746-798): dolomítico × calcítico.
5. Recomendação em gramas do elemento (800-945) + 3 "janelas" de insumo com memória de cálculo (947-1289).

### Fórmulas
```ts
// normalização (239-242)
caCmol = caUnit === 'mmolc' ? calcium / 10 : calcium;              // idem Mg, K, CTC

// relações e saturação (245-255)
sumCations = caCmol + mgCmol + kCmol;
caRatio = caCmol / mgCmol;  caKRatio = caCmol / kCmol;  mgKRatio = mgCmol / kCmol;
baseSatV = (sumCations / ctcCmol) * 100;
caSatPct = (caCmol / ctcCmol) * 100;                               // idem Mg, K

// metas ASTRAYA (257-267): Ca 65% · Mg 15% · K 4,5% da CTC
targetCaCmol = (65 / 100) * ctcCmol;                               // idem Mg, K
defCaCmol = max(0, targetCaCmol - caCmol);                         // déficit nunca negativo

// cmolc → g (274-285): Ca 0,2004 · Mg 0,1215 · K 0,3910 g/dm³ por cmolc
gCaPerLiter = defCaCmol * 0.2004;  autoGramsCa = gCaPerLiter * soilVolume;

// elemento → insumo (301-323)
insumoCaGrams = ((activeGramsCa * 1.397) * 100) / percentCaO;      // Mg 1.6595 · K 1.205
```
Diagnóstico (326-340): `isMgCriticallyLow = mgCmol < 0.8 || mgSatPct < 10 || caMg > 5.5 || (mgK < 2 && kCmol > 0.2)`; `statusCaMg` (ideal 3,0-5,5); `statusPh` (ácido < 5,8 · alcalino > 7,0).

Exemplo com os defaults (5,2 Ca · 1,4 Mg · 0,6 K · CTC 12 · 100 L): V% 60,0; déficits 2,60/0,40/0,00 cmolc; 52,10 g Ca e 4,86 g Mg; wollastonita 43% → 169,28 g (1,69 g/L); MgCO₃ 47% → 17,16 g.

### Pontos de atenção
- **Unidade global × por elemento se desincronizam**; o alerta de Mg (756) imprime valor em cmolc com rótulo que pode ser mmolc (erro 10×). `handleUnitChange` não re-sincroniza se a unidade já for a selecionada (207).
- **PRNT 85% ignorado** nos calcários → subdosagem ~18%.
- **V% 65-75% × metas que somam 84,5%**: quem acerta os cátions vê V% em âmbar.
- **Densidade 1 kg/L** implícita em `g/dm³ × litros` → superdose em substrato.
- **N, P e MO** existem no tipo/estado mas não têm input, fórmula nem interpretação (o título promete "interpretador de laudo").
- Caixa de diagnóstico pode ficar vazia para pH > 7; limiares divergentes (Ca:Mg verde ≤ 5 vs status > 5,5).
- Modo manual remove déficit/g por litro sem aviso; `clipboard` sem `.catch`.

---

## 1.6 Cultivo — `CultivoSection.tsx`

### Props e permissões (41-106)
```ts
interface CultivoSectionProps {
  madresList: MotherGenetics[]; outdoorPlots: OutdoorCropPlot[]; cycleFolders: CycleFolder[];
  isAdmin: boolean;                              // = canWrite no App (820-833)
  publishedMadreIds: string[]; publishedOutdoorIds: string[]; publishedCycleFolderIds: string[];
  onSaveMadre; onDeleteMadre; onSaveOutdoorPlot; onDeleteOutdoorPlot; onSaveCycleFolder; onDeleteCycleFolder;
}
const canManageMadre = (id) => isAdmin && !publishedMadreIds.includes(id);   // 104-106
```
Itens publicados ficam somente leitura para quem não é admin.

### Três sub-abas (`activeSub`, 109)
`'madres'` (default) · `'cultivo_externo'` · `'pasta_ciclos'`.

### Helpers de data (58-87, 743-752)
```ts
calculateFourMonthsEnd(start): Date(y, m - 1 + 4, d - 1)   // ciclo quadrimestral
formatDateBr('YYYY-MM-DD') → 'DD/MM/YYYY'                   // sem shift de timezone
findMatchingFolderId(folders, refDate): pasta cujo intervalo contém a data,
                                        senão a última pasta do array; '' se não houver pastas
calculateMonths(início, fim): Math.round(|dias| / 30), fallback '6-8 meses'   // 743-752
```
`findMatchingFolderId` usa `toISOString()` (UTC) como "hoje" — mesmo bug de fuso das outras telas, entre 21h e 0h. E, como o App **prepende** pastas novas (`[novo, ...prev]`), "última do array" é a pasta mais **antiga**, não a mais próxima.
`calculateFourMonthsEnd` funciona para dias 1-28; para 29-31 o `Date` transborda (ex.: `2026-10-31` → `2027-03-02`).

### Madres (145-167, 274-381)
- Formulário em modal com: genética\*, banco, THC/CBD, dia de início, último dia, dificuldade, ataque de pragas, clones/temporada, saúde dos clones, enraizamento, casa de vegetação, observações, lista de fotos (apenas **URL**, sem upload de arquivo).
- Defaults de novo item: THC 22%/CBD <0,5%, início = hoje, fim = hoje + 210 dias, clones 120, saúde Excelente, enraizamento "95% em 8-10 dias", casa "Casa de Vegetação #1", foto fallback local.
- Validação: apenas `genetica` obrigatória; demais campos recebem defaults (`banco: 'Não informado'`, `enraizamento: 'Em avaliação'`…).
- Salvar preserva `status`/`archived`/`cycle*` do item editado e grava `imageUrl = images[0]`.

### Canteiros outdoor (167-184, 384-479)
- `outdoorForm: Partial<OutdoorCropPlot>` com defaults (50-80 plantas, Living Soil, sombrite). Validação: `nomeCanteiro`.
- Novas fotos só por URL (`handleAddPhotoToOutdoorModal`, 422-436); URL pendente no input é incluída no submit.

### Pastas de ciclo (199-206, 618-673)
- CRUD em modal: nome\*, início, fim, notas; `periodLabel` fixo "Ciclo de 4 Meses"; `id: 'ciclo-' + Date.now()`.
- Ao **renomear**, propaga `cycleLabel` para todas as madres/canteiros ligados à pasta (657-668).
- Seed: 3 pastas de 2026 (Q1, Q2, Q3).

### Arquivamento (186-197, 482-555)
- Abre modal com pasta sugerida (`item.cycleFolderId` ou `findMatchingFolderId(pela data de início/plantio)`), notas e opção de **criar pasta inline** (quando não há pastas, já entra em modo criação).
- Confirmar grava na madre `status: 'Arquivada'`, `archived: true`, `cycleFolderId`, `cycleLabel`, `archivedAt` (hoje) e `archiveNotes`; no canteiro apenas `archived: true` + os mesmos campos.
- **Restaurar** (558-573) volta `status: 'Ativa'`/`archived: false`, mas **mantém `cycleFolderId`/`cycleLabel`** — o item restaurado continua vinculado à pasta antiga (pode aparecer na visão da pasta e na ativa ao mesmo tempo).
- **Clonar para novo ciclo** (576-615): novo `id`, datas reiniciadas (madre: +210 dias; canteiro: `calculateFourMonthsEnd`), campos de arquivo limpos, histórico preservado no item arquivado.

### Exclusão (138-143, 676-691)
Modal próprio de confirmação (não usa `window.confirm`), com `type: 'madre' | 'outdoor' | 'folder'`; ao excluir a pasta selecionada, o filtro volta para `all`. Não há verificação de itens vinculados à pasta.

### Filtros e busca (111-119, 693-730)
- Ativas: busca em genética, banco, casa de vegetação e ataque de pragas; filtros de dificuldade e saúde dos clones.
- Pastas: filtro por pasta, tipo (`all|madre|outdoor`) e busca própria; `totalArchivedCount` (215) alimenta o badge da aba.

### Anatomia do arquivo
- **49 `useState`**, 6 modais (madre, outdoor, arquivar, pasta, exclusão, zoom), 4 formulários, 4 blocos de card (madre ativa, outdoor ativo, madre arquivada, outdoor arquivado) e **zero subcomponentes internos**; nenhum `useEffect`/`useMemo`/`useCallback`.
- ~900 linhas de cards repetidos e 2 blocos de fotos em modal → cada tecla digitada re-renderiza a árvore inteira.

### Pontos de atenção
- 2.868 linhas em um único componente: formulários, modais e listas no mesmo arquivo (candidato a quebrar em `MadreCard`, `MadreModal`, `OutdoorModal`, `CycleFoldersPanel`).
- **Datas em UTC** em todo o arquivo (180, 308-310, 405, 492-494, 523, 578-580, 600, 628, 643, 652): após 21h em America/Sao_Paulo o "hoje" gravado é o dia seguinte.
- **Foto nova não vira a principal**: em item novo a lista já começa com o fallback, a URL é anexada ao final e `imageUrl = images[0]` — o fallback é persistido como se fosse foto real e a imagem adicionada não aparece sem navegar no carrossel.
- **Zoom usa sempre `FALLBACK_MADRE_IMAGE`** (2858), inclusive para canteiros outdoor.
- Sem validação de ordem de datas, duplicidade, `maxLength`, tipo/tamanho de URL ou limite de fotos; aceita `data:image` (peso) e `blob:` (inválido após reload); links de pasta do Drive não são detectados (`isGoogleDriveFolder` existe e não é usado).
- Se todas as pastas forem excluídas e a criação inline for desligada, o item pode ser arquivado em `'ciclo-geral'` (pasta órfã, sem registro).
- Restaurar mantém `cycleFolderId`/`cycleLabel`/`archivedAt`/`archiveNotes` antigos; a lista ativa checa `archived` **e** `status`, então um item com metadados divergentes pode ficar "invisível" nas duas listas.
- Busca chama `toLowerCase()` direto em campos que podem faltar em dados legados (risco de exceção); sem normalização de acentos.
- Formulários usam `noValidate` (só validação manual): aceitam `fim < início`, colheita antes do plantio, `clonesPorTemporada` negativo e datas impossíveis normalizadas pelo `Date`; alterar `dataPlantio` **não** recalcula a colheita.
- Rótulos fora de ordem no modal de madre ("7. Ataque de Pragas" aparece depois de "10. Enraizamento"); o estado inicial do outdoor (`quantidadePlantas: 50`) diverge do default de cadastro (80).
- IDs gerados com `Date.now()` em todo o arquivo (355, 457, 509, 646): dois submits no mesmo milissegundo colidem e o upsert sobrescreve.
- Itens publicados ficam sem selo visual — o operador só percebe que é somente leitura porque os botões somem; a contagem de itens por pasta é O(pastas × itens) a cada render.
- `status 'Em Transição'` existe no tipo e nunca é atribuído/exibido; a métrica "Ciclos Arquivados" conta apenas madres (não canteiros).
- `showToast` usa `setTimeout` sem cleanup e timers concorrentes (125); modais sem Esc/focus trap/`aria-modal`.
- Excluir pasta não verifica itens vinculados (arquivos ficam apontando para um `cycleFolderId` inexistente); a proteção de item publicado é só de UI.
- `isAdmin` aqui é `canWrite` (App 823): operador edita o próprio cultivo, mas **não** os catálogos 1.1/1.2/1.4.

---

## 2.1 Manutenção do cultivo — `CalendarView.tsx`

- Props (controladas): `events`, `setEvents`, `mipLogs`, `setMipLogs`, `canEdit`, `publishedEventIds`, `publishedMipLogIds`, `subCategory`.
- Calendário mensal (domingo→sábado) com padding do 1º dia, navegação ‹ ›/"Hoje", badge "N itens" por dia, lista do dia selecionado.
- `CalendarEvent { id, date, type, title, notes, completed, dosageOrVolume? }`; tipos: Rega, Adubação, Poda, MIP_Aplicacao, Muda_Estagio, Manutencao.
- Cria formulário inline (título obrigatório, data, tipo, dosagem, notas), `id: 'ev-' + Date.now()`, insere no topo; conclusão é toggle imutável; exclusão direta **sem confirmação**.
- **Não existe edição** de evento; não há filtro por tipo/status/texto.
- App envolve o setter (`setEventsFromView`, 617-627): recalcula sobre `viewEvents` e, para não-admin, remove IDs publicados antes de gravar.
- ⚠️ "Hoje" via `toISOString()` (UTC): entre 21h e 0h em America/Sao_Paulo o calendário abre no dia seguinte.

## 2.2 Registro MIP — `CalendarView.tsx`

- `MipLogEntry { id, date, zone, pestObserved, severityLevel 1-5, actionTaken, responsible }`.
- Formulário sem campo de data (usa a data selecionada compartilhada com a aba 2.1); severidade com 5 rótulos ("1 - Leve" → "5 - Infestação Crítica") e cores (≥4 rose, 3 amber).
- Sem agregações (média por zona/praga, série temporal, alerta de nível 5) além da contagem diária.
- Itens publicados: controles desabilitados, sem selo "publicado" (UX ambígua).

---

## 3.1 Estação meteorológica / 3.2 IA clima — `WeatherView.tsx`

### Fonte e contrato
- `GET /api/weather/inmet?city=...` (sem `res.ok`, sem `AbortController`, sem estado de erro) + `api.rainviewer.com/public/weather-maps.json` a cada 5 min.
- Consome ~25 campos já formatados: `temperature`, `humidity`, `vpd`, `vpdRecommendation`, `dewPoint`, `windSpeed/Gust/Direction`, `sunrise/sunset/photoperiod`, `moonPhase{name,emoji,illumination,agronomicTip}`, `solarRadiation`, `rainProbability`, `accumulatedRain24h`, `uvIndex/Max`, `precipitationType`, `condition`, `station`, `cityName`, `altitude`, `coordinates`, `forecast[6]`.
- **Não há cálculo meteorológico no cliente** — VPD, lua e fotoperíodo vêm prontos do servidor.
- Não existem blocos próprios de umidade do solo, UV ou chuva (aparecem como subtítulos/labels); `soilMoisture` e `vpdStatus` voltam da API e não são usados.

### UI
- 4 cartões (temperatura, UR, vento, ciclo solar), cartão da lua, cartão de VPD, grade de previsão de 6 períodos, barra de telemetria da "estação" e mapa Leaflet com camadas (satélite/CARTO), radar RainViewer animado e iframe do Windy.
- Sub-aba `ia_assistente`: formulário próprio (não usa o modal global) que chama `/api/ai/diagnose` com `category`, `prompt`, `plantStage`, `temp/rh/vpd` e `imageBase64`. A rota exige sessão autenticada e limita 20 chamadas/IP a cada 5 min (prompt ≤ 4.000 caracteres, imagem ≤ ~8 MB).

### Pontos de atenção
- **Fallbacks fixos** quando a API falha (14,3 °C · 88% · VPD 0,20) e `rh >= 80` dispara alerta de Botrytis **sem dado real**; `||` converte zeros legítimos em defaults (0 W/m² → 720; 0% de chuva → 25%).
- **Mapa quebra ao voltar da aba de IA**: o container é desmontado, mas a instância Leaflet não é limpa nem recriada (efeito não depende de `subCategory`).
- Timer de 800 ms do radar roda sempre (re-render ~1,25×/s) e os modos de radar alternativos são inalcançáveis; o fetch ao RainViewer continua mesmo sem uso.
- `onOpenAiAssistant` é prop morta; `colorScheme`/`mapTileLayer` nunca mudam.
- Banco de cidades duplicado (cliente 431-436 × servidor 911-918) e rótulo "INMET" sobre dados Open-Meteo.

---

## 4.3 Calculadora de substrato — `ToolsView.tsx`

```ts
totalLiters = numPots * potSizeLiters;
turfa = total * 0.33; perlita = total * 0.33; húmus = total * 0.30; biochar = total * 0.03;
rockallGrams = round(totalLiters * doseGL);
```
- Entradas: nº de vasos, litros/vaso, dose de Rockall (presets 5/10/15/20 g/L). Default 12 × 11 L = 132 L → 43,6/43,6/39,6/4,0 L e 1.320 g.
- Saídas: volumes por componente, total de Rockall formatado (g/kg) e instruções de preparo.
- ⚠️ Proporções somam **99%** (1,32 L de 132 L sem origem) e o arredondamento por componente faz a soma exibida não fechar com o total.

## 4.4 Biblioteca de documentos — `ToolsView.tsx`

- `DriveDocument { id, title, category, description, url, updatedAt }`; grid 2 colunas com categoria, título, descrição, data e link "Abrir no Drive".
- Criar: `id: 'doc-' + Date.now()`, `updatedAt` em UTC, insere no topo, limpa título/descrição/URL (mantém a categoria); validação só HTML5 + guard.
- **Sem update** (CRUD na prática = CRD); excluir sem confirmação e só quando `isAdmin && !publishedDocumentIds.includes(doc.id)`.
- ⚠️ Excluir um documento do seed "ressuscita" no reload (merge do App 300-303); a exclusão não altera o snapshot publicado (leitores continuam vendo até republicar); `href` sem allowlist de protocolo.
- Publicação: `publishedView` + `setDocumentsFromView` (App 641-651) + barra de publicação no módulo 4.4.
