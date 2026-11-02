import React, { useState } from 'react';
import {
  MotherGenetics,
  OutdoorCropPlot,
  IndoorCropBatch,
  CultivoSubSection,
  CycleFolder,
  OutdoorAmbiente,
  IndoorSetor,
} from '../types';
import {
  Sprout,
  Sun,
  Plus,
  Search,
  Filter,
  Calendar,
  Dna,
  Edit2,
  Trash2,
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  TrendingUp,
  Award,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Link,
  Camera,
  ImagePlus,
  Archive,
  Folder,
  FolderOpen,
  FolderPlus,
  RotateCcw,
  Copy,
} from 'lucide-react';
import { SafeImage } from './SafeImage';
import { formatImageUrl, FALLBACK_MADRE_IMAGE, FALLBACK_OUTDOOR_IMAGE } from '../utils/imageUtils';
import { useI18n, useTerm } from '../i18n';

const COPY = {
  pt: {
    title: '1.6 Gestão & Catalogação de Cultivo',
    session: 'Sessão Agricultura 1.6',
    madresTab: 'Madres (Casa de Vegetação)',
    outdoorTab: 'Cultivo Área Externa',
    outdoorDesc: 'Mapeamento de canteiros orgânicos ao ar livre em solo vivo (Living Soil), aproveitamento de luz solar direta e proteção contra intempéries.',
    addMadre: 'Cadastrar Genética Madre',
    totalGenotypes: 'Total Genótipos',
    activeMadres: 'Madres Ativas',
    maintenance: 'Manutenção',
    cycle: '6 a 8 Meses / Ciclo',
    clones: 'Clones Estimados',
    clonesSeason: 'clones/temp',
    environment: 'Ambiente',
    greenhouse: 'Estufa Vegetativa',
    search: 'Buscar por genética, banco de sementes, estufa ou pragas...',
    difficulty: 'Dificuldade:',
    cloneHealth: 'Saúde Clones:',
    all: 'Todas',
    genotype: 'Genótipo Madre',
    bank: 'Banco:',
    start: 'Início:',
    end: 'Término (6-8m):',
    cycleLabel: 'Ciclo de Manutenção em Estufa:',
    addPhoto: '+ Adicionar Foto via Link',
    photos: 'Fotos da Genética',
    difficultyLabel: 'Dificuldade Cultivo',
    clonesPerSeason: 'Clones / Temporada',
    cloneHealthLabel: 'Saúde dos Clones',
    rooting: 'Enraizamento',
    pestAttack: 'Ataque de Pragas & Resistência:',
    obs: 'Obs:',
    edit: 'Editar',
    delete: 'Excluir',
    addOutdoor: 'Novo Canteiro Área Externa',
    plantio: 'Plantio:',
    harvest: 'Previsão Colheita:',
    photoperiod: 'Fotoperíodo Natural:',
    substrate: 'Substrato / Solo:',
    protection: 'Proteção Climática:',
    observations: 'Observações:',
    noResults: 'Nenhum genótipo de Madre encontrado',
    tagline: 'CULTIVO',
    infoTitle: 'Casa de Vegetação Dedicada - Catalogação de Genótipos (6 a 8 Meses)',
    infoBefore: 'Módulo de catalogação de novas plantas matrizes (Madres). As plantas são mantidas durante',
    infoStrong: '6 a 8 meses',
    infoAfter: 'em estufa climatizada com iluminação fotoperiódica vegetativa, visando a produção contínua de clones sadios e preservação da estabilidade genética.',
    thcCbd: 'THC / CBD',
    cycleDefault: '6-8 meses',
    monthsUnit: 'meses',
    daysUnit: 'dias',
    clickToZoom: '🔍 Clique p/ Ampliar',
    zoomPhoto: 'Ampliar Foto',
    prevPhoto: 'Foto anterior',
    nextPhoto: 'Próxima foto',
    madreZoomTitle: 'Madre: {name}',
    photoUrlPlaceholder: 'Cole URL da foto (Google Drive, Imgur, Web)...',
    save: 'Salvar',
    clonesUnit: 'clones',
    confirmDeleteMadre: 'Deseja realmente remover a genética madre {name}?',
    emptyMadresHint: 'Tente alterar os termos da busca ou filtros.',
    emptyMadresAdmin: "Clique em '{action}' para inserir um novo genótipo.",
    plantsUnit: 'Plantas',
    plotPhotos: 'Fotos do Canteiro',
    plotZoomTitle: 'Área Externa: {name}',
    emptyPlotsTitle: 'Nenhum Canteiro de Área Externa registrado',
    emptyPlotsAdmin: "Clique em '{action}' para adicionar o primeiro lote ao ar livre.",
    emptyPlotsBody: 'Nenhum lote externo catalogado no momento.',
    confirmDeletePlot: 'Deseja remover o canteiro {name}?',
    close: 'Fechar',
    cancel: 'Cancelar',
    add: 'Adicionar',
    preview: 'Prévia',
    modalNewMadre: 'Cadastrar Nova Genética Madre (Casa de Vegetação)',
    modalEditMadre: 'Editar Genética Madre',
    madreFormIntro: 'Preencha as características para catalogação do genótipo mantido durante 6 a 8 meses na casa de vegetação dedicada.',
    madrePhotoLabel: 'Link da Foto do Genótipo Madre (URL)',
    photoUrlPlaceholderLong: 'Cole a URL da foto (Google Drive, Imgur, web)...',
    fieldGenetics: '1. Genética (Nome do Genótipo) *',
    phGenetics: 'Ex: Amnesia Haze #3',
    fieldBank: '2. Banco de Sementes / Breeder *',
    phBank: 'Ex: Royal Queen Seeds',
    fieldThcCbd: '3. Porcentagem de CBD/THC *',
    phThcCbd: 'Ex: THC: 22% / CBD: <0.5%',
    fieldGreenhouseId: 'Identificação da Casa de Vegetação',
    phGreenhouseId: 'Ex: Casa de Vegetação #1',
    defaultGreenhouseId: 'Casa de Vegetação #1',
    fieldStartDate: '4. Dia de Início (Entrada na Estufa) *',
    fieldEndDate: '5. Último Dia (Término Manutenção 6-8 Meses) *',
    expectedDuration: 'Duração prevista: {duration}',
    fieldDifficulty: '6. Dificuldade em Cultivar *',
    fieldClones: '8. Clones por Temporada *',
    fieldCloneHealth: '9. Saúde dos Clones *',
    fieldRooting: '10. Taxa & Tempo de Enraizamento *',
    phRooting: 'Ex: 95% de sucesso em 8-10 dias',
    fieldPests: '7. Ataque de Pragas (Suscetibilidade & Pragas Recorrentes) *',
    phPests: 'Descreva a suscetibilidade e histórico de pragas...',
    fieldNotes: 'Observações Gerais do Agrônomo / Administrador',
    phNotes: 'Notas adicionais sobre podas, nutrição especial ou fertirrigação...',
    saveMadre: 'Salvar Genética Madre',
    updateMadre: 'Atualizar Madre',
    modalNewPlot: 'Novo Canteiro de Área Externa',
    modalEditPlot: 'Editar Canteiro Área Externa',
    plotPhotoLabel: 'Link da Foto do Canteiro / Talhão (URL)',
    fieldPlotName: 'Nome do Canteiro / Talhão *',
    phPlotName: 'Ex: Talhão Área Externa #1',
    fieldCultivar: 'Genética / Cultivar Principal *',
    phCultivar: "Ex: Charlotte's Web",
    fieldPlantCount: 'Quantidade de Plantas *',
    fieldPhotoperiod: 'Fotoperíodo Natural *',
    phPhotoperiod: 'Ex: Crescimento Vegetativo (Dias Longos)',
    fieldPlantingDate: 'Data do Plantio *',
    fieldHarvestDate: 'Previsão de Colheita *',
    fieldSubstrate: 'Substrato / Solo Vivo *',
    phSubstrate: 'Ex: Solo Vivo Orgânico + Cobertura KNF',
    fieldProtection: 'Proteção Climática / Estrutura *',
    phProtection: 'Ex: Estufa com Sombrite 30% + Malha Anti-granizo',
    fieldPlotNotes: 'Observações Gerais do Canteiro',
    phPlotNotes: 'Notas adicionais sobre MIP, adubação de cobertura...',
    savePlot: 'Salvar Canteiro',
    updatePlot: 'Atualizar Canteiro',
    defaultPlotName: 'Talhão Área Externa #2',
    defaultSubstrate: 'Solo Vivo Orgânico com Húmus e KNF',
    defaultProtection: 'Sombrite 30% + Tela Anti-Granizo',
    defaultPlotNotes: 'MIP orgânico com Beauveria bassiana.',
    defaultPestNotes: 'Baixa suscetibilidade; monitorar preventivamente.',
    defaultRooting: '95% em 8-10 dias',
    toastPhotoAddedMadre: '🎉 Link de foto adicionado à Madre {name}!',
    toastPhotoAddedPlot: '🎉 Link de foto adicionado ao canteiro {name}!',
    toastPhotoRemoved: '🗑️ Foto removida da galeria.',
    toastMadreCreated: '✅ Genética Madre cadastrada com sucesso!',
    toastMadreUpdated: '✅ Genética Madre atualizada com sucesso!',
    toastPlotCreated: '✅ Canteiro de Área Externa salvo com sucesso!',
    toastPlotUpdated: '✅ Canteiro de Área Externa atualizado com sucesso!',
  },
  en: {
    title: '1.6 Cultivation Management & Catalogue',
    session: 'Agriculture section 1.6',
    madresTab: 'Mother plants (greenhouse)',
    outdoorTab: 'Outdoor cultivation',
    outdoorDesc: 'Mapping of organic outdoor beds in living soil, direct sunlight use and protection against adverse weather.',
    addMadre: 'Register mother genetics',
    totalGenotypes: 'Total genotypes',
    activeMadres: 'Active mothers',
    maintenance: 'Maintenance',
    cycle: '6 to 8 months / cycle',
    clones: 'Estimated clones',
    clonesSeason: 'clones/batch',
    environment: 'Environment',
    greenhouse: 'Vegetative greenhouse',
    search: 'Search genetics, seed bank, greenhouse or pests...',
    difficulty: 'Difficulty:',
    cloneHealth: 'Clone health:',
    all: 'All',
    genotype: 'Mother genotype',
    bank: 'Bank:',
    start: 'Start:',
    end: 'End (6-8m):',
    cycleLabel: 'Greenhouse maintenance cycle:',
    addPhoto: '+ Add photo via link',
    photos: 'Genetics photos',
    difficultyLabel: 'Cultivation difficulty',
    clonesPerSeason: 'Clones / season',
    cloneHealthLabel: 'Clone health',
    rooting: 'Rooting',
    pestAttack: 'Pest pressure & resistance:',
    obs: 'Notes:',
    edit: 'Edit',
    delete: 'Delete',
    addOutdoor: 'New outdoor plot',
    plantio: 'Planting:',
    harvest: 'Expected harvest:',
    photoperiod: 'Natural photoperiod:',
    substrate: 'Substrate / soil:',
    protection: 'Climate protection:',
    observations: 'Notes:',
    noResults: 'No mother genotype found',
    tagline: 'CULTIVATION',
    infoTitle: 'Dedicated greenhouse - genotype cataloguing (6 to 8 months)',
    infoBefore: 'Catalogue module for new mother plants (Madres). The plants are kept for',
    infoStrong: '6 to 8 months',
    infoAfter: 'in a climate-controlled greenhouse with vegetative photoperiod lighting, aiming at the continuous production of healthy clones and the preservation of genetic stability.',
    thcCbd: 'THC / CBD',
    cycleDefault: '6-8 months',
    monthsUnit: 'months',
    daysUnit: 'days',
    clickToZoom: '🔍 Click to enlarge',
    zoomPhoto: 'Enlarge photo',
    prevPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    madreZoomTitle: 'Mother: {name}',
    photoUrlPlaceholder: 'Paste photo URL (Google Drive, Imgur, web)...',
    save: 'Save',
    clonesUnit: 'clones',
    confirmDeleteMadre: 'Do you really want to remove the mother genetics {name}?',
    emptyMadresHint: 'Try changing the search terms or filters.',
    emptyMadresAdmin: "Click '{action}' to insert a new genotype.",
    plantsUnit: 'plants',
    plotPhotos: 'Plot photos',
    plotZoomTitle: 'Outdoor area: {name}',
    emptyPlotsTitle: 'No outdoor plot registered',
    emptyPlotsAdmin: "Click '{action}' to add the first outdoor batch.",
    emptyPlotsBody: 'No outdoor batch catalogued at the moment.',
    confirmDeletePlot: 'Remove plot {name}?',
    close: 'Close',
    cancel: 'Cancel',
    add: 'Add',
    preview: 'Preview',
    modalNewMadre: 'Register new mother genetics (greenhouse)',
    modalEditMadre: 'Edit mother genetics',
    madreFormIntro: 'Fill in the traits to catalogue the genotype kept for 6 to 8 months in the dedicated greenhouse.',
    madrePhotoLabel: 'Mother genotype photo link (URL)',
    photoUrlPlaceholderLong: 'Paste the photo URL (Google Drive, Imgur, web)...',
    fieldGenetics: '1. Genetics (genotype name) *',
    phGenetics: 'e.g. Amnesia Haze #3',
    fieldBank: '2. Seed bank / breeder *',
    phBank: 'e.g. Royal Queen Seeds',
    fieldThcCbd: '3. CBD/THC percentage *',
    phThcCbd: 'e.g. THC: 22% / CBD: <0.5%',
    fieldGreenhouseId: 'Greenhouse identification',
    phGreenhouseId: 'e.g. Greenhouse #1',
    defaultGreenhouseId: 'Greenhouse #1',
    fieldStartDate: '4. Start date (greenhouse entry) *',
    fieldEndDate: '5. Last day (end of 6-8 month maintenance) *',
    expectedDuration: 'Expected duration: {duration}',
    fieldDifficulty: '6. Growing difficulty *',
    fieldClones: '8. Clones per season *',
    fieldCloneHealth: '9. Clone health *',
    fieldRooting: '10. Rooting rate & time *',
    phRooting: 'e.g. 95% success in 8-10 days',
    fieldPests: '7. Pest pressure (susceptibility & recurring pests) *',
    phPests: 'Describe susceptibility and pest history...',
    fieldNotes: 'General agronomist / administrator notes',
    phNotes: 'Additional notes on pruning, special nutrition or fertigation...',
    saveMadre: 'Save mother genetics',
    updateMadre: 'Update mother',
    modalNewPlot: 'New outdoor plot',
    modalEditPlot: 'Edit outdoor plot',
    plotPhotoLabel: 'Plot / bed photo link (URL)',
    fieldPlotName: 'Plot / bed name *',
    phPlotName: 'e.g. Outdoor plot #1',
    fieldCultivar: 'Genetics / main cultivar *',
    phCultivar: "e.g. Charlotte's Web",
    fieldPlantCount: 'Number of plants *',
    fieldPhotoperiod: 'Natural photoperiod *',
    phPhotoperiod: 'e.g. Vegetative growth (long days)',
    fieldPlantingDate: 'Planting date *',
    fieldHarvestDate: 'Expected harvest *',
    fieldSubstrate: 'Substrate / living soil *',
    phSubstrate: 'e.g. Organic living soil + KNF mulch',
    fieldProtection: 'Climate protection / structure *',
    phProtection: 'e.g. Greenhouse with 30% shade net + anti-hail mesh',
    fieldPlotNotes: 'General plot notes',
    phPlotNotes: 'Additional notes on IPM, top dressing...',
    savePlot: 'Save plot',
    updatePlot: 'Update plot',
    defaultPlotName: 'Outdoor plot #2',
    defaultSubstrate: 'Organic living soil with humus and KNF',
    defaultProtection: '30% shade net + anti-hail screen',
    defaultPlotNotes: 'Organic IPM with Beauveria bassiana.',
    defaultPestNotes: 'Low susceptibility; monitor preventively.',
    defaultRooting: '95% in 8-10 days',
    toastPhotoAddedMadre: '🎉 Photo link added to mother {name}!',
    toastPhotoAddedPlot: '🎉 Photo link added to plot {name}!',
    toastPhotoRemoved: '🗑️ Photo removed from the gallery.',
    toastMadreCreated: '✅ Mother genetics registered successfully!',
    toastMadreUpdated: '✅ Mother genetics updated successfully!',
    toastPlotCreated: '✅ Outdoor plot saved successfully!',
    toastPlotUpdated: '✅ Outdoor plot updated successfully!',
  },
  es: {
    title: '1.6 Gestión y Catalogación del Cultivo',
    session: 'Sección Agricultura 1.6',
    madresTab: 'Madres (invernadero)',
    outdoorTab: 'Cultivo exterior',
    outdoorDesc: 'Mapeo de bancales orgánicos al aire libre en suelo vivo, aprovechamiento de la luz solar directa y protección contra la intemperie.',
    addMadre: 'Registrar genética madre',
    totalGenotypes: 'Total de genotipos',
    activeMadres: 'Madres activas',
    maintenance: 'Mantenimiento',
    cycle: '6 a 8 meses / ciclo',
    clones: 'Clones estimados',
    clonesSeason: 'clones/temporada',
    environment: 'Ambiente',
    greenhouse: 'Invernadero vegetativo',
    search: 'Buscar genética, banco de semillas, invernadero o plagas...',
    difficulty: 'Dificultad:',
    cloneHealth: 'Salud de clones:',
    all: 'Todas',
    genotype: 'Genotipo madre',
    bank: 'Banco:',
    start: 'Inicio:',
    end: 'Fin (6-8m):',
    cycleLabel: 'Ciclo de mantenimiento en invernadero:',
    addPhoto: '+ Añadir foto mediante enlace',
    photos: 'Fotos de la genética',
    difficultyLabel: 'Dificultad de cultivo',
    clonesPerSeason: 'Clones / temporada',
    cloneHealthLabel: 'Salud de los clones',
    rooting: 'Enraizamiento',
    pestAttack: 'Ataque de plagas y resistencia:',
    obs: 'Obs.:',
    edit: 'Editar',
    delete: 'Eliminar',
    addOutdoor: 'Nuevo bancal exterior',
    plantio: 'Plantación:',
    harvest: 'Cosecha prevista:',
    photoperiod: 'Fotoperiodo natural:',
    substrate: 'Sustrato / suelo:',
    protection: 'Protección climática:',
    observations: 'Observaciones:',
    noResults: 'No se encontró ningún genotipo madre',
    tagline: 'CULTIVO',
    infoTitle: 'Invernadero Dedicado: Catalogación de Genotipos (6 a 8 Meses)',
    infoBefore: 'Módulo de catalogación de nuevas plantas madre. Las plantas se mantienen durante',
    infoStrong: '6 a 8 meses',
    infoAfter: 'en un invernadero climatizado con iluminación fotoperiódica vegetativa, buscando la producción continua de clones sanos y la preservación de la estabilidad genética.',
    thcCbd: 'THC / CBD',
    cycleDefault: '6-8 meses',
    monthsUnit: 'meses',
    daysUnit: 'días',
    clickToZoom: '🔍 Clic para ampliar',
    zoomPhoto: 'Ampliar foto',
    prevPhoto: 'Foto anterior',
    nextPhoto: 'Foto siguiente',
    madreZoomTitle: 'Madre: {name}',
    photoUrlPlaceholder: 'Pega la URL de la foto (Google Drive, Imgur, web)...',
    save: 'Guardar',
    clonesUnit: 'clones',
    confirmDeleteMadre: '¿Desea realmente eliminar la genética madre {name}?',
    emptyMadresHint: 'Intente cambiar los términos de búsqueda o los filtros.',
    emptyMadresAdmin: 'Haga clic en «{action}» para insertar un nuevo genotipo.',
    plantsUnit: 'plantas',
    plotPhotos: 'Fotos del bancal',
    plotZoomTitle: 'Área exterior: {name}',
    emptyPlotsTitle: 'Ningún bancal de área exterior registrado',
    emptyPlotsAdmin: 'Haga clic en «{action}» para añadir el primer lote al aire libre.',
    emptyPlotsBody: 'Ningún lote exterior catalogado por el momento.',
    confirmDeletePlot: '¿Desea eliminar el bancal {name}?',
    close: 'Cerrar',
    cancel: 'Cancelar',
    add: 'Añadir',
    preview: 'Vista previa',
    modalNewMadre: 'Registrar Nueva Genética Madre (Invernadero)',
    modalEditMadre: 'Editar Genética Madre',
    madreFormIntro: 'Complete las características para catalogar el genotipo mantenido durante 6 a 8 meses en el invernadero dedicado.',
    madrePhotoLabel: 'Enlace de la Foto del Genotipo Madre (URL)',
    photoUrlPlaceholderLong: 'Pega la URL de la foto (Google Drive, Imgur, web)...',
    fieldGenetics: '1. Genética (nombre del genotipo) *',
    phGenetics: 'Ej.: Amnesia Haze #3',
    fieldBank: '2. Banco de Semillas / Breeder *',
    phBank: 'Ej.: Royal Queen Seeds',
    fieldThcCbd: '3. Porcentaje de CBD/THC *',
    phThcCbd: 'Ej.: THC: 22% / CBD: <0.5%',
    fieldGreenhouseId: 'Identificación del Invernadero',
    phGreenhouseId: 'Ej.: Invernadero #1',
    defaultGreenhouseId: 'Invernadero #1',
    fieldStartDate: '4. Día de Inicio (entrada al invernadero) *',
    fieldEndDate: '5. Último Día (fin del mantenimiento de 6-8 meses) *',
    expectedDuration: 'Duración prevista: {duration}',
    fieldDifficulty: '6. Dificultad de Cultivo *',
    fieldClones: '8. Clones por Temporada *',
    fieldCloneHealth: '9. Salud de los Clones *',
    fieldRooting: '10. Tasa y Tiempo de Enraizamiento *',
    phRooting: 'Ej.: 95% de éxito en 8-10 días',
    fieldPests: '7. Ataque de Plagas (susceptibilidad y plagas recurrentes) *',
    phPests: 'Describa la susceptibilidad y el historial de plagas...',
    fieldNotes: 'Observaciones Generales del Agrónomo / Administrador',
    phNotes: 'Notas adicionales sobre podas, nutrición especial o fertirrigación...',
    saveMadre: 'Guardar Genética Madre',
    updateMadre: 'Actualizar Madre',
    modalNewPlot: 'Nuevo Bancal de Área Exterior',
    modalEditPlot: 'Editar Bancal de Área Exterior',
    plotPhotoLabel: 'Enlace de la Foto del Bancal / Parcela (URL)',
    fieldPlotName: 'Nombre del Bancal / Parcela *',
    phPlotName: 'Ej.: Bancal exterior #1',
    fieldCultivar: 'Genética / Cultivar Principal *',
    phCultivar: "Ej.: Charlotte's Web",
    fieldPlantCount: 'Cantidad de Plantas *',
    fieldPhotoperiod: 'Fotoperiodo Natural *',
    phPhotoperiod: 'Ej.: Crecimiento vegetativo (días largos)',
    fieldPlantingDate: 'Fecha de Plantación *',
    fieldHarvestDate: 'Previsión de Cosecha *',
    fieldSubstrate: 'Sustrato / Suelo Vivo *',
    phSubstrate: 'Ej.: Suelo vivo orgánico + cobertura KNF',
    fieldProtection: 'Protección Climática / Estructura *',
    phProtection: 'Ej.: Invernadero con malla de sombreo 30% + malla antigranizo',
    fieldPlotNotes: 'Observaciones Generales del Bancal',
    phPlotNotes: 'Notas adicionales sobre MIP, abonado de cobertura...',
    savePlot: 'Guardar Bancal',
    updatePlot: 'Actualizar Bancal',
    defaultPlotName: 'Bancal Área Exterior #2',
    defaultSubstrate: 'Suelo vivo orgánico con humus y KNF',
    defaultProtection: 'Malla de sombreo 30% + malla antigranizo',
    defaultPlotNotes: 'MIP orgánico con Beauveria bassiana.',
    defaultPestNotes: 'Baja susceptibilidad; monitorear de forma preventiva.',
    defaultRooting: '95% en 8-10 días',
    toastPhotoAddedMadre: '🎉 ¡Enlace de foto añadido a la madre {name}!',
    toastPhotoAddedPlot: '🎉 ¡Enlace de foto añadido al bancal {name}!',
    toastPhotoRemoved: '🗑️ Foto eliminada de la galería.',
    toastMadreCreated: '✅ ¡Genética madre registrada con éxito!',
    toastMadreUpdated: '✅ ¡Genética madre actualizada con éxito!',
    toastPlotCreated: '✅ ¡Bancal de área exterior guardado con éxito!',
    toastPlotUpdated: '✅ ¡Bancal de área exterior actualizado con éxito!',
  },
  de: {
    title: '1.6 Anbauverwaltung & Katalogisierung',
    session: 'Landwirtschaft 1.6',
    madresTab: 'Mutterpflanzen (Gewächshaus)',
    outdoorTab: 'Outdoor-Anbau',
    outdoorDesc: 'Kartierung organischer Freilandbeete in Lebendboden, Nutzung direkter Sonneneinstrahlung und Schutz vor Witterung.',
    addMadre: 'Muttergenetik registrieren',
    totalGenotypes: 'Genotypen gesamt',
    activeMadres: 'Aktive Mütter',
    maintenance: 'Pflege',
    cycle: '6 bis 8 Monate / Zyklus',
    clones: 'Geschätzte Klone',
    clonesSeason: 'Klone/Saison',
    environment: 'Umgebung',
    greenhouse: 'Vegetatives Gewächshaus',
    search: 'Genetik, Samenbank, Gewächshaus oder Schädlinge suchen...',
    difficulty: 'Schwierigkeit:',
    cloneHealth: 'Klongesundheit:',
    all: 'Alle',
    genotype: 'Muttergenotyp',
    bank: 'Bank:',
    start: 'Start:',
    end: 'Ende (6-8 M.):',
    cycleLabel: 'Pflegezyklus im Gewächshaus:',
    addPhoto: '+ Foto per Link hinzufügen',
    photos: 'Fotos der Genetik',
    difficultyLabel: 'Anbauschwierigkeit',
    clonesPerSeason: 'Klone / Saison',
    cloneHealthLabel: 'Klongesundheit',
    rooting: 'Bewurzelung',
    pestAttack: 'Schädlingsdruck & Resistenz:',
    obs: 'Notiz:',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    addOutdoor: 'Neues Outdoor-Beet',
    plantio: 'Pflanzung:',
    harvest: 'Erwartete Ernte:',
    photoperiod: 'Natürliche Photoperiode:',
    substrate: 'Substrat / Boden:',
    protection: 'Klimaschutz:',
    observations: 'Notizen:',
    noResults: 'Kein Muttergenotyp gefunden',
    tagline: 'ANBAU',
    infoTitle: 'Dediziertes Gewächshaus - Katalogisierung der Genotypen (6 bis 8 Monate)',
    infoBefore: 'Katalogisierungsmodul für neue Mutterpflanzen (Madres). Die Pflanzen werden',
    infoStrong: '6 bis 8 Monate',
    infoAfter: 'in einem klimatisierten Gewächshaus mit vegetativer Photoperioden-Beleuchtung gehalten, um kontinuierlich gesunde Klone zu erzeugen und die genetische Stabilität zu bewahren.',
    thcCbd: 'THC / CBD',
    cycleDefault: '6-8 Monate',
    monthsUnit: 'Monate',
    daysUnit: 'Tage',
    clickToZoom: '🔍 Zum Vergrößern klicken',
    zoomPhoto: 'Foto vergrößern',
    prevPhoto: 'Vorheriges Foto',
    nextPhoto: 'Nächstes Foto',
    madreZoomTitle: 'Mutter: {name}',
    photoUrlPlaceholder: 'Foto-URL einfügen (Google Drive, Imgur, Web)...',
    save: 'Speichern',
    clonesUnit: 'Klone',
    confirmDeleteMadre: 'Möchten Sie die Muttergenetik {name} wirklich entfernen?',
    emptyMadresHint: 'Ändern Sie die Suchbegriffe oder Filter.',
    emptyMadresAdmin: 'Klicken Sie auf „{action}“, um einen neuen Genotyp anzulegen.',
    plantsUnit: 'Pflanzen',
    plotPhotos: 'Fotos des Beetes',
    plotZoomTitle: 'Außenbereich: {name}',
    emptyPlotsTitle: 'Kein Beet im Außenbereich registriert',
    emptyPlotsAdmin: 'Klicken Sie auf „{action}“, um den ersten Freilandbestand hinzuzufügen.',
    emptyPlotsBody: 'Derzeit ist kein Freilandbestand katalogisiert.',
    confirmDeletePlot: 'Beet {name} entfernen?',
    close: 'Schließen',
    cancel: 'Abbrechen',
    add: 'Hinzufügen',
    preview: 'Vorschau',
    modalNewMadre: 'Neue Muttergenetik anlegen (Gewächshaus)',
    modalEditMadre: 'Muttergenetik bearbeiten',
    madreFormIntro: 'Füllen Sie die Merkmale aus, um den Genotyp zu katalogisieren, der 6 bis 8 Monate im dedizierten Gewächshaus gehalten wird.',
    madrePhotoLabel: 'Foto-Link der Muttergenetik (URL)',
    photoUrlPlaceholderLong: 'Foto-URL einfügen (Google Drive, Imgur, Web)...',
    fieldGenetics: '1. Genetik (Name des Genotyps) *',
    phGenetics: 'z. B. Amnesia Haze #3',
    fieldBank: '2. Samenbank / Breeder *',
    phBank: 'z. B. Royal Queen Seeds',
    fieldThcCbd: '3. CBD/THC-Anteil *',
    phThcCbd: 'z. B. THC: 22% / CBD: <0.5%',
    fieldGreenhouseId: 'Bezeichnung des Gewächshauses',
    phGreenhouseId: 'z. B. Gewächshaus #1',
    defaultGreenhouseId: 'Gewächshaus #1',
    fieldStartDate: '4. Startdatum (Einzug ins Gewächshaus) *',
    fieldEndDate: '5. Letzter Tag (Ende der Pflege nach 6-8 Monaten) *',
    expectedDuration: 'Voraussichtliche Dauer: {duration}',
    fieldDifficulty: '6. Anbauschwierigkeit *',
    fieldClones: '8. Klone pro Saison *',
    fieldCloneHealth: '9. Klongesundheit *',
    fieldRooting: '10. Bewurzelungsrate & -zeit *',
    phRooting: 'z. B. 95% Erfolg in 8-10 Tagen',
    fieldPests: '7. Schädlingsdruck (Anfälligkeit & wiederkehrende Schädlinge) *',
    phPests: 'Anfälligkeit und Schädlingshistorie beschreiben...',
    fieldNotes: 'Allgemeine Notizen von Agronom / Administrator',
    phNotes: 'Zusätzliche Notizen zu Schnitt, Spezialernährung oder Fertigation...',
    saveMadre: 'Muttergenetik speichern',
    updateMadre: 'Mutter aktualisieren',
    modalNewPlot: 'Neues Beet im Außenbereich',
    modalEditPlot: 'Beet im Außenbereich bearbeiten',
    plotPhotoLabel: 'Foto-Link des Beetes / Schlags (URL)',
    fieldPlotName: 'Name des Beetes / Schlags *',
    phPlotName: 'z. B. Beet Außenbereich #1',
    fieldCultivar: 'Genetik / Hauptsorte *',
    phCultivar: "z. B. Charlotte's Web",
    fieldPlantCount: 'Anzahl der Pflanzen *',
    fieldPhotoperiod: 'Natürliche Photoperiode *',
    phPhotoperiod: 'z. B. Vegetatives Wachstum (lange Tage)',
    fieldPlantingDate: 'Pflanzdatum *',
    fieldHarvestDate: 'Erwartete Ernte *',
    fieldSubstrate: 'Substrat / Lebendboden *',
    phSubstrate: 'z. B. Organischer Lebendboden + KNF-Mulch',
    fieldProtection: 'Klimaschutz / Konstruktion *',
    phProtection: 'z. B. Gewächshaus mit 30% Schattennetz + Hagelschutznetz',
    fieldPlotNotes: 'Allgemeine Notizen zum Beet',
    phPlotNotes: 'Zusätzliche Notizen zu IPM, Kopfdüngung...',
    savePlot: 'Beet speichern',
    updatePlot: 'Beet aktualisieren',
    defaultPlotName: 'Beet Außenbereich #2',
    defaultSubstrate: 'Organischer Lebendboden mit Humus und KNF',
    defaultProtection: '30% Schattennetz + Hagelschutzgewebe',
    defaultPlotNotes: 'Organisches IPM mit Beauveria bassiana.',
    defaultPestNotes: 'Geringe Anfälligkeit; vorbeugend überwachen.',
    defaultRooting: '95% in 8-10 Tagen',
    toastPhotoAddedMadre: '🎉 Foto-Link zur Mutter {name} hinzugefügt!',
    toastPhotoAddedPlot: '🎉 Foto-Link zum Beet {name} hinzugefügt!',
    toastPhotoRemoved: '🗑️ Foto aus der Galerie entfernt.',
    toastMadreCreated: '✅ Muttergenetik erfolgreich angelegt!',
    toastMadreUpdated: '✅ Muttergenetik erfolgreich aktualisiert!',
    toastPlotCreated: '✅ Beet im Außenbereich erfolgreich gespeichert!',
    toastPlotUpdated: '✅ Beet im Außenbereich erfolgreich aktualisiert!',
  },
};


interface CultivoSectionProps {
  madresList: MotherGenetics[];
  outdoorPlots: OutdoorCropPlot[];
  indoorBatches: IndoorCropBatch[];
  cycleFolders: CycleFolder[];
  isAdmin: boolean;
  canEditBlocks: boolean;
  publishedMadreIds: string[];
  publishedOutdoorIds: string[];
  publishedIndoorIds: string[];
  publishedCycleFolderIds: string[];
  onSaveMadre: (madre: MotherGenetics) => void;
  onDeleteMadre: (id: string) => void;
  onSaveOutdoorPlot: (plot: OutdoorCropPlot) => void;
  onDeleteOutdoorPlot: (id: string) => void;
  onSaveIndoorBatch: (batch: IndoorCropBatch) => void;
  onDeleteIndoorBatch: (id: string) => void;
  onSaveCycleFolder: (folder: CycleFolder) => void;
  onDeleteCycleFolder: (id: string) => void;
}

// Helper: Calculate +4 months end date from YYYY-MM-DD
function calculateFourMonthsEnd(startDateStr: string): string {
  if (!startDateStr) return '';
  const parts = startDateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return '';
  const [y, m, d] = parts;
  const end = new Date(y, (m - 1) + 4, d - 1);
  const yyyy = end.getFullYear();
  const mm = String(end.getMonth() + 1).padStart(2, '0');
  const dd = String(end.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Helper: Format YYYY-MM-DD to DD/MM/YYYY without timezone shifts
function formatDateBr(dateStr?: string): string {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

// Helper: Suggest best matching folder for a given date (or today)
function findMatchingFolderId(folders: CycleFolder[], refDate?: string): string {
  if (folders.length === 0) return '';
  const target = refDate || new Date().toISOString().split('T')[0];
  const matched = folders.find((f) => f.startDate <= target && target <= f.endDate);
  if (matched) return matched.id;
  return folders[folders.length - 1].id;
}

export const CultivoSection: React.FC<CultivoSectionProps> = ({
  madresList,
  outdoorPlots,
  indoorBatches,
  cycleFolders,
  isAdmin,
  canEditBlocks,
  publishedMadreIds,
  publishedOutdoorIds,
  publishedIndoorIds,
  publishedCycleFolderIds,
  onSaveMadre,
  onDeleteMadre,
  onSaveOutdoorPlot,
  onDeleteOutdoorPlot,
  onSaveIndoorBatch,
  onDeleteIndoorBatch,
  onSaveCycleFolder,
  onDeleteCycleFolder,
}) => {
  const { lang, t } = useI18n();
  const term = useTerm();
  const c = COPY[lang];
  const canManageMadre = (id: string) => canEditBlocks && !publishedMadreIds.includes(id);
  const canManageOutdoor = (id: string) => canEditBlocks && !publishedOutdoorIds.includes(id);
  const canManageCycleFolder = (id: string) => canEditBlocks && !publishedCycleFolderIds.includes(id);

  // Sub-section tab state (Madres, Cultivo Área Externa, Pasta Organizadora de Ciclos)
  const [activeSub, setActiveSub] = useState<CultivoSubSection>('madres');

  // Search & Filter States (Active Madres)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterHealth, setFilterHealth] = useState<string>('all');

  // Search & Filter States (Pasta Organizadora de Ciclos)
  const [selectedFolderFilter, setSelectedFolderFilter] = useState<string>('all');
  const [archiveTypeFilter, setArchiveTypeFilter] = useState<'all' | 'madre' | 'outdoor'>('all');
  const [archiveSearchTerm, setArchiveSearchTerm] = useState('');

  // Toast Notification State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3800);
  };

  // Zoom Modal State
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);

  // Image indexes per card ID
  const [imageIndexes, setImageIndexes] = useState<{ [id: string]: number }>({});

  // Direct URL Input Map per card ID
  const [showUrlInputMap, setShowUrlInputMap] = useState<{ [id: string]: boolean }>({});
  const [urlInputValueMap, setUrlInputValueMap] = useState<{ [id: string]: string }>({});

  // Custom Delete Confirmation Modal (avoids window.confirm iframe issues)
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    type: 'madre' | 'outdoor' | 'folder';
    id: string;
    name: string;
  } | null>(null);

  // Modal States for Madres
  const [isMadreModalOpen, setIsMadreModalOpen] = useState(false);
  const [editingMadre, setEditingMadre] = useState<MotherGenetics | null>(null);
  const [madreFormError, setMadreFormError] = useState<string | null>(null);

  // Form states for Madres
  const [genetica, setGenetica] = useState('');
  const [banco, setBanco] = useState('');
  const [porcentagemThcCbd, setPorcentagemThcCbd] = useState('');
  const [diaInicio, setDiaInicio] = useState('');
  const [ultimoDia, setUltimoDia] = useState('');
  const [dificuldadeCultivo, setDificuldadeCultivo] = useState<'Fácil' | 'Média' | 'Difícil' | 'Especialista'>('Média');
  const [ataquePragas, setAtaquePragas] = useState('');
  const [clonesPorTemporada, setClonesPorTemporada] = useState<number>(100);
  const [saudeClones, setSaudeClones] = useState<'Excelente' | 'Boa' | 'Regular' | 'Atenção'>('Excelente');
  const [enraizamento, setEnraizamento] = useState('');
  const [casaVegetacao, setCasaVegetacao] = useState('Casa de Vegetação #1');
  const [observacoes, setObservacoes] = useState('');
  // Optional new photo link input — ALWAYS starts empty so it never forces adding a URL to save/close
  const [madrePhotoInput, setMadrePhotoInput] = useState('');
  const [madreImagesList, setMadreImagesList] = useState<string[]>([]);

  // Modal States for Cultivo Área Externa
  const [isOutdoorModalOpen, setIsOutdoorModalOpen] = useState(false);
  const [editingOutdoor, setEditingOutdoor] = useState<OutdoorCropPlot | null>(null);
  const [outdoorFormError, setOutdoorFormError] = useState<string | null>(null);
  // Optional new photo link input — ALWAYS starts empty so it never forces adding a URL to save/close
  const [outdoorPhotoInput, setOutdoorPhotoInput] = useState('');
  const [outdoorForm, setOutdoorForm] = useState<Partial<OutdoorCropPlot>>({
    nomeCanteiro: '',
    genetica: '',
    quantidadePlantas: 50,
    faseFotoperiodo: 'Crescimento Vegetativo (Dias Longos)',
    tipoSubstrato: 'Living Soil Orgânico + Cobertura KNF',
    protecaoClimatica: 'Estufa com Sombrite 30%',
    dataPlantio: new Date().toISOString().split('T')[0],
    previsaoColheita: '',
    observacoes: '',
    images: [],
  });

  // Ambiente do Cultivo Outdoor (Casa de Vegetação ou Área Externa)
  const [outdoorAmbiente, setOutdoorAmbiente] = useState<OutdoorAmbiente>('area_externa');

  // Cultivo Indoor (Setor Vegetativo / Setor Floração)
  const [indoorSetor, setIndoorSetor] = useState<IndoorSetor>('vegetativo');
  const [isIndoorModalOpen, setIsIndoorModalOpen] = useState(false);
  const [editingIndoor, setEditingIndoor] = useState<IndoorCropBatch | null>(null);
  const [indoorFormError, setIndoorFormError] = useState<string | null>(null);
  const [indoorForm, setIndoorForm] = useState<Partial<IndoorCropBatch>>({
    nomeSala: '',
    genetica: '',
    quantidadePlantas: 24,
    setor: 'vegetativo',
    iluminacao: '',
    temperaturaMedia: '',
    umidadeMedia: '',
    sistemaIrrigacao: '',
    ventilacao: '',
    manejoMip: '',
    dataInicio: new Date().toISOString().split('T')[0],
    previsaoColheita: '',
    observacoes: '',
    images: [],
  });
  const [indoorPhotoInput, setIndoorPhotoInput] = useState('');

  // Archive Block Modal State
  const [archiveTarget, setArchiveTarget] = useState<
    | { type: 'madre'; item: MotherGenetics }
    | { type: 'outdoor'; item: OutdoorCropPlot }
    | null
  >(null);
  const [selectedArchiveFolderId, setSelectedArchiveFolderId] = useState<string>('');
  const [archiveNotesInput, setArchiveNotesInput] = useState<string>('');
  const [isCreatingInlineFolder, setIsCreatingInlineFolder] = useState<boolean>(false);
  const [inlineFolderName, setInlineFolderName] = useState<string>('');
  const [inlineFolderStart, setInlineFolderStart] = useState<string>('');
  const [inlineFolderEnd, setInlineFolderEnd] = useState<string>('');

  // Standalone Cycle Folder Manager Modal State
  const [isFolderModalOpen, setIsFolderModalOpen] = useState<boolean>(false);
  const [editingFolder, setEditingFolder] = useState<CycleFolder | null>(null);
  const [folderNameInput, setFolderNameInput] = useState<string>('');
  const [folderStartInput, setFolderStartInput] = useState<string>('');
  const [folderEndInput, setFolderEndInput] = useState<string>('');
  const [folderNotesInput, setFolderNotesInput] = useState<string>('');
  const [folderFormError, setFolderFormError] = useState<string | null>(null);

  // Separate Active vs Archived Lists
  const activeMadres = madresList.filter((m) => !m.archived && m.status !== 'Arquivada');
  const archivedMadres = madresList.filter((m) => Boolean(m.archived) || m.status === 'Arquivada');

  const activeOutdoorPlots = outdoorPlots.filter((p) => !p.archived);
  const archivedOutdoorPlots = outdoorPlots.filter((p) => Boolean(p.archived));

  // Cultivo Outdoor dividido por ambiente; Cultivo Indoor dividido por setor.
  const outdoorVisible = activeOutdoorPlots.filter((p) => (p.ambiente ?? 'area_externa') === outdoorAmbiente);
  /** Itens antigos (sem setor) entram em Floração quando o estágio é floração. */
  const indoorSetorOf = (b: IndoorCropBatch): IndoorSetor => b.setor ?? (b.estagio === 'Floração' ? 'floracao' : 'vegetativo');
  const activeIndoorBatches = indoorBatches.filter((b) => !(b as IndoorCropBatch & { archived?: boolean }).archived);
  const indoorVisible = activeIndoorBatches.filter((b) => indoorSetorOf(b) === indoorSetor);
  const canManageIndoor = (id: string) => canEditBlocks && !publishedIndoorIds.includes(id);

  const totalArchivedCount = archivedMadres.length + archivedOutdoorPlots.length;

  // Add Direct URL to Madre card (Admin only)
  const handleAddMadreCardUrl = (madreId: string, rawUrl: string) => {
    const trimmed = rawUrl.trim();
    if (!trimmed) return;
    const formatted = formatImageUrl(trimmed, '');
    if (!formatted) return;

    const target = madresList.find((m) => m.id === madreId);
    if (!target) return;

    const existing = target.images && target.images.length > 0
      ? target.images
      : [target.imageUrl || FALLBACK_MADRE_IMAGE];

    const updatedImages = existing.includes(formatted) ? existing : [...existing, formatted];
    const updatedMadre: MotherGenetics = {
      ...target,
      imageUrl: target.imageUrl || formatted,
      images: updatedImages,
    };

    onSaveMadre(updatedMadre);
    setImageIndexes((prev) => ({ ...prev, [madreId]: updatedImages.length - 1 }));
    setUrlInputValueMap((prev) => ({ ...prev, [madreId]: '' }));
    setShowUrlInputMap((prev) => ({ ...prev, [madreId]: false }));
    showToast(`Foto adicionada à Madre ${target.genetica}!`);
  };

  // Add Direct URL to Outdoor Plot card (Admin only)
  const handleAddOutdoorCardUrl = (plotId: string, rawUrl: string) => {
    const trimmed = rawUrl.trim();
    if (!trimmed) return;
    const formatted = formatImageUrl(trimmed, '');
    if (!formatted) return;

    const target = outdoorPlots.find((p) => p.id === plotId);
    if (!target) return;

    const existing = target.images && target.images.length > 0
      ? target.images
      : [target.imageUrl || FALLBACK_OUTDOOR_IMAGE];

    const updatedImages = existing.includes(formatted) ? existing : [...existing, formatted];
    const updatedPlot: OutdoorCropPlot = {
      ...target,
      imageUrl: target.imageUrl || formatted,
      images: updatedImages,
    };

    onSaveOutdoorPlot(updatedPlot);
    setImageIndexes((prev) => ({ ...prev, [plotId]: updatedImages.length - 1 }));
    setUrlInputValueMap((prev) => ({ ...prev, [plotId]: '' }));
    setShowUrlInputMap((prev) => ({ ...prev, [plotId]: false }));
    showToast(`Foto adicionada ao canteiro ${target.nomeCanteiro}!`);
  };

  // Handlers for Madres Modal
  const handleCloseMadreModal = () => {
    setIsMadreModalOpen(false);
    setEditingMadre(null);
    setMadrePhotoInput('');
    setMadreFormError(null);
  };

  const handleOpenMadreModal = (item?: MotherGenetics) => {
    setMadreFormError(null);
    setMadrePhotoInput(''); // Always empty! Never pre-filled with internal path or forced URL
    if (item) {
      setEditingMadre(item);
      setGenetica(item.genetica || '');
      setBanco(item.banco || '');
      setPorcentagemThcCbd(item.porcentagemThcCbd || '');
      setDiaInicio(item.diaInicio || '');
      setUltimoDia(item.ultimoDia || '');
      setDificuldadeCultivo(item.dificuldadeCultivo || 'Média');
      setAtaquePragas(item.ataquePragas || '');
      setClonesPorTemporada(item.clonesPorTemporada ?? 100);
      setSaudeClones(item.saudeClones || 'Excelente');
      setEnraizamento(item.enraizamento || '');
      setCasaVegetacao(item.casaVegetacao || 'Casa de Vegetação #1');
      setObservacoes(item.observacoes || '');
      const existingImgs = (item.images && item.images.length > 0)
        ? [...item.images]
        : (item.imageUrl ? [item.imageUrl] : [FALLBACK_MADRE_IMAGE]);
      setMadreImagesList(existingImgs);
    } else {
      setEditingMadre(null);
      setGenetica('');
      setBanco('');
      setPorcentagemThcCbd('THC: 22% / CBD: <0.5%');
      const today = new Date();
      const startDateStr = today.toISOString().split('T')[0];
      const endDate = new Date(today.getTime() + 210 * 24 * 60 * 60 * 1000);
      const endDateStr = endDate.toISOString().split('T')[0];
      setDiaInicio(startDateStr);
      setUltimoDia(endDateStr);
      setDificuldadeCultivo('Média');
      setAtaquePragas('Baixa suscetibilidade; monitorar preventivamente.');
      setClonesPorTemporada(120);
      setSaudeClones('Excelente');
      setEnraizamento('95% em 8-10 dias');
      setCasaVegetacao('Casa de Vegetação #1');
      setObservacoes('');
      setMadreImagesList([FALLBACK_MADRE_IMAGE]);
    }
    setIsMadreModalOpen(true);
  };

  const handleAddPhotoToMadreModal = () => {
    const raw = madrePhotoInput.trim();
    if (!raw) return;
    const formatted = formatImageUrl(raw, '');
    if (formatted && !madreImagesList.includes(formatted)) {
      setMadreImagesList((prev) => [...prev, formatted]);
    }
    setMadrePhotoInput('');
  };

  const handleSaveMadreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!genetica.trim()) {
      setMadreFormError('Informe o nome da Genética (Item 1) antes de salvar.');
      return;
    }

    // If user typed/pasted a URL in the optional photo box without clicking "Adicionar", include it gracefully
    let workingImages = [...madreImagesList];
    if (madrePhotoInput.trim()) {
      const pendingFormatted = formatImageUrl(madrePhotoInput.trim(), '');
      if (pendingFormatted && !workingImages.includes(pendingFormatted)) {
        workingImages.push(pendingFormatted);
      }
    }

    const finalImages = workingImages.length > 0 ? workingImages : [FALLBACK_MADRE_IMAGE];

    const updatedMadre: MotherGenetics = {
      ...(editingMadre || {}),
      id: editingMadre ? editingMadre.id : 'madre-' + Date.now(),
      genetica: genetica.trim(),
      banco: banco.trim() || 'Não informado',
      porcentagemThcCbd: porcentagemThcCbd.trim() || 'N/A',
      diaInicio: diaInicio || new Date().toISOString().split('T')[0],
      ultimoDia: ultimoDia || '',
      dificuldadeCultivo,
      ataquePragas: ataquePragas.trim() || 'Sem ocorrências registradas.',
      clonesPorTemporada: Number(clonesPorTemporada) || 0,
      saudeClones,
      enraizamento: enraizamento.trim() || 'Em avaliação',
      casaVegetacao: casaVegetacao.trim() || 'Casa de Vegetação #1',
      observacoes: observacoes.trim(),
      status: editingMadre?.status || 'Ativa',
      archived: editingMadre?.archived ?? false,
      cycleFolderId: editingMadre?.cycleFolderId,
      cycleLabel: editingMadre?.cycleLabel,
      archivedAt: editingMadre?.archivedAt,
      archiveNotes: editingMadre?.archiveNotes,
      imageUrl: finalImages[0],
      images: finalImages,
    };

    onSaveMadre(updatedMadre);
    showToast(editingMadre ? `Madre "${updatedMadre.genetica}" atualizada!` : `Nova Madre "${updatedMadre.genetica}" cadastrada!`);
    handleCloseMadreModal();
  };

  // Outdoor Plot Modal Handlers
  const handleCloseOutdoorModal = () => {
    setIsOutdoorModalOpen(false);
    setEditingOutdoor(null);
    setOutdoorPhotoInput('');
    setOutdoorFormError(null);
  };

  const handleOpenOutdoorModal = (plot?: OutdoorCropPlot) => {
    setOutdoorFormError(null);
    setOutdoorPhotoInput(''); // Always empty! Never forces entering a URL link
    if (plot) {
      setEditingOutdoor(plot);
      const existingImgs = (plot.images && plot.images.length > 0)
        ? [...plot.images]
        : (plot.imageUrl ? [plot.imageUrl] : [FALLBACK_OUTDOOR_IMAGE]);
      setOutdoorForm({
        ...plot,
        images: existingImgs,
      });
    } else {
      setEditingOutdoor(null);
      const todayStr = new Date().toISOString().split('T')[0];
      setOutdoorForm({
        nomeCanteiro: '',
        genetica: '',
        quantidadePlantas: 80,
        faseFotoperiodo: 'Crescimento Vegetativo (Dias Longos)',
        tipoSubstrato: 'Solo Vivo Orgânico com Húmus e KNF',
        protecaoClimatica: 'Sombrite 30% + Tela Anti-Granizo',
        ambiente: outdoorAmbiente,
        dataPlantio: todayStr,
        previsaoColheita: calculateFourMonthsEnd(todayStr),
        observacoes: '',
        images: [FALLBACK_OUTDOOR_IMAGE],
      });
    }
    setIsOutdoorModalOpen(true);
  };

  const handleAddPhotoToOutdoorModal = () => {
    const raw = outdoorPhotoInput.trim();
    if (!raw) return;
    const formatted = formatImageUrl(raw, '');
    if (formatted) {
      setOutdoorForm((prev) => {
        const currentImgs = prev.images || [];
        return {
          ...prev,
          images: currentImgs.includes(formatted) ? currentImgs : [...currentImgs, formatted],
        };
      });
    }
    setOutdoorPhotoInput('');
  };

  const handleSaveOutdoorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outdoorForm.nomeCanteiro || !outdoorForm.nomeCanteiro.trim()) {
      setOutdoorFormError('Informe o Nome do Canteiro / Talhão antes de salvar.');
      return;
    }

    let workingImgs = [...(outdoorForm.images || [])];
    if (outdoorPhotoInput.trim()) {
      const pendingFormatted = formatImageUrl(outdoorPhotoInput.trim(), '');
      if (pendingFormatted && !workingImgs.includes(pendingFormatted)) {
        workingImgs.push(pendingFormatted);
      }
    }

    const finalImgs = workingImgs.length > 0 ? workingImgs : [FALLBACK_OUTDOOR_IMAGE];

    const updatedPlot: OutdoorCropPlot = {
      ...(editingOutdoor || {}),
      id: editingOutdoor ? editingOutdoor.id : 'outdoor-' + Date.now(),
      nomeCanteiro: outdoorForm.nomeCanteiro.trim(),
      genetica: (outdoorForm.genetica || '').trim() || 'Cultivar Misto',
      quantidadePlantas: Number(outdoorForm.quantidadePlantas) || 0,
      faseFotoperiodo: outdoorForm.faseFotoperiodo || 'Crescimento Vegetativo (Dias Longos)',
      tipoSubstrato: (outdoorForm.tipoSubstrato || '').trim() || 'Living Soil Orgânico',
      protecaoClimatica: (outdoorForm.protecaoClimatica || '').trim() || 'Sol Pleno / Sombrite',
      dataPlantio: outdoorForm.dataPlantio || new Date().toISOString().split('T')[0],
      previsaoColheita: outdoorForm.previsaoColheita || '',
      observacoes: (outdoorForm.observacoes || '').trim(),
      ambiente: outdoorForm.ambiente ?? editingOutdoor?.ambiente ?? 'area_externa',
      fase: outdoorForm.fase ?? editingOutdoor?.fase ?? 'vegetativo',
      rendimento: (outdoorForm.rendimento || '').trim(),
      archived: editingOutdoor?.archived ?? false,
      cycleFolderId: editingOutdoor?.cycleFolderId,
      cycleLabel: editingOutdoor?.cycleLabel,
      archivedAt: editingOutdoor?.archivedAt,
      archiveNotes: editingOutdoor?.archiveNotes,
      imageUrl: finalImgs[0],
      images: finalImgs,
    };

    onSaveOutdoorPlot(updatedPlot);
    showToast(editingOutdoor ? `Canteiro "${updatedPlot.nomeCanteiro}" atualizado!` : `Novo canteiro "${updatedPlot.nomeCanteiro}" criado!`);
    handleCloseOutdoorModal();
  };

  // Archive Block Handlers
  const handleOpenArchiveModal = (
    target: { type: 'madre'; item: MotherGenetics } | { type: 'outdoor'; item: OutdoorCropPlot }
  ) => {
    setArchiveTarget(target);
    const refDate = target.type === 'madre' ? target.item.diaInicio : target.item.dataPlantio;
    const defaultFolderId = target.item.cycleFolderId || findMatchingFolderId(cycleFolders, refDate);
    setSelectedArchiveFolderId(defaultFolderId);
    setArchiveNotesInput(target.item.archiveNotes || '');
    setIsCreatingInlineFolder(cycleFolders.length === 0);

    const todayStr = new Date().toISOString().split('T')[0];
    setInlineFolderStart(todayStr);
    setInlineFolderEnd(calculateFourMonthsEnd(todayStr));
    setInlineFolderName('');
  };

  const handleConfirmArchive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!archiveTarget) return;

    let targetFolder: CycleFolder | undefined;

    if (isCreatingInlineFolder) {
      const start = inlineFolderStart || new Date().toISOString().split('T')[0];
      const end = inlineFolderEnd || calculateFourMonthsEnd(start);
      const name = inlineFolderName.trim() || `Ciclo ${formatDateBr(start)} – ${formatDateBr(end)}`;
      const newFolder: CycleFolder = {
        id: 'ciclo-' + Date.now(),
        name,
        periodLabel: 'Ciclo de 4 Meses',
        startDate: start,
        endDate: end,
        notes: 'Pasta criada durante arquivamento de bloco de cultivo.',
        createdAt: new Date().toISOString().split('T')[0],
      };
      onSaveCycleFolder(newFolder);
      targetFolder = newFolder;
    } else {
      targetFolder = cycleFolders.find((f) => f.id === selectedArchiveFolderId) || cycleFolders[0];
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const folderId = targetFolder?.id || 'ciclo-geral';
    const folderName = targetFolder?.name || 'Ciclo Arquivado (4 Meses)';

    if (archiveTarget.type === 'madre') {
      const updated: MotherGenetics = {
        ...archiveTarget.item,
        status: 'Arquivada',
        archived: true,
        cycleFolderId: folderId,
        cycleLabel: folderName,
        archivedAt: todayStr,
        archiveNotes: archiveNotesInput.trim(),
      };
      onSaveMadre(updated);
      showToast(`Madre "${updated.genetica}" arquivada em ${folderName}!`);
    } else {
      const updated: OutdoorCropPlot = {
        ...archiveTarget.item,
        archived: true,
        cycleFolderId: folderId,
        cycleLabel: folderName,
        archivedAt: todayStr,
        archiveNotes: archiveNotesInput.trim(),
      };
      onSaveOutdoorPlot(updated);
      showToast(`Canteiro "${updated.nomeCanteiro}" arquivado em ${folderName}!`);
    }

    setArchiveTarget(null);
    setArchiveNotesInput('');
    setIsCreatingInlineFolder(false);
  };

  // Restore (Unarchive) back to Active
  const handleRestoreMadre = (item: MotherGenetics) => {
    onSaveMadre({
      ...item,
      status: 'Ativa',
      archived: false,
    });
    showToast(`Madre "${item.genetica}" restaurada para o painel ativo!`);
  };

  const handleRestoreOutdoor = (plot: OutdoorCropPlot) => {
    onSaveOutdoorPlot({
      ...plot,
      archived: false,
    });
    showToast(`Canteiro "${plot.nomeCanteiro}" restaurado para o painel ativo!`);
  };

  // Reuse Archived Item as Template for a New Active Cycle (keeps archived history intact!)
  const handleCloneMadreForNewCycle = (item: MotherGenetics) => {
    const today = new Date();
    const startStr = today.toISOString().split('T')[0];
    const endDate = new Date(today.getTime() + 210 * 24 * 60 * 60 * 1000);
    const endStr = endDate.toISOString().split('T')[0];

    const cloned: MotherGenetics = {
      ...item,
      id: 'madre-' + Date.now(),
      diaInicio: startStr,
      ultimoDia: endStr,
      status: 'Ativa',
      archived: false,
      cycleFolderId: undefined,
      cycleLabel: undefined,
      archivedAt: undefined,
      archiveNotes: undefined,
    };
    onSaveMadre(cloned);
    setActiveSub('madres');
    showToast(`Novo ciclo iniciado para "${cloned.genetica}" (histórico mantido na pasta)!`);
  };

  const handleCloneOutdoorForNewCycle = (plot: OutdoorCropPlot) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const cloned: OutdoorCropPlot = {
      ...plot,
      id: 'outdoor-' + Date.now(),
      dataPlantio: todayStr,
      previsaoColheita: calculateFourMonthsEnd(todayStr),
      archived: false,
      cycleFolderId: undefined,
      cycleLabel: undefined,
      archivedAt: undefined,
      archiveNotes: undefined,
    };
    onSaveOutdoorPlot(cloned);
    setActiveSub('cultivo_externo');
    showToast(`Novo ciclo externo iniciado para "${cloned.nomeCanteiro}" (histórico mantido na pasta)!`);
  };

  // Cycle Folder Modal Handlers
  const handleOpenFolderModal = (folder?: CycleFolder) => {
    setFolderFormError(null);
    if (folder) {
      setEditingFolder(folder);
      setFolderNameInput(folder.name);
      setFolderStartInput(folder.startDate);
      setFolderEndInput(folder.endDate);
      setFolderNotesInput(folder.notes || '');
    } else {
      setEditingFolder(null);
      const todayStr = new Date().toISOString().split('T')[0];
      setFolderNameInput('');
      setFolderStartInput(todayStr);
      setFolderEndInput(calculateFourMonthsEnd(todayStr));
      setFolderNotesInput('');
    }
    setIsFolderModalOpen(true);
  };

  const handleSaveFolderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderNameInput.trim()) {
      setFolderFormError('Informe um nome para a Pasta de Ciclo (ex: 1º Ciclo 2027 - Jan a Abr).');
      return;
    }
    const start = folderStartInput || new Date().toISOString().split('T')[0];
    const end = folderEndInput || calculateFourMonthsEnd(start);
    const savedFolder: CycleFolder = {
      id: editingFolder ? editingFolder.id : 'ciclo-' + Date.now(),
      name: folderNameInput.trim(),
      periodLabel: 'Ciclo de 4 Meses',
      startDate: start,
      endDate: end,
      notes: folderNotesInput.trim(),
      createdAt: editingFolder?.createdAt || new Date().toISOString().split('T')[0],
    };
    onSaveCycleFolder(savedFolder);

    // If folder was renamed, update cycleLabel on items linked to this folder
    if (editingFolder && editingFolder.name !== savedFolder.name) {
      madresList.forEach((m) => {
        if (m.cycleFolderId === savedFolder.id) {
          onSaveMadre({ ...m, cycleLabel: savedFolder.name });
        }
      });
      outdoorPlots.forEach((p) => {
        if (p.cycleFolderId === savedFolder.id) {
          onSaveOutdoorPlot({ ...p, cycleLabel: savedFolder.name });
        }
      });
    }

    showToast(editingFolder ? `Pasta "${savedFolder.name}" atualizada!` : `Pasta "${savedFolder.name}" criada!`);
    setIsFolderModalOpen(false);
    setEditingFolder(null);
  };

  // Execute Confirmed Deletion
  const handleConfirmDelete = () => {
    if (!deleteConfirmTarget) return;
    const { type, id, name } = deleteConfirmTarget;
    if (type === 'madre') {
      onDeleteMadre(id);
      showToast(`Genética Madre "${name}" removida.`);
    } else if (type === 'outdoor') {
      onDeleteOutdoorPlot(id);
      showToast(`Canteiro "${name}" removido.`);
    } else if (type === 'folder') {
      onDeleteCycleFolder(id);
      if (selectedFolderFilter === id) setSelectedFolderFilter('all');
      showToast(`Pasta de ciclo "${name}" removida.`);
    }
    setDeleteConfirmTarget(null);
  };

  // Filter Active Madres
  const filteredMadres = activeMadres.filter((m) => {
    const matchesSearch =
      m.genetica.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.banco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.casaVegetacao && m.casaVegetacao.toLowerCase().includes(searchTerm.toLowerCase())) ||
      m.ataquePragas.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty = filterDifficulty === 'all' || m.dificuldadeCultivo === filterDifficulty;
    const matchesHealth = filterHealth === 'all' || m.saudeClones === filterHealth;

    return matchesSearch && matchesDifficulty && matchesHealth;
  });

  // Filter Archived Items for Pasta Organizadora de Ciclos
  const filteredArchivedMadres = archivedMadres.filter((m) => {
    if (archiveTypeFilter === 'outdoor') return false;
    if (selectedFolderFilter !== 'all' && m.cycleFolderId !== selectedFolderFilter) return false;
    if (!archiveSearchTerm.trim()) return true;
    const q = archiveSearchTerm.toLowerCase();
    return (
      m.genetica.toLowerCase().includes(q) ||
      m.banco.toLowerCase().includes(q) ||
      (m.casaVegetacao || '').toLowerCase().includes(q) ||
      (m.observacoes || '').toLowerCase().includes(q) ||
      (m.archiveNotes || '').toLowerCase().includes(q) ||
      (m.cycleLabel || '').toLowerCase().includes(q)
    );
  });

  const filteredArchivedOutdoor = archivedOutdoorPlots.filter((p) => {
    if (archiveTypeFilter === 'madre') return false;
    if (selectedFolderFilter !== 'all' && p.cycleFolderId !== selectedFolderFilter) return false;
    if (!archiveSearchTerm.trim()) return true;
    const q = archiveSearchTerm.toLowerCase();
    return (
      p.nomeCanteiro.toLowerCase().includes(q) ||
      p.genetica.toLowerCase().includes(q) ||
      p.tipoSubstrato.toLowerCase().includes(q) ||
      (p.observacoes || '').toLowerCase().includes(q) ||
      (p.archiveNotes || '').toLowerCase().includes(q) ||
      (p.cycleLabel || '').toLowerCase().includes(q)
    );
  });

  // Calculate stats for Active Madres
  const totalMadres = activeMadres.length;
  const totalClonesEstimados = activeMadres.reduce((acc, curr) => acc + (curr.clonesPorTemporada || 0), 0);

  // Helper function to calculate duration in months
  const calculateMonths = (start: string, end: string) => {
    if (!start || !end) return c.cycleDefault;
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return c.cycleDefault;
    const diffTime = Math.abs(e.getTime() - s.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.round(diffDays / 30);
    return `${months} ${c.monthsUnit} (${diffDays} ${c.daysUnit})`;
  };

  // ---------------- CULTIVO INDOOR ----------------
  const handleOpenIndoorModal = (batch?: IndoorCropBatch) => {
    setIndoorFormError(null);
    if (batch) {
      setEditingIndoor(batch);
      setIndoorForm({
        nomeSala: batch.nomeSala,
        genetica: batch.genetica,
        quantidadePlantas: batch.quantidadePlantas,
        setor: batch.setor ?? indoorSetor,
        iluminacao: batch.iluminacao || '',
        temperaturaMedia: batch.temperaturaMedia || '',
        umidadeMedia: batch.umidadeMedia || '',
        sistemaIrrigacao: batch.sistemaIrrigacao || '',
        ventilacao: batch.ventilacao || '',
        manejoMip: batch.manejoMip || '',
        dataInicio: batch.dataInicio,
        previsaoColheita: batch.previsaoColheita,
        observacoes: batch.observacoes,
        imageUrl: batch.imageUrl,
        images: batch.images ?? [],
      });
    } else {
      setEditingIndoor(null);
      setIndoorForm({
        nomeSala: '',
        genetica: '',
        quantidadePlantas: 24,
        setor: indoorSetor,
        iluminacao: '',
        temperaturaMedia: '',
        umidadeMedia: '',
        sistemaIrrigacao: '',
        ventilacao: '',
        manejoMip: '',
        dataInicio: new Date().toISOString().split('T')[0],
        previsaoColheita: '',
        observacoes: '',
        images: [],
      });
    }
    setIsIndoorModalOpen(true);
  };

  const handleSaveIndoorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!indoorForm.nomeSala || !indoorForm.nomeSala.trim()) {
      setIndoorFormError('Informe o Nome da Sala/Grow antes de salvar.');
      return;
    }
    const setor: IndoorSetor = indoorForm.setor ?? indoorSetor;
    const batch: IndoorCropBatch = {
      ...(editingIndoor ?? {}),
      id: editingIndoor ? editingIndoor.id : 'indoor-' + Date.now(),
      nomeSala: indoorForm.nomeSala.trim(),
      genetica: (indoorForm.genetica || '').trim() || 'Cultivar Misto',
      quantidadePlantas: Number(indoorForm.quantidadePlantas) || 0,
      setor,
      estagio: setor === 'floracao' ? 'Floração' : 'Vegetativo',
      iluminacao: (indoorForm.iluminacao || '').trim(),
      tempUmidade: [indoorForm.temperaturaMedia, indoorForm.umidadeMedia].filter(Boolean).join(' / '),
      temperaturaMedia: (indoorForm.temperaturaMedia || '').trim(),
      umidadeMedia: (indoorForm.umidadeMedia || '').trim(),
      sistemaIrrigacao: (indoorForm.sistemaIrrigacao || '').trim(),
      ventilacao: (indoorForm.ventilacao || '').trim(),
      manejoMip: (indoorForm.manejoMip || '').trim(),
      rendimento: (indoorForm.rendimento || '').trim(),
      dataInicio: indoorForm.dataInicio || new Date().toISOString().split('T')[0],
      previsaoColheita: indoorForm.previsaoColheita || '',
      observacoes: (indoorForm.observacoes || '').trim(),
      imageUrl: (indoorForm.images ?? [])[0] || indoorForm.imageUrl,
      images: indoorForm.images ?? [],
    };
    onSaveIndoorBatch(batch);
    setIndoorSetor(setor);
    showToast(editingIndoor ? `Sala "${batch.nomeSala}" atualizada!` : `Sala "${batch.nomeSala}" cadastrada!`);
    setIsIndoorModalOpen(false);
    setEditingIndoor(null);
  };

  const handleAddIndoorPhoto = () => {
    const formatted = formatImageUrl(indoorPhotoInput.trim(), '');
    if (!formatted) return;
    setIndoorForm((prev) => {
      const images = prev.images ?? [];
      if (images.includes(formatted)) return prev;
      return { ...prev, images: [...images, formatted], imageUrl: prev.imageUrl || formatted };
    });
    setIndoorPhotoInput('');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-900 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Navigation Sub-Header for 1.6 Cultivo */}
      <div className="bg-slate-900 border border-emerald-800/80 p-3.5 sm:p-4 rounded-2xl shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-800/90 rounded-xl text-emerald-200 shrink-0 shadow">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded border border-emerald-800">
                {c.session}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Advanced Grower CULTIVO</span>
            </div>
            <h2 className="font-bold text-lg text-slate-100 mt-0.5">
              {c.title}
            </h2>
          </div>
        </div>

        {/* 3 Sub-sections Tabs (Madres, Cultivo Área Externa, Pasta Organizadora de Ciclos) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setActiveSub('madres')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSub === 'madres'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Dna className="w-4 h-4 text-emerald-300" />
            <span>Madres ({activeMadres.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSub('cultivo_externo')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSub === 'cultivo_externo'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-300" />
            <span>{t('cult.outdoorTab')} ({activeOutdoorPlots.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSub('cultivo_indoor')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSub === 'cultivo_indoor'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-300" />
            <span>{t('cult.indoorTab')} ({activeIndoorBatches.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSub('pasta_ciclos')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSub === 'pasta_ciclos'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FolderOpen className={`w-4 h-4 ${activeSub === 'pasta_ciclos' ? 'text-slate-950' : 'text-amber-400'}`} />
            <span>Pasta de Ciclos ({totalArchivedCount})</span>
          </button>
        </div>
      </div>

      {/* SUB-SECTION 1: MADRES ATIVAS */}
      {activeSub === 'madres' && (
        <div className="space-y-6">
          {/* Info Banner for Madres */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 p-4 rounded-2xl border border-emerald-800/70 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-900/80 text-emerald-300 rounded-xl shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-emerald-100 flex items-center gap-2">
                    {c.infoTitle}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">{t('cult.cycleInfo')}</p>
                </div>
              </div>

              {/* Botão de adicionar (visível quando a edição está ligada) */}
              {canEditBlocks && (
                <button
                  type="button"
                  onClick={() => handleOpenMadreModal()}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition shrink-0 self-start sm:self-center"
                >
                  <Plus className="w-4 h-4" />
                  <span>{c.addMadre}</span>
                </button>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-emerald-900/60 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/50 flex items-center gap-2">
                <Dna className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{c.totalGenotypes}</div>
                  <div className="font-bold text-emerald-300 text-sm">{totalMadres} {c.activeMadres}</div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/50 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{c.maintenance}</div>
                  <div className="font-bold text-amber-300 text-sm">{c.cycle}</div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/50 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{c.clones}</div>
                  <div className="font-bold text-emerald-200 text-sm">{totalClonesEstimados} {c.clonesSeason}</div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/50 flex items-center gap-2">
                <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('cult.archivedCycles')}</div>
                  <div className="font-bold text-slate-200 text-sm">{t('cult.historyCount', { count: archivedMadres.length })}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={c.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400 text-[11px]">{c.difficulty}</span>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="bg-transparent text-slate-200 focus:outline-none font-medium cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">{c.all}</option>
                  <option value="Fácil" className="bg-slate-900">{term('Fácil')}</option>
                  <option value="Média" className="bg-slate-900">{term('Média')}</option>
                  <option value="Difícil" className="bg-slate-900">{term('Difícil')}</option>
                  <option value="Especialista" className="bg-slate-900">{term('Especialista')}</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 text-[11px]">{c.cloneHealth}</span>
                <select
                  value={filterHealth}
                  onChange={(e) => setFilterHealth(e.target.value)}
                  className="bg-transparent text-slate-200 focus:outline-none font-medium cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">{c.all}</option>
                  <option value="Excelente" className="bg-slate-900">{term('Excelente')}</option>
                  <option value="Boa" className="bg-slate-900">{term('Boa')}</option>
                  <option value="Regular" className="bg-slate-900">{term('Regular')}</option>
                  <option value="Atenção" className="bg-slate-900">{term('Atenção')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards Grid - Madres Ativas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMadres.map((item) => {
              const madreImages = (item.images && item.images.length > 0)
                ? item.images
                : [item.imageUrl || FALLBACK_MADRE_IMAGE];

              const currentImgIdx = Math.min(imageIndexes[item.id] || 0, Math.max(0, madreImages.length - 1));
              const activeImgUrl = madreImages[currentImgIdx] || madreImages[0];

              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 hover:border-emerald-700/60 rounded-2xl p-5 space-y-4 shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-600" />

                  {/* 1. TÍTULOS */}
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] font-bold rounded border border-emerald-800 uppercase tracking-wider flex items-center gap-1">
                            <Dna className="w-3 h-3 text-emerald-400" />
                            {c.genotype}
                          </span>
                          {item.casaVegetacao && (
                            <span className="px-2 py-0.5 bg-slate-950 text-slate-300 text-[10px] font-medium rounded border border-slate-800 flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-400" />
                              {item.casaVegetacao}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 group-hover:text-emerald-300 transition-colors">
                          {item.genetica}
                        </h3>

                        <p className="text-xs text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{c.bank} {item.banco}</span>
                        </p>
                      </div>

                      <div className="bg-emerald-950/90 border border-emerald-700/80 px-2.5 py-1.5 rounded-xl text-right shrink-0 shadow-sm">
                        <div className="text-[8px] uppercase tracking-wider text-emerald-400 font-bold">{t('cult.cannabinoids')}</div>
                        <div className="text-xs font-black text-emerald-200">{item.porcentagemThcCbd}</div>
                      </div>
                    </div>

                    {/* Cycle Timeline Bar */}
                    <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          {c.start} <strong className="text-slate-200">{formatDateBr(item.diaInicio)}</strong>
                        </span>
                        <span className="text-slate-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          {t('cult.endLabel')} <strong className="text-slate-200">{formatDateBr(item.ultimoDia)}</strong>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono">
                        <span>{c.cycleLabel}</span>
                        <span className="font-bold">{calculateMonths(item.diaInicio, item.ultimoDia)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. FOTO VERTICAL */}
                  <div className="space-y-2">
                    <div className="relative w-full aspect-[3/4] max-h-80 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                      <SafeImage
                        src={activeImgUrl}
                        fallbackSrc={FALLBACK_MADRE_IMAGE}
                        alt={item.genetica}
                        className="w-full h-full object-cover cursor-pointer transition hover:scale-105"
                        onClick={() => setZoomedImage({ url: formatImageUrl(activeImgUrl, FALLBACK_MADRE_IMAGE), title: `Madre: ${item.genetica}` })}
                      />

                      <button
                        type="button"
                        onClick={() => setZoomedImage({ url: activeImgUrl, title: `Madre: ${item.genetica}` })}
                        className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-slate-900 text-emerald-300 rounded-lg border border-slate-700 shadow backdrop-blur-sm transition z-10"
                        title={c.zoomPhoto}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {madreImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              const prevIdx = (currentImgIdx - 1 + madreImages.length) % madreImages.length;
                              setImageIndexes((prev) => ({ ...prev, [item.id]: prevIdx }));
                            }}
                            className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-slate-950/80 hover:bg-emerald-900 text-white rounded-full border border-slate-700 shadow backdrop-blur-sm transition z-10"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const nextIdx = (currentImgIdx + 1) % madreImages.length;
                              setImageIndexes((prev) => ({ ...prev, [item.id]: nextIdx }));
                            }}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-slate-950/80 hover:bg-emerald-900 text-white rounded-full border border-slate-700 shadow backdrop-blur-sm transition z-10"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-slate-700 backdrop-blur-sm text-[10px] text-emerald-300 font-mono z-10">
                            {currentImgIdx + 1} / {madreImages.length}
                          </div>
                        </>
                      )}

                      <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] text-emerald-200 border border-slate-700">
                        Clique p/ Ampliar
                      </div>
                    </div>

                    {/* Photo URL Link Option (ADMIN ONLY, completely optional) */}
                    {canManageMadre(item.id) && (
                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-slate-400 text-[11px] font-semibold">
                            <Camera className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Fotos da Genética ({madreImages.length})</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setShowUrlInputMap((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-[11px] rounded-lg transition flex items-center gap-1"
                          >
                            <Link className="w-3 h-3 text-amber-400" />
                            <span>+ Foto via Link</span>
                          </button>
                        </div>

                        {showUrlInputMap[item.id] && (
                          <div className="flex items-center gap-1.5 pt-1 border-t border-slate-800">
                            <input
                              type="text"
                              value={urlInputValueMap[item.id] || ''}
                              onChange={(e) => setUrlInputValueMap((prev) => ({ ...prev, [item.id]: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddMadreCardUrl(item.id, urlInputValueMap[item.id] || '');
                                }
                              }}
                              placeholder={c.photoUrlPlaceholder}
                              className="flex-1 bg-slate-900 text-slate-100 text-xs px-2.5 py-1 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 placeholder-slate-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddMadreCardUrl(item.id, urlInputValueMap[item.id] || '')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition"
                            >
                              {c.save}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 3. DESCRIÇÃO E CARACTERÍSTICAS TÉCNICAS */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-medium block">{c.difficultyLabel}</span>
                        <span
                          className={`inline-block font-bold text-xs px-2 py-0.5 rounded ${
                            item.dificuldadeCultivo === 'Fácil'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : item.dificuldadeCultivo === 'Média'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-red-950 text-red-300 border border-red-800'
                          }`}
                        >
                          {term(item.dificuldadeCultivo)}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-medium block">{c.clonesPerSeason}</span>
                        <div className="text-xs font-extrabold text-emerald-300 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{item.clonesPorTemporada} {c.clonesUnit}</span>
                        </div>
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-medium block">{c.cloneHealthLabel}</span>
                        <span
                          className={`inline-block font-bold text-xs px-2 py-0.5 rounded ${
                            item.saudeClones === 'Excelente' || item.saudeClones === 'Boa'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {term(item.saudeClones)}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-medium block">{c.rooting}</span>
                        <span className="font-bold text-slate-100 text-xs block truncate" title={item.enraizamento}>
                          {item.enraizamento}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>{c.pestAttack}</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-snug">
                        {item.ataquePragas}
                      </p>
                    </div>

                    {item.observacoes && (
                      <div className="text-[11px] text-slate-400 italic bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                        <strong className="text-slate-300 not-italic">{c.obs}</strong> {item.observacoes}
                      </div>
                    )}

                    {/* Admin Actions Footer: Arquivar | Editar | Excluir */}
                    {canManageMadre(item.id) && (
                      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenArchiveModal({ type: 'madre', item })}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg flex items-center gap-1 transition shadow-sm"
                          title="Arquivar esta Madre na Pasta Organizadora de Ciclos"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          <span>Arquivar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenMadreModal(item)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg border border-slate-700 flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>{c.edit}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirmTarget({ type: 'madre', id: item.id, name: item.genetica })
                          }
                          className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 font-semibold text-xs rounded-lg border border-red-800/60 flex items-center gap-1 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{c.delete}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredMadres.length === 0 && (
              <div className="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
                <Dna className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="font-bold text-slate-300 text-base">Nenhum genótipo de Madre ativa encontrado</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {archivedMadres.length > 0
                    ? `Existem ${archivedMadres.length} genética(s) arquivada(s) disponíveis para consulta na aba "Pasta de Ciclos".`
                    : 'Tente alterar os filtros ou cadastre uma nova genética Madre.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: CULTIVO ÁREA EXTERNA ATIVO */}
      {activeSub === 'cultivo_externo' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-950 p-4 rounded-2xl border border-emerald-800 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-amber-600 rounded-xl text-slate-950 shrink-0 font-bold">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-100">
                  1.6.2 {t('cult.outdoorTab')}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {t('cult.outdoorInfo')}
                </p>
              </div>
            </div>

            {canEditBlocks && (
              <button
                type="button"
                onClick={() => handleOpenOutdoorModal()}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{t('cult.newPlot')}</span>
              </button>
            )}
          </div>

          {/* Ambiente: Casa de Vegetação x Área Externa */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start">
            <button type="button" onClick={() => setOutdoorAmbiente('casa_vegetacao')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${outdoorAmbiente === 'casa_vegetacao' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>{t('cult.ambCasa')} ({activeOutdoorPlots.filter((p) => (p.ambiente ?? 'area_externa') === 'casa_vegetacao').length})</button>
            <button type="button" onClick={() => setOutdoorAmbiente('area_externa')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${outdoorAmbiente === 'area_externa' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>{t('cult.ambExterna')} ({activeOutdoorPlots.filter((p) => (p.ambiente ?? 'area_externa') === 'area_externa').length})</button>
          </div>

          {/* Outdoor Plots Active List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {outdoorVisible.length === 0 && (
              <div className="col-span-full text-center border border-dashed border-slate-700 rounded-2xl p-8 space-y-3">
                <p className="text-xs text-slate-400">{t('cult.emptyAmbiente')}</p>
                {canEditBlocks && (
                  <button
                    type="button"
                    onClick={() => handleOpenOutdoorModal()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('cult.newPlot')}</span>
                  </button>
                )}
              </div>
            )}
            {outdoorVisible.map((plot) => {
              const plotImages = (plot.images && plot.images.length > 0)
                ? plot.images
                : [plot.imageUrl || FALLBACK_OUTDOOR_IMAGE];

              const currentImgIdx = Math.min(imageIndexes[plot.id] || 0, Math.max(0, plotImages.length - 1));
              const activeImgUrl = plotImages[currentImgIdx] || plotImages[0];

              return (
                <div
                  key={plot.id}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-600/50 p-5 rounded-2xl space-y-4 shadow-sm transition group flex flex-col justify-between"
                >
                  {/* 1. TÍTULOS */}
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800 uppercase tracking-wider inline-flex items-center gap-1">
                          <Sun className="w-3 h-3 text-amber-400" />
                          {c.outdoorTab}
                        </span>
                        <h4 className="font-bold text-base text-slate-100 mt-1">{plot.nomeCanteiro}</h4>
                        <p className="text-xs text-emerald-400 font-semibold">{plot.genetica}</p>
                      </div>

                      <span className="text-xs font-extrabold bg-slate-950 px-3 py-1 rounded-xl text-slate-200 border border-slate-800 shrink-0">
                        {plot.quantidadePlantas} {c.plantsUnit}
                      </span>
                    </div>

                    <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{c.plantio} <strong className="text-slate-200">{formatDateBr(plot.dataPlantio)}</strong></span>
                      <span>Colheita: <strong className="text-amber-300">{formatDateBr(plot.previsaoColheita)}</strong></span>
                    </div>
                  </div>

                  {/* 2. FOTO VERTICAL */}
                  <div className="space-y-2">
                    <div className="relative w-full aspect-[3/4] max-h-80 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                      <SafeImage
                        src={activeImgUrl}
                        fallbackSrc={FALLBACK_OUTDOOR_IMAGE}
                        alt={plot.nomeCanteiro}
                        className="w-full h-full object-cover cursor-pointer transition hover:scale-105"
                        onClick={() => setZoomedImage({ url: formatImageUrl(activeImgUrl, FALLBACK_OUTDOOR_IMAGE), title: `Área Externa: ${plot.nomeCanteiro}` })}
                      />

                      <button
                        type="button"
                        onClick={() => setZoomedImage({ url: activeImgUrl, title: `Área Externa: ${plot.nomeCanteiro}` })}
                        className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-slate-900 text-amber-300 rounded-lg border border-slate-700 shadow backdrop-blur-sm transition z-10"
                        title={c.zoomPhoto}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {plotImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              const prevIdx = (currentImgIdx - 1 + plotImages.length) % plotImages.length;
                              setImageIndexes((prev) => ({ ...prev, [plot.id]: prevIdx }));
                            }}
                            className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-slate-950/80 hover:bg-amber-900 text-white rounded-full border border-slate-700 shadow backdrop-blur-sm transition z-10"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const nextIdx = (currentImgIdx + 1) % plotImages.length;
                              setImageIndexes((prev) => ({ ...prev, [plot.id]: nextIdx }));
                            }}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-slate-950/80 hover:bg-amber-900 text-white rounded-full border border-slate-700 shadow backdrop-blur-sm transition z-10"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-slate-700 backdrop-blur-sm text-[10px] text-amber-300 font-mono z-10">
                            {currentImgIdx + 1} / {plotImages.length}
                          </div>
                        </>
                      )}

                      <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] text-amber-200 border border-slate-700">
                        Clique p/ Ampliar
                      </div>
                    </div>

                    {/* Photo URL Link Option (ADMIN ONLY, completely optional) */}
                    {canManageOutdoor(plot.id) && (
                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-slate-400 text-[11px] font-semibold">
                            <Camera className="w-3.5 h-3.5 text-amber-400" />
                            <span>Fotos do Canteiro ({plotImages.length})</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setShowUrlInputMap((prev) => ({ ...prev, [plot.id]: !prev[plot.id] }))}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-[11px] rounded-lg transition flex items-center gap-1"
                          >
                            <Link className="w-3 h-3 text-emerald-400" />
                            <span>+ Foto via Link</span>
                          </button>
                        </div>

                        {showUrlInputMap[plot.id] && (
                          <div className="flex items-center gap-1.5 pt-1 border-t border-slate-800">
                            <input
                              type="text"
                              value={urlInputValueMap[plot.id] || ''}
                              onChange={(e) => setUrlInputValueMap((prev) => ({ ...prev, [plot.id]: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddOutdoorCardUrl(plot.id, urlInputValueMap[plot.id] || '');
                                }
                              }}
                              placeholder={c.photoUrlPlaceholder}
                              className="flex-1 bg-slate-900 text-slate-100 text-xs px-2.5 py-1 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-500 placeholder-slate-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddOutdoorCardUrl(plot.id, urlInputValueMap[plot.id] || '')}
                              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition"
                            >
                              {c.save}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 3. DESCRIÇÃO E DETALHES TÉCNICOS */}
                  <div className="space-y-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs space-y-2">
                      <div>
                        <span className="text-slate-400">{c.photoperiod}</span>{' '}
                        <strong className="text-amber-300">{plot.faseFotoperiodo}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">{c.substrate}</span>{' '}
                        <strong className="text-slate-200">{plot.tipoSubstrato}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">{c.protection}</span>{' '}
                        <strong className="text-slate-200">{plot.protecaoClimatica}</strong>
                      </div>
                      {plot.fase === 'floracao' && plot.rendimento && (
                        <div>
                          <span className="text-slate-400">{t('cult.rendimento')}</span>{' '}
                          <strong className="text-slate-200">{plot.rendimento}</strong>
                        </div>
                      )}
                    </div>

                    {plot.observacoes && (
                      <p className="text-xs text-slate-300 italic bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                        <strong className="text-slate-200 not-italic">{c.observations}</strong> {plot.observacoes}
                      </p>
                    )}

                    {/* Admin Actions Footer: Arquivar | Editar | Excluir */}
                    {canManageOutdoor(plot.id) && (
                      <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => handleOpenArchiveModal({ type: 'outdoor', item: plot })}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg flex items-center gap-1 transition shadow-sm"
                          title="Arquivar este Canteiro na Pasta Organizadora de Ciclos"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          <span>Arquivar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenOutdoorModal(plot)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg border border-slate-700 flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>{c.edit}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirmTarget({ type: 'outdoor', id: plot.id, name: plot.nomeCanteiro })
                          }
                          className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 font-semibold text-xs rounded-lg border border-red-800/60 flex items-center gap-1 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{c.delete}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {activeOutdoorPlots.length === 0 && (
              <div className="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
                <Sun className="w-10 h-10 text-amber-500/60 mx-auto" />
                <h4 className="font-bold text-slate-300 text-base">Nenhum Canteiro de Área Externa ativo</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {archivedOutdoorPlots.length > 0
                    ? `Existem ${archivedOutdoorPlots.length} canteiro(s) arquivado(s) disponíveis para consulta na aba "Pasta de Ciclos".`
                    : canEditBlocks
                    ? "Clique em 'Novo Canteiro Área Externa' para adicionar o primeiro lote ao ar livre."
                    : 'Nenhum lote externo ativo no momento.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: PASTA ORGANIZADORA DE CICLOS (4 EM 4 MESES) */}
      {/* SUB-SECTION: CULTIVO INDOOR (Setor Vegetativo / Setor Floração) */}
      {activeSub === 'cultivo_indoor' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-950 p-4 rounded-2xl border border-emerald-800 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-emerald-600 rounded-xl text-white shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-100">1.6.3 {t('cult.indoorTab')}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{t('cult.indoorInfo')}</p>
              </div>
            </div>
            {canEditBlocks && (
              <button
                type="button"
                onClick={() => handleOpenIndoorModal()}
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{t('cult.newIndoor')}</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start">
            <button
              type="button"
              onClick={() => setIndoorSetor('vegetativo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                indoorSetor === 'vegetativo' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {t('cult.setorVegetativo')} ({activeIndoorBatches.filter((b) => indoorSetorOf(b) === 'vegetativo').length})
            </button>
            <button
              type="button"
              onClick={() => setIndoorSetor('floracao')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                indoorSetor === 'floracao' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {t('cult.setorFloracao')} ({activeIndoorBatches.filter((b) => indoorSetorOf(b) === 'floracao').length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {indoorVisible.map((batch) => {
              const canManage = canManageIndoor(batch.id);
              return (
                <article key={batch.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
                  {(batch.images?.[0] || batch.imageUrl) && (
                    <SafeImage
                      src={(batch.images?.[0] || batch.imageUrl) as string}
                      fallbackSrc={FALLBACK_OUTDOOR_IMAGE}
                      alt={batch.nomeSala}
                      className="h-36 w-full object-cover rounded-xl border border-slate-800"
                    />
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-slate-100 truncate">{batch.nomeSala}</h3>
                      <p className="text-xs text-emerald-300/90 truncate">
                        {batch.genetica} • {batch.quantidadePlantas} plantas
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700 bg-emerald-950 text-emerald-300 whitespace-nowrap">
                      {t(indoorSetorOf(batch) === 'floracao' ? 'cult.setorFloracao' : 'cult.setorVegetativo')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="block text-[9px] uppercase tracking-wider text-slate-500">{t('cult.light')}</span>
                      <strong className="text-slate-200">{batch.iluminacao || '—'}</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="block text-[9px] uppercase tracking-wider text-slate-500">{t('cult.tempAvg')}</span>
                      <strong className="text-slate-200">{batch.temperaturaMedia || '—'}</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="block text-[9px] uppercase tracking-wider text-slate-500">{t('cult.humidityAvg')}</span>
                      <strong className="text-slate-200">{batch.umidadeMedia || '—'}</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="block text-[9px] uppercase tracking-wider text-slate-500">{t('cult.irrigation')}</span>
                      <strong className="text-slate-200">{batch.sistemaIrrigacao || '—'}</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="block text-[9px] uppercase tracking-wider text-slate-500">{t('cult.ventilation')}</span>
                      <strong className="text-slate-200">{batch.ventilacao || '—'}</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="block text-[9px] uppercase tracking-wider text-slate-500">{t('cult.manejoMip')}</span>
                      <strong className="text-slate-200">{batch.manejoMip || '—'}</strong>
                    </div>
                    {indoorSetorOf(batch) === 'floracao' && batch.rendimento && (
                      <div className="bg-slate-950 p-2 rounded-lg border border-emerald-800/60 sm:col-span-2">
                        <span className="block text-[9px] uppercase tracking-wider text-slate-500">{t('cult.rendimento')}</span>
                        <strong className="text-emerald-200">{batch.rendimento}</strong>
                      </div>
                    )}
                  </div>

                  {batch.observacoes && <p className="text-xs text-slate-400">{batch.observacoes}</p>}

                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800 pt-2">
                    <span>
                      {formatDateBr(batch.dataInicio)} → {formatDateBr(batch.previsaoColheita)}
                    </span>
                    {canManage && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenIndoorModal(batch)}
                          className="p-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 rounded-lg border border-emerald-800"
                          title={t('common.edit')}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Excluir a sala "${batch.nomeSala}"?`)) {
                              onDeleteIndoorBatch(batch.id);
                              showToast(`Sala "${batch.nomeSala}" removida.`);
                            }
                          }}
                          className="p-1.5 bg-red-950/70 hover:bg-red-900 text-red-300 rounded-lg border border-red-900"
                          title={t('common.delete')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
            {indoorVisible.length === 0 && (
              <div className="col-span-full text-center text-xs text-slate-400 border border-dashed border-slate-700 rounded-2xl p-6">
                {t('cult.noIndoor')}
              </div>
            )}
          </div>

          {/* MODAL: SALA / GROW INDOOR */}
          {isIndoorModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
              onClick={() => { setIsIndoorModalOpen(false); setEditingIndoor(null); }}
            >
              <div
                className="bg-slate-900 border border-emerald-600/80 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-6 text-slate-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 bg-emerald-700 text-white flex items-center justify-between font-bold text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <span>{editingIndoor ? `${t('common.edit')}: ${editingIndoor.nomeSala}` : t('cult.newIndoor')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsIndoorModalOpen(false); setEditingIndoor(null); }}
                    className="p-1 hover:bg-emerald-600 rounded-lg"
                    title={t('common.close')}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form noValidate onSubmit={handleSaveIndoorSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
                  {indoorFormError && (
                    <div className="p-3 bg-red-950/80 border border-red-700 text-red-200 rounded-xl font-semibold">
                      {indoorFormError}
                    </div>
                  )}

                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <label className="block text-emerald-300 font-bold text-xs">{t('cult.addPhoto')}</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={indoorPhotoInput}
                        onChange={(e) => setIndoorPhotoInput(e.target.value)}
                        placeholder={c.photoUrlPlaceholder}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddIndoorPhoto}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shrink-0"
                      >
                        + {t('common.add')}
                      </button>
                    </div>
                    {(indoorForm.images?.length ?? 0) > 0 && (
                      <div className="flex gap-2 overflow-x-auto pt-1">
                        {(indoorForm.images ?? []).map((img) => (
                          <div key={img} className="relative shrink-0">
                            <img src={img} alt="" className="h-16 w-16 object-cover rounded-lg border border-slate-700" />
                            <button
                              type="button"
                              onClick={() => setIndoorForm((prev) => ({ ...prev, images: (prev.images ?? []).filter((i) => i !== img) }))}
                              className="absolute -top-1.5 -right-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full p-0.5 shadow"
                              title={t('common.delete')}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{t('cult.roomName')}</label>
                      <input
                        type="text"
                        required
                        value={indoorForm.nomeSala || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, nomeSala: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{c.fieldCultivar}</label>
                      <input
                        type="text"
                        value={indoorForm.genetica || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, genetica: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{c.fieldPlantCount}</label>
                      <input
                        type="number"
                        min={0}
                        value={indoorForm.quantidadePlantas ?? 0}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, quantidadePlantas: Number(e.target.value) }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{t('cult.sector')}</label>
                      <select
                        value={indoorForm.setor ?? 'vegetativo'}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, setor: e.target.value as IndoorSetor, rendimento: e.target.value === 'vegetativo' ? '' : prev.rendimento }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="vegetativo">{t('cult.setorVegetativo')}</option>
                        <option value="floracao">{t('cult.setorFloracao')}</option>
                      </select>
                    </div>
                  </div>

                  {(indoorForm.setor ?? 'vegetativo') === 'floracao' && (
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{t('cult.rendimento')}</label>
                      <input
                        type="text"
                        value={indoorForm.rendimento || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, rendimento: e.target.value }))}
                        placeholder="Ex: 120 g/planta"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{t('cult.light')}</label>
                      <input
                        type="text"
                        value={indoorForm.iluminacao || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, iluminacao: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{t('cult.tempAvg')}</label>
                      <input
                        type="text"
                        value={indoorForm.temperaturaMedia || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, temperaturaMedia: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{t('cult.humidityAvg')}</label>
                      <input
                        type="text"
                        value={indoorForm.umidadeMedia || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, umidadeMedia: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{t('cult.irrigation')}</label>
                      <input
                        type="text"
                        value={indoorForm.sistemaIrrigacao || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, sistemaIrrigacao: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-300 font-medium mb-1">{t('cult.ventilation')}</label>
                      <input
                        type="text"
                        value={indoorForm.ventilacao || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, ventilacao: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('cult.manejoMip')}</label>
                    <textarea
                      rows={2}
                      value={indoorForm.manejoMip || ''}
                      onChange={(e) => setIndoorForm((prev) => ({ ...prev, manejoMip: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{c.fieldPlantingDate}</label>
                      <input
                        type="date"
                        value={indoorForm.dataInicio || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, dataInicio: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">{c.fieldHarvestDate}</label>
                      <input
                        type="date"
                        value={indoorForm.previsaoColheita || ''}
                        onChange={(e) => setIndoorForm((prev) => ({ ...prev, previsaoColheita: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('cult.obsGeneral')}</label>
                    <textarea
                      rows={2}
                      value={indoorForm.observacoes || ''}
                      onChange={(e) => setIndoorForm((prev) => ({ ...prev, observacoes: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => { setIsIndoorModalOpen(false); setEditingIndoor(null); }}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-medium"
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('common.save')}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSub === 'pasta_ciclos' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950/70 to-slate-900 p-4 rounded-2xl border border-amber-600/50 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl shrink-0 mt-0.5 shadow">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-100">
                    Pasta Organizadora de Ciclos (Quadrimestral • 4 em 4 Meses)
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed max-w-3xl">
                    Arquivo organizado de 4 em 4 meses para preservar o histórico de <strong>Madres</strong> e{' '}
                    <strong>{c.outdoorTab}</strong>. Consulte dados passados a qualquer momento, restaure registros ou reutilize uma ficha para iniciar um novo ciclo sem poluir o ambiente principal.
                  </p>
                </div>
              </div>

              {canEditBlocks && (
                <button
                  type="button"
                  onClick={() => handleOpenFolderModal()}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center gap-1.5 self-start sm:self-center"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Nova Pasta de Ciclo (4 Meses)</span>
                </button>
              )}
            </div>
          </div>

          {/* Cycle Folders Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* "All Folders" Overview Card */}
            <div
              onClick={() => setSelectedFolderFilter('all')}
              className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                selectedFolderFilter === 'all'
                  ? 'bg-emerald-950/90 border-emerald-500 shadow-md'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-bold text-xs text-slate-100">Todas as Pastas de Ciclos</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-emerald-300 border border-slate-800">
                  {totalArchivedCount}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
                <span>{archivedMadres.length} Madres</span>
                <span>{archivedOutdoorPlots.length} Área Externa</span>
              </div>
            </div>

            {/* Individual 4-Month Cycle Folders */}
            {cycleFolders.map((folder) => {
              const folderMadresCount = archivedMadres.filter((m) => m.cycleFolderId === folder.id).length;
              const folderOutdoorCount = archivedOutdoorPlots.filter((p) => p.cycleFolderId === folder.id).length;
              const folderTotal = folderMadresCount + folderOutdoorCount;
              const isSelected = selectedFolderFilter === folder.id;

              return (
                <div
                  key={folder.id}
                  onClick={() => setSelectedFolderFilter(folder.id)}
                  className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-amber-950/80 border-amber-500 shadow-md'
                      : 'bg-slate-900 border-slate-800 hover:border-amber-700/50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        {isSelected ? (
                          <FolderOpen className="w-5 h-5 text-amber-400 shrink-0" />
                        ) : (
                          <Folder className="w-5 h-5 text-amber-400/80 shrink-0" />
                        )}
                        <span className="font-bold text-xs text-slate-100 truncate" title={folder.name}>
                          {folder.name}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-amber-300 border border-slate-800 shrink-0">
                        {folderTotal}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>
                        {formatDateBr(folder.startDate)} – {formatDateBr(folder.endDate)}
                      </span>
                    </div>

                    {folder.notes && (
                      <p className="text-[10px] text-slate-400 line-clamp-1">{folder.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <span>
                      {folderMadresCount} Madres • {folderOutdoorCount} Ext.
                    </span>

                    {canManageCycleFolder(folder.id) && (
                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => handleOpenFolderModal(folder)}
                          className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-amber-300 transition"
                          title="Editar nome ou datas da pasta"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        {folderTotal === 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirmTarget({ type: 'folder', id: folder.id, name: folder.name })
                            }
                            className="p-1 hover:bg-red-950 rounded text-slate-400 hover:text-red-300 transition"
                            title="Remover pasta vazia"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Search & Type Filter inside Cycle Organizer */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Consultar nos ciclos arquivados por genética, canteiro, banco, substrato ou notas..."
                value={archiveSearchTerm}
                onChange={(e) => setArchiveSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setArchiveTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  archiveTypeFilter === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setArchiveTypeFilter('madre')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  archiveTypeFilter === 'madre'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Madres
              </button>
              <button
                type="button"
                onClick={() => setArchiveTypeFilter('outdoor')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  archiveTypeFilter === 'outdoor'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Área Externa
              </button>
            </div>
          </div>

          {/* Archived Consultation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Archived Madres Cards */}
            {filteredArchivedMadres.map((item) => {
              const madreImages = (item.images && item.images.length > 0)
                ? item.images
                : [item.imageUrl || FALLBACK_MADRE_IMAGE];
              const currentImgIdx = Math.min(imageIndexes[item.id] || 0, Math.max(0, madreImages.length - 1));
              const activeImgUrl = madreImages[currentImgIdx] || madreImages[0];

              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Archive Cycle Folder Ribbon */}
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-700/50 text-[11px]">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Folder className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{item.cycleLabel || 'Ciclo Arquivado'}</span>
                      </span>
                      {item.archivedAt && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          Arq: {formatDateBr(item.archivedAt)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] font-bold rounded border border-emerald-800 uppercase tracking-wider inline-flex items-center gap-1 mb-1">
                          <Dna className="w-3 h-3 text-emerald-400" />
                          Madre Arquivada
                        </span>
                        <h3 className="text-base font-bold text-slate-100">{item.genetica}</h3>
                        <p className="text-xs text-amber-400 font-semibold">{c.bank} {item.banco}</p>
                      </div>

                      <div className="bg-emerald-950/90 border border-emerald-700/80 px-2.5 py-1 rounded-xl text-right shrink-0">
                        <div className="text-[8px] uppercase text-emerald-400 font-bold">Cannabinoides</div>
                        <div className="text-xs font-black text-emerald-200">{item.porcentagemThcCbd}</div>
                      </div>
                    </div>

                    <div className="bg-slate-950/90 p-2 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{c.start} <strong className="text-slate-200">{formatDateBr(item.diaInicio)}</strong></span>
                      <span>Fim: <strong className="text-slate-200">{formatDateBr(item.ultimoDia)}</strong></span>
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="relative w-full aspect-[3/4] max-h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                    <SafeImage
                      src={activeImgUrl}
                      fallbackSrc={FALLBACK_MADRE_IMAGE}
                      alt={item.genetica}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setZoomedImage({ url: formatImageUrl(activeImgUrl, FALLBACK_MADRE_IMAGE), title: `Histórico Madre: ${item.genetica}` })}
                    />
                    {madreImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const prevIdx = (currentImgIdx - 1 + madreImages.length) % madreImages.length;
                            setImageIndexes((prev) => ({ ...prev, [item.id]: prevIdx }));
                          }}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1 bg-slate-950/80 text-white rounded-full border border-slate-700"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const nextIdx = (currentImgIdx + 1) % madreImages.length;
                            setImageIndexes((prev) => ({ ...prev, [item.id]: nextIdx }));
                          }}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 bg-slate-950/80 text-white rounded-full border border-slate-700"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Technical Summary & Consultation Notes */}
                  <div className="space-y-2.5 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Clones / Temp.</span>
                        <strong className="text-emerald-300">{item.clonesPorTemporada} clones ({term(item.saudeClones)})</strong>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">{c.rooting}</span>
                        <strong className="text-slate-200 truncate block" title={item.enraizamento}>{item.enraizamento}</strong>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                      <strong className="text-amber-400">Pragas/Resistência:</strong> {item.ataquePragas}
                    </div>

                    {item.observacoes && (
                      <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2 rounded-lg border border-slate-800/60">
                        <strong className="text-slate-300">Obs Cultivo:</strong> {item.observacoes}
                      </div>
                    )}

                    {item.archiveNotes && (
                      <div className="text-[11px] text-amber-200 bg-amber-950/40 p-2.5 rounded-lg border border-amber-700/50">
                        <strong className="text-amber-300 block mb-0.5">Resumo de Fechamento do Ciclo:</strong>
                        {item.archiveNotes}
                      </div>
                    )}

                    {canManageMadre(item.id) && (
                      <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleRestoreMadre(item)}
                          className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-[11px] rounded-lg flex items-center gap-1 transition"
                          title="Devolver ao painel ativo de Madres"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Restaurar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCloneMadreForNewCycle(item)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] rounded-lg border border-slate-700 flex items-center gap-1 transition"
                          title="Criar novo ciclo ativo com estes dados mantendo este registro arquivado"
                        >
                          <Copy className="w-3 h-3 text-emerald-400" />
                          <span>Novo Ciclo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenMadreModal(item)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] rounded-lg border border-slate-700 flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3 h-3 text-amber-400" />
                          <span>{c.edit}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirmTarget({ type: 'madre', id: item.id, name: item.genetica })
                          }
                          className="p-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 rounded-lg border border-red-800/60 transition"
                          title="Excluir registro permanentemente"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Archived Outdoor Plots Cards */}
            {filteredArchivedOutdoor.map((plot) => {
              const plotImages = (plot.images && plot.images.length > 0)
                ? plot.images
                : [plot.imageUrl || FALLBACK_OUTDOOR_IMAGE];
              const currentImgIdx = Math.min(imageIndexes[plot.id] || 0, Math.max(0, plotImages.length - 1));
              const activeImgUrl = plotImages[currentImgIdx] || plotImages[0];

              return (
                <div
                  key={plot.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-700/50 text-[11px]">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Folder className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{plot.cycleLabel || 'Ciclo Arquivado'}</span>
                      </span>
                      {plot.archivedAt && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          Arq: {formatDateBr(plot.archivedAt)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800 uppercase tracking-wider inline-flex items-center gap-1 mb-1">
                          <Sun className="w-3 h-3 text-amber-400" />
                          Área Externa Arquivada
                        </span>
                        <h4 className="font-bold text-base text-slate-100">{plot.nomeCanteiro}</h4>
                        <p className="text-xs text-emerald-400 font-semibold">{plot.genetica}</p>
                      </div>

                      <span className="text-xs font-extrabold bg-slate-950 px-2.5 py-1 rounded-xl text-slate-200 border border-slate-800 shrink-0">
                        {plot.quantidadePlantas} {c.plantsUnit}
                      </span>
                    </div>

                    <div className="bg-slate-950/90 p-2 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{c.plantio} <strong className="text-slate-200">{formatDateBr(plot.dataPlantio)}</strong></span>
                      <span>Colheita: <strong className="text-amber-300">{formatDateBr(plot.previsaoColheita)}</strong></span>
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="relative w-full aspect-[3/4] max-h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                    <SafeImage
                      src={activeImgUrl}
                      fallbackSrc={FALLBACK_OUTDOOR_IMAGE}
                      alt={plot.nomeCanteiro}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setZoomedImage({ url: formatImageUrl(activeImgUrl, FALLBACK_OUTDOOR_IMAGE), title: `Histórico Área Externa: ${plot.nomeCanteiro}` })}
                    />
                    {plotImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const prevIdx = (currentImgIdx - 1 + plotImages.length) % plotImages.length;
                            setImageIndexes((prev) => ({ ...prev, [plot.id]: prevIdx }));
                          }}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1 bg-slate-950/80 text-white rounded-full border border-slate-700"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const nextIdx = (currentImgIdx + 1) % plotImages.length;
                            setImageIndexes((prev) => ({ ...prev, [plot.id]: nextIdx }));
                          }}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 bg-slate-950/80 text-white rounded-full border border-slate-700"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-[11px]">
                      <div><span className="text-slate-400">Fotoperíodo:</span> <strong className="text-amber-300">{plot.faseFotoperiodo}</strong></div>
                      <div><span className="text-slate-400">Substrato:</span> <strong className="text-slate-200">{plot.tipoSubstrato}</strong></div>
                      <div><span className="text-slate-400">Proteção:</span> <strong className="text-slate-200">{plot.protecaoClimatica}</strong></div>
                    </div>

                    {plot.observacoes && (
                      <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2 rounded-lg border border-slate-800/60">
                        <strong className="text-slate-300">Obs Canteiro:</strong> {plot.observacoes}
                      </div>
                    )}

                    {plot.archiveNotes && (
                      <div className="text-[11px] text-amber-200 bg-amber-950/40 p-2.5 rounded-lg border border-amber-700/50">
                        <strong className="text-amber-300 block mb-0.5">Resumo de Fechamento do Ciclo:</strong>
                        {plot.archiveNotes}
                      </div>
                    )}

                    {canManageOutdoor(plot.id) && (
                      <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleRestoreOutdoor(plot)}
                          className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-[11px] rounded-lg flex items-center gap-1 transition"
                          title="Devolver ao painel ativo de Área Externa"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Restaurar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCloneOutdoorForNewCycle(plot)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] rounded-lg border border-slate-700 flex items-center gap-1 transition"
                          title="Iniciar novo ciclo ativo com estes dados mantendo este histórico arquivado"
                        >
                          <Copy className="w-3 h-3 text-emerald-400" />
                          <span>Novo Ciclo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenOutdoorModal(plot)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] rounded-lg border border-slate-700 flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3 h-3 text-amber-400" />
                          <span>{c.edit}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirmTarget({ type: 'outdoor', id: plot.id, name: plot.nomeCanteiro })
                          }
                          className="p-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 rounded-lg border border-red-800/60 transition"
                          title="Excluir registro permanentemente"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredArchivedMadres.length === 0 && filteredArchivedOutdoor.length === 0 && (
              <div className="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
                <FolderOpen className="w-10 h-10 text-amber-500/60 mx-auto" />
                <h4 className="font-bold text-slate-200 text-base">
                  Nenhum bloco arquivado nesta pasta de ciclo
                </h4>
                <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                  Para arquivar informações de 4 em 4 meses, acesse as abas <strong>Madres</strong> ou{' '}
                  <strong>{c.outdoorTab}</strong> e clique no botão <strong>Arquivar</strong> (ao lado de Editar e Excluir) em qualquer bloco.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ARQUIVAR BLOCO EM PASTA DE CICLO (4 EM 4 MESES) */}
      {archiveTarget && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setArchiveTarget(null)}
        >
          <div
            className="bg-slate-900 border border-emerald-600/80 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl my-8 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between font-bold text-sm">
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-amber-300" />
                <span>Arquivar na Pasta Organizadora de Ciclos</span>
              </div>
              <button
                type="button"
                onClick={() => setArchiveTarget(null)}
                className="p-1 hover:bg-emerald-700 rounded-lg text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form noValidate onSubmit={handleConfirmArchive} className="p-5 space-y-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">
                  {archiveTarget.type === 'madre' ? 'Bloco de Genética Madre' : 'Bloco de Cultivo Área Externa'}
                </span>
                <div className="font-bold text-sm text-slate-100">
                  {archiveTarget.type === 'madre'
                    ? archiveTarget.item.genetica
                    : archiveTarget.item.nomeCanteiro}
                </div>
                <p className="text-[11px] text-slate-400">
                  O bloco sairá da listagem ativa e ficará guardado na pasta de ciclo escolhida para consulta sempre que precisar.
                </p>
              </div>

              {/* Choose Existing Folder OR Create New 4-Month Folder */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-200">
                    Escolha a Pasta de Ciclo (4 em 4 Meses)
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCreatingInlineFolder((prev) => !prev)}
                    className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>{isCreatingInlineFolder ? 'Selecionar pasta existente' : '+ Nova pasta de 4 meses'}</span>
                  </button>
                </div>

                {!isCreatingInlineFolder ? (
                  <select
                    value={selectedArchiveFolderId}
                    onChange={(e) => setSelectedArchiveFolderId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    {cycleFolders.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({formatDateBr(f.startDate)} a {formatDateBr(f.endDate)})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-slate-950 p-3 rounded-xl border border-amber-700/60 space-y-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Nome da Nova Pasta de Ciclo
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 1º Ciclo 2027 (Jan – Abr)"
                        value={inlineFolderName}
                        onChange={(e) => setInlineFolderName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Início do Ciclo</label>
                        <input
                          type="date"
                          value={inlineFolderStart}
                          onChange={(e) => {
                            const val = e.target.value;
                            setInlineFolderStart(val);
                            setInlineFolderEnd(calculateFourMonthsEnd(val));
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Fim (+4 Meses)</label>
                        <input
                          type="date"
                          value={inlineFolderEnd}
                          onChange={(e) => setInlineFolderEnd(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Notas de Fechamento do Ciclo (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Rendimento final, total de clones colhidos, vigor no quadrimestre..."
                  value={archiveNotesInput}
                  onChange={(e) => setArchiveNotesInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setArchiveTarget(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition"
                >
                  {c.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow flex items-center gap-1.5 transition"
                >
                  <Archive className="w-4 h-4" />
                  <span>Confirmar Arquivamento</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CRIAR / EDITAR PASTA DE CICLO (4 MESES) */}
      {isFolderModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsFolderModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-amber-500/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl my-8 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-amber-500 text-slate-950 flex items-center justify-between font-bold text-sm">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5" />
                <span>{editingFolder ? 'Editar Pasta de Ciclo' : 'Nova Pasta de Ciclo (4 Meses)'}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsFolderModalOpen(false)}
                className="p-1 hover:bg-amber-400 rounded-lg text-slate-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form noValidate onSubmit={handleSaveFolderSubmit} className="p-5 space-y-4 text-xs">
              {folderFormError && (
                <div className="p-2.5 bg-red-950/80 border border-red-700 text-red-200 rounded-xl text-[11px] font-semibold">
                  {folderFormError}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-bold mb-1">Nome da Pasta de Ciclo *</label>
                <input
                  type="text"
                  placeholder="Ex: 1º Ciclo 2027 (Jan – Abr)"
                  value={folderNameInput}
                  onChange={(e) => {
                    setFolderNameInput(e.target.value);
                    if (folderFormError) setFolderFormError(null);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Data de Início</label>
                  <input
                    type="date"
                    value={folderStartInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFolderStartInput(val);
                      setFolderEndInput(calculateFourMonthsEnd(val));
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Término (4 Meses)</label>
                  <input
                    type="date"
                    value={folderEndInput}
                    onChange={(e) => setFolderEndInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Observações da Pasta (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Ciclo de primavera/verão focado em matrizes ricas em CBD..."
                  value={folderNotesInput}
                  onChange={(e) => setFolderNotesInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition"
                >
                  {c.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow transition"
                >
                  {editingFolder ? 'Salvar Pasta' : 'Criar Pasta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRMAÇÃO DE EXCLUSÃO */}
      {deleteConfirmTarget && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDeleteConfirmTarget(null)}
        >
          <div
            className="bg-slate-900 border border-red-700/80 rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-2xl text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-950 text-red-400 rounded-xl border border-red-800 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100">Confirmar Exclusão</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Deseja realmente excluir <strong>{deleteConfirmTarget.name}</strong>? Caso queira apenas guardar para consulta futura, cancele e utilize o botão <strong>Arquivar</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setDeleteConfirmTarget(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition"
              >
                {c.cancel}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow transition"
              >
                {c.delete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CADASTRO / EDIÇÃO DE MADRE (Foto via Link 100% Opcional) */}
      {isMadreModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleCloseMadreModal}
        >
          <div
            className="bg-slate-900 border border-emerald-600/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between font-bold text-sm">
              <div className="flex items-center gap-2">
                <Dna className="w-5 h-5 text-emerald-300" />
                <span>
                  {editingMadre
                    ? `Editar Genética Madre: ${editingMadre.genetica}`
                    : 'Cadastrar Nova Genética Madre (Casa de Vegetação)'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseMadreModal}
                className="p-1 hover:bg-emerald-700 rounded-lg text-white"
                title="Fechar sem salvar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form (noValidate prevents native HTML5 validation popups from ever trapping user) */}
            <form noValidate onSubmit={handleSaveMadreSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              {madreFormError && (
                <div className="p-3 bg-red-950/80 border border-red-700 text-red-200 rounded-xl font-semibold">
                  {madreFormError}
                </div>
              )}

              {/* Optional Photo Link Section in Modal */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-slate-200 font-bold text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImagePlus className="w-4 h-4 text-emerald-400" />
                    <span>Adicionar Nova Foto por Link (Opcional)</span>
                  </span>
                  <span className="text-[10px] font-normal text-slate-400">
                    Não obrigatório para editar ou fechar
                  </span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Opcional: cole URL da foto (Google Drive, Imgur, web)..."
                    value={madrePhotoInput}
                    onChange={(e) => setMadrePhotoInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPhotoToMadreModal();
                      }
                    }}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 placeholder-slate-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoToMadreModal}
                    className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition shrink-0"
                  >
                    {c.add}
                  </button>
                </div>

                {/* Existing Thumbnails */}
                {madreImagesList.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pt-2">
                    {madreImagesList.map((url, idx) => (
                      <div key={idx} className="relative w-14 h-18 aspect-[3/4] rounded-lg overflow-hidden border border-slate-700 shrink-0 group">
                        <SafeImage src={url} fallbackSrc={FALLBACK_MADRE_IMAGE} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setMadreImagesList((prev) => prev.filter((_, i) => i !== idx));
                          }}
                          className="absolute top-0.5 right-0.5 bg-red-950/90 text-white rounded-full p-0.5 opacity-90 hover:opacity-100 transition"
                          title="Remover esta foto"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 1 & 2: Genética e Banco */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {c.fieldGenetics}
                  </label>
                  <input
                    type="text"
                    placeholder={c.phGenetics}
                    value={genetica}
                    onChange={(e) => {
                      setGenetica(e.target.value);
                      if (madreFormError) setMadreFormError(null);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    2. Banco de Sementes / Breeder
                  </label>
                  <input
                    type="text"
                    placeholder={c.phBank}
                    value={banco}
                    onChange={(e) => setBanco(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* 3: Porcentagem de CBD/THC & Casa de Vegetação */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    3. Porcentagem de CBD/THC
                  </label>
                  <input
                    type="text"
                    placeholder={c.phThcCbd}
                    value={porcentagemThcCbd}
                    onChange={(e) => setPorcentagemThcCbd(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {c.fieldGreenhouseId}
                  </label>
                  <input
                    type="text"
                    placeholder={c.phGreenhouseId}
                    value={casaVegetacao}
                    onChange={(e) => setCasaVegetacao(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* 4 & 5: Dia de início e Último dia */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    4. Dia de Início (Entrada na Estufa)
                  </label>
                  <input
                    type="date"
                    value={diaInicio}
                    onChange={(e) => setDiaInicio(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    5. Último Dia (Término Manutenção 6-8 Meses)
                  </label>
                  <input
                    type="date"
                    value={ultimoDia}
                    onChange={(e) => setUltimoDia(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-amber-400 block mt-1">
                    {c.expectedDuration.replace('{duration}', calculateMonths(diaInicio, ultimoDia))}
                  </span>
                </div>
              </div>

              {/* 6, 8 & 9: Dificuldade, Clones e Saúde */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    6. Dificuldade em Cultivar
                  </label>
                  <select
                    value={dificuldadeCultivo}
                    onChange={(e) => setDificuldadeCultivo(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Fácil">{term('Fácil')}</option>
                    <option value="Média">{term('Média')}</option>
                    <option value="Difícil">{term('Difícil')}</option>
                    <option value="Especialista">{term('Especialista')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    8. Clones por Temporada
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={clonesPorTemporada}
                    onChange={(e) => setClonesPorTemporada(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    9. Saúde dos Clones
                  </label>
                  <select
                    value={saudeClones}
                    onChange={(e) => setSaudeClones(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Excelente">{term('Excelente')}</option>
                    <option value="Boa">{term('Boa')}</option>
                    <option value="Regular">{term('Regular')}</option>
                    <option value="Atenção">{term('Atenção')}</option>
                  </select>
                </div>
              </div>

              {/* 10: Enraizamento */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  10. Taxa & Tempo de Enraizamento
                </label>
                <input
                  type="text"
                  placeholder={c.phRooting}
                  value={enraizamento}
                  onChange={(e) => setEnraizamento(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* 7: Ataque de pragas */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  7. Ataque de Pragas (Suscetibilidade & Pragas Recorrentes)
                </label>
                <textarea
                  rows={2}
                  placeholder={c.phPests}
                  value={ataquePragas}
                  onChange={(e) => setAtaquePragas(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Observações adicionais */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {c.fieldNotes}
                </label>
                <textarea
                  rows={2}
                  placeholder={c.phNotes}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseMadreModal}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
                >
                  Fechar / Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg transition flex items-center gap-1.5"
                >
                  <span>{editingMadre ? 'Salvar Alterações' : 'Salvar Genética Madre'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CADASTRO / EDIÇÃO DE CULTIVO ÁREA EXTERNA (Foto via Link 100% Opcional) */}
      {isOutdoorModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleCloseOutdoorModal}
        >
          <div
            className="bg-slate-900 border border-amber-600/80 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-8 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-amber-600 text-slate-950 flex items-center justify-between font-bold text-sm">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-slate-950" />
                <span>
                  {editingOutdoor
                    ? `Editar Canteiro: ${editingOutdoor.nomeCanteiro}`
                    : t('cult.newPlot')}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseOutdoorModal}
                className="p-1 hover:bg-amber-500 rounded-lg text-slate-950"
                title="Fechar sem salvar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form (noValidate prevents native HTML5 validation popups from ever trapping user) */}
            <form noValidate onSubmit={handleSaveOutdoorSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              {outdoorFormError && (
                <div className="p-3 bg-red-950/80 border border-red-700 text-red-200 rounded-xl font-semibold">
                  {outdoorFormError}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t('cult.ambCasa')} / {t('cult.ambExterna')}
                </label>
                <select
                  value={outdoorForm.ambiente ?? 'area_externa'}
                  onChange={(e) => setOutdoorForm((prev) => ({ ...prev, ambiente: e.target.value as OutdoorAmbiente }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="casa_vegetacao">{t('cult.ambCasa')}</option>
                  <option value="area_externa">{t('cult.ambExterna')}</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{t('cult.fase')}</label>
                  <select
                    value={outdoorForm.fase ?? 'vegetativo'}
                    onChange={(e) => setOutdoorForm((prev) => ({ ...prev, fase: e.target.value as 'vegetativo' | 'floracao', rendimento: e.target.value === 'vegetativo' ? '' : prev.rendimento }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="vegetativo">{t('cult.setorVegetativo')}</option>
                    <option value="floracao">{t('cult.setorFloracao')}</option>
                  </select>
                </div>
                {(outdoorForm.fase ?? 'vegetativo') === 'floracao' && (
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">{t('cult.rendimento')}</label>
                    <input
                      type="text"
                      value={outdoorForm.rendimento || ''}
                      onChange={(e) => setOutdoorForm((prev) => ({ ...prev, rendimento: e.target.value }))}
                      placeholder="Ex: 120 g/planta"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Optional Photo Link Section in Modal */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-amber-300 font-bold text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>Adicionar Nova Foto por Link (Opcional)</span>
                  </span>
                  <span className="text-[10px] font-normal text-slate-400">
                    Não obrigatório para editar ou fechar
                  </span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Opcional: cole URL da foto (Google Drive, Imgur, web)..."
                    value={outdoorPhotoInput}
                    onChange={(e) => setOutdoorPhotoInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPhotoToOutdoorModal();
                      }
                    }}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-amber-500 placeholder-slate-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoToOutdoorModal}
                    className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition shrink-0"
                  >
                    {c.add}
                  </button>
                </div>

                {/* Existing Thumbnails */}
                {outdoorForm.images && outdoorForm.images.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pt-2">
                    {outdoorForm.images.map((url, idx) => (
                      <div key={idx} className="relative w-14 h-18 aspect-[3/4] rounded-lg overflow-hidden border border-slate-700 shrink-0 group">
                        <SafeImage src={url} fallbackSrc={FALLBACK_OUTDOOR_IMAGE} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setOutdoorForm((prev) => ({
                              ...prev,
                              images: (prev.images || []).filter((_, i) => i !== idx),
                            }));
                          }}
                          className="absolute top-0.5 right-0.5 bg-red-950/90 text-white rounded-full p-0.5 opacity-90 hover:opacity-100 transition"
                          title="Remover esta foto"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Fields for Outdoor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {c.fieldPlotName}
                  </label>
                  <input
                    type="text"
                    placeholder={c.phPlotName}
                    value={outdoorForm.nomeCanteiro || ''}
                    onChange={(e) => {
                      setOutdoorForm((prev) => ({ ...prev, nomeCanteiro: e.target.value }));
                      if (outdoorFormError) setOutdoorFormError(null);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Genética / Cultivar Principal
                  </label>
                  <input
                    type="text"
                    placeholder={c.phCultivar}
                    value={outdoorForm.genetica || ''}
                    onChange={(e) => setOutdoorForm((prev) => ({ ...prev, genetica: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Quantidade de Plantas
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={outdoorForm.quantidadePlantas ?? ''}
                    onChange={(e) => setOutdoorForm((prev) => ({ ...prev, quantidadePlantas: Number(e.target.value) }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Fotoperíodo Natural
                  </label>
                  <input
                    type="text"
                    placeholder={c.phPhotoperiod}
                    value={outdoorForm.faseFotoperiodo || ''}
                    onChange={(e) => setOutdoorForm((prev) => ({ ...prev, faseFotoperiodo: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Data do Plantio
                  </label>
                  <input
                    type="date"
                    value={outdoorForm.dataPlantio || ''}
                    onChange={(e) => setOutdoorForm((prev) => ({ ...prev, dataPlantio: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Previsão de Colheita
                  </label>
                  <input
                    type="date"
                    value={outdoorForm.previsaoColheita || ''}
                    onChange={(e) => setOutdoorForm((prev) => ({ ...prev, previsaoColheita: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Substrato / Solo Vivo
                </label>
                <input
                  type="text"
                  placeholder={c.phSubstrate}
                  value={outdoorForm.tipoSubstrato || ''}
                  onChange={(e) => setOutdoorForm((prev) => ({ ...prev, tipoSubstrato: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Proteção Climática / Estrutura
                </label>
                <input
                  type="text"
                  placeholder={c.phProtection}
                  value={outdoorForm.protecaoClimatica || ''}
                  onChange={(e) => setOutdoorForm((prev) => ({ ...prev, protecaoClimatica: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {c.fieldPlotNotes}
                </label>
                <textarea
                  rows={2}
                  placeholder={c.phPlotNotes}
                  value={outdoorForm.observacoes || ''}
                  onChange={(e) => setOutdoorForm((prev) => ({ ...prev, observacoes: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseOutdoorModal}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
                >
                  Fechar / Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition"
                >
                  {editingOutdoor ? 'Salvar Alterações' : 'Salvar Canteiro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULLSCREEN IMAGE ZOOM MODAL */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between px-3 py-2 border-b border-slate-800 text-slate-100">
              <span className="font-bold text-xs flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                {zoomedImage.title}
              </span>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 flex-1 flex items-center justify-center overflow-auto max-h-[80vh]">
              <SafeImage
                src={zoomedImage.url}
                fallbackSrc={FALLBACK_MADRE_IMAGE}
                alt={zoomedImage.title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
