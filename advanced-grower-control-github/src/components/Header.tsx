import React, { useState } from 'react';
import {
  ChevronRight,
  Globe2,
  Leaf,
  LogOut,
  Moon,
  Shield,
  Sparkles,
  Sun,
  Users,
  EyeOff,
} from 'lucide-react';
import { MainCategory } from '../types';
import { LANGUAGES, useI18n } from '../i18n';

interface HeaderProps {
  isAdmin: boolean;
  role: 'admin' | 'operator' | 'reader';
  userName: string;
  userEmail: string;
  onLogout: () => void;
  onOpenAdminPanel: () => void;
  dataWorkspaceName?: string;
  onExitAdminWorkspace?: () => void;
  onOpenAiAssistant: () => void;
  onNavigateHome: () => void;
  activeCategoryName: MainCategory;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  editModeActive: boolean;
  onToggleEditMode: () => void;
}

const CATEGORY_KEYS: Record<MainCategory, string> = {
  inicio: 'header.home',
  agricultura: 'header.agriculture',
  calendario: 'header.calendar',
  meteorologia: 'header.weather',
  ferramentas: 'header.tools',
};

export const BRAND_MARK = '/images/brand/advanced-grower-logo.png';

export const Header: React.FC<HeaderProps> = ({
  isAdmin,
  role,
  userName,
  userEmail,
  onLogout,
  onOpenAdminPanel,
  dataWorkspaceName,
  onExitAdminWorkspace,
  onOpenAiAssistant,
  onNavigateHome,
  activeCategoryName,
  theme,
  onToggleTheme,
  editModeActive,
  onToggleEditMode,
}) => {
  const [logoFailed, setLogoFailed] = useState(false);
  const { lang, setLang, t } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-800/60 bg-[#062a20]/95 text-white shadow-lg shadow-emerald-950/20 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/55 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-1.5 px-3 py-2 sm:gap-2 sm:px-4 sm:py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="group flex min-w-0 shrink items-center gap-2.5 text-left"
            title={t('header.backHome')}
          >
            <div className="flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-500/30 bg-[#062a20] shadow-md shadow-black/20 transition-transform group-hover:scale-[1.03]">
              {!logoFailed ? (
                <img
                  src={BRAND_MARK}
                  alt="Advanced Grower Control"
                  className="h-10 w-auto object-contain"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <Leaf className="h-5 w-5 text-amber-200" />
              )}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
            </div>

            {logoFailed && (
              <div className="min-w-0">
                <span className="block truncate text-[15px] font-bold leading-tight sm:text-[16px] tracking-[-0.015em] text-white">
                  Advanced Grower
                </span>
                <span className="block text-[9px] font-semibold uppercase leading-none tracking-[0.28em] text-amber-200/80">
                  Control
                </span>
              </div>
            )}
          </button>

          <div className="hidden items-center gap-1.5 border-l border-white/10 pl-3 lg:flex">
            <span className="text-[10px] font-medium text-emerald-100/40">{t('header.platform')}</span>
            <ChevronRight className="h-3 w-3 text-emerald-100/25" />
            <span className="text-[10px] font-semibold text-emerald-100/80">
              {t(CATEGORY_KEYS[activeCategoryName])}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenAiAssistant}
            className="group flex items-center gap-1.5 rounded-lg border border-amber-300/20 bg-amber-300/[0.08] px-2.5 py-1.5 text-[10px] font-semibold text-amber-100 transition hover:border-amber-300/40 hover:bg-amber-300/15 active:scale-95 sm:text-[11px]"
            title={t('header.ai')}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300 transition-transform group-hover:rotate-12" />
            <span className="hidden sm:inline">{t('header.ai')}</span>
            <span className="sm:hidden">{t('header.aiShort')}</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-semibold text-emerald-100 transition hover:bg-white/[0.08] sm:text-[11px]"
            title={theme === 'light' ? t('header.themeToDark') : t('header.themeToLight')}
            aria-label={theme === 'light' ? t('header.themeToDark') : t('header.themeToLight')}
          >
            {theme === 'light' ? <Moon className="h-3.5 w-3.5 text-amber-300" /> : <Sun className="h-3.5 w-3.5 text-amber-300" />}
            <span className="hidden uppercase sm:inline">{theme === 'light' ? t('header.dark') : t('header.light')}</span>
          </button>

          <div className={`items-center gap-1.5 border-l border-white/10 pl-2 text-right leading-tight ${role === 'operator' ? 'flex' : 'hidden md:flex'}`}>
            {role === 'operator' ? (
              <button
                type="button"
                onClick={onToggleEditMode}
                aria-pressed={editModeActive}
                title={editModeActive ? 'Edição: ATIVADA — clique para desativar' : 'Edição: DESATIVADA — clique para ativar'}
                className={`rounded-lg border px-2.5 py-1.5 text-right transition ${
                  editModeActive
                    ? 'border-emerald-400/60 bg-emerald-500/20 text-white'
                    : 'border-white/10 bg-white/[0.04] text-emerald-100 hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold">
                  <span className={`h-1.5 w-1.5 rounded-full ${editModeActive ? 'bg-emerald-300' : 'bg-slate-500'}`} />
                  <span className="max-w-[120px] truncate">{userName}</span>
                </div>
                <span className="block text-[9px] uppercase tracking-wider text-emerald-100/45">
                  {t('header.roleOperator')}
                </span>
              </button>
            ) : (
              <div>
                <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-emerald-50">
                  {isAdmin && <Shield className="h-3 w-3 text-amber-300" />}
                  <span className="max-w-[120px] truncate">{userName}</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-emerald-100/45">
                  {isAdmin ? t('header.roleAdmin') : t('header.roleReader')}
                </span>
              </div>
            )}
          </div>

          {isAdmin && (
            <button
              onClick={onOpenAdminPanel}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-semibold text-emerald-100 transition hover:bg-white/[0.08]"
              title={t('header.panelTitle')}
            >
              <Users className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('header.panel')}</span>
            </button>
          )}

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-semibold text-emerald-100 transition hover:bg-white/[0.08]"
            title={t('header.logoutTitle')}
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t('header.logout')}</span>
          </button>
        </div>
      </div>

      {/* Barra de idiomas */}
      <div className="border-t border-white/[0.07] bg-[#041d16]/80">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-3 py-1 sm:px-4 sm:py-1.5">
          <span className="hidden items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-100/40 sm:flex">
            <Globe2 className="h-3 w-3" />
            {t('lang.label')}
          </span>
          <div className="flex flex-1 items-center gap-0.5 rounded-lg border border-white/10 bg-black/15 p-0.5 sm:flex-none">
            {LANGUAGES.map((option) => {
              const isActive = lang === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setLang(option.id)}
                  aria-pressed={isActive}
                  title={`${option.label}${option.primary ? ` (${t('lang.primary')})` : ''}`}
                  className={`relative flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-md px-1.5 py-1 text-[9px] font-semibold transition sm:flex-none sm:gap-1.5 sm:px-3 sm:text-[10px] ${
                    isActive
                      ? 'bg-amber-300 text-[#0b2018] shadow-sm'
                      : 'text-emerald-100/60 hover:bg-white/[0.06] hover:text-emerald-50'
                  }`}
                >
                  {option.primary && (
                    <span
                      className={`h-1 w-1 rounded-full ${isActive ? 'bg-[#0b2018]' : 'bg-amber-300/80'}`}
                      aria-hidden="true"
                    />
                  )}
                  {t(`lang.${option.id}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {isAdmin && dataWorkspaceName && (
        <div className="flex items-center justify-center gap-2 border-t border-amber-800/60 bg-amber-950/70 px-3 py-1.5 text-xs text-amber-100">
          <EyeOff className="h-3.5 w-3.5" />
          <span>{t('header.viewingWorkspace', { name: dataWorkspaceName })}</span>
          <button onClick={onExitAdminWorkspace} className="ml-1 rounded-md border border-amber-700 px-2 py-0.5 font-semibold hover:bg-amber-900">
            {t('header.backToMyData')}
          </button>
        </div>
      )}
    </header>
  );
};
