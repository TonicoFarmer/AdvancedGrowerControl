import React, { useState } from 'react';
import { KnfJadamRecipe } from '../types';
import { Leaf, Calculator, Sparkles, Check, ChevronRight, BookOpen } from 'lucide-react';
import { useI18n, useTerm } from '../i18n';

const COPY = {
  pt: {
    title: '1.3 Métodos KNF (Korean Natural Farming), KYUSEI e JADAM',
    description: 'Técnicas agroecológicas de alta eficiência, bioinsumos produzidos na própria associação e sem insumos sintéticos de petróleo.',
    calcTitle: 'Calculadora de Dosagem para Pulverização / Fertirrigação',
    calcHint: 'Insira o volume do tanque ou pulverizador em Litros para dosar automaticamente:',
    tank: 'Volume Tanque:',
    liters: 'Litros',
    all: 'Todos os Métodos',
    collapse: 'Recolher',
    show: 'Ver Receita',
    dosage: 'Dosagem Calculada para',
    ofWater: 'Litros de Água',
    add: 'Adicionar ~',
    addOf: 'de',
    standard: 'Padrão:',
    ingredients: 'Ingredientes e Proporção de Preparo',
    steps: 'Passo a Passo de Fermentação & Extração',
    benefits: 'Benefícios no Cultivo de Cannabis',
  },
  en: {
    title: '1.3 KNF (Korean Natural Farming), KYUSEI and JADAM Methods',
    description: 'High-efficiency agroecological techniques and bioinputs produced on the association itself, without synthetic petroleum inputs.',
    calcTitle: 'Spray / Fertigation Dosing Calculator',
    calcHint: 'Enter the tank or sprayer volume in litres to calculate the dose automatically:',
    tank: 'Tank volume:',
    liters: 'Litres',
    all: 'All methods',
    collapse: 'Collapse',
    show: 'View recipe',
    dosage: 'Calculated dose for',
    ofWater: 'litres of water',
    add: 'Add ~',
    addOf: 'of',
    standard: 'Standard:',
    ingredients: 'Ingredients and preparation ratio',
    steps: 'Fermentation & extraction steps',
    benefits: 'Benefits for cannabis cultivation',
  },
  es: {
    title: '1.3 Métodos KNF (Korean Natural Farming), KYUSEI y JADAM',
    description: 'Técnicas agroecológicas de alta eficiencia y bioinsumos producidos en la propia asociación, sin insumos sintéticos derivados del petróleo.',
    calcTitle: 'Calculadora de dosis para pulverización / fertirriego',
    calcHint: 'Introduzca el volumen del tanque o pulverizador en litros para calcular la dosis automáticamente:',
    tank: 'Volumen del tanque:',
    liters: 'Litros',
    all: 'Todos los métodos',
    collapse: 'Contraer',
    show: 'Ver receta',
    dosage: 'Dosis calculada para',
    ofWater: 'litros de agua',
    add: 'Añadir ~',
    addOf: 'de',
    standard: 'Estándar:',
    ingredients: 'Ingredientes y proporción de preparación',
    steps: 'Paso a paso de fermentación y extracción',
    benefits: 'Beneficios en el cultivo de cannabis',
  },
  de: {
    title: '1.3 KNF (Korean Natural Farming), KYUSEI und JADAM',
    description: 'Hocheffiziente agroökologische Techniken und auf dem Betrieb selbst hergestellte Bioinputs – ohne synthetische Erdölderivate.',
    calcTitle: 'Dosierrechner für Spritzung / Fertigation',
    calcHint: 'Tank- oder Sprühgerätevolumen in Litern eingeben, um die Dosis automatisch zu berechnen:',
    tank: 'Tankvolumen:',
    liters: 'Liter',
    all: 'Alle Methoden',
    collapse: 'Einklappen',
    show: 'Rezept ansehen',
    dosage: 'Berechnete Dosis für',
    ofWater: 'Liter Wasser',
    add: 'Zugeben ~',
    addOf: 'von',
    standard: 'Standard:',
    ingredients: 'Zutaten und Mischungsverhältnis',
    steps: 'Schritt-für-Schritt-Anleitung zur Fermentation & Extraktion',
    benefits: 'Vorteile im Cannabis-Anbau',
  },
};


interface KnfJadamSectionProps {
  recipes: KnfJadamRecipe[];
}

export const KnfJadamSection: React.FC<KnfJadamSectionProps> = ({ recipes }) => {
  const { lang } = useI18n();
  const term = useTerm();
  const c = COPY[lang];
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [targetVolumeLiters, setTargetVolumeLiters] = useState<number>(10);
  const [expandedId, setExpandedId] = useState<string | null>(recipes[0]?.id || null);

  const filtered = recipes.filter(
    (r) => selectedMethod === 'all' || r.method === selectedMethod
  );

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 p-4 rounded-2xl border border-emerald-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-800/80 rounded-xl text-emerald-300 shrink-0">
            <Leaf className="w-6 h-6" />
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

      {/* Interactive Volume Batch Calculator Bar */}
      <div className="bg-slate-900 border border-emerald-800/80 rounded-2xl p-4 text-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-emerald-300">
                {c.calcTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {c.calcHint}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-medium text-slate-300 whitespace-nowrap">{c.tank}</span>
            <input
              type="number"
              min="1"
              max="1000"
              value={targetVolumeLiters}
              onChange={(e) => setTargetVolumeLiters(Math.max(1, Number(e.target.value)))}
              className="w-24 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-center font-bold text-emerald-400 text-sm focus:outline-none focus:border-emerald-500"
            />
            <span className="text-xs text-slate-400">{c.liters}</span>
          </div>
        </div>
      </div>

      {/* Method Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {['all', 'KNF', 'JADAM', 'KYUSEI EM'].map((method) => (
          <button
            key={method}
            onClick={() => setSelectedMethod(method)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedMethod === method
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {method === 'all' ? c.all : method}
          </button>
        ))}
      </div>

      {/* Recipe List */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((recipe) => {
          const isExpanded = expandedId === recipe.id;

          // Calculate dosage for target volume
          // Extract ratio e.g., 1:1000 or 1:500
          let dosageMl = targetVolumeLiters * 1; // Default 1ml/L
          if (recipe.applicationDosage.includes('1:500')) dosageMl = targetVolumeLiters * 2;
          if (recipe.applicationDosage.includes('10 a 15 mL')) dosageMl = targetVolumeLiters * 12.5;
          if (recipe.applicationDosage.includes('2 mL a 5 mL')) dosageMl = targetVolumeLiters * 3.5;

          return (
            <div
              key={recipe.id}
              className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-200 ${
                isExpanded ? 'border-emerald-500 ring-1 ring-emerald-500/40' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : recipe.id)}
                className="p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">
                      {recipe.method}
                    </span>
                    <h3 className="font-bold text-sm text-slate-100">{recipe.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{recipe.description}</p>
                </div>

                <span className="text-xs text-emerald-400 font-semibold px-2.5 py-1 bg-emerald-950 rounded-lg border border-emerald-800 shrink-0">
                  {isExpanded ? c.collapse : c.show}
                </span>
              </div>

              {isExpanded && (
                <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-xs space-y-4">
                  {/* Dosagem Calculada */}
                  <div className="p-3 bg-emerald-950/80 border border-emerald-600/60 rounded-xl flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">
                        {c.dosage} {targetVolumeLiters} {c.ofWater}
                      </span>
                      <span className="text-sm font-bold text-white mt-0.5 block">
                        {c.add} <span className="text-amber-300 text-base">{dosageMl.toFixed(1)} mL</span> {c.addOf} {recipe.name.split(' - ')[0]}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-200/80 italic font-medium">
                      {c.standard} {recipe.applicationDosage}
                    </span>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h4 className="font-bold text-emerald-400 text-xs uppercase mb-1.5">
                      {c.ingredients}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {recipe.ingredients.map((ing, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                          <span className="text-slate-200 font-medium">{ing.name}</span>
                          <span className="text-emerald-300 font-bold ml-2 shrink-0">{ing.ratio}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="font-bold text-emerald-400 text-xs uppercase mb-1.5">
                      {c.steps}
                    </h4>
                    <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
                      {recipe.steps.map((st, idx) => (
                        <li key={idx} className="leading-relaxed">{st}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Benefits */}
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                    <h4 className="font-bold text-emerald-300 text-xs mb-1">
                      {c.benefits}
                    </h4>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                      {recipe.benefits.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
