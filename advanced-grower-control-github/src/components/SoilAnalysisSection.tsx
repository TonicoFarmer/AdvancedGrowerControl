import React, { useState } from 'react';
import { 
  TestTube, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  BarChart2, 
  Calculator, 
  Layers, 
  Sparkles, 
  Info, 
  ArrowRight, 
  ShieldAlert, 
  Copy, 
  Check, 
  Beaker,
  Target,
  ChevronDown
} from 'lucide-react';
import { SoilAnalysisData } from '../types';
import { useI18n, useTerm } from '../i18n';

const COPY = {
  pt: {
    title: '1.5 Calculadora e Interpretador de Laudos de Solo & Substrato',
    description: 'Avaliação do equilíbrio de cátions (Ca:Mg:K), saturação por bases (V%) e conversão para insumos agrícolas.',
    unit: 'Unidade:',
    copy: 'Copiar Laudo',
    copied: 'Copiado!',
    inputs: 'Entrada de Dados do Laudo Laboratorial',
    currentUnit: 'Unidade atual:',
    ph: 'pH em Água / CaCl₂',
    organicMatter: 'Matéria Orgânica (%)',
    calcium: 'Cálcio - Ca',
    magnesium: 'Magnésio - Mg',
    potassium: 'Potássio - K',
    ctc: 'CTC pH 7.0',
    volume: 'Volume Total de Solo / Substrato (Litros):',
    volumeHint: 'O volume define a quantidade exata de insumo a incorporar no vaso ou canteiro.',
    relations: 'Relações Catiônicas & Saturação por Bases (V%)',
    agronomic: 'Padrão Agronômico para Cannabis',
    caMg: 'Relação Ca : Mg',
    baseSat: 'Saturação Bases V%',
    caK: 'Relação Ca : K',
    mgK: 'Relação Mg : K',
    distribution: 'Distribuição dos Cátions na CTC do Solo:',
    diagnosis: 'Diagnóstico Agroecológico da Amostra:',
    recommendation: 'Recomendação Automática de Nutrientes Puros (Relação Ca : Mg : K)',
    manual: 'Ajustar Gramas Manualmente',
    manualOn: 'Modo Manual Ativo',
    pureCa: 'Cálcio Puro (Ca)',
    pureMg: 'Magnésio Puro (Mg)',
    pureK: 'Potássio Puro (K)',
    conversion: 'Conversão da Recomendação em Insumos Agrícolas (3 Janelas Especializadas)',
    formula: 'Fórmula estequiométrica: Quantidade de Insumo = (Gramas do Elemento × Fator de Conversão) × 100 ÷ % de Óxido do Insumo.',
    choose: 'Escolha o Insumo de',
    oxide: 'Teor de',
    need: 'Necessidade de',
    unitAria: 'Unidade de medida dos cátions',
    unitCmolc: 'cmolc / dm³ (Centimol)',
    unitMmolc: 'mmolc / dm³ (Milimol)',
    unitPpm: 'ppm (mg/dm³)',
    copyTitle: 'Copiar relatório completo',
    phHint: 'Faixa ideal: 6.0 a 6.8',
    omHint: 'Ideal Living Soil: > 4.0%',
    caUnitAria: 'Unidade do Cálcio',
    caMeta: 'Meta: ~65% da CTC',
    mgUnitAria: 'Unidade do Magnésio',
    mgMeta: 'Meta: ~15% da CTC',
    kUnitAria: 'Unidade do Potássio',
    kMeta: 'Meta: ~3% a 5% da CTC',
    ctcUnitAria: 'Unidade da CTC',
    ctcHint: 'Capacidade de Troca Catiônica',
    liters: 'Litros',
    cubicMeter: '1 m³ (1.000L)',
    targetCaMg: 'Alvo: 3:1 a 5:1',
    targetV: 'Alvo: 65% a 75%',
    targetCaK: 'Alvo: 10:1 a 15:1',
    targetMgK: 'Alvo: 3:1 a 4:1',
    elCa: 'Cálcio',
    elMg: 'Magnésio',
    elK: 'Potássio',
    metaCa: 'Meta: 65%',
    metaMg: 'Meta: 15%',
    metaK: 'Meta: 4.5%',
    diagAcidicTitle: 'pH Ácido',
    diagAcidicBody:
      'Recomenda-se calagem prévia com calcário para elevar o pH para 6.2 - 6.5 e melhorar a disponibilidade de micronutrientes e Ca/Mg.',
    diagLowCaTitle: 'Relação Ca:Mg Baixa',
    diagLowCaBody:
      'O Cálcio está abaixo da proporção ideal frente ao Magnésio. Aplicar Wollastonita ou Gesso Agrícola para elevar o Cálcio sem agravar o Mg.',
    diagHighCaTitle: 'Relação Ca:Mg Elevada',
    diagHighCaBody:
      'Excesso de Cálcio em relação ao Magnésio. Pode induzir deficiência induzida de Mg nas folhas mais velhas. Priorizar reposição de Magnésio com Carbonato ou Sulfato de Mg.',
    diagIdealTitle: 'Solo com excelente equilíbrio catiônico!',
    diagIdealBody:
      'Manter a ciclagem biológica com bioinsumos, cobertura vegetal e inoculação micorrízica.',
    alertTitle: 'Atenção Agronômica: Magnésio Crítico no Laudo',
    alertBadge: 'Indicação de Calcário Dolomítico',
    alertIntro:
      'Quando o Magnésio está muito baixo e há necessidade de calagem ou elevação de bases, a escolha do corretivo é determinante:',
    alertRecommended: 'RECOMENDADO: Calcário Dolomítico',
    alertRecommendedBody:
      'Contém alto teor de Magnésio (~18% a 22% de MgO) combinado com Cálcio (~30% CaO). Restaura a relação Ca:Mg simultaneamente, corrige a acidez e previne clorose foliar severa por falta de Mg.',
    alertRecommendedTag: 'Ideal para solos deficientes em Mg',
    alertAvoid: 'EVITAR AGORA: Calcário Calcítico',
    alertAvoidBody:
      'O Calcário Calcítico possui quase zero magnésio (< 5% MgO) e até 54% CaO. Se aplicado nesta amostra, o excesso unilateral de Cálcio causaria antagonismo de absorção radicular, agravando ainda mais a deficiência de Magnésio.',
    alertAvoidTag: 'Usar Calcítico apenas quando Mg já estiver alto',
    recDesc:
      'Necessidade calculada para atingir o equilíbrio de bases da Cannabis (50–65% Ca, 10–15% Mg, 3–5% K) no volume de',
    resetTitle: 'Sincronizar de volta com o cálculo automático',
    targetCaCtc: 'Alvo 65% CTC',
    targetMgCtc: 'Alvo 15% CTC',
    targetKCtc: 'Alvo 4.5% CTC',
    manualCaLabel: 'Gramas de Ca a aplicar:',
    manualMgLabel: 'Gramas de Mg a aplicar:',
    manualKLabel: 'Gramas de K a aplicar:',
    grams: 'gramas',
    gramsPerLiterSoil: 'g/L de solo',
    deficitLabel: 'Déficit',
    window1: 'Janela 1: Insumo de Cálcio',
    window2: 'Janela 2: Insumo de Magnésio',
    window3: 'Janela 3: Insumo de Potássio',
    factorCa: 'Fator de Conversão Ca → CaO =',
    factorMg: 'Fator de Conversão Mg → MgO =',
    factorK: 'Fator de Conversão K → K₂O =',
    caInsumoAria: 'Insumo de Cálcio',
    mgInsumoAria: 'Insumo de Magnésio',
    kInsumoAria: 'Insumo de Potássio',
    inReport: 'no laudo:',
    needCa: 'Necessidade de CaO puro:',
    needMg: 'Necessidade de MgO puro:',
    needK: 'Necessidade de K₂O puro:',
    mathMemory: 'Memória de Cálculo:',
    totalDose: 'Dosagem Total Recomendada:',
    gramsPerLiter: 'g / Litro',
    doseForPrefix: 'de',
    doseForSuffix: 'para os {volume} Litros.',
    reportTitle: 'Recomendação de Remineralização & Cátions',
    reportVolume: 'Volume de Solo / Substrato',
    reportUnit: 'Unidade Padrão',
    reportValues: 'Valores Informados',
    reportMO: 'M.O.',
    reportRelations: 'Relações',
    reportIdealCaMg: 'Ideal Cannabis: 3:1 a 5:1',
    reportIdealCaK: 'Ideal: 10:1 a 15:1',
    reportIdealMgK: 'Ideal: 3:1 a 4:1',
    reportPure: 'Recomendação de Nutrientes Puros',
    reportPureCa: 'Cálcio puro',
    reportPureMg: 'Magnésio puro',
    reportPureK: 'Potássio puro',
    reportInsumos: 'Recomendação de Insumos Agrícolas',
    reportFormula: 'Fórmula',
    reportAlert:
      'ALERTA MAGNÉSIO MUITO BAIXO: Recomendado uso de Calcário Dolomítico ao invés de Calcítico para reequilibrar Ca e Mg juntos!',
    insumos: {
      wollastonita: {
        name: 'Wollastonita (Silicato de Cálcio)',
        description:
          'Fonte nobre de Cálcio e Silício solúvel (SiO₂). Melhora a estrutura celular e resistência a pragas sem elevar bruscamente o pH.',
        dosageTip:
          'Ideal para living soil. Homogeneizar uniformemente em todo o volume do substrato.',
      },
      gesso_agricola: {
        name: 'Gesso Agrícola (Sulfato de Cálcio)',
        description:
          'Fornece Cálcio e Enxofre sem alterar o pH do solo. Excelente mobilidade radicular em profundidade.',
        dosageTip:
          'Excelente quando o pH já está em 6.2 - 6.8 e apenas o Cálcio precisa subir.',
      },
      calcario_calcitico: {
        name: 'Calcário Calcítico (PRNT 85%)',
        description:
          'Aumenta expressivamente o pH e fornece alto teor de Cálcio. Quase isento de Magnésio (< 5% MgO).',
        dosageTip:
          'Usar apenas se o pH estiver ácido (< 5.8) e o Magnésio NÃO estiver deficiente.',
      },
      farinha_conchas: {
        name: 'Farinha de Ostras / Conchas Biogênica',
        description:
          'Carbonato orgânico de liberação lenta e constante, rico em oligoelementos marinhos benéficos à microbiota.',
        dosageTip:
          'Incorporar no preparo inicial de solos reciclados e super solos.',
      },
      carbonato_magnesio: {
        name: 'Carbonato de Magnésio (MgCO₃)',
        description:
          'Fonte pura e altamente concentrada de Magnésio. Excelente corretivo para living soil orgânico.',
        dosageTip:
          'Misturar bem ao solo seco antes de iniciar a maturação/rega.',
      },
      sulfato_magnesio: {
        name: 'Sulfato de Magnésio (Sal de Epsom)',
        description:
          '100% solúvel em água. Liberação imediata para correções rápidas em rega ou fertirrigação.',
        dosageTip:
          'Pode ser aplicado via rega semanal fracionada ou pulverização foliar emergencial.',
      },
      calcario_dolomitico_insumo: {
        name: 'Calcário Dolomítico (PRNT 85%)',
        description:
          'Fornece Magnésio e Cálcio ao mesmo tempo, elevando o pH e o V%. Perfeito quando o Mg estiver baixo.',
        dosageTip:
          'Aplicar no preparo de solo 20 a 30 dias antes do transplante de mudas.',
      },
      serpentinito: {
        name: 'Serpentinito Moído (Pó de Rocha Magnesiana)',
        description:
          'Remineralizador de liberação lenta por intemperismo biológico. Enriquece a biologia do solo.',
        dosageTip: 'Ótimo para canteiros no-till e ciclos longos.',
      },
      greensand: {
        name: 'Greensand (Glauconita)',
        description:
          'Mineral de origem marinha rica em Potássio, Ferro e mais de 30 micronutrientes com liberação suave sem queimar raízes.',
        dosageTip:
          'Aumenta a retenção de água e a CTC do substrato com liberação gradual.',
      },
      leonardita: {
        name: 'Leonardita Potássica (Humato de Potássio)',
        description:
          'Fonte orgânica premium de Potássio combinada com alta carga de substâncias húmicas para estimular raízes e micorrizas.',
        dosageTip:
          'Melhora a eficiência de absorção dos cátions e estrutura do solo.',
      },
      sulfato_potassio_org: {
        name: 'Sulfato de Potássio Orgânico (K₂SO₄)',
        description:
          'Fonte concentrada natural para suprir alta demanda de floração sem elevar o pH nem adicionar cloreto prejudicial.',
        dosageTip: 'Aplicar fracionado durante a pré-flora e pico de floração.',
      },
      cinza_casca: {
        name: 'Cinza de Casca / Biomassa Tratada',
        description:
          'Resíduo agroecológico calcinado rico em K, Ca e P. Possui efeito corretivo no pH.',
        dosageTip:
          'Monitorar o pH do solo após aplicação para evitar subidas bruscas.',
      },
    },
  },
  en: {
    title: '1.5 Soil & Substrate Report Calculator and Interpreter',
    description: 'Cation balance (Ca:Mg:K), base saturation (V%) and conversion to agricultural inputs.',
    unit: 'Unit:',
    copy: 'Copy report',
    copied: 'Copied!',
    inputs: 'Laboratory report data entry',
    currentUnit: 'Current unit:',
    ph: 'pH in water / CaCl₂',
    organicMatter: 'Organic matter (%)',
    calcium: 'Calcium - Ca',
    magnesium: 'Magnesium - Mg',
    potassium: 'Potassium - K',
    ctc: 'CEC at pH 7.0',
    volume: 'Total soil / substrate volume (litres):',
    volumeHint: 'The volume determines the exact amount of input to incorporate into the pot or bed.',
    relations: 'Cation ratios & base saturation (V%)',
    agronomic: 'Agronomic reference for cannabis',
    caMg: 'Ca : Mg ratio',
    baseSat: 'Base saturation V%',
    caK: 'Ca : K ratio',
    mgK: 'Mg : K ratio',
    distribution: 'Cation distribution in soil CEC:',
    diagnosis: 'Agroecological diagnosis of the sample:',
    recommendation: 'Automatic pure nutrient recommendation (Ca : Mg : K ratio)',
    manual: 'Adjust grams manually',
    manualOn: 'Manual mode active',
    pureCa: 'Pure calcium (Ca)',
    pureMg: 'Pure magnesium (Mg)',
    pureK: 'Pure potassium (K)',
    conversion: 'Conversion into agricultural inputs (3 specialised panels)',
    formula: 'Stoichiometric formula: Input amount = (Element grams × Conversion factor) × 100 ÷ Input oxide %.',
    choose: 'Choose the input for',
    oxide: 'Content of',
    need: 'Requirement of',
    unitAria: 'Cation unit of measurement',
    unitCmolc: 'cmolc / dm³ (centimole)',
    unitMmolc: 'mmolc / dm³ (millimole)',
    unitPpm: 'ppm (mg/dm³)',
    copyTitle: 'Copy full report',
    phHint: 'Ideal range: 6.0 to 6.8',
    omHint: 'Ideal living soil: > 4.0%',
    caUnitAria: 'Calcium unit',
    caMeta: 'Target: ~65% of CEC',
    mgUnitAria: 'Magnesium unit',
    mgMeta: 'Target: ~15% of CEC',
    kUnitAria: 'Potassium unit',
    kMeta: 'Target: ~3% to 5% of CEC',
    ctcUnitAria: 'CEC unit',
    ctcHint: 'Cation exchange capacity',
    liters: 'litres',
    cubicMeter: '1 m³ (1,000 L)',
    targetCaMg: 'Target: 3:1 to 5:1',
    targetV: 'Target: 65% to 75%',
    targetCaK: 'Target: 10:1 to 15:1',
    targetMgK: 'Target: 3:1 to 4:1',
    elCa: 'Calcium',
    elMg: 'Magnesium',
    elK: 'Potassium',
    metaCa: 'Target: 65%',
    metaMg: 'Target: 15%',
    metaK: 'Target: 4.5%',
    diagAcidicTitle: 'Acidic pH',
    diagAcidicBody:
      'Prior liming with limestone is recommended to raise the pH to 6.2 - 6.5 and improve the availability of micronutrients and Ca/Mg.',
    diagLowCaTitle: 'Low Ca:Mg ratio',
    diagLowCaBody:
      'Calcium is below the ideal proportion relative to Magnesium. Apply wollastonite or agricultural gypsum to raise Calcium without worsening Mg.',
    diagHighCaTitle: 'High Ca:Mg ratio',
    diagHighCaBody:
      'Excess Calcium relative to Magnesium. It may induce Mg deficiency in older leaves. Prioritise Magnesium replacement with magnesium carbonate or magnesium sulfate.',
    diagIdealTitle: 'Soil with excellent cation balance!',
    diagIdealBody:
      'Maintain biological cycling with bioinputs, cover crops and mycorrhizal inoculation.',
    alertTitle: 'Agronomic alert: critical Magnesium in the report',
    alertBadge: 'Dolomitic limestone indicated',
    alertIntro:
      'When Magnesium is very low and liming or base raising is needed, the choice of amendment is decisive:',
    alertRecommended: 'RECOMMENDED: Dolomitic limestone',
    alertRecommendedBody:
      'Contains a high Magnesium content (~18% to 22% MgO) combined with Calcium (~30% CaO). It restores the Ca:Mg ratio at the same time, corrects acidity and prevents severe leaf chlorosis caused by Mg shortage.',
    alertRecommendedTag: 'Ideal for soils deficient in Mg',
    alertAvoid: 'AVOID FOR NOW: Calcitic limestone',
    alertAvoidBody:
      'Calcitic limestone has almost zero magnesium (< 5% MgO) and up to 54% CaO. If applied to this sample, the one-sided excess of Calcium would cause root uptake antagonism, worsening the Magnesium deficiency even further.',
    alertAvoidTag: 'Use calcitic limestone only when Mg is already high',
    recDesc:
      'Requirement calculated to reach the cannabis base balance (50–65% Ca, 10–15% Mg, 3–5% K) in a volume of',
    resetTitle: 'Sync back with the automatic calculation',
    targetCaCtc: 'Target 65% CEC',
    targetMgCtc: 'Target 15% CEC',
    targetKCtc: 'Target 4.5% CEC',
    manualCaLabel: 'Grams of Ca to apply:',
    manualMgLabel: 'Grams of Mg to apply:',
    manualKLabel: 'Grams of K to apply:',
    grams: 'grams',
    gramsPerLiterSoil: 'g/L of soil',
    deficitLabel: 'Deficit',
    window1: 'Panel 1: Calcium input',
    window2: 'Panel 2: Magnesium input',
    window3: 'Panel 3: Potassium input',
    factorCa: 'Conversion factor Ca → CaO =',
    factorMg: 'Conversion factor Mg → MgO =',
    factorK: 'Conversion factor K → K₂O =',
    caInsumoAria: 'Calcium input',
    mgInsumoAria: 'Magnesium input',
    kInsumoAria: 'Potassium input',
    inReport: 'from the report:',
    needCa: 'Pure CaO requirement:',
    needMg: 'Pure MgO requirement:',
    needK: 'Pure K₂O requirement:',
    mathMemory: 'Calculation breakdown:',
    totalDose: 'Total recommended dosage:',
    gramsPerLiter: 'g / litre',
    doseForPrefix: 'of',
    doseForSuffix: 'for the {volume} litres.',
    reportTitle: 'Remineralisation & cation recommendation',
    reportVolume: 'Soil / substrate volume',
    reportUnit: 'Standard unit',
    reportValues: 'Reported values',
    reportMO: 'O.M.',
    reportRelations: 'Ratios',
    reportIdealCaMg: 'Cannabis ideal: 3:1 to 5:1',
    reportIdealCaK: 'Ideal: 10:1 to 15:1',
    reportIdealMgK: 'Ideal: 3:1 to 4:1',
    reportPure: 'Pure nutrient recommendation',
    reportPureCa: 'Pure calcium',
    reportPureMg: 'Pure magnesium',
    reportPureK: 'Pure potassium',
    reportInsumos: 'Agricultural input recommendation',
    reportFormula: 'Formula',
    reportAlert:
      'WARNING - VERY LOW MAGNESIUM: Dolomitic limestone is recommended instead of calcitic limestone to rebalance Ca and Mg together!',
    insumos: {
      wollastonita: {
        name: 'Wollastonite (Calcium Silicate)',
        description:
          'Premium source of soluble Calcium and Silicon (SiO₂). Improves cell structure and pest resistance without sharply raising the pH.',
        dosageTip:
          'Ideal for living soil. Mix evenly throughout the whole substrate volume.',
      },
      gesso_agricola: {
        name: 'Agricultural Gypsum (Calcium Sulfate)',
        description:
          'Supplies Calcium and Sulfur without changing the soil pH. Excellent root mobility at depth.',
        dosageTip:
          'Excellent when the pH is already 6.2 - 6.8 and only Calcium needs to rise.',
      },
      calcario_calcitico: {
        name: 'Calcitic Limestone (PRNT 85%)',
        description:
          'Significantly raises the pH and supplies a high Calcium content. Almost free of Magnesium (< 5% MgO).',
        dosageTip:
          'Use only if the pH is acidic (< 5.8) and Magnesium is NOT deficient.',
      },
      farinha_conchas: {
        name: 'Oyster / Biogenic Shell Flour',
        description:
          'Organic carbonate with slow, steady release, rich in marine trace elements that benefit the microbiota.',
        dosageTip:
          'Incorporate in the initial preparation of recycled soils and super soils.',
      },
      carbonato_magnesio: {
        name: 'Magnesium Carbonate (MgCO₃)',
        description:
          'Pure, highly concentrated Magnesium source. Excellent amendment for organic living soil.',
        dosageTip:
          'Mix well into the dry soil before starting maturation / watering.',
      },
      sulfato_magnesio: {
        name: 'Magnesium Sulfate (Epsom Salt)',
        description:
          '100% water-soluble. Immediate release for fast corrections through watering or fertigation.',
        dosageTip:
          'Can be applied through split weekly watering or an emergency foliar spray.',
      },
      calcario_dolomitico_insumo: {
        name: 'Dolomitic Limestone (PRNT 85%)',
        description:
          'Supplies Magnesium and Calcium at the same time, raising the pH and the V%. Perfect when Mg is low.',
        dosageTip:
          'Apply during soil preparation 20 to 30 days before transplanting seedlings.',
      },
      serpentinito: {
        name: 'Ground Serpentinite (Magnesian Rock Powder)',
        description:
          'Slow-release remineraliser through biological weathering. Enriches soil biology.',
        dosageTip: 'Great for no-till beds and long cycles.',
      },
      greensand: {
        name: 'Greensand (Glauconite)',
        description:
          'Marine mineral rich in Potassium, Iron and more than 30 micronutrients, with gentle release that does not burn roots.',
        dosageTip:
          'Increases water retention and substrate CEC with gradual release.',
      },
      leonardita: {
        name: 'Potassium Leonardite (Potassium Humate)',
        description:
          'Premium organic Potassium source combined with a high load of humic substances to stimulate roots and mycorrhizae.',
        dosageTip:
          'Improves cation uptake efficiency and soil structure.',
      },
      sulfato_potassio_org: {
        name: 'Organic Potassium Sulfate (K₂SO₄)',
        description:
          'Concentrated natural source to meet high flowering demand without raising the pH or adding harmful chloride.',
        dosageTip:
          'Apply in split doses during pre-flowering and peak flowering.',
      },
      cinza_casca: {
        name: 'Bark Ash / Treated Biomass',
        description:
          'Calcined agroecological residue rich in K, Ca and P. It has a pH-correcting effect.',
        dosageTip:
          'Monitor the soil pH after application to avoid sharp increases.',
      },
    },
  },
  es: {
    title: '1.5 Calculadora e Interpretador de Análisis de Suelo y Sustrato',
    description: 'Evaluación del equilibrio de cationes (Ca:Mg:K), saturación de bases (V%) y conversión a insumos agrícolas.',
    unit: 'Unidad:',
    copy: 'Copiar informe',
    copied: '¡Copiado!',
    inputs: 'Entrada de datos del informe de laboratorio',
    currentUnit: 'Unidad actual:',
    ph: 'pH en agua / CaCl₂',
    organicMatter: 'Materia orgánica (%)',
    calcium: 'Calcio - Ca',
    magnesium: 'Magnesio - Mg',
    potassium: 'Potasio - K',
    ctc: 'CIC a pH 7,0',
    volume: 'Volumen total de suelo / sustrato (litros):',
    volumeHint: 'El volumen determina la cantidad exacta de insumo a incorporar en la maceta o bancal.',
    relations: 'Relaciones catiónicas y saturación de bases (V%)',
    agronomic: 'Referencia agronómica para cannabis',
    caMg: 'Relación Ca : Mg',
    baseSat: 'Saturación de bases V%',
    caK: 'Relación Ca : K',
    mgK: 'Relación Mg : K',
    distribution: 'Distribución de cationes en la CIC del suelo:',
    diagnosis: 'Diagnóstico agroecológico de la muestra:',
    recommendation: 'Recomendación automática de nutrientes puros (relación Ca : Mg : K)',
    manual: 'Ajustar gramos manualmente',
    manualOn: 'Modo manual activo',
    pureCa: 'Calcio puro (Ca)',
    pureMg: 'Magnesio puro (Mg)',
    pureK: 'Potasio puro (K)',
    conversion: 'Conversión a insumos agrícolas (3 paneles especializados)',
    formula: 'Fórmula estequiométrica: Cantidad de insumo = (gramos del elemento × factor de conversión) × 100 ÷ % de óxido del insumo.',
    choose: 'Elija el insumo de',
    oxide: 'Contenido de',
    need: 'Necesidad de',
    unitAria: 'Unidad de medida de los cationes',
    unitCmolc: 'cmolc / dm³ (centimol)',
    unitMmolc: 'mmolc / dm³ (milimol)',
    unitPpm: 'ppm (mg/dm³)',
    copyTitle: 'Copiar informe completo',
    phHint: 'Rango ideal: 6,0 a 6,8',
    omHint: 'Living soil ideal: > 4,0%',
    caUnitAria: 'Unidad del Calcio',
    caMeta: 'Meta: ~65% de la CIC',
    mgUnitAria: 'Unidad del Magnesio',
    mgMeta: 'Meta: ~15% de la CIC',
    kUnitAria: 'Unidad del Potasio',
    kMeta: 'Meta: ~3% a 5% de la CIC',
    ctcUnitAria: 'Unidad de la CIC',
    ctcHint: 'Capacidad de intercambio catiónico',
    liters: 'litros',
    cubicMeter: '1 m³ (1.000 L)',
    targetCaMg: 'Objetivo: 3:1 a 5:1',
    targetV: 'Objetivo: 65% a 75%',
    targetCaK: 'Objetivo: 10:1 a 15:1',
    targetMgK: 'Objetivo: 3:1 a 4:1',
    elCa: 'Calcio',
    elMg: 'Magnesio',
    elK: 'Potasio',
    metaCa: 'Meta: 65%',
    metaMg: 'Meta: 15%',
    metaK: 'Meta: 4,5%',
    diagAcidicTitle: 'pH ácido',
    diagAcidicBody:
      'Se recomienda un encalado previo con caliza para elevar el pH a 6,2 - 6,5 y mejorar la disponibilidad de micronutrientes y Ca/Mg.',
    diagLowCaTitle: 'Relación Ca:Mg baja',
    diagLowCaBody:
      'El Calcio está por debajo de la proporción ideal frente al Magnesio. Aplicar wollastonita o yeso agrícola para elevar el Calcio sin agravar el Mg.',
    diagHighCaTitle: 'Relación Ca:Mg elevada',
    diagHighCaBody:
      'Exceso de Calcio respecto al Magnesio. Puede inducir deficiencia de Mg en las hojas más viejas. Priorizar la reposición de Magnesio con carbonato o sulfato de Mg.',
    diagIdealTitle: '¡Suelo con excelente equilibrio catiónico!',
    diagIdealBody:
      'Mantener el ciclado biológico con bioinsumos, cobertura vegetal e inoculación micorrícica.',
    alertTitle: 'Atención agronómica: Magnesio crítico en el informe',
    alertBadge: 'Indicación de caliza dolomítica',
    alertIntro:
      'Cuando el Magnesio está muy bajo y hay necesidad de encalado o elevación de bases, la elección del correctivo es determinante:',
    alertRecommended: 'RECOMENDADO: Caliza dolomítica',
    alertRecommendedBody:
      'Contiene un alto contenido de Magnesio (~18% a 22% de MgO) combinado con Calcio (~30% CaO). Restaura la relación Ca:Mg al mismo tiempo, corrige la acidez y previene la clorosis foliar severa por falta de Mg.',
    alertRecommendedTag: 'Ideal para suelos deficientes en Mg',
    alertAvoid: 'EVITAR AHORA: Caliza cálcica',
    alertAvoidBody:
      'La caliza cálcica tiene casi cero magnesio (< 5% MgO) y hasta 54% CaO. Si se aplicara en esta muestra, el exceso unilateral de Calcio causaría antagonismo de absorción radicular, agravando aún más la deficiencia de Magnesio.',
    alertAvoidTag: 'Usar caliza cálcica solo cuando el Mg ya sea alto',
    recDesc:
      'Necesidad calculada para alcanzar el equilibrio de bases del cannabis (50–65% Ca, 10–15% Mg, 3–5% K) en un volumen de',
    resetTitle: 'Sincronizar de nuevo con el cálculo automático',
    targetCaCtc: 'Objetivo 65% CIC',
    targetMgCtc: 'Objetivo 15% CIC',
    targetKCtc: 'Objetivo 4,5% CIC',
    manualCaLabel: 'Gramos de Ca a aplicar:',
    manualMgLabel: 'Gramos de Mg a aplicar:',
    manualKLabel: 'Gramos de K a aplicar:',
    grams: 'gramos',
    gramsPerLiterSoil: 'g/L de suelo',
    deficitLabel: 'Déficit',
    window1: 'Panel 1: Insumo de Calcio',
    window2: 'Panel 2: Insumo de Magnesio',
    window3: 'Panel 3: Insumo de Potasio',
    factorCa: 'Factor de conversión Ca → CaO =',
    factorMg: 'Factor de conversión Mg → MgO =',
    factorK: 'Factor de conversión K → K₂O =',
    caInsumoAria: 'Insumo de Calcio',
    mgInsumoAria: 'Insumo de Magnesio',
    kInsumoAria: 'Insumo de Potasio',
    inReport: 'en el informe:',
    needCa: 'Necesidad de CaO puro:',
    needMg: 'Necesidad de MgO puro:',
    needK: 'Necesidad de K₂O puro:',
    mathMemory: 'Memoria de cálculo:',
    totalDose: 'Dosis total recomendada:',
    gramsPerLiter: 'g / litro',
    doseForPrefix: 'de',
    doseForSuffix: 'para los {volume} litros.',
    reportTitle: 'Recomendación de Remineralización y Cationes',
    reportVolume: 'Volumen de suelo / sustrato',
    reportUnit: 'Unidad estándar',
    reportValues: 'Valores informados',
    reportMO: 'M.O.',
    reportRelations: 'Relaciones',
    reportIdealCaMg: 'Ideal cannabis: 3:1 a 5:1',
    reportIdealCaK: 'Ideal: 10:1 a 15:1',
    reportIdealMgK: 'Ideal: 3:1 a 4:1',
    reportPure: 'Recomendación de nutrientes puros',
    reportPureCa: 'Calcio puro',
    reportPureMg: 'Magnesio puro',
    reportPureK: 'Potasio puro',
    reportInsumos: 'Recomendación de insumos agrícolas',
    reportFormula: 'Fórmula',
    reportAlert:
      'ALERTA: MAGNESIO MUY BAJO. Se recomienda usar caliza dolomítica en lugar de cálcica para reequilibrar Ca y Mg juntos.',
    insumos: {
      wollastonita: {
        name: 'Wollastonita (Silicato de Calcio)',
        description:
          'Fuente noble de Calcio y Silicio soluble (SiO₂). Mejora la estructura celular y la resistencia a plagas sin elevar bruscamente el pH.',
        dosageTip:
          'Ideal para living soil. Homogeneizar uniformemente en todo el volumen del sustrato.',
      },
      gesso_agricola: {
        name: 'Yeso Agrícola (Sulfato de Calcio)',
        description:
          'Aporta Calcio y Azufre sin alterar el pH del suelo. Excelente movilidad radicular en profundidad.',
        dosageTip:
          'Excelente cuando el pH ya está en 6,2 - 6,8 y solo el Calcio necesita subir.',
      },
      calcario_calcitico: {
        name: 'Caliza Cálcica (PRNT 85%)',
        description:
          'Aumenta de forma notable el pH y aporta un alto contenido de Calcio. Casi exenta de Magnesio (< 5% MgO).',
        dosageTip:
          'Usar solo si el pH está ácido (< 5,8) y el Magnesio NO está deficiente.',
      },
      farinha_conchas: {
        name: 'Harina de Ostras / Conchas Biogénica',
        description:
          'Carbonato orgánico de liberación lenta y constante, rico en oligoelementos marinos beneficiosos para la microbiota.',
        dosageTip:
          'Incorporar en la preparación inicial de suelos reciclados y super suelos.',
      },
      carbonato_magnesio: {
        name: 'Carbonato de Magnesio (MgCO₃)',
        description:
          'Fuente pura y altamente concentrada de Magnesio. Excelente correctivo para living soil orgánico.',
        dosageTip:
          'Mezclar bien en el suelo seco antes de iniciar la maduración / riego.',
      },
      sulfato_magnesio: {
        name: 'Sulfato de Magnesio (Sal de Epsom)',
        description:
          '100% soluble en agua. Liberación inmediata para correcciones rápidas en riego o fertirriego.',
        dosageTip:
          'Puede aplicarse mediante riego semanal fraccionado o pulverización foliar de emergencia.',
      },
      calcario_dolomitico_insumo: {
        name: 'Caliza Dolomítica (PRNT 85%)',
        description:
          'Aporta Magnesio y Calcio al mismo tiempo, elevando el pH y el V%. Perfecta cuando el Mg está bajo.',
        dosageTip:
          'Aplicar en la preparación del suelo de 20 a 30 días antes del trasplante de plántulas.',
      },
      serpentinito: {
        name: 'Serpentinita Molida (Polvo de Roca Magnesiana)',
        description:
          'Remineralizador de liberación lenta por meteorización biológica. Enriquece la biología del suelo.',
        dosageTip: 'Excelente para bancales no-till y ciclos largos.',
      },
      greensand: {
        name: 'Greensand (Glauconita)',
        description:
          'Mineral de origen marino rico en Potasio, Hierro y más de 30 micronutrientes, con liberación suave que no quema raíces.',
        dosageTip:
          'Aumenta la retención de agua y la CIC del sustrato con liberación gradual.',
      },
      leonardita: {
        name: 'Leonardita Potásica (Humato de Potasio)',
        description:
          'Fuente orgánica premium de Potasio combinada con una alta carga de sustancias húmicas para estimular raíces y micorrizas.',
        dosageTip:
          'Mejora la eficiencia de absorción de los cationes y la estructura del suelo.',
      },
      sulfato_potassio_org: {
        name: 'Sulfato de Potasio Orgánico (K₂SO₄)',
        description:
          'Fuente concentrada natural para cubrir la alta demanda de floración sin elevar el pH ni añadir cloruro perjudicial.',
        dosageTip:
          'Aplicar fraccionado durante la prefloración y el pico de floración.',
      },
      cinza_casca: {
        name: 'Ceniza de Corteza / Biomasa Tratada',
        description:
          'Residuo agroecológico calcinado rico en K, Ca y P. Tiene efecto correctivo sobre el pH.',
        dosageTip:
          'Monitorear el pH del suelo tras la aplicación para evitar subidas bruscas.',
      },
    },
  },
  de: {
    title: '1.5 Rechner und Interpretationshilfe für Boden- & Substratberichte',
    description: 'Kationengleichgewicht (Ca:Mg:K), Basensättigung (V%) und Umrechnung in landwirtschaftliche Betriebsmittel.',
    unit: 'Einheit:',
    copy: 'Bericht kopieren',
    copied: 'Kopiert!',
    inputs: 'Eingabe der Laborberichtsdaten',
    currentUnit: 'Aktuelle Einheit:',
    ph: 'pH in Wasser / CaCl₂',
    organicMatter: 'Organische Substanz (%)',
    calcium: 'Kalzium - Ca',
    magnesium: 'Magnesium - Mg',
    potassium: 'Kalium - K',
    ctc: 'KAK bei pH 7,0',
    volume: 'Gesamtvolumen Boden / Substrat (Liter):',
    volumeHint: 'Das Volumen bestimmt die genaue Menge des einzuarbeitenden Betriebsmittels im Topf oder Beet.',
    relations: 'Kationenverhältnisse & Basensättigung (V%)',
    agronomic: 'Agronomische Referenz für Cannabis',
    caMg: 'Ca : Mg-Verhältnis',
    baseSat: 'Basensättigung V%',
    caK: 'Ca : K-Verhältnis',
    mgK: 'Mg : K-Verhältnis',
    distribution: 'Kationenverteilung in der Boden-KAK:',
    diagnosis: 'Agrarökologische Diagnose der Probe:',
    recommendation: 'Automatische Empfehlung reiner Nährstoffe (Ca : Mg : K)',
    manual: 'Gramm manuell anpassen',
    manualOn: 'Manueller Modus aktiv',
    pureCa: 'Reines Kalzium (Ca)',
    pureMg: 'Reines Magnesium (Mg)',
    pureK: 'Reines Kalium (K)',
    conversion: 'Umrechnung in landwirtschaftliche Betriebsmittel (3 spezialisierte Fenster)',
    formula: 'Stöchiometrische Formel: Betriebsmittelmenge = (Gramm des Elements × Umrechnungsfaktor) × 100 ÷ Oxidgehalt %.',
    choose: 'Betriebsmittel wählen für',
    oxide: 'Gehalt an',
    need: 'Bedarf an',
    unitAria: 'Maßeinheit der Kationen',
    unitCmolc: 'cmolc / dm³ (Zentimol)',
    unitMmolc: 'mmolc / dm³ (Millimol)',
    unitPpm: 'ppm (mg/dm³)',
    copyTitle: 'Vollständigen Bericht kopieren',
    phHint: 'Idealbereich: 6,0 bis 6,8',
    omHint: 'Ideal für Living Soil: > 4,0 %',
    caUnitAria: 'Einheit Kalzium',
    caMeta: 'Ziel: ~65 % der KAK',
    mgUnitAria: 'Einheit Magnesium',
    mgMeta: 'Ziel: ~15 % der KAK',
    kUnitAria: 'Einheit Kalium',
    kMeta: 'Ziel: ~3 % bis 5 % der KAK',
    ctcUnitAria: 'Einheit der KAK',
    ctcHint: 'Kationenaustauschkapazität',
    liters: 'Liter',
    cubicMeter: '1 m³ (1.000 l)',
    targetCaMg: 'Ziel: 3:1 bis 5:1',
    targetV: 'Ziel: 65 % bis 75 %',
    targetCaK: 'Ziel: 10:1 bis 15:1',
    targetMgK: 'Ziel: 3:1 bis 4:1',
    elCa: 'Kalzium',
    elMg: 'Magnesium',
    elK: 'Kalium',
    metaCa: 'Ziel: 65 %',
    metaMg: 'Ziel: 15 %',
    metaK: 'Ziel: 4,5 %',
    diagAcidicTitle: 'Saurer pH',
    diagAcidicBody:
      'Es wird eine vorherige Kalkung mit Kalkstein empfohlen, um den pH auf 6,2 - 6,5 anzuheben und die Verfügbarkeit von Mikronährstoffen und Ca/Mg zu verbessern.',
    diagLowCaTitle: 'Niedriges Ca:Mg-Verhältnis',
    diagLowCaBody:
      'Kalzium liegt im Verhältnis zu Magnesium unter dem Idealwert. Wollastonit oder Agrargips ausbringen, um das Kalzium anzuheben, ohne Mg zu verschlechtern.',
    diagHighCaTitle: 'Hohes Ca:Mg-Verhältnis',
    diagHighCaBody:
      'Kalziumüberschuss gegenüber Magnesium. Kann einen induzierten Mg-Mangel in älteren Blättern verursachen. Vorrangig Magnesium mit Magnesiumkarbonat oder Magnesiumsulfat nachführen.',
    diagIdealTitle: 'Boden mit ausgezeichnetem Kationengleichgewicht!',
    diagIdealBody:
      'Den biologischen Kreislauf mit Bioinputs, Bodenbedeckung und Mykorrhiza-Inokulation aufrechterhalten.',
    alertTitle: 'Agronomischer Hinweis: kritisches Magnesium im Bericht',
    alertBadge: 'Empfehlung: Dolomitkalk',
    alertIntro:
      'Wenn Magnesium sehr niedrig ist und eine Kalkung oder Basenanhebung nötig ist, ist die Wahl des Korrekturmittels entscheidend:',
    alertRecommended: 'EMPFOHLEN: Dolomitkalk',
    alertRecommendedBody:
      'Enthält viel Magnesium (~18 % bis 22 % MgO) in Kombination mit Kalzium (~30 % CaO). Stellt das Ca:Mg-Verhältnis gleichzeitig wieder her, korrigiert die Versauerung und verhindert starke Blattchlorose durch Mg-Mangel.',
    alertRecommendedTag: 'Ideal für Böden mit Mg-Mangel',
    alertAvoid: 'JETZT VERMEIDEN: Kalkitischer Kalkstein',
    alertAvoidBody:
      'Kalkitischer Kalkstein enthält nahezu kein Magnesium (< 5 % MgO) und bis zu 54 % CaO. Bei Anwendung auf diese Probe würde der einseitige Kalziumüberschuss einen Antagonismus bei der Wurzelaufnahme verursachen und den Magnesiummangel weiter verschärfen.',
    alertAvoidTag: 'Kalkitischen Kalk nur bei bereits hohem Mg verwenden',
    recDesc:
      'Berechneter Bedarf, um das Basengleichgewicht von Cannabis (50–65 % Ca, 10–15 % Mg, 3–5 % K) im Volumen von',
    resetTitle: 'Wieder mit der automatischen Berechnung synchronisieren',
    targetCaCtc: 'Ziel 65 % KAK',
    targetMgCtc: 'Ziel 15 % KAK',
    targetKCtc: 'Ziel 4,5 % KAK',
    manualCaLabel: 'Gramm Ca zum Ausbringen:',
    manualMgLabel: 'Gramm Mg zum Ausbringen:',
    manualKLabel: 'Gramm K zum Ausbringen:',
    grams: 'Gramm',
    gramsPerLiterSoil: 'g/L Boden',
    deficitLabel: 'Defizit',
    window1: 'Fenster 1: Kalzium-Betriebsmittel',
    window2: 'Fenster 2: Magnesium-Betriebsmittel',
    window3: 'Fenster 3: Kalium-Betriebsmittel',
    factorCa: 'Umrechnungsfaktor Ca → CaO =',
    factorMg: 'Umrechnungsfaktor Mg → MgO =',
    factorK: 'Umrechnungsfaktor K → K₂O =',
    caInsumoAria: 'Kalzium-Betriebsmittel',
    mgInsumoAria: 'Magnesium-Betriebsmittel',
    kInsumoAria: 'Kalium-Betriebsmittel',
    inReport: 'im Bericht:',
    needCa: 'Bedarf an reinem CaO:',
    needMg: 'Bedarf an reinem MgO:',
    needK: 'Bedarf an reinem K₂O:',
    mathMemory: 'Rechenweg:',
    totalDose: 'Empfohlene Gesamtdosis:',
    gramsPerLiter: 'g / Liter',
    doseForPrefix: 'aus',
    doseForSuffix: 'für die {volume} Liter.',
    reportTitle: 'Empfehlung zur Remineralisierung & Kationen',
    reportVolume: 'Boden- / Substratvolumen',
    reportUnit: 'Standardeinheit',
    reportValues: 'Angegebene Werte',
    reportMO: 'Org. Substanz',
    reportRelations: 'Verhältnisse',
    reportIdealCaMg: 'Cannabis-Ideal: 3:1 bis 5:1',
    reportIdealCaK: 'Ideal: 10:1 bis 15:1',
    reportIdealMgK: 'Ideal: 3:1 bis 4:1',
    reportPure: 'Empfehlung reiner Nährstoffe',
    reportPureCa: 'Reines Kalzium',
    reportPureMg: 'Reines Magnesium',
    reportPureK: 'Reines Kalium',
    reportInsumos: 'Empfehlung landwirtschaftlicher Betriebsmittel',
    reportFormula: 'Formel',
    reportAlert:
      'WARNUNG - SEHR NIEDRIGES MAGNESIUM: Statt kalkitischem Kalk wird Dolomitkalk empfohlen, um Ca und Mg gemeinsam wieder ins Gleichgewicht zu bringen!',
    insumos: {
      wollastonita: {
        name: 'Wollastonit (Kalziumsilikat)',
        description:
          'Hochwertige Quelle für lösliches Kalzium und Silizium (SiO₂). Verbessert die Zellstruktur und die Schädlingsresistenz, ohne den pH stark anzuheben.',
        dosageTip:
          'Ideal für Living Soil. Gleichmäßig im gesamten Substratvolumen verteilen.',
      },
      gesso_agricola: {
        name: 'Agrargips (Kalziumsulfat)',
        description:
          'Liefert Kalzium und Schwefel, ohne den Boden-pH zu verändern. Ausgezeichnete Wurzelmobilität in die Tiefe.',
        dosageTip:
          'Ausgezeichnet, wenn der pH bereits bei 6,2 - 6,8 liegt und nur Kalzium angehoben werden muss.',
      },
      calcario_calcitico: {
        name: 'Kalkitischer Kalkstein (PRNT 85 %)',
        description:
          'Hebt den pH deutlich an und liefert einen hohen Kalziumgehalt. Nahezu frei von Magnesium (< 5 % MgO).',
        dosageTip:
          'Nur verwenden, wenn der pH sauer ist (< 5,8) und Magnesium NICHT mangelt.',
      },
      farinha_conchas: {
        name: 'Austern- / Biogenes Muschelschalenmehl',
        description:
          'Organisches Karbonat mit langsamer, gleichmäßiger Freisetzung, reich an marinen Spurenelementen, die die Mikrobiota fördern.',
        dosageTip:
          'Bei der Erstaufbereitung von recycelten Böden und Super Soils einarbeiten.',
      },
      carbonato_magnesio: {
        name: 'Magnesiumkarbonat (MgCO₃)',
        description:
          'Reine, hoch konzentrierte Magnesiumquelle. Ausgezeichnetes Korrekturmittel für organisches Living Soil.',
        dosageTip:
          'Vor Beginn der Reifung / Bewässerung gut in den trockenen Boden einmischen.',
      },
      sulfato_magnesio: {
        name: 'Magnesiumsulfat (Bittersalz)',
        description:
          '100 % wasserlöslich. Sofortige Freisetzung für schnelle Korrekturen über Gießwasser oder Fertigation.',
        dosageTip:
          'Kann über fraktioniertes wöchentliches Gießen oder als Notfall-Blattspritzung ausgebracht werden.',
      },
      calcario_dolomitico_insumo: {
        name: 'Dolomitkalk (PRNT 85 %)',
        description:
          'Liefert gleichzeitig Magnesium und Kalzium und hebt pH und V% an. Perfekt, wenn Mg niedrig ist.',
        dosageTip:
          'Bei der Bodenaufbereitung 20 bis 30 Tage vor dem Umpflanzen der Setzlinge ausbringen.',
      },
      serpentinito: {
        name: 'Gemahlener Serpentinit (Magnesiumgesteinsmehl)',
        description:
          'Langsam freisetzender Remineralisierer durch biologische Verwitterung. Bereichert die Bodenbiologie.',
        dosageTip: 'Ideal für No-Till-Beete und lange Zyklen.',
      },
      greensand: {
        name: 'Greensand (Glaukonit)',
        description:
          'Marines Mineral, reich an Kalium, Eisen und über 30 Mikronährstoffen, mit sanfter Freisetzung ohne Wurzelverbrennung.',
        dosageTip:
          'Erhöht die Wasserhaltefähigkeit und die KAK des Substrats bei allmählicher Freisetzung.',
      },
      leonardita: {
        name: 'Kalium-Leonardit (Kaliumhumat)',
        description:
          'Hochwertige organische Kaliumquelle in Kombination mit einem hohen Anteil an Huminstoffen zur Stimulierung von Wurzeln und Mykorrhiza.',
        dosageTip:
          'Verbessert die Aufnahmeeffizienz der Kationen und die Bodenstruktur.',
      },
      sulfato_potassio_org: {
        name: 'Organisches Kaliumsulfat (K₂SO₄)',
        description:
          'Konzentrierte natürliche Quelle zur Deckung des hohen Bedarfs in der Blüte, ohne den pH anzuheben oder schädliches Chlorid zuzuführen.',
        dosageTip:
          'Fraktioniert während der Vorblüte und der Blütehochphase ausbringen.',
      },
      cinza_casca: {
        name: 'Rindenasche / Behandelte Biomasse',
        description:
          'Kalzinierter agrarökologischer Rückstand, reich an K, Ca und P. Wirkt pH-korrigierend.',
        dosageTip:
          'Nach der Ausbringung den Boden-pH überwachen, um starke Anstiege zu vermeiden.',
      },
    },
  },
};


export type CationUnit = 'cmolc' | 'mmolc';

interface InsumoOption {
  id: string;
  name: string;
  element: 'Ca' | 'Mg' | 'K';
  oxidePercentage: number;
  conversionFactor: number;
  oxideName: string;
  description: string;
  dosageTip: string;
}

const CALCIUM_INSUMOS: InsumoOption[] = [
  {
    id: 'wollastonita',
    name: 'Wollastonita (Silicato de Cálcio)',
    element: 'Ca',
    oxidePercentage: 43,
    conversionFactor: 1.397,
    oxideName: 'CaO (Óxido de Cálcio)',
    description: 'Fonte nobre de Cálcio e Silício solúvel (SiO₂). Melhora a estrutura celular e resistência a pragas sem elevar bruscamente o pH.',
    dosageTip: 'Ideal para living soil. Homogeneizar uniformemente em todo o volume do substrato.',
  },
  {
    id: 'gesso_agricola',
    name: 'Gesso Agrícola (Sulfato de Cálcio)',
    element: 'Ca',
    oxidePercentage: 28,
    conversionFactor: 1.397,
    oxideName: 'CaO (Sulfato de Ca ~18% S)',
    description: 'Fornece Cálcio e Enxofre sem alterar o pH do solo. Excelente mobilidade radicular em profundidade.',
    dosageTip: 'Excelente quando o pH já está em 6.2 - 6.8 e apenas o Cálcio precisa subir.',
  },
  {
    id: 'calcario_calcitico',
    name: 'Calcário Calcítico (PRNT 85%)',
    element: 'Ca',
    oxidePercentage: 50,
    conversionFactor: 1.397,
    oxideName: 'CaO (Carbonato de Cálcio)',
    description: 'Aumenta expressivamente o pH e fornece alto teor de Cálcio. Quase isento de Magnésio (< 5% MgO).',
    dosageTip: 'Usar apenas se o pH estiver ácido (< 5.8) e o Magnésio NÃO estiver deficiente.',
  },
  {
    id: 'farinha_conchas',
    name: 'Farinha de Ostras / Conchas Biogênica',
    element: 'Ca',
    oxidePercentage: 50,
    conversionFactor: 1.397,
    oxideName: 'CaO (CaCO₃ Biológico)',
    description: 'Carbonato orgânico de liberação lenta e constante, rico em oligoelementos marinhos benéficos à microbiota.',
    dosageTip: 'Incorporar no preparo inicial de solos reciclados e super solos.',
  },
];

const MAGNESIUM_INSUMOS: InsumoOption[] = [
  {
    id: 'carbonato_magnesio',
    name: 'Carbonato de Magnésio (MgCO₃)',
    element: 'Mg',
    oxidePercentage: 47,
    conversionFactor: 1.6595,
    oxideName: 'MgO (Óxido de Magnésio)',
    description: 'Fonte pura e altamente concentrada de Magnésio. Excelente corretivo para living soil orgânico.',
    dosageTip: 'Misturar bem ao solo seco antes de iniciar a maturação/rega.',
  },
  {
    id: 'sulfato_magnesio',
    name: 'Sulfato de Magnésio (Sal de Epsom)',
    element: 'Mg',
    oxidePercentage: 16.3,
    conversionFactor: 1.6595,
    oxideName: 'MgO (~9.8% Mg elementar + 13% S)',
    description: '100% solúvel em água. Liberação imediata para correções rápidas em rega ou fertirrigação.',
    dosageTip: 'Pode ser aplicado via rega semanal fracionada ou pulverização foliar emergencial.',
  },
  {
    id: 'calcario_dolomitico_insumo',
    name: 'Calcário Dolomítico (PRNT 85%)',
    element: 'Mg',
    oxidePercentage: 18,
    conversionFactor: 1.6595,
    oxideName: 'MgO (~18% MgO + ~30% CaO)',
    description: 'Fornece Magnésio e Cálcio ao mesmo tempo, elevando o pH e o V%. Perfeito quando o Mg estiver baixo.',
    dosageTip: 'Aplicar no preparo de solo 20 a 30 dias antes do transplante de mudas.',
  },
  {
    id: 'serpentinito',
    name: 'Serpentinito Moído (Pó de Rocha Magnesiana)',
    element: 'Mg',
    oxidePercentage: 20,
    conversionFactor: 1.6595,
    oxideName: 'MgO (Silicato de Mg)',
    description: 'Remineralizador de liberação lenta por intemperismo biológico. Enriquece a biologia do solo.',
    dosageTip: 'Ótimo para canteiros no-till e ciclos longos.',
  },
];

const POTASSIUM_INSUMOS: InsumoOption[] = [
  {
    id: 'greensand',
    name: 'Greensand (Glauconita)',
    element: 'K',
    oxidePercentage: 10,
    conversionFactor: 1.205,
    oxideName: 'K₂O (Óxido de Potássio)',
    description: 'Mineral de origem marinha rica em Potássio, Ferro e mais de 30 micronutrientes com liberação suave sem queimar raízes.',
    dosageTip: 'Aumenta a retenção de água e a CTC do substrato com liberação gradual.',
  },
  {
    id: 'leonardita',
    name: 'Leonardita Potássica (Humato de Potássio)',
    element: 'K',
    oxidePercentage: 12,
    conversionFactor: 1.205,
    oxideName: 'K₂O + Ácidos Húmicos e Fúlvicos',
    description: 'Fonte orgânica premium de Potássio combinada com alta carga de substâncias húmicas para estimular raízes e micorrizas.',
    dosageTip: 'Melhora a eficiência de absorção dos cátions e estrutura do solo.',
  },
  {
    id: 'sulfato_potassio_org',
    name: 'Sulfato de Potássio Orgânico (K₂SO₄)',
    element: 'K',
    oxidePercentage: 50,
    conversionFactor: 1.205,
    oxideName: 'K₂O (~41% K + 17% S)',
    description: 'Fonte concentrada natural para suprir alta demanda de floração sem elevar o pH nem adicionar cloreto prejudicial.',
    dosageTip: 'Aplicar fracionado durante a pré-flora e pico de floração.',
  },
  {
    id: 'cinza_casca',
    name: 'Cinza de Casca / Biomassa Tratada',
    element: 'K',
    oxidePercentage: 12,
    conversionFactor: 1.205,
    oxideName: 'K₂O alcalinizante',
    description: 'Resíduo agroecológico calcinado rico em K, Ca e P. Possui efeito corretivo no pH.',
    dosageTip: 'Monitorar o pH do solo após aplicação para evitar subidas bruscas.',
  },
];

export const SoilAnalysisSection: React.FC = () => {
  const { lang, t } = useI18n();
  const term = useTerm();
  const c = COPY[lang];
  /** Nome/descrição/dica do insumo no idioma ativo (fallback para o catálogo PT). */
  const insumoCopy = (id: string) =>
    (c.insumos as Record<string, { name: string; description: string; dosageTip: string }>)[id];
  // Unit toggle state: global default and per-element dropdowns
  const [unit, setUnit] = useState<CationUnit>('cmolc');
  const [caUnit, setCaUnit] = useState<CationUnit>('cmolc');
  const [mgUnit, setMgUnit] = useState<CationUnit>('cmolc');
  const [kUnit, setKUnit] = useState<CationUnit>('cmolc');
  const [ctcUnit, setCtcUnit] = useState<CationUnit>('cmolc');

  // Soil analysis inputs (stored in the chosen unit for each field)
  const [data, setData] = useState<SoilAnalysisData>({
    ph: 6.2,
    organicMatter: 4.5,
    nitrogen: 120,
    phosphorus: 45,
    potassium: 0.6, // in cmolc or 6 in mmolc
    calcium: 5.2,   // in cmolc or 52 in mmolc
    magnesium: 1.4, // in cmolc or 14 in mmolc
    ctc: 12.0,      // in cmolc or 120 in mmolc
  });

  // Total Soil / Substrate Volume to calculate total grams needed
  const [soilVolume, setSoilVolume] = useState<number>(100); // Litros (default 100L de substrato)

  // Metas de saturação de bases (editáveis dentro das faixas agronômicas):
  // Ca 50–65% · Mg 10–15% · K 3–5% (saturação de bases V% máxima de 70%)
  const [targetCaSat, setTargetCaSat] = useState<number>(60);
  const [targetMgSat, setTargetMgSat] = useState<number>(12);
  const [targetKSat, setTargetKSat] = useState<number>(4);
  const clampTarget = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

  // Manual Override / Fine Tuning of recommended grams
  const [manualMode, setManualMode] = useState<boolean>(false);
  const [customGramsCa, setCustomGramsCa] = useState<number>(120);
  const [customGramsMg, setCustomGramsMg] = useState<number>(35);
  const [customGramsK, setCustomGramsK] = useState<number>(30);

  // Selected Insumos state
  const [selectedCaInsumoId, setSelectedCaInsumoId] = useState<string>('wollastonita');
  const [customCaOPercent, setCustomCaOPercent] = useState<number>(43);

  const [selectedMgInsumoId, setSelectedMgInsumoId] = useState<string>('carbonato_magnesio');
  const [customMgOPercent, setCustomMgOPercent] = useState<number>(47);

  const [selectedKInsumoId, setSelectedKInsumoId] = useState<string>('greensand');
  const [customK2OPercent, setCustomK2OPercent] = useState<number>(10);

  // Copy notification state
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Helper to handle global unit change across all fields with automatic conversion
  const handleUnitChange = (newUnit: CationUnit) => {
    if (newUnit === unit) return;
    setData((prev) => ({
      ...prev,
      calcium: caUnit !== newUnit ? (newUnit === 'mmolc' ? Number((prev.calcium * 10).toFixed(1)) : Number((prev.calcium / 10).toFixed(2))) : prev.calcium,
      magnesium: mgUnit !== newUnit ? (newUnit === 'mmolc' ? Number((prev.magnesium * 10).toFixed(1)) : Number((prev.magnesium / 10).toFixed(2))) : prev.magnesium,
      potassium: kUnit !== newUnit ? (newUnit === 'mmolc' ? Number((prev.potassium * 10).toFixed(1)) : Number((prev.potassium / 10).toFixed(2))) : prev.potassium,
      ctc: ctcUnit !== newUnit ? (newUnit === 'mmolc' ? Number((prev.ctc * 10).toFixed(1)) : Number((prev.ctc / 10).toFixed(2))) : prev.ctc,
    }));
    setCaUnit(newUnit);
    setMgUnit(newUnit);
    setKUnit(newUnit);
    setCtcUnit(newUnit);
    setUnit(newUnit);
  };

  // Helper to handle per-element unit change with conversion
  const handleElementUnitChange = (element: 'calcium' | 'magnesium' | 'potassium' | 'ctc', newUnit: CationUnit) => {
    const currentUnit = element === 'calcium' ? caUnit : element === 'magnesium' ? mgUnit : element === 'potassium' ? kUnit : ctcUnit;
    if (newUnit === currentUnit) return;

    setData((prev) => ({
      ...prev,
      [element]: newUnit === 'mmolc' ? Number((prev[element] * 10).toFixed(1)) : Number((prev[element] / 10).toFixed(2)),
    }));

    if (element === 'calcium') setCaUnit(newUnit);
    else if (element === 'magnesium') setMgUnit(newUnit);
    else if (element === 'potassium') setKUnit(newUnit);
    else if (element === 'ctc') setCtcUnit(newUnit);
  };

  // Convert inputs to standard normalized cmolc/dm³ for internal agronomic calculations
  const caCmol = caUnit === 'mmolc' ? data.calcium / 10 : data.calcium;
  const mgCmol = mgUnit === 'mmolc' ? data.magnesium / 10 : data.magnesium;
  const kCmol = kUnit === 'mmolc' ? data.potassium / 10 : data.potassium;
  const ctcCmol = ctcUnit === 'mmolc' ? data.ctc / 10 : data.ctc;

  // Calculate cation ratios (dimensionless, valid in both units)
  const sumCations = caCmol + mgCmol + kCmol;
  const caRatio = mgCmol > 0 ? (caCmol / mgCmol).toFixed(1) : '0';
  const caKRatio = kCmol > 0 ? (caCmol / kCmol).toFixed(1) : '0';
  const mgKRatio = kCmol > 0 ? (mgCmol / kCmol).toFixed(1) : '0';

  const baseSatV = ctcCmol > 0 ? ((sumCations / ctcCmol) * 100).toFixed(1) : '0';

  // Base saturation breakdown (% of CTC)
  const caSatPct = ctcCmol > 0 ? (caCmol / ctcCmol) * 100 : 0;
  const mgSatPct = ctcCmol > 0 ? (mgCmol / ctcCmol) * 100 : 0;
  const kSatPct = ctcCmol > 0 ? (kCmol / ctcCmol) * 100 : 0;

  // Metas editáveis (estado): Ca 50–65%, Mg 10–15%, K 3–5% da CTC
  const targetCaCmol = (targetCaSat / 100) * ctcCmol;
  const targetMgCmol = (targetMgSat / 100) * ctcCmol;
  const targetKCmol = (targetKSat / 100) * ctcCmol;

  // Saturação de bases (V%) = soma Ca + Mg + K — recalculada ao mover as barras.
  const targetSumSat = targetCaSat + targetMgSat + targetKSat;

  // Relações-alvo proporcionais às metas (recalculadas ao mover as barras).
  const targetCaMgRatio = targetMgSat > 0 ? targetCaSat / targetMgSat : 0;
  const targetCaKRatio = targetKSat > 0 ? targetCaSat / targetKSat : 0;
  const targetMgKRatio = targetKSat > 0 ? targetMgSat / targetKSat : 0;

  // Deficits in cmolc/dm³ (0 if current already exceeds target)
  const defCaCmol = Math.max(0, targetCaCmol - caCmol);
  const defMgCmol = Math.max(0, targetMgCmol - mgCmol);
  const defKCmol = Math.max(0, targetKCmol - kCmol);

  // Elementary conversion factor from cmolc/dm³ to grams per liter of soil:
  // Atomic mass / valence / 100:
  // Ca: 40.08 / 2 / 100 = 0.2004 g/dm³ por cmolc
  // Mg: 24.31 / 2 / 100 = 0.1215 g/dm³ por cmolc
  // K:  39.10 / 1 / 100 = 0.3910 g/dm³ por cmolc
  const gCaPerLiter = defCaCmol * 0.2004;
  const gMgPerLiter = defMgCmol * 0.1215;
  const gKPerLiter = defKCmol * 0.3910;

  const autoGramsCa = Number((gCaPerLiter * soilVolume).toFixed(2));
  const autoGramsMg = Number((gMgPerLiter * soilVolume).toFixed(2));
  const autoGramsK = Number((gKPerLiter * soilVolume).toFixed(2));

  // Active grams used in insumo calculation:
  const activeGramsCa = manualMode ? customGramsCa : autoGramsCa;
  const activeGramsMg = manualMode ? customGramsMg : autoGramsMg;
  const activeGramsK = manualMode ? customGramsK : autoGramsK;

  // Selected Insumos objects
  const selectedCaInsumo = CALCIUM_INSUMOS.find((i) => i.id === selectedCaInsumoId) || CALCIUM_INSUMOS[0];
  const selectedMgInsumo = MAGNESIUM_INSUMOS.find((i) => i.id === selectedMgInsumoId) || MAGNESIUM_INSUMOS[0];
  const selectedKInsumo = POTASSIUM_INSUMOS.find((i) => i.id === selectedKInsumoId) || POTASSIUM_INSUMOS[0];

  // Specific formulas requested by the user:
  // 1. Cálcio:
  // FC = 1.397 (Ca -> CaO)
  // Quantidade = (Gramas_Ca * 1.397) * 100 / %CaO
  const caFC = 1.397;
  const effectiveCaOPercent = customCaOPercent > 0 ? customCaOPercent : selectedCaInsumo.oxidePercentage;
  const insumoCaGrams = effectiveCaOPercent > 0 
    ? ((activeGramsCa * caFC) * 100) / effectiveCaOPercent 
    : 0;

  // 2. Magnésio:
  // FC = 1.6595 (Mg -> MgO)
  // Quantidade = (Gramas_Mg * 1.6595) * 100 / %MgO
  const mgFC = 1.6595;
  const effectiveMgOPercent = customMgOPercent > 0 ? customMgOPercent : selectedMgInsumo.oxidePercentage;
  const insumoMgGrams = effectiveMgOPercent > 0 
    ? ((activeGramsMg * mgFC) * 100) / effectiveMgOPercent 
    : 0;

  // 3. Potássio:
  // FC = 1.205 (K -> K2O)
  // Quantidade = (Gramas_K * 1.205) * 100 / %K2O
  const kFC = 1.205;
  const effectiveK2OPercent = customK2OPercent > 0 ? customK2OPercent : selectedKInsumo.oxidePercentage;
  const insumoKGrams = effectiveK2OPercent > 0 
    ? ((activeGramsK * kFC) * 100) / effectiveK2OPercent 
    : 0;

  // Diagnostic conditions
  const caMgVal = parseFloat(caRatio);
  const mgKVal = parseFloat(mgKRatio);

  // Is Magnesium critically low?
  // Criterion: Mg < 0.8 cmolc (ou < 8 mmolc) OU %Mg na CTC < 10% OU Ca:Mg > 5.5 OU Mg:K < 2.0
  const isMgCriticallyLow = mgCmol < 0.8 || mgSatPct < 10 || caMgVal > 5.5 || (mgKVal < 2.0 && kCmol > 0.2);

  // Status flags
  let statusCaMg = 'ideal';
  if (caMgVal < 3.0) statusCaMg = 'low_ca';
  else if (caMgVal > 5.5) statusCaMg = 'high_ca';

  let statusPh = 'ideal';
  if (data.ph < 5.8) statusPh = 'acidic';
  else if (data.ph > 7.0) statusPh = 'alkaline';

  // Preset soil volumes
  const volumePresets = [50, 100, 300, 500, 1000];

  // Copy complete recommendation summary
  const handleCopySummary = () => {
    const text = `Advanced Grower - Recomendação de Remineralização & Cátions
Volume de Solo / Substrato: ${soilVolume} Litros
Unidade Padrão: ${unit === 'cmolc' ? 'cmolc/dm³' : 'mmolc/dm³'}
Valores Informados:
• pH: ${data.ph} | M.O.: ${data.organicMatter}%
• Cálcio (Ca): ${data.calcium} ${caUnit}/dm³ (${caSatPct.toFixed(1)}% CTC)
• Magnésio (Mg): ${data.magnesium} ${mgUnit}/dm³ (${mgSatPct.toFixed(1)}% CTC)
• Potássio (K): ${data.potassium} ${kUnit}/dm³ (${kSatPct.toFixed(1)}% CTC)
• CTC: ${data.ctc} ${ctcUnit}/dm³ | V%: ${baseSatV}%

Relações:
• Ca:Mg: ${caRatio}:1 (Meta: ${targetCaMgRatio.toFixed(1)}:1)
• Ca:K: ${caKRatio}:1 (Meta: ${targetCaKRatio.toFixed(1)}:1)
• Mg:K: ${mgKRatio}:1 (Meta: ${targetMgKRatio.toFixed(1)}:1)

Recomendação de Nutrientes Puros:
• Cálcio puro: ${activeGramsCa.toFixed(1)} g Ca
• Magnésio puro: ${activeGramsMg.toFixed(1)} g Mg
• Potássio puro: ${activeGramsK.toFixed(1)} g K

Recomendação de Insumos Agrícolas:
1. Cálcio: ${selectedCaInsumo.name} (${effectiveCaOPercent}% CaO) = ${insumoCaGrams.toFixed(2)} g (${(insumoCaGrams / soilVolume).toFixed(2)} g/L)
   Fórmula: (${activeGramsCa.toFixed(1)} * 1.397) * 100 / ${effectiveCaOPercent}
2. Magnésio: ${selectedMgInsumo.name} (${effectiveMgOPercent}% MgO) = ${insumoMgGrams.toFixed(2)} g (${(insumoMgGrams / soilVolume).toFixed(2)} g/L)
   Fórmula: (${activeGramsMg.toFixed(1)} * 1.6595) * 100 / ${effectiveMgOPercent}
3. Potássio: ${selectedKInsumo.name} (${effectiveK2OPercent}% K₂O) = ${insumoKGrams.toFixed(2)} g (${(insumoKGrams / soilVolume).toFixed(2)} g/L)
   Fórmula: (${activeGramsK.toFixed(1)} * 1.205) * 100 / ${effectiveK2OPercent}
${isMgCriticallyLow ? '\n⚠️ ALERTA MAGNÉSIO MUITO BAIXO: Recomendado uso de Calcário Dolomítico ao invés de Calcítico para reequilibrar Ca e Mg juntos!' : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 p-4 sm:p-5 rounded-2xl border border-emerald-800/80 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-800/80 rounded-xl text-emerald-300 shrink-0 shadow-inner">
              <TestTube className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-emerald-100">
                {c.title}
              </h2>
              <p className="text-xs text-emerald-300/80 mt-0.5">
                {c.description}
              </p>
            </div>
          </div>

          {/* Unit Switcher & Quick Actions */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="bg-slate-950/90 border border-emerald-700/60 rounded-xl p-1 flex items-center shadow-sm">
              <span className="text-[11px] font-semibold text-emerald-300 px-2 flex items-center gap-1">
                <Beaker className="w-3.5 h-3.5 text-emerald-400" />
                {c.unit}
              </span>
              <select
                id="select-cation-unit"
                aria-label={c.unitAria}
                value={unit}
                onChange={(e) => handleUnitChange(e.target.value as CationUnit)}
                className="bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 text-xs font-bold rounded-lg px-2.5 py-1.5 border border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
              >
                <option value="cmolc">{c.unitCmolc}</option>
                <option value="mmolc">{c.unitMmolc}</option>
              </select>
            </div>

            <button
              onClick={handleCopySummary}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              title={c.copyTitle}
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{copiedSummary ? 'Copiado!' : 'Copiar Laudo'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Inputs + Relações */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              {c.inputs}
            </h3>
            <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
              {c.currentUnit} <strong className="text-emerald-300">{unit}/dm³</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">{c.ph}</label>
              <input
                id="input-ph"
                type="number"
                step="0.1"
                value={data.ph}
                onChange={(e) => setData({ ...data, ph: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-400">{c.phHint}</span>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">{c.organicMatter}</label>
              <input
                id="input-mo"
                type="number"
                step="0.1"
                value={data.organicMatter}
                onChange={(e) => setData({ ...data, organicMatter: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-400">Ideal Living Soil: &gt; 4.0%</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-medium">{c.calcium}</label>
                <select
                  id="select-unit-ca"
                  aria-label={c.caUnitAria}
                  value={caUnit}
                  onChange={(e) => handleElementUnitChange('calcium', e.target.value as CationUnit)}
                  className="text-[10px] font-bold bg-slate-950 border border-emerald-700/80 text-emerald-300 rounded-md px-1.5 py-0.5 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm hover:bg-slate-900"
                >
                  <option value="cmolc">cmol/dm³</option>
                  <option value="mmolc">mmol/dm³</option>
                </select>
              </div>
              <input
                id="input-calcium"
                type="number"
                step="0.01"
                value={data.calcium}
                onChange={(e) => setData({ ...data, calcium: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-400">{t('soil.metaPct', { pct: targetCaSat.toFixed(1) })} · {t('soil.caRange')}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-medium">{c.magnesium}</label>
                <select
                  id="select-unit-mg"
                  aria-label={c.mgUnitAria}
                  value={mgUnit}
                  onChange={(e) => handleElementUnitChange('magnesium', e.target.value as CationUnit)}
                  className="text-[10px] font-bold bg-slate-950 border border-emerald-700/80 text-emerald-300 rounded-md px-1.5 py-0.5 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm hover:bg-slate-900"
                >
                  <option value="cmolc">cmol/dm³</option>
                  <option value="mmolc">mmol/dm³</option>
                </select>
              </div>
              <input
                id="input-magnesium"
                type="number"
                step="0.01"
                value={data.magnesium}
                onChange={(e) => setData({ ...data, magnesium: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-400">{c.mgMeta}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-medium">{c.potassium}</label>
                <select
                  id="select-unit-k"
                  aria-label={c.kUnitAria}
                  value={kUnit}
                  onChange={(e) => handleElementUnitChange('potassium', e.target.value as CationUnit)}
                  className="text-[10px] font-bold bg-slate-950 border border-emerald-700/80 text-emerald-300 rounded-md px-1.5 py-0.5 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm hover:bg-slate-900"
                >
                  <option value="cmolc">cmol/dm³</option>
                  <option value="mmolc">mmol/dm³</option>
                </select>
              </div>
              <input
                id="input-potassium"
                type="number"
                step="0.01"
                value={data.potassium}
                onChange={(e) => setData({ ...data, potassium: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-400">{c.kMeta}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-medium">{c.ctc}</label>
                <select
                  id="select-unit-ctc"
                  aria-label={c.ctcUnitAria}
                  value={ctcUnit}
                  onChange={(e) => handleElementUnitChange('ctc', e.target.value as CationUnit)}
                  className="text-[10px] font-bold bg-slate-950 border border-emerald-700/80 text-emerald-300 rounded-md px-1.5 py-0.5 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm hover:bg-slate-900"
                >
                  <option value="cmolc">cmol/dm³</option>
                  <option value="mmolc">mmol/dm³</option>
                </select>
              </div>
              <input
                id="input-ctc"
                type="number"
                step="0.1"
                value={data.ctc}
                onChange={(e) => setData({ ...data, ctc: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-400">{c.ctcHint}</span>
            </div>
          </div>

          {/* Volume de Solo / Substrato Input */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                {c.volume}
              </label>
              <span className="text-xs font-bold text-emerald-400">{soilVolume} {c.liters}</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="input-soil-volume"
                type="number"
                min="1"
                step="5"
                value={soilVolume}
                onChange={(e) => setSoilVolume(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-28 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-sm text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
              />
              <div className="flex flex-wrap gap-1">
                {volumePresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setSoilVolume(preset)}
                    className={`text-[11px] font-semibold px-2 py-1 rounded-lg border transition-colors ${
                      soilVolume === preset
                        ? 'bg-emerald-800 text-emerald-100 border-emerald-600'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {preset === 1000 ? '1 m³ (1.000L)' : `${preset}L`}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              {c.volumeHint}
            </p>
          </div>

        </div>

        {/* Right Column: Relações Catiônicas, Distribuição e Metas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                {c.relations}
              </h3>
              <span className="text-[10px] text-slate-400">
                {t('soil.standard')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">{c.caMg}</span>
                <span className={`text-xl font-black block mt-0.5 ${
                  Math.abs(caMgVal - targetCaMgRatio) <= 1 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {caRatio} : 1
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{t('soil.targetRatio', { value: targetCaMgRatio.toFixed(1) })}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">{c.baseSat}</span>
                <span className={`text-xl font-black block mt-0.5 ${
                  Math.abs(parseFloat(baseSatV) - targetSumSat) <= 5 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {baseSatV}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{t('soil.targetV', { pct: targetSumSat.toFixed(1) })}</span>
                {targetSumSat > 70 && (
                  <span className="text-[9px] text-amber-400 block mt-0.5">⚠ {t('soil.overTarget')}</span>
                )}
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">{c.caK}</span>
                <span className={`text-lg font-bold block mt-0.5 ${
                  Math.abs(parseFloat(caKRatio) - targetCaKRatio) <= 4 ? 'text-emerald-400' : 'text-amber-400'
                }`}>{caKRatio} : 1</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{t('soil.targetRatio', { value: targetCaKRatio.toFixed(1) })}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">{c.mgK}</span>
                <span className={`text-lg font-bold block mt-0.5 ${
                  Math.abs(mgKVal - targetMgKRatio) <= 0.8 ? 'text-emerald-400' : 'text-amber-400'
                }`}>{mgKRatio} : 1</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{t('soil.targetRatio', { value: targetMgKRatio.toFixed(1) })}</span>
              </div>
            </div>

            {/* Saturation Breakdown Visual Progress Bars */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-300 font-semibold block text-[11px]">
                {c.distribution}
              </span>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-300">{c.calcium}: {caSatPct.toFixed(1)}%</span>
                    <span className="text-slate-400">{t('soil.metaPct', { pct: targetCaSat.toFixed(1) })}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (caSatPct / targetCaSat) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-300">{c.magnesium}: {mgSatPct.toFixed(1)}%</span>
                    <span className="text-slate-400">{t('soil.metaPct', { pct: targetMgSat.toFixed(1) })}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        mgSatPct < 10 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (mgSatPct / targetMgSat) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-300">{c.potassium}: {kSatPct.toFixed(1)}%</span>
                    <span className="text-slate-400">{t('soil.metaPct', { pct: targetKSat.toFixed(1) })}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div 
                      className="bg-amber-400 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (kSatPct / targetKSat) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metas de saturação de bases (editáveis) */}
          <div className="pt-3 mt-1 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                {t('soil.targetsTitle')}
              </label>
              <button
                type="button"
                onClick={() => { setTargetCaSat(60); setTargetMgSat(12); setTargetKSat(4); }}
                className="text-[10px] font-semibold text-emerald-300 hover:text-emerald-200 underline decoration-dotted"
              >
                {t('soil.targetsReset')}
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-300">{c.calcium}</span>
                  <span className="font-bold text-blue-300">{targetCaSat.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={65}
                  step={0.5}
                  value={targetCaSat}
                  onChange={(e) => setTargetCaSat(clampTarget(Number(e.target.value), 50, 65))}
                  className="w-full accent-blue-500 cursor-pointer"
                  aria-label={`${c.calcium} 50-65%`}
                />
                <div className="flex justify-between text-[9px] text-slate-500">
                  <span>50%</span>
                  <span>{t('soil.caRange')}</span>
                  <span>65%</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-300">{c.magnesium}</span>
                  <span className="font-bold text-emerald-300">{targetMgSat.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={15}
                  step={0.5}
                  value={targetMgSat}
                  onChange={(e) => setTargetMgSat(clampTarget(Number(e.target.value), 10, 15))}
                  className="w-full accent-emerald-500 cursor-pointer"
                  aria-label={`${c.magnesium} 10-15%`}
                />
                <div className="flex justify-between text-[9px] text-slate-500">
                  <span>10%</span>
                  <span>{t('soil.mgRange')}</span>
                  <span>15%</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-300">{c.potassium}</span>
                  <span className="font-bold text-amber-300">{targetKSat.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={5}
                  step={0.1}
                  value={targetKSat}
                  onChange={(e) => setTargetKSat(clampTarget(Number(e.target.value), 3, 5))}
                  className="w-full accent-amber-500 cursor-pointer"
                  aria-label={`${c.potassium} 3-5%`}
                />
                <div className="flex justify-between text-[9px] text-slate-500">
                  <span>3%</span>
                  <span>{t('soil.kRange')}</span>
                  <span>5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO DE RECOMENDAÇÃO AUTOMÁTICA EM GRAMAS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {c.recommendation}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {c.recDesc} <strong>{soilVolume} {c.liters}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setManualMode(!manualMode);
                if (!manualMode) {
                  setCustomGramsCa(autoGramsCa);
                  setCustomGramsMg(autoGramsMg);
                  setCustomGramsK(autoGramsK);
                }
              }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
                manualMode
                  ? 'bg-amber-600/30 text-amber-200 border-amber-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {manualMode ? '✏️ Modo Manual Ativo' : 'Ajustar Gramas Manualmente'}
            </button>
            {manualMode && (
              <button
                onClick={() => {
                  setCustomGramsCa(autoGramsCa);
                  setCustomGramsMg(autoGramsMg);
                  setCustomGramsK(autoGramsK);
                }}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-emerald-900/60 text-emerald-200 border border-emerald-700 hover:bg-emerald-800"
                title={c.resetTitle}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Display of pure element recommendation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Pure Calcium */}
          <div className="bg-slate-950 border border-blue-900/50 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-300">{c.pureCa}</span>
              <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">
                {t('soil.targetCtc', { pct: targetCaSat.toFixed(1) })}
              </span>
            </div>

            {manualMode ? (
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 block">{c.manualCaLabel}</label>
                <input
                  type="number"
                  step="1"
                  value={customGramsCa}
                  onChange={(e) => setCustomGramsCa(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-900 border border-blue-700 rounded-lg px-2.5 py-1 text-base font-bold text-blue-200 focus:outline-none focus:border-blue-400"
                />
              </div>
            ) : (
              <div>
                <div className="text-2xl font-black text-blue-300">
                  {autoGramsCa.toFixed(1)} <span className="text-sm font-normal text-slate-400">{c.grams}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  ({(autoGramsCa / soilVolume).toFixed(2)} {c.gramsPerLiterSoil}) • {c.deficitLabel}: {defCaCmol.toFixed(2)} cmolc/dm³
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Pure Magnesium */}
          <div className="bg-slate-950 border border-emerald-900/50 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-300">{c.pureMg}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                {t('soil.targetCtc', { pct: targetMgSat.toFixed(1) })}
              </span>
            </div>

            {manualMode ? (
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 block">{c.manualMgLabel}</label>
                <input
                  type="number"
                  step="1"
                  value={customGramsMg}
                  onChange={(e) => setCustomGramsMg(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-900 border border-emerald-700 rounded-lg px-2.5 py-1 text-base font-bold text-emerald-200 focus:outline-none focus:border-emerald-400"
                />
              </div>
            ) : (
              <div>
                <div className="text-2xl font-black text-emerald-300">
                  {autoGramsMg.toFixed(1)} <span className="text-sm font-normal text-slate-400">{c.grams}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  ({(autoGramsMg / soilVolume).toFixed(2)} {c.gramsPerLiterSoil}) • {c.deficitLabel}: {defMgCmol.toFixed(2)} cmolc/dm³
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Pure Potassium */}
          <div className="bg-slate-950 border border-amber-900/50 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300">{c.pureK}</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                {t('soil.targetCtc', { pct: targetKSat.toFixed(1) })}
              </span>
            </div>

            {manualMode ? (
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 block">{c.manualKLabel}</label>
                <input
                  type="number"
                  step="1"
                  value={customGramsK}
                  onChange={(e) => setCustomGramsK(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-900 border border-amber-700 rounded-lg px-2.5 py-1 text-base font-bold text-amber-200 focus:outline-none focus:border-amber-400"
                />
              </div>
            ) : (
              <div>
                <div className="text-2xl font-black text-amber-300">
                  {autoGramsK.toFixed(1)} <span className="text-sm font-normal text-slate-400">{c.grams}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  ({(autoGramsK / soilVolume).toFixed(2)} {c.gramsPerLiterSoil}) • {c.deficitLabel}: {defKCmol.toFixed(2)} cmolc/dm³
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3 JANELAS DISTINTAS DE CONVERSÃO EM INSUMO AGRÍCOLA */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              {c.conversion}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{c.formula}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ============================================================== */}
          {/* JANELA 1: CÁLCIO (Ca) */}
          {/* ============================================================== */}
          <div className="bg-slate-900 border-2 border-blue-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md space-y-4 relative">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-900/60 border border-blue-700 flex items-center justify-center font-bold text-blue-300 text-xs">
                    Ca
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-blue-100">{c.window1}</h4>
                    <span className="text-[11px] text-blue-400/90 font-medium">
                      {c.factorCa} <strong>1,397</strong>
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-300 bg-blue-950 px-2 py-1 rounded-md border border-blue-800">
                  {activeGramsCa.toFixed(1)} g Ca
                </span>
              </div>

              {/* Insumo Selector */}
              <div className="space-y-1.5 text-xs">
                <label className="block text-slate-300 font-semibold">{c.choose} {c.calcium}:</label>
                <select
                  id="select-calcium-insumo"
                  aria-label={c.caInsumoAria}
                  value={selectedCaInsumoId}
                  onChange={(e) => {
                    const found = CALCIUM_INSUMOS.find((i) => i.id === e.target.value);
                    setSelectedCaInsumoId(e.target.value);
                    if (found) setCustomCaOPercent(found.oxidePercentage);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {CALCIUM_INSUMOS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {insumoCopy(item.id)?.name ?? item.name} ({item.oxidePercentage}% CaO)
                    </option>
                  ))}
                </select>
              </div>

              {/* Editable oxide percentage */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">{t('soil.caOxide')}</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={customCaOPercent}
                      onChange={(e) => setCustomCaOPercent(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 font-bold focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-slate-400 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">{c.needCa}</label>
                  <div className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-blue-300 font-bold">
                    {(activeGramsCa * caFC).toFixed(2)} g CaO
                  </div>
                </div>
              </div>

              {/* Description & Agronomic tip */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] space-y-1 text-slate-300">
                <p className="leading-relaxed">{insumoCopy(selectedCaInsumo.id)?.description ?? selectedCaInsumo.description}</p>
                <p className="text-blue-400/90 font-medium">💡 {insumoCopy(selectedCaInsumo.id)?.dosageTip ?? selectedCaInsumo.dosageTip}</p>
              </div>

              {/* Calculation Formula Display */}
              <div className="p-3 bg-blue-950/40 border border-blue-900/60 rounded-xl text-[11px] space-y-1 font-mono text-blue-200">
                <div className="text-[10px] text-blue-400 uppercase tracking-wider font-sans font-bold">
                  {c.mathMemory}
                </div>
                <div>
                  ({activeGramsCa.toFixed(1)} g Ca × 1,397) × 100 ÷ {effectiveCaOPercent}% =
                </div>
                <div className="font-bold text-blue-300">
                  ({(activeGramsCa * caFC).toFixed(2)} g CaO) ÷ {(effectiveCaOPercent / 100).toFixed(2)} = <strong>{insumoCaGrams.toFixed(2)} g</strong>
                </div>
              </div>
            </div>

            {/* Bottom Result Box */}
            <div className="p-4 bg-gradient-to-br from-blue-950 via-slate-950 to-blue-950/90 border border-blue-700/80 rounded-xl space-y-1 shadow-inner">
              <span className="text-[10px] text-blue-300 uppercase font-bold tracking-wider block">
                {c.totalDose}
              </span>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-black text-blue-100">
                  {insumoCaGrams.toFixed(2)} <span className="text-sm font-medium text-blue-300">{c.grams}</span>
                </div>
                <div className="text-xs font-bold text-blue-300 bg-blue-900/70 px-2 py-0.5 rounded">
                  {(insumoCaGrams / soilVolume).toFixed(2)} {c.gramsPerLiter}
                </div>
              </div>
              <p className="text-[11px] text-blue-200/80">
                {c.doseForPrefix} <strong>{(insumoCopy(selectedCaInsumo.id)?.name ?? selectedCaInsumo.name).split('(')[0]}</strong> {t('soil.forVolume').replace('{volume}', String(soilVolume))}.
              </p>
            </div>
          </div>

          {/* ============================================================== */}
          {/* JANELA 2: MAGNÉSIO (Mg) */}
          {/* ============================================================== */}
          <div className="bg-slate-900 border-2 border-emerald-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md space-y-4 relative">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-900/60 border border-emerald-700 flex items-center justify-center font-bold text-emerald-300 text-xs">
                    Mg
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-emerald-100">{c.window2}</h4>
                    <span className="text-[11px] text-emerald-400/90 font-medium">
                      {c.factorMg} <strong>1,6595</strong>
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-1 rounded-md border border-emerald-800">
                  {activeGramsMg.toFixed(1)} g Mg
                </span>
              </div>

              {/* Insumo Selector */}
              <div className="space-y-1.5 text-xs">
                <label className="block text-slate-300 font-semibold">{c.choose} {c.magnesium}:</label>
                <select
                  id="select-magnesium-insumo"
                  aria-label={c.mgInsumoAria}
                  value={selectedMgInsumoId}
                  onChange={(e) => {
                    const found = MAGNESIUM_INSUMOS.find((i) => i.id === e.target.value);
                    setSelectedMgInsumoId(e.target.value);
                    if (found) setCustomMgOPercent(found.oxidePercentage);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {MAGNESIUM_INSUMOS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {insumoCopy(item.id)?.name ?? item.name} ({item.oxidePercentage}% MgO)
                    </option>
                  ))}
                </select>
              </div>

              {/* Editable oxide percentage */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">{t('soil.mgOxide')}</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={customMgOPercent}
                      onChange={(e) => setCustomMgOPercent(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-slate-400 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">{c.needMg}</label>
                  <div className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-emerald-300 font-bold">
                    {(activeGramsMg * mgFC).toFixed(2)} g MgO
                  </div>
                </div>
              </div>

              {/* Description & Agronomic tip */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] space-y-1 text-slate-300">
                <p className="leading-relaxed">{insumoCopy(selectedMgInsumo.id)?.description ?? selectedMgInsumo.description}</p>
                <p className="text-emerald-400/90 font-medium">💡 {insumoCopy(selectedMgInsumo.id)?.dosageTip ?? selectedMgInsumo.dosageTip}</p>
              </div>

              {/* Calculation Formula Display */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-[11px] space-y-1 font-mono text-emerald-200">
                <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-sans font-bold">
                  {c.mathMemory}
                </div>
                <div>
                  ({activeGramsMg.toFixed(1)} g Mg × 1,6595) × 100 ÷ {effectiveMgOPercent}% =
                </div>
                <div className="font-bold text-emerald-300">
                  ({(activeGramsMg * mgFC).toFixed(2)} g MgO) ÷ {(effectiveMgOPercent / 100).toFixed(2)} = <strong>{insumoMgGrams.toFixed(2)} g</strong>
                </div>
              </div>
            </div>

            {/* Bottom Result Box */}
            <div className="p-4 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950/90 border border-emerald-700/80 rounded-xl space-y-1 shadow-inner">
              <span className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider block">
                {c.totalDose}
              </span>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-black text-emerald-100">
                  {insumoMgGrams.toFixed(2)} <span className="text-sm font-medium text-emerald-300">{c.grams}</span>
                </div>
                <div className="text-xs font-bold text-emerald-300 bg-emerald-900/70 px-2 py-0.5 rounded">
                  {(insumoMgGrams / soilVolume).toFixed(2)} {c.gramsPerLiter}
                </div>
              </div>
              <p className="text-[11px] text-emerald-200/80">
                {c.doseForPrefix} <strong>{selectedMgInsumo.name.split('(')[0]}</strong> para os {soilVolume} Litros.
              </p>
            </div>
          </div>

          {/* ============================================================== */}
          {/* JANELA 3: POTÁSSIO (K) */}
          {/* ============================================================== */}
          <div className="bg-slate-900 border-2 border-amber-800/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md space-y-4 relative">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-900/60 border border-amber-700 flex items-center justify-center font-bold text-amber-300 text-xs">
                    K
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-amber-100">{c.window3}</h4>
                    <span className="text-[11px] text-amber-400/90 font-medium">
                      {c.factorK} <strong>1,205</strong>
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-300 bg-amber-950 px-2 py-1 rounded-md border border-amber-800">
                  {activeGramsK.toFixed(1)} g K
                </span>
              </div>

              {/* Insumo Selector */}
              <div className="space-y-1.5 text-xs">
                <label className="block text-slate-300 font-semibold">{c.choose} {c.potassium}:</label>
                <select
                  id="select-potassium-insumo"
                  aria-label={c.kInsumoAria}
                  value={selectedKInsumoId}
                  onChange={(e) => {
                    const found = POTASSIUM_INSUMOS.find((i) => i.id === e.target.value);
                    setSelectedKInsumoId(e.target.value);
                    if (found) setCustomK2OPercent(found.oxidePercentage);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {POTASSIUM_INSUMOS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {insumoCopy(item.id)?.name ?? item.name} ({item.oxidePercentage}% K₂O)
                    </option>
                  ))}
                </select>
              </div>

              {/* Editable oxide percentage */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">{t('soil.kOxide')}</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={customK2OPercent}
                      onChange={(e) => setCustomK2OPercent(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 font-bold focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-slate-400 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">{c.needK}</label>
                  <div className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-amber-300 font-bold">
                    {(activeGramsK * kFC).toFixed(2)} g K₂O
                  </div>
                </div>
              </div>

              {/* Description & Agronomic tip */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] space-y-1 text-slate-300">
                <p className="leading-relaxed">{insumoCopy(selectedKInsumo.id)?.description ?? selectedKInsumo.description}</p>
                <p className="text-amber-400/90 font-medium">💡 {insumoCopy(selectedKInsumo.id)?.dosageTip ?? selectedKInsumo.dosageTip}</p>
              </div>

              {/* Calculation Formula Display */}
              <div className="p-3 bg-amber-950/40 border border-amber-900/60 rounded-xl text-[11px] space-y-1 font-mono text-amber-200">
                <div className="text-[10px] text-amber-400 uppercase tracking-wider font-sans font-bold">
                  {c.mathMemory}
                </div>
                <div>
                  ({activeGramsK.toFixed(1)} g K × 1,205) × 100 ÷ {effectiveK2OPercent}% =
                </div>
                <div className="font-bold text-amber-300">
                  ({(activeGramsK * kFC).toFixed(2)} g K₂O) ÷ {(effectiveK2OPercent / 100).toFixed(2)} = <strong>{insumoKGrams.toFixed(2)} g</strong>
                </div>
              </div>
            </div>

            {/* Bottom Result Box */}
            <div className="p-4 bg-gradient-to-br from-amber-950 via-slate-950 to-amber-950/90 border border-amber-700/80 rounded-xl space-y-1 shadow-inner">
              <span className="text-[10px] text-amber-300 uppercase font-bold tracking-wider block">
                {c.totalDose}
              </span>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-black text-amber-100">
                  {insumoKGrams.toFixed(2)} <span className="text-sm font-medium text-amber-300">{c.grams}</span>
                </div>
                <div className="text-xs font-bold text-amber-300 bg-amber-900/70 px-2 py-0.5 rounded">
                  {(insumoKGrams / soilVolume).toFixed(2)} {c.gramsPerLiter}
                </div>
              </div>
              <p className="text-[11px] text-amber-200/80">
                {c.doseForPrefix} <strong>{selectedKInsumo.name.split('(')[0]}</strong> para os {soilVolume} Litros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

