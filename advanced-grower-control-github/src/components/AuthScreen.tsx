import { FormEvent, useState } from 'react';
import { Leaf, LogIn, UserPlus } from 'lucide-react';
import { authenticate, AuthUser } from '../utils/dataSync';
import { useI18n } from '../i18n';

interface AuthScreenProps {
  onAuthenticated: (user: AuthUser) => Promise<void>;
}

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const { t } = useI18n();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const user = await authenticate(mode, { email, password, ...(mode === 'register' ? { name } : {}) });
      await onAuthenticated(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.unexpected'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <section className="w-full max-w-md rounded-3xl border border-emerald-800 bg-slate-900 shadow-2xl overflow-hidden">
        <div className="bg-[#062a20] p-7 text-center">
          <div className="mx-auto mb-3 flex items-center justify-center overflow-hidden rounded-2xl">
            <img
              src="/images/brand/advanced-grower-logo.png"
              alt="Advanced Grower Control"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="mt-2 text-sm text-emerald-100">{t('auth.platform')}</p>
        </div>
        <form onSubmit={submit} className="space-y-4 p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-semibold">{mode === 'login' ? t('auth.loginTitle') : t('auth.registerTitle')}</h2>
            <p className="mt-1 text-sm text-slate-400">{t('auth.subtitle')}</p>
            {mode === 'register' && <p className="mt-1 text-xs text-amber-300/90">{t('auth.registerNote')}</p>}
          </div>
          {mode === 'register' && (
            <label className="block text-sm text-slate-300">
              {t('auth.name')}
              <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required maxLength={120} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none focus:border-emerald-500" />
            </label>
          )}
          <label className="block text-sm text-slate-300">
            {t('auth.email')}
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required maxLength={254} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none focus:border-emerald-500" />
          </label>
          <label className="block text-sm text-slate-300">
            {t('auth.password')}
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required minLength={mode === 'register' ? 12 : 1} maxLength={128} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none focus:border-emerald-500" />
            {mode === 'register' && <span className="mt-1 block text-xs text-slate-500">{t('auth.passwordHint')}</span>}
          </label>
          {error && <p role="alert" className="rounded-xl border border-red-800 bg-red-950/60 px-3 py-2 text-sm text-red-200">{error}</p>}
          <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60">
            {mode === 'login' ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            {busy ? t('auth.wait') : mode === 'login' ? t('auth.enter') : t('auth.create')}
          </button>
          <p className="text-center text-sm text-slate-400">
            {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
            <button type="button" onClick={() => { setError(''); setMode(mode === 'login' ? 'register' : 'login'); }} className="font-semibold text-emerald-300 hover:text-emerald-200">
              {mode === 'login' ? t('auth.signUp') : t('auth.signIn')}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}
