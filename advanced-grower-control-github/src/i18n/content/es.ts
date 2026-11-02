import type { LocalizedContent } from './types';

export const esContent: LocalizedContent = {
  deficiencies: {
    'def-n': {
      element: 'Nitrógeno',
      symptoms: [
        'Amarillamiento uniforme (clorosis) que comienza por las hojas más viejas de la base de la planta.',
        'El síntoma progresa hacia arriba a medida que el N se transloca hacia los brotes nuevos.',
        'Las hojas afectadas amarillean por completo, se secan y caen de forma prematura.',
        'Crecimiento lento, tallos finos y reducción drástica del vigor general.'
      ],
      causes: [
        'pH del sustrato/solución por debajo de 5.5 o por encima de 7.0 (bloqueo de la absorción).',
        'Sustrato inerte con baja fertilización o lixiviación excesiva por riegos abundantes.',
        'Actividad microbiológica reducida en suelos fríos o encharcados.'
      ],
      correctiveOrganic: [
        'Aplicación de FAA (Fish Amino Acid KNF) 1:1000 en fertirrigación.',
        'Torta de ricino / harina de sangre en el suelo (liberación gradual).',
        'Biofertilizante líquido de estiércol curado o humus de lombriz.'
      ],
      correctiveMineral: [
        'Nitrato de amonio / nitrato de calcio (150-200 PPM N en fertirrigación).',
        'Urea agrícola de bajo biuret vía foliar (1 g a 2 g por litro).'
      ],
      solubilizingMicroorganisms: [
        'Azospirillum brasilense (fijador bacteriano de nitrógeno atmosférico)',
        'Rhizobium leguminosarum & Frankia spp.',
        'Bacillus subtilis y micorrizas arbusculares (Glomus intraradices)'
      ],
      companionPlants: [
        'Trébol blanco (Trifolium repens) - Fijación simbiótica de N en el suelo',
        'Veza (Vicia sativa) - Cubierta viva de alta recirculación de nitrógeno',
        'Canavalia (Canavalia ensiformis) - Biomasa vegetal rica en almidón y N'
      ],
      astrayaTips: 'Se recomienda mantener el N más elevado en vegetativo (180-220 PPM) y reducirlo gradualmente en la floración avanzada para permitir la maduración de los terpenos.',
      figures: [
        {
          figureNumber: 'Figura 3',
          title: 'Evolución del amarillamiento foliar por nitrógeno',
          description: 'Progresión de la clorosis por deficiencia de nitrógeno desde las hojas jóvenes (izquierda) hasta las hojas maduras/viejas (derecha).'
        },
        {
          figureNumber: 'Figura 4',
          title: 'Amarillamiento y pérdida de vigor en el tercio inferior',
          description: 'Planta con hojas maduras amarillas en el tercio inferior por la translocación de N hacia el ápice.'
        }
      ]
    },
    'def-p': {
      element: 'Fósforo',
      symptoms: [
        'Hojas verde oscuro, opacas o con tonos azulados/púrpuras.',
        'Aparición de manchas necróticas oscuras (marrón/bronce) en las hojas inferiores.',
        'Pecíolos y tallos con púrpura intensa.',
        'Retraso en el desarrollo de las raíces y floración débil con flores pequeñas.'
      ],
      causes: [
        'pH del sustrato desajustado (< 6.0 en suelo bloquea el P por fijación con Fe/Al).',
        'Temperaturas del suelo por debajo de 15 °C reducen drásticamente la captación de fósforo.',
        'Acumulación excesiva de zinc o hierro que antagoniza el fósforo.'
      ],
      correctiveOrganic: [
        'Harina de huesos calcinada o roca fosfórica (Arad/Gafsa).',
        'WPA (Water Soluble Phosphoric Acid - KNF de huesos quemados en vinagre).',
        'Extracto de ceniza de madera o harina de pescado.'
      ],
      correctiveMineral: [
        'MAP (Fosfato Monoamónico) o MKP (Fosfato Monopotásico).',
        'Superfosfato simple / triple en fertirrigación.'
      ],
      solubilizingMicroorganisms: [
        'Bacillus megaterium var. phosphaticum (solubilizador activo de P fijado)',
        'Pseudomonas fluorescens & Aspergillus niger',
        'Hongos micorrícicos arbusculares (Rhizophagus irregularis) - Extensión hifal'
      ],
      companionPlants: [
        'Trigo sarraceno (Fagopyrum esculentum) - Exuda ácidos orgánicos que liberan fósforo',
        'Altramuz / Lupino blanco (Lupinus albus) - Raíces proteoides acumuladoras de P',
        'Girasol enano (Helianthus annuus) - Extracción profunda del perfil del suelo'
      ],
      astrayaTips: 'El P es crucial en las primeras 3 semanas de floración para la diferenciación de los botones florales. Vigile la temperatura de la raíz en las estaciones frías.',
      figures: [
        {
          figureNumber: 'Figura 5',
          title: 'Progresión de los síntomas de fósforo',
          description: 'Progresión de los síntomas de deficiencia de fósforo desde la hoja más joven (izquierda) hasta la más vieja (derecha).'
        },
        {
          figureNumber: 'Figura 6',
          title: 'Deficiencia severa y enanismo vegetal',
          description: 'Falta crítica de fósforo que provoca atrofia de las raíces y plantas enanizadas.'
        },
        {
          figureNumber: 'Figura 7',
          title: 'Coloración verde oscuro mate',
          description: 'Hojas con tono verde oscuro opaco, síntoma común de la acumulación de azúcares por escasez de fósforo.'
        },
        {
          figureNumber: 'Figura 8',
          title: 'Púrpura en tallos y pecíolos',
          description: 'Pigmentación purpúrea intensa en los tallos y pecíolos inducida por la acumulación de antocianinas por falta de fósforo.'
        }
      ]
    },
    'def-k': {
      element: 'Potasio',
      symptoms: [
        'Bordes y puntas de las hojas viejas quemados y necrosados (síntoma de "hoja quemada por los márgenes").',
        'Mosaico de manchas amarillas y necróticas en los márgenes aserrados.',
        'Hojas curvadas hacia arriba, tallos débiles y quebradizos.',
        'Sensibilidad aumentada a las plagas y al estrés hídrico/térmico.'
      ],
      causes: [
        'Excesos de calcio (Ca) o magnesio (Mg) que compiten con el potasio por las raíces.',
        'Acumulación de sales solubles en el sustrato (EC alto en la zona radicular).',
        'Sustratos muy arenosos con baja retención de cationes (CTC baja).'
      ],
      correctiveOrganic: [
        'Ceniza de madera pura diluida (fuente rica de K biodisponible).',
        'Extracto fermentado de cáscara de plátano o vinaza de caña.',
        'Sulfato de potasio orgánico (K-Mag / Langbeinita).'
      ],
      correctiveMineral: [
        'Nitrato de potasio (KNO3) o sulfato de potasio (K2SO4).',
        'Cloruro de potasio purificado (se recomienda cautela con la salinidad).'
      ],
      solubilizingMicroorganisms: [
        'Bacillus mucilaginosus (solubilizador de potasio en minerales silicatados)',
        'Frateuria aurentia (bacteria movilizadora de K en el complejo arcillo-húmico)',
        'Paenibacillus glucanolyticus'
      ],
      companionPlants: [
        'Consuelda (Symphytum officinale) - Acumulador dinámico de potasio y minerales',
        'Diente de león (Taraxacum officinale) - Raíz pivotante profunda que bombea K',
        'Hierba limón / Hierba de limón - Biomasa de cobertura riquísima en sílice y potasio'
      ],
      astrayaTips: 'En la fase de engorde de los frutos/cogollos (semanas 4-7 de floración), la demanda de K se duplica. Mantenga la relación K:N cercana a 2:1 en esa fase.',
      figures: [
        {
          figureNumber: 'Figura 9',
          title: 'Evolución de la clorosis y necrosis marginal',
          description: 'Desarrollo de clorosis y necrosis en los márgenes aserrados de las hojas, evolucionando de jóvenes a viejas.'
        },
        {
          figureNumber: 'Figura 10',
          title: 'Conjunto foliar con márgenes quemados',
          description: 'Síntomas de clorosis y necrosis severa en los márgenes de los conjuntos foliares por deficiencia de potasio.'
        }
      ]
    },
    'def-ca': {
      element: 'Calcio',
      symptoms: [
        'Pequeñas manchas necróticas de color marrón herrumbroso o dorado en hojas nuevas.',
        'Deformación de los brotes nuevos (hojas en gancho o arrugadas).',
        'Puntas de las raíces quemadas, atrofiadas y con podredumbre.',
        'Tallos débiles y estructura celular quebradiza.'
      ],
      causes: [
        'Transpiración baja causada por humedad relativa (HR) muy alta o falta de circulación de aire.',
        'Uso de agua de ósmosis inversa (RO) sin suplementación previa de Ca/Mg.',
        'Exceso de potasio o sodio que antagoniza la captación de calcio.'
      ],
      correctiveOrganic: [
        'WCA (Water Soluble Calcium KNF - cáscara de huevo tostada solubilizada en vinagre de manzana) 1:1000.',
        'Cal dolomítica o calcita en el suelo.',
        'Yeso agrícola (sulfato de calcio).'
      ],
      correctiveMineral: [
        'Nitrato de calcio comercial (15% N, 19% Ca) en fertirrigación (1.0 g/L).',
        'Cloruro de calcio para pulverización foliar de emergencia (0.5 g/L).'
      ],
      solubilizingMicroorganisms: [
        'Bacillus licheniformis (quelación y liberación de carbonato de calcio)',
        'Lactobacillus plantarum (LAB - ácido láctico que solubiliza polvos de roca calcárea)',
        'Trichoderma harzianum (estimulador de la rigidez celular y de la absorción de Ca)'
      ],
      companionPlants: [
        'Albahaca (Ocimum basilicum) - Estimula la estructura y la microbiota asociada al Ca',
        'Achillea millefolium (Milenrama) - Acumuladora de calcio y minerales secundarios',
        'Agerato / Mentastro - Protección del dosel y reciclaje profundo de Ca'
      ],
      astrayaTips: 'El calcio se transporta por el xilema movido por la transpiración. Si el VPD es muy bajo (< 0.4 kPa), la planta deja de transpirar y manifiesta deficiencia de Ca ¡incluso con Ca en el suelo!',
      figures: [
        {
          figureNumber: 'Figura 11',
          title: 'Punteado necrótico en hojas jóvenes',
          description: 'Hojas jóvenes que desarrollan puntos de necrosis de color marrón amarillento y curvatura marginal.'
        },
        {
          figureNumber: 'Figura 12',
          title: 'Deformación severa de las hojas apicales',
          description: 'Hojas que adoptan formas retorcidas y puntas en gancho tras una carencia prolongada de calcio.'
        },
        {
          figureNumber: 'Figura 13',
          title: 'Necrosis extensiva en el limbo foliar',
          description: 'Avance de las manchas necróticas amarillentas que cubren casi todo el tejido foliar.'
        }
      ]
    },
    'def-mg': {
      element: 'Magnesio',
      symptoms: [
        'Clorosis internerval marcada en las hojas inferiores (las nervaduras permanecen verdes y el espacio entre ellas se vuelve amarillo).',
        'Avanza hacia manchas marrones/rojizas necróticas y bordes curvados hacia arriba.',
        'Disminución de la fotosíntesis (el Mg es el átomo central de la molécula de clorofila).'
      ],
      causes: [
        'pH del suelo por debajo de 6.0 o sustrato de coco/inerte por debajo de 5.5.',
        'Exceso de calcio o potasio en la fertilización (competencia catiónica).',
        'Temperaturas frías en las raíces que dificultan la captación.'
      ],
      correctiveOrganic: [
        'Sal de Epsom (sulfato de magnesio) vía foliar (2-5 g por litro de agua templada).',
        'Cal dolomítica (aporta Ca y Mg equilibrados).',
        'Biofertilizante de cenizas con roca magnesiana.'
      ],
      correctiveMineral: [
        'Sulfato de magnesio heptahidratado (sal de Epsom) 2 g/L foliar o 1 g/L al suelo.',
        'Nitrato de magnesio vía fertirrigación en fase vegetativa.'
      ],
      solubilizingMicroorganisms: [
        'Bacillus subtilis (solubilización de silicatos magnesianos)',
        'Pseudomonas putida (liberación de iones Mg2+ en el rizoplano)',
        'Actinomicetos beneficiosos del suelo (Streptomyces spp.)'
      ],
      companionPlants: [
        'Ortiga (Urtica dioica) - Bioreciclador de hierro, nitrógeno y magnesio',
        'Manzanilla (Matricaria chamomilla) - Atrae polinizadores y acumula magnesio',
        'Salvia (Salvia officinalis) - Bioestimulante y fijadora de minerales secundarios'
      ],
      astrayaTips: 'Las pulverizaciones foliares de sal de Epsom antes del encendido de las luces proporcionan una recuperación rápida del magnesio en 24 a 48 horas.',
      figures: [
        {
          figureNumber: 'Figura 14',
          title: 'Síntoma inicial en hojas viejas',
          description: 'Primeras señales en hojas viejas con clorosis internerval verde amarillenta.'
        },
        {
          figureNumber: 'Figura 15',
          title: 'Estadio intermedio y rotura celular',
          description: 'Colapso de los tejidos cloróticos que avanza hacia necrosis y manchas marrones muertas entre las nervaduras.'
        },
        {
          figureNumber: 'Figura 16',
          title: 'Fase avanzada y curvatura de los bordes',
          description: 'Progresión de la clorosis hacia la muerte celular con arrugamiento y enrollamiento característico de los bordes.'
        },
        {
          figureNumber: 'Figura 17',
          title: 'Necrosis tardía en el tercio inferior',
          description: 'Desarrollo tardío con hojas inferiores totalmente necrosadas, secas y retorcidas.'
        }
      ]
    },
    'def-s': {
      element: 'Azufre',
      symptoms: [
        'Amarillamiento uniforme en hojas nuevas y jóvenes, similar al nitrógeno pero en la parte superior de la planta.',
        'El envés de las hojas nuevas puede presentar coloración púrpura o rosada.',
        'Desarrollo de terpenos y compuestos aromáticos perjudicado.'
      ],
      causes: [
        'pH alcalino del suelo.',
        'Lixiviación intensa de sulfatos.'
      ],
      correctiveOrganic: [
        'Yeso agrícola (sulfato de calcio).',
        'JADAM JS (Jadam Sulfur) en las dosis de dilución recomendadas.',
        'Sal de Epsom (sulfato de magnesio).'
      ],
      correctiveMineral: [
        'Sulfato de potasio o sulfato de magnesio (sal de Epsom) 1 g/L en fertirrigación.',
        'Azufre elemental agrícola para la corrección gradual del pH y como fuente de S.'
      ],
      solubilizingMicroorganisms: [
        'Thiobacillus ferrooxidans & Thiobacillus thiooxidans (bacterias oxidantes de azufre elemental)',
        'Bacillus megaterium',
        'Aspergillus spp.'
      ],
      companionPlants: [
        'Ajo / Cebollino (Allium spp.) - Fuente natural de compuestos sulfurados aromáticos',
        'Mostaza negra (Brassica nigra) - Biofumigación y acumulación de sulfatos',
        'Capuchina (Tropaeolum majus) - Repelente y acumuladora de azufre'
      ],
      astrayaTips: 'El azufre es un precursor esencial en la biosíntesis de tioles y compuestos sulfurados volátiles responsables de los aromas "skunky" y cítricos marcados.',
      figures: [
        {
          figureNumber: 'Figura 18',
          title: 'Clorosis apical en hojas jóvenes',
          description: 'Hojas nuevas del ápice con clorosis amarillenta uniforme por falta de azufre.'
        },
        {
          figureNumber: 'Figura 19',
          title: 'Lignificación y endurecimiento del tallo',
          description: 'Aumento de la rigidez y del aspecto leñoso del tallo por deficiencia de azufre.'
        },
        {
          figureNumber: 'Figura 20',
          title: 'Clorosis en las hojas superiores y brotes',
          description: 'Amarillamiento en las hojas superiores (izquierda) y palidez en los brotes meristemáticos (derecha).'
        },
        {
          figureNumber: 'Figura 21',
          title: 'Progresión de la clorosis por azufre',
          description: 'Evolución de la clorosis de moderada (izquierda) a severa (derecha) por falta de azufre.'
        }
      ]
    },
    'def-b': {
      element: 'Boro',
      symptoms: [
        'Necrosis del meristemo apical (muerte del brote principal de crecimiento).',
        'Hojas nuevas deformadas, retorcidas y con coloración marrón oscuro/bronce en las puntas.',
        'Tallos y pecíolos huecos, quebradizos y con grietas superficiales.',
        'Raíces cortas, gruesas y con puntas hinchadas.'
      ],
      causes: [
        'pH del suelo por encima de 7.0 o por debajo de 5.0.',
        'Sequía prolongada en el suelo que reduce el flujo de masa del boro.',
        'Sustratos ultralixiviados con bajo contenido de materia orgánica.'
      ],
      correctiveOrganic: [
        'Aplicación de ácido bórico agrícola en dosis de precisión vía foliar (0.1 g/L).',
        'Compost orgánico madurado (la materia orgánica es el principal reservorio de boro).',
        'Extracto de algas marinas (Ascophyllum nodosum).'
      ],
      correctiveMineral: [
        'Ácido bórico (H3BO3) u octaborato disódico (Solubor) vía foliar (0.05 g a 0.1 g por litro).',
        'Bórax / tetraborato de sodio en el suelo (0.5 kg/ha de B equivalente).'
      ],
      solubilizingMicroorganisms: [
        'Bacillus pumilus (movilizador de boratos minerales)',
        'Pseudomonas fluorescens (productor de sideróforos y quelatos organoborados)',
        'Glomus mosseae (micorriza facilitadora de la absorción de micronutrientes)'
      ],
      companionPlants: [
        'Girasol (Helianthus annuus) - Gran indicador ecológico y bioacumulador de boro',
        'Trébol encarnado (Trifolium incarnatum) - Recirculación de boratos en la capa superficial',
        'Mostaza blanca (Sinapis alba) - Descompactadora del suelo y liberadora de micronutrientes'
      ],
      astrayaTips: 'El boro tiene un margen muy estrecho entre deficiencia y toxicidad. ¡Nunca supere 0.5 PPM de B en la solución nutritiva!',
      figures: [
        {
          figureNumber: 'Figura 22',
          title: 'Clorosis internerval y engrosamiento apical',
          description: 'Síntomas en las hojas jóvenes del ápice, incluidos clorosis internerval, engrosamiento y manchas.'
        },
        {
          figureNumber: 'Figura 23',
          title: 'Distorsión severa de las hojas jóvenes',
          description: 'Retorcimiento acentuado y enrollamiento en espiral de los brotes apicales por colapso del meristemo.'
        }
      ]
    },
    'def-cu': {
      element: 'Cobre',
      symptoms: [
        'Enrollamiento pronunciado de los márgenes de las hojas nuevas hacia abajo/atrás (forma de garra).',
        'Pérdida de turgencia y marchitamiento de los brotes jóvenes incluso con el suelo húmedo.',
        'Hojas nuevas con tonalidad verde oscuro azulada y necrosis en las puntas aserradas.',
        'Retraso en la floración y ramas débiles y flexibles, sin rigidez.'
      ],
      causes: [
        'pH del sustrato muy alto (> 7.0) o exceso severo de materia orgánica sin curar (compleja el Cu).',
        'Exceso de nitrógeno, fósforo o zinc que bloquea la captación de cobre.'
      ],
      correctiveOrganic: [
        'Sulfato de cobre en dosis homeopática (0.05 g/L).',
        'Caldo bordelés (para acción fungicida y suplementación foliar de micronutrientes).',
        'Biofertilizante enriquecido con polvo de roca basáltica.'
      ],
      correctiveMineral: [
        'Sulfato de cobre quelatado (Cu-EDTA) 0.05 g por litro vía foliar.',
        'Sulfato de cobre pentahidratado (CuSO4·5H2O) en fertirrigación (0.02 a 0.05 PPM Cu).'
      ],
      solubilizingMicroorganisms: [
        'Trichoderma harzianum (solubilización biológica de minerales cúpricos)',
        'Bacillus megaterium',
        'Aspergillus niger (liberador de ácidos quelantes orgánicos)'
      ],
      companionPlants: [
        'Mostaza parda (Brassica juncea) - Excelente acumuladora y recicladora de cobre',
        'Facelia (Phacelia tanacetifolia) - Atrae polinizadores y descompacta micronutrientes',
        'Cilantro (Coriandrum sativum) - Bioacumulador y repelente de plagas'
      ],
      astrayaTips: 'El cobre es un componente esencial de la plastocianina en la cadena de transporte de electrones de la fotosíntesis y activa enzimas de lignificación de los tallos.',
      figures: [
        {
          figureNumber: 'Figura 26',
          title: 'Progresión de clorosis a necrosis',
          description: 'Mosaico de clorosis que evoluciona a manchas necróticas en hojas nuevas y luego en hojas viejas por falta de cobre.'
        },
        {
          figureNumber: 'Figura 27',
          title: 'Hojas verde azuladas curvadas',
          description: 'Hojas con tonalidad verde azulada opaca e inicio de enrollamiento longitudinal en los bordes.'
        },
        {
          figureNumber: 'Figura 28',
          title: 'Marchitamiento y caída foliar',
          description: 'Hojas que se desploman y marchitan por pérdida de sustentación mecánica y debilidad en la estructura de lignina.'
        }
      ]
    },
    'def-mn': {
      element: 'Manganeso',
      symptoms: [
        'Clorosis internerval en hojas nuevas con pequeñas punteaduras necróticas grises/marrones salpicadas.',
        'A diferencia del hierro, las nervaduras menores también permanecen verdes, creando un patrón de tablero de ajedrez/mosaico.',
        'El desarrollo necrótico avanza cubriendo la hoja y causando quema de los bordes.'
      ],
      causes: [
        'pH del suelo elevado (> 6.8).',
        'Suelo excesivamente aireado y seco (favorece la oxidación del Mn2+ hacia formas insolubles Mn4+).',
        'Exceso de hierro soluble que crea antagonismo competitivo.'
      ],
      correctiveOrganic: [
        'Sulfato de manganeso vía fertirrigación (1-2 PPM Mn).',
        'Harina de roca de basalto de granulometría fina.',
        'Bokashi con ácidos fúlvicos.'
      ],
      correctiveMineral: [
        'Sulfato de manganeso (MnSO4·H2O) o quelato Mn-EDTA (1 a 2 PPM Mn en la solución).',
        'Pulverización foliar de Mn-EDTA 0.1 g/L al inicio de los síntomas.'
      ],
      solubilizingMicroorganisms: [
        'Bacillus circulans (reductor microbiológico del manganeso insoluble)',
        'Rhizobium leguminosarum',
        'Pseudomonas putida (movilizador de iones Mn2+)'
      ],
      companionPlants: [
        'Consuelda (Symphytum officinale) - Reciclador profundo de manganeso',
        'Diente de león - Bombeador de micronutrientes del subsuelo',
        'Espinaca - Acumulador foliar de manganeso y hierro'
      ],
      astrayaTips: 'El manganeso participa en la fotólisis del agua en la fotosíntesis (fotosistema II). La deficiencia destruye la eficiencia fotosintética rápidamente.',
      figures: [
        {
          figureNumber: 'Figura 33',
          title: 'Desarrollo progresivo del manganeso',
          description: 'Hojas más jóvenes que muestran bordes verde oscuro y clorosis internerval punteada a medida que envejecen.'
        },
        {
          figureNumber: 'Figura 34',
          title: 'Síntomas de la hoja joven a la vieja',
          description: 'Gradación de la deficiencia de manganeso desde la hoja joven (izquierda) hasta la hoja más vieja con punteado necrótico bronce (derecha).'
        }
      ]
    },
    'def-zn': {
      element: 'Zinc',
      symptoms: [
        'Síntoma clásico de "roseta" u "hojas en miniatura" debido al acortamiento severo de los entrenudos en los brotes nuevos.',
        'Clorosis internerval intensa en hojas nuevas con puntas retorcidas y amarillentas.',
        'Las hojas nuevas nacen estrechas, delgadas y giradas 90 grados hacia un lado.'
      ],
      causes: [
        'pH alcalino del suelo (> 7.0).',
        'Excesos masivos de fósforo (P) en la fertilización de floración (precipita el zinc como fosfato de zinc insoluble).',
        'Suelos fríos, encharcados y sin microbiología activa.'
      ],
      correctiveOrganic: [
        'Sulfato de zinc foliar (0.2 g/L) o quelato de zinc.',
        'Extracto fúlvico con minerales quelatados.',
        'Biofertilizante de estiércol ovino o caprino.'
      ],
      correctiveMineral: [
        'Sulfato de zinc monohidratado (ZnSO4·H2O) o quelato Zn-EDTA (0.1 g a 0.2 g por litro vía foliar).',
        'Zinc quelatado vía fertirrigación (0.5 a 1.0 PPM Zn).'
      ],
      solubilizingMicroorganisms: [
        'Bacillus aryabhattai (solubilizador de zinc en suelos tropicales)',
        'Pseudomonas fluorescens (solubilización de ZnO y ZnCO3)',
        'Rhizobium phaseoli'
      ],
      companionPlants: [
        'Trigo sarraceno (Fagopyrum esculentum) - Exuda compuestos quelantes de zinc',
        'Trébol encarnado - Cubierta rica en micronutrientes',
        'Centeno (Secale cereale) - Raíces fasciculadas profundas extractoras de Zn'
      ],
      astrayaTips: 'El zinc es vital para la síntesis del triptófano, aminoácido precursor de la hormona auxina (crecimiento vegetativo y alargamiento celular).',
      figures: [
        {
          figureNumber: 'Figura 39',
          title: 'Clorosis internerval en hojas jóvenes',
          description: 'Clorosis internerval marcada en las hojas nuevas del ápice del dosel por deficiencia de zinc.'
        },
        {
          figureNumber: 'Figura 40',
          title: 'Hojas estrechas en forma de cinta (Strappy Leaves)',
          description: 'Hojas nuevas extremadamente finas, afiladas y deformadas por falta de auxina debido a la carencia de zinc.'
        },
        {
          figureNumber: 'Figura 41',
          title: 'Síntoma apical por nutriente inmóvil',
          description: 'Al ser inmóvil, los síntomas primarios de zinc ocurren estrictamente en el ápice y en los meristemos apicales.'
        },
        {
          figureNumber: 'Figura 42',
          title: 'Clorosis internerval en la mitad basal',
          description: 'Clorosis internerval iniciada en la mitad inferior/basal del limbo foliar.'
        }
      ]
    },
    'def-fe': {
      element: 'Hierro',
      symptoms: [
        'Clorosis internerval intensa y pálida en brotes y hojas nuevas.',
        'Las hojas nuevas surgen amarillo limón, casi blancas, mientras las nervaduras principales siguen verdes.',
        'Las hojas viejas mantienen un aspecto normal.'
      ],
      causes: [
        'pH alto en el sustrato (> 6.8 en coco/hidro o > 7.2 en suelo).',
        'Raíces encharcadas por exceso de riego (falta de oxígeno en la zona radicular).',
        'Exceso de fósforo que bloquea el hierro.'
      ],
      correctiveOrganic: [
        'Bokashi fermentado rico en quelatos naturales.',
        'Compost orgánico rico en ácidos fúlvicos y húmicos para solubilizar el Fe.'
      ],
      correctiveMineral: [
        'Quelato de hierro Fe-EDDHA (para suelos con pH > 6.5) o Fe-DTPA / Fe-EDTA.',
        'Sulfato ferroso (FeSO4) vía fertirrigación en suelos ácidos.'
      ],
      solubilizingMicroorganisms: [
        'Pseudomonas putida & Pseudomonas fluorescens (productores de sideróforos de Fe3+)',
        'Bacillus subtilis',
        'Trichoderma harzianum (aumenta la reductasa de hierro en las raíces)'
      ],
      companionPlants: [
        'Ortiga (Urtica dioica) - Bioacumulador extraordinario de hierro biodisponible',
        'Perejil (Petroselinum crispum) - Acumuladora de hierro y atractora de insectos beneficiosos',
        'Diente de león - Solubilización del hierro nativo del suelo'
      ],
      astrayaTips: 'La deficiencia de hierro es casi siempre un síntoma de pH desajustado o de raíces encharcadas, y rara vez de falta del elemento en el suelo.',
      figures: [
        {
          figureNumber: 'Figura 31',
          title: 'Clorosis apical amarillo limón con nervaduras verdes',
          description: 'Hojas apicales jóvenes extremadamente amarillas con nervaduras finas verdes intactas por la inmovilidad del hierro.'
        }
      ]
    }
  },
  pests: {
    'pest-spidermite': {
      name: 'Araña roja / Ácaro del techo (Spider Mites)',
      identification: 'Pequeños arácnidos (0.5 mm) amarillos, rojizos o negros, localizados en el envés (cara abaxial) de las hojas. En infestaciones severas tejen telas finas alrededor de los cogollos y de las hojas.',
      damageSymptoms: [
        'Pequeños puntos blancos o amarillentos (plateado) en la superficie superior de la hoja.',
        'Pérdida de clorofila, amarillamiento y secado acelerado de las hojas.',
        'Telas que cubren las flores y reducen drásticamente el rendimiento y la calidad de los aceites esenciales.'
      ],
      prevention: [
        'Mantener la humedad relativa por encima de 55-60% en vegetativo (los ácaros odian la humedad alta).',
        'Limpieza rigurosa del ambiente con alcohol al 70% o peróxido de hidrógeno entre ciclos.',
        'Instalar filtros HEPA en las entradas de aire del cultivo.'
      ],
      biologicalControl: [
        'Liberación de ácaros depredadores: Phytoseiulus persimilis (voraz contra T. urticae) y Neoseiulus californicus (resistente a temperaturas más altas y a humedades bajas).',
        'Aplicaciones del hongo entomopatógeno Beauveria bassiana.'
      ],
      organicRecipes: [
        'JWA (Jadam Wetting Agent / Jabón Potásico) a 10-15 mL/L + JHS (extracto de chile/ajo KNF/Jadam) 5 mL/L en pulverización foliar completa.',
        'Aceite de Neem emulsionado con jabón potásico (5 mL/L de aceite + 3 mL/L de jabón) aplicado de noche o con las luces apagadas.'
      ],
      chemicalOrMineral: [
        'Azufre mojable (Jadam JS) - ATENCIÓN: nunca aplicar azufre hasta 14 días después del uso de aceites, para evitar quemaduras foliares.'
      ]
    },
    'pest-thrips': {
      name: 'Trips',
      identification: 'Insectos delgados y diminutos (1-1.5 mm) de color amarillo, marrón o negro que se mueven con rapidez. Dejan pequeñas gotas de excrementos negros y plateados.',
      damageSymptoms: [
        'Manchas plateadas con aspecto metálico/húmedo en las hojas.',
        'Pequeños puntos negros (heces del insecto) dispersos sobre las manchas plateadas.',
        'Deformación de los brotes nuevos y transmisión de virus vegetales.'
      ],
      prevention: [
        'Colocación de trampas adhesivas azules y amarillas en el dosel de las plantas para un monitoreo temprano.',
        'Tratamiento preventivo del suelo/sustrato con nematodos beneficiosos.'
      ],
      biologicalControl: [
        'Ácaros depredadores: Amblyseius swirskii o Neoseiulus cucumeris.',
        'Chinche depredadora: Orius insidiosus.',
        'Hongos entomopatógenos: Beauveria bassiana y Metarhizium anisopliae.'
      ],
      organicRecipes: [
        'Pulverización foliar de extracto de Neem + extracto de Piretro natural.',
        'Extracto de ricino y JWA (jabón de potasio 10 mL/L).'
      ],
      chemicalOrMineral: [
        'Spinosad (derivado bacteriano orgánico registrado para agricultura orgánica).'
      ]
    },
    'pest-fungus-gnats': {
      name: 'Mosca del sustrato / Mosca del hongo (Fungus Gnats)',
      identification: 'Pequeños mosquitos negros (2-4 mm) que vuelan de forma desordenada sobre la superficie del suelo/sustrato. Las larvas son gusanos translúcidos de cabeza negra que viven en el sustrato húmedo.',
      damageSymptoms: [
        'Las larvas se alimentan de los pelos radiculares y de las raíces jóvenes, debilitando la absorción de nutrientes.',
        'Apertura de puertas de entrada para hongos patógenos del suelo (Pythium, Fusarium, Phytophthora).',
        'Planta amarillenta con crecimiento estancado.'
      ],
      prevention: [
        '¡Evitar el exceso de riego! Permitir que los primeros 2-3 cm del sustrato se sequen entre riegos.',
        'Mulching o una capa de 2 cm de arena de cuarzo/perlita en la superficie de las macetas.'
      ],
      biologicalControl: [
        'Bacillus thuringiensis israelensis (BTI) aplicado vía riego (mata las larvas de mosca del sustrato de forma selectiva).',
        'Nematodos entomopatógenos: Steinernema feltiae.',
        'Ácaros depredadores del suelo: Stratiolaelaps scimitus (Hypoaspis miles).'
      ],
      organicRecipes: [
        'Riego con extracto de tabaco/neem diluido o tierra de diatomeas espolvoreada sobre la superficie seca de la maceta.'
      ],
      chemicalOrMineral: [
        'Trampas adhesivas amarillas a la altura de la maceta para capturar adultos.'
      ]
    },
    'pest-botrytis': {
      name: 'Moho gris / Podredumbre de los cogollos (Botrytis)',
      identification: 'Hongo destructivo que ataca los botones florales (cogollos) más densos en la floración avanzada. Comienza internamente en el tallo del cogollo y se extiende hacia fuera.',
      damageSymptoms: [
        'Apertura y secado repentino de las pequeñas hojas de azúcar que salen del cogollo.',
        'El interior del cogollo se vuelve marrón, grisáceo, blando y cubierto por un moho aterciopelado gris/blanquecino.',
        'Destrucción rápida de la inflorescencia en pocas horas bajo humedad alta.'
      ],
      prevention: [
        'Mantener la HR en floración avanzada por debajo de 45-50% y el VPD entre 1.2 y 1.5 kPa.',
        'Garantizar una fuerte circulación de aire interna con ventiladores oscilantes (sin crear un túnel de viento directo).',
        'Defoliación estratégica para mejorar la penetración de luz y aire en el dosel.'
      ],
      biologicalControl: [
        'Pulverización preventiva en vegetativo/inicio de floración con Trichoderma harzianum y Bacillus subtilis.'
      ],
      organicRecipes: [
        'Polvos de roca, sílice potásica y riegos biofortificados para el engrosamiento de la pared celular vegetal.'
      ],
      chemicalOrMineral: [
        'Eliminación quirúrgica inmediata de las flores afectadas, cortando 5 cm por debajo del área infectada con tijeras esterilizadas en alcohol.'
      ]
    },
    'pest-oidio': {
      name: 'Oídio (Powdery Mildew)',
      identification: 'Manchas blancas de aspecto de talco/polvo de tiza en la superficie superior de las hojas, que parecen harina espolvoreada.',
      damageSymptoms: [
        'Cobertura blanca harinosa que impide la fotosíntesis.',
        'Deformación foliar, amarillamiento y necrosis.',
        'Contaminación total de la cosecha si alcanza los cogollos.'
      ],
      prevention: [
        'Control riguroso de la humedad relativa (evitar picos por encima de 70% en el período oscuro).',
        'Uso de lámparas UV-C o generadores de ozono controlados en la extracción de aire.'
      ],
      biologicalControl: [
        'Bacillus amyloliquefaciens o Bacillus subtilis pulverizado de forma preventiva.'
      ],
      organicRecipes: [
        'Leche cruda / suero de leche diluido en agua (1:9) pulverizado bajo luz solar directa (la luz interactúa con las proteínas generando peróxido nativo).',
        'Bicarbonato de potasio o bicarbonato de sodio (5 g/L) + jabón potásico.'
      ],
      chemicalOrMineral: [
        'JADAM JS (Jadam Sulfur) 1-2 mL/L en vegetativo.'
      ]
    },
    'pest-cigarrinho': {
      name: 'Chicharrita del maíz (vector de virosis)',
      identification: 'Pequeños insectos hemípteros (3 mm) de color pajizo/amarillento con dos manchas oscuras en la cabeza, que saltan y vuelan rápidamente al menor movimiento del dosel.',
      damageSymptoms: [
        'Succión de savia elaborada que debilita los tallos y reduce el vigor.',
        'Vector crítico de mollicutes (achaparramiento pálido y achaparramiento rojo) y del virus del mosaico (Rayado Fino).',
        'Hojas con estrías rojizas/purpúreas y brotación múltiple deformada en el ápice.'
      ],
      prevention: [
        'Eliminación de hospedantes intermediarios y de maíz voluntario próximo al cultivo.',
        'Mallas antiáfidos de malla fina (50 mesh) en las entradas de aire de invernaderos y ventiladores.',
        'Trampas adhesivas amarillas instaladas a la altura de los brotes para monitoreo continuo.'
      ],
      biologicalControl: [
        'Hongo entomopatógeno Cordyceps fumosorosea (Isaria fumosorosea) o Beauveria bassiana.',
        'Chinches depredadoras de la familia Anthocoridae y crisopas (Chrysoperla externa).'
      ],
      organicRecipes: [
        'JWA (jabón potásico 15 mL/L) + extracto de Neem/Piretro natural en pulverizaciones crepusculares.',
        'JHS (Jadam Herbal Solution) concentrado de ajo y chile picante.'
      ],
      chemicalOrMineral: [
        'Extracto de azadiractina concentrada (1.2%) y silicio foliar para el endurecimiento de la cutícula.'
      ]
    },
    'pest-mosca-branca': {
      name: 'Mosca blanca',
      identification: 'Pequeños insectos voladores (1 mm) con las alas cubiertas por una cera blanca harinosa que vuelan en nubes cuando se agitan las plantas. Las ninfas permanecen fijas en el envés de la hoja.',
      damageSymptoms: [
        'Clorosis foliar, amarillamiento y caída prematura de las hojas debido a la succión continua de savia.',
        'Secreción de melaza azucarada ("honeydew") que favorece la aparición del hongo de cobertura negra (fumagina).',
        'Transmisión peligrosa de geminivirus y carlavirus fitopatógenos.'
      ],
      prevention: [
        'Barreras físicas con malla fina y trampas adhesivas amarillas.',
        'Inspección frecuente del envés (cara inferior) de las hojas de la base y del tercio medio.'
      ],
      biologicalControl: [
        'Avispita parasitoide: Encarsia formosa o Eretmocerus eremicus.',
        'Hongos entomopatógenos: Beauveria bassiana y Lecanicillium lecanii.'
      ],
      organicRecipes: [
        'Aplicación de jabón potásico (JWA 15 mL/L) combinado con aceite vegetal de ricino emulsionado.',
        'Extracto de ceniza de madera para modificar el pH foliar y generar repelencia.'
      ],
      chemicalOrMineral: [
        'Tierra de diatomeas micronizada vía foliar (10 g/L) que crea una barrera mecánica abrasiva.'
      ]
    },
    'pest-acaro-branco': {
      name: 'Ácaro blanco / Broad Mite',
      identification: 'Ácaros microscópicos (< 0.2 mm) totalmente invisibles a simple vista, transparentes o verdosos. Habitan los meristemos y los brotes nuevos en crecimiento.',
      damageSymptoms: [
        'Inyección de toxinas salivales potentes que causan deformación severa de los brotes nuevos.',
        'Las hojas nuevas nacen retorcidas, rígidas y vueltas hacia abajo, con aspecto de cuero, plástico o vidrio quemado.',
        'Estancamiento inmediato del crecimiento del ápice sin telas visibles.'
      ],
      prevention: [
        'Higiene absoluta de los operarios (cambio de ropa entre salas de cultivo).',
        'Mantener ventilación constante y evitar zonas muertas con calor y humedad estancados.'
      ],
      biologicalControl: [
        'Ácaros depredadores de ápice: Neoseiulus californicus y Amblyseius swirskii (altamente eficientes en el control de P. latus).'
      ],
      organicRecipes: [
        'Azufre mojable JADAM JS (1.5 mL/L) pulverizado cada 3 días durante 2 semanas (interrumpir si se aplican aceites).',
        'Baños fitoquímicos con aceite de neem de prensado en frío emulsionado con jabón orgánico.'
      ],
      chemicalOrMineral: [
        'Tratamiento térmico de inmersión de esquejes (43 °C durante 15 minutos) antes de la plantación.'
      ]
    },
    'pest-nematoide-galhas': {
      name: 'Nematodo de las agallas',
      identification: 'Gusanos microscópicos del suelo que penetran el sistema radicular y establecen sitios de alimentación fijos, induciendo la hipertrofia de las células radicales.',
      damageSymptoms: [
        'Formación de engrosamientos y nódulos en las raíces ("agallas").',
        'Incapacidad total de la planta para absorber agua y nutrientes, causando marchitamiento en las horas de calor.',
        'Enanismo severo, síntomas de deficiencia nutricional múltiple y amarillamiento precoz.'
      ],
      prevention: [
        'Solarización del suelo antes del cultivo o pasteurización al vapor de sustratos reutilizados.',
        'Uso de sustrato limpio e inspeccionado, con fertilización de materia orgánica bien curada.'
      ],
      biologicalControl: [
        'Bacteria nematicida: Bacillus chitinosporus y Bacillus methylotrophicus.',
        'Hongos nematófagos: Purpureocillium lilacinum (Paecilomyces lilacinus) y Pochonia chlamydosporia.'
      ],
      organicRecipes: [
        'Torta de Neem / harina de ricino incorporada al sustrato (libera compuestos nematicidas bioactivos durante la descomposición).',
        'Té de compost rico en microbiología antagónica y extracto fúlvico de roca.'
      ],
      chemicalOrMineral: [
        'Inoculación de micorrizas arbusculares para la competencia por espacio en las raíces.'
      ]
    },
    'pest-nematoide-lesoes': {
      name: 'Nematodo de las lesiones radiculares',
      identification: 'Nematodos endoparásitos migratorios que se desplazan libremente por dentro y por fuera de las raíces, destruyendo las células del córtex radicular.',
      damageSymptoms: [
        'Formación de lesiones necróticas oscuras y pálidas a lo largo de toda la extensión de las raíces finas.',
        'Destrucción y podredumbre de las raicillas absorbentes.',
        'Entrada abierta facilitada para hongos necrotróficos del suelo (Fusarium oxysporum y Pythium ultimum).'
      ],
      prevention: [
        'Siembra de abono verde de cobertura nematicida como crotalaria (Crotalaria spectabilis) o tagetes (Tagetes patula).',
        'Rotación de cultivos y uso de biocarbón (Biochar) en el suelo.'
      ],
      biologicalControl: [
        'Hongos trampa de nematodos: Arthrobotrys oligospora.',
        'Bacteria de rizosfera: Pasteuria penetrans y Bacillus firmus.'
      ],
      organicRecipes: [
        'Aplicación de JADAM JHS de ajo/chile en drench al sustrato (0.5%).',
        'Incorporación de rastrojo de brasicáceas (mostaza/nabo) para biofumigación orgánica del suelo.'
      ],
      chemicalOrMineral: [
        'Aplicación de silicio soluble vía riego para la fortificación de la epidermis radicular.'
      ]
    }
  },
  recipes: {
    'knf-fpj': {
      description: 'Extracto fermentado de brotes jóvenes de crecimiento rápido (por ejemplo, brote de bambú, tithonia, ortiga, brote de cannabis) rico en hormonas vegetales de crecimiento (auxinas, giberelinas) y enzimas.',
      ingredients: [
        { name: 'Brotes verdes y tiernos recolectados antes del amanecer', ratio: '1 parte en peso' },
        { name: 'Azúcar mascabo sin refinar (mascabo puro)', ratio: '1 parte en peso (proporción 1:1)' }
      ],
      steps: [
        'Recoja las puntas de brote vegetal fresco sin lavarlas, para preservar los microorganismos nativos de la superficie foliar.',
        'Pique el material vegetal en trozos de 2 a 5 cm.',
        'Mezcle de forma homogénea con la misma cantidad en peso de azúcar mascabo.',
        'Coloque en un frasco de vidrio o de cerámica, llenando hasta 2/3 de la capacidad.',
        'Cubra con papel transpirable (papel de cocina o tela de algodón) y sujete con una goma elástica.',
        'Fermente en un lugar fresco y oscuro durante 7 a 10 días.',
        'Cuele el líquido denso y oscuro y almacénelo en un frasco de vidrio semicerrado.'
      ],
      applicationDosage: '1 mL por litro de agua (1:1000) en riego o vía foliar semanal durante la fase vegetativa.',
      benefits: [
        'Estimula el enraizamiento y el alargamiento celular saludable.',
        'Aumenta la inmunidad de la planta frente a estreses térmicos.',
        'Aporta nitrógeno bioasimilable y fitohormonas nativas.'
      ]
    },
    'knf-lab': {
      description: 'Cultivo concentrado de Lactobacillus beneficiosos que solubilizan nutrientes, suprimen patógenos anaerobios del suelo (Pythium/Fusarium) y aceleran la descomposición orgánica.',
      ingredients: [
        { name: 'Agua de lavado de arroz (rica en almidón)', ratio: '1 litro' },
        { name: 'Leche cruda entera o pasteurizada de buena calidad', ratio: '10 litros (proporción 1:10)' },
        { name: 'Melaza de caña o azúcar mascabo para conservación', ratio: '1 parte por 1 parte de LAB purificado' }
      ],
      steps: [
        'Lave el arroz en agua no clorada y recoja el líquido turbio (agua de arroz). Fermente en vidrio durante 3-5 días hasta que tome un aroma ligeramente ácido.',
        'Mezcle 1 parte de ese fermentado de arroz con 10 partes de leche fresca en un recipiente cubierto.',
        'Espere de 5 a 7 días hasta que la leche cuaje y se separe en una capa sólida superior (queso/suero) y un líquido transparente amarillento inferior (suero de LAB).',
        'Filtre el suero amarillo transparente (este es el LAB concentrado).',
        'Mezcle en partes iguales con melaza de caña para estabilizar y guarde en el refrigerador hasta por 1 año.'
      ],
      applicationDosage: '1 mL a 2 mL por litro de agua (1:1000 a 1:500) vía suelo/sustrato o pulverización de cobertura.',
      benefits: [
        'Elimina los malos olores del compostaje y previene la podredumbre radicular.',
        'Mejora la solubilidad de calcio y fósforo en el suelo.',
        'Fortalece la microbiología de la rizosfera.'
      ]
    },
    'jadam-jms': {
      description: 'Cultivo de bajo costo de microorganismos nativos diversificados del suelo forestal (humus de bosque) multiplicados con papa cocida y sal marina.',
      ingredients: [
        { name: 'Agua sin cloro (de lluvia, de pozo o desclorada)', ratio: '500 litros (o escalar a 20 L)' },
        { name: 'Suelo de bosque/monte nativo o humus de lombriz maduro', ratio: '500 g en bolsita de tela' },
        { name: 'Papa cocida con cáscara y machacada', ratio: '500 g' },
        { name: 'Sal marina gruesa sin yodo o agua de mar', ratio: '500 g de sal marina' }
      ],
      steps: [
        'Cocine las papas hasta que estén bien blandas y macháquelas dentro de un saco de tela fina junto con la sal marina.',
        'Sumerja el saco de papa y el saco con suelo de bosque en un bidón con agua sin cloro.',
        'Masajee ambos sacos dentro del agua durante 5 minutos para liberar el almidón y los microorganismos nativos.',
        'Tape el recipiente sin cerrar herméticamente y déjelo a temperatura ambiente (20-30 °C).',
        'En 24 a 72 horas se formará una espuma densa en la superficie con un aroma agradable a levadura. ¡Es el punto máximo de multiplicación!'
      ],
      applicationDosage: 'Usar puro o diluido hasta 1:10 en riegos abundantes al suelo antes y durante el cultivo.',
      benefits: [
        'Restaura la biodiversidad del microbioma del suelo.',
        'Previene la aparición de patógenos por exclusión competitiva.',
        'Totalmente gratuito, utilizando materias primas locales.'
      ]
    },
    'jadam-jwa': {
      description: 'Jabón biodegradable de aceite vegetal e hidróxido de potasio (KOH) que actúa como surfactante natural, biodegradable y defensivo contra ácaros, pulgones y moscas.',
      ingredients: [
        { name: 'Aceite vegetal de canola, girasol o soja', ratio: '1.8 litros' },
        { name: 'Hidróxido de potasio (KOH 90% en escamas)', ratio: '320 gramos' },
        { name: 'Agua blanda (agua de lluvia u ósmosis inversa)', ratio: '1.2 litros + 10 litros' }
      ],
      steps: [
        'En un recipiente resistente al calor, disuelva el KOH en 1.2 L de agua blanda (reacción exotérmica: use EPP, guantes y gafas).',
        'Añada el aceite vegetal y bata con batidora industrial/doméstica durante 10-15 minutos hasta formar una emulsión espesa parecida a mayonesa o mantequilla.',
        'Deje reposar cerrado durante 3 días para completar la saponificación.',
        'Añada los 10 L de agua blanda restantes por etapas, mezclando para disolver la pasta sólida hasta formar un líquido viscoso de color ámbar dorado.'
      ],
      applicationDosage: '10 a 15 mL por litro de agua como coadyuvante/espaciante para bioinsumos y para el control de insectos de cuerpo blando.',
      benefits: [
        'Disuelve la capa cerosa protectora de las plagas sin dañar la hoja.',
        'Mejora la cobertura foliar de los biocontroladores y de los fertilizantes foliares.',
        '100% ecológico y libre de surfactantes sintéticos derivados del petróleo.'
      ]
    },
    'kyusei-em1': {
      description: 'Inóculo formulado por el Prof. Teruo Higa que contiene bacterias fotótrofas, bacterias del ácido láctico y levaduras en equilibrio para la revitalización del suelo y la fertilización orgánica.',
      ingredients: [
        { name: 'Inóculo EM-1 madre', ratio: '50 mL' },
        { name: 'Melaza de caña sin sulfurar', ratio: '50 mL' },
        { name: 'Agua sin cloro tibia (30 °C)', ratio: '1 litro' }
      ],
      steps: [
        'Mezcle la melaza en el agua tibia sin cloro hasta disolverla por completo.',
        'Añada el inóculo EM-1 y mezcle suavemente.',
        'Vierta en una botella PET oscura dejando 2 cm de cámara de aire.',
        'Cierre la tapa y deje fermentar durante 7 días en un ambiente templado (25-30 °C), liberando el gas acumulado cada 2 días.',
        'Cuando el pH descienda por debajo de 3.8 con el característico aroma agridulce, el EM activado está listo.'
      ],
      applicationDosage: '2 mL a 5 mL por litro en riegos al suelo o 1 mL/L en pulverización foliar.',
      benefits: [
        'Acelera la humificación de la materia orgánica en el suelo.',
        'Aumenta la disponibilidad de micro y macronutrientes complejados.',
        'Proporciona mayor resistencia a los patógenos del suelo.'
      ]
    },
    'kyusei-em5': {
      description: 'Extracto natural repelente y preventivo fitosanitario obtenido mediante la fermentación anaerobia de EM-1 con aguardiente, vinagre orgánico y melaza.',
      ingredients: [
        { name: 'Inóculo EM-1 activado o madre', ratio: '100 mL' },
        { name: 'Melaza de caña de azúcar pura', ratio: '100 mL' },
        { name: 'Aguardiente de caña (35-40% de alcohol)', ratio: '100 mL' },
        { name: 'Vinagre de manzana natural (ácido acético 5%)', ratio: '100 mL' },
        { name: 'Agua desclorada / sin cloro', ratio: '600 mL (total 1 litro)' },
        { name: 'Opcional: ajo, chile picante o hierbas medicinales picadas', ratio: '50 g' }
      ],
      steps: [
        'Disuelva la melaza de caña en el agua sin cloro tibia dentro de una botella limpia.',
        'Añada el vinagre, el aguardiente y el inóculo EM-1, mezclando suavemente.',
        'Añada los botánicos picados (ajo y chile) si desea una acción insecticida potenciada.',
        'Selle la botella herméticamente y fermente de 7 a 10 días en un lugar oscuro y templado (25-30 °C).',
        'Abra la botella a diario durante los primeros 4 días para liberar el gas acumulado.',
        'El EM5 está listo cuando cese la producción de gas, con aroma alcohólico-agridulce y pH < 3.5.'
      ],
      applicationDosage: '2 mL a 5 mL por litro de agua (1:500 a 1:200) en pulverización foliar crepuscular cada 7 a 14 días.',
      benefits: [
        'Crea una película biológica protectora en la cutícula de la hoja que impide la germinación de las esporas de hongos.',
        'Acción repelente eficaz contra moscas, trips, pulgones y orugas.',
        'Estimula el fortalecimiento de los tejidos epidérmicos de la planta.'
      ]
    },
    'knf-faa': {
      description: 'Extracto líquido fermentado de pescado rico en nitrógeno orgánico de rápida absorción, aminoácidos esenciales (ácido glutámico, glicina) y oligoelementos marinos.',
      ingredients: [
        { name: 'Residuos frescos de pescado (cabezas, vísceras, espinas y piel)', ratio: '1 parte en peso (1 kg)' },
        { name: 'Azúcar mascabo puro o panela molida', ratio: '1 parte en peso (1 kg)' },
        { name: 'Opcional: microorganismos del suelo (IMO-3 o LAB)', ratio: '10 mL para acelerar' }
      ],
      steps: [
        'Pique el material de pescado fresco en trozos pequeños con un cuchillo limpio.',
        'Mezcle el pescado con la misma cantidad exacta de azúcar mascabo en un balde plástico.',
        'Presione el material hacia el fondo y cubra la superficie con 1 cm más de azúcar mascabo seca.',
        'Cubra el balde con un paño o papel poroso sujeto con una goma elástica (proceso con oxigenación inicial).',
        'Deje fermentar de 3 a 6 meses en un lugar fresco. El azúcar deshidrata el pescado por ósmosis, licuando el tejido sin malos olores.',
        'Cuele el líquido denso de color marrón oscuro. Almacene el FAA en frascos de vidrio o PET.'
      ],
      applicationDosage: '1 mL por litro de agua (1:1000) en riegos al suelo o vía foliar durante el crecimiento vegetativo.',
      benefits: [
        'Acelera el crecimiento vegetativo de tallos y hojas con nitrógeno bioasimilable.',
        'Alimenta y multiplica los hongos y bacterias beneficiosos de la rizosfera.',
        'Promueve hojas verde oscuro, gruesas y de alta eficiencia fotosintética.'
      ]
    },
    'knf-ffj': {
      description: 'Elixir fermentado de frutas dulces maduras (papaya, plátano, calabaza, melón) riquísimo en potasio biodisponible, azúcares complejos y hormonas de floración.',
      ingredients: [
        { name: 'Frutas dulces y bien maduras (plátano con cáscara, papaya, calabaza)', ratio: '1 parte en peso' },
        { name: 'Azúcar mascabo sin refinar', ratio: '1 parte en peso (proporción 1:1)' }
      ],
      steps: [
        'Pique las frutas bien maduras, con cáscara y semillas, en rodajas finas.',
        'Mezcle las frutas en rodajas de forma homogénea con el azúcar mascabo.',
        'Llene 2/3 de un frasco de fermentación y cubra la parte superior con papel transpirable.',
        'Deje fermentar en un lugar oscuro durante 7 a 10 días.',
        'Filtre el jarabe dorado perfumado y guárdelo en recipientes transpirables.'
      ],
      applicationDosage: '1 mL a 2 mL por litro de agua (1:1000 a 1:500) aplicado desde el inicio hasta la mitad de la fase de floración.',
      benefits: [
        'Potencia el engorde, la densidad y el aroma de los frutos y de las flores medicinales.',
        'Aporta potasio y boro biodisponibles para la translocación de azúcares.',
        'Mejora la síntesis y el perfil aromático de los terpenos.'
      ]
    },
    'jadam-biopesticide': {
      description: 'Formulación ecológica de altísima eficiencia sinérgica que combina el coadyuvante JWA, el fungicida azufre JS y el extracto herbal insecticida JHS.',
      ingredients: [
        { name: 'JWA (Jadam Wetting Agent - Jabón Potásico)', ratio: '10 a 15 mL/L' },
        { name: 'JS (Jadam Sulfur - Azufre Soluble Jadam)', ratio: '1.2 a 2 mL/L' },
        { name: 'JHS (Jadam Herbal Solution - Extracto de ajo/chile)', ratio: '5 a 10 mL/L' },
        { name: 'Agua blanda sin sales de calcio (de lluvia o RO)', ratio: '1 litro' }
      ],
      steps: [
        'Mida el agua blanda limpia en el tanque del pulverizador.',
        'Añada primero el JWA (jabón) y mezcle enérgicamente para acondicionar el agua.',
        'Añada el JHS (extracto de chile/ajo/quina) y continúe agitando.',
        'Por último, añada el JS (azufre) y mezcle hasta homogeneizar por completo.',
        'Pulverice en niebla fina cubriendo el haz y el envés de todas las hojas al crepúsculo.'
      ],
      applicationDosage: 'Pulverización foliar completa en vegetativo cada 7-10 días (nunca aplicar JS sobre flores formadas ni bajo sol fuerte).',
      benefits: [
        'Control de espectro total contra ácaros, trips, orugas, moscas y cochinillas.',
        'Eliminación instantánea de hongos foliares como oídio y roya.',
        'Costo irrisorio por litro comparado con los fitosanitarios sintéticos comerciales.'
      ]
    }
  },
  bioinputs: {
    'bio-1': {
      activeAgent: 'Hongo antagonista Trichoderma harzianum (CEPA 1306)',
      dosage: '1.0 g a 2.0 g por litro de agua en el suelo o sustrato',
      targetPestOrDisease: 'Pythium, Fusarium, Rhizoctonia, podredumbre de raíces y caída de plántulas (damping-off)',
      astrayaNotes: 'Aplicar en el trasplante y cada quince días en vegetativo. Actúa por micoparasitismo, competencia por espacio y nutrientes e inducción de resistencia sistémica en el cannabis.'
    },
    'bio-2': {
      activeAgent: 'Hongo entomopatógeno Beauveria bassiana',
      dosage: '2.0 g a 3.0 g por litro de agua (pulverización foliar nocturna)',
      targetPestOrDisease: 'Ácaros, mosca blanca, trips, pulgones y broca del tallo',
      astrayaNotes: 'Las esporas germinan sobre la cutícula de la plaga, penetran el exoesqueleto y momifican al insecto con micelio blanco en 3 a 5 días. Mantener una humedad foliar elevada justo después de la aplicación para asegurar la germinación.'
    },
    'bio-3': {
      activeAgent: 'Bacteria esporulante Bacillus thuringiensis var. kurstaki',
      dosage: '1.5 mL a 2.5 mL por litro de agua en pulverización foliar',
      targetPestOrDisease: 'Orugas de las hojas, oruga del cogollo y oruga de las flores',
      astrayaNotes: 'Produce cristales de proteína endotoxina delta que paralizan el aparato digestivo de las orugas al ser ingeridos. Totalmente inocuo para seres humanos, abejas y depredadores beneficiosos.'
    },
    'bio-4': {
      activeAgent: 'Hongos micorrícicos arbusculares (Rhizophagus irregularis / Glomus intraradices)',
      dosage: '5 g por maceta en el hoyo de trasplante, en contacto directo con la raíz',
      targetPestOrDisease: 'Expansión del área de absorción radicular y estrés hídrico',
      astrayaNotes: 'Las hifas del hongo aumentan la superficie efectiva de absorción de la raíz hasta en un 1000%, mejorando drásticamente la captación de fósforo y micronutrientes en suelos vivos.'
    },
    'bio-5': {
      activeAgent: 'Bacteria Bacillus subtilis QST 713',
      dosage: '3.0 mL a 5.0 mL por litro de agua (foliar preventiva)',
      targetPestOrDisease: 'Oídio (Powdery Mildew), Botrytis cinerea (moho gris) y Macrophomina',
      astrayaNotes: 'Secreta lipopéptidos naturales (iturinas y surfactinas) que rompen las membranas de los hongos patógenos. Excelente protector foliar y seguro para usar hasta la fase inicial de floración.'
    },
    'bio-6': {
      activeAgent: 'Hongo entomopatógeno Metarhizium anisopliae (IBCB 425)',
      dosage: '2.0 g a 3.0 g por litro de agua en pulverización foliar al inicio de la noche',
      targetPestOrDisease: 'Chicharrita del maíz, chinches, escarabajos y larvas del suelo',
      astrayaNotes: 'Penetra la cutícula del insecto e infecta la hemolinfa ("enfermedad del muscardino verde"). Actúa en sinergia con Beauveria bassiana en el control de chicharritas y de insectos chupadores.'
    },
    'bio-7': {
      activeAgent: 'Hongo entomopatógeno Cordyceps fumosorosea',
      dosage: '1.5 g a 2.5 g por litro de agua',
      targetPestOrDisease: 'Mosca blanca (todas las fases), ácaro blanco, trips y araña roja',
      astrayaNotes: 'Control excepcional para brotes de mosca blanca y de ácaro blanco. Ataca huevos, ninfas y adultos, germinando en condiciones de humedad foliar favorable.'
    },
    'bio-8': {
      activeAgent: 'Bacteria diazótrofa y promotora de crecimiento Azospirillum brasilense (Ab-V5 y Ab-V6)',
      dosage: '2.0 mL a 4.0 mL por litro vía fertirrigación o baño de semillas/esquejes',
      targetPestOrDisease: 'Fijación biológica de nitrógeno y estímulo de fitohormonas (auxinas)',
      astrayaNotes: 'Promueve un enraizamiento explosivo en clones y esquejes. Fija el nitrógeno atmosférico y sintetiza ácido indolacético (AIA) nativo.'
    },
    'bio-9': {
      productName: 'Extracto de Algas Marinas (Ascophyllum nodosum)',
      activeAgent: 'Alga marina concentrada rica en citoquininas, betaínas y manitol',
      dosage: '1.0 mL a 2.0 mL por litro vía foliar o al suelo cada 10 días',
      targetPestOrDisease: 'Superación de estrés térmico, hídrico y por fitotoxicidad, y estímulo de la ramificación',
      astrayaNotes: 'Aumenta la concentración de clorofila, activa la síntesis proteica y fortalece el sistema inmunológico vegetal frente a picos de calor y sequía.'
    },
    'bio-10': {
      productName: 'Purpureocillium lilacinum (NematWP / Nematicida Biológico)',
      activeAgent: 'Hongo nematófago Purpureocillium lilacinum (Paecilomyces lilacinus)',
      dosage: '2.0 g a 4.0 g por litro aplicado vía drench (riego al suelo)',
      targetPestOrDisease: 'Nematodo de las agallas (Meloidogyne spp.) y nematodo de las lesiones (Pratylenchus spp.)',
      astrayaNotes: 'Infecta huevos, hembras y juveniles de nematodos dañinos en el suelo, destruyendo la cubierta lipídica de los huevos y saneando la zona radicular.'
    }
  },
  documents: {
    'doc-1': {
      title: '1.1 Deficiencias nutricionales en el cannabis - Guía ilustrada',
      category: 'Agricultura y Nutrición',
      description: 'Documento completo en PDF con el diagnóstico visual de carencias de nitrógeno, fósforo, potasio, calcio, magnesio, azufre y micronutrientes, con fotos y correcciones de campo.'
    },
    'doc-2': {
      title: '1.2 Identificación y control de plagas agrícolas en el cannabis',
      category: 'MIP y Protección Vegetal',
      description: 'Manual técnico de plagas agrícolas (ácaros, trips, pulgones, botrytis, oídio, mosca del sustrato) y protocolos de combate con fitosanitarios biológicos, KNF y JADAM.'
    },
    'doc-3': {
      title: 'Manual práctico de Agricultura Natural Coreana (KNF) y JADAM',
      category: 'Cultivo Orgánico',
      description: 'Protocolos de preparación de FPJ, FFJ, LAB, WCA, JMS, JWA y JS adaptados al cultivo fitoterápico de cannabis medicinal por la asociación.'
    },
    'doc-4': {
      title: 'Guía de calibración agroclimática y VPD por fase fenológica',
      category: 'Meteorología y Clima',
      description: 'Tabla de metas de humedad relativa, temperatura, punto de rocío y déficit de presión de vapor (VPD) para invernaderos y cultivo outdoor.'
    },
    'doc-5': {
      title: 'Identidad visual y logo PNG oficial (Google Drive)',
      category: 'Identidad y Medios',
      description: 'Archivos PNG de alta resolución y versión vectorial del logo oficial de la asociación.'
    },
    'doc-6': {
      title: 'Plantilla del logo y brand assets (Canva oficial)',
      category: 'Identidad y Medios',
      description: 'Enlace oficial de Canva con plantillas de diseño y el arte del logo oficial de la asociación.'
    }
  },
  madres: {
    'madre-1': {
      ataquePragas: 'Resistencia media; monitorear de forma preventiva contra oídio en los períodos lluviosos.',
      enraizamento: '95% en 8-10 días (alta tasa con gel KNF/IBA)',
      casaVegetacao: 'Casa de Vegetación #1 - Módulo A',
      observacoes: 'Excelente vigor vegetativo. Tolera bien las podas FIM y LST para optimizar las yemas laterales.'
    },
    'madre-2': {
      ataquePragas: 'Baja vulnerabilidad a los ácaros; buena tolerancia a las oscilaciones térmicas.',
      enraizamento: '98% en 6-8 días (desarrollo radicular acelerado)',
      casaVegetacao: 'Casa de Vegetación #1 - Módulo B',
      observacoes: 'Matriz principal de alto rendimiento de clones. Ramas gruesas y tolerantes a podas severas.'
    },
    'madre-3': {
      genetica: "Charlotte's Web (Rica en CBD)",
      ataquePragas: 'Excelente resistencia a trips y moscas blancas; sensible al encharcamiento del sustrato.',
      enraizamento: '92% en 10-12 días',
      casaVegetacao: 'Casa de Vegetación #2 - Sección Medicinal',
      observacoes: 'Cepa medicinal fitoterápica con foco en la extracción de aceite de CBD de espectro completo.'
    },
    'madre-4': {
      ataquePragas: 'Requiere atención frecuente con Beauveria bassiana por su atracción moderada hacia la araña roja.',
      enraizamento: '88% en 12-14 días (exige calefacción de la base a 24 °C durante el enraizamiento)',
      casaVegetacao: 'Casa de Vegetación #1 - Módulo C',
      observacoes: 'Exige suplementación continua de calcio y magnesio vía foliar en el invernadero de madres.'
    }
  },
  outdoor: {
    'out-1': {
      nomeCanteiro: 'Parcela Orgánica Pleno Sol #1',
      tipoSubstrato: 'Living Soil orgánico con torta de ricino, harina de huesos y cobertura de mulching KNF',
      protecaoClimatica: 'Invernadero con malla de sombreo 30% + malla antigranizo + pulverización MIP preventiva JWA/JHS',
      observacoes: 'Aprovechamiento del fotoperiodo solar de primavera/verano con riego automatizado por goteo.'
    }
  },
  events: {
    'ev-1': {
      title: 'Fertirrigación con FPJ (KNF) + Cal-Mag',
      notes: 'Dosis 1 mL/L de FPJ + 1.5 mL/L de Cal-Mag. Meta EC: 1.4 / pH 6.2.',
      dosageOrVolume: '20 litros en la parcela A'
    },
    'ev-2': {
      title: 'Pulverización preventiva con Beauveria + JWA',
      notes: 'Aplicar al atardecer o con las luces apagadas para proteger las esporas del hongo.',
      dosageOrVolume: '10 litros en pulverizador de mochila'
    }
  },
  mipLogs: {
    'mip-1': {
      zone: 'Invernadero A - Floración 1',
      pestObserved: 'Araña roja (Tetranychus urticae)',
      actionTaken: 'Liberación de Phytoseiulus persimilis + pulverización de jabón potásico JWA 10 mL/L.',
      responsible: 'Agrónomo'
    }
  }
};
