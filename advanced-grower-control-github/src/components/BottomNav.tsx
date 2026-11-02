import React from 'react';
import { CalendarDays, CloudSun, Home, Sprout, Wrench } from 'lucide-react';
import { MainCategory } from '../types';
import { useI18n } from '../i18n';

interface BottomNavProps {
  activeCategory: MainCategory;
  setActiveCategory: (cat: MainCategory) => void;
  theme?: 'dark' | 'light';
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeCategory,
  setActiveCategory,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const { t } = useI18n();

  const navItems: { id: MainCategory; label: string; icon: React.ReactNode }[] = [
    {
      id: 'inicio',
      label: t('nav.home'),
      icon: <Home className="w-[18px] h-[18px]" />,
    },
    {
      id: 'agricultura',
      label: t('nav.agriculture'),
      icon: <Sprout className="w-[18px] h-[18px]" />,
    },
    {
      id: 'calendario',
      label: t('nav.calendar'),
      icon: <CalendarDays className="w-[18px] h-[18px]" />,
    },
    {
      id: 'meteorologia',
      label: t('nav.weather'),
      icon: <CloudSun className="w-[18px] h-[18px]" />,
    },
    {
      id: 'ferramentas',
      label: t('nav.tools'),
      icon: <Wrench className="w-[18px] h-[18px]" />,
    },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 px-2 pb-[calc(0.375rem+env(safe-area-inset-bottom))] pt-1.5 shadow-2xl backdrop-blur-xl transition-colors md:bottom-5 md:left-1/2 md:right-auto md:w-[610px] md:-translate-x-1/2 md:rounded-2xl md:border md:px-1.5 md:py-1.5 ${
        isLight
          ? 'border-slate-300 bg-white/95 md:shadow-slate-900/10'
          : 'border-emerald-800/70 bg-[#041a13]/95 md:shadow-black/40'
      }`}
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-0.5 md:max-w-none">
        {navItems.map((item) => {
          const isActive = activeCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] transition-all duration-200 md:flex-row md:gap-1.5 md:px-2.5 md:py-2 md:text-[11px] ${
                isActive
                  ? isLight
                    ? 'bg-emerald-600 font-bold text-white shadow-md shadow-emerald-900/15'
                    : 'bg-emerald-700/90 font-semibold text-white shadow-md shadow-emerald-950/30'
                  : isLight
                  ? 'font-medium text-slate-600 hover:bg-slate-100 hover:text-emerald-800'
                  : 'font-medium text-emerald-100/55 hover:bg-white/[0.06] hover:text-emerald-100'
              }`}
            >
              <span className={`${isActive ? 'text-amber-200' : 'text-emerald-300/80'} transition-transform duration-200 ${isActive ? 'scale-105' : ''}`}>
                {item.icon}
              </span>
              <span className="truncate leading-none">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-[3px] left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-amber-300 md:hidden" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
