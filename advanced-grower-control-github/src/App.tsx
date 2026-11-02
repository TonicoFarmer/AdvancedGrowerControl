import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Globe2, Loader2 } from 'lucide-react';
import { 
  MainCategory, 
  AgricultureSubMenu, 
  CalendarSubMenu, 
  WeatherSubMenu, 
  ToolsSubMenu,
  NutritionalDeficiency,
  PestPois,
  BioInput,
  DriveDocument,
  CalendarEvent,
  MipLogEntry,
  MotherGenetics,
  IndoorCropBatch,
  OutdoorCropPlot,
  CycleFolder
} from './types';

import { INITIAL_DEFICIENCIES, DRIVE_DEFICIENCIES_PDF } from './data/deficiencies';
import { INITIAL_PESTS, DRIVE_PESTS_PDF } from './data/pests';
import { INITIAL_KNF_JADAM_RECIPES } from './data/knfJadam';
import { INITIAL_BIOINPUTS } from './data/bioinputs';
import { INITIAL_DRIVE_DOCUMENTS } from './data/documents';
import { INITIAL_MADRES_GENETICS, INITIAL_INDOOR_BATCHES, INITIAL_OUTDOOR_PLOTS, INITIAL_CYCLE_FOLDERS } from './data/madres';

import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { AuthScreen } from './components/AuthScreen';
import { AdminUsersPanel, type ManagedUser } from './components/AdminUsersPanel';
import { BottomNav } from './components/BottomNav';
import { SubMenu } from './components/SubMenu';

import { DeficienciesSection } from './components/DeficienciesSection';
import { PestsSection } from './components/PestsSection';
import { KnfJadamSection } from './components/KnfJadamSection';
import { BioinputsSection } from './components/BioinputsSection';
import { SoilAnalysisSection } from './components/SoilAnalysisSection';
import { CultivoSection } from './components/CultivoSection';

import { CalendarView } from './components/CalendarView';
import { WeatherView } from './components/WeatherView';
import { ToolsView } from './components/ToolsView';

import { AiAssistantModal } from './components/AiAssistantModal';
import { AdminManagerModal } from './components/AdminManagerModal';

import { ErrorBoundary } from './components/ErrorBoundary';
import { getIdbItem, setIdbItem } from './utils/idbStorage';
import { authenticate, AuthUser, hydrateUserCollections, logout, putUserCollection, CollectionKey, getPublishedCollections, publishCollections, PublishedCollections } from './utils/dataSync';
import { useI18n } from './i18n';
import { CONTENT_BY_LANGUAGE, localizeItems } from './i18n/content';

function mergeDeficiencies(parsed: NutritionalDeficiency[]): NutritionalDeficiency[] {
  const initialMap = new Map(INITIAL_DEFICIENCIES.map((d) => [d.id, d]));
  const merged = INITIAL_DEFICIENCIES.map((initial) => {
    const found = parsed.find((p) => p.id === initial.id);
    if (!found) return initial;
    const isBundledAsset = initial.imageUrl?.startsWith('/images/');
    const mergedFigures = (found.figures && found.figures.length > 0) ? found.figures : initial.figures;
    let mergedImages: string[];
    if (isBundledAsset) {
      mergedImages = [initial.imageUrl, ...(found.images || []).filter((img) => img !== initial.imageUrl)];
    } else {
      mergedImages = (found.images && found.images.length > 0) ? found.images : (initial.images || [initial.imageUrl]);
    }
    const mergedImageUrl = isBundledAsset ? initial.imageUrl : (found.imageUrl || initial.imageUrl);
    const mergedCorrectiveMineral = (found.correctiveMineral && found.correctiveMineral.length > 0) ? found.correctiveMineral : initial.correctiveMineral;

    return {
      ...initial,
      ...found,
      imageUrl: mergedImageUrl,
      images: mergedImages,
      figures: mergedFigures,
      correctiveMineral: mergedCorrectiveMineral
    };
  });
  const custom = parsed.filter((p) => !initialMap.has(p.id));
  return [...merged, ...custom];
}

function mergePests(parsed: PestPois[]): PestPois[] {
  const initialMap = new Map(INITIAL_PESTS.map((p) => [p.id, p]));
  const merged = INITIAL_PESTS.map((initial) => {
    const found = parsed.find((p) => p.id === initial.id);
    if (!found) return initial;
    const isBundledAsset = initial.imageUrl?.startsWith('/images/');
    let mergedImages: string[];
    if (isBundledAsset) {
      mergedImages = [initial.imageUrl, ...(found.images || []).filter((img) => img !== initial.imageUrl)];
    } else {
      mergedImages = (found.images && found.images.length > 0) ? found.images : (initial.images || [initial.imageUrl]);
    }
    const mergedImageUrl = isBundledAsset ? initial.imageUrl : (found.imageUrl || initial.imageUrl);

    return {
      ...initial,
      ...found,
      imageUrl: mergedImageUrl,
      images: mergedImages,
    };
  });
  const custom = parsed.filter((p) => !initialMap.has(p.id));
  return [...merged, ...custom];
}

function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (!item || !item.id) continue;
    if (!seen.has(item.id)) {
      seen.add(item.id);
      result.push(item);
    }
  }
  return result;
}

function publishedView<T extends { id: string }>(
  localItems: T[],
  published: PublishedCollections,
  key: CollectionKey,
  bundledItems: T[],
  isAdminContext: boolean,
): T[] {
  const entry = published[key];
  if (!entry || !Array.isArray(entry.value) || isAdminContext) return localItems;

  const publicItems = entry.value as T[];
  const publicIds = new Set(publicItems.map((item) => item?.id).filter(Boolean));
  const bundledIds = new Set(bundledItems.map((item) => item.id));
  const personalItems = localItems.filter((item) =>
    item?.id && !publicIds.has(item.id) && !bundledIds.has(item.id),
  );
  return dedupeById([...publicItems, ...personalItems]);
}

function normalizeMadres(parsed: MotherGenetics[]): MotherGenetics[] {
  const deduped = dedupeById(parsed);
  return deduped.map((item) => {
    const fallbackImg = '/images/cultivo/mother_plant.jpg';
    const images = (item.images && item.images.length > 0)
      ? item.images.filter(Boolean)
      : [item.imageUrl || fallbackImg];
    return {
      ...item,
      imageUrl: images[0] || fallbackImg,
      images,
    };
  });
}

function normalizeOutdoorPlots(parsed: OutdoorCropPlot[]): OutdoorCropPlot[] {
  const deduped = dedupeById(parsed);
  return deduped.map((item) => {
    const fallbackImg = '/images/cultivo/outdoor_crop.jpg';
    const images = (item.images && item.images.length > 0)
      ? item.images.filter(Boolean)
      : [item.imageUrl || fallbackImg];
    return {
      ...item,
      imageUrl: images[0] || fallbackImg,
      images,
    };
  });
}

function AgronomyApp({ user, dataOwnerId, dataWorkspaceName, publishedCollections, onPublished, onLogout, onOpenUserWorkspace, onExitAdminWorkspace }: {
  user: AuthUser;
  dataOwnerId: string;
  dataWorkspaceName?: string;
  publishedCollections: PublishedCollections;
  onPublished: (collections: PublishedCollections) => void;
  onLogout: () => void;
  onOpenUserWorkspace: (managedUser: ManagedUser) => Promise<void>;
  onExitAdminWorkspace: () => void;
}) {
  const { t, lang } = useI18n();
  // Navigation State
  const [activeCategory, setActiveCategory] = useState<MainCategory>('inicio');
  const [agriSub, setAgriSub] = useState<AgricultureSubMenu>('deficiencias');
  const [calSub, setCalSub] = useState<CalendarSubMenu>('manutencao');
  const [weatSub, setWeatSub] = useState<WeatherSubMenu>('estacao_inmet');
  const [toolSub, setToolSub] = useState<ToolsSubMenu>('substrato');

  /** Navegação central: mantém a lógica de estado (sem router) e sincroniza a sub-aba. */
  const handleNavigate = (category: MainCategory, sub?: string) => {
    setActiveCategory(category);
    if (category === 'agricultura' && sub) setAgriSub(sub as AgricultureSubMenu);
    if (category === 'calendario' && sub) setCalSub(sub as CalendarSubMenu);
    if (category === 'meteorologia' && sub) setWeatSub(sub as WeatherSubMenu);
    if (category === 'ferramentas' && sub) setToolSub(sub as ToolsSubMenu);
  };

  // The role comes from the authenticated server session; it is never client-selected.
  const isAdmin = user.role === 'admin';
  const isAdminOwnWorkspace = isAdmin && dataOwnerId === user.id;
  const canWrite = isAdmin || (user.role === 'operator' && dataOwnerId === user.id);

  // Operador liga/desliga manualmente a edição dos blocos de Cultivo Outdoor/Indoor.
  const [operatorEditMode, setOperatorEditMode] = useState(false);
  const canEditBlocks = isAdmin || (user.role === 'operator' && dataOwnerId === user.id && operatorEditMode);

  const [syncError, setSyncError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publicationMessage, setPublicationMessage] = useState<string | null>(null);
  const persistCollection = useCallback((key: CollectionKey, value: unknown) => {
    if (!canWrite) return;
    void putUserCollection(key, value, user.id, dataOwnerId)
      .then(() => setSyncError(null))
      .catch((error) => {
        console.error(`Erro ao sincronizar ${key}:`, error);
        setSyncError(t('sync.error'));
      });
  }, [canWrite, dataOwnerId, user.id, t]);

  // Theme State (Dark / Light)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('astraya_theme') as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    localStorage.setItem('astraya_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  // Persistent Data Collections
  const [deficiencies, setDeficiencies] = useState<NutritionalDeficiency[]>(() => {
    const saved = localStorage.getItem('astraya_deficiencies_v6');
    if (saved) {
      try {
        const parsed: NutritionalDeficiency[] = JSON.parse(saved);
        return mergeDeficiencies(parsed);
      } catch (e) {
        return INITIAL_DEFICIENCIES;
      }
    }
    return INITIAL_DEFICIENCIES;
  });

  // persistent load flag to avoid overwriting IndexedDB before initial load
  const [isIdbLoaded, setIsIdbLoaded] = useState(false);

  // Load from IndexedDB (higher capacity storage) on mount
  useEffect(() => {
    getIdbItem<NutritionalDeficiency[]>('astraya_deficiencies_v6').then((idbDeficiencies) => {
      if (idbDeficiencies && Array.isArray(idbDeficiencies) && idbDeficiencies.length > 0) {
        setDeficiencies(mergeDeficiencies(idbDeficiencies));
      }
    }).catch((err) => {
      console.warn("Erro ao ler IndexedDB deficiências:", err);
    });

    getIdbItem<PestPois[]>('astraya_pests_v5').then((idbPests) => {
      if (idbPests && Array.isArray(idbPests) && idbPests.length > 0) {
        setPests(mergePests(idbPests));
      }
      setIsIdbLoaded(true);
    }).catch((err) => {
      console.warn("Erro ao ler IndexedDB pragas:", err);
      setIsIdbLoaded(true);
    });
  }, []);

  const [pests, setPests] = useState<PestPois[]>(() => {
    const saved = localStorage.getItem('astraya_pests_v5');
    if (saved) {
      try {
        const parsed: PestPois[] = JSON.parse(saved);
        return mergePests(parsed);
      } catch (e) {
        return INITIAL_PESTS;
      }
    }
    return INITIAL_PESTS;
  });

  const [recipes] = useState(INITIAL_KNF_JADAM_RECIPES);

  const [bioinputs, setBioinputs] = useState<BioInput[]>(() => {
    const saved = localStorage.getItem('astraya_bioinputs_v5');
    if (saved) {
      try {
        const parsed: BioInput[] = JSON.parse(saved);
        const initialMap = new Map(INITIAL_BIOINPUTS.map((b) => [b.id, b]));
        const merged = INITIAL_BIOINPUTS.map((initial) => {
          const found = parsed.find((b) => b.id === initial.id);
          return found ? { ...initial, ...found } : initial;
        });
        const custom = parsed.filter((b) => !initialMap.has(b.id));
        return [...merged, ...custom];
      } catch (e) {
        return INITIAL_BIOINPUTS;
      }
    }
    return INITIAL_BIOINPUTS;
  });

  const [documents, setDocuments] = useState<DriveDocument[]>(() => {
    const saved = localStorage.getItem('astraya_documents_v5');
    if (saved) {
      try {
        const parsed: DriveDocument[] = JSON.parse(saved);
        const initialMap = new Map(INITIAL_DRIVE_DOCUMENTS.map((d) => [d.id, d]));
        const merged = INITIAL_DRIVE_DOCUMENTS.map((initial) => {
          const found = parsed.find((d) => d.id === initial.id);
          return found ? { ...initial, ...found } : initial;
        });
        const custom = parsed.filter((d) => !initialMap.has(d.id));
        return [...merged, ...custom];
      } catch (e) {
        return INITIAL_DRIVE_DOCUMENTS;
      }
    }
    return INITIAL_DRIVE_DOCUMENTS;
  });

  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('astraya_events');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ev-1',
        date: new Date().toISOString().split('T')[0],
        type: 'Adubação',
        title: 'Fertirrigação com FPJ (KNF) + Cal-Mag',
        notes: 'Dosagem 1 mL/L FPJ + 1.5 mL/L Cal-Mag. Meta EC: 1.4 / pH 6.2.',
        completed: false,
        dosageOrVolume: '20 Litros no canteiro A'
      },
      {
        id: 'ev-2',
        date: new Date().toISOString().split('T')[0],
        type: 'MIP_Aplicacao',
        title: 'Pulverização Preventiva com Beauveria + JWA',
        notes: 'Aplicar ao pôr do sol ou luzes apagadas para proteger os esporos do fungo.',
        completed: true,
        dosageOrVolume: '10 Litros em pulverizador de costas'
      }
    ];
  });

  const [mipLogs, setMipLogs] = useState<MipLogEntry[]>(() => {
    const saved = localStorage.getItem('astraya_mip_logs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'mip-1',
        date: new Date().toISOString().split('T')[0],
        zone: 'Estufa A - Flora 1',
        pestObserved: 'Ácaro do Teto (Tetranychus urticae)',
        severityLevel: 2,
        actionTaken: 'Liberação de Phytoseiulus persimilis + Pulverização de Sabão Potássico JWA 10mL/L.',
        responsible: 'Agrônomo Advanced Grower'
      }
    ];
  });

  // Cultivo Collections & Persistence
  const [madresList, setMadresList] = useState<MotherGenetics[]>(() => {
    const saved = localStorage.getItem('astraya_madres_v1');
    if (saved) {
      try {
        const parsed: MotherGenetics[] = JSON.parse(saved);
        if (Array.isArray(parsed)) return normalizeMadres(parsed);
      } catch (e) {
        return INITIAL_MADRES_GENETICS;
      }
    }
    return INITIAL_MADRES_GENETICS;
  });

  const [indoorBatches, setIndoorBatches] = useState<IndoorCropBatch[]>(() => {
    const saved = localStorage.getItem('astraya_indoor_batches_v1');
    if (saved) {
      try {
        const parsed: IndoorCropBatch[] = JSON.parse(saved);
        if (Array.isArray(parsed)) return dedupeById(parsed);
      } catch (e) {
        return INITIAL_INDOOR_BATCHES;
      }
    }
    return INITIAL_INDOOR_BATCHES;
  });

  const [outdoorPlots, setOutdoorPlots] = useState<OutdoorCropPlot[]>(() => {
    const saved = localStorage.getItem('astraya_outdoor_plots_v1');
    if (saved) {
      try {
        const parsed: OutdoorCropPlot[] = JSON.parse(saved);
        if (Array.isArray(parsed)) return normalizeOutdoorPlots(parsed);
      } catch (e) {
        return INITIAL_OUTDOOR_PLOTS;
      }
    }
    return INITIAL_OUTDOOR_PLOTS;
  });

  const [cycleFolders, setCycleFolders] = useState<CycleFolder[]>(() => {
    const saved = localStorage.getItem('astraya_cycle_folders_v1');
    if (saved) {
      try {
        const parsed: CycleFolder[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return dedupeById(parsed);
      } catch (e) {
        return INITIAL_CYCLE_FOLDERS;
      }
    }
    return INITIAL_CYCLE_FOLDERS;
  });

  // Conteúdo localizado apenas para exibição: os ids e a persistência continuam intactos.
  const localizedContent = lang === 'pt' ? undefined : CONTENT_BY_LANGUAGE[lang];

  const viewDeficiencies = localizeItems(publishedView(deficiencies, publishedCollections, 'astraya_deficiencies_v6', INITIAL_DEFICIENCIES, isAdmin), localizedContent?.deficiencies);
  const viewPests = localizeItems(publishedView(pests, publishedCollections, 'astraya_pests_v5', INITIAL_PESTS, isAdmin), localizedContent?.pests);
  const viewBioinputs = localizeItems(publishedView(bioinputs, publishedCollections, 'astraya_bioinputs_v5', INITIAL_BIOINPUTS, isAdmin), localizedContent?.bioinputs);
  const viewDocuments = localizeItems(publishedView(documents, publishedCollections, 'astraya_documents_v5', INITIAL_DRIVE_DOCUMENTS, isAdmin), localizedContent?.documents);
  const viewEvents = localizeItems(publishedView(events, publishedCollections, 'astraya_events', [{ id: 'ev-1' }, { id: 'ev-2' }] as CalendarEvent[], isAdmin), localizedContent?.events);
  const viewMipLogs = localizeItems(publishedView(mipLogs, publishedCollections, 'astraya_mip_logs', [{ id: 'mip-1' }] as MipLogEntry[], isAdmin), localizedContent?.mipLogs);
  const viewMadres = localizeItems(publishedView(madresList, publishedCollections, 'astraya_madres_v1', INITIAL_MADRES_GENETICS, isAdmin), localizedContent?.madres);
  const viewOutdoorPlots = localizeItems(publishedView(outdoorPlots, publishedCollections, 'astraya_outdoor_plots_v1', INITIAL_OUTDOOR_PLOTS, isAdmin), localizedContent?.outdoor);
  const viewIndoorBatches = publishedView(indoorBatches, publishedCollections, 'astraya_indoor_batches_v1', INITIAL_INDOOR_BATCHES, isAdmin);
  const viewCycleFolders = publishedView(cycleFolders, publishedCollections, 'astraya_cycle_folders_v1', INITIAL_CYCLE_FOLDERS, isAdmin);
  const viewRecipes = localizeItems(recipes, localizedContent?.recipes);

  useEffect(() => {
    try {
      localStorage.setItem('astraya_madres_v1', JSON.stringify(madresList));
      setIdbItem('astraya_madres_v1', madresList);
      persistCollection('astraya_madres_v1', madresList);
    } catch (e) {
      console.warn("Erro ao salvar madres:", e);
    }
  }, [madresList, persistCollection]);

  useEffect(() => {
    try {
      localStorage.setItem('astraya_indoor_batches_v1', JSON.stringify(indoorBatches));
      persistCollection('astraya_indoor_batches_v1', indoorBatches);
    } catch (e) {
      console.warn("Erro ao salvar cultivo interno:", e);
    }
  }, [indoorBatches, persistCollection]);

  useEffect(() => {
    try {
      localStorage.setItem('astraya_outdoor_plots_v1', JSON.stringify(outdoorPlots));
      setIdbItem('astraya_outdoor_plots_v1', outdoorPlots);
      persistCollection('astraya_outdoor_plots_v1', outdoorPlots);
    } catch (e) {
      console.warn("Erro ao salvar cultivo externo:", e);
    }
  }, [outdoorPlots, persistCollection]);

  useEffect(() => {
    try {
      localStorage.setItem('astraya_cycle_folders_v1', JSON.stringify(cycleFolders));
      setIdbItem('astraya_cycle_folders_v1', cycleFolders);
      persistCollection('astraya_cycle_folders_v1', cycleFolders);
    } catch (e) {
      console.warn("Erro ao salvar pastas de ciclos:", e);
    }
  }, [cycleFolders, persistCollection]);

  const handleSaveMadre = (item: MotherGenetics) => {
    setMadresList((prev) => {
      const deduped = dedupeById(prev);
      const exists = deduped.some((m) => m.id === item.id);
      if (exists) return deduped.map((m) => (m.id === item.id ? item : m));
      return [item, ...deduped];
    });
  };

  const handleDeleteMadre = (id: string) => {
    setMadresList((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSaveIndoorBatch = (batch: IndoorCropBatch) => {
    setIndoorBatches((prev) => {
      const deduped = dedupeById(prev);
      const exists = deduped.some((b) => b.id === batch.id);
      if (exists) return deduped.map((b) => (b.id === batch.id ? batch : b));
      return [batch, ...deduped];
    });
  };

  const handleDeleteIndoorBatch = (id: string) => {
    setIndoorBatches((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSaveOutdoorPlot = (plot: OutdoorCropPlot) => {
    setOutdoorPlots((prev) => {
      const deduped = dedupeById(prev);
      const exists = deduped.some((p) => p.id === plot.id);
      if (exists) return deduped.map((p) => (p.id === plot.id ? plot : p));
      return [plot, ...deduped];
    });
  };

  const handleDeleteOutdoorPlot = (id: string) => {
    setOutdoorPlots((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveCycleFolder = (folder: CycleFolder) => {
    setCycleFolders((prev) => {
      const deduped = dedupeById(prev);
      const exists = deduped.some((f) => f.id === folder.id);
      if (exists) return deduped.map((f) => (f.id === folder.id ? folder : f));
      return [folder, ...deduped];
    });
  };

  const handleDeleteCycleFolder = (id: string) => {
    setCycleFolders((prev) => prev.filter((f) => f.id !== id));
  };

  // Sync to IndexedDB and localStorage safely
  useEffect(() => {
    if (!isIdbLoaded) return;
    setIdbItem('astraya_deficiencies_v6', deficiencies);
    try {
      localStorage.setItem('astraya_deficiencies_v6', JSON.stringify(deficiencies));
    } catch (e) {
      console.warn("Armazenamento local cheio para deficiências (salvo com sucesso no IndexedDB):", e);
    }
    persistCollection('astraya_deficiencies_v6', deficiencies);
  }, [deficiencies, isIdbLoaded, persistCollection]);

  useEffect(() => {
    if (!isIdbLoaded) return;
    setIdbItem('astraya_pests_v5', pests);
    try {
      localStorage.setItem('astraya_pests_v5', JSON.stringify(pests));
    } catch (e) {
      console.warn("Armazenamento local cheio para pragas (salvo no IndexedDB):", e);
    }
    persistCollection('astraya_pests_v5', pests);
  }, [pests, isIdbLoaded, persistCollection]);

  useEffect(() => {
    try {
      localStorage.setItem('astraya_bioinputs_v5', JSON.stringify(bioinputs));
    } catch (e) {
      console.warn("Armazenamento local cheio para bioinsumos:", e);
    }
    persistCollection('astraya_bioinputs_v5', bioinputs);
  }, [bioinputs, persistCollection]);

  useEffect(() => {
    try {
      localStorage.setItem('astraya_documents_v5', JSON.stringify(documents));
    } catch (e) {
      console.warn("Armazenamento local cheio para documentos:", e);
    }
    persistCollection('astraya_documents_v5', documents);
  }, [documents, persistCollection]);

  useEffect(() => {
    try {
      localStorage.setItem('astraya_events', JSON.stringify(events));
    } catch (e) {
      console.warn("Armazenamento local cheio para eventos:", e);
    }
    persistCollection('astraya_events', events);
  }, [events, persistCollection]);

  useEffect(() => {
    try {
      localStorage.setItem('astraya_mip_logs', JSON.stringify(mipLogs));
    } catch (e) {
      console.warn("Armazenamento local cheio para registros MIP:", e);
    }
    persistCollection('astraya_mip_logs', mipLogs);
  }, [mipLogs, persistCollection]);

  // Modal Control States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isUsersPanelOpen, setIsUsersPanelOpen] = useState(false);
  const [adminModeType, setAdminModeType] = useState<'deficiency' | 'pest' | 'bioinput'>('deficiency');
  const [editingItem, setEditingItem] = useState<any>(null);

  // Admin Actions
  const handleOpenEditDeficiency = (item?: NutritionalDeficiency) => {
    setAdminModeType('deficiency');
    setEditingItem(item || null);
    setIsAdminModalOpen(true);
  };

  const handleOpenEditPest = (item?: PestPois) => {
    setAdminModeType('pest');
    setEditingItem(item || null);
    setIsAdminModalOpen(true);
  };

  const handleOpenEditBioinput = (item?: BioInput) => {
    setAdminModeType('bioinput');
    setEditingItem(item || null);
    setIsAdminModalOpen(true);
  };

  const handleSaveDeficiency = (item: NutritionalDeficiency) => {
    setDeficiencies((prev) => {
      const exists = prev.some((d) => d.id === item.id);
      if (exists) return prev.map((d) => (d.id === item.id ? item : d));
      return [item, ...prev];
    });
  };

  const handleSavePest = (item: PestPois) => {
    setPests((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev.map((p) => (p.id === item.id ? item : p));
      return [item, ...prev];
    });
  };

  const handleSaveBioinput = (item: BioInput) => {
    setBioinputs((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) return prev.map((b) => (b.id === item.id ? item : b));
      return [item, ...prev];
    });
  };

  const setEventsFromView: React.Dispatch<React.SetStateAction<CalendarEvent[]>> = (action) => {
    const next = typeof action === 'function' ? action(viewEvents) : action;
    if (isAdmin) {
      setEvents(next);
      return;
    }
    const publicIds = new Set((Array.isArray(publishedCollections.astraya_events?.value)
      ? (publishedCollections.astraya_events!.value as CalendarEvent[])
      : []).map((item) => item.id));
    setEvents(next.filter((item) => !publicIds.has(item.id)));
  };

  const setMipLogsFromView: React.Dispatch<React.SetStateAction<MipLogEntry[]>> = (action) => {
    const next = typeof action === 'function' ? action(viewMipLogs) : action;
    if (isAdmin) {
      setMipLogs(next);
      return;
    }
    const publicIds = new Set((Array.isArray(publishedCollections.astraya_mip_logs?.value)
      ? (publishedCollections.astraya_mip_logs!.value as MipLogEntry[])
      : []).map((item) => item.id));
    setMipLogs(next.filter((item) => !publicIds.has(item.id)));
  };

  const setDocumentsFromView: React.Dispatch<React.SetStateAction<DriveDocument[]>> = (action) => {
    const next = typeof action === 'function' ? action(viewDocuments) : action;
    if (isAdmin) {
      setDocuments(next);
      return;
    }
    const publicIds = new Set((Array.isArray(publishedCollections.astraya_documents_v5?.value)
      ? (publishedCollections.astraya_documents_v5!.value as DriveDocument[])
      : []).map((item) => item.id));
    setDocuments(next.filter((item) => !publicIds.has(item.id)));
  };

  const activePublication = (() => {
    if (activeCategory === 'agricultura') {
      if (agriSub === 'deficiencias') return { title: t('module.deficiencies'), collections: { astraya_deficiencies_v6: deficiencies } };
      if (agriSub === 'pragas') return { title: t('module.pests'), collections: { astraya_pests_v5: pests } };
      if (agriSub === 'bioinsumos') return { title: t('module.bioinputs'), collections: { astraya_bioinputs_v5: bioinputs } };
      if (agriSub === 'cultivo') return {
        title: t('module.cultivation'),
        collections: {
          astraya_madres_v1: madresList,
          astraya_outdoor_plots_v1: outdoorPlots,
          astraya_indoor_batches_v1: indoorBatches,
          astraya_cycle_folders_v1: cycleFolders,
        },
      };
    }
    if (activeCategory === 'calendario') {
      return calSub === 'manutencao'
        ? { title: t('module.schedule'), collections: { astraya_events: events } }
        : { title: t('module.mip'), collections: { astraya_mip_logs: mipLogs } };
    }
    if (activeCategory === 'ferramentas' && toolSub === 'biblioteca_drive') {
      return { title: t('module.documents'), collections: { astraya_documents_v5: documents } };
    }
    return null;
  })();

  const publishActiveModule = async () => {
    if (!activePublication || !isAdminOwnWorkspace || isPublishing) return;
    setIsPublishing(true);
    setPublicationMessage(null);
    try {
      const updated = await publishCollections(activePublication.collections);
      onPublished(updated);
      setPublicationMessage(t('publish.success', { title: activePublication.title }));
    } catch (error) {
      setPublicationMessage(error instanceof Error ? error.message : t('publish.error'));
    } finally {
      setIsPublishing(false);
    }
  };

  const modulePublishedEntries = activePublication
    ? (Object.keys(activePublication.collections) as CollectionKey[])
      .map((key) => publishedCollections[key])
      .filter((entry) => Boolean(entry))
    : [];
  const latestModulePublication = modulePublishedEntries
    .sort((a, b) => Date.parse(b!.publishedAt) - Date.parse(a!.publishedAt))[0];
  const publishedIds = (key: CollectionKey): string[] => {
    if (isAdmin || !Array.isArray(publishedCollections[key]?.value)) return [];
    return (publishedCollections[key]!.value as { id: string }[]).map((item) => item.id).filter(Boolean);
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col font-sans pb-24 selection:bg-emerald-500 selection:text-slate-950 ${
        theme === 'light' ? 'bg-slate-50 text-slate-900 light-theme' : 'bg-slate-950 text-slate-100'
      }`}>
      {/* Top Main Banner Header */}
      <Header
        isAdmin={isAdmin}
        role={user.role}
        userName={user.name}
        userEmail={user.email}
        onLogout={onLogout}
        onOpenAdminPanel={() => setIsUsersPanelOpen(true)}
        dataWorkspaceName={dataWorkspaceName}
        onExitAdminWorkspace={onExitAdminWorkspace}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        onNavigateHome={() => handleNavigate('inicio')}
        activeCategoryName={activeCategory}
        theme={theme}
        onToggleTheme={toggleTheme}
        editModeActive={operatorEditMode}
        onToggleEditMode={() => setOperatorEditMode((v) => !v)}
      />
      {syncError && (
        <div role="alert" className="bg-red-950 px-4 py-2 text-center text-sm text-red-100">
          {syncError}
        </div>
      )}

      {/* Sub-menu Bar for Current Category */}
      {activeCategory !== 'inicio' && (
        <SubMenu
          activeCategory={activeCategory}
          agriSub={agriSub}
          setAgriSub={setAgriSub}
          calSub={calSub}
          setCalSub={setCalSub}
          weatSub={weatSub}
          setWeatSub={setWeatSub}
          toolSub={toolSub}
          setToolSub={setToolSub}
          theme={theme}
        />
      )}

      {/* Main Active View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-5 sm:space-y-6">
        {activeCategory === 'inicio' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            counts={{
              deficiencies: viewDeficiencies.length,
              pests: viewPests.length,
              recipes: recipes.length,
              bioinputs: viewBioinputs.length,
              madres: viewMadres.length,
              outdoor: viewOutdoorPlots.length,
              documents: viewDocuments.length,
            }}
            events={viewEvents}
            madres={viewMadres}
          />
        )}
        {/* Barra de publicação visível somente para administradores.
            Operadores e leitores receberão outra notificação futuramente. */}
        {isAdmin && activePublication && (
          <section className="flex flex-col gap-3 rounded-2xl border border-emerald-800/70 bg-slate-900/80 p-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Publicação do módulo">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-emerald-950 p-2 text-emerald-300"><Globe2 className="h-5 w-5" /></div>
              <div>
                <h2 className="text-sm font-bold text-emerald-100">{t('publish.eyebrow', { title: activePublication.title })}</h2>
                <p className="mt-1 text-xs text-slate-300">
                  {latestModulePublication
                    ? latestModulePublication.publishedBy
                      ? t('publish.publishedAt', {
                          author: latestModulePublication.publishedBy,
                          date: new Date(latestModulePublication.publishedAt).toLocaleString(lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'en-US'),
                        })
                      : t('publish.publishedAtNoAuthor', {
                          date: new Date(latestModulePublication.publishedAt).toLocaleString(lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : lang === 'de' ? 'de-DE' : 'en-US'),
                        })
                    : t('publish.none')}
                </p>
                {isAdmin && !isAdminOwnWorkspace && <p className="mt-1 text-[11px] text-amber-300">{t('publish.ownWorkspace')}</p>}
                {publicationMessage && <p role="status" className="mt-1 text-xs text-emerald-200">{publicationMessage}</p>}
              </div>
            </div>
            {isAdminOwnWorkspace && (
              <button
                type="button"
                onClick={() => void publishActiveModule()}
                disabled={isPublishing}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow transition hover:bg-emerald-500 disabled:cursor-wait disabled:opacity-60"
              >
                {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe2 className="h-4 w-4" />}
                {isPublishing ? t('publish.publishing') : t('publish.button')}
              </button>
            )}
          </section>
        )}

        {/* CATEGORY 1: AGRICULTURA */}
        {activeCategory === 'agricultura' && (
          <>
            {agriSub === 'deficiencias' && (
              <DeficienciesSection
                deficiencies={viewDeficiencies}
                isAdmin={isAdmin}
                onEditItem={(item) => handleOpenEditDeficiency(item)}
                onAddNew={() => handleOpenEditDeficiency()}
                pdfUrl={DRIVE_DEFICIENCIES_PDF}
                onSaveDeficiency={handleSaveDeficiency}
              />
            )}

            {agriSub === 'pragas' && (
              <PestsSection
                pests={viewPests}
                isAdmin={isAdmin}
                onEditItem={(item) => handleOpenEditPest(item)}
                onAddNew={() => handleOpenEditPest()}
                pdfUrl={DRIVE_PESTS_PDF}
                onSavePest={handleSavePest}
              />
            )}

            {agriSub === 'knf_jadam' && (
              <KnfJadamSection recipes={viewRecipes} />
            )}

            {agriSub === 'bioinsumos' && (
              <BioinputsSection
                bioinputs={viewBioinputs}
                isAdmin={isAdmin}
                onAddNew={() => handleOpenEditBioinput()}
              />
            )}

            {agriSub === 'analise_solo' && (
              <SoilAnalysisSection />
            )}

            {agriSub === 'cultivo' && (
              <CultivoSection
                madresList={viewMadres}
                outdoorPlots={viewOutdoorPlots}
                indoorBatches={viewIndoorBatches}
                cycleFolders={viewCycleFolders}
                isAdmin={canWrite}
                canEditBlocks={canEditBlocks}
                publishedMadreIds={publishedIds('astraya_madres_v1')}
                publishedOutdoorIds={publishedIds('astraya_outdoor_plots_v1')}
                publishedIndoorIds={publishedIds('astraya_indoor_batches_v1')}
                publishedCycleFolderIds={publishedIds('astraya_cycle_folders_v1')}
                onSaveMadre={handleSaveMadre}
                onDeleteMadre={handleDeleteMadre}
                onSaveOutdoorPlot={handleSaveOutdoorPlot}
                onDeleteOutdoorPlot={handleDeleteOutdoorPlot}
                onSaveIndoorBatch={handleSaveIndoorBatch}
                onDeleteIndoorBatch={handleDeleteIndoorBatch}
                onSaveCycleFolder={handleSaveCycleFolder}
                onDeleteCycleFolder={handleDeleteCycleFolder}
              />
            )}
          </>
        )}

        {/* CATEGORY 2: CALENDÁRIO */}
        {activeCategory === 'calendario' && (
          <CalendarView
            subCategory={calSub}
            events={viewEvents}
            setEvents={setEventsFromView}
            mipLogs={viewMipLogs}
            setMipLogs={setMipLogsFromView}
            canEdit={canWrite}
            publishedEventIds={publishedIds('astraya_events')}
            publishedMipLogIds={publishedIds('astraya_mip_logs')}
          />
        )}

        {/* CATEGORY 3: METEOROLOGIA */}
        {activeCategory === 'meteorologia' && (
          <WeatherView
            subCategory={weatSub}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
          />
        )}

        {/* CATEGORY 4: FERRAMENTAS */}
        {activeCategory === 'ferramentas' && (
          <ToolsView
            subCategory={toolSub}
            documents={viewDocuments}
            setDocuments={setDocumentsFromView}
            isAdmin={canWrite}
            publishedDocumentIds={publishedIds('astraya_documents_v5')}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar (Mobile & Tablet) */}
      <BottomNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        theme={theme}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Admin Item Manager Modal */}
      <AdminManagerModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        editingItem={editingItem}
        mode={adminModeType}
        onSaveDeficiency={handleSaveDeficiency}
        onSavePest={handleSavePest}
        onSaveBioInput={handleSaveBioinput}
      />
      {isAdmin && isUsersPanelOpen && (
        <AdminUsersPanel
          onClose={() => setIsUsersPanelOpen(false)}
          onOpenWorkspace={onOpenUserWorkspace}
          adminUserId={user.id}
          activeWorkspaceUserId={dataOwnerId}
        />
      )}
    </div>
    </ErrorBoundary>
  );
}

export default function App() {
  const { t } = useI18n();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [publishedCollections, setPublishedCollections] = useState<PublishedCollections>({});
  const [managedDataUser, setManagedDataUser] = useState<ManagedUser | null>(null);
  const [switchingWorkspace, setSwitchingWorkspace] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [startupError, setStartupError] = useState<string | null>(null);
  const initialSessionCheckStarted = useRef(false);

  const establishSession = useCallback(async (authenticatedUser: AuthUser) => {
    await hydrateUserCollections(authenticatedUser.id);
    const published = await getPublishedCollections();
    setPublishedCollections(published);
    setStartupError(null);
    setUser(authenticatedUser);
  }, []);

  const checkSession = useCallback(async () => {
    setCheckingSession(true);
    setStartupError(null);
    try {
      const response = await fetch('/api/auth/me', { credentials: 'same-origin' });
      if (response.status === 401) {
        setUser(null);
        return;
      }
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.user) throw new Error(result.error || 'Não foi possível verificar a sessão.');
      await establishSession(result.user as AuthUser);
    } catch (error) {
      setStartupError(error instanceof Error ? error.message : 'Falha ao conectar ao servidor.');
    } finally {
      setCheckingSession(false);
    }
  }, [establishSession]);

  useEffect(() => {
    if (initialSessionCheckStarted.current) return;
    initialSessionCheckStarted.current = true;
    void checkSession();
  }, [checkSession]);

  const handleLogout = async () => {
    try {
      await logout();
      setManagedDataUser(null);
      setUser(null);
    } catch (error) {
      console.error('Falha ao encerrar sessão:', error);
      window.alert('Não foi possível encerrar a sessão. Verifique sua conexão e tente novamente.');
    }
  };

  const openManagedWorkspace = async (managedUser: ManagedUser) => {
    if (!user || user.role !== 'admin') throw new Error('Somente um administrador pode abrir dados de outra conta.');
    setSwitchingWorkspace(true);
    try {
      await hydrateUserCollections(user.id, managedUser.id);
      setManagedDataUser(managedUser);
    } finally {
      setSwitchingWorkspace(false);
    }
  };

  const exitManagedWorkspace = async () => {
    if (!user || user.role !== 'admin') return;
    setSwitchingWorkspace(true);
    try {
      await hydrateUserCollections(user.id);
      setManagedDataUser(null);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Não foi possível retornar aos seus dados.');
    } finally {
      setSwitchingWorkspace(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <p className="text-emerald-200">{t('app.connecting')}</p>
      </main>
    );
  }
  if (startupError && !user) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <section className="max-w-md rounded-2xl border border-red-900 bg-slate-900 p-6 text-center">
          <p className="text-red-200">{startupError}</p>
          <button onClick={() => void checkSession()} className="mt-4 rounded-xl bg-emerald-700 px-4 py-2 font-semibold hover:bg-emerald-600">{t('app.retry')}</button>
        </section>
      </main>
    );
  }
  if (!user) return <AuthScreen onAuthenticated={establishSession} />;
  if (switchingWorkspace) {
    return <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6"><p className="text-emerald-200">{t('app.loadingWorkspace')}</p></main>;
  }
  const dataOwnerId = managedDataUser?.id || user.id;
  return (
    <AgronomyApp
      key={`${user.id}:${dataOwnerId}`}
      user={user}
      dataOwnerId={dataOwnerId}
      dataWorkspaceName={managedDataUser?.name}
      publishedCollections={publishedCollections}
      onPublished={(updated) => setPublishedCollections((previous) => ({ ...previous, ...updated }))}
      onLogout={() => void handleLogout()}
      onOpenUserWorkspace={openManagedWorkspace}
      onExitAdminWorkspace={() => void exitManagedWorkspace()}
    />
  );
}
