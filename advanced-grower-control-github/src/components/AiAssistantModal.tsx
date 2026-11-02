import React, { useState } from 'react';
import { X, Sparkles, Send, Image as ImageIcon, RefreshCw, CheckCircle2, Copy, Check, AlertCircle } from 'lucide-react';
import { useI18n, useTerm } from '../i18n';

const COPY = {
  pt: {
    title: 'IA Agronômica',
    subtitle: 'Assistente Especializado em Cannabis Medicinal, Nutrição, MIP & Agricultura Natural',
    status: 'Ativo',
    suggestions: 'Sugestões rápidas de consulta:',
    stage: 'Fase Fenológica da Planta',
    photo: 'Foto da Folha / Praga / Solo',
    upload: 'Carregar Imagem',
    change: 'Alterar Foto',
    remove: 'Remover',
    attached: 'Imagem anexada para diagnose visual',
    attachedHint: 'A IA analisará padrões de clorose, necrose ou infestação na imagem.',
    question: 'Qual a sua dúvida técnica ou sintoma observado?',
    placeholder: 'Exemplo: Folhas inferiores com amarelecimento intervenal e pontas queimadas em solo vivo, regado a pH 6.3...',
    submit: 'Consultar IA Agronômica',
    loading: 'Processando Diagnóstico com IA...',
    failure: 'Falha ao obter diagnóstico:',
    retry: 'Tentar Novamente',
    responseTitle: 'Diagnóstico e Parecer Técnico:',
    copied: 'Copiado!',
    copy: 'Copiar',
    close: 'Fechar',
    previewAlt: 'Pré-visualização',
    copyTitle: 'Copiar resposta',
    errorCommunication: 'Erro na comunicação com a IA Agronômica.',
    errorConnection: 'Erro de conexão com o servidor. Verifique sua rede e tente novamente.',
    prompts: [
      'Como identificar e corrigir deficiência de Nitrogênio e Magnésio?',
      'Como preparar e aplicar JMS e JWA (JADAM) no cultivo orgânico?',
      'Manejo integrado de pragas contra ácaros rajados na floração',
      'Qual a faixa ideal de VPD e umidade para evitar Botrytis em floração?',
      'Como calcular a relação Ca:Mg:K ideal na análise de solo?',
    ],
    stages: ['Clones / Mudas', 'Vegetativo', 'Floração Inicial (Semanas 1-3)', 'Floração Avançada (Semanas 4-7)', 'Maturação / Flush'],
  },
  en: {
    title: 'Agronomic AI',
    subtitle: 'Specialist assistant for medicinal cannabis, nutrition, IPM and natural farming',
    status: 'Active',
    suggestions: 'Quick consultation prompts:',
    stage: 'Plant growth stage',
    photo: 'Leaf / pest / soil photo',
    upload: 'Upload image',
    change: 'Change photo',
    remove: 'Remove',
    attached: 'Image attached for visual diagnosis',
    attachedHint: 'The AI will analyse chlorosis, necrosis or infestation patterns in the image.',
    question: 'What is your technical question or observed symptom?',
    placeholder: 'Example: lower leaves with interveinal yellowing and burnt tips in living soil, watered at pH 6.3...',
    submit: 'Consult the agronomic AI',
    loading: 'Processing AI diagnosis...',
    failure: 'Could not obtain a diagnosis:',
    retry: 'Try again',
    responseTitle: 'Diagnosis and technical opinion:',
    copied: 'Copied!',
    copy: 'Copy',
    close: 'Close',
    previewAlt: 'Preview',
    copyTitle: 'Copy response',
    errorCommunication: 'Error communicating with the agronomic AI.',
    errorConnection: 'Connection error with the server. Check your network and try again.',
    prompts: [
      'How do I identify and correct nitrogen and magnesium deficiency?',
      'How do I prepare and apply JMS and JWA (JADAM) in organic cultivation?',
      'Integrated pest management for spider mites during flowering',
      'What is the ideal VPD and humidity range to prevent Botrytis in flowering?',
      'How do I calculate the ideal Ca:Mg:K ratio in a soil analysis?',
    ],
    stages: ['Clones / seedlings', 'Vegetative', 'Early flowering (weeks 1-3)', 'Late flowering (weeks 4-7)', 'Ripening / flush'],
  },
  es: {
    title: 'IA Agronómica',
    subtitle: 'Asistente especializado en cannabis medicinal, nutrición, MIP y agricultura natural',
    status: 'Activa',
    suggestions: 'Sugerencias rápidas de consulta:',
    stage: 'Fase fenológica de la planta',
    photo: 'Foto de hoja / plaga / suelo',
    upload: 'Cargar imagen',
    change: 'Cambiar foto',
    remove: 'Eliminar',
    attached: 'Imagen adjunta para diagnóstico visual',
    attachedHint: 'La IA analizará patrones de clorosis, necrosis o infestación en la imagen.',
    question: '¿Cuál es su duda técnica o síntoma observado?',
    placeholder: 'Ejemplo: hojas inferiores con amarillamiento entre nervios y puntas quemadas en suelo vivo, regado a pH 6,3...',
    submit: 'Consultar la IA agronómica',
    loading: 'Procesando diagnóstico con IA...',
    failure: 'No se pudo obtener el diagnóstico:',
    retry: 'Intentar de nuevo',
    responseTitle: 'Diagnóstico y dictamen técnico:',
    copied: '¡Copiado!',
    copy: 'Copiar',
    close: 'Cerrar',
    previewAlt: 'Vista previa',
    copyTitle: 'Copiar respuesta',
    errorCommunication: 'Error de comunicación con la IA agronómica.',
    errorConnection: 'Error de conexión con el servidor. Compruebe su red e inténtelo de nuevo.',
    prompts: [
      '¿Cómo identificar y corregir la deficiencia de nitrógeno y magnesio?',
      '¿Cómo preparar y aplicar JMS y JWA (JADAM) en cultivo orgánico?',
      'Manejo integrado de plagas contra ácaros en floración',
      '¿Cuál es el rango ideal de VPD y humedad para evitar Botrytis en floración?',
      '¿Cómo calcular la relación Ca:Mg:K ideal en un análisis de suelo?',
    ],
    stages: ['Clones / plántulas', 'Vegetativo', 'Floración inicial (semanas 1-3)', 'Floración avanzada (semanas 4-7)', 'Maduración / lavado'],
  },
  de: {
    title: 'Agrar-KI',
    subtitle: 'Fachassistent für medizinisches Cannabis, Ernährung, IPM und natürliche Landwirtschaft',
    status: 'Aktiv',
    suggestions: 'Schnelle Fragevorschläge:',
    stage: 'Phänologische Phase der Pflanze',
    photo: 'Foto von Blatt / Schädling / Boden',
    upload: 'Bild hochladen',
    change: 'Foto ändern',
    remove: 'Entfernen',
    attached: 'Bild für die visuelle Diagnose angehängt',
    attachedHint: 'Die KI analysiert Chlorose-, Nekrose- oder Befallsmuster im Bild.',
    question: 'Was ist Ihre technische Frage oder das beobachtete Symptom?',
    placeholder: 'Beispiel: untere Blätter mit interveinaler Gelbfärbung und verbrannten Spitzen in Lebendboden, pH 6,3...',
    submit: 'Agrar-KI fragen',
    loading: 'KI-Diagnose wird verarbeitet...',
    failure: 'Diagnose konnte nicht abgerufen werden:',
    retry: 'Erneut versuchen',
    responseTitle: 'Diagnose und Fachgutachten:',
    copied: 'Kopiert!',
    copy: 'Kopieren',
    close: 'Schließen',
    previewAlt: 'Vorschau',
    copyTitle: 'Antwort kopieren',
    errorCommunication: 'Kommunikationsfehler mit der Agrar-KI.',
    errorConnection: 'Verbindungsfehler zum Server. Prüfen Sie Ihr Netzwerk und versuchen Sie es erneut.',
    prompts: [
      'Wie erkenne und behebe ich Stickstoff- und Magnesiummangel?',
      'Wie bereite ich JMS und JWA (JADAM) im organischen Anbau zu und wende sie an?',
      'Integriertes Schädlingsmanagement gegen Spinnmilben in der Blüte',
      'Welcher VPD- und Feuchtigkeitsbereich verhindert Botrytis in der Blüte?',
      'Wie berechne ich das ideale Ca:Mg:K-Verhältnis in der Bodenanalyse?',
    ],
    stages: ['Stecklinge / Sämlinge', 'Vegetativ', 'Frühe Blüte (Wochen 1-3)', 'Späte Blüte (Wochen 4-7)', 'Reife / Spülen'],
  },
};


interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  'Como identificar e corrigir deficiência de Nitrogênio e Magnésio?',
  'Como preparar e aplicar JMS e JWA (JADAM) no cultivo orgânico?',
  'Manejo integrado de pragas contra ácaros rajados na floração',
  'Qual a faixa ideal de VPD e umidade para evitar Botrytis em floração?',
  'Como calcular a relação Ca:Mg:K ideal na análise de solo?',
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang, t } = useI18n();
  const term = useTerm();
  const c = COPY[lang];
  // Hooks sempre na mesma ordem: o return condicional fica depois deles.
  const [prompt, setPrompt] = useState('');
  const [plantStage, setPlantStage] = useState('Vegetativo');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [engine, setEngine] = useState<'3.5' | '3.8'>('3.5');

  if (!isOpen) return null;

  const handleAsk = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const query = (customPrompt ?? prompt).trim();
    if (!query) return;

    if (customPrompt) {
      setPrompt(customPrompt);
    }

    setLoading(true);
    setResponse(null);
    setErrorMessage(null);
    setCopied(false);

    try {
      const res = await fetch('/api/ai/diagnose', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'Diagnóstico Agronômico Especializado Advanced Grower',
          prompt: query,
          plantStage,
          model: engine === '3.8' ? 'gemini-3.8-flash' : 'gemini-3.5-flash',
          imageBase64: selectedImage,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMessage(data.error || 'Erro na comunicação com a IA Agronômica.');
      } else {
        setResponse(data.text);
      }
    } catch (err: any) {
      setErrorMessage('Erro de conexão com o servidor. Verifique sua rede e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-0 my-8 text-slate-100">
        {/* Header */}
        <div className="p-4 bg-emerald-950 border-b border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-800 rounded-xl text-amber-300 shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">{c.title} Advanced Grower</h3>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-semibold">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80">
                {c.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            title={c.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Quick Prompts Chips */}
          <div>
            <label className="block text-slate-400 text-[11px] font-medium mb-1.5">
              {c.suggestions}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAsk(undefined, qp)}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-emerald-950/80 border border-slate-700 hover:border-emerald-500 text-[11px] text-slate-300 hover:text-emerald-200 transition text-left"
                >
                  {qp}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleAsk} className="space-y-3 pt-1 border-t border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">{c.stage}</label>
                <select
                  value={plantStage}
                  onChange={(e) => setPlantStage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Mudas / Clones">{c.stages[0]}</option>
                  <option value="Vegetativo">{c.stages[1]}</option>
                  <option value="Floração Inicial">{c.stages[2]}</option>
                  <option value="Floração Avançada">{c.stages[3]}</option>
                  <option value="Maturação / Flush">{c.stages[4]}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">{c.photo}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                    id="modal-img-upload"
                  />
                  <label
                    htmlFor="modal-img-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-slate-950 text-slate-200 rounded-xl border border-slate-700 font-medium transition hover:border-emerald-500"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>{selectedImage ? 'Alterar Foto' : 'Carregar Imagem'}</span>
                  </label>
                  {selectedImage && (
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-rose-400 hover:text-rose-300 font-semibold text-xs"
                    >
                      {c.remove}
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">{t('ai.engine')}</label>
                <select
                  value={engine}
                  onChange={(e) => setEngine(e.target.value as '3.5' | '3.8')}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="3.5">{t('ai.engine35')}</option>
                  <option value="3.8">{t('ai.engine38')}</option>
                </select>
              </div>
            </div>

            {/* Thumbnail Preview if selected */}
            {selectedImage && (
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                <img
                  src={selectedImage}
                  alt={c.previewAlt}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                />
                <div className="text-slate-300 text-xs">
                  <span className="font-semibold text-emerald-400">{c.attached}</span>
                  <p className="text-[11px] text-slate-400">{c.attachedHint}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-medium mb-1">{c.question}</label>
              <textarea
                rows={3}
                required
                placeholder={c.placeholder}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition border border-emerald-400/30 disabled:border-slate-700 disabled:text-slate-500"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                  <span>{c.loading}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{c.submit} Advanced Grower</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-rose-950/60 border border-rose-700/80 rounded-2xl flex items-start gap-2.5 text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <p className="font-semibold">{c.failure}</p>
                <p className="text-rose-300 text-[11px]">{errorMessage}</p>
                <button
                  type="button"
                  onClick={() => handleAsk()}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-rose-900/80 hover:bg-rose-800 text-rose-100 rounded-lg text-[11px] font-semibold transition"
                >
                  <RefreshCw className="w-3 h-3" />
                  {c.retry}
                </button>
              </div>
            </div>
          )}

          {/* AI Response output */}
          {response && (
            <div className="p-4 bg-slate-950 border border-emerald-700/80 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="font-bold text-emerald-300 flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {c.responseTitle} Advanced Grower:
                </h4>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] transition"
                  title={c.copyTitle}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">{c.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{c.copy}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-slate-200 whitespace-pre-wrap leading-relaxed space-y-2 pt-2">
                {response}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
