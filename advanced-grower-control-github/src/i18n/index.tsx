import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { V2_MESSAGES } from './v2';

export type Language = 'pt' | 'en' | 'es' | 'de';

export interface LanguageOption {
  id: Language;
  label: string;
  shortLabel: string;
  locale: string;
  primary?: boolean;
}

export const LANGUAGES: LanguageOption[] = [
  { id: 'pt', label: 'Português Brasil', shortLabel: 'PT', locale: 'pt-BR', primary: true },
  { id: 'en', label: 'English', shortLabel: 'EN', locale: 'en-US' },
  { id: 'es', label: 'Español', shortLabel: 'ES', locale: 'es-ES' },
  { id: 'de', label: 'Deutsch', shortLabel: 'DE', locale: 'de-DE' },
];

type Messages = Record<string, string>;

const pt: Messages = {
  // Global / navigation
  'nav.home': 'Início',
  'nav.agriculture': 'Agricultura',
  'nav.calendar': 'Agenda',
  'nav.weather': 'Clima',
  'nav.tools': 'Ferramentas',
  'header.platform': 'Plataforma',
  'header.home': 'Visão geral',
  'header.agriculture': 'Agricultura',
  'header.calendar': 'Agenda',
  'header.weather': 'Clima',
  'header.tools': 'Ferramentas',
  'header.backHome': 'Voltar para a visão geral',
  'header.ai': 'IA Agronômica',
  'header.aiShort': 'IA',
  'header.light': 'Claro',
  'header.dark': 'Escuro',
  'header.themeToLight': 'Mudar para tema claro',
  'header.themeToDark': 'Mudar para tema escuro',
  'header.admin': 'Admin',
  'header.grower': 'Cultivador',
  'header.toggleAdmin': 'Alternar entre modo administrador e modo cultivador',
  'lang.label': 'Idioma',
  'lang.primary': 'principal',
  'lang.pt': 'Português Brasil',
  'lang.en': 'English',
  'lang.es': 'Español',
  'lang.de': 'Deutsch',

  // Submenus
  'event.rega': 'Rega',
  'event.fertilization': 'Adubação',
  'event.pruning': 'Poda',
  'event.ipm': 'Aplicação MIP',
  'event.stage': 'Mudança de estágio',
  'event.maintenance': 'Manutenção',

  'sub.agriculture.deficiencies': 'Deficiências',
  'sub.agriculture.pests': 'Pragas & MIP',
  'sub.agriculture.knf': 'KNF / JADAM',
  'sub.agriculture.bioinputs': 'Bioinsumos',
  'sub.agriculture.soil': 'Análise de Solo',
  'sub.agriculture.cultivation': 'Cultivo',
  'sub.calendar.maintenance': 'Manutenção do Cultivo',
  'sub.calendar.mip': 'Registro MIP',
  'sub.weather.station': 'Estação & Previsão',
  'sub.weather.ai': 'IA Clima & Diagnóstico',
  'sub.tools.substrate': 'Substrato & Solo',
  'sub.tools.library': 'PDFs & Drive',

  // Home
  'home.eyebrow': 'Plataforma agronômica Advanced Grower Control',
  'home.hero.title1': 'Cultivo orgânico.',
  'home.hero.title2': 'Decisões precisas.',
  'home.hero.subtitle':
    'Do diagnóstico nutricional ao manejo integrado de pragas: ciência, clima e agricultura natural reunidos na rotina do cultivo.',
  'home.hero.ctaDiagnosis': 'Iniciar diagnóstico',
  'home.hero.ctaAi': 'Consultar IA agronômica',
  'home.hero.nutrients': 'nutrientes',
  'home.hero.pests': 'pragas',
  'home.hero.recipes': 'receitas',
  'home.weather.live': 'Ao vivo',
  'home.weather.station': 'Clima local',
  'home.weather.humidity': 'Umidade',
  'home.weather.vpd': 'VPD',
  'home.weather.wind': 'Vento',
  'home.weather.alertHumidity':
    'Umidade elevada: reforce a aeração do dossel e monitore Botrytis e oídio.',
  'home.weather.ok': 'Janela climática favorável para manejo foliar e fertirrigação.',
  'home.weather.rain': 'Chuva',
  'home.stats.nutrients': 'Nutrientes catalogados',
  'home.stats.nutrientsHint': 'diagnóstico visual',
  'home.stats.pests': 'Pragas e fungos',
  'home.stats.pestsHint': 'protocolos MIP',
  'home.stats.bioinputs': 'Bioinsumos',
  'home.stats.bioinputsHint': 'doses e alvos',
  'home.stats.madres': 'Genéticas madre',
  'home.stats.clones': '{count} clones / temporada',
  'home.modules.eyebrow': 'Estação de trabalho',
  'home.modules.title': 'Tudo o que o cultivo precisa',
  'home.modules.subtitle':
    'Oito módulos integrados para acompanhar cada etapa, da nutrição à colheita.',
  'home.module.nutrition.title': 'Diagnóstico nutricional',
  'home.module.nutrition.desc': 'Sintomas, bloqueios e correções orgânicas para 11 nutrientes.',
  'home.module.nutrition.badge': 'Guia visual',
  'home.module.pests.title': 'Pragas & MIP',
  'home.module.pests.desc': 'Identificação, monitoramento e controle biológico integrado.',
  'home.module.pests.badge': 'Manejo',
  'home.module.soil.title': 'Solo & substrato',
  'home.module.soil.desc': 'Leia o laudo, equilibre Ca:Mg:K e calcule a remineralização.',
  'home.module.soil.badge': 'Calculadora',
  'home.module.cultivation.title': 'Cultivo & genéticas',
  'home.module.cultivation.desc': 'Madres, clones e talhões com toda a rastreabilidade do ciclo.',
  'home.module.cultivation.badge': 'Gestão',
  'home.module.knf.title': 'KNF / JADAM',
  'home.module.knf.desc': 'Receitas de bioinsumos, proporções e dosagens por volume.',
  'home.module.knf.badge': 'Bioinsumos',
  'home.module.calendar.title': 'Agenda do cultivo',
  'home.module.calendar.desc': 'Organize regas, podas, aplicações e registros de MIP.',
  'home.module.calendar.badge': 'Rotina',
  'home.module.weather.title': 'Clima & radar',
  'home.module.weather.desc': 'Estação INMET, previsão, VPD e camadas agroclimáticas.',
  'home.module.weather.badge': 'Ao vivo',
  'home.module.library.title': 'Library',
  'home.module.library.desc': 'PDFs, manuais e documentos oficiais em um único acervo.',
  'home.module.library.badge': 'Acervo',
  'home.today.title': 'Agenda de hoje',
  'home.today.open': 'Ver calendário',
  'home.today.pending': 'Pendente',
  'home.today.done': 'Concluída',
  'home.today.empty': 'Nenhuma tarefa para hoje.',
  'home.today.schedule': 'Agendar uma atividade',
  'home.crop.badge': 'Cultivo em foco',
  'home.crop.title': 'Banco de madres',
  'home.crop.desc': '{madres} genéticas ativas e {clones} clones planejados para a temporada.',
  'home.crop.manage': 'Gerir cultivo',
  'home.footer.org': 'Advanced Grower Control · Plataforma de cultivo',
  'home.footer.note': 'Plataforma agronômica · Dados salvos localmente neste dispositivo',
  'home.greeting': 'Bom cultivo',

  // Weather conditions
  'weather.cond.0': 'Céu limpo / Ensolarado',
  'weather.cond.1': 'Predomínio de sol',
  'weather.cond.2': 'Sol entre poucas nuvens',
  'weather.cond.3': 'Nublado / Encoberto',
  'weather.cond.45': 'Nevoeiro / Neblina matinal',
  'weather.cond.51': 'Garoa / Chuvisco leve',
  'weather.cond.61': 'Chuva fraca',
  'weather.cond.63': 'Chuva moderada contínua',
  'weather.cond.65': 'Chuva forte contínua',
  'weather.cond.80': 'Pancadas de chuva fracas',
  'weather.cond.81': 'Pancadas de chuva moderadas',
  'weather.cond.82': 'Pancadas de chuva fortes',
  'weather.cond.95': 'Tempestade com raios e trovoadas',
  'weather.cond.96': 'Tempestade severa com granizo',
};

const en: Messages = {
  'nav.home': 'Home',
  'nav.agriculture': 'Agriculture',
  'nav.calendar': 'Schedule',
  'nav.weather': 'Weather',
  'nav.tools': 'Tools',
  'header.platform': 'Platform',
  'header.home': 'Overview',
  'header.agriculture': 'Agriculture',
  'header.calendar': 'Schedule',
  'header.weather': 'Weather',
  'header.tools': 'Tools',
  'header.backHome': 'Back to overview',
  'header.ai': 'Agronomic AI',
  'header.aiShort': 'AI',
  'header.light': 'Light',
  'header.dark': 'Dark',
  'header.themeToLight': 'Switch to light theme',
  'header.themeToDark': 'Switch to dark theme',
  'header.admin': 'Admin',
  'header.grower': 'Grower',
  'header.toggleAdmin': 'Switch between administrator and grower mode',
  'lang.label': 'Language',
  'lang.primary': 'primary',
  'lang.pt': 'Português Brasil',
  'lang.en': 'English',
  'lang.es': 'Español',
  'lang.de': 'Deutsch',

  'event.rega': 'Watering',
  'event.fertilization': 'Fertilisation',
  'event.pruning': 'Pruning',
  'event.ipm': 'IPM application',
  'event.stage': 'Stage change',
  'event.maintenance': 'Maintenance',

  'sub.agriculture.deficiencies': 'Deficiencies',
  'sub.agriculture.pests': 'Pests & IPM',
  'sub.agriculture.knf': 'KNF / JADAM',
  'sub.agriculture.bioinputs': 'Bioinputs',
  'sub.agriculture.soil': 'Soil Analysis',
  'sub.agriculture.cultivation': 'Cultivation',
  'sub.calendar.maintenance': 'Crop Maintenance',
  'sub.calendar.mip': 'IPM Log',
  'sub.weather.station': 'Station & Forecast',
  'sub.weather.ai': 'Climate AI & Diagnosis',
  'sub.tools.substrate': 'Substrate & Soil',
  'sub.tools.library': 'PDFs & Drive',

  'home.eyebrow': 'Advanced Grower Control agronomic platform',
  'home.hero.title1': 'Organic cultivation.',
  'home.hero.title2': 'Precise decisions.',
  'home.hero.subtitle':
    'From nutritional diagnosis to integrated pest management: science, climate and natural farming together in the daily growing routine.',
  'home.hero.ctaDiagnosis': 'Start diagnosis',
  'home.hero.ctaAi': 'Ask the agronomic AI',
  'home.hero.nutrients': 'nutrients',
  'home.hero.pests': 'pests',
  'home.hero.recipes': 'recipes',
  'home.weather.live': 'Live',
  'home.weather.station': 'Local weather',
  'home.weather.humidity': 'Humidity',
  'home.weather.vpd': 'VPD',
  'home.weather.wind': 'Wind',
  'home.weather.alertHumidity':
    'High humidity: improve canopy airflow and monitor for Botrytis and powdery mildew.',
  'home.weather.ok': 'Favourable climate window for foliar management and fertigation.',
  'home.weather.rain': 'Rain',
  'home.stats.nutrients': 'Catalogued nutrients',
  'home.stats.nutrientsHint': 'visual diagnosis',
  'home.stats.pests': 'Pests and fungi',
  'home.stats.pestsHint': 'IPM protocols',
  'home.stats.bioinputs': 'Bioinputs',
  'home.stats.bioinputsHint': 'rates and targets',
  'home.stats.madres': 'Mother genetics',
  'home.stats.clones': '{count} clones / season',
  'home.modules.eyebrow': 'Workstation',
  'home.modules.title': 'Everything the grow needs',
  'home.modules.subtitle':
    'Eight integrated modules to follow every stage, from nutrition to harvest.',
  'home.module.nutrition.title': 'Nutritional diagnosis',
  'home.module.nutrition.desc': 'Symptoms, lockouts and organic corrections for 11 nutrients.',
  'home.module.nutrition.badge': 'Visual guide',
  'home.module.pests.title': 'Pests & IPM',
  'home.module.pests.desc': 'Identification, monitoring and integrated biological control.',
  'home.module.pests.badge': 'Management',
  'home.module.soil.title': 'Soil & substrate',
  'home.module.soil.desc': 'Read the report, balance Ca:Mg:K and calculate remineralisation.',
  'home.module.soil.badge': 'Calculator',
  'home.module.cultivation.title': 'Cultivation & genetics',
  'home.module.cultivation.desc': 'Mother plants, clones and plots with full cycle traceability.',
  'home.module.cultivation.badge': 'Management',
  'home.module.knf.title': 'KNF / JADAM',
  'home.module.knf.desc': 'Bioinput recipes, ratios and dosing by volume.',
  'home.module.knf.badge': 'Bioinputs',
  'home.module.calendar.title': 'Grow schedule',
  'home.module.calendar.desc': 'Organise watering, pruning, applications and IPM records.',
  'home.module.calendar.badge': 'Routine',
  'home.module.weather.title': 'Weather & radar',
  'home.module.weather.desc': 'INMET station, forecast, VPD and agroclimatic layers.',
  'home.module.weather.badge': 'Live',
  'home.module.library.title': 'Library',
  'home.module.library.desc': 'PDFs, manuals and official documents in one place.',
  'home.module.library.badge': 'Archive',
  'home.today.title': "Today's schedule",
  'home.today.open': 'Open calendar',
  'home.today.pending': 'Pending',
  'home.today.done': 'Completed',
  'home.today.empty': 'No tasks for today.',
  'home.today.schedule': 'Schedule an activity',
  'home.crop.badge': 'Grow spotlight',
  'home.crop.title': 'Mother bank',
  'home.crop.desc': '{madres} active genetics and {clones} clones planned for the season.',
  'home.crop.manage': 'Manage cultivation',
  'home.footer.org': 'Advanced Grower Control · Cultivation platform',
  'home.footer.note': 'Agronomic platform · Data saved locally on this device',
  'home.greeting': 'Good growing',

  'weather.cond.0': 'Clear sky / Sunny',
  'weather.cond.1': 'Mostly sunny',
  'weather.cond.2': 'Sun with few clouds',
  'weather.cond.3': 'Cloudy / Overcast',
  'weather.cond.45': 'Fog / Morning mist',
  'weather.cond.51': 'Drizzle / Light drizzle',
  'weather.cond.61': 'Light rain',
  'weather.cond.63': 'Moderate continuous rain',
  'weather.cond.65': 'Heavy continuous rain',
  'weather.cond.80': 'Light rain showers',
  'weather.cond.81': 'Moderate rain showers',
  'weather.cond.82': 'Heavy rain showers',
  'weather.cond.95': 'Thunderstorm with lightning',
  'weather.cond.96': 'Severe thunderstorm with hail',
};

const es: Messages = {
  'nav.home': 'Inicio',
  'nav.agriculture': 'Agricultura',
  'nav.calendar': 'Agenda',
  'nav.weather': 'Clima',
  'nav.tools': 'Herramientas',
  'header.platform': 'Plataforma',
  'header.home': 'Vista general',
  'header.agriculture': 'Agricultura',
  'header.calendar': 'Agenda',
  'header.weather': 'Clima',
  'header.tools': 'Herramientas',
  'header.backHome': 'Volver a la vista general',
  'header.ai': 'IA Agronómica',
  'header.aiShort': 'IA',
  'header.light': 'Claro',
  'header.dark': 'Oscuro',
  'header.themeToLight': 'Cambiar al tema claro',
  'header.themeToDark': 'Cambiar al tema oscuro',
  'header.admin': 'Admin',
  'header.grower': 'Cultivador',
  'header.toggleAdmin': 'Alternar entre modo administrador y cultivador',
  'lang.label': 'Idioma',
  'lang.primary': 'principal',
  'lang.pt': 'Português Brasil',
  'lang.en': 'English',
  'lang.es': 'Español',
  'lang.de': 'Deutsch',

  'event.rega': 'Riego',
  'event.fertilization': 'Fertilización',
  'event.pruning': 'Poda',
  'event.ipm': 'Aplicación MIP',
  'event.stage': 'Cambio de etapa',
  'event.maintenance': 'Mantenimiento',

  'sub.agriculture.deficiencies': 'Deficiencias',
  'sub.agriculture.pests': 'Plagas & MIP',
  'sub.agriculture.knf': 'KNF / JADAM',
  'sub.agriculture.bioinputs': 'Bioinsumos',
  'sub.agriculture.soil': 'Análisis de Suelo',
  'sub.agriculture.cultivation': 'Cultivo',
  'sub.calendar.maintenance': 'Mantenimiento del Cultivo',
  'sub.calendar.mip': 'Registro MIP',
  'sub.weather.station': 'Estación y Pronóstico',
  'sub.weather.ai': 'IA Clima y Diagnóstico',
  'sub.tools.substrate': 'Sustrato y Suelo',
  'sub.tools.library': 'PDFs y Drive',

  'home.eyebrow': 'Plataforma agronómica Advanced Grower Control',
  'home.hero.title1': 'Cultivo orgánico.',
  'home.hero.title2': 'Decisiones precisas.',
  'home.hero.subtitle':
    'Del diagnóstico nutricional al manejo integrado de plagas: ciencia, clima y agricultura natural reunidos en la rutina del cultivo.',
  'home.hero.ctaDiagnosis': 'Iniciar diagnóstico',
  'home.hero.ctaAi': 'Consultar IA agronómica',
  'home.hero.nutrients': 'nutrientes',
  'home.hero.pests': 'plagas',
  'home.hero.recipes': 'recetas',
  'home.weather.live': 'En vivo',
  'home.weather.station': 'Clima local',
  'home.weather.humidity': 'Humedad',
  'home.weather.vpd': 'VPD',
  'home.weather.wind': 'Viento',
  'home.weather.alertHumidity':
    'Humedad elevada: refuerce la aireación del dosel y vigile Botrytis y oídio.',
  'home.weather.ok': 'Ventana climática favorable para manejo foliar y fertirriego.',
  'home.weather.rain': 'Lluvia',
  'home.stats.nutrients': 'Nutrientes catalogados',
  'home.stats.nutrientsHint': 'diagnóstico visual',
  'home.stats.pests': 'Plagas y hongos',
  'home.stats.pestsHint': 'protocolos MIP',
  'home.stats.bioinputs': 'Bioinsumos',
  'home.stats.bioinputsHint': 'dosis y objetivos',
  'home.stats.madres': 'Genéticas madre',
  'home.stats.clones': '{count} clones / temporada',
  'home.modules.eyebrow': 'Estación de trabajo',
  'home.modules.title': 'Todo lo que el cultivo necesita',
  'home.modules.subtitle':
    'Ocho módulos integrados para acompañar cada etapa, de la nutrición a la cosecha.',
  'home.module.nutrition.title': 'Diagnóstico nutricional',
  'home.module.nutrition.desc': 'Síntomas, bloqueos y correcciones orgánicas para 11 nutrientes.',
  'home.module.nutrition.badge': 'Guía visual',
  'home.module.pests.title': 'Plagas & MIP',
  'home.module.pests.desc': 'Identificación, monitoreo y control biológico integrado.',
  'home.module.pests.badge': 'Manejo',
  'home.module.soil.title': 'Suelo y sustrato',
  'home.module.soil.desc': 'Lea el informe, equilibre Ca:Mg:K y calcule la remineralización.',
  'home.module.soil.badge': 'Calculadora',
  'home.module.cultivation.title': 'Cultivo y genéticas',
  'home.module.cultivation.desc': 'Madres, clones y parcelas con trazabilidad completa del ciclo.',
  'home.module.cultivation.badge': 'Gestión',
  'home.module.knf.title': 'KNF / JADAM',
  'home.module.knf.desc': 'Recetas de bioinsumos, proporciones y dosis por volumen.',
  'home.module.knf.badge': 'Bioinsumos',
  'home.module.calendar.title': 'Agenda del cultivo',
  'home.module.calendar.desc': 'Organice riegos, podas, aplicaciones y registros MIP.',
  'home.module.calendar.badge': 'Rutina',
  'home.module.weather.title': 'Clima y radar',
  'home.module.weather.desc': 'Estación INMET, pronóstico, VPD y capas agroclimáticas.',
  'home.module.weather.badge': 'En vivo',
  'home.module.library.title': 'Library',
  'home.module.library.desc': 'PDFs, manuales y documentos oficiales en un solo archivo.',
  'home.module.library.badge': 'Acervo',
  'home.today.title': 'Agenda de hoy',
  'home.today.open': 'Ver calendario',
  'home.today.pending': 'Pendiente',
  'home.today.done': 'Completada',
  'home.today.empty': 'No hay tareas para hoy.',
  'home.today.schedule': 'Programar una actividad',
  'home.crop.badge': 'Cultivo en foco',
  'home.crop.title': 'Banco de madres',
  'home.crop.desc': '{madres} genéticas activas y {clones} clones planificados para la temporada.',
  'home.crop.manage': 'Gestionar cultivo',
  'home.footer.org': 'Advanced Grower Control · Plataforma de cultivo',
  'home.footer.note': 'Plataforma agronómica · Datos guardados localmente en este dispositivo',
  'home.greeting': 'Buen cultivo',

  'weather.cond.0': 'Cielo despejado / Soleado',
  'weather.cond.1': 'Predominio de sol',
  'weather.cond.2': 'Sol entre pocas nubes',
  'weather.cond.3': 'Nublado / Cubierto',
  'weather.cond.45': 'Niebla / Neblina matinal',
  'weather.cond.51': 'Llovizna / Llovizna ligera',
  'weather.cond.61': 'Lluvia débil',
  'weather.cond.63': 'Lluvia moderada continua',
  'weather.cond.65': 'Lluvia fuerte continua',
  'weather.cond.80': 'Chubascos débiles',
  'weather.cond.81': 'Chubascos moderados',
  'weather.cond.82': 'Chubascos fuertes',
  'weather.cond.95': 'Tormenta con rayos y truenos',
  'weather.cond.96': 'Tormenta severa con granizo',
};

const de: Messages = {
  'nav.home': 'Start',
  'nav.agriculture': 'Anbau',
  'nav.calendar': 'Plan',
  'nav.weather': 'Wetter',
  'nav.tools': 'Werkzeuge',
  'header.platform': 'Plattform',
  'header.home': 'Übersicht',
  'header.agriculture': 'Anbau',
  'header.calendar': 'Plan',
  'header.weather': 'Wetter',
  'header.tools': 'Werkzeuge',
  'header.backHome': 'Zurück zur Übersicht',
  'header.ai': 'Agrar-KI',
  'header.aiShort': 'KI',
  'header.light': 'Hell',
  'header.dark': 'Dunkel',
  'header.themeToLight': 'Zum hellen Design wechseln',
  'header.themeToDark': 'Zum dunklen Design wechseln',
  'header.admin': 'Admin',
  'header.grower': 'Züchter',
  'header.toggleAdmin': 'Zwischen Administrator- und Grower-Modus wechseln',
  'lang.label': 'Sprache',
  'lang.primary': 'Hauptsprache',
  'lang.pt': 'Português Brasil',
  'lang.en': 'English',
  'lang.es': 'Español',
  'lang.de': 'Deutsch',

  'event.rega': 'Bewässerung',
  'event.fertilization': 'Düngung',
  'event.pruning': 'Schnitt',
  'event.ipm': 'IPM-Anwendung',
  'event.stage': 'Phasenwechsel',
  'event.maintenance': 'Wartung',

  'sub.agriculture.deficiencies': 'Mangelerscheinungen',
  'sub.agriculture.pests': 'Schädlinge & IPM',
  'sub.agriculture.knf': 'KNF / JADAM',
  'sub.agriculture.bioinputs': 'Bioinputs',
  'sub.agriculture.soil': 'Bodenanalyse',
  'sub.agriculture.cultivation': 'Anbau',
  'sub.calendar.maintenance': 'Kulturpflege',
  'sub.calendar.mip': 'IPM-Protokoll',
  'sub.weather.station': 'Station & Vorhersage',
  'sub.weather.ai': 'Klima-KI & Diagnose',
  'sub.tools.substrate': 'Substrat & Boden',
  'sub.tools.library': 'PDFs & Drive',

  'home.eyebrow': 'Agrarplattform Advanced Grower Control',
  'home.hero.title1': 'Organischer Anbau.',
  'home.hero.title2': 'Präzise Entscheidungen.',
  'home.hero.subtitle':
    'Von der Nährstoffdiagnose bis zum integrierten Pflanzenschutz: Wissenschaft, Klima und natürliche Landwirtschaft für den Alltag im Anbau.',
  'home.hero.ctaDiagnosis': 'Diagnose starten',
  'home.hero.ctaAi': 'Agrar-KI fragen',
  'home.hero.nutrients': 'Nährstoffe',
  'home.hero.pests': 'Schädlinge',
  'home.hero.recipes': 'Rezepte',
  'home.weather.live': 'Live',
  'home.weather.station': 'Lokales Wetter',
  'home.weather.humidity': 'Luftfeuchte',
  'home.weather.vpd': 'VPD',
  'home.weather.wind': 'Wind',
  'home.weather.alertHumidity':
    'Hohe Luftfeuchtigkeit: Kronenbelüftung verbessern und auf Botrytis und Echten Mehltau achten.',
  'home.weather.ok': 'Günstiges Klimafenster für Blattbehandlung und Fertigation.',
  'home.weather.rain': 'Regen',
  'home.stats.nutrients': 'Katalogisierte Nährstoffe',
  'home.stats.nutrientsHint': 'visuelle Diagnose',
  'home.stats.pests': 'Schädlinge und Pilze',
  'home.stats.pestsHint': 'IPM-Protokolle',
  'home.stats.bioinputs': 'Bioinputs',
  'home.stats.bioinputsHint': 'Dosierungen und Ziele',
  'home.stats.madres': 'Muttergenetiken',
  'home.stats.clones': '{count} Klone / Saison',
  'home.modules.eyebrow': 'Arbeitsstation',
  'home.modules.title': 'Alles, was der Anbau braucht',
  'home.modules.subtitle':
    'Acht integrierte Module für jede Phase – von der Ernährung bis zur Ernte.',
  'home.module.nutrition.title': 'Nährstoffdiagnose',
  'home.module.nutrition.desc': 'Symptome, Blockaden und organische Korrekturen für 11 Nährstoffe.',
  'home.module.nutrition.badge': 'Visueller Leitfaden',
  'home.module.pests.title': 'Schädlinge & IPM',
  'home.module.pests.desc': 'Bestimmung, Monitoring und integrierte biologische Bekämpfung.',
  'home.module.pests.badge': 'Management',
  'home.module.soil.title': 'Boden & Substrat',
  'home.module.soil.desc': 'Bodenanalyse lesen, Ca:Mg:K ausgleichen und Remineralisierung berechnen.',
  'home.module.soil.badge': 'Rechner',
  'home.module.cultivation.title': 'Anbau & Genetik',
  'home.module.cultivation.desc': 'Mutterpflanzen, Klone und Beete mit voller Rückverfolgbarkeit.',
  'home.module.cultivation.badge': 'Verwaltung',
  'home.module.knf.title': 'KNF / JADAM',
  'home.module.knf.desc': 'Bioinput-Rezepte, Verhältnisse und Dosierung nach Volumen.',
  'home.module.knf.badge': 'Bioinputs',
  'home.module.calendar.title': 'Anbauplan',
  'home.module.calendar.desc': 'Gießen, Schnitt, Anwendungen und IPM-Aufzeichnungen organisieren.',
  'home.module.calendar.badge': 'Routine',
  'home.module.weather.title': 'Wetter & Radar',
  'home.module.weather.desc': 'INMET-Station, Vorhersage, VPD und agroklimatische Karten.',
  'home.module.weather.badge': 'Live',
  'home.module.library.title': 'Bibliothek',
  'home.module.library.desc': 'PDFs, Handbücher und offizielle Dokumente an einem Ort.',
  'home.module.library.badge': 'Archiv',
  'home.today.title': 'Heutiger Plan',
  'home.today.open': 'Kalender öffnen',
  'home.today.pending': 'Offen',
  'home.today.done': 'Erledigt',
  'home.today.empty': 'Keine Aufgaben für heute.',
  'home.today.schedule': 'Aktivität planen',
  'home.crop.badge': 'Anbau im Fokus',
  'home.crop.title': 'Mutterpflanzenbank',
  'home.crop.desc': '{madres} aktive Genetiken und {clones} geplante Klone für die Saison.',
  'home.crop.manage': 'Anbau verwalten',
  'home.footer.org': 'Advanced Grower Control · Anbauplattform',
  'home.footer.note': 'Agrarplattform · Daten werden lokal auf diesem Gerät gespeichert',
  'home.greeting': 'Gutes Gelingen',

  'weather.cond.0': 'Klarer Himmel / Sonnig',
  'weather.cond.1': 'Überwiegend sonnig',
  'weather.cond.2': 'Sonne zwischen wenigen Wolken',
  'weather.cond.3': 'Bewölkt / Bedeckt',
  'weather.cond.45': 'Nebel / Morgennebel',
  'weather.cond.51': 'Nieselregen / Leichter Niesel',
  'weather.cond.61': 'Leichter Regen',
  'weather.cond.63': 'Mäßiger Dauerregen',
  'weather.cond.65': 'Starker Dauerregen',
  'weather.cond.80': 'Leichte Regenschauer',
  'weather.cond.81': 'Mäßige Regenschauer',
  'weather.cond.82': 'Starke Regenschauer',
  'weather.cond.95': 'Gewitter mit Blitz und Donner',
  'weather.cond.96': 'Schweres Gewitter mit Hagel',
};

const dictionaries: Record<Language, Messages> = { pt, en, es, de };

/** Terms shared by structured agronomic data. Unknown values fall back to Portuguese. */
const TERMS: Record<string, Partial<Record<Language, string>>> = {
  Nitrogênio: { en: 'Nitrogen', es: 'Nitrógeno', de: 'Stickstoff' },
  Fósforo: { en: 'Phosphorus', es: 'Fósforo', de: 'Phosphor' },
  Potássio: { en: 'Potassium', es: 'Potasio', de: 'Kalium' },
  Cálcio: { en: 'Calcium', es: 'Calcio', de: 'Calcium' },
  Magnésio: { en: 'Magnesium', es: 'Magnesio', de: 'Magnesium' },
  Enxofre: { en: 'Sulfur', es: 'Azufre', de: 'Schwefel' },
  Boro: { en: 'Boron', es: 'Boro', de: 'Bor' },
  Cobre: { en: 'Copper', es: 'Cobre', de: 'Kupfer' },
  Manganês: { en: 'Manganese', es: 'Manganeso', de: 'Mangan' },
  Zinco: { en: 'Zinc', es: 'Zinc', de: 'Zink' },
  Ferro: { en: 'Iron', es: 'Hierro', de: 'Eisen' },
  Macro: { en: 'Macro', es: 'Macro', de: 'Makro' },
  Secundário: { en: 'Secondary', es: 'Secundario', de: 'Sekundär' },
  Micro: { en: 'Micro', es: 'Micro', de: 'Mikro' },
  Móvel: { en: 'Mobile', es: 'Móvil', de: 'Mobil' },
  Imóvel: { en: 'Immobile', es: 'Inmóvil', de: 'Immobil' },
  'Parcialmente Móvel': { en: 'Partially mobile', es: 'Parcialmente móvil', de: 'Teilweise mobil' },
  'Folhas Velhas (Inferiores)': { en: 'Old leaves (lower)', es: 'Hojas viejas (inferiores)', de: 'Alte Blätter (unten)' },
  'Folhas Novas (Superiores)': { en: 'New leaves (upper)', es: 'Hojas nuevas (superiores)', de: 'Neue Blätter (oben)' },
  'Toda a Planta': { en: 'Whole plant', es: 'Toda la planta', de: 'Ganze Pflanze' },
  Ácaro: { en: 'Mite', es: 'Ácaro', de: 'Milbe' },
  'Inseto Sugador': { en: 'Sap-sucking insect', es: 'Insecto chupador', de: 'Saugendes Insekt' },
  'Lagarta/Broca': { en: 'Caterpillar / borer', es: 'Oruga / barrenador', de: 'Raupe / Bohrer' },
  'Fungo/Bactéria': { en: 'Fungus / bacterium', es: 'Hongo / bacteria', de: 'Pilz / Bakterium' },
  'Praga do Solo': { en: 'Soil pest', es: 'Plaga del suelo', de: 'Bodenschädling' },
  Nematoide: { en: 'Nematode', es: 'Nematodo', de: 'Nematode' },
  Alta: { en: 'High', es: 'Alta', de: 'Hoch' },
  Média: { en: 'Medium', es: 'Media', de: 'Mittel' },
  Baixa: { en: 'Low', es: 'Baja', de: 'Niedrig' },
  Fácil: { en: 'Easy', es: 'Fácil', de: 'Einfach' },
  Difícil: { en: 'Difficult', es: 'Difícil', de: 'Schwierig' },
  Especialista: { en: 'Expert', es: 'Especialista', de: 'Experte' },
  Excelente: { en: 'Excellent', es: 'Excelente', de: 'Ausgezeichnet' },
  Boa: { en: 'Good', es: 'Buena', de: 'Gut' },
  Regular: { en: 'Fair', es: 'Regular', de: 'Mäßig' },
  Atenção: { en: 'Attention', es: 'Atención', de: 'Achtung' },
  Rega: { en: 'Watering', es: 'Riego', de: 'Bewässerung' },
  Adubação: { en: 'Fertilisation', es: 'Fertilización', de: 'Düngung' },
  Poda: { en: 'Pruning', es: 'Poda', de: 'Schnitt' },
  MIP_Aplicacao: { en: 'IPM application', es: 'Aplicación MIP', de: 'IPM-Anwendung' },
  Muda_Estagio: { en: 'Stage change', es: 'Cambio de etapa', de: 'Phasenwechsel' },
  Manutencao: { en: 'Maintenance', es: 'Mantenimiento', de: 'Wartung' },
  Biofungicida: { en: 'Biofungicide', es: 'Biofungicida', de: 'Biofungizid' },
  Bioinseticida: { en: 'Bioinsecticide', es: 'Bioinsecticida', de: 'Bioinsektizid' },
  Inoculante: { en: 'Inoculant', es: 'Inoculante', de: 'Inokulum' },
  Bioestimulante: { en: 'Biostimulant', es: 'Bioestimulante', de: 'Biostimulans' },
  Bionematicida: { en: 'Bionematicide', es: 'Bionematicida', de: 'Bionematizid' },
  'Crescimento Vegetativo (Dias Longos)': {
    en: 'Vegetative growth (long days)',
    es: 'Crecimiento vegetativo (días largos)',
    de: 'Vegetatives Wachstum (lange Tage)',
  },
  'Indução Floração Natural': {
    en: 'Natural flowering induction',
    es: 'Inducción natural de floración',
    de: 'Natürliche Blüteinduktion',
  },
  Maturação: { en: 'Ripening', es: 'Maduración', de: 'Reifung' },
  'Ácaro Vermelho / Ácaro do Teto (Spider Mites)': {
    en: 'Two-spotted spider mite',
    es: 'Araña roja',
    de: 'Gemeine Spinnmilbe',
  },
  'Trips / Tripes': { en: 'Thrips', es: 'Trips', de: 'Thripse' },
  'Mosca do Fungo / Fungus Gnats': { en: 'Fungus gnats', es: 'Mosca del sustrato', de: 'Trauermücken' },
  'Mofo Cinzento / Podridão dos Buds (Botrytis)': {
    en: 'Grey mould / bud rot (Botrytis)',
    es: 'Moho gris / podredumbre de cogollos (Botrytis)',
    de: 'Grauschimmel / Knospenfäule (Botrytis)',
  },
  'Oídio / Powdery Mildew': { en: 'Powdery mildew', es: 'Oídio', de: 'Echter Mehltau' },
  'Cigarrinho-do-Milho (Vetor de Viroses)': {
    en: 'Corn leafhopper (virus vector)',
    es: 'Chicharrita del maíz (vector de virus)',
    de: 'Maiszikade (Virusvektor)',
  },
  'Mosca-Branca': { en: 'Whitefly', es: 'Mosca blanca', de: 'Weiße Fliege' },
  'Ácaro Branco / Broad Mite': { en: 'Broad mite', es: 'Ácaro blanco', de: 'Breite Milbe' },
  'Nematoide das Galhas': { en: 'Root-knot nematode', es: 'Nematodo de las agallas', de: 'Wurzelgallen-Nematode' },
  'Nematoide das Lesões Radiculares': {
    en: 'Root-lesion nematode',
    es: 'Nematodo de las lesiones radiculares',
    de: 'Wurzelläsions-Nematode',
  },
};

export const useTerm = () => {
  const { lang } = useI18n();
  return useCallback(
    (value: string) => {
      if (!value) return value;
      return TERMS[value]?.[lang] || value;
    },
    [lang],
  );
};

interface I18nContextValue {
  lang: Language;
  locale: string;
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('astraya_lang') as Language | null;
      if (saved && LANGUAGES.some((item) => item.id === saved)) return saved;
    } catch {
      // ignore storage access errors
    }
    return 'pt';
  });

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem('astraya_lang', next);
    } catch {
      // ignore storage access errors
    }
  }, []);

  const locale = LANGUAGES.find((item) => item.id === lang)?.locale || 'pt-BR';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title =
      lang === 'en'
        ? 'Advanced Grower Control · Agronomic Platform'
        : lang === 'es'
        ? 'Advanced Grower Control · Plataforma Agronómica'
        : lang === 'de'
        ? 'Advanced Grower Control · Agrarplattform'
        : 'Advanced Grower Control · Plataforma Agronômica';
  }, [locale, lang]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let message = V2_MESSAGES[lang][key] ?? dictionaries[lang][key] ?? pt[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([name, value]) => {
          message = message.replaceAll(`{${name}}`, String(value));
        });
      }
      return message;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, locale, setLang, t }), [lang, locale, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
};
