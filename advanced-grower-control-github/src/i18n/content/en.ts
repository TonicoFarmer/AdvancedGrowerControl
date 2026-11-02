import type { LocalizedContent } from './types';

export const enContent: LocalizedContent = {
  deficiencies: {
    'def-n': {
      element: 'Nitrogen',
      symptoms: [
        'Uniform yellowing (chlorosis) starting from the oldest leaves at the base of the plant.',
        'The symptom progresses upward as N is translocated to the new shoots.',
        'Affected leaves turn completely yellow, dry out and drop prematurely.',
        'Slow growth, thin stems and a drastic reduction in overall vigor.'
      ],
      causes: [
        'Substrate/solution pH below 5.5 or above 7.0 (uptake blockage).',
        'Inert substrate with low fertilization or excessive leaching from heavy watering.',
        'Reduced microbiological activity in cold or waterlogged soils.'
      ],
      correctiveOrganic: [
        'Application of FAA (KNF Fish Amino Acid) at 1:1000 in fertigation.',
        'Castor bean cake / Blood meal in the soil (gradual release).',
        'Liquid biofertilizer from aged manure or vermicompost.'
      ],
      correctiveMineral: [
        'Ammonium Nitrate / Calcium Nitrate (150-200 PPM N in fertigation).',
        'Agricultural urea with low biuret via foliar (1 g to 2 g per liter).'
      ],
      solubilizingMicroorganisms: [
        'Azospirillum brasilense (bacterium that fixes atmospheric Nitrogen)',
        'Rhizobium leguminosarum & Frankia spp.',
        'Bacillus subtilis and Arbuscular Mycorrhizae (Glomus intraradices)'
      ],
      companionPlants: [
        'White Clover (Trifolium repens) - Symbiotic N fixation in the soil',
        'Vetch (Vicia sativa) - High nitrogen-cycling living cover',
        'Jack Bean (Canavalia ensiformis) - Plant biomass rich in starch and N'
      ],
      astrayaTips: 'It is recommended to keep N higher during the vegetative stage (180-220 PPM) and gradually reducing it in late flowering to allow terpene maturation.',
      figures: [
        {
          figureNumber: 'Figura 3',
          title: 'Progression of Nitrogen-Induced Leaf Yellowing',
          description: 'Progression of chlorosis due to nitrogen deficiency from the young leaves (left) to the mature/old leaves (right).'
        },
        {
          figureNumber: 'Figura 4',
          title: 'Yellowing and Loss of Vigor in the Lower Third',
          description: 'Plant showing yellow mature leaves in the lower third due to N translocation to the top.'
        }
      ]
    },
    'def-p': {
      element: 'Phosphorus',
      symptoms: [
        'Dark green, dull leaves or leaves with bluish/purplish tones.',
        'Appearance of dark necrotic spots (brown/bronze) on the lower leaves.',
        'Intensely purple petioles and stems.',
        'Delayed root development and weak flowering with small flowers.'
      ],
      causes: [
        'Unbalanced substrate pH (< 6.0 in soil blocks P through fixation with Fe/Al).',
        'Soil temperatures below 15°C drastically reduce Phosphorus uptake.',
        'Excessive accumulation of Zinc or Iron antagonizing Phosphorus.'
      ],
      correctiveOrganic: [
        'Calcined bone meal or Phosphate Rock (Arad/Gafsa).',
        'WPA (Water Soluble Phosphoric Acid - KNF from bones burned in vinegar).',
        'Wood ash extract or fish meal.'
      ],
      correctiveMineral: [
        'MAP (Monoammonium Phosphate) or MKP (Monopotassium Phosphate).',
        'Single / Triple Superphosphate in fertigation.'
      ],
      solubilizingMicroorganisms: [
        'Bacillus megaterium var. phosphaticum (active solubilizer of fixed P)',
        'Pseudomonas fluorescens & Aspergillus niger',
        'Arbuscular Mycorrhizal Fungi (Rhizophagus irregularis) - Hyphal extension'
      ],
      companionPlants: [
        'Buckwheat (Fagopyrum esculentum) - Exudes organic acids that release Phosphorus',
        'Lupin / White Lupin (Lupinus albus) - Proteoid roots that accumulate P',
        'Dwarf Sunflower (Helianthus annuus) - Deep extraction from the soil profile'
      ],
      astrayaTips: 'P is crucial in the first 3 weeks of flowering for flower bud differentiation. Monitor root temperature during the cold seasons.',
      figures: [
        {
          figureNumber: 'Figura 5',
          title: 'Progression of Phosphorus Symptoms',
          description: 'Progression of phosphorus deficiency symptoms from the youngest leaf (left) to the oldest leaf (right).'
        },
        {
          figureNumber: 'Figura 6',
          title: 'Severe Deficiency and Plant Stunting',
          description: 'Critical Phosphorus shortage resulting in root atrophy and stunted plants.'
        },
        {
          figureNumber: 'Figura 7',
          title: 'Dull Dark Green Coloration',
          description: 'Leaves with a dull dark green tone, a common symptom of sugar accumulation due to Phosphorus scarcity.'
        },
        {
          figureNumber: 'Figura 8',
          title: 'Purpling of Stems and Petioles',
          description: 'Intense purple pigmentation on stems and petioles induced by anthocyanin accumulation due to Phosphorus shortage.'
        }
      ]
    },
    'def-k': {
      element: 'Potassium',
      symptoms: [
        'Burned and necrotic edges and tips of old leaves ("marginal leaf burn" symptom).',
        'Mosaic of yellow and necrotic spots along the serrated margins.',
        'Leaves curling upward, weak and brittle stems.',
        'Increased sensitivity to pests and to water/heat stress.'
      ],
      causes: [
        'Excess Calcium (Ca) or Magnesium (Mg) competing with Potassium for root uptake.',
        'Accumulation of soluble salts in the substrate (high EC in the root zone).',
        'Very sandy substrates with low cation retention (low CEC).'
      ],
      correctiveOrganic: [
        'Diluted pure wood ash (rich source of bioavailable K).',
        'Fermented banana peel extract or sugarcane vinasse.',
        'Organic Potassium Sulfate (K-Mag / Langbeinite).'
      ],
      correctiveMineral: [
        'Potassium Nitrate (KNO3) or Potassium Sulfate (K2SO4).',
        'Purified Potassium Chloride (caution with salinity is recommended).'
      ],
      solubilizingMicroorganisms: [
        'Bacillus mucilaginosus (Potassium solubilizer from silicate minerals)',
        'Frateuria aurentia (K-mobilizing bacterium in the clay-humic complex)',
        'Paenibacillus glucanolyticus'
      ],
      companionPlants: [
        'Comfrey (Symphytum officinale) - Dynamic accumulator of Potassium and minerals',
        'Dandelion (Taraxacum officinale) - Deep taproot that pumps K',
        'Lemongrass / Lemon Balm - Cover biomass extremely rich in silica and Potassium'
      ],
      astrayaTips: 'During the fattening phase of fruits/buds (weeks 4-7 of flowering), K demand doubles. Keep the K:N ratio close to 2:1 in this phase.',
      figures: [
        {
          figureNumber: 'Figura 9',
          title: 'Evolution of Marginal Chlorosis and Necrosis',
          description: 'Development of chlorosis and necrosis on the serrated leaf margins, progressing from young to old leaves.'
        },
        {
          figureNumber: 'Figura 10',
          title: 'Leaf Cluster with Burned Margins',
          description: 'Symptoms of chlorosis and severe necrosis on the margins of leaf clusters due to Potassium deficiency.'
        }
      ]
    },
    'def-ca': {
      element: 'Calcium',
      symptoms: [
        'Small rusty-brown or golden necrotic spots on new leaves.',
        'Deformation of the new shoots (hooked or wrinkled leaves).',
        'Root tips burned, stunted and rotten.',
        'Weak stems and brittle cell structure.'
      ],
      causes: [
        'Low transpiration caused by very high Relative Humidity (RH) or lack of air circulation.',
        'Use of reverse osmosis (RO) water without prior Ca/Mg supplementation.',
        'Excess Potassium or Sodium antagonizing Calcium uptake.'
      ],
      correctiveOrganic: [
        'WCA (Water Soluble Calcium KNF - toasted eggshell solubilized in apple cider vinegar) 1:1000.',
        'Dolomitic limestone or Calcite in the soil.',
        'Agricultural Gypsum (Calcium Sulfate).'
      ],
      correctiveMineral: [
        'Commercial Calcium Nitrate (15% N, 19% Ca) in fertigation (1.0 g/L).',
        'Calcium Chloride for emergency foliar spraying (0.5 g/L).'
      ],
      solubilizingMicroorganisms: [
        'Bacillus licheniformis (Chelation and release of calcium carbonate)',
        'Lactobacillus plantarum (LAB - Lactic acid that solubilizes limestone rock powders)',
        'Trichoderma harzianum (Stimulator of cell rigidity and Ca uptake)'
      ],
      companionPlants: [
        'Basil (Ocimum basilicum) - Stimulates plant structure and the Ca-associated microbiota',
        'Achillea millefolium (Yarrow) - Accumulator of calcium and secondary minerals',
        'Ageratum / Mint - Canopy protection and deep Ca recycling'
      ],
      astrayaTips: 'Calcium is transported via the xylem driven by transpiration. If VPD is very low (< 0.4 kPa), the plant stops transpiring and shows Ca deficiency even with Ca in the soil!',
      figures: [
        {
          figureNumber: 'Figura 11',
          title: 'Necrotic Spotting on Young Leaves',
          description: 'Young leaves developing brownish-yellow necrosis spots and marginal curling.'
        },
        {
          figureNumber: 'Figura 12',
          title: 'Severe Deformation of Top Leaves',
          description: 'Leaves taking on twisted shapes with hooked tips after prolonged Calcium shortage.'
        },
        {
          figureNumber: 'Figura 13',
          title: 'Extensive Necrosis on the Leaf Blade',
          description: 'Advance of the yellowish necrotic spots covering almost the entire leaf tissue.'
        }
      ]
    },
    'def-mg': {
      element: 'Magnesium',
      symptoms: [
        'Marked interveinal chlorosis on the lower leaves (veins remain green and the space between them turns yellow).',
        'Progresses to brown/reddish necrotic spots and edges curled upward.',
        'Decreased photosynthesis (Mg is the central atom of the chlorophyll molecule).'
      ],
      causes: [
        'Soil pH below 6.0 or coco/inert substrate below 5.5.',
        'Excess Calcium or Potassium in fertilization (cationic competition).',
        'Cold root temperatures hindering uptake.'
      ],
      correctiveOrganic: [
        'Epsom Salt (Magnesium Sulfate) via foliar (2-5 g per liter of warm water).',
        'Dolomitic limestone (supplies balanced Ca and Mg).',
        'Ash biofertilizer with magnesium rock.'
      ],
      correctiveMineral: [
        'Heptahydrate Magnesium Sulfate (Epsom Salt) 2 g/L foliar or 1 g/L soil.',
        'Magnesium Nitrate via fertigation in the vegetative stage.'
      ],
      solubilizingMicroorganisms: [
        'Bacillus subtilis (Solubilization of magnesium silicates)',
        'Pseudomonas putida (Release of Mg2+ ions in the rhizoplane)',
        'Beneficial soil actinomycetes (Streptomyces spp.)'
      ],
      companionPlants: [
        'Stinging Nettle (Urtica dioica) - Bio-recycler of iron, nitrogen and magnesium',
        'Chamomile (Matricaria chamomilla) - Attracts pollinators and accumulates magnesium',
        'Sage (Salvia officinalis) - Biostimulant and secondary mineral fixer'
      ],
      astrayaTips: 'Foliar sprays of Epsom Salt before lights-on provide rapid Magnesium recovery within 24 to 48 hours.',
      figures: [
        {
          figureNumber: 'Figura 14',
          title: 'Initial Symptom on Old Leaves',
          description: 'First signs on old leaves with greenish-yellow interveinal chlorosis.'
        },
        {
          figureNumber: 'Figura 15',
          title: 'Intermediate Stage and Cell Breakdown',
          description: 'Collapse of the chlorotic tissues advancing to necrosis and dead brown spots between the veins.'
        },
        {
          figureNumber: 'Figura 16',
          title: 'Advanced Phase and Edge Curling',
          description: 'Progression of chlorosis to cell death with the characteristic wrinkling and rolling of the edges.'
        },
        {
          figureNumber: 'Figura 17',
          title: 'Late Necrosis in the Lower Third',
          description: 'Late development with lower leaves fully necrotic, dry and twisted.'
        }
      ]
    },
    'def-s': {
      element: 'Sulfur',
      symptoms: [
        'Uniform yellowing on new and young leaves, similar to Nitrogen but at the top of the plant.',
        'The underside of new leaves may show purple or pink coloration.',
        'Impaired development of terpenes and aromatic compounds.'
      ],
      causes: [
        'Alkaline soil pH.',
        'Intense leaching of sulfates.'
      ],
      correctiveOrganic: [
        'Agricultural Gypsum (Calcium Sulfate).',
        'JADAM JS (Jadam Sulfur) at the recommended dilution rates.',
        'Epsom Salt (Magnesium Sulfate).'
      ],
      correctiveMineral: [
        'Potassium Sulfate or Magnesium Sulfate (Epsom Salt) 1 g/L in fertigation.',
        'Elemental agricultural Sulfur for gradual pH correction and as an S source.'
      ],
      solubilizingMicroorganisms: [
        'Thiobacillus ferrooxidans & Thiobacillus thiooxidans (Elemental Sulfur-oxidizing bacteria)',
        'Bacillus megaterium',
        'Aspergillus spp.'
      ],
      companionPlants: [
        'Garlic / Chives (Allium spp.) - Natural source of aromatic sulfur compounds',
        'Black Mustard (Brassica nigra) - Biofumigation and sulfate accumulation',
        'Nasturtium (Tropaeolum majus) - Repellent and sulfur accumulator'
      ],
      astrayaTips: 'Sulfur is an essential precursor in the biosynthesis of thiols and volatile sulfur compounds responsible for the striking "skunky" and citrus aromas.',
      figures: [
        {
          figureNumber: 'Figura 18',
          title: 'Apical Chlorosis on Young Leaves',
          description: 'New leaves at the top with uniform yellowish chlorosis due to Sulfur shortage.'
        },
        {
          figureNumber: 'Figura 19',
          title: 'Woodiness and Stiffening of the Stem',
          description: 'Increased rigidity and woody appearance of the stem due to Sulfur deficiency.'
        },
        {
          figureNumber: 'Figura 20',
          title: 'Chlorosis on Upper Leaves and Shoots',
          description: 'Yellowing of the upper leaves (left) and paleness of the meristematic shoots (right).'
        },
        {
          figureNumber: 'Figura 21',
          title: 'Progression of Sulfur Chlorosis',
          description: 'Evolution of chlorosis from moderate (left) to severe (right) due to Sulfur shortage.'
        }
      ]
    },
    'def-b': {
      element: 'Boron',
      symptoms: [
        'Necrosis of the apical meristem (death of the main growing shoot).',
        'New leaves deformed, twisted and with dark brown/bronze coloration at the tips.',
        'Hollow, brittle stems and petioles with surface cracks.',
        'Short, thick roots with swollen tips.'
      ],
      causes: [
        'Soil pH above 7.0 or below 5.0.',
        'Prolonged soil drought reducing the mass flow of Boron.',
        'Ultra-leached substrates with low organic matter content.'
      ],
      correctiveOrganic: [
        'Application of agricultural Boric Acid at precision rates via foliar (0.1 g/L).',
        'Matured organic compost (organic matter is the main Boron reservoir).',
        'Seaweed extract (Ascophyllum nodosum).'
      ],
      correctiveMineral: [
        'Boric Acid (H3BO3) or Disodium Octaborate (Solubor) via foliar (0.05 g to 0.1 g per liter).',
        'Borax / Sodium Tetraborate in the soil (0.5 kg/ha of equivalent B).'
      ],
      solubilizingMicroorganisms: [
        'Bacillus pumilus (Mobilizer of mineral borates)',
        'Pseudomonas fluorescens (Producer of siderophores and organoboron chelates)',
        'Glomus mosseae (Mycorrhiza that facilitates micronutrient uptake)'
      ],
      companionPlants: [
        'Sunflower (Helianthus annuus) - Great ecological indicator and Boron bioaccumulator',
        'Crimson Clover (Trifolium incarnatum) - Borate cycling in the surface layer',
        'White Mustard (Sinapis alba) - Soil decompactor and micronutrient releaser'
      ],
      astrayaTips: 'Boron has a very narrow margin between deficiency and toxicity. Never exceed 0.5 PPM of B in the nutrient solution!',
      figures: [
        {
          figureNumber: 'Figura 22',
          title: 'Interveinal Chlorosis and Apical Thickening',
          description: 'Symptoms on the young top leaves including interveinal chlorosis, thickening and spotting.'
        },
        {
          figureNumber: 'Figura 23',
          title: 'Severe Distortion of Young Leaves',
          description: 'Marked twisting and spiral rolling of the apical shoots due to meristem collapse.'
        }
      ]
    },
    'def-cu': {
      element: 'Copper',
      symptoms: [
        'Pronounced downward/backward curling of the margins of new leaves (claw shape).',
        'Loss of turgor and wilting of young shoots even with moist soil.',
        'New leaves with a bluish dark green tone and necrosis at the serrated tips.',
        'Delayed flowering and weak, flexible branches without rigidity.'
      ],
      causes: [
        'Substrate pH too high (> 7.0) or severe excess of uncomposted organic matter (complexes Cu).',
        'Excess Nitrogen, Phosphorus or Zinc blocking Copper uptake.'
      ],
      correctiveOrganic: [
        'Copper Sulfate at homeopathic dosage (0.05 g/L).',
        'Bordeaux mixture (for fungicidal action and foliar micronutrient supplementation).',
        'Biofertilizer enriched with basaltic rock powder.'
      ],
      correctiveMineral: [
        'Chelated Copper Sulfate (Cu-EDTA) 0.05 g per liter via foliar.',
        'Pentahydrate Copper Sulfate (CuSO4·5H2O) in fertigation (0.02 to 0.05 PPM Cu).'
      ],
      solubilizingMicroorganisms: [
        'Trichoderma harzianum (Biological solubilization of cupric minerals)',
        'Bacillus megaterium',
        'Aspergillus niger (Releaser of organic chelating acids)'
      ],
      companionPlants: [
        'Brown Mustard (Brassica juncea) - Excellent Copper accumulator and recycler',
        'Phacelia (Phacelia tanacetifolia) - Attracts pollinators and decompacts micronutrients',
        'Coriander (Coriandrum sativum) - Bioaccumulator and pest repellent'
      ],
      astrayaTips: 'Copper is an essential component of plastocyanin in the photosynthetic electron transport chain and activates the stem lignification enzymes.',
      figures: [
        {
          figureNumber: 'Figura 26',
          title: 'Progression from Chlorosis to Necrosis',
          description: 'Mosaic of chlorosis evolving into necrotic spots on new leaves through to old leaves due to Copper shortage.'
        },
        {
          figureNumber: 'Figura 27',
          title: 'Curled Bluish-Green Leaves',
          description: 'Leaves with a dull bluish-green tone and the beginning of longitudinal rolling at the edges.'
        },
        {
          figureNumber: 'Figura 28',
          title: 'Wilting and Drooping of the Leaves',
          description: 'Leaves drooping and wilting due to loss of mechanical support and weakness in the lignin structure.'
        }
      ]
    },
    'def-mn': {
      element: 'Manganese',
      symptoms: [
        'Interveinal chlorosis on new leaves with small gray/brown necrotic specks scattered over them.',
        'Unlike Iron, the smaller veins also remain green, creating a checkered/mosaic pattern.',
        'Necrotic development advances across the leaf and causes burning of the edges.'
      ],
      causes: [
        'Elevated soil pH (> 6.8).',
        'Excessively aerated and dry soil (promotes oxidation of Mn2+ into insoluble Mn4+ forms).',
        'Excess soluble Iron creating competitive antagonism.'
      ],
      correctiveOrganic: [
        'Manganese Sulfate via fertigation (1-2 PPM Mn).',
        'Fine-grained Basalt rock powder.',
        'Bokashi with fulvic acids.'
      ],
      correctiveMineral: [
        'Manganese Sulfate (MnSO4·H2O) or Mn-EDTA chelate (1 to 2 PPM Mn in the solution).',
        'Foliar spray of Mn-EDTA 0.1 g/L at the onset of symptoms.'
      ],
      solubilizingMicroorganisms: [
        'Bacillus circulans (Microbiological reducer of insoluble Manganese)',
        'Rhizobium leguminosarum',
        'Pseudomonas putida (Mobilizer of Mn2+ ions)'
      ],
      companionPlants: [
        'Comfrey (Symphytum officinale) - Deep Manganese cycler',
        'Dandelion - Micronutrient pump from the subsoil',
        'Spinach / New Zealand Spinach - Leaf accumulator of Manganese and Iron'
      ],
      astrayaTips: 'Manganese takes part in the photolysis of water in photosynthesis (Photosystem II). Deficiency rapidly destroys photosynthetic efficiency.',
      figures: [
        {
          figureNumber: 'Figura 33',
          title: 'Progressive Development of Manganese Deficiency',
          description: 'Younger leaves showing dark green edges and dotted interveinal chlorosis as they age.'
        },
        {
          figureNumber: 'Figura 34',
          title: 'Symptoms from Young to Old Leaf',
          description: 'Gradation of manganese deficiency from the young leaf (left) to the older leaf with bronze necrotic speckling (right).'
        }
      ]
    },
    'def-zn': {
      element: 'Zinc',
      symptoms: [
        'Classic "rosette" or "miniature leaves" symptom due to severe internode shortening in the new shoots.',
        'Intense interveinal chlorosis on new leaves with twisted and yellowed tips.',
        'New leaves emerge narrow, thin and turned 90 degrees to the side.'
      ],
      causes: [
        'Alkaline soil pH (> 7.0).',
        'Massive excesses of Phosphorus (P) in flowering fertilization (precipitates Zinc as insoluble Zinc Phosphate).',
        'Cold, waterlogged soils without active microbiology.'
      ],
      correctiveOrganic: [
        'Foliar Zinc Sulfate (0.2 g/L) or Zinc chelate.',
        'Fulvic extract with chelated minerals.',
        'Biofertilizer from sheep or goat manure.'
      ],
      correctiveMineral: [
        'Monohydrate Zinc Sulfate (ZnSO4·H2O) or Zn-EDTA chelate (0.1 g to 0.2 g per liter via foliar).',
        'Chelated Zinc via fertigation (0.5 to 1.0 PPM Zn).'
      ],
      solubilizingMicroorganisms: [
        'Bacillus aryabhattai (Zinc solubilizer in tropical soils)',
        'Pseudomonas fluorescens (Solubilization of ZnO and ZnCO3)',
        'Rhizobium phaseoli'
      ],
      companionPlants: [
        'Buckwheat (Fagopyrum esculentum) - Exudes Zinc-chelating compounds',
        'Crimson Clover - Cover crop rich in micronutrients',
        'Rye (Secale cereale) - Deep fibrous roots that extract Zn'
      ],
      astrayaTips: 'Zinc is vital for the synthesis of tryptophan, the amino acid precursor of the hormone Auxin (vegetative growth and cell elongation).',
      figures: [
        {
          figureNumber: 'Figura 39',
          title: 'Interveinal Chlorosis on Young Leaves',
          description: 'Marked interveinal chlorosis on the new leaves at the top of the canopy due to Zinc deficiency.'
        },
        {
          figureNumber: 'Figura 40',
          title: 'Narrow Strap-Like Leaves (Strappy Leaves)',
          description: 'Extremely thin, tapered and deformed new leaves due to lack of Auxin caused by Zinc shortage.'
        },
        {
          figureNumber: 'Figura 41',
          title: 'Apical Symptom Caused by an Immobile Nutrient',
          description: 'Because it is immobile, the primary Zinc symptoms occur strictly at the top and in the apical meristems.'
        },
        {
          figureNumber: 'Figura 42',
          title: 'Interveinal Chlorosis in the Basal Half',
          description: 'Interveinal chlorosis starting in the lower/basal half of the leaf blade.'
        }
      ]
    },
    'def-fe': {
      element: 'Iron',
      symptoms: [
        'Intense, pale interveinal chlorosis on the shoots and new leaves.',
        'The new leaves emerge lemon-yellow and almost white, while the main veins remain green.',
        'Old leaves keep a normal appearance.'
      ],
      causes: [
        'High substrate pH (> 6.8 in coco/hydro or > 7.2 in soil).',
        'Roots waterlogged by overwatering (lack of oxygen in the root zone).',
        'Excess Phosphorus blocking Iron.'
      ],
      correctiveOrganic: [
        'Fermented bokashi rich in natural chelates.',
        'Organic compost rich in fulvic and humic acids to solubilize Fe.'
      ],
      correctiveMineral: [
        'Iron chelate Fe-EDDHA (for soils with pH > 6.5) or Fe-DTPA / Fe-EDTA.',
        'Ferrous Sulfate (FeSO4) via fertigation in acidic soils.'
      ],
      solubilizingMicroorganisms: [
        'Pseudomonas putida & Pseudomonas fluorescens (Producers of Fe3+ siderophores)',
        'Bacillus subtilis',
        'Trichoderma harzianum (Increases iron reductase in the roots)'
      ],
      companionPlants: [
        'Stinging Nettle (Urtica dioica) - Extraordinary bioaccumulator of bioavailable Iron',
        'Parsley (Petroselinum crispum) - Iron accumulator and attractor of beneficial insects',
        'Dandelion - Solubilization of the native iron in the soil'
      ],
      astrayaTips: 'Iron deficiency is almost always a symptom of unbalanced pH or waterlogged roots, and rarely a lack of the element in the soil.',
      figures: [
        {
          figureNumber: 'Figura 31',
          title: 'Lemon-Yellow Apical Chlorosis with Green Veins',
          description: 'Extremely yellow young apical leaves with intact thin green veins due to Iron immobility.'
        }
      ]
    }
  },

  pests: {
    'pest-spidermite': {
      name: 'Red Spider Mite / Two-Spotted Spider Mite (Spider Mites)',
      identification: 'Small arachnids (0.5 mm), yellow, reddish or black, located on the underside (abaxial) of the leaves. They spin fine webs around buds and leaves in severe infestations.',
      damageSymptoms: [
        'Small white or yellowish dots (silvering) on the upper surface of the leaf.',
        'Loss of chlorophyll, yellowing and accelerated drying of the leaves.',
        'Webs covering the flowers and drastically reducing yield and the quality of the essential oils.'
      ],
      prevention: [
        'Keep relative humidity above 55-60% during the vegetative stage (mites hate high humidity).',
        'Rigorous cleaning of the environment with 70% alcohol or hydrogen peroxide between cycles.',
        'Install HEPA filters on the cultivation air intakes.'
      ],
      biologicalControl: [
        'Release of Predatory Mites: Phytoseiulus persimilis (voracious predator of T. urticae) and Neoseiulus californicus (tolerant of higher temperatures and low humidity).',
        'Applications of the entomopathogenic fungus Beauveria bassiana.'
      ],
      organicRecipes: [
        'JWA (Jadam Wetting Agent / Potassium Soap) at 10-15 mL/L + JHS (KNF/Jadam Pepper/Garlic Extract) 5 mL/L in a complete foliar spray.',
        'Neem Oil emulsified with potassium soap (5 mL/L Oil + 3 mL/L Soap) applied at night or with the lights off.'
      ],
      chemicalOrMineral: [
        'Wettable Sulfur (Jadam JS) - WARNING: Never apply sulfur within 14 days of oil use to avoid leaf burn.'
      ]
    },
    'pest-thrips': {
      name: 'Thrips',
      identification: 'Slender, tiny insects (1-1.5 mm), yellow, brown or black, that move quickly. They leave small drops of black and silvery excrement.',
      damageSymptoms: [
        'Silvery spots with a metallic/wet appearance on the leaves.',
        'Small black dots (insect frass) scattered over the silvery spots.',
        'Deformation of the new shoots and transmission of plant viruses.'
      ],
      prevention: [
        'Placement of Blue and Yellow Sticky Traps in the plant canopy for early monitoring.',
        'Preventive treatment of the soil/substrate with beneficial nematodes.'
      ],
      biologicalControl: [
        'Predatory mites: Amblyseius swirskii or Neoseiulus cucumeris.',
        'Predatory bug: Orius insidiosus.',
        'Entomopathogenic fungi: Beauveria bassiana and Metarhizium anisopliae.'
      ],
      organicRecipes: [
        'Foliar spray of Neem Extract + Natural Pyrethrum Extract.',
        'Castor Bean Extract and JWA (Potassium Soap 10 mL/L).'
      ],
      chemicalOrMineral: [
        'Spinosad (organic bacterial derivative registered for organic agriculture).'
      ]
    },
    'pest-fungus-gnats': {
      name: 'Fungus Gnat / Fungus Gnats',
      identification: 'Small black mosquitoes (2-4 mm) that fly erratically over the soil/substrate surface. The larvae are translucent worms with black heads that live in moist soil.',
      damageSymptoms: [
        'Larvae feed on root hairs and young roots, weakening nutrient uptake.',
        'Opening of entry points for pathogenic soil fungi (Pythium, Fusarium, Phytophthora).',
        'Yellowing plant with stalled growth.'
      ],
      prevention: [
        'Avoid overwatering! Allow the top 2-3 cm of the substrate to dry between waterings.',
        'Mulching or a 2 cm layer of quartz sand/perlite on the surface of the pots.'
      ],
      biologicalControl: [
        'Bacillus thuringiensis israelensis (BTI) applied via watering (selectively kills gnat larvae).',
        'Entomopathogenic nematodes: Steinernema feltiae.',
        'Predatory soil mites: Stratiolaelaps scimitus (Hypoaspis miles).'
      ],
      organicRecipes: [
        'Watering with diluted tobacco/neem extract or diatomaceous earth dusted on the dry surface of the pot.'
      ],
      chemicalOrMineral: [
        'Yellow sticky traps at pot height to catch adults.'
      ]
    },
    'pest-botrytis': {
      name: 'Gray Mold / Bud Rot (Botrytis)',
      identification: 'Destructive fungus that attacks the densest flower buds in late flowering. It starts internally in the bud stem and spreads outward.',
      damageSymptoms: [
        'Sudden opening and drying of the small sugar leaves emerging from the bud.',
        'The inside of the bud turns brown, gray, soft and covered by a velvety gray/whitish mold.',
        'Rapid destruction of the inflorescence within a few hours under high humidity.'
      ],
      prevention: [
        'Keep RH in late flowering below 45-50% and VPD between 1.2 and 1.5 kPa.',
        'Ensure strong internal air circulation with oscillating fans (without creating a direct wind tunnel).',
        'Strategic defoliation to improve light and air penetration into the canopy.'
      ],
      biologicalControl: [
        'Preventive spraying during the vegetative stage/early flowering with Trichoderma harzianum and Bacillus subtilis.'
      ],
      organicRecipes: [
        'Rock powders, potassium silicate and biofortified waterings to thicken the plant cell wall.'
      ],
      chemicalOrMineral: [
        'Immediate surgical removal of the affected flowers by cutting 5 cm below the infected area with scissors sterilized in alcohol.'
      ]
    },
    'pest-oidio': {
      name: 'Powdery Mildew',
      identification: 'White talc/chalk dust spots on the upper leaf surface that look like sprinkled flour.',
      damageSymptoms: [
        'White powdery coating that blocks photosynthesis.',
        'Leaf deformation, yellowing and necrosis.',
        'Total contamination of the harvest if it reaches the buds.'
      ],
      prevention: [
        'Strict control of relative humidity (avoid peaks above 70% during the dark period).',
        'Use of UV-C lamps or controlled ozone generators in the air exhaust.'
      ],
      biologicalControl: [
        'Bacillus amyloliquefaciens or Bacillus subtilis sprayed preventively.'
      ],
      organicRecipes: [
        'Raw milk / whey diluted in water (1:9) sprayed under direct sunlight (the light interacts with proteins generating native peroxide).',
        'Potassium Bicarbonate or Sodium Bicarbonate (5 g/L) + potassium soap.'
      ],
      chemicalOrMineral: [
        'JADAM JS (Jadam Sulfur) 1-2 mL/L during the vegetative stage.'
      ]
    },
    'pest-cigarrinho': {
      name: 'Corn Leafhopper (Virus Vector)',
      identification: 'Small hemipteran insects (3 mm) of straw/yellowish color with two dark spots on the head, which jump and fly quickly at the slightest touch on the canopy.',
      damageSymptoms: [
        'Sucking of phloem sap causing weakening of the stems and reduced vigor.',
        'Critical vector of Mollicutes (Pale Stunting and Red Stunting) and Mosaic Virus (Fine Streak).',
        'Leaves with reddish/purple streaks and deformed overgrowth at the top.'
      ],
      prevention: [
        'Elimination of intermediate hosts and volunteer corn near the crop.',
        'Fine-mesh anti-aphid screens (50 mesh) on the air intakes of greenhouses and blowers.',
        'Yellow sticky traps installed at shoot height for continuous monitoring.'
      ],
      biologicalControl: [
        'Entomopathogenic fungus Cordyceps fumosorosea (Isaria fumosorosea) or Beauveria bassiana.',
        'Predatory bugs of the family Anthocoridae and Lacewings (Chrysoperla externa).'
      ],
      organicRecipes: [
        'JWA (Potassium Soap 15 mL/L) + Natural Neem/Pyrethrum extract in dusk sprays.',
        'JHS (Jadam Herbal Solution) concentrate of garlic and chili pepper.'
      ],
      chemicalOrMineral: [
        'Concentrated azadirachtin extract (1.2%) and foliar silicon to harden the cuticle.'
      ]
    },
    'pest-mosca-branca': {
      name: 'Whitefly',
      identification: 'Small flying insects (1 mm) with wings covered by a white powdery wax that fly in clouds when the plants are disturbed. Nymphs are fixed on the underside of the leaf.',
      damageSymptoms: [
        'Leaf chlorosis, yellowing and premature leaf drop due to continuous sap sucking.',
        'Secretion of sugary honeydew that favors the appearance of black sooty mold (Fumagina).',
        'Dangerous transmission of phytopathogenic Geminiviruses and Carlaviruses.'
      ],
      prevention: [
        'Physical barriers with fine gauze mesh and yellow sticky traps.',
        'Frequent inspection of the abaxial (lower) surface of the leaves at the base and middle third.'
      ],
      biologicalControl: [
        'Parasitoid wasp: Encarsia formosa or Eretmocerus eremicus.',
        'Entomopathogenic fungi: Beauveria bassiana and Lecanicillium lecanii.'
      ],
      organicRecipes: [
        'Application of potassium soap (JWA 15 mL/L) combined with emulsified castor bean vegetable oil.',
        'Wood ash extract to change the leaf pH and provide repellency.'
      ],
      chemicalOrMineral: [
        'Micronized Diatomaceous Earth via foliar (10 g/L) creating an abrasive mechanical barrier.'
      ]
    },
    'pest-acaro-branco': {
      name: 'Broad Mite / White Mite',
      identification: 'Microscopic mites (<0.2 mm) completely invisible to the naked eye, transparent/greenish. They inhabit the meristems and the new growing shoots.',
      damageSymptoms: [
        'Injection of potent salivary toxins that cause severe deformation of the new shoots.',
        'New leaves emerge twisted, rigid, turned downward, with a leathery, plastic or burnt-glass appearance.',
        'Immediate stagnation of top growth without visible webs.'
      ],
      prevention: [
        'Absolute hygiene of the operators (change of clothes between grow rooms).',
        'Maintain constant ventilation and avoid dead zones with trapped heat and humidity.'
      ],
      biologicalControl: [
        'Predatory top mites: Neoseiulus californicus and Amblyseius swirskii (highly efficient in the control of P. latus).'
      ],
      organicRecipes: [
        'Wettable sulfur JADAM JS (1.5 mL/L) sprayed every 3 days for 2 weeks (discontinue when using oils).',
        'Phytochemical baths with cold-pressed neem oil emulsified with organic soap.'
      ],
      chemicalOrMineral: [
        'Thermal immersion treatment of cuttings (43°C for 15 minutes) before planting.'
      ]
    },
    'pest-nematoide-galhas': {
      name: 'Root-Knot Nematode',
      identification: 'Microscopic soil worms that penetrate the root system and establish fixed feeding sites, inducing hypertrophy of the root cells.',
      damageSymptoms: [
        'Formation of swellings and nodules on the roots ("galls" or root potatoes).',
        'Total inability of the plant to absorb water and nutrients, causing wilting during the hot hours.',
        'Severe stunting, multiple nutritional deficiency symptoms and early yellowing.'
      ],
      prevention: [
        'Soil solarization before cultivation or steam pasteurization of reused substrates.',
        'Use of clean, inspected substrate with well-cured organic matter fertilization.'
      ],
      biologicalControl: [
        'Nematicidal bacteria: Bacillus chitinosporus and Bacillus methylotrophicus.',
        'Nematophagous fungi: Purpureocillium lilacinum (Paecilomyces lilacinus) and Pochonia chlamydosporia.'
      ],
      organicRecipes: [
        'Neem Cake / Castor Bean Meal incorporated into the substrate (releases bioactive nematicidal compounds during decomposition).',
        'Compost tea rich in antagonistic microbiology and rock fulvic extract.'
      ],
      chemicalOrMineral: [
        'Inoculation of Arbuscular Mycorrhizae to compete for space in the roots.'
      ]
    },
    'pest-nematoide-lesoes': {
      name: 'Root-Lesion Nematode',
      identification: 'Migratory endoparasitic nematodes that move freely inside and outside the roots, destroying the cells of the root cortex.',
      damageSymptoms: [
        'Formation of dark and pale necrotic lesions along the entire length of the fine roots.',
        'Destruction and rotting of the absorbing rootlets.',
        'Facilitated open entry for necrotrophic soil fungi (Fusarium oxysporum and Pythium ultimum).'
      ],
      prevention: [
        'Planting of nematicidal green cover crops such as Crotalaria (Crotalaria spectabilis) or Marigold (Tagetes patula).',
        'Crop rotation and use of biochar in the soil.'
      ],
      biologicalControl: [
        'Nematode-trapping fungi: Arthrobotrys oligospora.',
        'Rhizosphere bacteria: Pasteuria penetrans and Bacillus firmus.'
      ],
      organicRecipes: [
        'Application of JADAM JHS garlic/pepper as a substrate drench (0.5%).',
        'Incorporation of brassica straw (Mustard/Turnip) for organic soil biofumigation.'
      ],
      chemicalOrMineral: [
        'Application of soluble silicon via watering to fortify the root epidermis.'
      ]
    }
  },

  recipes: {
    'knf-fpj': {
      name: 'FPJ - Fermented Plant Juice',
      description: 'Fermented extract of young, fast-growing shoots (e.g., bamboo shoot, tithonia, nettle, cannabis shoot) rich in plant growth hormones (auxins, gibberellins) and enzymes.',
      ingredients: [
        { name: 'Green, tender shoots harvested before sunrise', ratio: '1 part by weight' },
        { name: 'Unrefined brown sugar (pure muscovado)', ratio: '1 part by weight (1:1 ratio)' }
      ],
      steps: [
        'Harvest the fresh plant shoot tips without washing them, to preserve the native microorganisms on the leaf surface.',
        'Chop the plant material into 2 to 5 cm pieces.',
        'Mix homogeneously with the same amount by weight of brown sugar.',
        'Place in a glass or ceramic jar, filling up to 2/3 of its capacity.',
        'Cover with breathable paper (paper towel or cotton cloth) and tie with an elastic band.',
        'Ferment in a cool, dark place for 7 to 10 days.',
        'Strain the dense, dark liquid and store it in a semi-open glass bottle.'
      ],
      applicationDosage: '1 mL per liter of water (1:1000) in weekly watering or foliar spray during the Vegetative stage.',
      benefits: [
        'Stimulates rooting and healthy cell elongation.',
        'Increases plant immunity against heat stress.',
        'Supplies bio-assimilable nitrogen and native phytohormones.'
      ]
    },
    'knf-lab': {
      name: 'LAB - Lactic Acid Bacteria',
      description: 'Concentrated culture of beneficial Lactobacillus that solubilize nutrients, suppress anaerobic soil pathogens (Pythium/Fusarium) and accelerate organic decomposition.',
      ingredients: [
        { name: 'Rice washing water (rich in starch)', ratio: '1 liter' },
        { name: 'Whole raw or pasteurized milk of good quality', ratio: '10 liters (1:10 ratio)' },
        { name: 'Sugarcane molasses or brown sugar for preservation', ratio: '1 part to 1 part purified LAB' }
      ],
      steps: [
        'Wash the rice in non-chlorinated water and collect the cloudy liquid (rice water). Ferment it in glass for 3-5 days until a slightly sour aroma develops.',
        'Mix 1 part of this rice ferment with 10 parts fresh milk in a covered container.',
        'Wait 5 to 7 days until the milk curdles and separates into a solid upper layer (cheese/whey) and a clear yellowish liquid below (LAB serum).',
        'Filter the clear yellow serum (this is the concentrated LAB).',
        'Mix in equal parts with sugarcane molasses to stabilize and store in the refrigerator for up to 1 year.'
      ],
      applicationDosage: '1 mL to 2 mL per liter of water (1:1000 to 1:500) via soil/substrate or as a cover spray.',
      benefits: [
        'Eliminates composting odors and prevents root rot.',
        'Improves the solubility of Calcium and Phosphorus in the soil.',
        'Strengthens the rhizosphere microbiology.'
      ]
    },
    'jadam-jms': {
      name: 'JMS - Jadam Microorganism Solution',
      description: 'Low-cost cultivation of diversified native microorganisms from forest soil (forest humus) multiplied with boiled potato and sea salt.',
      ingredients: [
        { name: 'Chlorine-free water (rain, well or dechlorinated)', ratio: '500 liters (or scaled to 20 L)' },
        { name: 'Forest/native woodland soil or mature vermicompost', ratio: '500 g in a cloth bag' },
        { name: 'Boiled whole potato with skin, mashed', ratio: '500 g' },
        { name: 'Coarse iodine-free sea salt or seawater', ratio: '500 g of sea salt' }
      ],
      steps: [
        'Boil the potatoes until very soft and mash them inside a fine cloth bag together with the sea salt.',
        'Submerge the potato bag and the forest soil bag in a drum of chlorine-free water.',
        'Massage both bags in the water for 5 minutes to release the starch and the native microorganisms.',
        'Cover the container without sealing it hermetically and keep it at room temperature (20-30°C).',
        'Within 24 to 72 hours a dense foam forms on the surface with a pleasant yeasty aroma. This is the peak of multiplication!'
      ],
      applicationDosage: 'Use pure or diluted up to 1:10 in generous soil waterings before and during cultivation.',
      benefits: [
        'Restores the biodiversity of the soil microbiome.',
        'Prevents the emergence of pathogens through competitive exclusion.',
        'Completely free, using local raw materials.'
      ]
    },
    'jadam-jwa': {
      name: 'JWA - Jadam Wetting Agent (Potassium Soap)',
      description: 'Biodegradable soap made from vegetable oil and potassium hydroxide (KOH) that acts as a natural, biodegradable surfactant and defensive against mites, aphids and flies.',
      ingredients: [
        { name: 'Canola, sunflower or soybean vegetable oil', ratio: '1.8 liters' },
        { name: 'Potassium Hydroxide (90% KOH flakes)', ratio: '320 grams' },
        { name: 'Soft water (rainwater or reverse osmosis)', ratio: '1.2 liters + 10 liters' }
      ],
      steps: [
        'In a heat-resistant container, dissolve the KOH in 1.2 L of soft water (exothermic reaction - use PPE: gloves and goggles).',
        'Add the vegetable oil and beat with an industrial/household mixer for 10-15 minutes until a thick emulsion resembling mayonnaise/butter forms.',
        'Let it rest closed for 3 days for complete saponification.',
        'Add the remaining 10 L of soft water in stages, stirring to dissolve the solid paste until a viscous golden amber liquid forms.'
      ],
      applicationDosage: '10 to 15 mL per liter of water as a wetting agent for bioinputs and control of soft-bodied insects.',
      benefits: [
        'Dissolves the waxy protective layer of pests without damaging the leaf.',
        'Improves the foliar coverage of biocontrols and foliar fertilizers.',
        '100% ecological and free of synthetic petroleum-based surfactants.'
      ]
    },
    'kyusei-em1': {
      name: 'EM-1 / Activated Bokashi (Kyusei Effective Microorganisms)',
      description: 'Inoculant formulated by Prof. Teruo Higa containing phototrophic bacteria, lactic acid bacteria and yeasts in balance for soil revitalization and organic fertilization.',
      ingredients: [
        { name: 'Mother EM-1 inoculant', ratio: '50 mL' },
        { name: 'Non-sulfured sugarcane molasses', ratio: '50 mL' },
        { name: 'Warm chlorine-free water (30°C)', ratio: '1 liter' }
      ],
      steps: [
        'Mix the molasses into the warm chlorine-free water until fully dissolved.',
        'Add the EM-1 inoculant and mix gently.',
        'Pour into a dark PET bottle, leaving a 2 cm air chamber.',
        'Close the cap and let it ferment for 7 days in a warm environment (25-30°C), releasing the accumulated gas every 2 days.',
        'When the pH drops below 3.8 with the characteristic sweet-and-sour aroma, the Activated EM is ready.'
      ],
      applicationDosage: '2 mL to 5 mL per liter in soil waterings or 1 mL/L in foliar spraying.',
      benefits: [
        'Accelerates the humification of organic matter in the soil.',
        'Increases the availability of complexed micro and macronutrients.',
        'Provides greater resistance to soil pathogens.'
      ]
    },
    'kyusei-em5': {
      name: 'EM5 - Kyusei EM Repellent Defensive',
      description: 'Natural repellent and preventive phytosanitary extract obtained through the anaerobic fermentation of EM-1 with cachaça/sugarcane spirit, organic vinegar and molasses.',
      ingredients: [
        { name: 'Activated or Mother EM-1 inoculant', ratio: '100 mL' },
        { name: 'Pure sugarcane molasses', ratio: '100 mL' },
        { name: 'Sugarcane spirit / Cachaça (35-40% alcohol)', ratio: '100 mL' },
        { name: 'Natural apple cider vinegar (5% acetic acid)', ratio: '100 mL' },
        { name: 'Dechlorinated / chlorine-free water', ratio: '600 mL (1 liter total)' },
        { name: 'Optional: chopped garlic, chili pepper or medicinal herbs', ratio: '50 g' }
      ],
      steps: [
        'Dissolve the sugarcane molasses in warm chlorine-free water in a clean bottle.',
        'Add the vinegar, the cachaça and the EM-1 inoculant, mixing gently.',
        'Add the chopped botanicals (garlic and pepper) if you want a boosted insecticidal action.',
        'Seal the bottle hermetically and ferment for 7 to 10 days in a dark, warm place (25-30°C).',
        'Open the bottle daily during the first 4 days to release the accumulated gas.',
        'The EM5 is ready when gas production stops, with an alcoholic sweet-and-sour aroma and pH < 3.5.'
      ],
      applicationDosage: '2 mL to 5 mL per liter of water (1:500 to 1:200) in dusk foliar spraying every 7 to 14 days.',
      benefits: [
        'Creates a protective biological film on the leaf cuticle that prevents fungal spore germination.',
        'Effective repellent action against flies, thrips, aphids and caterpillars.',
        'Stimulates the strengthening of the plant epidermal tissues.'
      ]
    },
    'knf-faa': {
      name: 'FAA - Fish Amino Acid (KNF)',
      description: 'Fermented liquid fish extract rich in fast-absorbing organic Nitrogen, essential amino acids (glutamic acid, glycine) and marine trace elements.',
      ingredients: [
        { name: 'Fresh fish residues (heads, viscera, bones and skin)', ratio: '1 part by weight (1 kg)' },
        { name: 'Pure brown sugar or ground rapadura', ratio: '1 part by weight (1 kg)' },
        { name: 'Optional: soil microorganisms (IMO-3 or LAB)', ratio: '10 mL to accelerate' }
      ],
      steps: [
        'Chop the fresh fish material into small pieces with a clean knife.',
        'Mix the fish with the exact same amount of brown sugar in a plastic bucket.',
        'Press the material to the bottom and cover the surface with another 1 cm of dry brown sugar.',
        'Cover the bucket with cloth or porous paper held with an elastic band (process with initial oxygenation).',
        'Let it ferment for 3 to 6 months in a cool place. The sugar osmotically dehydrates the fish, liquefying the tissue without bad odors.',
        'Strain the dense dark brown liquid. Store the FAA in glass or PET bottles.'
      ],
      applicationDosage: '1 mL per liter of water (1:1000) in soil waterings or via foliar during Vegetative growth.',
      benefits: [
        'Accelerates the vegetative growth of stems and leaves with bio-assimilable Nitrogen.',
        'Feeds and multiplies the beneficial fungi and bacteria of the rhizosphere.',
        'Promotes thick, dark green leaves with high photosynthetic efficiency.'
      ]
    },
    'knf-ffj': {
      name: 'FFJ - Fermented Fruit Juice (KNF)',
      description: 'Fermented elixir of ripe sweet fruits (papaya, banana, pumpkin, melon) extremely rich in bioavailable Potassium, complex sugars and flowering hormones.',
      ingredients: [
        { name: 'Sweet, very ripe fruits (banana with peel, papaya, pumpkin)', ratio: '1 part by weight' },
        { name: 'Unrefined brown sugar', ratio: '1 part by weight (1:1 ratio)' }
      ],
      steps: [
        'Chop the very ripe fruits with peel and seeds into thin slices.',
        'Mix the sliced fruits homogeneously with the brown sugar.',
        'Fill 2/3 of a fermentation jar and cover the top with breathable paper.',
        'Let it ferment in a dark place for 7 to 10 days.',
        'Filter the fragrant golden syrup and store it in breathable containers.'
      ],
      applicationDosage: '1 mL to 2 mL per liter of water (1:1000 to 1:500) applied from the start to the middle of the Flowering Stage.',
      benefits: [
        'Enhances the fattening, density and aroma of fruits/medicinal flowers.',
        'Supplies bioavailable Potassium and Boron for sugar translocation.',
        'Improves terpene synthesis and aromatic profile.'
      ]
    },
    'jadam-biopesticide': {
      name: 'JADAM Biopesticide - Complete Defensive System (JWA + JS + JHS)',
      description: 'Ecological formulation of very high synergistic efficiency combining the JWA adhesive spreader, the JS sulfur fungicide and the JHS herbal insecticidal extract.',
      ingredients: [
        { name: 'JWA (Jadam Wetting Agent - Potassium Soap)', ratio: '10 to 15 mL/L' },
        { name: 'JS (Jadam Sulfur - Soluble Jadam Sulfur)', ratio: '1.2 to 2 mL/L' },
        { name: 'JHS (Jadam Herbal Solution - Garlic/Pepper Extract)', ratio: '5 to 10 mL/L' },
        { name: 'Soft water free of calcium salts (rain or RO)', ratio: '1 liter' }
      ],
      steps: [
        'Measure the clean soft water into the sprayer tank.',
        'Add the JWA (Soap) first and mix vigorously to condition the water.',
        'Add the JHS (Pepper/Garlic/Quinine extract) and keep stirring.',
        'Finally, add the JS (Sulfur) and mix until completely homogeneous.',
        'Spray as a fine mist covering the upper and lower surfaces of all leaves at dusk.'
      ],
      applicationDosage: 'Complete foliar spray during the vegetative stage every 7-10 days (never apply JS to formed flowers or under strong sun).',
      benefits: [
        'Full-spectrum control against Mites, Thrips, Caterpillars, Flies and Scale insects.',
        'Instant elimination of foliar fungi such as Powdery Mildew and Rust.',
        'Cost of a few cents per liter compared to commercial synthetic pesticides.'
      ]
    }
  },

  bioinputs: {
    'bio-1': {
      activeAgent: 'Antagonistic fungus Trichoderma harzianum (strain 1306)',
      dosage: '1.0 g to 2.0 g per liter of water in the soil or substrate',
      targetPestOrDisease: 'Pythium, Fusarium, Rhizoctonia, root rot and damping-off of seedlings',
      astrayaNotes: 'Apply at transplanting and fortnightly during the vegetative stage. It acts through mycoparasitism, competition for space/nutrients and induction of systemic resistance in cannabis.'
    },
    'bio-2': {
      activeAgent: 'Entomopathogenic fungus Beauveria bassiana',
      dosage: '2.0 g to 3.0 g per liter of water (foliar spray at night)',
      targetPestOrDisease: 'Mites, Whitefly, Thrips, Aphids and Stem Borer',
      astrayaNotes: 'The spores germinate on the cuticle of the pest, penetrate the exoskeleton and mummify the insect with white mycelium within 3 to 5 days. Keep leaf humidity high right after application to ensure germination.'
    },
    'bio-3': {
      activeAgent: 'Spore-forming bacterium Bacillus thuringiensis var. kurstaki',
      dosage: '1.5 mL to 2.5 mL per liter of water in foliar spray',
      targetPestOrDisease: 'Leaf caterpillars, Fall Armyworm and Flower Caterpillar',
      astrayaNotes: 'It produces delta-endotoxin protein crystals that paralyze the digestive tract of caterpillars when ingested. Completely harmless to humans, bees and beneficial predators.'
    },
    'bio-4': {
      productName: 'Glomus intraradices (Arbuscular Mycorrhiza Endomyco)',
      activeAgent: 'Arbuscular Mycorrhizal Fungi (Rhizophagus irregularis / Glomus intraradices)',
      dosage: '5 g per pot in the transplant hole, in direct contact with the root',
      targetPestOrDisease: 'Expansion of the root absorption area and water stress',
      astrayaNotes: 'The fungal hyphae increase the effective root absorption surface by up to 1000%, dramatically improving the uptake of Phosphorus and micronutrients in living soils.'
    },
    'bio-5': {
      activeAgent: 'Bacterium Bacillus subtilis QST 713',
      dosage: '3.0 mL to 5.0 mL per liter of water (preventive foliar)',
      targetPestOrDisease: 'Powdery Mildew, Botrytis cinerea (Gray Mold) and Macrophomina',
      astrayaNotes: 'Secretes natural lipopeptides (iturins and surfactins) that rupture the membranes of pathogenic fungi. Excellent foliar protectant and safe for use up to the early flowering stage.'
    },
    'bio-6': {
      activeAgent: 'Entomopathogenic fungus Metarhizium anisopliae (IBCB 425)',
      dosage: '2.0 g to 3.0 g per liter of water in foliar spray early in the evening',
      targetPestOrDisease: 'Corn Leafhopper, Stink Bugs, Beetles and Soil Larvae',
      astrayaNotes: 'It penetrates the insect cuticle and infects the hemolymph ("green muscardine disease"). It acts in synergy with Beauveria bassiana in the control of leafhoppers and sap-sucking insects.'
    },
    'bio-7': {
      activeAgent: 'Entomopathogenic fungus Cordyceps fumosorosea',
      dosage: '1.5 g to 2.5 g per liter of water',
      targetPestOrDisease: 'Whitefly (all stages), Broad Mite, Thrips and Spider Mite',
      astrayaNotes: 'Exceptional control of Whitefly and Broad Mite outbreaks. It attacks eggs, nymphs and adults, germinating under favorable leaf humidity conditions.'
    },
    'bio-8': {
      productName: 'Azospirillum brasilense (Azos Inoculant)',
      activeAgent: 'Diazotrophic and growth-promoting bacterium Azospirillum brasilense (Ab-V5 and Ab-V6)',
      dosage: '2.0 mL to 4.0 mL per liter via fertigation or seed/cutting bath',
      targetPestOrDisease: 'Biological Nitrogen fixation and stimulation of phytohormones (Auxins)',
      astrayaNotes: 'Promotes explosive rooting in clones and cuttings. It fixes atmospheric nitrogen and synthesizes native indoleacetic acid (IAA).'
    },
    'bio-9': {
      productName: 'Seaweed Extract (Ascophyllum nodosum)',
      activeAgent: 'Concentrated seaweed rich in cytokinins, betaines and mannitol',
      dosage: '1.0 mL to 2.0 mL per liter via foliar or soil every 10 days',
      targetPestOrDisease: 'Overcoming heat and water stress, phytotoxicity and stimulation of branching',
      astrayaNotes: 'Increases chlorophyll concentration, activates protein synthesis and strengthens the plant immune system against heat spikes and drought.'
    },
    'bio-10': {
      productName: 'Purpureocillium lilacinum (NematWP / Biological Nematocide)',
      activeAgent: 'Nematophagous fungus Purpureocillium lilacinum (Paecilomyces lilacinus)',
      dosage: '2.0 g to 4.0 g per liter applied via drench (soil watering)',
      targetPestOrDisease: 'Root-Knot Nematode (Meloidogyne spp.) and Root-Lesion Nematode (Pratylenchus spp.)',
      astrayaNotes: 'Infects eggs, females and juveniles of harmful nematodes in the soil, destroying the lipid shell of the eggs and cleaning the root zone.'
    }
  },

  documents: {
    'doc-1': {
      title: '1.1 Nutritional Deficiencies in Cannabis - Illustrated Guide',
      category: 'Agriculture & Nutrition',
      description: 'Complete PDF document with the visual diagnosis of Nitrogen, Phosphorus, Potassium, Calcium, Magnesium, Sulfur and Micronutrient deficiencies, with photos and field corrections.'
    },
    'doc-2': {
      title: '1.2 Identification and Control of Agricultural Pests in Cannabis',
      category: 'IPM & Plant Protection',
      description: 'Technical manual on agricultural pests (Mites, Thrips, Aphids, Botrytis, Powdery Mildew, Fungus Gnats) and control protocols with biological pesticides, KNF and JADAM.'
    },
    'doc-3': {
      title: 'Practical Manual of Korean Natural Farming (KNF) & JADAM',
      category: 'Organic Cultivation',
      description: 'Preparation protocols for FPJ, FFJ, LAB, WCA, JMS, JWA and JS adapted for the phytotherapeutic cultivation of medicinal cannabis by the association.'
    },
    'doc-4': {
      title: 'Agroclimatic Calibration and VPD Guide by Phenological Stage',
      category: 'Meteorology & Climate',
      description: 'Table of targets for Relative Humidity, Temperature, Dew Point and Vapor Pressure Deficit (VPD) for greenhouses and outdoor cultivation.'
    },
    'doc-5': {
      title: 'Visual Identity & Official PNG Logo (Google Drive)',
      category: 'Identity & Media',
      description: 'High-resolution PNG files and the vector version of the official logo of the association.'
    },
    'doc-6': {
      title: 'Logo Template & Brand Assets (Official Canva)',
      category: 'Identity & Media',
      description: 'Official Canva link with the designer templates and artwork of the official logo of the association.'
    }
  },

  madres: {
    'madre-1': {
      ataquePragas: 'Medium resistance; monitor preventively against Powdery Mildew during rainy periods.',
      enraizamento: '95% in 8-10 days (high rate with KNF/IBA gel)',
      casaVegetacao: 'Greenhouse #1 - Module A',
      observacoes: 'Excellent vegetative vigor. Responds well to FIM and LST pruning to optimize lateral buds.'
    },
    'madre-2': {
      ataquePragas: 'Low vulnerability to mites; good tolerance to temperature fluctuations.',
      enraizamento: '98% in 6-8 days (accelerated root development)',
      casaVegetacao: 'Greenhouse #1 - Module B',
      observacoes: 'Main high-yield clone mother. Thick branches that tolerate severe pruning.'
    },
    'madre-3': {
      genetica: "Charlotte's Web (High CBD)",
      ataquePragas: 'Excellent resistance to thrips and whiteflies; sensitive to soil waterlogging.',
      enraizamento: '92% in 10-12 days',
      casaVegetacao: 'Greenhouse #2 - Medicinal Section',
      observacoes: 'Medicinal phytotherapeutic strain focused on full-spectrum CBD oil extraction.'
    },
    'madre-4': {
      ataquePragas: 'Requires frequent attention with Beauveria bassiana due to moderate attraction to spider mites.',
      enraizamento: '88% in 12-14 days (requires bottom heating at 24°C during rooting)',
      casaVegetacao: 'Greenhouse #1 - Module C',
      observacoes: 'Requires continuous Calcium and Magnesium supplementation via foliar in the mother greenhouse.'
    }
  },

  outdoor: {
    'out-1': {
      nomeCanteiro: 'Full Sun Organic Plot #1',
      tipoSubstrato: 'Organic Living Soil with Castor Bean Cake, Bone Meal and KNF Straw Mulch',
      protecaoClimatica: 'Greenhouse with 30% Shade Net + Anti-Hail Mesh + Preventive IPM Spraying JWA/JHS',
      observacoes: 'Use of the spring/summer solar photoperiod with automated drip irrigation.'
    }
  },

  events: {
    'ev-1': {
      title: 'Fertigation with FPJ (KNF) + Cal-Mag',
      notes: 'Dosage 1 mL/L FPJ + 1.5 mL/L Cal-Mag. Target EC: 1.4 / pH 6.2.',
      dosageOrVolume: '20 liters in plot A'
    },
    'ev-2': {
      title: 'Preventive Spraying with Beauveria + JWA',
      notes: 'Apply at sunset or with the lights off to protect the fungal spores.',
      dosageOrVolume: '10 liters in a backpack sprayer'
    }
  },

  mipLogs: {
    'mip-1': {
      zone: 'Greenhouse A - Flower 1',
      pestObserved: 'Spider Mite (Tetranychus urticae)',
      actionTaken: 'Release of Phytoseiulus persimilis + Spraying of Potassium Soap JWA 10 mL/L.',
      responsible: 'Agronomist'
    }
  }
};
