import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bug,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CloudSun,
  Dna,
  Droplets,
  FlaskConical,
  Leaf,
  Library,
  Microscope,
  Sprout,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
} from 'lucide-react';
import { CalendarEvent, MainCategory, MotherGenetics } from '../types';
import { useI18n } from '../i18n';

interface HomeViewProps {
  onNavigate: (category: MainCategory, sub?: string) => void;
  onOpenAiAssistant: () => void;
  counts: {
    deficiencies: number;
    pests: number;
    recipes: number;
    bioinputs: number;
    madres: number;
    outdoor: number;
    documents: number;
  };
  events: CalendarEvent[];
  madres: MotherGenetics[];
}

interface WeatherSnapshot {
  temperature?: number;
  humidity?: number;
  vpd?: number;
  windSpeed?: number;
  condition?: string;
  rainProbability?: number;
  sunrise?: string;
  sunset?: string;
  cityName?: string;
}

const FALLBACK_WEATHER: WeatherSnapshot = {
  temperature: 17,
  humidity: 91,
  vpd: 0.17,
  windSpeed: 14,
  condition: 'Sol entre Poucas Nuvens',
  rainProbability: 63,
  sunrise: '05:25',
  sunset: '18:20',
  cityName: 'Ibiúna - SP',
};

const WEATHER_CONDITION_KEYS: Record<string, string> = {
  'Céu Limpo / Ensolarado': 'weather.cond.0',
  'Predomínio de Sol': 'weather.cond.1',
  'Sol entre Poucas Nuvens': 'weather.cond.2',
  'Nublado / Encoberto': 'weather.cond.3',
  'Nevoeiro / Neblina Matinal': 'weather.cond.45',
  'Garoa / Chuvisco Leve': 'weather.cond.51',
  'Chuva Fraca': 'weather.cond.61',
  'Chuva Moderada Contínua': 'weather.cond.63',
  'Chuva Forte Contínua': 'weather.cond.65',
  'Pancadas de Chuva Fracas': 'weather.cond.80',
  'Pancadas de Chuva Moderadas': 'weather.cond.81',
  'Pancadas de Chuva Fortes': 'weather.cond.82',
  'Tempestade com Raios e Trovoadas': 'weather.cond.95',
  'Tempestade Severa com Granizo': 'weather.cond.96',
};

const EVENT_TYPE_KEYS: Record<string, string> = {
  Rega: 'event.rega',
  Adubação: 'event.fertilization',
  Poda: 'event.pruning',
  MIP_Aplicacao: 'event.ipm',
  Muda_Estagio: 'event.stage',
  Manutencao: 'event.maintenance',
};

const localDateKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const moduleCards = [
  {
    titleKey: 'home.module.nutrition.title',
    descriptionKey: 'home.module.nutrition.desc',
    category: 'agricultura' as MainCategory,
    sub: 'deficiencias',
    icon: Leaf,
    accent: 'emerald',
    badgeKey: 'home.module.nutrition.badge',
  },
  {
    titleKey: 'home.module.pests.title',
    descriptionKey: 'home.module.pests.desc',
    category: 'agricultura' as MainCategory,
    sub: 'pragas',
    icon: Bug,
    accent: 'amber',
    badgeKey: 'home.module.pests.badge',
  },
  {
    titleKey: 'home.module.soil.title',
    descriptionKey: 'home.module.soil.desc',
    category: 'agricultura' as MainCategory,
    sub: 'analise_solo',
    icon: FlaskConical,
    accent: 'sky',
    badgeKey: 'home.module.soil.badge',
  },
  {
    titleKey: 'home.module.cultivation.title',
    descriptionKey: 'home.module.cultivation.desc',
    category: 'agricultura' as MainCategory,
    sub: 'cultivo',
    icon: Sprout,
    accent: 'lime',
    badgeKey: 'home.module.cultivation.badge',
  },
  {
    titleKey: 'home.module.knf.title',
    descriptionKey: 'home.module.knf.desc',
    category: 'agricultura' as MainCategory,
    sub: 'knf_jadam',
    icon: Droplets,
    accent: 'cyan',
    badgeKey: 'home.module.knf.badge',
  },
  {
    titleKey: 'home.module.calendar.title',
    descriptionKey: 'home.module.calendar.desc',
    category: 'calendario' as MainCategory,
    sub: 'manutencao',
    icon: CalendarDays,
    accent: 'violet',
    badgeKey: 'home.module.calendar.badge',
  },
  {
    titleKey: 'home.module.weather.title',
    descriptionKey: 'home.module.weather.desc',
    category: 'meteorologia' as MainCategory,
    sub: 'estacao_inmet',
    icon: CloudSun,
    accent: 'blue',
    badgeKey: 'home.module.weather.badge',
  },
  {
    titleKey: 'home.module.library.title',
    descriptionKey: 'home.module.library.desc',
    category: 'ferramentas' as MainCategory,
    sub: 'biblioteca_drive',
    icon: Library,
    accent: 'rose',
    badgeKey: 'home.module.library.badge',
  },
];

const accentStyles: Record<string, { icon: string; chip: string; line: string }> = {
  emerald: {
    icon: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/20',
    chip: 'border-emerald-800/70 bg-emerald-950/70 text-emerald-300',
    line: 'group-hover:border-emerald-500/50',
  },
  amber: {
    icon: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    chip: 'border-amber-800/70 bg-amber-950/70 text-amber-300',
    line: 'group-hover:border-amber-500/50',
  },
  sky: {
    icon: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    chip: 'border-sky-800/70 bg-sky-950/70 text-sky-300',
    line: 'group-hover:border-sky-500/50',
  },
  lime: {
    icon: 'bg-lime-500/10 text-lime-300 border-lime-500/20',
    chip: 'border-lime-800/70 bg-lime-950/70 text-lime-300',
    line: 'group-hover:border-lime-500/50',
  },
  cyan: {
    icon: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    chip: 'border-cyan-800/70 bg-cyan-950/70 text-cyan-300',
    line: 'group-hover:border-cyan-500/50',
  },
  violet: {
    icon: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    chip: 'border-violet-800/70 bg-violet-950/70 text-violet-300',
    line: 'group-hover:border-violet-500/50',
  },
  blue: {
    icon: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    chip: 'border-blue-800/70 bg-blue-950/70 text-blue-300',
    line: 'group-hover:border-blue-500/50',
  },
  rose: {
    icon: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    chip: 'border-rose-800/70 bg-rose-950/70 text-rose-300',
    line: 'group-hover:border-rose-500/50',
  },
};

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenAiAssistant,
  counts,
  events,
  madres,
}) => {
  const { locale, t } = useI18n();
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/weather/inmet?city=Ibi%C3%BAna', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('Weather unavailable'))))
      .then((data) => setWeather(data))
      .catch(() => {
        if (!controller.signal.aborted) setWeather(FALLBACK_WEATHER);
      });

    return () => controller.abort();
  }, []);

  const currentWeather = weather || FALLBACK_WEATHER;
  const today = localDateKey();
  const todayEvents = useMemo(
    () => events.filter((event) => event.date === today).slice(0, 3),
    [events, today],
  );

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
      }).format(new Date()),
    [locale],
  );

  const conditionKey = currentWeather.condition ? WEATHER_CONDITION_KEYS[currentWeather.condition] : undefined;
  const condition = conditionKey ? t(conditionKey) : currentWeather.condition || t('weather.cond.2');

  const totalClones = madres.reduce((sum, madre) => sum + (madre.clonesPorTemporada || 0), 0);
  const vpd = currentWeather.vpd ?? 0.17;
  const humidity = Math.round(currentWeather.humidity ?? 0);
  const isHumidityAlert = humidity >= 80 || vpd < 0.4;

  const stats = [
    {
      value: counts.deficiencies,
      label: t('home.stats.nutrients'),
      hint: t('home.stats.nutrientsHint'),
      icon: Leaf,
    },
    { value: counts.pests, label: t('home.stats.pests'), hint: t('home.stats.pestsHint'), icon: Bug },
    {
      value: counts.bioinputs,
      label: t('home.stats.bioinputs'),
      hint: t('home.stats.bioinputsHint'),
      icon: FlaskConical,
    },
    {
      value: counts.madres,
      label: t('home.stats.madres'),
      hint: t('home.stats.clones', { count: totalClones }),
      icon: Dna,
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial hero */}
      <section className="relative overflow-hidden rounded-[28px] border border-emerald-700/50 bg-[#04130f] shadow-[0_28px_80px_-30px_rgba(0,0,0,0.85)]">
        <img
          src="/images/cultivo/outdoor_crop.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03100c] via-[#041b14]/95 to-[#06231a]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03100c] via-transparent to-[#03100c]/25" />
        <div className="hero-grid absolute inset-0 opacity-30" />

        <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:p-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,.9)]" />
                {t('home.eyebrow')}
              </span>
              <span className="hidden text-[11px] font-medium text-emerald-100/55 first-letter:uppercase sm:inline">
                {formattedDate}
              </span>
            </div>

            <h1 className="mt-5 max-w-xl font-serif text-[2.25rem] leading-[1.06] tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.35rem]">
              {t('home.hero.title1')}
              <br />
              <span className="text-amber-200">{t('home.hero.title2')}</span>
            </h1>

            <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-emerald-50/70 sm:text-sm">
              {t('home.hero.subtitle')}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onNavigate('agricultura', 'deficiencias')}
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2.5 text-xs font-bold text-[#102219] shadow-lg shadow-amber-950/30 transition hover:bg-amber-200 active:scale-[0.98]"
              >
                <Microscope className="h-4 w-4" />
                {t('home.hero.ctaDiagnosis')}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-emerald-50 backdrop-blur-md transition hover:border-emerald-400/40 hover:bg-white/10"
              >
                <Sun className="h-4 w-4 text-amber-300" />
                {t('home.hero.ctaAi')}
              </button>
            </div>

            <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-4 text-[10px] text-emerald-100/60 sm:gap-5 sm:text-[11px]">
              <span className="whitespace-nowrap">
                <strong className="mr-1 text-base font-semibold text-white">{counts.deficiencies}</strong>
                {t('home.hero.nutrients')}
              </span>
              <span className="h-4 w-px bg-white/10" />
              <span className="whitespace-nowrap">
                <strong className="mr-1 text-base font-semibold text-white">{counts.pests}</strong>
                {t('home.hero.pests')}
              </span>
              <span className="h-4 w-px bg-white/10" />
              <span className="whitespace-nowrap">
                <strong className="mr-1 text-base font-semibold text-white">{counts.recipes}</strong>
                {t('home.hero.recipes')}
              </span>
            </div>
          </div>

          {/* Live climate panel */}
          <div className="relative lg:justify-self-end">
            <div className="absolute -inset-4 rounded-[32px] bg-emerald-400/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#051a14]/75 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
              <div className="flex items-center justify-end gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {t('home.weather.live')}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <div className="flex items-start">
                  <span className="text-[3.25rem] font-semibold leading-none tracking-[-0.05em] text-white">
                    {Math.round(currentWeather.temperature ?? 17)}
                  </span>
                  <span className="mt-1.5 text-lg font-medium text-emerald-100/60">°C</span>
                </div>
                <div className="pb-1 text-right">
                  <p className="text-xs font-medium text-emerald-100">{condition}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2">
                  <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-emerald-100/45">
                    <Droplets className="h-3 w-3 text-sky-300" />
                    {t('home.weather.humidity')}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white">{humidity}%</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2">
                  <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-emerald-100/45">
                    <Thermometer className="h-3 w-3 text-amber-300" />
                    {t('home.weather.vpd')}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white">{vpd.toFixed(2)}</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2">
                  <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-emerald-100/45">
                    <Wind className="h-3 w-3 text-emerald-300" />
                    {t('home.weather.wind')}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white">
                    {Math.round(currentWeather.windSpeed ?? 0)}
                    <span className="ml-0.5 text-[9px] font-normal text-emerald-100/45">km/h</span>
                  </span>
                </div>
              </div>

              <div
                className={`mt-3 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-[10px] leading-relaxed ${
                  isHumidityAlert
                    ? 'border-amber-500/20 bg-amber-500/[0.08] text-amber-100/85'
                    : 'border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-100/85'
                }`}
              >
                {isHumidityAlert ? (
                  <CloudSun className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
                )}
                <span>{isHumidityAlert ? t('home.weather.alertHumidity') : t('home.weather.ok')}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-emerald-100/45">
                <span className="flex items-center gap-1">
                  <Sunrise className="h-3 w-3 text-amber-200/70" /> {currentWeather.sunrise || '05:25'}
                </span>
                <span className="flex items-center gap-1">
                  <Sunset className="h-3 w-3 text-orange-200/70" /> {currentWeather.sunset || '18:20'}
                </span>
                <span>
                  {t('home.weather.rain')} {currentWeather.rainProbability ?? 63}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick numbers */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-slate-800/90 bg-slate-900/55 p-3.5 transition hover:border-emerald-700/50 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold tracking-tight text-slate-100">
                  {String(stat.value).padStart(2, '0')}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-700/25 bg-emerald-950/50 text-emerald-400">
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-slate-300">{stat.label}</p>
              <p className="mt-0.5 text-[10px] text-slate-500">{stat.hint}</p>
            </div>
          );
        })}
      </section>

      {/* Modules */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400/80">
              {t('home.modules.eyebrow')}
            </p>
            <h2 className="mt-1 font-serif text-2xl tracking-tight text-slate-100 sm:text-[1.7rem]">
              {t('home.modules.title')}
            </h2>
          </div>
          <p className="max-w-xs text-[11px] leading-relaxed text-slate-500">
            {t('home.modules.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {moduleCards.map((module) => {
            const Icon = module.icon;
            const accent = accentStyles[module.accent];
            return (
              <button
                key={module.titleKey}
                onClick={() => onNavigate(module.category, module.sub)}
                className={`group relative min-h-[154px] rounded-2xl border border-slate-800/90 bg-slate-900/55 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-xl hover:shadow-black/20 ${accent.line}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${accent.icon}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${accent.chip}`}
                  >
                    {t(module.badgeKey)}
                  </span>
                </div>
                <h3 className="mt-3.5 text-[13px] font-semibold text-slate-100 transition-colors group-hover:text-white">
                  {t(module.titleKey)}
                </h3>
                <p className="mt-1.5 pr-3 text-[10.5px] leading-relaxed text-slate-400">
                  {t(module.descriptionKey)}
                </p>
                <ArrowRight className="absolute bottom-4 right-4 h-3.5 w-3.5 text-slate-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-emerald-300" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Today + crop spotlight */}
      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/55 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-700/25 bg-violet-950/50 text-violet-300">
                <CalendarDays className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-[13px] font-semibold text-slate-100">{t('home.today.title')}</h3>
                <p className="text-[10px] first-letter:uppercase text-slate-500">{formattedDate}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('calendario', 'manutencao')}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-800 px-2.5 py-1.5 text-[10px] font-semibold text-slate-300 transition hover:border-emerald-600/50 hover:text-emerald-300"
            >
              {t('home.today.open')} <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="mt-4 divide-y divide-slate-800/80">
            {todayEvents.length > 0 ? (
              todayEvents.map((event) => {
                const eventTypeKey = EVENT_TYPE_KEYS[event.type];
                return (
                  <div key={event.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                        event.completed
                          ? 'border-emerald-700/40 bg-emerald-950/60 text-emerald-400'
                          : 'border-amber-700/40 bg-amber-950/40 text-amber-300'
                      }`}
                    >
                      {event.completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Droplets className="h-3.5 w-3.5" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-[11.5px] font-medium ${
                          event.completed ? 'text-slate-500 line-through' : 'text-slate-200'
                        }`}
                      >
                        {event.title}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] text-slate-500">
                        {eventTypeKey ? t(eventTypeKey) : event.type}{' '}
                        {event.dosageOrVolume ? `· ${event.dosageOrVolume}` : ''}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-md border border-slate-800 bg-slate-950/60 px-1.5 py-0.5 text-[9px] font-medium text-slate-400">
                      {event.completed ? t('home.today.done') : t('home.today.pending')}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-400" />
                <p className="mt-2 text-[11px] text-slate-400">{t('home.today.empty')}</p>
                <button
                  onClick={() => onNavigate('calendario', 'manutencao')}
                  className="mt-2 text-[10px] font-semibold text-emerald-400 hover:underline"
                >
                  {t('home.today.schedule')}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/55">
          <img
            src="/images/cultivo/mother_plant.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04130f] via-[#04130f]/70 to-transparent" />
          <div className="relative flex h-full min-h-[210px] flex-col justify-end p-5">
            <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-200 backdrop-blur-sm">
              <Dna className="h-3 w-3 text-amber-300" />
              {t('home.crop.badge')}
            </span>
            <h3 className="text-lg font-semibold text-white">{t('home.crop.title')}</h3>
            <p className="mt-1 max-w-[240px] text-[11px] leading-relaxed text-emerald-50/65">
              {t('home.crop.desc', { madres: counts.madres, clones: totalClones })}
            </p>
            <button
              onClick={() => onNavigate('agricultura', 'cultivo')}
              className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              {t('home.crop.manage')} <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-start justify-between gap-2 border-t border-slate-800/70 pt-5 text-[10px] text-slate-500 sm:flex-row sm:items-center">
        <span className="inline-flex items-center gap-1.5">
          <Leaf className="h-3 w-3 text-emerald-500" />
          {t('home.footer.org')}
        </span>
        <span>{t('home.footer.note')}</span>
      </footer>
    </div>
  );
};
