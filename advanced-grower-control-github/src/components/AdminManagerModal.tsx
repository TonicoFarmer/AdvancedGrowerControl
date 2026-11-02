import React, { useState, useEffect } from 'react';
import { X, Save, Shield, Plus } from 'lucide-react';
import { NutritionalDeficiency, PestPois, BioInput } from '../types';
import { DRIVE_DEFICIENCIES_PDF } from '../data/deficiencies';
import { DRIVE_PESTS_PDF } from '../data/pests';

const DEFAULT_DEFICIENCY_IMAGE = 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80';
const DEFAULT_PEST_IMAGE = 'https://images.unsplash.com/photo-1599598425947-320f3299c853?auto=format&fit=crop&w=600&q=80';

/** Converte textarea (1 item por linha) em lista, descartando linhas vazias. */
const splitLines = (text: string): string[] => text.split('\n').map((line) => line.trim()).filter(Boolean);

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: NutritionalDeficiency | PestPois | BioInput | null;
  onSaveDeficiency?: (item: NutritionalDeficiency) => void;
  onSavePest?: (item: PestPois) => void;
  onSaveBioInput?: (item: BioInput) => void;
  mode: 'deficiency' | 'pest' | 'bioinput';
}

export const AdminManagerModal: React.FC<AdminManagerModalProps> = ({
  isOpen,
  onClose,
  editingItem,
  onSaveDeficiency,
  onSavePest,
  onSaveBioInput,
  mode,
}) => {
  // Os hooks ficam antes de qualquer return condicional: a ordem dos hooks não pode
  // mudar quando o modal abre/fecha (React exige ordem estável entre renders).
  // Form states depending on mode
  const [element, setElement] = useState('');
  const [symbol, setSymbol] = useState('');
  const [type, setType] = useState<'Macro' | 'Secundário' | 'Micro'>('Macro');
  const [mobility, setMobility] = useState<'Móvel' | 'Imóvel' | 'Parcialmente Móvel'>('Móvel');
  const [targetLeaves, setTargetLeaves] = useState<'Folhas Velhas (Inferiores)' | 'Folhas Novas (Superiores)' | 'Toda a Planta'>('Folhas Velhas (Inferiores)');
  const [symptomsText, setSymptomsText] = useState('');
  const [causesText, setCausesText] = useState('');
  const [organicText, setOrganicText] = useState('');
  const [mineralText, setMineralText] = useState('');
  const [astrayaTips, setAstrayaTips] = useState('');

  // Pest state
  const [pestName, setPestName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [category, setCategory] = useState<'Ácaro' | 'Inseto Sugador' | 'Lagarta/Broca' | 'Fungo/Bactéria' | 'Praga do Solo' | 'Nematoide'>('Ácaro');
  const [identification, setIdentification] = useState('');
  const [damageSymptomsText, setDamageSymptomsText] = useState('');
  const [preventionText, setPreventionText] = useState('');
  const [bioControlText, setBioControlText] = useState('');
  const [organicRecipesText, setOrganicRecipesText] = useState('');
  const [chemicalMineralText, setChemicalMineralText] = useState('');
  const [severity, setSeverity] = useState<'Alta' | 'Média' | 'Baixa'>('Média');

  // Bioinput state
  const [prodName, setProdName] = useState('');
  const [activeAgent, setActiveAgent] = useState('');
  const [bioCat, setBioCat] = useState<'Biofungicida' | 'Bioinseticida' | 'Inoculante' | 'Bioestimulante' | 'Bionematicida'>('Biofungicida');
  const [dosage, setDosage] = useState('');
  const [targetPest, setTargetPest] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (editingItem && mode === 'deficiency') {
      const d = editingItem as NutritionalDeficiency;
      setElement(d.element || '');
      setSymbol(d.symbol || '');
      setType(d.type || 'Macro');
      setMobility(d.mobility || 'Móvel');
      setTargetLeaves(d.targetLeaves || 'Folhas Velhas (Inferiores)');
      setSymptomsText((d.symptoms || []).join('\n'));
      setCausesText((d.causes || []).join('\n'));
      setOrganicText((d.correctiveOrganic || []).join('\n'));
      setMineralText((d.correctiveMineral || []).join('\n'));
      setAstrayaTips(d.astrayaTips || '');
    } else if (editingItem && mode === 'pest') {
      const p = editingItem as PestPois;
      setPestName(p.name || '');
      setScientificName(p.scientificName || '');
      setCategory(p.category || 'Ácaro');
      setIdentification(p.identification || '');
      setDamageSymptomsText((p.damageSymptoms || []).join('\n'));
      setPreventionText((p.prevention || []).join('\n'));
      setBioControlText((p.biologicalControl || []).join('\n'));
      setOrganicRecipesText((p.organicRecipes || []).join('\n'));
      setChemicalMineralText((p.chemicalOrMineral || []).join('\n'));
      setSeverity(p.severity || 'Média');
    } else if (editingItem && mode === 'bioinput') {
      const b = editingItem as BioInput;
      setProdName(b.productName || '');
      setActiveAgent(b.activeAgent || '');
      setBioCat(b.category || 'Biofungicida');
      setDosage(b.dosage || '');
      setTargetPest(b.targetPestOrDisease || '');
      setNotes(b.astrayaNotes || '');
    } else {
      // Cadastro novo: limpa todos os campos para não herdar o item editado anteriormente.
      setElement('');
      setSymbol('');
      setType('Macro');
      setMobility('Móvel');
      setTargetLeaves('Folhas Velhas (Inferiores)');
      setSymptomsText('');
      setCausesText('');
      setOrganicText('');
      setMineralText('');
      setAstrayaTips('');
      setPestName('');
      setScientificName('');
      setCategory('Ácaro');
      setIdentification('');
      setDamageSymptomsText('');
      setPreventionText('');
      setBioControlText('');
      setOrganicRecipesText('');
      setChemicalMineralText('');
      setSeverity('Média');
      setProdName('');
      setActiveAgent('');
      setBioCat('Biofungicida');
      setDosage('');
      setTargetPest('');
      setNotes('');
    }
  }, [editingItem, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'deficiency' && onSaveDeficiency) {
      const existing = editingItem as NutritionalDeficiency | null;
      // Spread do item original: campos que o formulário não edita (microrganismos,
      // plantas companheiras, figuras, PDF, imagens) são preservados, nunca zerados.
      const updated: NutritionalDeficiency = {
        ...(existing ?? {}),
        id: existing?.id || 'def-' + Date.now(),
        element,
        symbol,
        type,
        mobility,
        targetLeaves,
        symptoms: splitLines(symptomsText),
        causes: splitLines(causesText),
        correctiveOrganic: splitLines(organicText),
        correctiveMineral: splitLines(mineralText),
        solubilizingMicroorganisms: existing?.solubilizingMicroorganisms ?? [],
        companionPlants: existing?.companionPlants ?? [],
        astrayaTips,
        imageUrl: existing?.imageUrl || DEFAULT_DEFICIENCY_IMAGE,
        images: existing?.images ?? [],
        figures: existing?.figures ?? [],
        pdfDriveUrl: existing?.pdfDriveUrl || DRIVE_DEFICIENCIES_PDF,
      };
      onSaveDeficiency(updated);
    } else if (mode === 'pest' && onSavePest) {
      const existing = editingItem as PestPois | null;
      const updated: PestPois = {
        ...(existing ?? {}),
        id: existing?.id || 'pest-' + Date.now(),
        name: pestName,
        scientificName,
        category,
        identification,
        damageSymptoms: splitLines(damageSymptomsText),
        prevention: splitLines(preventionText),
        biologicalControl: splitLines(bioControlText),
        organicRecipes: splitLines(organicRecipesText),
        chemicalOrMineral: splitLines(chemicalMineralText),
        severity,
        imageUrl: existing?.imageUrl || DEFAULT_PEST_IMAGE,
        images: existing?.images ?? [],
        pdfDriveUrl: existing?.pdfDriveUrl || DRIVE_PESTS_PDF,
      };
      onSavePest(updated);
    } else if (mode === 'bioinput' && onSaveBioInput) {
      const existing = editingItem as BioInput | null;
      const updated: BioInput = {
        ...(existing ?? {}),
        id: existing?.id || 'bio-' + Date.now(),
        productName: prodName,
        activeAgent,
        category: bioCat,
        dosage,
        targetPestOrDisease: targetPest,
        astrayaNotes: notes,
      };
      onSaveBioInput(updated);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 text-slate-100">
        <div className="p-4 bg-amber-500 text-slate-950 flex items-center justify-between font-bold text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>
              {editingItem ? 'Editar Parâmetro Advanced Grower' : 'Novo Parâmetro - Modo Admin'}
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-900 hover:bg-amber-400 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {mode === 'deficiency' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nutriente (ex: Nitrogênio)</label>
                  <input
                    type="text"
                    required
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Símbolo (ex: N)</label>
                  <input
                    type="text"
                    required
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tipo</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Macro">Macro</option>
                    <option value="Secundário">Secundário</option>
                    <option value="Micro">Micro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Mobilidade</label>
                  <select
                    value={mobility}
                    onChange={(e) => setMobility(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Móvel">Móvel</option>
                    <option value="Imóvel">Imóvel</option>
                    <option value="Parcialmente Móvel">Parcialmente Móvel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Região da Folha</label>
                  <select
                    value={targetLeaves}
                    onChange={(e) => setTargetLeaves(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Folhas Velhas (Inferiores)">Folhas Velhas</option>
                    <option value="Folhas Novas (Superiores)">Folhas Novas</option>
                    <option value="Toda a Planta">Toda a Planta</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Sintomas (1 por linha)</label>
                <textarea
                  rows={3}
                  value={symptomsText}
                  onChange={(e) => setSymptomsText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Causas e Bloqueios (1 por linha)</label>
                <textarea
                  rows={2}
                  value={causesText}
                  onChange={(e) => setCausesText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Correção Orgânica & KNF (1 por linha)</label>
                <textarea
                  rows={2}
                  value={organicText}
                  onChange={(e) => setOrganicText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Correção Mineral (1 por linha)</label>
                <textarea
                  rows={2}
                  value={mineralText}
                  onChange={(e) => setMineralText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Dica Técnica Advanced Grower</label>
                <textarea
                  rows={2}
                  value={astrayaTips}
                  onChange={(e) => setAstrayaTips(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>
            </>
          )}

          {mode === 'pest' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nome da Praga (ex: Ácaro do Teto)</label>
                  <input
                    type="text"
                    required
                    value={pestName}
                    onChange={(e) => setPestName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nome Científico (ex: Tetranychus urticae)</label>
                  <input
                    type="text"
                    value={scientificName}
                    onChange={(e) => setScientificName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Ácaro">Ácaro</option>
                    <option value="Inseto Sugador">Inseto Sugador</option>
                    <option value="Lagarta/Broca">Lagarta/Broca</option>
                    <option value="Fungo/Bactéria">Fungo/Bactéria</option>
                    <option value="Praga do Solo">Praga do Solo</option>
                    <option value="Nematoide">Nematoide</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Gravidade</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Identificação / Sinais de Campo</label>
                <textarea
                  rows={3}
                  value={identification}
                  onChange={(e) => setIdentification(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Sintomas de Dano (1 por linha)</label>
                <textarea
                  rows={3}
                  value={damageSymptomsText}
                  onChange={(e) => setDamageSymptomsText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Prevenção (1 por linha)</label>
                <textarea
                  rows={2}
                  value={preventionText}
                  onChange={(e) => setPreventionText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Controle Biológico (1 por linha)</label>
                <textarea
                  rows={2}
                  value={bioControlText}
                  onChange={(e) => setBioControlText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Receitas Orgânicas / JADAM (1 por linha)</label>
                <textarea
                  rows={2}
                  value={organicRecipesText}
                  onChange={(e) => setOrganicRecipesText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Correção Mineral / Química (1 por linha)</label>
                <textarea
                  rows={2}
                  value={chemicalMineralText}
                  onChange={(e) => setChemicalMineralText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>
            </>
          )}

          {mode === 'bioinput' && (
            <>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nome do Produto</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Agente Ativo (ex: Trichoderma harzianum)</label>
                <input
                  type="text"
                  required
                  value={activeAgent}
                  onChange={(e) => setActiveAgent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Categoria</label>
                  <select
                    value={bioCat}
                    onChange={(e) => setBioCat(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Biofungicida">Biofungicida</option>
                    <option value="Bioinseticida">Bioinseticida</option>
                    <option value="Inoculante">Inoculante</option>
                    <option value="Bioestimulante">Bioestimulante</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Dosagem Recomendada</label>
                  <input
                    type="text"
                    required
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Alvo Principal (Praga / Fungo)</label>
                <input
                  type="text"
                  required
                  value={targetPest}
                  onChange={(e) => setTargetPest(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Nota da Advanced Grower</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl shadow flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
