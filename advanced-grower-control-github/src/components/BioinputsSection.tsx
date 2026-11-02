import React, { useState } from 'react';
import { BioInput } from '../types';
import { ShieldCheck, Search, Plus, Edit2, Info } from 'lucide-react';
import { useI18n, useTerm } from '../i18n';

const COPY = {
  pt: {
    title: '1.4 Catálogo e Guia de Bioinsumos Comerciais',
    description: 'Microrganismos, biofungicidas e bioestimulantes aprovados para uso no cultivo fitoterápico da associação.',
    search: 'Buscar produto, agente ativo (ex: Trichoderma, Beauveria)...',
    all: 'Todas as Categorias',
    add: 'Adicionar Bioinsumo',
    agent: 'Agente:',
    target: 'Alvo Principal:',
    dosage: 'Dosagem Recomendada:',
    note: 'Nota:',
  },
  en: {
    title: '1.4 Catalogue and Guide to Commercial Bioinputs',
    description: 'Microorganisms, biofungicides and biostimulants approved for phytotherapeutic cultivation.',
    search: 'Search product or active agent (e.g. Trichoderma, Beauveria)...',
    all: 'All categories',
    add: 'Add bioinput',
    agent: 'Agent:',
    target: 'Primary target:',
    dosage: 'Recommended rate:',
    note: 'Note:',
  },
  es: {
    title: '1.4 Catálogo y Guía de Bioinsumos Comerciales',
    description: 'Microorganismos, biofungicidas y bioestimulantes aprobados para el cultivo fitoterapéutico de la asociación.',
    search: 'Buscar producto o agente activo (ej.: Trichoderma, Beauveria)...',
    all: 'Todas las categorías',
    add: 'Añadir bioinsumo',
    agent: 'Agente:',
    target: 'Objetivo principal:',
    dosage: 'Dosis recomendada:',
    note: 'Nota:',
  },
  de: {
    title: '1.4 Katalog und Leitfaden für kommerzielle Bioinputs',
    description: 'Mikroorganismen, Biofungizide und Biostimulanzien für den phytotherapeutischen Anbau.',
    search: 'Produkt oder Wirkstoff suchen (z. B. Trichoderma, Beauveria)...',
    all: 'Alle Kategorien',
    add: 'Bioinput hinzufügen',
    agent: 'Wirkstoff:',
    target: 'Hauptziel:',
    dosage: 'Empfohlene Dosierung:',
    note: 'Hinweis:',
  },
};


interface BioinputsSectionProps {
  bioinputs: BioInput[];
  isAdmin: boolean;
  onAddNew: () => void;
}

export const BioinputsSection: React.FC<BioinputsSectionProps> = ({
  bioinputs,
  isAdmin,
  onAddNew,
}) => {
  const { lang, t } = useI18n();
  const term = useTerm();
  const c = COPY[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filtered = bioinputs.filter((bio) => {
    const matchesSearch =
      bio.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bio.activeAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bio.targetPestOrDisease.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCat === 'all' || bio.category === selectedCat;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 p-4 rounded-2xl border border-emerald-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-800/80 rounded-xl text-emerald-300 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-emerald-100">
              {c.title}
            </h2>
            <p className="text-xs text-emerald-300/80 mt-0.5">
              {c.description}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-2.5 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={c.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">{c.all}</option>
            <option value="Biofungicida">Biofungicida</option>
            <option value="Bioinseticida">Bioinseticida</option>
            <option value="Inoculante">Inoculante (Micorrizas)</option>
            <option value="Bioestimulante">Bioestimulante</option>
          </select>

          {isAdmin && (
            <button
              onClick={onAddNew}
              className="flex items-center gap-1 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{c.add}</span>
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-sm hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800 uppercase">
                  {term(item.category)}
                </span>
                <h3 className="font-bold text-sm text-slate-100 mt-1">{item.productName}</h3>
                <p className="text-xs text-emerald-400 font-medium italic mt-0.5">
                  {c.agent} {item.activeAgent}
                </p>
              </div>
            </div>

            <div className="text-xs space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-slate-400 font-medium">{c.target}</span>{' '}
                <span className="text-slate-200 font-semibold">{item.targetPestOrDisease}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">{c.dosage}</span>{' '}
                <span className="text-amber-300 font-bold">{item.dosage}</span>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-xl text-xs text-slate-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p><strong className="text-emerald-300">{t('bio.noteBrand')}</strong> {item.astrayaNotes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
