import React, { useState, useEffect, useRef } from 'react';
import { WeatherSubMenu } from '../types';
import { 
  CloudSun, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sparkles, 
  RefreshCw, 
  Sun, 
  Sunset,
  Moon,
  Compass,
  MapPin,
  Layers,
  Send, 
  Image as ImageIcon, 
  CheckCircle,
  Eye,
  CloudRain,
  AlertTriangle,
  Radio,
  Flame,
  ShieldAlert,
  SunMedium,
  Gauge,
  Activity,
  Zap
} from 'lucide-react';
import L from 'leaflet';
import { useI18n, useTerm } from '../i18n';

const COPY = {
  pt: {
    title: '3.1 Estação Meteorológica Outdoor INMET & Previsão Agroclimática',
    description: 'Monitoramento agroclimático regional para cultivo outdoor na região de cultivo e municípios adjacentes.',
    refresh: 'Atualizar INMET',
    active: 'Motor Meteorológico Ativo em Tempo Real:',
    updated: 'Atualizado ao vivo',
    alert: 'ALERTA FITOSSANITÁRIO OUTDOOR: Umidade Crítica',
    dew: 'Ponto de Orvalho',
    botrytis: 'Risco de Botrytis',
    alertText: 'Com umidade relativa superior a 80% e temperatura amena, o risco de orvalho foliar e proliferação de fungos patogênicos (Botrytis cinerea - Mofo Cinzento e Oídio) é máximo nos buds e flores de Cannabis.',
    city: 'Município do Cultivo Outdoor:',
    altitude: 'Alt:',
    temperature: 'Temperatura do Ar',
    humidity: 'Umidade Relativa (UR)',
    rain24: 'Chuva 24h:',
    wind: 'Velocidade dos Ventos',
    direction: 'Direção:',
    gusts: 'Rajadas:',
    light: 'Sol Desperta / Vai Embora',
    photoperiod: 'Fotoperíodo Direto:',
    moon: 'Qual a Lua:',
    illumination: 'iluminação',
    moonCycle: 'Ciclo Lunar para Cultivo Outdoor Orgânico',
    moonTip: 'Orientação Agronômica para esta Lua:',
    vpd: 'VPD Outdoor Calculado:',
    solar: 'Radiação Solar:',
    rainChance: 'Prob. Chuva:',
    mapTitle: 'Mapa de Monitoramento Agroclimático & Radar Ao Vivo',
    mapDesc: 'Motor meteorológico integrado para {city}/SP e microrregião. Selecione camadas orbitais, radares doppler ou parâmetros agrometeorológicos.',
    satellite: 'Satélite HD',
    storm: 'Radar Tempestades',
    clouds: 'Movimentação Nuvens',
    rain: 'Chuva & Acumulado',
    winds: 'Ventos Ao Vivo',
    layers: 'Camadas de Monitoramento Especializado (Cultivo Outdoor & Estufa):',
    forecast: 'Previsão do Tempo INMET - {city}/SP e Região',
    forecastUpdated: 'Atualizado via Rede INMET',
    vpdLow: 'ALERTA DE ALTA UMIDADE (UR {rh}% / VPD {vpd} kPa): risco elevado de Botrytis e Oídio. Aumente a aeração do dossel, faça desfolha preventiva e aplique biofungicidas à base de Bacillus subtilis ou JADAM JS. Evite regas ao entardecer.',
    vpdIdealVeg: 'Clima ideal para mudas, clones e vegetativo inicial (VPD {vpd} kPa / UR {rh}%). Excelente taxa de transpiração sem dessecação.',
    vpdIdealFlower: 'Clima excelente para vegetativo avançado e floração média (VPD {vpd} kPa / UR {rh}%). Plena atividade fotossintética e estomática.',
    vpdIdealLate: 'Clima seco ideal para floração avançada e maturação (VPD {vpd} kPa / UR {rh}%). Estimula tricomas e terpenos e protege a resina.',
    vpdHigh: 'Clima muito seco (VPD {vpd} kPa / UR {rh}%): risco de estresse hídrico e fechamento estomático. Aumente a cobertura morta e monitore as regas.',
    forecastDays: ['Hoje Manhã', 'Hoje Tarde', 'Hoje Noite', 'Amanhã', 'Depois de Amanhã', 'Em 3 Dias'],
    gustsLayer: 'Rajadas de Vento',
    gustAccuLayer: 'Acumulação de vento',
    ptypeLayer: 'Tipo de precipitação',
    solarLayer: 'Energia Solar',
    alertsLayer: 'Alerta de Clima',
    droughtLayer: 'Monitorização da Seca',
    uvLayer: 'Índice UV',
    baseLayers: 'Camadas Base & Imagens Orbitais:',
    surfaceRes: 'Alta resolução de superfície',
    clickRadar: 'Clique para alternar o radar',
    aiOnline: 'Online',
    aiSubtitle: 'Assistente especializado em clima, VPD, nutrição e manejo integrado',
    aiTitle: 'IA Agronômica (Gemini) - Diagnóstico Outdoor',
    refreshTitle: 'Atualizar Dados INMET',
    stationLabel: 'Estação Meteorológica Integrada INMET / Rede Automática',
    stationRef: 'Ref:',
    stationFallback: 'Estação INMET / Rede Automática',
    cityMain: '(Sede / Cultivo Principal)',
    cityDisplay: 'Região de cultivo',
    mapBadge: 'Satélite Orbital Terrestre HD (Esri / NASA)',
    activeLayer: 'Camada Ativa:',
    engineActive: 'Motor Ativo',
    layerRadar: 'Radar Tempestades Doppler',
    layerClouds: 'Movimentação de Nuvens',
    layerRain: 'Chuva & Acumulado',
    layerWind: 'Fluxo de Ventos',
    layerGust: 'Rajadas de Vento',
    layerGustAccu: 'Acumulação de Vento',
    layerPtype: 'Tipo de Precipitação',
    layerSolar: 'Energia Solar & Irradiância',
    layerCap: 'Alerta de Clima (CAP)',
    layerDrought: 'Monitorização da Seca (0-40cm)',
    layerUv: 'Índice UV & Tricomas',
    cardCurrent: 'Atual:',
    cardProjection: 'Projeção e Persistência',
    cardCapNotices: 'Avisos Oficiais CAP',
    cardRhizosphere: 'Rizosfera 0-40cm',
    cardTrichomes: 'Tricomas',
    mapMarkerLabel: 'Cultivo Outdoor',
    mapPopupTitle: 'Cultivo Outdoor',
    mapPopupAltitude: 'Altitude:',
    mapIframeTitle: 'Radar Meteorológico Windy e Camadas Agroclimáticas ao Vivo',
    guidanceTitle: 'Manejo Agronômico:',
    guidanceSatellite: 'Satélite Orbital de Alta Resolução',
    guidanceGust: 'Rajadas de Vento (Sustentação Estrutural)',
    guidanceGustAccu: 'Acumulação de Vento (Evapotranspiração & Quebra-Ventos)',
    guidancePtype: 'Tipo de Precipitação (Granizo & Danos Mecânicos)',
    guidanceSolar: 'Energia Solar (Fotossíntese & DLI Acumulado)',
    guidanceCap: 'Alerta de Clima (Defesa e Proteção Imediata)',
    guidanceDrought: 'Monitorização da Seca (Umidade Radicular 0-40cm)',
    guidanceUv: 'Índice UV (Estímulo de Tricomas, THC/CBD & Terpenos)',
    guidanceRadar: 'Radar Doppler (Detecção Antecipada de Tempestades)',
    guidanceClouds: 'Cobertura de Nuvens (Fotoperíodo & Luminosidade)',
    guidanceRain: 'Chuva Acumulada (Saturação & Lixiviação de Nutrientes)',
    guidanceWind: 'Fluxo e Dinâmica de Ventos',
    networkLabel: 'Rede Meteorológica INMET / WMO',
    guidanceSatelliteText: 'Visualização orbital para identificação de relevo, áreas de sombreamento natural e topografia dos canteiros em {city}.',
    guidanceGustText: 'Rajadas acima de 35-40 km/h podem fraturar galhos pesados em plena floração. Verifique estacas, redes de tutoramento (Scrog/Trellis) e reforce amarrações em {city} (Atual: {gust} km/h).',
    guidanceGustAccuText: 'Ventos persistentes ao longo de dias retiram a umidade do ar próximo à folha, fechando estômatos e desacelerando a fotossíntese. Aplique cobertura vegetal (mulching) e proteja bordaduras com quebra-ventos.',
    guidancePtypeText: 'Identificação em tempo real entre chuva líquida, chuvisco e núcleos de granizo. Se houver previsão de granizo, acione lonas retráteis ou estruturas de cobertura móvel para salvar as inflorescências.',
    guidanceSolarText: 'A energia solar direta (atualmente {radiation} W/m²) comanda a taxa fotossintética e a transpiração. Dias de alta radiação exigem calibração rigorosa do VPD e reposição balanceada de macro e micronutrientes.',
    guidanceCapText: 'Avisos emitidos pela Defesa Civil e órgãos meteorológicos sobre tempestades severas, frentes polares abruptas ou ventanias para a microrregião de {city}.',
    guidanceDroughtText: 'Avalia o teor de umidade no horizonte radicular de 0 a 40cm. Solos secos nessa profundidade provocam atrofia radicular e abortamento de flores; solos saturados causam asfixia e fusariose.',
    guidanceUvText: 'A radiação UV-B natural (atualmente UV {uv}, máx: {uvMax}) estimula os tricomas a produzirem mais resina e canabinoides protetores. Nos horários de pico, certifique-se de que as plantas estão bem hidratadas.',
    guidanceRadarText: 'O radar meteorológico doppler multicor rastreia células de tempestade em aproximação no raio de 250km, permitindo prever a chegada de frentes chuvosas com antecedência de horas.',
    guidanceCloudsText: 'A densidade de nuvens impacta diretamente a quantidade de radiação fotossinteticamente ativa (PAR) recebida pelo dossel vegetativo.',
    guidanceRainText: 'Monitore a lâmina de chuva acumulada (atualmente {rain}). Chuvas torrenciais prolongadas lixiviam nutrientes do solo orgânico e exigem reposição de adubação pós-chuva.',
    guidanceWindText: 'Circulação de ar suave (5 a 15 km/h) estimula caules mais espessos e reduz a camada de umidade estagnada ao redor das folhas, prevenindo oídio.',
    forecastRh: 'UR:',
    forecastWind: 'Vento:',
    alertAction1Title: '1. Manejo do Dossel:',
    alertAction1Text: 'Realizar desfolha seletiva no interior e galhos baixos para manter corrente de ar contínua.',
    alertAction2Title: '2. Controle Biológico:',
    alertAction2Pre: 'Pulverizar preventivamente',
    alertAction2Post: 'ou JMS (JADAM) antes da queda da temperatura noturna.',
    alertAction3Title: '3. Irrigação e Solo:',
    alertAction3Text: 'Suspender regas tardias para não saturar o ar ao entardecer; manter boa drenagem nos canteiros.',
    moonDefaultName: 'Lua Crescente',
    moonPhaseNames: ['Lua Nova', 'Lua Crescente Inicial', 'Lua Quarto Crescente', 'Lua Crescente Gibosa', 'Lua Cheia', 'Lua Minguante Gibosa', 'Lua Quarto Minguante', 'Lua Minguante Final'],
    moonTips: [
      'Seiva concentrada nas raízes. Fase ideal para germinação de sementes e preparo profundo do solo/composteira.',
      'Seiva começando a subir. Bom momento para transplantes de mudas para o solo definitivo.',
      'Seiva em movimento ascendente veloz. Época ideal para podas, LST e aplicação de KNF / bioprotetores.',
      'Força vegetativa máxima. Folhas absorvem nutrientes com alta eficiência.',
      'Seiva acumulada no topo e nos buds/flores. Período de vigor máximo, porém evite podas severas para não estressar a planta.',
      'Seiva iniciando retorno descendente rumo ao caule e raízes.',
      'Seiva se fixando na estrutura de raízes. Ótimo momento para inoculação de micorrizas e bioprotetores de solo.',
      'Raízes em descanso e fortalecimento. Fase recomendada para manejo de substrato e limpeza do canteiro.',
    ],
    moonGenericTip: '{phase} com {illumination} de iluminação. Ajuste podas, transplantes e adubação conforme o vigor observado no canteiro.',
    windDirections: ['N (Norte)', 'NNE (Norte-Nordeste)', 'NE (Nordeste)', 'ENE (Leste-Nordeste)', 'E (Leste)', 'ESE (Leste-Sudeste)', 'SE (Sudeste)', 'SSE (Sul-Sudeste)', 'S (Sul)', 'SSW (Sul-Sudoeste)', 'SW (Sudoeste)', 'WSW (Oeste-Sudoeste)', 'W (Oeste)', 'WNW (Oeste-Noroeste)', 'NW (Noroeste)', 'NNW (Norte-Noroeste)'],
    precipitationFallback: 'Chuva / Granizo',
    precipitationTypes: ['Tempestade com Granizo', 'Tempestade com Raios', 'Pancadas de Chuva', 'Chuva Líquida', 'Garoa / Chuvisco', 'Sem Chuva no Momento'],
    aiSubtitleLong: 'Consulte a IA treinada em cultivo outdoor na região de cultivo, prevenção de fungos com alta umidade, adubação foliar KNF e manejo agroclimático.',
    aiSuggestionsLabel: 'Perguntas frequentes para o cultivo outdoor:',
    aiSuggestionBotrytis: 'Como prevenir Botrytis e oídio com alta umidade nesta fase?',
    aiSuggestionPests: 'Qual manejo KNF/JADAM aplicar contra lagartas e brocas no outdoor?',
    aiSuggestionVpd: 'Como ajustar regas considerando o VPD atual de {vpd} kPa?',
    aiSuggestionStage: 'Adubação foliar orgânica indicada para a fase de {stage}',
    aiStageLabel: 'Estágio de Desenvolvimento Outdoor',
    aiStages: ['Preparo de Solo / Canteiro (Orgânico)', 'Mudas / Clones (Transplante Outdoor)', 'Vegetativo Inicial Outdoor', 'Vegetativo Avançado (Planta Grande)', 'Floração Inicial (Pre-flower Outdoor)', 'Floração Plena (Buds Densos)', 'Maturação Final / Colheita'],
    aiUploadLabel: 'Enviar Foto da Folha / Canteiro (Opcional)',
    aiChangeImage: 'Alterar Imagem',
    aiAttachPhoto: 'Anexar Foto',
    aiRemove: 'Remover',
    aiPreviewAlt: 'Pré-visualização',
    aiPhotoAttached: 'Foto anexada para análise fitossanitária',
    aiPhotoNote: 'Será processada em conjunto com os dados microclimáticos da estação.',
    aiQuestionLabel: 'Sua Pergunta ou Dúvida de Manejo Outdoor',
    aiPlaceholder: 'Exemplo: Com as chuvas e umidade alta na região de cultivo durante a floração, como prevenir Botrytis e oídio com extratos de JADAM JWA ou Bacillus subtilis?',
    aiAnalyzing: 'Analisando com IA Agronômica...',
    aiSubmit: 'Consultar IA Agronômica',
    aiResponseTitle: 'Parecer Técnico da IA Agronômica:',
    aiCopy: 'Copiar',
    aiCopyTitle: 'Copiar resposta',
    errorPrefix: 'Erro:',
    aiConnectionError: 'Erro de conexão ao consultar a IA Agronômica da associação.',
    aiBusyError: 'A IA Agronômica está com alta demanda momentânea. Por favor, tente novamente em instantes.',
    condFreezingDrizzle: 'Garoa com Vento Frio',
    condFreezingRain: 'Chuva Fria Intensa',
    condFrozenPrecip: 'Precipitação Gelada',
    condPartlyCloudy: 'Céu Parcialmente Nublado',
  },
  en: {
    title: '3.1 INMET Outdoor Weather Station & Agroclimatic Forecast',
    description: 'Regional agroclimatic monitoring for outdoor cultivation in the growing region and neighbouring municipalities.',
    refresh: 'Refresh INMET',
    active: 'Live weather engine running:',
    updated: 'Updated live',
    alert: 'OUTDOOR PHYTOSANITARY ALERT: Critical humidity',
    dew: 'Dew point',
    botrytis: 'Botrytis risk',
    alertText: 'With relative humidity above 80% and mild temperatures, the risk of leaf dew and pathogenic fungi (Botrytis cinerea - grey mould and powdery mildew) is highest in cannabis buds and flowers.',
    city: 'Outdoor cultivation municipality:',
    altitude: 'Alt:',
    temperature: 'Air temperature',
    humidity: 'Relative humidity (RH)',
    rain24: 'Rain 24h:',
    wind: 'Wind speed',
    direction: 'Direction:',
    gusts: 'Gusts:',
    light: 'Sunrise / Sunset',
    photoperiod: 'Direct photoperiod:',
    moon: 'Moon phase:',
    illumination: 'illumination',
    moonCycle: 'Lunar cycle for organic outdoor cultivation',
    moonTip: 'Agronomic guidance for this moon:',
    vpd: 'Calculated outdoor VPD:',
    solar: 'Solar radiation:',
    rainChance: 'Rain chance:',
    mapTitle: 'Agroclimatic Monitoring Map & Live Radar',
    mapDesc: 'Integrated weather engine for {city}/SP and the microregion. Select satellite layers, Doppler radar or agrometeorological parameters.',
    satellite: 'HD satellite',
    storm: 'Storm radar',
    clouds: 'Cloud movement',
    rain: 'Rain & accumulation',
    winds: 'Live winds',
    layers: 'Specialised monitoring layers (outdoor & greenhouse):',
    forecast: 'INMET weather forecast - {city}/SP and region',
    forecastUpdated: 'Updated via INMET network',
    vpdLow: 'HIGH HUMIDITY ALERT (RH {rh}% / VPD {vpd} kPa): elevated risk of Botrytis and powdery mildew. Improve canopy airflow, carry out preventive defoliation and apply Bacillus subtilis or JADAM JS biofungicides. Avoid late-afternoon watering.',
    vpdIdealVeg: 'Ideal climate for seedlings, clones and early vegetative growth (VPD {vpd} kPa / RH {rh}%). Excellent transpiration without desiccation.',
    vpdIdealFlower: 'Excellent climate for late vegetative growth and mid-flowering (VPD {vpd} kPa / RH {rh}%). Full photosynthetic and stomatal activity.',
    vpdIdealLate: 'Ideal dry climate for late flowering and ripening (VPD {vpd} kPa / RH {rh}%). Stimulates trichomes and terpenes and protects resin.',
    vpdHigh: 'Very dry climate (VPD {vpd} kPa / RH {rh}%): risk of water stress and stomatal closure. Increase mulch cover and monitor irrigation.',
    forecastDays: ['Today morning', 'Today afternoon', 'Today night', 'Tomorrow', 'Day after tomorrow', 'In 3 days'],
    gustsLayer: 'Wind gusts',
    gustAccuLayer: 'Wind accumulation',
    ptypeLayer: 'Precipitation type',
    solarLayer: 'Solar energy',
    alertsLayer: 'Weather alerts',
    droughtLayer: 'Drought monitoring',
    uvLayer: 'UV index',
    baseLayers: 'Base layers & satellite imagery:',
    surfaceRes: 'High surface resolution',
    clickRadar: 'Click to switch radar',
    aiOnline: 'Online',
    aiSubtitle: 'Specialised assistant for climate, VPD, nutrition and integrated management',
    aiTitle: 'Agronomic AI (Gemini) - Outdoor diagnosis',
    refreshTitle: 'Refresh INMET data',
    stationLabel: 'Integrated INMET weather station / automatic network',
    stationRef: 'Ref:',
    stationFallback: 'INMET station / automatic network',
    cityMain: '(Headquarters / Main crop)',
    cityDisplay: 'Growing region',
    mapBadge: 'HD Earth-orbiting satellite (Esri / NASA)',
    activeLayer: 'Active layer:',
    engineActive: 'Engine active',
    layerRadar: 'Doppler storm radar',
    layerClouds: 'Cloud movement',
    layerRain: 'Rain & accumulation',
    layerWind: 'Wind flow',
    layerGust: 'Wind gusts',
    layerGustAccu: 'Wind accumulation',
    layerPtype: 'Precipitation type',
    layerSolar: 'Solar energy & irradiance',
    layerCap: 'Weather alert (CAP)',
    layerDrought: 'Drought monitoring (0-40 cm)',
    layerUv: 'UV index & trichomes',
    cardCurrent: 'Current:',
    cardProjection: 'Forecast & persistence',
    cardCapNotices: 'Official CAP warnings',
    cardRhizosphere: 'Rhizosphere 0-40 cm',
    cardTrichomes: 'Trichomes',
    mapMarkerLabel: 'Outdoor cultivation',
    mapPopupTitle: 'Outdoor cultivation',
    mapPopupAltitude: 'Altitude:',
    mapIframeTitle: 'Windy live weather radar & agroclimatic layers',
    guidanceTitle: 'Agronomic management:',
    guidanceSatellite: 'High-resolution orbital satellite',
    guidanceGust: 'Wind gusts (structural support)',
    guidanceGustAccu: 'Wind accumulation (evapotranspiration & windbreaks)',
    guidancePtype: 'Precipitation type (hail & mechanical damage)',
    guidanceSolar: 'Solar energy (photosynthesis & accumulated DLI)',
    guidanceCap: 'Weather alert (immediate defence and protection)',
    guidanceDrought: 'Drought monitoring (root-zone moisture 0-40 cm)',
    guidanceUv: 'UV index (trichome, THC/CBD & terpene stimulation)',
    guidanceRadar: 'Doppler radar (early storm detection)',
    guidanceClouds: 'Cloud cover (photoperiod & luminosity)',
    guidanceRain: 'Accumulated rain (saturation & nutrient leaching)',
    guidanceWind: 'Wind flow and dynamics',
    networkLabel: 'INMET / WMO weather network',
    guidanceSatelliteText: 'Orbital view for identifying relief, natural shading areas and the topography of the beds in {city}.',
    guidanceGustText: 'Gusts above 35-40 km/h can fracture heavy branches in full flower. Check stakes, trellis nets (Scrog/Trellis) and reinforce ties in {city} (current: {gust} km/h).',
    guidanceGustAccuText: 'Persistent winds over several days remove moisture from the air near the leaf, closing stomata and slowing photosynthesis. Apply mulch and protect borders with windbreaks.',
    guidancePtypeText: 'Real-time identification between liquid rain, drizzle and hail cores. If hail is forecast, deploy retractable tarps or movable cover structures to save the inflorescences.',
    guidanceSolarText: 'Direct solar energy (currently {radiation} W/m²) drives the photosynthetic rate and transpiration. High-radiation days require rigorous VPD calibration and balanced replenishment of macro- and micronutrients.',
    guidanceCapText: 'Warnings issued by civil defence and meteorological agencies about severe storms, abrupt polar fronts or gales for the microregion of {city}.',
    guidanceDroughtText: 'Assesses moisture content in the root horizon from 0 to 40 cm. Dry soil at this depth causes root atrophy and flower abortion; waterlogged soil causes asphyxia and fusarium.',
    guidanceUvText: 'Natural UV-B radiation (currently UV {uv}, max: {uvMax}) stimulates trichomes to produce more resin and protective cannabinoids. At peak hours, make sure the plants are well hydrated.',
    guidanceRadarText: 'The multicolour Doppler weather radar tracks approaching storm cells within a 250 km radius, allowing rainy fronts to be predicted hours in advance.',
    guidanceCloudsText: 'Cloud density directly affects the amount of photosynthetically active radiation (PAR) received by the vegetative canopy.',
    guidanceRainText: 'Monitor the accumulated rainfall (currently {rain}). Prolonged torrential rain leaches nutrients from organic soil and requires post-rain fertilisation.',
    guidanceWindText: 'Gentle air circulation (5 to 15 km/h) encourages thicker stems and reduces the stagnant humidity layer around the leaves, preventing powdery mildew.',
    forecastRh: 'RH:',
    forecastWind: 'Wind:',
    alertAction1Title: '1. Canopy management:',
    alertAction1Text: 'Carry out selective defoliation inside the canopy and on lower branches to maintain continuous airflow.',
    alertAction2Title: '2. Biological control:',
    alertAction2Pre: 'Spray preventively',
    alertAction2Post: 'or JMS (JADAM) before the night-time temperature drops.',
    alertAction3Title: '3. Irrigation and soil:',
    alertAction3Text: 'Suspend late waterings so the air is not saturated at dusk; keep good drainage in the beds.',
    moonDefaultName: 'Waxing crescent',
    moonPhaseNames: ['New moon', 'Early waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Final waning crescent'],
    moonTips: [
      'Sap concentrated in the roots. Ideal phase for seed germination and deep soil/compost preparation.',
      'Sap beginning to rise. A good moment for transplanting seedlings into their final soil.',
      'Sap moving rapidly upward. Ideal time for pruning, LST and applying KNF / bioprotectants.',
      'Maximum vegetative strength. Leaves absorb nutrients with high efficiency.',
      'Sap accumulated at the top and in buds/flowers. Peak vigour, but avoid severe pruning to prevent plant stress.',
      'Sap starting its descent back towards the stem and roots.',
      'Sap settling in the root structure. A great moment for mycorrhiza inoculation and soil bioprotectants.',
      'Roots resting and strengthening. Recommended phase for substrate management and bed clean-up.',
    ],
    moonGenericTip: '{phase} at {illumination} illumination. Adjust pruning, transplanting and fertilisation to the vigour observed in the bed.',
    windDirections: ['N (North)', 'NNE (North-Northeast)', 'NE (Northeast)', 'ENE (East-Northeast)', 'E (East)', 'ESE (East-Southeast)', 'SE (Southeast)', 'SSE (South-Southeast)', 'S (South)', 'SSW (South-Southwest)', 'SW (Southwest)', 'WSW (West-Southwest)', 'W (West)', 'WNW (West-Northwest)', 'NW (Northwest)', 'NNW (North-Northwest)'],
    precipitationFallback: 'Rain / Hail',
    precipitationTypes: ['Hail storm', 'Thunderstorm', 'Rain showers', 'Liquid rain', 'Drizzle / Light drizzle', 'No rain at the moment'],
    aiSubtitleLong: 'Consult the AI trained on outdoor cultivation in the growing region, high-humidity fungal prevention, KNF foliar feeding and agroclimatic management.',
    aiSuggestionsLabel: 'Frequently asked questions for outdoor cultivation:',
    aiSuggestionBotrytis: 'How can I prevent Botrytis and powdery mildew with high humidity at this stage?',
    aiSuggestionPests: 'Which KNF/JADAM management should I apply against caterpillars and borers outdoors?',
    aiSuggestionVpd: 'How should I adjust watering considering the current VPD of {vpd} kPa?',
    aiSuggestionStage: 'Organic foliar feeding recommended for the {stage} stage',
    aiStageLabel: 'Outdoor development stage',
    aiStages: ['Soil / Bed preparation (organic)', 'Seedlings / Clones (outdoor transplant)', 'Early vegetative (outdoor)', 'Late vegetative (large plant)', 'Early flowering (pre-flower outdoor)', 'Full flowering (dense buds)', 'Final ripening / harvest'],
    aiUploadLabel: 'Upload leaf / bed photo (optional)',
    aiChangeImage: 'Change image',
    aiAttachPhoto: 'Attach photo',
    aiRemove: 'Remove',
    aiPreviewAlt: 'Preview',
    aiPhotoAttached: 'Photo attached for phytosanitary analysis',
    aiPhotoNote: 'It will be processed together with the station microclimate data.',
    aiQuestionLabel: 'Your question or outdoor management doubt',
    aiPlaceholder: 'Example: With the rains and high humidity in the growing region during flowering, how can I prevent Botrytis and powdery mildew using JADAM JWA extracts or Bacillus subtilis?',
    aiAnalyzing: 'Analysing with the agronomic AI...',
    aiSubmit: 'Ask the agronomic AI',
    aiResponseTitle: 'Agronomic AI technical report:',
    aiCopy: 'Copy',
    aiCopyTitle: 'Copy response',
    errorPrefix: 'Error:',
    aiConnectionError: 'Connection error while querying the agronomic AI.',
    aiBusyError: 'The agronomic AI is under high demand right now. Please try again in a moment.',
    condFreezingDrizzle: 'Freezing drizzle',
    condFreezingRain: 'Heavy cold rain',
    condFrozenPrecip: 'Frozen precipitation',
    condPartlyCloudy: 'Partly cloudy sky',
  },
  es: {
    title: '3.1 Estación Meteorológica Outdoor INMET y Pronóstico Agroclimático',
    description: 'Monitoreo agroclimático regional para cultivo outdoor en la región de cultivo y municipios cercanos.',
    refresh: 'Actualizar INMET',
    active: 'Motor meteorológico activo en tiempo real:',
    updated: 'Actualizado en vivo',
    alert: 'ALERTA FITOSANITARIA OUTDOOR: Humedad crítica',
    dew: 'Punto de rocío',
    botrytis: 'Riesgo de Botrytis',
    alertText: 'Con humedad relativa superior al 80% y temperaturas suaves, el riesgo de rocío foliar y hongos patógenos (Botrytis cinerea - moho gris y oídio) es máximo en los cogollos y flores de cannabis.',
    city: 'Municipio de cultivo outdoor:',
    altitude: 'Alt:',
    temperature: 'Temperatura del aire',
    humidity: 'Humedad relativa (HR)',
    rain24: 'Lluvia 24 h:',
    wind: 'Velocidad del viento',
    direction: 'Dirección:',
    gusts: 'Ráfagas:',
    light: 'Amanecer / Atardecer',
    photoperiod: 'Fotoperiodo directo:',
    moon: 'Fase lunar:',
    illumination: 'iluminación',
    moonCycle: 'Ciclo lunar para cultivo outdoor orgánico',
    moonTip: 'Orientación agronómica para esta luna:',
    vpd: 'VPD outdoor calculado:',
    solar: 'Radiación solar:',
    rainChance: 'Prob. de lluvia:',
    mapTitle: 'Mapa de monitoreo agroclimático y radar en vivo',
    mapDesc: 'Motor meteorológico integrado para {city}/SP y la microrregión. Seleccione capas satelitales, radar Doppler o parámetros agrometeorológicos.',
    satellite: 'Satélite HD',
    storm: 'Radar de tormentas',
    clouds: 'Movimiento de nubes',
    rain: 'Lluvia y acumulación',
    winds: 'Vientos en vivo',
    layers: 'Capas de monitoreo especializado (outdoor e invernadero):',
    forecast: 'Pronóstico INMET - {city}/SP y región',
    forecastUpdated: 'Actualizado por la red INMET',
    vpdLow: 'ALERTA DE HUMEDAD ALTA (HR {rh}% / VPD {vpd} kPa): riesgo elevado de Botrytis y oídio. Mejore la aireación del dosel, realice defoliación preventiva y aplique biofungicidas de Bacillus subtilis o JADAM JS. Evite riegos al atardecer.',
    vpdIdealVeg: 'Clima ideal para plántulas, clones y vegetativo inicial (VPD {vpd} kPa / HR {rh}%). Excelente transpiración sin desecación.',
    vpdIdealFlower: 'Clima excelente para vegetativo avanzado y floración media (VPD {vpd} kPa / HR {rh}%). Plena actividad fotosintética y estomática.',
    vpdIdealLate: 'Clima seco ideal para floración avanzada y maduración (VPD {vpd} kPa / HR {rh}%). Estimula tricomas y terpenos y protege la resina.',
    vpdHigh: 'Clima muy seco (VPD {vpd} kPa / HR {rh}%): riesgo de estrés hídrico y cierre estomático. Aumente el acolchado y controle los riegos.',
    forecastDays: ['Hoy mañana', 'Hoy tarde', 'Hoy noche', 'Mañana', 'Pasado mañana', 'En 3 días'],
    gustsLayer: 'Ráfagas de viento',
    gustAccuLayer: 'Acumulación de viento',
    ptypeLayer: 'Tipo de precipitación',
    solarLayer: 'Energía solar',
    alertsLayer: 'Alerta meteorológica',
    droughtLayer: 'Monitorización de sequía',
    uvLayer: 'Índice UV',
    baseLayers: 'Capas base e imágenes satelitales:',
    surfaceRes: 'Alta resolución de superficie',
    clickRadar: 'Clic para alternar el radar',
    aiOnline: 'En línea',
    aiSubtitle: 'Asistente especializado en clima, VPD, nutrición y manejo integrado',
    aiTitle: 'IA Agronómica (Gemini) - Diagnóstico outdoor',
    refreshTitle: 'Actualizar datos INMET',
    stationLabel: 'Estación meteorológica integrada INMET / red automática',
    stationRef: 'Ref.:',
    stationFallback: 'Estación INMET / red automática',
    cityMain: '(Sede / Cultivo principal)',
    cityDisplay: 'Región de cultivo',
    mapBadge: 'Satélite orbital terrestre HD (Esri / NASA)',
    activeLayer: 'Capa activa:',
    engineActive: 'Motor activo',
    layerRadar: 'Radar de tormentas Doppler',
    layerClouds: 'Movimiento de nubes',
    layerRain: 'Lluvia y acumulación',
    layerWind: 'Flujo de vientos',
    layerGust: 'Ráfagas de viento',
    layerGustAccu: 'Acumulación de viento',
    layerPtype: 'Tipo de precipitación',
    layerSolar: 'Energía solar e irradiancia',
    layerCap: 'Alerta meteorológica (CAP)',
    layerDrought: 'Monitorización de sequía (0-40 cm)',
    layerUv: 'Índice UV y tricomas',
    cardCurrent: 'Actual:',
    cardProjection: 'Proyección y persistencia',
    cardCapNotices: 'Avisos oficiales CAP',
    cardRhizosphere: 'Rizosfera 0-40 cm',
    cardTrichomes: 'Tricomas',
    mapMarkerLabel: 'Cultivo outdoor',
    mapPopupTitle: 'Cultivo outdoor',
    mapPopupAltitude: 'Altitud:',
    mapIframeTitle: 'Radar meteorológico Windy y capas agroclimáticas en vivo',
    guidanceTitle: 'Manejo agronómico:',
    guidanceSatellite: 'Satélite orbital de alta resolución',
    guidanceGust: 'Ráfagas de viento (sustentación estructural)',
    guidanceGustAccu: 'Acumulación de viento (evapotranspiración y cortavientos)',
    guidancePtype: 'Tipo de precipitación (granizo y daños mecánicos)',
    guidanceSolar: 'Energía solar (fotosíntesis y DLI acumulado)',
    guidanceCap: 'Alerta meteorológica (defensa y protección inmediata)',
    guidanceDrought: 'Monitorización de sequía (humedad radicular 0-40 cm)',
    guidanceUv: 'Índice UV (estímulo de tricomas, THC/CBD y terpenos)',
    guidanceRadar: 'Radar Doppler (detección temprana de tormentas)',
    guidanceClouds: 'Cobertura de nubes (fotoperiodo y luminosidad)',
    guidanceRain: 'Lluvia acumulada (saturación y lixiviación de nutrientes)',
    guidanceWind: 'Flujo y dinámica de vientos',
    networkLabel: 'Red meteorológica INMET / WMO',
    guidanceSatelliteText: 'Visualización orbital para identificar el relieve, las áreas de sombra natural y la topografía de los bancales en {city}.',
    guidanceGustText: 'Las ráfagas superiores a 35-40 km/h pueden fracturar ramas pesadas en plena floración. Revise estacas, redes de tutorado (Scrog/Trellis) y refuerce las ataduras en {city} (actual: {gust} km/h).',
    guidanceGustAccuText: 'Los vientos persistentes durante varios días retiran la humedad del aire próximo a la hoja, cerrando estomas y ralentizando la fotosíntesis. Aplique acolchado vegetal (mulching) y proteja los bordes con cortavientos.',
    guidancePtypeText: 'Identificación en tiempo real entre lluvia líquida, llovizna y núcleos de granizo. Si se prevé granizo, active lonas retráctiles o estructuras de cobertura móvil para salvar las inflorescencias.',
    guidanceSolarText: 'La energía solar directa (actualmente {radiation} W/m²) determina la tasa fotosintética y la transpiración. Los días de alta radiación exigen una calibración rigurosa del VPD y una reposición equilibrada de macro y micronutrientes.',
    guidanceCapText: 'Avisos emitidos por Protección Civil y organismos meteorológicos sobre tormentas severas, frentes polares abruptos o vendavales para la microrregión de {city}.',
    guidanceDroughtText: 'Evalúa el contenido de humedad en el horizonte radicular de 0 a 40 cm. Los suelos secos a esa profundidad provocan atrofia radicular y aborto de flores; los suelos saturados causan asfixia y fusariosis.',
    guidanceUvText: 'La radiación UV-B natural (actualmente UV {uv}, máx.: {uvMax}) estimula los tricomas a producir más resina y cannabinoides protectores. En las horas pico, asegúrese de que las plantas estén bien hidratadas.',
    guidanceRadarText: 'El radar meteorológico Doppler multicolor rastrea células de tormenta en aproximación en un radio de 250 km, permitiendo prever la llegada de frentes de lluvia con horas de antelación.',
    guidanceCloudsText: 'La densidad de nubes afecta directamente a la cantidad de radiación fotosintéticamente activa (PAR) que recibe el dosel vegetativo.',
    guidanceRainText: 'Controle la lámina de lluvia acumulada (actualmente {rain}). Las lluvias torrenciales prolongadas lixivian nutrientes del suelo orgánico y exigen una fertilización posterior a la lluvia.',
    guidanceWindText: 'La circulación de aire suave (5 a 15 km/h) estimula tallos más gruesos y reduce la capa de humedad estancada alrededor de las hojas, previniendo el oídio.',
    forecastRh: 'HR:',
    forecastWind: 'Viento:',
    alertAction1Title: '1. Manejo del dosel:',
    alertAction1Text: 'Realizar desfoliación selectiva en el interior y en las ramas bajas para mantener una corriente de aire continua.',
    alertAction2Title: '2. Control biológico:',
    alertAction2Pre: 'Pulverizar de forma preventiva',
    alertAction2Post: 'o JMS (JADAM) antes de que caiga la temperatura nocturna.',
    alertAction3Title: '3. Riego y suelo:',
    alertAction3Text: 'Suspender los riegos tardíos para no saturar el aire al atardecer; mantener un buen drenaje en los bancales.',
    moonDefaultName: 'Luna creciente',
    moonPhaseNames: ['Luna nueva', 'Luna creciente inicial', 'Cuarto creciente', 'Luna creciente gibosa', 'Luna llena', 'Luna menguante gibosa', 'Cuarto menguante', 'Luna menguante final'],
    moonTips: [
      'Savía concentrada en las raíces. Fase ideal para la germinación de semillas y la preparación profunda del suelo/compostera.',
      'La savía comienza a subir. Buen momento para trasplantar plántulas al suelo definitivo.',
      'Savía en movimiento ascendente veloz. Época ideal para podas, LST y aplicación de KNF / bioprotectores.',
      'Fuerza vegetativa máxima. Las hojas absorben nutrientes con alta eficiencia.',
      'Savía acumulada en la parte superior y en los cogollos/flores. Periodo de vigor máximo, pero evite podas severas para no estresar la planta.',
      'La savía inicia su retorno descendente hacia el tallo y las raíces.',
      'La savía se fija en la estructura de las raíces. Excelente momento para la inoculación de micorrizas y bioprotectores de suelo.',
      'Raíces en descanso y fortalecimiento. Fase recomendada para el manejo del sustrato y la limpieza del bancal.',
    ],
    moonGenericTip: '{phase} con {illumination} de iluminación. Ajuste las podas, los trasplantes y la fertilización según el vigor observado en el bancal.',
    windDirections: ['N (Norte)', 'NNE (Norte-Nordeste)', 'NE (Nordeste)', 'ENE (Este-Nordeste)', 'E (Este)', 'ESE (Este-Sudeste)', 'SE (Sudeste)', 'SSE (Sur-Sudeste)', 'S (Sur)', 'SSO (Sur-Suroeste)', 'SO (Suroeste)', 'OSO (Oeste-Suroeste)', 'O (Oeste)', 'ONO (Oeste-Noroeste)', 'NO (Noroeste)', 'NNO (Norte-Noroeste)'],
    precipitationFallback: 'Lluvia / Granizo',
    precipitationTypes: ['Tormenta con granizo', 'Tormenta con rayos', 'Chubascos de lluvia', 'Lluvia líquida', 'Llovizna / Llovizna ligera', 'Sin lluvia en este momento'],
    aiSubtitleLong: 'Consulte la IA entrenada en cultivo outdoor en la región de cultivo, prevención de hongos con alta humedad, fertilización foliar KNF y manejo agroclimático.',
    aiSuggestionsLabel: 'Preguntas frecuentes para el cultivo outdoor:',
    aiSuggestionBotrytis: '¿Cómo prevenir Botrytis y oídio con alta humedad en esta fase?',
    aiSuggestionPests: '¿Qué manejo KNF/JADAM aplicar contra orugas y taladradores en outdoor?',
    aiSuggestionVpd: '¿Cómo ajustar los riegos considerando el VPD actual de {vpd} kPa?',
    aiSuggestionStage: 'Fertilización foliar orgánica indicada para la fase de {stage}',
    aiStageLabel: 'Etapa de desarrollo outdoor',
    aiStages: ['Preparación de suelo / bancal (orgánico)', 'Plántulas / Clones (trasplante outdoor)', 'Vegetativo inicial outdoor', 'Vegetativo avanzado (planta grande)', 'Floración inicial (pre-flower outdoor)', 'Floración plena (cogollos densos)', 'Maduración final / cosecha'],
    aiUploadLabel: 'Enviar foto de la hoja / bancal (opcional)',
    aiChangeImage: 'Cambiar imagen',
    aiAttachPhoto: 'Adjuntar foto',
    aiRemove: 'Quitar',
    aiPreviewAlt: 'Vista previa',
    aiPhotoAttached: 'Foto adjunta para el análisis fitosanitario',
    aiPhotoNote: 'Se procesará junto con los datos microclimáticos de la estación.',
    aiQuestionLabel: 'Su pregunta o duda de manejo outdoor',
    aiPlaceholder: 'Ejemplo: Con las lluvias y la alta humedad en la región de cultivo durante la floración, ¿cómo prevenir Botrytis y oídio con extractos de JADAM JWA o Bacillus subtilis?',
    aiAnalyzing: 'Analizando con IA agronómica...',
    aiSubmit: 'Consultar la IA agronómica',
    aiResponseTitle: 'Dictamen técnico de la IA agronómica:',
    aiCopy: 'Copiar',
    aiCopyTitle: 'Copiar respuesta',
    errorPrefix: 'Error:',
    aiConnectionError: 'Error de conexión al consultar la IA agronómica de la asociación.',
    aiBusyError: 'La IA agronómica tiene una alta demanda momentánea. Inténtelo de nuevo en unos instantes.',
    condFreezingDrizzle: 'Llovizna con viento frío',
    condFreezingRain: 'Lluvia fría intensa',
    condFrozenPrecip: 'Precipitación helada',
    condPartlyCloudy: 'Cielo parcialmente nublado',
  },
  de: {
    title: '3.1 INMET-Outdoor-Wetterstation & agroklimatische Vorhersage',
    description: 'Regionales agroklimatisches Monitoring für den Outdoor-Anbau in der Anbauregion und Nachbargemeinden.',
    refresh: 'INMET aktualisieren',
    active: 'Wettermodell läuft live:',
    updated: 'Live aktualisiert',
    alert: 'OUTDOOR-PFLANZENSCHUTZ-WARNUNG: Kritische Luftfeuchtigkeit',
    dew: 'Taupunkt',
    botrytis: 'Botrytis-Risiko',
    alertText: 'Bei relativer Luftfeuchtigkeit über 80 % und milden Temperaturen ist das Risiko von Blattbeschlag und pathogenen Pilzen (Botrytis cinerea - Grauschimmel und Echter Mehltau) in Cannabis-Blüten am höchsten.',
    city: 'Gemeinde des Outdoor-Anbaus:',
    altitude: 'Höhe:',
    temperature: 'Lufttemperatur',
    humidity: 'Relative Luftfeuchtigkeit (RF)',
    rain24: 'Regen 24 h:',
    wind: 'Windgeschwindigkeit',
    direction: 'Richtung:',
    gusts: 'Böen:',
    light: 'Sonnenaufgang / -untergang',
    photoperiod: 'Direkte Photoperiode:',
    moon: 'Mondphase:',
    illumination: 'Beleuchtung',
    moonCycle: 'Mondzyklus für organischen Outdoor-Anbau',
    moonTip: 'Agronomischer Hinweis für diesen Mond:',
    vpd: 'Berechneter Outdoor-VPD:',
    solar: 'Sonnenstrahlung:',
    rainChance: 'Regenwahrscheinlichkeit:',
    mapTitle: 'Agroklimatische Monitoring-Karte & Live-Radar',
    mapDesc: 'Integriertes Wettermodell für {city}/SP und die Mikroregion. Satellitenkarten, Doppler-Radar oder agrometeorologische Parameter wählen.',
    satellite: 'HD-Satellit',
    storm: 'Sturmradar',
    clouds: 'Wolkenbewegung',
    rain: 'Regen & Akkumulation',
    winds: 'Live-Winde',
    layers: 'Spezialisierte Monitoring-Ebenen (Outdoor & Gewächshaus):',
    forecast: 'INMET-Wettervorhersage - {city}/SP und Region',
    forecastUpdated: 'Über das INMET-Netzwerk aktualisiert',
    vpdLow: 'WARNUNG HOHER LUFTFEUCHTE (RF {rh}% / VPD {vpd} kPa): erhöhtes Risiko für Botrytis und Echten Mehltau. Kronenbelüftung verbessern, vorbeugend entlauben und Biofungizide auf Basis von Bacillus subtilis oder JADAM JS anwenden. Spätnachmittägliches Gießen vermeiden.',
    vpdIdealVeg: 'Ideales Klima für Sämlinge, Klone und frühe Vegetation (VPD {vpd} kPa / RF {rh}%). Ausgezeichnete Transpiration ohne Austrocknung.',
    vpdIdealFlower: 'Ausgezeichnetes Klima für späte Vegetation und mittlere Blüte (VPD {vpd} kPa / RF {rh}%). Volle Photosynthese- und Stomata-Aktivität.',
    vpdIdealLate: 'Ideales trockenes Klima für späte Blüte und Reife (VPD {vpd} kPa / RF {rh}%). Fördert Trichome und Terpene und schützt das Harz.',
    vpdHigh: 'Sehr trockenes Klima (VPD {vpd} kPa / RF {rh}%): Risiko von Wasserstress und Stomataschluss. Mulchdecke erhöhen und Bewässerung überwachen.',
    forecastDays: ['Heute Morgen', 'Heute Nachmittag', 'Heute Nacht', 'Morgen', 'Übermorgen', 'In 3 Tagen'],
    gustsLayer: 'Windböen',
    gustAccuLayer: 'Windakkumulation',
    ptypeLayer: 'Niederschlagsart',
    solarLayer: 'Sonnenenergie',
    alertsLayer: 'Wetterwarnung',
    droughtLayer: 'Dürreüberwachung',
    uvLayer: 'UV-Index',
    baseLayers: 'Basisebenen & Satellitenbilder:',
    surfaceRes: 'Hohe Oberflächenauflösung',
    clickRadar: 'Klicken, um Radar zu wechseln',
    aiOnline: 'Online',
    aiSubtitle: 'Spezialisierter Assistent für Klima, VPD, Ernährung und integriertes Management',
    aiTitle: 'Agrar-KI (Gemini) - Outdoor-Diagnose',
    refreshTitle: 'INMET-Daten aktualisieren',
    stationLabel: 'Integrierte INMET-Wetterstation / automatisches Netz',
    stationRef: 'Ref.:',
    stationFallback: 'INMET-Station / automatisches Netz',
    cityMain: '(Sitz / Hauptanbau)',
    cityDisplay: 'Anbauregion',
    mapBadge: 'HD-Erdumlauf-Satellit (Esri / NASA)',
    activeLayer: 'Aktive Ebene:',
    engineActive: 'Motor aktiv',
    layerRadar: 'Doppler-Sturmradar',
    layerClouds: 'Wolkenbewegung',
    layerRain: 'Regen & Akkumulation',
    layerWind: 'Windströmung',
    layerGust: 'Windböen',
    layerGustAccu: 'Windakkumulation',
    layerPtype: 'Niederschlagsart',
    layerSolar: 'Sonnenenergie & Einstrahlung',
    layerCap: 'Wetterwarnung (CAP)',
    layerDrought: 'Dürreüberwachung (0-40 cm)',
    layerUv: 'UV-Index & Trichome',
    cardCurrent: 'Aktuell:',
    cardProjection: 'Prognose & Persistenz',
    cardCapNotices: 'Offizielle CAP-Warnungen',
    cardRhizosphere: 'Rhizosphäre 0-40 cm',
    cardTrichomes: 'Trichome',
    mapMarkerLabel: 'Outdoor-Anbau',
    mapPopupTitle: 'Outdoor-Anbau',
    mapPopupAltitude: 'Höhe:',
    mapIframeTitle: 'Windy Live-Wetterradar & agroklimatische Ebenen',
    guidanceTitle: 'Agronomisches Management:',
    guidanceSatellite: 'Hochauflösender Orbital-Satellit',
    guidanceGust: 'Windböen (strukturelle Stützung)',
    guidanceGustAccu: 'Windakkumulation (Evapotranspiration & Windschutz)',
    guidancePtype: 'Niederschlagsart (Hagel & mechanische Schäden)',
    guidanceSolar: 'Sonnenenergie (Photosynthese & kumulierter DLI)',
    guidanceCap: 'Wetterwarnung (sofortiger Schutz und Verteidigung)',
    guidanceDrought: 'Dürreüberwachung (Wurzelzonenfeuchte 0-40 cm)',
    guidanceUv: 'UV-Index (Stimulation von Trichomen, THC/CBD & Terpenen)',
    guidanceRadar: 'Doppler-Radar (frühe Sturmerkennung)',
    guidanceClouds: 'Wolkenbedeckung (Photoperiode & Helligkeit)',
    guidanceRain: 'Regenmenge (Sättigung & Nährstoffauswaschung)',
    guidanceWind: 'Windströmung und -dynamik',
    networkLabel: 'INMET / WMO-Wetternetz',
    guidanceSatelliteText: 'Orbitale Ansicht zur Erkennung von Relief, natürlichen Schattenbereichen und der Topografie der Beete in {city}.',
    guidanceGustText: 'Böen über 35-40 km/h können schwere Äste in voller Blüte abbrechen. Stäbe, Ranknetze (Scrog/Trellis) prüfen und Befestigungen in {city} verstärken (aktuell: {gust} km/h).',
    guidanceGustAccuText: 'Anhaltende Winde über mehrere Tage entziehen der Luft nahe am Blatt Feuchtigkeit, schließen die Stomata und verlangsamen die Photosynthese. Mulch aufbringen und Ränder mit Windschutz schützen.',
    guidancePtypeText: 'Echtzeit-Unterscheidung zwischen flüssigem Regen, Niesel und Hagelkernen. Bei Hagelvorhersage Planen oder bewegliche Abdeckungen ausfahren, um die Blütenstände zu retten.',
    guidanceSolarText: 'Direkte Sonnenenergie (aktuell {radiation} W/m²) bestimmt Photosyntheserate und Transpiration. Tage mit hoher Strahlung erfordern eine sorgfältige VPD-Kalibrierung und einen ausgewogenen Ausgleich von Makro- und Mikronährstoffen.',
    guidanceCapText: 'Warnungen von Zivilschutz und Wetterbehörden zu schweren Stürmen, plötzlichen Polarfronten oder Starkwinden für die Mikroregion {city}.',
    guidanceDroughtText: 'Bewertet den Feuchtigkeitsgehalt im Wurzelhorizont von 0 bis 40 cm. Trockene Böden in dieser Tiefe verursachen Wurzelatrophie und Blütenabort; gesättigte Böden führen zu Asphyxie und Fusarium.',
    guidanceUvText: 'Natürliche UV-B-Strahlung (aktuell UV {uv}, max.: {uvMax}) regt Trichome an, mehr Harz und schützende Cannabinoide zu produzieren. In den Spitzenstunden sicherstellen, dass die Pflanzen gut hydriert sind.',
    guidanceRadarText: 'Das mehrfarbige Doppler-Wetterradar verfolgt herannahende Sturmzellen im Radius von 250 km und ermöglicht es, Regenfronten Stunden im Voraus vorherzusagen.',
    guidanceCloudsText: 'Die Wolkendichte beeinflusst direkt die Menge der photosynthetisch aktiven Strahlung (PAR), die die vegetative Krone erhält.',
    guidanceRainText: 'Die akkumulierte Regenmenge überwachen (aktuell {rain}). Langanhaltender Starkregen wäscht Nährstoffe aus dem organischen Boden und erfordert eine Düngung nach dem Regen.',
    guidanceWindText: 'Sanfte Luftzirkulation (5 bis 15 km/h) fördert dickere Stängel und verringert die stagnierende Feuchtigkeitsschicht um die Blätter, was Echtem Mehltau vorbeugt.',
    forecastRh: 'RF:',
    forecastWind: 'Wind:',
    alertAction1Title: '1. Kronenmanagement:',
    alertAction1Text: 'Selektive Entlaubung im Inneren und an den unteren Ästen durchführen, um eine kontinuierliche Luftzirkulation zu erhalten.',
    alertAction2Title: '2. Biologische Kontrolle:',
    alertAction2Pre: 'Vorbeugend',
    alertAction2Post: 'oder JMS (JADAM) vor dem nächtlichen Temperaturabfall ausbringen.',
    alertAction3Title: '3. Bewässerung und Boden:',
    alertAction3Text: 'Späte Bewässerungen einstellen, damit die Luft in der Dämmerung nicht gesättigt wird; für gute Drainage in den Beeten sorgen.',
    moonDefaultName: 'Zunehmende Sichel',
    moonPhaseNames: ['Neumond', 'Zunehmende Sichel (früh)', 'Erstes Viertel', 'Zunehmender Mond (Gibbous)', 'Vollmond', 'Abnehmender Mond (Gibbous)', 'Letztes Viertel', 'Abnehmende Sichel (spät)'],
    moonTips: [
      'Saft in den Wurzeln konzentriert. Ideale Phase für die Samenkeimung und die tiefe Aufbereitung von Boden/Kompost.',
      'Der Saft beginnt aufzusteigen. Guter Zeitpunkt, um Setzlinge in den endgültigen Boden zu verpflanzen.',
      'Der Saft steigt schnell auf. Ideale Zeit für Schnitt, LST und die Anwendung von KNF / Bioprotektoren.',
      'Maximale vegetative Kraft. Blätter nehmen Nährstoffe mit hoher Effizienz auf.',
      'Saft an der Spitze und in den Blüten angesammelt. Phase höchster Vitalität, aber starken Rückschnitt vermeiden, um die Pflanze nicht zu stressen.',
      'Der Saft beginnt seinen Abstieg zurück zu Stamm und Wurzeln.',
      'Der Saft setzt sich im Wurzelsystem fest. Perfekter Zeitpunkt für die Inokulation von Mykorrhiza und Boden-Bioprotektoren.',
      'Wurzeln ruhen und stärken sich. Empfohlene Phase für Substratmanagement und Beetreinigung.',
    ],
    moonGenericTip: '{phase} mit {illumination} Beleuchtung. Schnitt, Umpflanzen und Düngung an die beobachtete Vitalität im Beet anpassen.',
    windDirections: ['N (Norden)', 'NNO (Nordnordost)', 'NO (Nordost)', 'ONO (Ostnordost)', 'O (Osten)', 'OSO (Ostsüdost)', 'SO (Südost)', 'SSO (Südsüdost)', 'S (Süden)', 'SSW (Südsüdwest)', 'SW (Südwest)', 'WSW (Westsüdwest)', 'W (Westen)', 'WNW (Westnordwest)', 'NW (Nordwest)', 'NNW (Nordnordwest)'],
    precipitationFallback: 'Regen / Hagel',
    precipitationTypes: ['Gewitter mit Hagel', 'Gewitter mit Blitz', 'Regenschauer', 'Flüssiger Regen', 'Nieselregen / Leichter Niesel', 'Aktuell kein Regen'],
    aiSubtitleLong: 'Fragen Sie die KI, die auf Outdoor-Anbau in der Anbauregion, Pilzprävention bei hoher Luftfeuchtigkeit, KNF-Blattdüngung und agroklimatisches Management trainiert ist.',
    aiSuggestionsLabel: 'Häufige Fragen zum Outdoor-Anbau:',
    aiSuggestionBotrytis: 'Wie lassen sich Botrytis und Echter Mehltau bei hoher Luftfeuchtigkeit in dieser Phase vorbeugen?',
    aiSuggestionPests: 'Welches KNF/JADAM-Management hilft gegen Raupen und Bohrer im Outdoor-Anbau?',
    aiSuggestionVpd: 'Wie sollte die Bewässerung beim aktuellen VPD von {vpd} kPa angepasst werden?',
    aiSuggestionStage: 'Organische Blattdüngung für die Phase {stage}',
    aiStageLabel: 'Outdoor-Entwicklungsstadium',
    aiStages: ['Boden- / Beetvorbereitung (organisch)', 'Setzlinge / Klone (Outdoor-Umpflanzung)', 'Frühe Vegetation (Outdoor)', 'Späte Vegetation (große Pflanze)', 'Frühe Blüte (Pre-Flower Outdoor)', 'Volle Blüte (dichte Blüten)', 'Endreife / Ernte'],
    aiUploadLabel: 'Foto von Blatt / Beet hochladen (optional)',
    aiChangeImage: 'Bild ändern',
    aiAttachPhoto: 'Foto anhängen',
    aiRemove: 'Entfernen',
    aiPreviewAlt: 'Vorschau',
    aiPhotoAttached: 'Foto für die Pflanzenschutzanalyse angehängt',
    aiPhotoNote: 'Sie wird zusammen mit den mikroklimatischen Stationsdaten verarbeitet.',
    aiQuestionLabel: 'Ihre Frage oder Unsicherheit zum Outdoor-Management',
    aiPlaceholder: 'Beispiel: Wie lassen sich bei Regen und hoher Luftfeuchtigkeit in der Anbauregion während der Blüte Botrytis und Echter Mehltau mit JADAM JWA-Extrakten oder Bacillus subtilis vorbeugen?',
    aiAnalyzing: 'Analyse mit der Agrar-KI läuft ...',
    aiSubmit: 'Agrar-KI befragen',
    aiResponseTitle: 'Technische Stellungnahme der Agrar-KI:',
    aiCopy: 'Kopieren',
    aiCopyTitle: 'Antwort kopieren',
    errorPrefix: 'Fehler:',
    aiConnectionError: 'Verbindungsfehler bei der Abfrage der Agrar-KI.',
    aiBusyError: 'Die Agrar-KI ist derzeit stark ausgelastet. Bitte versuchen Sie es gleich noch einmal.',
    condFreezingDrizzle: 'Gefrierender Nieselregen',
    condFreezingRain: 'Starker kalter Regen',
    condFrozenPrecip: 'Gefrierender Niederschlag',
    condPartlyCloudy: 'Teilweise bewölkter Himmel',
  },
};


export type WindyOverlayType =
  | 'radar'
  | 'clouds'
  | 'rain'
  | 'wind'
  | 'gust'
  | 'gustAccu'
  | 'ptype'
  | 'solarpower'
  | 'capAlerts'
  | 'drought40'
  | 'uvindex';

interface WeatherViewProps {
  subCategory: WeatherSubMenu;
  onOpenAiAssistant: () => void;
}

export const WeatherView: React.FC<WeatherViewProps> = ({
  subCategory,
  onOpenAiAssistant,
}) => {
  const { lang, t } = useI18n();
  const term = useTerm();
  const c = COPY[lang];
  /** Interpola placeholders {chave} nos textos do dicionário local. */
  const fill = (text: string, vars: Record<string, string | number>) =>
    Object.entries(vars).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)), text);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>('Ibiúna');
  const [mapTileLayer, setMapTileLayer] = useState<'satellite' | 'radar_storm' | 'clouds' | 'rain' | 'wind'>('satellite');
  const [radarViewMode, setRadarViewMode] = useState<'leaflet' | 'windy'>('leaflet');
  const [windyOverlay, setWindyOverlay] = useState<WindyOverlayType>('radar');
  const [colorScheme, setColorScheme] = useState<number>(7); // 7 = RainViewer Vibrant Rainbow (Green/Yellow/Red/Purple)
  
  // Weather Radar & Cloud movement animation state
  const [radarFrames, setRadarFrames] = useState<{ time: number; path: string }[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlayingRadar, setIsPlayingRadar] = useState<boolean>(true);
  const [radarHost, setRadarHost] = useState<string>('https://tilecache.rainviewer.com');

  // AI Assistant state inside weather section
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiPlantStage, setAiPlantStage] = useState('Vegetativo Avançado (Outdoor)');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Map DOM Ref and Leaflet Instance Ref
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const radarLayersRef = useRef<L.TileLayer[]>([]);
  const markerRef = useRef<L.Marker | null>(null);

  // Fetch RainViewer Live Radar Frames for storm/cloud animation
  useEffect(() => {
    const fetchRadarData = async () => {
      try {
        const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        const data = await res.json();
        if (data && data.radar && data.radar.past) {
          setRadarHost(data.host || 'https://tilecache.rainviewer.com');
          // Combine past frames + available nowcast frames if present
          const allFrames = [...data.radar.past, ...(data.radar.nowcast || [])];
          setRadarFrames(allFrames);
          setCurrentFrameIndex(allFrames.length - 1); // Start at latest frame
        }
      } catch (err) {
        console.warn("RainViewer API indisponível, utilizando fallback de radar:", err);
      }
    };

    fetchRadarData();
    const interval = setInterval(fetchRadarData, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  // Radar Animation Loop Timer
  useEffect(() => {
    if (!isPlayingRadar || radarFrames.length === 0) return;

    const timer = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % radarFrames.length);
    }, 800); // cycle frames every 800ms

    return () => clearInterval(timer);
  }, [isPlayingRadar, radarFrames]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather/inmet?city=${encodeURIComponent(selectedCity)}`);
      const json = await res.json();
      setWeatherData(json);
    } catch (err) {
      console.error("Erro ao carregar clima INMET:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [selectedCity]);

  // Leaflet Base Map Initialization & Updates
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const lat = weatherData?.coordinates?.lat || -23.6561;
    const lon = weatherData?.coordinates?.lon || -47.2222;

    const targetZoom = (mapTileLayer === 'radar_storm' || mapTileLayer === 'clouds') ? 6 : 11;

    if (!mapInstanceRef.current) {
      // Create new map
      const map = L.map(mapContainerRef.current, {
        center: [lat, lon],
        zoom: targetZoom,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Custom icon for Advanced Grower Cultivation Location
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background-color: #059669; color: white; padding: 6px 10px; border-radius: 20px; border: 2px solid white; font-weight: bold; font-size: 11px; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 4px; whitespace: nowrap;">
                🌱 ${selectedCity} (Cultivo Outdoor)
               </div>`,
        iconSize: [140, 30],
        iconAnchor: [70, 15],
      });

      const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
      marker.bindPopup(`<b>Advanced Grower Cultivo Outdoor</b><br/>${weatherData?.cityName || selectedCity}<br/>Altitude: ${weatherData?.altitude || '860m'}`);
      markerRef.current = marker;
    } else {
      // Update center & marker
      mapInstanceRef.current.setView([lat, lon], targetZoom);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `<div style="background-color: #059669; color: white; padding: 6px 10px; border-radius: 20px; border: 2px solid white; font-weight: bold; font-size: 11px; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 4px; whitespace: nowrap;">
                  🌱 ${selectedCity} (Cultivo Outdoor)
                 </div>`,
          iconSize: [140, 30],
          iconAnchor: [70, 15],
        });
        markerRef.current.setIcon(customIcon);
        markerRef.current.bindPopup(`<b>Advanced Grower Cultivo Outdoor</b><br/>${weatherData?.cityName || selectedCity}<br/>Altitude: ${weatherData?.altitude || '860m'}`);
      }
    }

    // Base Tile Layer switching
    if (tileLayerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    let tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let attribution = '&copy; Esri World Imagery & NASA Earth';

    if (mapTileLayer === 'radar_storm' || mapTileLayer === 'clouds') {
      // Dark / High contrast base map for vivid weather radar visibility
      tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      attribution = '&copy; OpenStreetMap contributors & CartoDB';
    }

    if (mapInstanceRef.current) {
      const baseLayer = L.tileLayer(tileUrl, {
        maxZoom: 18,
        attribution: attribution,
      }).addTo(mapInstanceRef.current);

      tileLayerRef.current = baseLayer;
    }
  }, [weatherData, mapTileLayer, selectedCity]);

  // Handle map invalidateSize when toggling back to Leaflet HD mode
  useEffect(() => {
    if (radarViewMode === 'leaflet' && mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 50);
    }
  }, [radarViewMode]);

  // Preload and Update Animated Radar Layers (Smooth transition without tile errors or grey flickering)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clean up old radar layers first
    radarLayersRef.current.forEach((layer) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });
    radarLayersRef.current = [];

    if (mapTileLayer !== 'radar_storm' && mapTileLayer !== 'clouds') {
      return;
    }

    if (radarFrames.length === 0) return;

    const targetOpacity = mapTileLayer === 'clouds' ? 0.65 : 0.85;

    // Instantiate tile layers for ALL frames to allow instant pre-cached opacity toggling
    const layers: L.TileLayer[] = radarFrames.map((frame, idx) => {
      const radarUrl = `${radarHost}${frame.path}/256/{z}/{x}/{y}/${colorScheme}/1_1.png`;
      const layer = L.tileLayer(radarUrl, {
        maxZoom: 18,
        maxNativeZoom: 8,
        tileSize: 256,
        opacity: idx === currentFrameIndex ? targetOpacity : 0,
        attribution: 'Radar Doppler & Tempestades &copy; RainViewer / INMET',
        zIndex: 100,
      });
      if (mapInstanceRef.current) {
        layer.addTo(mapInstanceRef.current);
      }
      return layer;
    });

    radarLayersRef.current = layers;
  }, [mapTileLayer, radarFrames, colorScheme, radarHost]);

  // Toggle opacity of pre-created radar layers on currentFrameIndex change
  useEffect(() => {
    if (mapTileLayer !== 'radar_storm' && mapTileLayer !== 'clouds') return;

    const targetOpacity = mapTileLayer === 'clouds' ? 0.65 : 0.85;
    radarLayersRef.current.forEach((layer, idx) => {
      if (idx === currentFrameIndex) {
        layer.setOpacity(targetOpacity);
      } else {
        layer.setOpacity(0);
      }
    });
  }, [currentFrameIndex, mapTileLayer]);

  // Clean map instance on total unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const temp = weatherData?.temperature !== undefined ? weatherData.temperature : (loading ? '--' : 14.3);
  const rh = weatherData?.humidity !== undefined ? weatherData.humidity : (loading ? '--' : 88);
  const vpd = weatherData?.vpd !== undefined ? weatherData.vpd : 0.20;

  // AI Direct Query Handler
  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/diagnose', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: `Meteorologia Outdoor - ${selectedCity}`,
          prompt: aiPrompt,
          plantStage: aiPlantStage,
          temp: temp,
          humidity: rh,
          vpd: vpd,
          imageBase64: selectedImage,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setAiResponse(`Erro: ${data.error}`);
      } else {
        setAiResponse(data.text);
      }
    } catch (err: any) {
      setAiResponse("Erro de conexão ao consultar a IA Agronômica da Advanced Grower.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 p-4 rounded-2xl border border-emerald-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-800/80 rounded-xl text-emerald-300 shrink-0">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base text-emerald-100 flex items-center gap-2">
                <span>{c.title}</span>
              </h2>
              <p className="text-xs text-emerald-300/80 mt-0.5">
                {c.description}
              </p>
            </div>
          </div>

          <button
            onClick={fetchWeather}
            className="p-2.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-200 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold shrink-0"
            title={c.refreshTitle}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{c.refresh}</span>
          </button>
        </div>
      </div>

      {/* MAIN METEOROLOGY SECTION */}
      {subCategory === 'estacao_inmet' && (
        <div className="space-y-6">
          {/* Live Station & Network Telemetry Bar */}
          <div className="bg-slate-900 border border-emerald-800/80 rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-sm text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-emerald-300">{c.active}</span>
              <span className="text-slate-300 truncate font-medium">
                {weatherData?.station || 'Estação INMET / Rede Automática'}
              </span>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto text-[11px] text-slate-400">
              {weatherData?.condition && (
                <span className="bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded-lg text-emerald-300 font-medium">
                  {weatherData.condition}
                </span>
              )}
              <span>{c.updated}</span>
            </div>
          </div>

          {/* Critical High-Humidity Agronomic Alert for Outdoor Crops */}
          {(typeof rh === 'number' ? rh >= 80 : false) && (
            <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-rose-950/80 border border-amber-600/80 p-4 rounded-2xl shadow-md text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
                  <span>{c.alert} ({rh}%) — {weatherData?.dewPoint}°C</span>
                </div>
                <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded-full font-bold">
                  {c.botrytis}
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {c.alertText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-emerald-300 block mb-0.5">{c.alertAction1Title}</strong>
                  {c.alertAction1Text}
                </div>
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-emerald-300 block mb-0.5">{c.alertAction2Title}</strong>
                  {c.alertAction2Pre} <em>Bacillus subtilis</em> {c.alertAction2Post}
                </div>
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-emerald-300 block mb-0.5">{c.alertAction3Title}</strong>
                  {c.alertAction3Text}
                </div>
              </div>
            </div>
          )}

          {/* City Selector & Elevation Badge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300 font-bold">{c.city}</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="flex-1 sm:flex-initial bg-slate-950 border border-emerald-700/80 rounded-xl px-3.5 py-2 text-xs text-emerald-300 font-bold focus:outline-none focus:border-emerald-500 shadow-sm"
              >
                <option value="Ibiúna">📍 Ibiúna - SP {c.cityMain}</option>
                <option value="Cotia">📍 Cotia - SP</option>
                <option value="Vargem Grande Paulista">📍 Vargem Grande Paulista - SP</option>
                <option value="Sorocaba">📍 Sorocaba - SP</option>
                <option value="São Roque">📍 São Roque - SP</option>
                <option value="Piedade">📍 Piedade - SP</option>
              </select>

              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950 px-2.5 py-1.5 rounded-xl border border-emerald-800/80 shrink-0">
                {c.altitude} {weatherData?.altitude || '860m'}
              </span>
            </div>
          </div>

          {/* Main Agroclimatic Metric Cards (Outdoor Focus) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Air Temperature */}
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                {c.temperature}
              </span>
              <span className="text-2xl font-bold text-slate-100 block">{temp}°C</span>
              <span className="text-[10px] text-slate-400 block">Ponto Orvalho: {weatherData?.dewPoint}°C</span>
            </div>

            {/* Relative Humidity */}
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                {c.humidity}
              </span>
              <span className="text-2xl font-bold text-slate-100 block">{rh}%</span>
              <span className="text-[10px] text-slate-400 block">{c.rain24} {weatherData?.accumulatedRain24h || '2.4 mm'}</span>
            </div>

            {/* Wind Speed & Gusts */}
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                {c.wind}
              </span>
              <span className="text-2xl font-bold text-slate-100 block">{weatherData?.windSpeed || 14} <span className="text-xs font-normal text-slate-400">km/h</span></span>
              <span className="text-[10px] text-emerald-300 block truncate">
                {c.direction} {weatherData?.windDirection || 'ESE'} (Rajadas: {weatherData?.windGust || 21} km/h)
              </span>
            </div>

            {/* Solar Cycle (Sunrise & Sunset) */}
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                {c.light}
              </span>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-100 pt-0.5">
                <span className="flex items-center gap-1 text-amber-300">
                  <Sun className="w-3.5 h-3.5" />
                  {weatherData?.sunrise || '06:41'}
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-orange-400">
                  <Sunset className="w-3.5 h-3.5" />
                  {weatherData?.sunset || '18:01'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block">{c.photoperiod} {weatherData?.photoperiod || '11h 20m'}</span>
            </div>
          </div>

          {/* Secondary Agro Row: Moon Phase & Outdoor VPD Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Moon Phase Widget */}
            <div className="bg-slate-900 border border-emerald-800/80 p-4 rounded-2xl space-y-2 md:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{weatherData?.moonPhase?.emoji || '🌕'}</span>
                  <div>
                    <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                      <span>{c.moon} {weatherData?.moonPhase?.name || 'Lua Crescente'}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800">
                        {weatherData?.moonPhase?.illumination || '68%'} {c.illumination}
                      </span>
                    </h3>
                    <span className="text-[10px] text-slate-400">{c.moonCycle}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <span className="font-bold text-amber-300 block mb-1">
                  🌿 {c.moonTip}
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {(COPY.pt.moonPhaseNames as string[]).indexOf(weatherData?.moonPhase?.name) >= 0 ? (c.moonTips as string[])[(COPY.pt.moonPhaseNames as string[]).indexOf(weatherData?.moonPhase?.name)] : weatherData?.moonPhase?.agronomicTip}
                </p>
              </div>
            </div>

            {/* Outdoor VPD & Solar Radiation */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                  <span>{c.vpd}</span>
                  <span className="text-emerald-400 font-bold">{vpd} kPa</span>
                </span>
                <div className="mt-1 text-xs font-semibold text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  {weatherData?.vpdStatus === 'low' ? fill(c.vpdLow, { rh: Math.round(rh), vpd }) : weatherData?.vpdStatus === 'ideal_veg' ? fill(c.vpdIdealVeg, { rh: Math.round(rh), vpd }) : weatherData?.vpdStatus === 'ideal_flower' ? fill(c.vpdIdealFlower, { rh: Math.round(rh), vpd }) : weatherData?.vpdStatus === 'ideal_late_flower' ? fill(c.vpdIdealLate, { rh: Math.round(rh), vpd }) : weatherData?.vpdStatus === 'high' ? fill(c.vpdHigh, { rh: Math.round(rh), vpd }) : weatherData?.vpdRecommendation}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800 text-slate-400">
                <span>{c.solar} <strong className="text-slate-200">{weatherData?.solarRadiation || 720} W/m²</strong></span>
                <span>{c.rainChance} <strong className="text-blue-300">{weatherData?.rainProbability || 25}%</strong></span>
              </div>
            </div>
          </div>

          {/* SATELLITE & WEATHER RADAR MAP SECTION */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex flex-col gap-3 border-b border-slate-800 pb-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2 flex-wrap">
                      <span>{c.mapTitle}</span>
                      {radarViewMode === 'leaflet' && (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-800">
                          📡 {c.mapBadge}
                        </span>
                      )}
                      {radarViewMode === 'windy' && (
                        <span className="text-[10px] bg-indigo-950 text-indigo-300 font-bold px-2.5 py-0.5 rounded-full border border-indigo-800 flex items-center gap-1">
                          <Radio className="w-3 h-3 text-indigo-400 animate-pulse" />
                          {c.activeLayer} {
                            windyOverlay === 'radar' ? '⛈️ ' + c.layerRadar :
                            windyOverlay === 'clouds' ? '☁️ ' + c.layerClouds :
                            windyOverlay === 'rain' ? '🌧️ ' + c.layerRain :
                            windyOverlay === 'wind' ? '💨 ' + c.layerWind :
                            windyOverlay === 'gust' ? '🌪️ ' + c.layerGust :
                            windyOverlay === 'gustAccu' ? '🌀 ' + c.layerGustAccu :
                            windyOverlay === 'ptype' ? '💧 ' + c.layerPtype :
                            windyOverlay === 'solarpower' ? '☀️ ' + c.layerSolar :
                            windyOverlay === 'capAlerts' ? '🚨 ' + c.layerCap :
                            windyOverlay === 'drought40' ? '🏜️ ' + c.layerDrought :
                            windyOverlay === 'uvindex' ? '🟣 ' + c.layerUv : windyOverlay
                          }
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {fill(c.mapDesc, { city: selectedCity })}
                    </p>
                  </div>
                </div>

                {/* City selector reminder */}
                <div className="text-xs text-slate-400 flex items-center gap-1.5 self-end sm:self-auto bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span className="text-slate-200 font-semibold">{selectedCity}</span>
                  <span className="text-[10px] text-emerald-400">● Motor Ativo</span>
                </div>
              </div>

              {/* Group 1: Base Orbital & Radar Views */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <span>📡 Camadas Base & Imagens Orbitais:</span>
                  </span>
                  <span className="text-[10px] text-slate-500">{c.surfaceRes}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800/80 text-xs">
                  <button
                    onClick={() => {
                      setRadarViewMode('leaflet');
                      setMapTileLayer('satellite');
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                      radarViewMode === 'leaflet'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>📡 {c.satellite}</span>
                  </button>

                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('radar');
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                      radarViewMode === 'windy' && windyOverlay === 'radar'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>⛈️ {c.storm}</span>
                  </button>

                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('clouds');
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                      radarViewMode === 'windy' && windyOverlay === 'clouds'
                        ? 'bg-cyan-700 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>☁️ {c.clouds}</span>
                  </button>

                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('rain');
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                      radarViewMode === 'windy' && windyOverlay === 'rain'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>🌧️ {c.rain}</span>
                  </button>

                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('wind');
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                      radarViewMode === 'windy' && windyOverlay === 'wind'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>💨 {c.winds}</span>
                  </button>
                </div>
              </div>

              {/* Group 2: The 7 Specialized Agroclimatic Monitoring Layers requested */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{c.layers}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">{c.clickRadar}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-1.5 bg-slate-950/90 p-2 rounded-xl border border-slate-800 text-xs">
                  {/* 1. Rajadas de Vento */}
                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('gust');
                    }}
                    className={`p-2 rounded-lg font-semibold transition flex flex-col items-start text-left border ${
                      radarViewMode === 'windy' && windyOverlay === 'gust'
                        ? 'bg-amber-600/90 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-1 text-[11px] font-bold">
                        <Wind className="w-3.5 h-3.5 text-amber-400" />
                        {c.gustsLayer}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-80 mt-0.5">
                      {c.cardCurrent} {weatherData?.windGust || 45.4} km/h
                    </span>
                  </button>

                  {/* 2. {c.gustAccuLayer} */}
                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('gustAccu');
                    }}
                    className={`p-2 rounded-lg font-semibold transition flex flex-col items-start text-left border ${
                      radarViewMode === 'windy' && windyOverlay === 'gustAccu'
                        ? 'bg-purple-600/90 border-purple-400 text-white shadow-lg'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-purple-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-1 text-[11px] font-bold">
                        <Gauge className="w-3.5 h-3.5 text-purple-400" />
                        {c.gustAccuLayer}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-80 mt-0.5">
                      {c.cardProjection}
                    </span>
                  </button>

                  {/* 3. Tipo de precipitação */}
                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('ptype');
                    }}
                    className={`p-2 rounded-lg font-semibold transition flex flex-col items-start text-left border ${
                      radarViewMode === 'windy' && windyOverlay === 'ptype'
                        ? 'bg-blue-600/90 border-blue-400 text-white shadow-lg'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-blue-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-1 text-[11px] font-bold">
                        <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                        {c.ptypeLayer}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-80 mt-0.5 truncate max-w-full">
                      {weatherData?.precipitationType || 'Chuva / Granizo'}
                    </span>
                  </button>

                  {/* 4. Energia Solar */}
                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('solarpower');
                    }}
                    className={`p-2 rounded-lg font-semibold transition flex flex-col items-start text-left border ${
                      radarViewMode === 'windy' && windyOverlay === 'solarpower'
                        ? 'bg-yellow-500 border-yellow-300 text-slate-950 font-bold shadow-lg'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-yellow-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-1 text-[11px] font-bold">
                        <Sun className={`w-3.5 h-3.5 ${radarViewMode === 'windy' && windyOverlay === 'solarpower' ? 'text-slate-950' : 'text-yellow-400'}`} />
                        {c.solarLayer}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-80 mt-0.5">
                      {weatherData?.solarRadiation || 720} W/m² • DLI
                    </span>
                  </button>

                  {/* 5. {c.alertsLayer} */}
                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('capAlerts');
                    }}
                    className={`p-2 rounded-lg font-semibold transition flex flex-col items-start text-left border ${
                      radarViewMode === 'windy' && windyOverlay === 'capAlerts'
                        ? 'bg-rose-600/90 border-rose-400 text-white shadow-lg animate-pulse'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-rose-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-1 text-[11px] font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        {c.alertsLayer}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-80 mt-0.5">
                      {c.cardCapNotices}
                    </span>
                  </button>

                  {/* 6. Monitorização da Seca */}
                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('drought40');
                    }}
                    className={`p-2 rounded-lg font-semibold transition flex flex-col items-start text-left border ${
                      radarViewMode === 'windy' && windyOverlay === 'drought40'
                        ? 'bg-orange-600/90 border-orange-400 text-white shadow-lg'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-orange-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-1 text-[11px] font-bold">
                        <Flame className="w-3.5 h-3.5 text-orange-400" />
                        {c.droughtLayer}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-80 mt-0.5">
                      {c.cardRhizosphere}
                    </span>
                  </button>

                  {/* 7. {c.uvLayer} */}
                  <button
                    onClick={() => {
                      setRadarViewMode('windy');
                      setWindyOverlay('uvindex');
                    }}
                    className={`p-2 rounded-lg font-semibold transition flex flex-col items-start text-left border ${
                      radarViewMode === 'windy' && windyOverlay === 'uvindex'
                        ? 'bg-indigo-600/90 border-indigo-400 text-white shadow-lg'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-indigo-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-1 text-[11px] font-bold">
                        <SunMedium className="w-3.5 h-3.5 text-indigo-400" />
                        {c.uvLayer}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-80 mt-0.5">
                      UV {weatherData?.uvIndex !== undefined ? weatherData.uvIndex : 1.4} • Tricomas
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic Agronomic Guidance Box for Currently Selected Layer */}
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                    <span className="font-bold text-slate-200">
                      {c.guidanceTitle}{' '}
                      {radarViewMode === 'leaflet' ? c.guidanceSatellite :
                        windyOverlay === 'gust' ? c.guidanceGust :
                        windyOverlay === 'gustAccu' ? c.guidanceGustAccu :
                        windyOverlay === 'ptype' ? c.guidancePtype :
                        windyOverlay === 'solarpower' ? c.guidanceSolar :
                        windyOverlay === 'capAlerts' ? c.guidanceCap :
                        windyOverlay === 'drought40' ? c.guidanceDrought :
                        windyOverlay === 'uvindex' ? c.guidanceUv :
                        windyOverlay === 'radar' ? c.guidanceRadar :
                        windyOverlay === 'clouds' ? c.guidanceClouds :
                        windyOverlay === 'rain' ? c.guidanceRain :
                        c.guidanceWind}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {c.networkLabel}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {radarViewMode === 'leaflet' && fill(c.guidanceSatelliteText, { city: selectedCity })}
                    {radarViewMode === 'windy' && windyOverlay === 'gust' && fill(c.guidanceGustText, { city: selectedCity, gust: weatherData?.windGust || 45.4 })}
                    {radarViewMode === 'windy' && windyOverlay === 'gustAccu' && c.guidanceGustAccuText}
                    {radarViewMode === 'windy' && windyOverlay === 'ptype' && c.guidancePtypeText}
                    {radarViewMode === 'windy' && windyOverlay === 'solarpower' && fill(c.guidanceSolarText, { radiation: weatherData?.solarRadiation || 720 })}
                    {radarViewMode === 'windy' && windyOverlay === 'capAlerts' && fill(c.guidanceCapText, { city: selectedCity })}
                    {radarViewMode === 'windy' && windyOverlay === 'drought40' && c.guidanceDroughtText}
                    {radarViewMode === 'windy' && windyOverlay === 'uvindex' && fill(c.guidanceUvText, { uv: weatherData?.uvIndex !== undefined ? weatherData.uvIndex : 1.4, uvMax: weatherData?.uvIndexMax || 4.0 })}
                    {radarViewMode === 'windy' && windyOverlay === 'radar' && c.guidanceRadarText}
                    {radarViewMode === 'windy' && windyOverlay === 'clouds' && c.guidanceCloudsText}
                    {radarViewMode === 'windy' && windyOverlay === 'rain' && fill(c.guidanceRainText, { rain: weatherData?.accumulatedRain24h || '0.0 mm' })}
                    {radarViewMode === 'windy' && windyOverlay === 'wind' && c.guidanceWindText}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Option 1: Leaflet HD Satellite Map */}
            <div className={radarViewMode === 'leaflet' ? "relative rounded-xl overflow-hidden border border-slate-800 h-[300px] sm:h-[480px] bg-slate-950" : "hidden"}>
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Top Left Location & Watermark Badge */}
              <div className="absolute top-3 left-3 z-[400] bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-emerald-300 font-bold flex items-center gap-2 shadow-lg pointer-events-none">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {selectedCity} - SP • {c.mapBadge}
                </span>
              </div>
            </div>

            {/* Map Option 2: Live Interactive Windy Weather Engine with Selected Overlay */}
            <div className={radarViewMode === 'windy' ? "relative rounded-xl overflow-hidden border border-slate-800 h-[300px] sm:h-[480px] bg-slate-950" : "hidden"}>
              <iframe
                key={`${windyOverlay}-${selectedCity}`}
                title="Windy Live Weather Radar & Agroclimatic Layers"
                src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=8&overlay=${windyOverlay}&product=${
                  windyOverlay === 'radar' ? 'radar' :
                  windyOverlay === 'clouds' ? 'satellite' :
                  windyOverlay === 'drought40' ? 'drought' :
                  windyOverlay === 'capAlerts' ? 'capAlerts' : 'ecmwf'
                }&level=surface&lat=${weatherData?.coordinates?.lat || -23.6561}&lon=${weatherData?.coordinates?.lon || -47.2222}&detailLat=${weatherData?.coordinates?.lat || -23.6561}&detailLon=${weatherData?.coordinates?.lon || -47.2222}&marker=true&message=true`}
                className="w-full h-full border-none"
                allowFullScreen
              />
            </div>
          </div>

          {/* INMET REGIONAL FORECAST (PREVISÃO DO TEMPO) */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-emerald-400" />
                {fill(c.forecast, { city: selectedCity })}
              </h3>
              <span className="text-xs text-slate-400">{c.forecastUpdated}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              {weatherData?.forecast?.map((fc: any, idx: number) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 hover:border-emerald-700/60 transition">
                  <span className="font-bold text-emerald-400 block text-[11px] truncate">{c.forecastDays[idx] ?? fc.day}</span>
                  <div className="text-slate-100 font-bold text-sm">
                    {fc.tempMax} <span className="text-xs font-normal text-slate-400">/ {fc.tempMin}</span>
                  </div>
                  <div className="text-[10px] text-slate-300">{c.forecastRh} {fc.rh}</div>
                  <div className="text-[10px] text-slate-400">{c.forecastWind} {fc.wind}</div>
                  <div className="text-[10px] text-amber-300 italic pt-1 truncate">{fc.condition}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IA ASSISTENTE CLIMA & DIAGNÓSTICO */}
      {subCategory === 'ia_assistente' && (
        <div className="bg-slate-900 border border-emerald-800/80 rounded-2xl p-4 space-y-4 shadow-sm text-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-emerald-300">
                  {c.aiTitle}
                </h3>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-semibold">
                  {c.aiOnline}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {c.aiSubtitleLong}
              </p>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div>
            <label className="block text-slate-400 text-[11px] font-medium mb-1.5">
              {c.aiSuggestionsLabel}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                `Como prevenir Botrytis e oídio com alta umidade nesta fase?`,
                `Qual manejo KNF/JADAM aplicar contra lagartas e brocas no outdoor?`,
                `Como ajustar regas considerando o VPD atual de ${vpd} kPa?`,
                `Adubação foliar orgânica indicada para a fase de ${aiPlantStage}`,
              ].map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAiPrompt(sug)}
                  disabled={aiLoading}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-emerald-950/80 border border-slate-700 hover:border-emerald-500 text-[11px] text-slate-300 hover:text-emerald-200 transition text-left"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleAskAi} className="space-y-3 text-xs pt-1 border-t border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">{c.aiStageLabel}</label>
                <select
                  value={aiPlantStage}
                  onChange={(e) => setAiPlantStage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none"
                >
                  <option value="Preparo de Solo / Canteiro">{t('ai.stage.0')}</option>
                  <option value="Mudas / Clones (Transplante)">{t('ai.stage.1')}</option>
                  <option value="Vegetativo Inicial">{t('ai.stage.2')}</option>
                  <option value="Vegetativo Avançado (Outdoor)">{t('ai.stage.3')}</option>
                  <option value="Floração Inicial (Pre-flower Outdoor)">{t('ai.stage.4')}</option>
                  <option value="Floração Plena (Buds Densos)">{t('ai.stage.5')}</option>
                  <option value="Maturação Final / Colheita">{t('ai.stage.6')}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">{c.aiUploadLabel}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="weather-img-upload"
                  />
                  <label
                    htmlFor="weather-img-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700 font-medium transition"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>{selectedImage ? 'Alterar Imagem' : 'Anexar Foto'}</span>
                  </label>
                  {selectedImage && (
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-rose-400 hover:underline font-semibold"
                    >
                      {c.aiRemove}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnail Preview */}
            {selectedImage && (
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                <img
                  src={selectedImage}
                  alt={c.aiPreviewAlt}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                />
                <div className="text-slate-300 text-xs">
                  <span className="font-semibold text-emerald-400">{c.aiPhotoAttached}</span>
                  <p className="text-[11px] text-slate-400">{c.aiPhotoNote}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-medium mb-1">{c.aiQuestionLabel}</label>
              <textarea
                rows={3}
                required
                placeholder={c.aiPlaceholder}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={aiLoading || !aiPrompt.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition border border-emerald-400/30 disabled:border-slate-700 disabled:text-slate-500"
            >
              {aiLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                  <span>{c.aiAnalyzing}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Consultar IA Advanced Grower</span>
                </>
              )}
            </button>
          </form>

          {/* AI Output Card */}
          {aiResponse && (
            <div className="p-4 bg-slate-950 border border-emerald-700/80 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="font-bold text-emerald-300 flex items-center gap-1.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {c.aiResponseTitle}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(aiResponse);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] transition"
                  title={c.aiCopyTitle}
                >
                  <span>{c.aiCopy}</span>
                </button>
              </div>
              <div className="text-slate-200 whitespace-pre-wrap leading-relaxed space-y-2 pt-2">
                {aiResponse}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
