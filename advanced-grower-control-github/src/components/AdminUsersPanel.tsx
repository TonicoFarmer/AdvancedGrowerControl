import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Eye, KeyRound, Loader2, Plus, RefreshCw, Shield, Trash2, UserPlus, Users, X } from 'lucide-react';

export type ManagedRole = 'admin' | 'operator' | 'reader';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: ManagedRole;
  is_active: boolean;
  created_at: string;
  is_bootstrap_admin?: boolean;
}

interface AdminUsersPanelProps {
  onClose: () => void;
  onOpenWorkspace: (user: ManagedUser) => Promise<void>;
  adminUserId: string;
  activeWorkspaceUserId: string;
}

const roleLabel: Record<ManagedRole, string> = {
  admin: 'Administrador',
  operator: 'Operador',
  reader: 'Leitor',
};

async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Falha na solicitação (${response.status}).`);
  return data as T;
}

export function AdminUsersPanel({ onClose, onOpenWorkspace, adminUserId, activeWorkspaceUserId }: AdminUsersPanelProps) {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<ManagedRole>('reader');
  const [resetFor, setResetFor] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [openingUserId, setOpeningUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiRequest<{ users: ManagedUser[] }>('/api/admin/users');
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar os usuários.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const createUser = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await apiRequest('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role }),
      });
      setName('');
      setEmail('');
      setPassword('');
      setRole('reader');
      setNotice('Conta criada. As credenciais devem ser entregues ao usuário com segurança.');
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar a conta.');
    } finally {
      setBusy(false);
    }
  };

  const updateUser = async (user: ManagedUser, patch: Partial<Pick<ManagedUser, 'role' | 'is_active'>>) => {
    setError('');
    setNotice('');
    try {
      await apiRequest(`/api/admin/users/${encodeURIComponent(user.id)}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      });
      setNotice(`Permissões de ${user.name} atualizadas.`);
      await loadUsers();
    } catch (err) {
      await loadUsers();
      setError(err instanceof Error ? err.message : 'Não foi possível atualizar a conta.');
    }
  };

  const resetPassword = async (event: FormEvent, user: ManagedUser) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await apiRequest(`/api/admin/users/${encodeURIComponent(user.id)}/password`, {
        method: 'POST',
        body: JSON.stringify({ password: newPassword }),
      });
      setNewPassword('');
      setResetFor(null);
      setNotice(`Senha redefinida para ${user.name}. As sessões anteriores foram encerradas.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível redefinir a senha.');
    } finally {
      setBusy(false);
    }
  };

  const deleteUser = async (user: ManagedUser) => {
    if (user.id === adminUserId || user.id === activeWorkspaceUserId || user.is_bootstrap_admin) return;
    const confirmed = window.confirm(
      `Excluir permanentemente a conta de ${user.name} (${user.email})?\n\n` +
      'Os dados privados da conta e todas as sessões serão removidos. Esta ação não pode ser desfeita. ' +
      'Conteúdos já publicados continuarão disponíveis, sem associação à conta excluída.',
    );
    if (!confirmed) return;

    setBusy(true);
    setDeletingUserId(user.id);
    setError('');
    setNotice('');
    try {
      await apiRequest(`/api/admin/users/${encodeURIComponent(user.id)}`, { method: 'DELETE' });
      if (resetFor === user.id) {
        setResetFor(null);
        setNewPassword('');
      }
      setNotice(`A conta de ${user.name} e seus dados privados foram excluídos.`);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível excluir a conta.');
    } finally {
      setBusy(false);
      setDeletingUserId(null);
    }
  };

  const openWorkspace = async (user: ManagedUser) => {
    setOpeningUserId(user.id);
    setError('');
    try {
      await onOpenWorkspace(user);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível abrir os dados desta conta.');
    } finally {
      setOpeningUserId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-2 sm:p-5" role="dialog" aria-modal="true" aria-labelledby="admin-users-title">
      <section className="flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-emerald-700 bg-slate-950 text-slate-100 shadow-2xl">
        <header className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-900 p-2 text-emerald-300"><Users className="h-5 w-5" /></div>
            <div>
              <h2 id="admin-users-title" className="font-bold text-emerald-100">Painel administrativo</h2>
              <p className="text-xs text-slate-400">Contas, perfis de acesso e dados por usuário</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => void loadUsers()} disabled={loading} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800 disabled:opacity-50" title="Atualizar lista"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /></button>
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800" aria-label="Fechar painel"><X className="h-4 w-4" /></button>
          </div>
        </header>

        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="mb-5 rounded-xl border border-amber-800/70 bg-amber-950/30 p-3 text-xs leading-relaxed text-amber-100">
            Administradores podem abrir e editar os dados de qualquer conta. Operadores alteram somente os próprios dados; leitores têm acesso somente para consulta. Desativar bloqueia o acesso, encerra sessões e preserva os dados. Excluir remove permanentemente os dados privados; o painel pede confirmação antes de concluir.
          </div>

          {error && <p role="alert" className="mb-4 rounded-xl border border-red-800 bg-red-950/50 px-3 py-2 text-sm text-red-200">{error}</p>}
          {notice && <p role="status" className="mb-4 rounded-xl border border-emerald-800 bg-emerald-950/50 px-3 py-2 text-sm text-emerald-200">{notice}</p>}

          <form onSubmit={createUser} className="mb-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-200"><UserPlus className="h-4 w-4" /> Criar conta</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
              <label className="text-xs text-slate-300">Nome
                <input required maxLength={120} value={name} onChange={(event) => setName(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500" />
              </label>
              <label className="text-xs text-slate-300">E-mail / usuário
                <input required type="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500" />
              </label>
              <label className="text-xs text-slate-300">Senha inicial
                <input required type="password" minLength={12} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500" />
              </label>
              <label className="text-xs text-slate-300">Perfil
                <select value={role} onChange={(event) => setRole(event.target.value as ManagedRole)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500">
                  <option value="operator">Operador</option><option value="reader">Leitor</option><option value="admin">Administrador</option>
                </select>
              </label>
              <div className="flex items-end"><button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-60"><Plus className="h-4 w-4" /> Criar conta</button></div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">Senha mínima de 12 caracteres. O cadastro público continua criando leitores por padrão.</p>
          </form>

          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-100">Usuários ({users.length})</h3>
            {loading && <span className="flex items-center gap-2 text-xs text-slate-400"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Carregando…</span>}
          </div>

          <div className="space-y-3">
            {users.map((managedUser) => (
              <article key={managedUser.id} className={`rounded-xl border p-3 sm:p-4 ${managedUser.is_active ? 'border-slate-800 bg-slate-900/70' : 'border-red-950 bg-red-950/20 opacity-80'}`}>
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {managedUser.role === 'admin' && <Shield className="h-4 w-4 text-amber-300" />}
                      <span className="font-semibold text-slate-100">{managedUser.name}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${managedUser.is_active ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'}`}>{managedUser.is_active ? 'ATIVO' : 'DESATIVADO'}</span>
                    </div>
                    <p className="mt-1 break-all text-xs text-slate-400">{managedUser.email}</p>
                    <p className="mt-1 text-[10px] text-slate-500">Criado: {managedUser.created_at ? new Date(managedUser.created_at).toLocaleDateString('pt-BR') : '—'}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="text-[10px] text-slate-400">Perfil
                      <select value={managedUser.role} onChange={(event) => void updateUser(managedUser, { role: event.target.value as ManagedRole })} className="ml-2 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-100">
                        <option value="admin">Administrador</option><option value="operator">Operador</option><option value="reader">Leitor</option>
                      </select>
                    </label>
                    <button type="button" onClick={() => void updateUser(managedUser, { is_active: !managedUser.is_active })} className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${managedUser.is_active ? 'border-red-900 text-red-300 hover:bg-red-950/60' : 'border-emerald-800 text-emerald-300 hover:bg-emerald-950/60'}`}>{managedUser.is_active ? 'Desativar' : 'Reativar'}</button>
                    <button type="button" disabled={openingUserId === managedUser.id} onClick={() => void openWorkspace(managedUser)} className="flex items-center gap-1.5 rounded-lg border border-blue-800 px-2.5 py-1.5 text-xs font-semibold text-blue-200 hover:bg-blue-950/60 disabled:opacity-60"><Eye className="h-3.5 w-3.5" />{openingUserId === managedUser.id ? 'Abrindo…' : 'Abrir dados'}</button>
                    <button type="button" onClick={() => { setResetFor(resetFor === managedUser.id ? null : managedUser.id); setNewPassword(''); }} className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800"><KeyRound className="h-3.5 w-3.5" /> Redefinir senha</button>
                    <button type="button" disabled={busy || managedUser.id === adminUserId || managedUser.id === activeWorkspaceUserId || Boolean(managedUser.is_bootstrap_admin)} onClick={() => void deleteUser(managedUser)} title={managedUser.id === adminUserId ? 'Não é possível excluir sua própria conta.' : managedUser.id === activeWorkspaceUserId ? 'Saia do workspace desta conta antes de excluí-la.' : managedUser.is_bootstrap_admin ? 'Remova ADMIN_EMAIL e ADMIN_PASSWORD do .env e recrie o serviço antes de excluir.' : 'Excluir permanentemente esta conta e seus dados privados.'} className="flex items-center gap-1.5 rounded-lg border border-red-900 px-2.5 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-950/60 disabled:cursor-not-allowed disabled:opacity-40"><Trash2 className="h-3.5 w-3.5" />{deletingUserId === managedUser.id ? 'Excluindo…' : 'Excluir'}</button>
                  </div>
                </div>

                {resetFor === managedUser.id && (
                  <form onSubmit={(event) => void resetPassword(event, managedUser)} className="mt-3 flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950 p-3 sm:flex-row sm:items-end">
                    <label className="flex-1 text-xs text-slate-300">Nova senha inicial (mínimo 12 caracteres)
                      <input required type="password" minLength={12} maxLength={128} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100" />
                    </label>
                    <button disabled={busy} className="rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 disabled:opacity-60">Salvar nova senha</button>
                  </form>
                )}
              </article>
            ))}
            {!loading && users.length === 0 && <p className="rounded-xl border border-slate-800 p-6 text-center text-sm text-slate-400">Nenhuma conta cadastrada.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
