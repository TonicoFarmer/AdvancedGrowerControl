import { getIdbItem, removeIdbItem, setIdbItem } from './idbStorage';

export const COLLECTION_KEYS = [
  'astraya_deficiencies_v6',
  'astraya_pests_v5',
  'astraya_bioinputs_v5',
  'astraya_documents_v5',
  'astraya_events',
  'astraya_mip_logs',
  'astraya_madres_v1',
  'astraya_indoor_batches_v1',
  'astraya_outdoor_plots_v1',
  'astraya_cycle_folders_v1',
] as const;

export type CollectionKey = (typeof COLLECTION_KEYS)[number];
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'operator' | 'reader';
}

export interface PublishedCollection {
  value: unknown;
  publishedAt: string;
  publishedBy: string | null;
}

export type PublishedCollections = Partial<Record<CollectionKey, PublishedCollection>>;

const IDB_KEYS: CollectionKey[] = [
  'astraya_deficiencies_v6',
  'astraya_pests_v5',
  'astraya_madres_v1',
  'astraya_outdoor_plots_v1',
  'astraya_cycle_folders_v1',
];
const OWNER_KEY = 'astraya_db_owner_id';
const pendingSaves = new Map<CollectionKey, Promise<void>>();

async function readLegacyCollections(): Promise<Partial<Record<CollectionKey, unknown>>> {
  const legacy: Partial<Record<CollectionKey, unknown>> = {};
  for (const key of COLLECTION_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      try {
        legacy[key] = JSON.parse(raw);
      } catch {
        // Uma entrada local corrompida não impede a recuperação das demais coleções.
      }
    }
  }
  for (const key of IDB_KEYS) {
    const value = await getIdbItem<unknown>(key);
    if (value !== null && value !== undefined) legacy[key] = value;
  }
  return legacy;
}

async function cacheCollections(collections: Partial<Record<CollectionKey, unknown>>): Promise<void> {
  for (const key of COLLECTION_KEYS) {
    const value = collections[key];
    if (value === undefined) {
      localStorage.removeItem(key);
      if (IDB_KEYS.includes(key)) await removeIdbItem(key);
      continue;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Cache local cheio para ${key}; os dados permanecem no PostgreSQL/IndexedDB.`, error);
    }
    if (IDB_KEYS.includes(key)) await setIdbItem(key, value);
  }
}

export async function hydrateUserCollections(authenticatedUserId: string, dataOwnerId = authenticatedUserId): Promise<void> {
  const targetQuery = dataOwnerId === authenticatedUserId ? '' : `?userId=${encodeURIComponent(dataOwnerId)}`;
  const response = await fetch(`/api/data${targetQuery}`, { credentials: 'same-origin' });
  if (!response.ok) throw new Error(response.status === 401 ? 'Sua sessão expirou. Entre novamente.' : 'Não foi possível carregar seus dados do banco.');
  const result = await response.json() as {
    collections?: Partial<Record<CollectionKey, unknown>>;
    isEmpty?: boolean;
  };
  let remote = result.collections || {};
  const ownerId = localStorage.getItem(OWNER_KEY);

  if (result.isEmpty && dataOwnerId === authenticatedUserId && (!ownerId || ownerId === dataOwnerId)) {
    const legacy = await readLegacyCollections();
    if (Object.keys(legacy).length > 0) {
      const importResponse = await fetch('/api/data/import', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collections: legacy }),
      });
      if (!importResponse.ok) {
        const data = await importResponse.json().catch(() => ({}));
        throw new Error(data.error || 'Não foi possível importar os dados locais. A cópia deste navegador foi mantida.');
      }
      const refreshed = await fetch(`/api/data${targetQuery}`, { credentials: 'same-origin' });
      if (!refreshed.ok) throw new Error('Não foi possível confirmar a importação dos dados. Tente novamente.');
      const refreshedData = await refreshed.json() as { collections?: Partial<Record<CollectionKey, unknown>> };
      remote = refreshedData.collections || {};
    }
  }

  await cacheCollections(remote);
  localStorage.setItem(OWNER_KEY, dataOwnerId);
}

export async function getPublishedCollections(): Promise<PublishedCollections> {
  const response = await fetch('/api/published-content', { credentials: 'same-origin' });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Não foi possível carregar o conteúdo publicado.');
  return (data.collections || {}) as PublishedCollections;
}

export async function publishCollections(
  collections: Partial<Record<CollectionKey, unknown>>,
): Promise<PublishedCollections> {
  const response = await fetch('/api/admin/published-content', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collections }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Não foi possível publicar o conteúdo.');
  return (data.collections || {}) as PublishedCollections;
}

export function putUserCollection(key: CollectionKey, value: unknown, authenticatedUserId: string, dataOwnerId = authenticatedUserId): Promise<void> {
  const previous = pendingSaves.get(key) || Promise.resolve();
  const next = previous.catch(() => undefined).then(async () => {
    const targetQuery = dataOwnerId === authenticatedUserId ? '' : `?userId=${encodeURIComponent(dataOwnerId)}`;
    const response = await fetch(`/api/data/${encodeURIComponent(key)}${targetQuery}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || `Falha ao salvar ${key} (${response.status}).`);
    }
  });
  pendingSaves.set(key, next);
  void next.finally(() => {
    if (pendingSaves.get(key) === next) pendingSaves.delete(key);
  }).catch(() => undefined);
  return next;
}

export async function authenticate(mode: 'login' | 'register', payload: { email: string; password: string; name?: string }): Promise<AuthUser> {
  const response = await fetch(`/api/auth/${mode === 'login' ? 'login' : 'register'}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.user) throw new Error(data.error || 'Não foi possível autenticar.');
  return data.user as AuthUser;
}

export async function logout(): Promise<void> {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  });
  if (!response.ok && response.status !== 204) throw new Error('Não foi possível encerrar a sessão.');
}
