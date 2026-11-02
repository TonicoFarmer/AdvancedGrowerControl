import React, { useState } from 'react';
import { ToolsSubMenu, DriveDocument } from '../types';
import { Wrench, ExternalLink, Plus, BookOpen, Layers, Trash2, Mountain, Sparkles } from 'lucide-react';
import { useI18n, useTerm } from '../i18n';

const COPY = {
  pt: {
    substrateTitle: '4.3 Calculadora de Substrato & Receita de Solo',
    libraryTitle: '4.4 Biblioteca de Documentos & PDFs Drive',
    description: 'Ferramentas agronômicas de precisão para montagem de solo orgânico vivo e gestão de documentos.',
    calcTitle: 'Calculadora de Substrato & Receita de Solo Vivo',
    formula: 'Fórmula Orgânica',
    pots: 'Quantidade de Vasos:',
    potVolume: 'Volume de Cada Vaso (Litros):',
    rockallRate: 'Pós de Rocha Rockall (g/L):',
    rockallProportion: 'Proporção Recomendada de Rockall:',
    mild: '5 g/L (Suave)',
    recommended: '10 g/L (Recomendado)',
    intense: '15 g/L (Intenso)',
    strong: '20 g/L (Solo Vivo Reforçado)',
    total: 'Volume Total de Substrato a Preparar:',
    peat: 'Turfa de Esfagno (33%)',
    perlite: 'Perlita Expandida (33%)',
    humus: 'Húmus de Minhoca (30%)',
    biochar: 'Biochar (3%)',
    peatHint: 'Retenção de umidade e porosidade',
    perliteHint: 'Aeração e drenagem radicular',
    humusHint: 'Matéria orgânica e microbiologia',
    biocharHint: 'Habitat microbiano e CTC',
    rockallName: 'Pós de Rocha Rockall',
    rockallDesc: 'Remineralizador de solo rico em Silício (SiO₂), Cálcio, Magnésio e micronutrientes essenciais.',
    rockallAmount: 'Quantidade de Rockall:',
    instructions: 'Instruções de Preparo do Solo Vivo:',
    instructionSteps: [
      'Misture a Turfa (33%) e a Perlita (33%) secas em uma lona limpa até obter aeração uniforme.',
      'Adicione o Húmus de Minhoca (30%) e o Biochar (3%) devidamente ativado ou inoculado.',
      'Polvilhe uniformemente os {amount} de Pó de Rocha Rockall sobre a mistura e homogeneie completamente.',
      'Umedeça levemente o substrato com chá compostado ou inoculante microbiano (KNF / JADAM) e deixe descansar por 7 a 14 dias antes do plantio.',
    ],
    addDocTitle: 'Adicionar Novo PDF / Documento no Drive',
    docsTitle: 'Documentos & Links do Google Drive',
    addDoc: 'Adicionar Link Drive',
    docTitle: 'Título do Documento',
    category: 'Categoria',
    link: 'Link do Google Drive (URL)',
    desc: 'Descrição',
    cancel: 'Cancelar',
    save: 'Salvar',
    updated: 'Atualizado:',
    open: 'Abrir no Drive',
  },
  en: {
    substrateTitle: '4.3 Substrate Calculator & Living Soil Recipe',
    libraryTitle: '4.4 Document Library & Drive PDFs',
    description: 'Precision agronomic tools for building living organic soil and managing documents.',
    calcTitle: 'Substrate & Living Soil Recipe Calculator',
    formula: 'Organic formula',
    pots: 'Number of pots:',
    potVolume: 'Volume per pot (litres):',
    rockallRate: 'Rockall rock dust (g/L):',
    rockallProportion: 'Recommended Rockall rate:',
    mild: '5 g/L (mild)',
    recommended: '10 g/L (recommended)',
    intense: '15 g/L (intense)',
    strong: '20 g/L (fortified living soil)',
    total: 'Total substrate to prepare:',
    peat: 'Sphagnum peat (33%)',
    perlite: 'Expanded perlite (33%)',
    humus: 'Vermicompost (30%)',
    biochar: 'Biochar (3%)',
    peatHint: 'Moisture retention and porosity',
    perliteHint: 'Aeration and root drainage',
    humusHint: 'Organic matter and microbiology',
    biocharHint: 'Microbial habitat and CEC',
    rockallName: 'Rockall rock dust',
    rockallDesc: 'Soil remineraliser rich in silicon (SiO₂), calcium, magnesium and essential micronutrients.',
    rockallAmount: 'Rockall amount:',
    instructions: 'Living soil preparation instructions:',
    instructionSteps: [
      'Mix the dry Sphagnum peat (33%) and perlite (33%) on a clean tarp until evenly aerated.',
      'Add the vermicompost (30%) and the correctly activated or inoculated biochar (3%).',
      'Evenly dust the {amount} of Rockall rock dust over the mix and blend thoroughly.',
      'Lightly moisten the substrate with compost tea or a microbial inoculant (KNF / JADAM) and rest for 7 to 14 days before planting.',
    ],
    addDocTitle: 'Add a new Drive PDF / document',
    docsTitle: 'Google Drive documents & links',
    addDoc: 'Add Drive link',
    docTitle: 'Document title',
    category: 'Category',
    link: 'Google Drive link (URL)',
    desc: 'Description',
    cancel: 'Cancel',
    save: 'Save',
    updated: 'Updated:',
    open: 'Open in Drive',
  },
  es: {
    substrateTitle: '4.3 Calculadora de Sustrato y Receta de Suelo',
    libraryTitle: '4.4 Biblioteca de Documentos y PDFs de Drive',
    description: 'Herramientas agronómicas de precisión para preparar suelo orgánico vivo y gestionar documentos.',
    calcTitle: 'Calculadora de Sustrato y Receta de Suelo Vivo',
    formula: 'Fórmula orgánica',
    pots: 'Cantidad de macetas:',
    potVolume: 'Volumen por maceta (litros):',
    rockallRate: 'Polvo de roca Rockall (g/L):',
    rockallProportion: 'Proporción recomendada de Rockall:',
    mild: '5 g/L (suave)',
    recommended: '10 g/L (recomendado)',
    intense: '15 g/L (intenso)',
    strong: '20 g/L (suelo vivo reforzado)',
    total: 'Volumen total de sustrato a preparar:',
    peat: 'Turba de esfagno (33%)',
    perlite: 'Perlita expandida (33%)',
    humus: 'Humus de lombriz (30%)',
    biochar: 'Biochar (3%)',
    peatHint: 'Retención de humedad y porosidad',
    perliteHint: 'Aireación y drenaje radicular',
    humusHint: 'Materia orgánica y microbiología',
    biocharHint: 'Hábitat microbiano y CIC',
    rockallName: 'Polvo de roca Rockall',
    rockallDesc: 'Remineralizador de suelo rico en silicio (SiO₂), calcio, magnesio y micronutrientes esenciales.',
    rockallAmount: 'Cantidad de Rockall:',
    instructions: 'Instrucciones para preparar suelo vivo:',
    instructionSteps: [
      'Mezcle la turba de esfagno (33%) y la perlita (33%) secas sobre una lona limpia hasta obtener una aireación uniforme.',
      'Añada el humus de lombriz (30%) y el biochar (3%) debidamente activado o inoculado.',
      'Espolvoree uniformemente los {amount} de polvo de roca Rockall sobre la mezcla y homogeneice por completo.',
      'Humedezca ligeramente el sustrato con té de compost o inoculante microbiano (KNF / JADAM) y deje reposar de 7 a 14 días antes de plantar.',
    ],
    addDocTitle: 'Añadir un nuevo PDF / documento en Drive',
    docsTitle: 'Documentos y enlaces de Google Drive',
    addDoc: 'Añadir enlace de Drive',
    docTitle: 'Título del documento',
    category: 'Categoría',
    link: 'Enlace de Google Drive (URL)',
    desc: 'Descripción',
    cancel: 'Cancelar',
    save: 'Guardar',
    updated: 'Actualizado:',
    open: 'Abrir en Drive',
  },
  de: {
    substrateTitle: '4.3 Substrat- und Lebendboden-Rechner',
    libraryTitle: '4.4 Dokumentenbibliothek & Drive-PDFs',
    description: 'Agrarische Präzisionswerkzeuge für lebenden organischen Boden und Dokumentenverwaltung.',
    calcTitle: 'Substrat- und Lebendboden-Rezeptrechner',
    formula: 'Organische Formel',
    pots: 'Anzahl der Töpfe:',
    potVolume: 'Volumen pro Topf (Liter):',
    rockallRate: 'Rockall-Gesteinsmehl (g/L):',
    rockallProportion: 'Empfohlene Rockall-Menge:',
    mild: '5 g/L (mild)',
    recommended: '10 g/L (empfohlen)',
    intense: '15 g/L (intensiv)',
    strong: '20 g/L (verstärkter Lebendboden)',
    total: 'Gesamtes vorzubereitendes Substrat:',
    peat: 'Torfmoos (33%)',
    perlite: 'Blähton-Perlit (33%)',
    humus: 'Wurmhumus (30%)',
    biochar: 'Biochar (3%)',
    peatHint: 'Feuchtigkeitsspeicherung und Porosität',
    perliteHint: 'Belüftung und Wurzeldrainage',
    humusHint: 'Organische Substanz und Mikrobiologie',
    biocharHint: 'Mikrobieller Lebensraum und KAK',
    rockallName: 'Rockall-Gesteinsmehl',
    rockallDesc: 'Boden-Remineralisierer reich an Silizium (SiO₂), Kalzium, Magnesium und essenziellen Mikronährstoffen.',
    rockallAmount: 'Rockall-Menge:',
    instructions: 'Anleitung zur Herstellung von Lebendboden:',
    instructionSteps: [
      'Den trockenen Torf (33 %) und das Perlit (33 %) auf einer sauberen Plane gleichmäßig belüftet mischen.',
      'Den Wurmhumus (30 %) und den korrekt aktivierten oder inokulierten Biochar (3 %) zugeben.',
      'Die {amount} Rockall-Gesteinsmehl gleichmäßig über die Mischung streuen und vollständig homogenisieren.',
      'Das Substrat leicht mit Komposttee oder mikrobiologischem Inokulum (KNF / JADAM) befeuchten und vor dem Pflanzen 7 bis 14 Tage ruhen lassen.',
    ],
    addDocTitle: 'Neues Drive-PDF / Dokument hinzufügen',
    docsTitle: 'Google-Drive-Dokumente & Links',
    addDoc: 'Drive-Link hinzufügen',
    docTitle: 'Dokumenttitel',
    category: 'Kategorie',
    link: 'Google-Drive-Link (URL)',
    desc: 'Beschreibung',
    cancel: 'Abbrechen',
    save: 'Speichern',
    updated: 'Aktualisiert:',
    open: 'In Drive öffnen',
  },
};


interface ToolsViewProps {
  subCategory: ToolsSubMenu;
  documents: DriveDocument[];
  setDocuments: React.Dispatch<React.SetStateAction<DriveDocument[]>>;
  isAdmin: boolean;
  publishedDocumentIds: string[];
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  subCategory,
  documents,
  setDocuments,
  isAdmin,
  publishedDocumentIds,
}) => {
  const { lang } = useI18n();
  const term = useTerm();
  const c = COPY[lang];
  // Substrate Volume & Recipe State
  const [numPots, setNumPots] = useState<number>(12);
  const [potSizeLiters, setPotSizeLiters] = useState<number>(11);
  const [rockallDoseGramsPerLiter, setRockallDoseGramsPerLiter] = useState<number>(10); // 10g per Liter of substrate

  // Drive Doc Form State
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Geral');
  const [newDocDesc, setNewDocDesc] = useState('');
  const [newDocUrl, setNewDocUrl] = useState('');

  // Substrate Proportions (33% Turfa, 33% Perlita, 30% Húmus, 3% Biochar)
  const totalSubstrateLiters = numPots * potSizeLiters;
  const peatVolume = (totalSubstrateLiters * 0.33).toFixed(1);
  const perliteVolume = (totalSubstrateLiters * 0.33).toFixed(1);
  const humusVolume = (totalSubstrateLiters * 0.30).toFixed(1);
  const biocharVolume = (totalSubstrateLiters * 0.03).toFixed(1);

  // Rockall Rock Dust calculation
  const totalRockallGrams = Math.round(totalSubstrateLiters * rockallDoseGramsPerLiter);
  const rockallFormatted = totalRockallGrams >= 1000 
    ? `${(totalRockallGrams / 1000).toFixed(2)} kg` 
    : `${totalRockallGrams} g`;

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle || !newDocUrl) return;
    const doc: DriveDocument = {
      id: 'doc-' + Date.now(),
      title: newDocTitle,
      category: newDocCategory,
      description: newDocDesc,
      url: newDocUrl,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setDocuments([doc, ...documents]);
    setNewDocTitle('');
    setNewDocDesc('');
    setNewDocUrl('');
    setShowAddDoc(false);
  };

  const handleDeleteDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 p-4 rounded-2xl border border-emerald-800 shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-800/80 rounded-xl text-emerald-300 shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base text-emerald-100">
                {subCategory === 'substrato' && '4.3 Calculadora de Substrato & Receita de Solo'}
                {subCategory === 'biblioteca_drive' && '4.4 Biblioteca de Documentos & PDFs Drive Advanced Grower'}
              </h2>
              <p className="text-xs text-emerald-300/80 mt-0.5">
                {c.description}
              </p>
            </div>
          </div>

          {subCategory === 'biblioteca_drive' && isAdmin && (
            <button
              onClick={() => setShowAddDoc(!showAddDoc)}
              className="flex shrink-0 items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>{c.addDoc}</span>
            </button>
          )}
        </div>
      </div>

      {/* 4.3 SUBSTRATO & RECEITA DE SOLO */}
      {subCategory === 'substrato' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-5 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              {c.calcTitle}
            </h3>
            <span className="text-[11px] bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-800 font-semibold">
              {c.formula} Advanced Grower
            </span>
          </div>

          {/* Volume Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">{c.pots}</label>
              <input
                type="number"
                min="1"
                value={numPots}
                onChange={(e) => setNumPots(Math.max(1, Number(e.target.value) || 1))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-bold text-base focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">{c.potVolume}</label>
              <input
                type="number"
                min="1"
                value={potSizeLiters}
                onChange={(e) => setPotSizeLiters(Math.max(1, Number(e.target.value) || 1))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-bold text-base focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                <span>{c.rockallRate}</span>
                <span className="text-emerald-400 font-bold text-[11px]">{rockallDoseGramsPerLiter} g/L</span>
              </label>
              <div className="flex gap-1.5">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={rockallDoseGramsPerLiter}
                  onChange={(e) => setRockallDoseGramsPerLiter(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-bold text-base focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Rockall Preset Quick Buttons */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              <span>{c.rockallProportion}</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setRockallDoseGramsPerLiter(5)}
                className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                  rockallDoseGramsPerLiter === 5
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {c.mild}
              </button>
              <button
                type="button"
                onClick={() => setRockallDoseGramsPerLiter(10)}
                className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                  rockallDoseGramsPerLiter === 10
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {c.recommended}
              </button>
              <button
                type="button"
                onClick={() => setRockallDoseGramsPerLiter(15)}
                className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                  rockallDoseGramsPerLiter === 15
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {c.intense}
              </button>
              <button
                type="button"
                onClick={() => setRockallDoseGramsPerLiter(20)}
                className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                  rockallDoseGramsPerLiter === 20
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {c.strong}
              </button>
            </div>
          </div>

          {/* Results Display */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-emerald-300 border-b border-slate-800 pb-2">
              <span>{c.total}</span>
              <span className="text-lg text-emerald-400">{totalSubstrateLiters} Litros</span>
            </div>

            {/* Component Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/90 space-y-1">
                <span className="text-slate-400 block font-medium">{c.peat}</span>
                <span className="font-bold text-emerald-400 text-xl block">{peatVolume} L</span>
                <span className="text-[10px] text-slate-400 block">{c.peatHint}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/90 space-y-1">
                <span className="text-slate-400 block font-medium">{c.perlite}</span>
                <span className="font-bold text-emerald-400 text-xl block">{perliteVolume} L</span>
                <span className="text-[10px] text-slate-400 block">{c.perliteHint}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/90 space-y-1">
                <span className="text-slate-400 block font-medium">{c.humus}</span>
                <span className="font-bold text-emerald-400 text-xl block">{humusVolume} L</span>
                <span className="text-[10px] text-slate-400 block">{c.humusHint}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/90 space-y-1">
                <span className="text-slate-400 block font-medium">{c.biochar}</span>
                <span className="font-bold text-emerald-400 text-xl block">{biocharVolume} L</span>
                <span className="text-[10px] text-slate-400 block">{c.biocharHint}</span>
              </div>
            </div>

            {/* Mineral Additive - Rockall Rock Dust Banner */}
            <div className="p-3.5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 rounded-xl border border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-900/50 rounded-lg text-amber-300 shrink-0">
                  <Mountain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                    <span>{c.rockallName}</span>
                    <span className="text-[10px] text-amber-300 font-normal">({rockallDoseGramsPerLiter} g por Litro)</span>
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    {c.rockallDesc}
                  </p>
                </div>
              </div>
              <div className="bg-amber-950/80 px-4 py-2 rounded-xl border border-amber-700/80 shrink-0 self-end sm:self-auto text-right">
                <span className="text-[10px] text-amber-200/80 block uppercase font-medium">{c.rockallAmount}</span>
                <span className="text-xl font-extrabold text-amber-300 block">{rockallFormatted}</span>
              </div>
            </div>
          </div>

          {/* Dicas de Mistura e Homogeneização */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-900/70 rounded-xl space-y-2">
            <h4 className="font-bold text-xs text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Instruções de Preparo do Solo Vivo Advanced Grower:</span>
            </h4>
            <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1 leading-relaxed">
              <li>Misture a <strong>Turfa (33%)</strong> e a <strong>Perlita (33%)</strong> secas em uma lona limpa até obter aeração uniforme.</li>
              <li>Adicione o <strong>{c.humus}</strong> e o <strong>{c.biochar}</strong> devidamente ativado ou inoculado.</li>
              <li>Polvilhe uniformemente os <strong>{rockallFormatted} de Pó de Rocha Rockall</strong> sobre a mistura e homogeneie completamente.</li>
              <li>Umedeça levemente o substrato com chá compostado ou inoculante microbiano (KNF / JADAM) e deixe descansar por 7 a 14 dias antes do plantio.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 4.4 BIBLIOTECA DE DOCUMENTOS DRIVE */}
      {subCategory === 'biblioteca_drive' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {c.docsTitle}
            </h3>
          </div>

          {/* Add Doc Form */}
          {showAddDoc && (
            <form
              onSubmit={handleAddDoc}
              className="bg-slate-900 border border-emerald-600/80 rounded-2xl p-4 text-xs space-y-3 shadow-lg"
            >
              <h4 className="font-bold text-sm text-emerald-400">{c.addDocTitle}</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{c.docTitle}</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Laudo Científico de Terpenos"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">{c.category}</label>
                  <input
                    type="text"
                    required
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">{c.link}</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/..."
                  value={newDocUrl}
                  onChange={(e) => setNewDocUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">{c.desc}</label>
                <textarea
                  rows={2}
                  value={newDocDesc}
                  onChange={(e) => setNewDocDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDoc(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl"
                >
                  {c.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-xl"
                >
                  {c.save}
                </button>
              </div>
            </form>
          )}

          {/* List of Drive Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-sm hover:border-slate-700 transition"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800 uppercase">
                    {doc.category}
                  </span>
                  <h4 className="font-bold text-sm text-slate-100 mt-1">{doc.title}</h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{doc.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-400">{c.updated} {doc.updatedAt}</span>
                  <div className="flex items-center gap-2">
                    {isAdmin && !publishedDocumentIds.includes(doc.id) && (
                      <button
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="p-1 text-slate-500 hover:text-rose-400"
                        title="Excluir Link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition"
                    >
                      <span>{c.open}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
