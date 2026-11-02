import type { LocalizedContent } from './types';

export const deContent: LocalizedContent = {
  deficiencies: {
    'def-n': {
      element: 'Stickstoff',
      symptoms: [
        'Gleichmäßige Gelbfärbung (Chlorose), die an den ältesten Blättern der Pflanzenbasis beginnt.',
        'Das Symptom schreitet nach oben fort, während N in die neuen Triebe umgelagert wird.',
        'Betroffene Blätter vergilben vollständig, vertrocknen und fallen vorzeitig ab.',
        'Langsames Wachstum, dünne Stängel und drastische Reduktion der allgemeinen Vitalität.',
      ],
      causes: [
        'pH des Substrats/der Nährlösung unter 5,5 oder über 7,0 (Blockade der Nährstoffaufnahme).',
        'Inertes Substrat mit geringer Düngung oder übermäßiger Auswaschung durch großzügige Bewässerung.',
        'Reduzierte mikrobiologische Aktivität in kalten oder staunassen Böden.',
      ],
      correctiveOrganic: [
        'Anwendung von FAA (Fish Amino Acid, KNF) 1:1000 über Fertigation.',
        'Rizinuspresskuchen / Blutmehl im Boden (allmähliche Freisetzung).',
        'Flüssiges Biofertilisat aus abgelagertem Mist oder Wurmhumus.',
      ],
      correctiveMineral: [
        'Ammoniumnitrat / Calciumnitrat (150-200 ppm N in der Fertigation).',
        'Landwirtschaftlicher Harnstoff mit niedrigem Biuretgehalt über das Blatt (1 g bis 2 g pro Liter).',
      ],
      solubilizingMicroorganisms: [
        'Azospirillum brasilense (bakterieller Fixierer atmosphärischen Stickstoffs)',
        'Rhizobium leguminosarum & Frankia spp.',
        'Bacillus subtilis und arbuskuläre Mykorrhiza (Glomus intraradices)',
      ],
      companionPlants: [
        'Weißklee (Trifolium repens) - symbiotische N-Fixierung im Boden',
        'Saatwicke (Vicia sativa) - lebende Begrünung mit hoher Stickstoffumsetzung',
        'Schwertbohne (Canavalia ensiformis) - stärke- und stickstoffreiche Pflanzenbiomasse',
      ],
      astrayaTips:
        'Empfohlen wird, N in der Vegetationsphase höher zu halten (180-220 ppm) und in der fortgeschrittenen Blüte schrittweise zu senken, damit die Terpene ausreifen können.',
      figures: [
        {
          figureNumber: 'Figura 3',
          title: 'Verlauf der Blattvergilbung durch Stickstoff',
          description:
            'Progression der Chlorose infolge Stickstoffmangels von den jungen Blättern (links) bis zu den ausgewachsenen/alten Blättern (rechts).',
        },
        {
          figureNumber: 'Figura 4',
          title: 'Vergilbung und Vitalitätsverlust im unteren Drittel',
          description:
            'Pflanze mit gelben ausgewachsenen Blättern im unteren Drittel durch die Verlagerung von N in den oberen Bereich.',
        },
      ],
    },
    'def-p': {
      element: 'Phosphor',
      symptoms: [
        'Dunkelgrüne, matte Blätter oder Blätter mit bläulichen/violettfarbenen Tönen.',
        'Auftreten dunkler nekrotischer Flecken (braun/bronzefarben) an den unteren Blättern.',
        'Intensiv violette Blattstiele und Stängel.',
        'Verzögerte Wurzelentwicklung und schwache Blüte mit kleinen Blüten.',
      ],
      causes: [
        'Nicht angepasster Substrat-pH (< 6,0 im Boden blockiert P durch Fixierung an Fe/Al).',
        'Bodentemperaturen unter 15 °C reduzieren die Phosphoraufnahme drastisch.',
        'Übermäßige Anreicherung von Zink oder Eisen im Antagonismus zum Phosphor.',
      ],
      correctiveOrganic: [
        'Kalzinierte Knochenasche oder Rohphosphat (Arad/Gafsa).',
        'WPA (Water Soluble Phosphoric Acid - KNF aus in Essig gebrannten Knochen).',
        'Extrakt aus Holzasche oder Fischmehl.',
      ],
      correctiveMineral: [
        'MAP (Monoammoniumphosphat) oder MKP (Monokaliumphosphat).',
        'Einfach- / Dreifachsuperphosphat in der Fertigation.',
      ],
      solubilizingMicroorganisms: [
        'Bacillus megaterium var. phosphaticum (aktiver Löser von fixiertem P)',
        'Pseudomonas fluorescens & Aspergillus niger',
        'Arbuskuläre Mykorrhizapilze (Rhizophagus irregularis) - Hyphenverlängerung',
      ],
      companionPlants: [
        'Buchweizen (Fagopyrum esculentum) - sondert organische Säuren ab, die Phosphor freisetzen',
        'Weiße Lupine (Lupinus albus) - proteoidartige, P-akkumulierende Wurzeln',
        'Zwergsonnenblume (Helianthus annuus) - tiefe Erschließung des Bodenprofils',
      ],
      astrayaTips:
        'P ist in den ersten 3 Blütewochen entscheidend für die Differenzierung der Blütenknospen. Überwachen Sie in kalten Jahreszeiten die Temperatur des Wurzelraums.',
      figures: [
        {
          figureNumber: 'Figura 5',
          title: 'Verlauf der Phosphor-Symptome',
          description:
            'Progression der Phosphormangel-Symptome vom jüngsten Blatt (links) zum ältesten Blatt (rechts).',
        },
        {
          figureNumber: 'Figura 6',
          title: 'Schwerer Mangel und Verzwergung der Pflanze',
          description:
            'Kritischer Phosphormangel mit Verkümmerung der Wurzeln und verzwergten Pflanzen.',
        },
        {
          figureNumber: 'Figura 7',
          title: 'Matte dunkelgrüne Färbung',
          description:
            'Blätter mit mattem dunkelgrünem Ton, ein häufiges Symptom der Zuckeranreicherung bei Phosphormangel.',
        },
        {
          figureNumber: 'Figura 8',
          title: 'Violettfärbung von Stängeln und Blattstielen',
          description:
            'Intensive purpurne Pigmentierung an Stängeln und Blattstielen durch Anthocyan-Anreicherung infolge Phosphormangels.',
        },
      ],
    },
    'def-k': {
      element: 'Kalium',
      symptoms: [
        'Verbrannte und nekrotische Ränder und Spitzen der alten Blätter (Symptom der „randverbrannten Blätter“).',
        'Mosaik aus gelben und nekrotischen Flecken an den gezähnten Blatträndern.',
        'Nach oben eingerollte Blätter, schwache und brüchige Stängel.',
        'Erhöhte Anfälligkeit für Schädlinge sowie für Wasser- und Hitzestress.',
      ],
      causes: [
        'Überschüsse an Calcium (Ca) oder Magnesium (Mg), die mit dem Kalium um die Wurzeln konkurrieren.',
        'Anreicherung löslicher Salze im Substrat (hoher EC-Wert im Wurzelraum).',
        'Sehr sandige Substrate mit geringer Kationenretention (niedrige CTC/KAK).',
      ],
      correctiveOrganic: [
        'Reine, verdünnte Holzasche (reichhaltige Quelle bioverfügbaren Kaliums).',
        'Fermentierter Extrakt aus Bananenschalen oder Zuckerrohrvinasse.',
        'Organisches Kaliumsulfat (K-Mag / Langbeinit).',
      ],
      correctiveMineral: [
        'Kaliumnitrat (KNO3) oder Kaliumsulfat (K2SO4).',
        'Gereinigtes Kaliumchlorid (Vorsicht wegen Versalzung empfohlen).',
      ],
      solubilizingMicroorganisms: [
        'Bacillus mucilaginosus (Kaliumlöser aus Silikatmineralien)',
        'Frateuria aurentia (K-mobilisierendes Bakterium im Ton-Humus-Komplex)',
        'Paenibacillus glucanolyticus',
      ],
      companionPlants: [
        'Beinwell (Symphytum officinale) - dynamischer Akkumulator von Kalium und Mineralien',
        'Löwenzahn (Taraxacum officinale) - tiefe Pfahlwurzel als Kaliumpumpe',
        'Zitronengras / Lemongras - Begrünungsbiomasse, sehr reich an Silizium und Kalium',
      ],
      astrayaTips:
        'In der Phase des Frucht- und Blütenwachstums (Wochen 4-7 der Blüte) verdoppelt sich der K-Bedarf. Halten Sie in dieser Phase das Verhältnis K:N nahe 2:1.',
      figures: [
        {
          figureNumber: 'Figura 9',
          title: 'Verlauf von Chlorose und Randnekrose',
          description:
            'Entwicklung von Chlorose und Nekrose an den gezähnten Blatträndern, fortschreitend von jungen zu alten Blättern.',
        },
        {
          figureNumber: 'Figura 10',
          title: 'Blattbüschel mit verbrannten Rändern',
          description:
            'Symptome von Chlorose und schwerer Nekrose an den Rändern der Blattbüschel durch Kaliummangel.',
        },
      ],
    },
    'def-ca': {
      element: 'Calcium',
      symptoms: [
        'Kleine rostbraune oder goldene nekrotische Flecken auf jungen Blättern.',
        'Deformation der neuen Triebe (hakenförmige oder runzelige Blätter).',
        'Verbrannte, verkümmerte Wurzelspitzen mit Fäulnis.',
        'Schwache Stängel und brüchige Zellstruktur.',
      ],
      causes: [
        'Geringe Transpiration durch sehr hohe relative Luftfeuchtigkeit (RLF) oder fehlende Luftzirkulation.',
        'Verwendung von Umkehrosmosewasser (RO) ohne vorherige Ca/Mg-Supplementierung.',
        'Überschuss an Kalium oder Natrium im Antagonismus zur Calciumaufnahme.',
      ],
      correctiveOrganic: [
        'WCA (Water Soluble Calcium, KNF - geröstete, in Apfelessig gelöste Eierschale) 1:1000.',
        'Dolomitkalk oder Kalzit im Boden.',
        'Agrargips (Calciumsulfat).',
      ],
      correctiveMineral: [
        'Handelsübliches Calciumnitrat (15 % N, 19 % Ca) in der Fertigation (1,0 g/l).',
        'Calciumchlorid zur Notfall-Blattspritzung (0,5 g/l).',
      ],
      solubilizingMicroorganisms: [
        'Bacillus licheniformis (Chelatbildung und Freisetzung von Calciumcarbonat)',
        'Lactobacillus plantarum (LAB - Milchsäure, die Kalksteinmehle löst)',
        'Trichoderma harzianum (Stimulator der Zellfestigkeit und der Ca-Aufnahme)',
      ],
      companionPlants: [
        'Basilikum (Ocimum basilicum) - stimuliert den Strukturaufbau und die Calcium-Mikrobiota',
        'Schafgarbe (Achillea millefolium) - Akkumulator von Calcium und Sekundärmineralien',
        'Ageratum / Mentha - Schutz des Blätterdachs und tiefe Ca-Rezirkulation',
      ],
      astrayaTips:
        'Calcium wird über das Xylem transportiert und durch die Transpiration bewegt. Ist der VPD sehr niedrig (< 0,4 kPa), stellt die Pflanze die Transpiration ein und zeigt Calciummangel, obwohl Ca im Boden vorhanden ist!',
      figures: [
        {
          figureNumber: 'Figura 11',
          title: 'Nekrotische Punktierung an jungen Blättern',
          description:
            'Junge Blätter mit gelbbraunen Nekrosepunkten und marginaler Krümmung.',
        },
        {
          figureNumber: 'Figura 12',
          title: 'Schwere Deformation der oberen Blätter',
          description:
            'Blätter mit verdrehten Formen und Hakenenden nach längerem Calciummangel.',
        },
        {
          figureNumber: 'Figura 13',
          title: 'Ausgedehnte Nekrose in der Blattspreite',
          description:
            'Fortschreiten der gelblichen nekrotischen Flecken, die fast das gesamte Blattgewebe bedecken.',
        },
      ],
    },
    'def-mg': {
      element: 'Magnesium',
      symptoms: [
        'Deutliche Interkostalchlorose an den unteren Blättern (die Blattadern bleiben grün, der Raum dazwischen wird gelb).',
        'Fortschreiten zu braunen/rotbraunen nekrotischen Flecken und nach oben gekrümmten Rändern.',
        'Abnahme der Photosynthese (Mg ist das Zentralatom des Chlorophyllmoleküls).',
      ],
      causes: [
        'Boden-pH unter 6,0 oder Kokos-/Inertsubstrat unter 5,5.',
        'Calcium- oder Kaliumüberschuss in der Düngung (kationische Konkurrenz).',
        'Kalte Wurzeltemperaturen erschweren die Aufnahme.',
      ],
      correctiveOrganic: [
        'Bittersalz (Magnesiumsulfat) über das Blatt (2-5 g pro Liter warmes Wasser).',
        'Dolomitkalk (liefert ausgewogen Ca und Mg).',
        'Asche-Biofertilisat mit Magnesiumgestein.',
      ],
      correctiveMineral: [
        'Magnesiumsulfat-Heptahydrat (Bittersalz) 2 g/l über das Blatt oder 1 g/l in den Boden.',
        'Magnesiumnitrat über Fertigation in der Vegetationsphase.',
      ],
      solubilizingMicroorganisms: [
        'Bacillus subtilis (Lösung magnesiumhaltiger Silikate)',
        'Pseudomonas putida (Freisetzung von Mg2+-Ionen im Rhizoplan)',
        'Nützliche Bodenaktinomyceten (Streptomyces spp.)',
      ],
      companionPlants: [
        'Große Brennnessel (Urtica dioica) - Bioakkumulator von Eisen, Stickstoff und Magnesium',
        'Kamille (Matricaria chamomilla) - zieht Bestäuber an und akkumuliert Magnesium',
        'Salbei (Salvia officinalis) - Biostimulans und Sammler von Sekundärmineralien',
      ],
      astrayaTips:
        'Blattspritzungen mit Bittersalz vor dem Einschalten der Lampen ermöglichen eine schnelle Magnesium-Erholung innerhalb von 24 bis 48 Stunden.',
      figures: [
        {
          figureNumber: 'Figura 14',
          title: 'Frühsymptom an alten Blättern',
          description:
            'Erste Anzeichen an alten Blättern mit gelbgrüner Interkostalchlorose.',
        },
        {
          figureNumber: 'Figura 15',
          title: 'Zwischenstadium und Zellzerfall',
          description:
            'Kollaps des chlorotischen Gewebes mit Übergang zu Nekrose und abgestorbenen braunen Flecken zwischen den Blattadern.',
        },
        {
          figureNumber: 'Figura 16',
          title: 'Fortgeschrittene Phase und wellige Ränder',
          description:
            'Fortschreiten der Chlorose bis zum Zelltod mit typischer Runzelung und Einrollung der Ränder.',
        },
        {
          figureNumber: 'Figura 17',
          title: 'Späte Nekrose im unteren Drittel',
          description:
            'Späte Entwicklung mit vollständig nekrotischen, vertrockneten und verdrehten unteren Blättern.',
        },
      ],
    },
    'def-s': {
      element: 'Schwefel',
      symptoms: [
        'Gleichmäßige Gelbfärbung an jungen und neuen Blättern, ähnlich wie bei Stickstoff, jedoch im oberen Pflanzenbereich.',
        'Die Unterseite junger Blätter kann eine purpurne oder rosa Färbung aufweisen.',
        'Beeinträchtigte Entwicklung von Terpenen und aromatischen Verbindungen.',
      ],
      causes: [
        'Alkalischer pH-Wert des Bodens.',
        'Starke Auswaschung von Sulfaten.',
      ],
      correctiveOrganic: [
        'Agrargips (Calciumsulfat).',
        'JADAM JS (Jadam-Schwefel) in den empfohlenen Verdünnungsdosierungen.',
        'Bittersalz (Magnesiumsulfat).',
      ],
      correctiveMineral: [
        'Kaliumsulfat oder Magnesiumsulfat (Bittersalz) 1 g/l in der Fertigation.',
        'Landwirtschaftlicher Elementarschwefel zur schrittweisen pH-Korrektur und als S-Quelle.',
      ],
      solubilizingMicroorganisms: [
        'Thiobacillus ferrooxidans & Thiobacillus thiooxidans (Schwefel oxidierende Bakterien)',
        'Bacillus megaterium',
        'Aspergillus spp.',
      ],
      companionPlants: [
        'Knoblauch / Schnittlauch (Allium spp.) - natürliche Quelle aromatischer Schwefelverbindungen',
        'Schwarzer Senf (Brassica nigra) - Biofumigation und Sulfatanreicherung',
        'Kapuzinerkresse (Tropaeolum majus) - Repellent und Schwefelakkumulator',
      ],
      astrayaTips:
        'Schwefel ist ein essenzieller Vorläufer in der Biosynthese von Thiolen und flüchtigen Schwefelverbindungen, die für die markanten „skunky“- und zitrusartigen Aromen verantwortlich sind.',
      figures: [
        {
          figureNumber: 'Figura 18',
          title: 'Apikale Chlorose an jungen Blättern',
          description:
            'Neue Blätter im oberen Bereich mit gleichmäßiger gelber Chlorose durch Schwefelmangel.',
        },
        {
          figureNumber: 'Figura 19',
          title: 'Verholzung und Versteifung des Stängels',
          description:
            'Erhöhte Steifheit und verholztes Aussehen des Stängels durch Schwefelmangel.',
        },
        {
          figureNumber: 'Figura 20',
          title: 'Chlorose an oberen Blättern und Trieben',
          description:
            'Gelbfärbung der oberen Blätter (links) und Blässe der meristematischen Triebe (rechts).',
        },
        {
          figureNumber: 'Figura 21',
          title: 'Verlauf der Chlorose durch Schwefel',
          description:
            'Entwicklung der Chlorose von mäßig (links) bis schwer (rechts) durch Schwefelmangel.',
        },
      ],
    },
    'def-b': {
      element: 'Bor',
      symptoms: [
        'Nekrose des apikalen Meristems (Absterben des Haupttriebs).',
        'Deformierte, verdrehte junge Blätter mit dunkelbrauner/bronzefarbener Färbung an den Spitzen.',
        'Hohle, brüchige Stängel und Blattstiele mit oberflächlichen Rissen.',
        'Kurze, dicke Wurzeln mit geschwollenen Spitzen.',
      ],
      causes: [
        'Boden-pH über 7,0 oder unter 5,0.',
        'Anhaltende Trockenheit im Boden, die den Massenfluss von Bor verringert.',
        'Stark ausgewaschene Substrate mit geringem Gehalt an organischer Substanz.',
      ],
      correctiveOrganic: [
        'Anwendung landwirtschaftlicher Borsäure in Präzisionsdosierungen über das Blatt (0,1 g/l).',
        'Gereifter organischer Kompost (organische Substanz ist das wichtigste Borreservoir).',
        'Meeresalgenextrakt (Ascophyllum nodosum).',
      ],
      correctiveMineral: [
        'Borsäure (H3BO3) oder Dinatriumoctaborat (Solubor) über das Blatt (0,05 g bis 0,1 g pro Liter).',
        'Borax / Natriumtetraborat im Boden (0,5 kg/ha B-Äquivalent).',
      ],
      solubilizingMicroorganisms: [
        'Bacillus pumilus (Mobilisierer mineralischer Borate)',
        'Pseudomonas fluorescens (Produzent von Siderophoren und organischen Borkomplexen)',
        'Glomus mosseae (Mykorrhiza, die die Mikronährstoffaufnahme erleichtert)',
      ],
      companionPlants: [
        'Sonnenblume (Helianthus annuus) - wichtiger ökologischer Indikator und Bioakkumulator von Bor',
        'Inkarnatklee (Trifolium incarnatum) - Boratkreislauf in der obersten Bodenschicht',
        'Weißer Senf (Sinapis alba) - Bodenlockerer und Freisetzer von Mikronährstoffen',
      ],
      astrayaTips:
        'Bor hat eine sehr enge Spanne zwischen Mangel und Toxizität. Überschreiten Sie niemals 0,5 ppm B in der Nährlösung!',
      figures: [
        {
          figureNumber: 'Figura 22',
          title: 'Interkostalchlorose und apikale Verdickung',
          description:
            'Symptome an den jungen oberen Blättern, darunter Interkostalchlorose, Verdickung und Flecken.',
        },
        {
          figureNumber: 'Figura 23',
          title: 'Schwere Verformung der jungen Blätter',
          description:
            'Ausgeprägte Verdrehung und spiraliges Einrollen der apikalen Triebe durch Kollaps des Meristems.',
        },
      ],
    },
    'def-cu': {
      element: 'Kupfer',
      symptoms: [
        'Ausgeprägtes Einrollen der Ränder junger Blätter nach unten/hinten (Krallenform).',
        'Verlust der Turgidität und Welken junger Triebe trotz feuchten Bodens.',
        'Junge Blätter mit dunkelgrün-bläulichem Ton und Nekrose an den gezähnten Spitzen.',
        'Verzögerte Blüte sowie schwache, flexible Zweige ohne Festigkeit.',
      ],
      causes: [
        'Sehr hoher Substrat-pH (> 7,0) oder starker Überschuss an nicht verrotteter organischer Substanz (komplexiert Cu).',
        'Überschuss an Stickstoff, Phosphor oder Zink, der die Kupferaufnahme blockiert.',
      ],
      correctiveOrganic: [
        'Kupfersulfat in homöopathischer Dosierung (0,05 g/l).',
        'Bordeauxbrühe (für fungizide Wirkung und Blatt-Mikronährstoffsupplementierung).',
        'Biofertilisat, angereichert mit Basaltgesteinsmehl.',
      ],
      correctiveMineral: [
        'Chelatiertes Kupfersulfat (Cu-EDTA) 0,05 g pro Liter über das Blatt.',
        'Kupfersulfat-Pentahydrat (CuSO4·5H2O) in der Fertigation (0,02 bis 0,05 ppm Cu).',
      ],
      solubilizingMicroorganisms: [
        'Trichoderma harzianum (biologische Lösung kupferhaltiger Mineralien)',
        'Bacillus megaterium',
        'Aspergillus niger (Freisetzer organischer Chelatsäuren)',
      ],
      companionPlants: [
        'Brauner Senf (Brassica juncea) - ausgezeichneter Akkumulator und Rezirkulator von Kupfer',
        'Phacelia (Phacelia tanacetifolia) - zieht Bestäuber an und mobilisiert Mikronährstoffe',
        'Koriander (Coriandrum sativum) - Bioakkumulator und Schädlingsrepellent',
      ],
      astrayaTips:
        'Kupfer ist ein essenzieller Bestandteil der Plastocyanine in der Elektronentransportkette der Photosynthese und aktiviert Enzyme der Stängellignifizierung.',
      figures: [
        {
          figureNumber: 'Figura 26',
          title: 'Verlauf von Chlorose zu Nekrose',
          description:
            'Chlorosemosaik, das sich bei Kupfermangel zu nekrotischen Flecken auf jungen bis alten Blättern entwickelt.',
        },
        {
          figureNumber: 'Figura 27',
          title: 'Gekrümmte blaugrüne Blätter',
          description:
            'Blätter mit mattem blaugrünem Ton und beginnendem Längseinrollen an den Rändern.',
        },
        {
          figureNumber: 'Figura 28',
          title: 'Welken und Absinken der Blätter',
          description:
            'Absinkende und welkende Blätter durch Verlust der mechanischen Stütze und Schwäche der Ligninstruktur.',
        },
      ],
    },
    'def-mn': {
      element: 'Mangan',
      symptoms: [
        'Interkostalchlorose an jungen Blättern mit kleinen, gesprenkelten grau/braunen Nekrosepunkten.',
        'Anders als bei Eisen bleiben auch die kleineren Blattadern grün, wodurch ein Schachbrett-/Mosaikmuster entsteht.',
        'Die nekrotische Entwicklung schreitet über das Blatt fort und verursacht Verbrennungen der Ränder.',
      ],
      causes: [
        'Erhöhter Boden-pH (> 6,8).',
        'Übermäßig belüfteter und trockener Boden (fördert die Oxidation von Mn2+ zu unlöslichen Mn4+-Formen).',
        'Überschuss an löslichem Eisen mit kompetitivem Antagonismus.',
      ],
      correctiveOrganic: [
        'Mangansulfat über Fertigation (1-2 ppm Mn).',
        'Basaltgesteinsmehl mit feiner Körnung.',
        'Bokashi mit Fulvosäuren.',
      ],
      correctiveMineral: [
        'Mangansulfat (MnSO4·H2O) oder Mn-EDTA-Chelat (1 bis 2 ppm Mn in der Lösung).',
        'Blattspritzung mit Mn-EDTA 0,1 g/l zu Beginn der Symptome.',
      ],
      solubilizingMicroorganisms: [
        'Bacillus circulans (mikrobieller Reduzierer unlöslichen Mangans)',
        'Rhizobium leguminosarum',
        'Pseudomonas putida (Mobilisierer von Mn2+-Ionen)',
      ],
      companionPlants: [
        'Beinwell (Symphytum officinale) - tiefgehender Mangan-Rezirkulator',
        'Löwenzahn - Pumpe für Mikronährstoffe aus dem Unterboden',
        'Spinat (Spinacia oleracea) - Blattakkumulator von Mangan und Eisen',
      ],
      astrayaTips:
        'Mangan ist an der Photolyse des Wassers in der Photosynthese (Photosystem II) beteiligt. Ein Mangel zerstört die photosynthetische Effizienz rasch.',
      figures: [
        {
          figureNumber: 'Figura 33',
          title: 'Fortschreitende Entwicklung bei Mangan',
          description:
            'Jüngere Blätter mit dunkelgrünen Rändern und gepunkteter Interkostalchlorose im Zuge der Alterung.',
        },
        {
          figureNumber: 'Figura 34',
          title: 'Symptome vom jungen zum alten Blatt',
          description:
            'Abstufung des Manganmangels vom jungen Blatt (links) bis zum älteren Blatt mit bronzefarbener nekrotischer Sprenkelung (rechts).',
        },
      ],
    },
    'def-zn': {
      element: 'Zink',
      symptoms: [
        'Klassisches Symptom der „Rosette“ oder „Miniaturblätter“ durch starke Verkürzung der Internodien an den neuen Trieben.',
        'Intensive Interkostalchlorose an jungen Blättern mit verdrehten und gelblichen Spitzen.',
        'Junge Blätter wachsen schmal, dünn und um 90 Grad zur Seite gedreht.',
      ],
      causes: [
        'Alkalischer Boden-pH (> 7,0).',
        'Massive Phosphor-(P-)Überschüsse in der Blütedüngung (fällen Zink als unlösliches Zinkphosphat).',
        'Kalte, staunasse Böden ohne aktive Mikrobiologie.',
      ],
      correctiveOrganic: [
        'Zinksulfat über das Blatt (0,2 g/l) oder Zinkchelat.',
        'Fulvischer Extrakt mit chelatierten Mineralien.',
        'Biofertilisat aus Schaf- oder Ziegenmist.',
      ],
      correctiveMineral: [
        'Zinksulfat-Monohydrat (ZnSO4·H2O) oder Zn-EDTA-Chelat (0,1 g bis 0,2 g pro Liter über das Blatt).',
        'Chelatiertes Zink über Fertigation (0,5 bis 1,0 ppm Zn).',
      ],
      solubilizingMicroorganisms: [
        'Bacillus aryabhattai (Zinklöser in tropischen Böden)',
        'Pseudomonas fluorescens (Lösung von ZnO und ZnCO3)',
        'Rhizobium phaseoli',
      ],
      companionPlants: [
        'Buchweizen (Fagopyrum esculentum) - sondert zinkchelatierende Verbindungen ab',
        'Inkarnatklee - mikronährstoffreiche Begrünung',
        'Roggen (Secale cereale) - tiefe faserige Wurzeln als Zinkextraktoren',
      ],
      astrayaTips:
        'Zink ist entscheidend für die Synthese von Tryptophan, der Vorstufe des Hormons Auxin (vegetatives Wachstum und Zellstreckung).',
      figures: [
        {
          figureNumber: 'Figura 39',
          title: 'Interkostalchlorose an jungen Blättern',
          description:
            'Deutliche Interkostalchlorose an den jungen Blättern im oberen Kronendach durch Zinkmangel.',
        },
        {
          figureNumber: 'Figura 40',
          title: 'Schmale, bandförmige Blätter (Strappy Leaves)',
          description:
            'Extrem dünne, zugespitzte und deformierte junge Blätter durch Auxinmangel infolge Zinkmangels.',
        },
        {
          figureNumber: 'Figura 41',
          title: 'Apikales Symptom bei immobilem Nährstoff',
          description:
            'Da Zink immobil ist, treten die primären Symptome ausschließlich im oberen Bereich und an den apikalen Meristemen auf.',
        },
        {
          figureNumber: 'Figura 42',
          title: 'Interkostalchlorose in der basalen Hälfte',
          description:
            'Interkostalchlorose, die in der unteren/basalen Hälfte der Blattspreite beginnt.',
        },
      ],
    },
    'def-fe': {
      element: 'Eisen',
      symptoms: [
        'Intensive, blasse Interkostalchlorose an Trieben und jungen Blättern.',
        'Die jungen Blätter erscheinen fast weiß mit Zitronengelb, während die Hauptadern grün bleiben.',
        'Alte Blätter behalten ihr normales Aussehen.',
      ],
      causes: [
        'Hoher pH im Substrat (> 6,8 bei Kokos/Hydro oder > 7,2 im Boden).',
        'Staunasse Wurzeln durch Überbewässerung (Sauerstoffmangel im Wurzelraum).',
        'Phosphorüberschuss, der das Eisen blockiert.',
      ],
      correctiveOrganic: [
        'Fermentiertes Bokashi, reich an natürlichen Chelatoren.',
        'Organischer Kompost, reich an Fulvo- und Huminsäuren zur Fe-Mobilisierung.',
      ],
      correctiveMineral: [
        'Eisenchelat Fe-EDDHA (für Böden mit pH > 6,5) oder Fe-DTPA / Fe-EDTA.',
        'Eisensulfat (FeSO4) über Fertigation in sauren Böden.',
      ],
      solubilizingMicroorganisms: [
        'Pseudomonas putida & Pseudomonas fluorescens (Produzenten von Fe3+-Siderophoren)',
        'Bacillus subtilis',
        'Trichoderma harzianum (erhöht die Eisenreduktase in den Wurzeln)',
      ],
      companionPlants: [
        'Große Brennnessel (Urtica dioica) - außergewöhnlicher Bioakkumulator bioverfügbaren Eisens',
        'Petersilie (Petroselinum crispum) - Eisenakkumulator und Anlocker nützlicher Insekten',
        'Löwenzahn - Mobilisierung des nativ im Boden gebundenen Eisens',
      ],
      astrayaTips:
        'Eisenmangel ist fast immer ein Symptom eines falsch eingestellten pH-Werts oder von Staunässe im Wurzelraum und selten ein tatsächlicher Mangel des Elements im Boden.',
      figures: [
        {
          figureNumber: 'Figura 31',
          title: 'Apikale zitronengelbe Chlorose mit grünen Blattadern',
          description:
            'Junge apikale Blätter, extrem gelb, mit intakten dünnen grünen Blattadern durch Eisenimmobilität.',
        },
      ],
    },
  },
  pests: {
    'pest-spidermite': {
      name: 'Rote Spinnmilbe / Gemeine Spinnmilbe (Spider Mites)',
      identification:
        'Kleine Spinnentiere (0,5 mm), gelb, rötlich oder schwarz, die sich auf der Blattunterseite (abaxial) aufhalten. Bei starkem Befall spinnen sie feine Netze um Blütenstände (Buds) und Blätter.',
      damageSymptoms: [
        'Kleine weiße oder gelbliche Punkte (Silberglanz) auf der Blattoberseite.',
        'Verlust von Chlorophyll, Gelbfärbung und beschleunigtes Austrocknen der Blätter.',
        'Netze, die die Blüten bedecken und den Ertrag sowie die Qualität der ätherischen Öle drastisch mindern.',
      ],
      prevention: [
        'Relative Luftfeuchtigkeit in der Vegetationsphase über 55-60 % halten (Spinnmilben meiden hohe Feuchtigkeit).',
        'Gründliche Reinigung des Raums mit 70 %igem Alkohol oder Wasserstoffperoxid zwischen den Zyklen.',
        'HEPA-Filter an den Lufteinlässen des Anbaus installieren.',
      ],
      biologicalControl: [
        'Freisetzung von Raubmilben: Phytoseiulus persimilis (sehr gefräßig gegenüber T. urticae) und Neoseiulus californicus (widerstandsfähig gegen höhere Temperaturen und niedrige Luftfeuchtigkeit).',
        'Anwendungen des entomopathogenen Pilzes Beauveria bassiana.',
      ],
      organicRecipes: [
        'JWA (Jadam Wetting Agent / Kaliumseife) mit 10-15 ml/l + JHS (Chili-/Knoblauchextrakt KNF/Jadam) 5 ml/l in vollständiger Blattspritzung.',
        'Mit Kaliumseife emulgiertes Neemöl (5 ml/l Öl + 3 ml/l Seife), abends oder bei ausgeschaltetem Licht ausgebracht.',
      ],
      chemicalOrMineral: [
        'Netzschwefel (Jadam JS) - ACHTUNG: Niemals Schwefel bis 14 Tage nach einer Ölanwendung ausbringen, um Blattverbrennungen zu vermeiden.',
      ],
    },
    'pest-thrips': {
      name: 'Thrips / Fransenflügler (Tripes)',
      identification:
        'Schlanke, winzige Insekten (1-1,5 mm) von gelber, brauner oder schwarzer Farbe, die sich schnell bewegen. Sie hinterlassen kleine Tropfen schwarzer und silbriger Kotreste.',
      damageSymptoms: [
        'Silbrige Flecken mit metallischem/feuchtem Aussehen auf den Blättern.',
        'Kleine schwarze Punkte (Insektenkot), über die silbrigen Flecken verteilt.',
        'Deformation neuer Triebe und Übertragung von Pflanzenviren.',
      ],
      prevention: [
        'Anbringen blauer und gelber Klebefallen im Kronendach der Pflanzen zur Früherkennung.',
        'Vorbeugende Behandlung des Bodens/Substrats mit nützlichen Nematoden.',
      ],
      biologicalControl: [
        'Raubmilben: Amblyseius swirskii oder Neoseiulus cucumeris.',
        'Raubwanzen: Orius insidiosus.',
        'Entomopathogene Pilze: Beauveria bassiana und Metarhizium anisopliae.',
      ],
      organicRecipes: [
        'Blattspritzung aus Neemextrakt + natürlichem Pyrethrumextrakt.',
        'Rizinusextrakt und JWA (Kaliumseife 10 ml/l).',
      ],
      chemicalOrMineral: [
        'Spinosad (organisches bakterielles Derivat, für den ökologischen Landbau zugelassen).',
      ],
    },
    'pest-fungus-gnats': {
      name: 'Trauermücke / Fungus Gnats',
      identification:
        'Kleine schwarze Mücken (2-4 mm), die ungeordnet über die Boden-/Substratoberfläche fliegen. Die Larven sind durchscheinende Würmer mit schwarzem Kopf, die im feuchten Boden leben.',
      damageSymptoms: [
        'Die Larven fressen Wurzelhaare und junge Wurzeln und schwächen so die Nährstoffaufnahme.',
        'Sie öffnen Eintrittspforten für bodenbürtige pathogene Pilze (Pythium, Fusarium, Phytophthora).',
        'Vergilbte Pflanze mit stagnierendem Wachstum.',
      ],
      prevention: [
        'Überbewässerung vermeiden! Lassen Sie die obersten 2-3 cm des Substrats zwischen den Bewässerungen abtrocknen.',
        'Mulchdecke (Mulching) oder eine 2 cm dicke Schicht aus Quarzsand/Perlit auf der Oberfläche der Töpfe.',
      ],
      biologicalControl: [
        'Bacillus thuringiensis israelensis (BTI), über die Bewässerung ausgebracht (tötet die Mückenlarven selektiv).',
        'Entomopathogene Nematoden: Steinernema feltiae.',
        'Raubmilben im Boden: Stratiolaelaps scimitus (Hypoaspis miles).',
      ],
      organicRecipes: [
        'Bewässerung mit verdünntem Tabak-/Neemextrakt oder Kieselgur, auf die trockene Oberfläche des Topfes gestäubt.',
      ],
      chemicalOrMineral: [
        'Gelbe Klebefallen in Topfhöhe zum Abfangen der Adulten.',
      ],
    },
    'pest-botrytis': {
      name: 'Grauschimmel / Knospenfäule (Botrytis)',
      identification:
        'Destruktiver Pilz, der die dichtesten Blütenknospen (Buds) in der fortgeschrittenen Blüte befällt. Er beginnt im Inneren des Bud-Stängels und breitet sich nach außen aus.',
      damageSymptoms: [
        'Plötzliches Öffnen und Austrocknen der kleinen Zuckerblätter, die aus dem Bud austreten.',
        'Das Innere des Buds wird braun, grau, weich und von einem samtigen grau/weißlichen Schimmel bedeckt.',
        'Schnelle Zerstörung des Blütenstands innerhalb weniger Stunden bei hoher Luftfeuchtigkeit.',
      ],
      prevention: [
        'Relative Luftfeuchtigkeit in der fortgeschrittenen Blüte unter 45-50 % und VPD zwischen 1,2 und 1,5 kPa halten.',
        'Für eine starke interne Luftzirkulation mit Schwenkventilatoren sorgen (ohne einen direkten Windtunnel zu erzeugen).',
        'Strategisches Entblättern zur Verbesserung von Licht- und Lufteintritt in das Kronendach.',
      ],
      biologicalControl: [
        'Vorbeugende Spritzung in der Vegetationsphase/frühen Blüte mit Trichoderma harzianum und Bacillus subtilis.',
      ],
      organicRecipes: [
        'Gesteinsmehle, Kaliumsilikat und bioangereicherte Bewässerungen zur Verdickung der pflanzlichen Zellwand.',
      ],
      chemicalOrMineral: [
        'Sofortige chirurgische Entfernung der befallenen Blüten durch Abschneiden 5 cm unterhalb des infizierten Bereichs mit einer in Alkohol sterilisierten Schere.',
      ],
    },
    'pest-oidio': {
      name: 'Echter Mehltau (Powdery Mildew)',
      identification:
        'Weiße, talkum- oder kreidepuderartige Flecken auf der Blattoberseite, die wie aufgestäubtes Mehl aussehen.',
      damageSymptoms: [
        'Weißer, mehliger Belag, der die Photosynthese verhindert.',
        'Blattdeformation, Gelbfärbung und Nekrose.',
        'Vollständige Kontamination der Ernte, wenn die Buds befallen werden.',
      ],
      prevention: [
        'Strenge Kontrolle der relativen Luftfeuchtigkeit (Spitzenwerte über 70 % im Dunkeln vermeiden).',
        'Einsatz von UV-C-Lampen oder kontrollierten Ozon-Generatoren im Luftauslass.',
      ],
      biologicalControl: [
        'Bacillus amyloliquefaciens oder Bacillus subtilis vorbeugend gespritzt.',
      ],
      organicRecipes: [
        'Rohmilch / Molke in Wasser verdünnt (1:9), unter direkter Sonneneinstrahlung gespritzt (das Licht reagiert mit Proteinen und erzeugt natives Peroxid).',
        'Kaliumbicarbonat oder Natriumbicarbonat (5 g/l) + Kaliumseife.',
      ],
      chemicalOrMineral: [
        'JADAM JS (Jadam-Schwefel) 1-2 ml/l in der Vegetationsphase.',
      ],
    },
    'pest-cigarrinho': {
      name: 'Maiszikade (Vektor von Viruserkrankungen)',
      identification:
        'Kleine Hemipteren (3 mm) von strohgelber Farbe mit zwei dunklen Flecken am Kopf, die bei der geringsten Berührung des Kronendachs springen und rasch fliegen.',
      damageSymptoms: [
        'Saugen von Assimilaten, was die Stängel schwächt und die Vitalität senkt.',
        'Kritischer Vektor für Mollicutes (Blasse und Rote Verzwergung) und Mosaikviren (Rayado Fino).',
        'Blätter mit rötlichen/purpurnen Streifen und deformierter Superverzweigung im oberen Bereich.',
      ],
      prevention: [
        'Beseitigung von Zwischenwirten und von freiwilligem Mais in der Nähe des Anbaus.',
        'Feinmaschige Anti-Blattlaus-Netze (50 mesh) an den Lufteinlässen von Gewächshäusern und Gebläsen.',
        'Gelbe Klebefallen in Höhe der Triebe zur kontinuierlichen Überwachung.',
      ],
      biologicalControl: [
        'Entomopathogener Pilz Cordyceps fumosorosea (Isaria fumosorosea) oder Beauveria bassiana.',
        'Raubwanzen der Familie Anthocoridae und Florfliegen (Chrysoperla externa).',
      ],
      organicRecipes: [
        'JWA (Kaliumseife 15 ml/l) + Neem-/natürlicher Pyrethrumextrakt in Spritzungen in der Dämmerung.',
        'JHS (Jadam Herbal Solution), konzentriert aus Knoblauch und Chilischote.',
      ],
      chemicalOrMineral: [
        'Konzentrierter Azadirachtin-Extrakt (1,2 %) und Blattsilizium zur Härtung der Kutikula.',
      ],
    },
    'pest-mosca-branca': {
      name: 'Weiße Fliege',
      identification:
        'Kleine fliegende Insekten (1 mm), deren Flügel von einem weißen, mehligen Wachs bedeckt sind und die bei Erschütterung der Pflanzen in Wolken auffliegen. Die Nymphen sitzen fest auf der Blattunterseite.',
      damageSymptoms: [
        'Blattchlorose, Gelbfärbung und vorzeitiger Blattfall durch kontinuierliches Saugen von Pflanzensaft.',
        'Absonderung zuckerhaltigen Honigtaus („honeydew“), der das Auftreten des schwarzen Rußtaupilzes (Fumagina) begünstigt.',
        'Gefährliche Übertragung phytopathogener Geminiviren und Carlaviren.',
      ],
      prevention: [
        'Physikalische Barrieren mit feinem Gazenetz und gelbe Klebefallen.',
        'Häufige Kontrolle der Blattunterseite (abaxial) der Blätter im unteren und mittleren Drittel.',
      ],
      biologicalControl: [
        'Parasitoide Erzwespen: Encarsia formosa oder Eretmocerus eremicus.',
        'Entomopathogene Pilze: Beauveria bassiana und Lecanicillium lecanii.',
      ],
      organicRecipes: [
        'Anwendung von Kaliumseife (JWA 15 ml/l) in Kombination mit emulgiertem Rizinusöl.',
        'Holzascheextrakt zur Veränderung des Blatt-pH-Werts und zur Repellenz.',
      ],
      chemicalOrMineral: [
        'Mikronisierte Kieselgur über das Blatt (10 g/l), die eine abrasiv wirkende mechanische Barriere bildet.',
      ],
    },
    'pest-acaro-branco': {
      name: 'Weiße Milbe / Broad Mite',
      identification:
        'Mikroskopische Milben (< 0,2 mm), mit bloßem Auge völlig unsichtbar, transparent/grünlich. Sie leben in den Meristemen und jungen, wachsenden Trieben.',
      damageSymptoms: [
        'Injektion starker Speicheltoxine, die eine schwere Deformation der neuen Triebe verursachen.',
        'Junge Blätter wachsen verdreht, steif und nach unten gekrümmt und wirken wie Leder, Plastik oder verbranntes Glas.',
        'Sofortige Stagnation des Wachstums im oberen Bereich ohne sichtbare Netze.',
      ],
      prevention: [
        'Absolute Hygiene der Mitarbeiter (Kleidungswechsel zwischen den Anbauräumen).',
        'Konstante Belüftung aufrechterhalten und Totzonen mit gestauter Wärme und Feuchtigkeit vermeiden.',
      ],
      biologicalControl: [
        'Raubmilben im oberen Pflanzenbereich: Neoseiulus californicus und Amblyseius swirskii (hoch effizient bei der Bekämpfung von P. latus).',
      ],
      organicRecipes: [
        'Netzschwefel JADAM JS (1,5 ml/l), alle 3 Tage über 2 Wochen gespritzt (bei Ölanwendung aussetzen).',
        'Phytochemische Bäder mit kaltgepresstem Neemöl, emulgiert mit organischer Seife.',
      ],
      chemicalOrMineral: [
        'Thermische Tauchbehandlung von Stecklingen (43 °C für 15 Minuten) vor dem Pflanzen.',
      ],
    },
    'pest-nematoide-galhas': {
      name: 'Wurzelgallen-Nematode',
      identification:
        'Mikroskopische Bodenwürmer, die in das Wurzelsystem eindringen und feste Nahrungsstellen bilden, wodurch die Wurzelzellen hypertrophieren.',
      damageSymptoms: [
        'Bildung von Verdickungen und Knötchen an den Wurzeln („Gallen“ oder Wurzelkartoffeln).',
        'Vollständige Unfähigkeit der Pflanze, Wasser und Nährstoffe aufzunehmen, was in den heißen Stunden Welken verursacht.',
        'Schwere Verzwergung, Symptome multiplen Nährstoffmangels und vorzeitige Vergilbung.',
      ],
      prevention: [
        'Bodensolarisation vor dem Anbau oder Dampfpasteurisierung wiederverwendeter Substrate.',
        'Verwendung von sauberem, geprüftem Substrat mit gut ausgereifter organischer Düngung.',
      ],
      biologicalControl: [
        'Nematizide Bakterien: Bacillus chitinosporus und Bacillus methylotrophicus.',
        'Nematophage Pilze: Purpureocillium lilacinum (Paecilomyces lilacinus) und Pochonia chlamydosporia.',
      ],
      organicRecipes: [
        'In das Substrat eingearbeiteter Neem-Presskuchen / Rizinusmehl (setzt während der Zersetzung bioaktive nematizide Verbindungen frei).',
        'Komposttee, reich an antagonistischer Mikrobiologie, und fulvischer Gesteinsextrakt.',
      ],
      chemicalOrMineral: [
        'Inokulation arbuskulärer Mykorrhiza zur Konkurrenz um Platz in den Wurzeln.',
      ],
    },
    'pest-nematoide-lesoes': {
      name: 'Wurzelläsions-Nematode',
      identification:
        'Migratorische endoparasitische Nematoden, die sich frei innerhalb und außerhalb der Wurzeln bewegen und die Zellen der Wurzelrinde zerstören.',
      damageSymptoms: [
        'Bildung dunkler und blasser nekrotischer Läsionen über die gesamte Länge der Feinwurzeln.',
        'Zerstörung und Verfaulen der absorbierenden Wurzelhaare.',
        'Erleichterter Eintritt für nekrotrophe Bodenpilze (Fusarium oxysporum und Pythium ultimum).',
      ],
      prevention: [
        'Anbau nematizider Gründüngung wie Crotalaria (Crotalaria spectabilis) oder Tagetes (Tagetes patula).',
        'Fruchtfolge und Einsatz von Biokohle (Biochar) im Boden.',
      ],
      biologicalControl: [
        'Nematodenfangpilze: Arthrobotrys oligospora.',
        'Rhizosphärenbakterien: Pasteuria penetrans und Bacillus firmus.',
      ],
      organicRecipes: [
        'Anwendung von JADAM JHS aus Knoblauch/Chili als Drench im Substrat (0,5 %).',
        'Einarbeitung von Kreuzblütler-Stroh (Senf/Rübsen) zur organischen Biofumigation des Bodens.',
      ],
      chemicalOrMineral: [
        'Anwendung von löslichem Silizium über die Bewässerung zur Stärkung der Wurzelepidermis.',
      ],
    },
  },
  recipes: {
    'knf-fpj': {
      name: 'FPJ - Fermented Plant Juice (Fermentierter Pflanzensaft)',
      description:
        'Fermentierter Extrakt aus jungen, schnell wachsenden Trieben (z. B. Bambussprossen, Tithonia, Brennnessel, Cannabis-Triebe), reich an pflanzlichen Wachstumshormonen (Auxine, Gibberelline) und Enzymen.',
      ingredients: [
        { name: 'Grüne, zarte Triebe, vor Sonnenaufgang geerntet', ratio: '1 Teil nach Gewicht' },
        { name: 'Unraffinierter brauner Vollrohrzucker (reiner Mascavo)', ratio: '1 Teil nach Gewicht (Verhältnis 1:1)' },
      ],
      steps: [
        'Ernten Sie die Spitzen frischer Pflanzentriebe, ohne sie zu waschen, um die natürlichen Mikroorganismen der Blattoberfläche zu erhalten.',
        'Zerkleinern Sie das Pflanzenmaterial in Stücke von 2 bis 5 cm.',
        'Mischen Sie es homogen mit der gleichen Gewichtsmenge braunem Rohrzucker.',
        'Füllen Sie es in ein Glas- oder Keramikgefäß bis zu 2/3 der Kapazität.',
        'Bedecken Sie es mit atmungsaktivem Papier (Küchenpapier oder Baumwolltuch) und binden Sie es mit einem Gummiband fest.',
        'Fermentieren Sie es an einem kühlen, dunklen Ort 7 bis 10 Tage.',
        'Seihen Sie die dichte, dunkle Flüssigkeit ab und lagern Sie sie in einem halb geöffneten Glasgefäß.',
      ],
      applicationDosage:
        '1 ml pro Liter Wasser (1:1000) als Gieß- oder Blattanwendung, wöchentlich während der Vegetationsphase.',
      benefits: [
        'Stimuliert die Bewurzelung und ein gesundes Zellstreckungswachstum.',
        'Erhöht die Immunität der Pflanze gegen Temperaturstress.',
        'Liefert bioassimilierbaren Stickstoff und native Phytohormone.',
      ],
    },
    'knf-lab': {
      name: 'LAB - Lactic Acid Bacteria (Milchsäurebakterien)',
      description:
        'Konzentrierte Kultur nützlicher Lactobacillus-Arten, die Nährstoffe lösen, anaerobe Bodenpathogene (Pythium/Fusarium) unterdrücken und den organischen Abbau beschleunigen.',
      ingredients: [
        { name: 'Reiswaschwasser (stärkereich)', ratio: '1 Liter' },
        { name: 'Frische Vollmilch oder pasteurisierte Milch guter Qualität', ratio: '10 Liter (Verhältnis 1:10)' },
        { name: 'Zuckerrohrmelasse oder brauner Rohrzucker zur Konservierung', ratio: '1 Teil auf 1 Teil gereinigtes LAB' },
      ],
      steps: [
        'Waschen Sie den Reis in nicht gechlortem Wasser und sammeln Sie die trübe Flüssigkeit (Reiswasser). Fermentieren Sie diese 3-5 Tage im Glas, bis ein leicht säuerliches Aroma entsteht.',
        'Mischen Sie 1 Teil dieses Reisferments mit 10 Teilen frischer Milch in einem abgedeckten Behälter.',
        'Warten Sie 5 bis 7 Tage, bis die Milch gerinnt und sich in eine feste obere Schicht (Quark/Molke) und eine klare gelbliche Flüssigkeit darunter (LAB-Molke) trennt.',
        'Filtrieren Sie die klare gelbe Molke (dies ist das konzentrierte LAB).',
        'Mischen Sie sie zu gleichen Teilen mit Zuckerrohrmelasse zur Stabilisierung und lagern Sie sie bis zu 1 Jahr im Kühlschrank.',
      ],
      applicationDosage:
        '1 ml bis 2 ml pro Liter Wasser (1:1000 bis 1:500) über Boden/Substrat oder als Spritzung auf das Kronendach.',
      benefits: [
        'Beseitigt schlechte Gerüche in der Kompostierung und beugt Wurzelfäule vor.',
        'Verbessert die Löslichkeit von Calcium und Phosphor im Boden.',
        'Stärkt die Mikrobiologie der Rhizosphäre.',
      ],
    },
    'jadam-jms': {
      name: 'JMS - Jadam Microorganism Solution (Jadam-Mikroorganismenlösung)',
      description:
        'Kostengünstige Vermehrung vielfältiger nativer Mikroorganismen aus Waldboden (Waldhumus), multipliziert mit gekochter Kartoffel und Meersalz.',
      ingredients: [
        { name: 'Chlorfreies Wasser (Regen-, Brunnen- oder entchlortes Wasser)', ratio: '500 Liter (oder skaliert auf 20 l)' },
        { name: 'Waldboden / Boden aus naturnahem Wald oder reifer Wurmhumus', ratio: '500 g im Stoffbeutel' },
        { name: 'Gekochte Kartoffel mit Schale, zerdrückt', ratio: '500 g' },
        { name: 'Grobkörniges, jodfreies Meersalz oder Meerwasser', ratio: '500 g Meersalz' },
      ],
      steps: [
        'Kochen Sie die Kartoffeln, bis sie sehr weich sind, und zerdrücken Sie sie zusammen mit dem Meersalz in einem feinen Stoffbeutel.',
        'Tauchen Sie den Kartoffelbeutel und den Beutel mit Waldboden in ein Fass mit chlorfreiem Wasser.',
        'Massieren Sie beide Beutel 5 Minuten im Wasser, um Stärke und native Mikroorganismen freizusetzen.',
        'Verschließen Sie den Behälter, ohne ihn luftdicht abzudichten, und lassen Sie ihn bei Umgebungstemperatur (20-30 °C) stehen.',
        'Nach 24 bis 72 Stunden bildet sich an der Oberfläche ein dichter Schaum mit angenehmem Hefearoma. Das ist der Punkt maximaler Vermehrung!',
      ],
      applicationDosage:
        'Pur oder bis 1:10 verdünnt bei reichlicher Bewässerung des Bodens vor und während des Anbaus verwenden.',
      benefits: [
        'Stellt die Biodiversität des Bodenmikrobioms wieder her.',
        'Verhindert das Auftreten von Pathogenen durch kompetitive Exklusion.',
        'Völlig kostenlos durch die Nutzung lokaler Rohstoffe.',
      ],
    },
    'jadam-jwa': {
      name: 'JWA - Jadam Wetting Agent (Haftmittel / Jadam-Kaliumseife)',
      description:
        'Biologisch abbaubare Seife aus Pflanzenöl und Kaliumhydroxid (KOH), die als natürliches, biologisch abbaubares Tensid und als Abwehrmittel gegen Milben, Blattläuse und Fliegen wirkt.',
      ingredients: [
        { name: 'Pflanzenöl aus Raps, Sonnenblume oder Soja', ratio: '1,8 Liter' },
        { name: 'Kaliumhydroxid (KOH 90 % in Flockenform)', ratio: '320 Gramm' },
        { name: 'Weiches Wasser (Regenwasser oder Umkehrosmose)', ratio: '1,2 Liter + 10 Liter' },
      ],
      steps: [
        'Lösen Sie das KOH in einem hitzebeständigen Behälter in 1,2 l weichem Wasser (exotherme Reaktion - verwenden Sie PSA: Handschuhe und Schutzbrille).',
        'Geben Sie das Pflanzenöl hinzu und schlagen Sie es 10-15 Minuten mit einem industriellen/häuslichen Mixer, bis eine dicke Emulsion ähnlich Mayonnaise/Butter entsteht.',
        'Lassen Sie es verschlossen 3 Tage ruhen, damit die Verseifung vollständig abläuft.',
        'Geben Sie die restlichen 10 l weiches Wasser schrittweise hinzu und rühren Sie, bis sich die feste Paste zu einer zähflüssigen, goldbernsteinfarbenen Flüssigkeit löst.',
      ],
      applicationDosage:
        '10 bis 15 ml pro Liter Wasser als Haftmittel für Bioinput-Mittel und zur Bekämpfung weichhäutiger Insekten.',
      benefits: [
        'Löst die Wachsschicht von Schädlingen, ohne das Blatt zu schädigen.',
        'Verbessert die Blattbenetzung von Biokontrollmitteln und Blattdüngern.',
        '100 % ökologisch und frei von synthetischen Tensiden aus Erdöl.',
      ],
    },
    'kyusei-em1': {
      name: 'EM-1 / Aktiviertes Bokashi (Effektive Mikroorganismen Kyusei)',
      description:
        'Von Prof. Teruo Higa formuliertes Inokulum mit phototrophen Bakterien, Milchsäurebakterien und Hefen in ausgewogenem Verhältnis zur Revitalisierung des Bodens und zur organischen Düngung.',
      ingredients: [
        { name: 'EM-1-Mutterinokulum', ratio: '50 ml' },
        { name: 'Nicht geschwefelte Zuckerrohrmelasse', ratio: '50 ml' },
        { name: 'Chlorfreies warmes Wasser (30 °C)', ratio: '1 Liter' },
      ],
      steps: [
        'Mischen Sie die Melasse in warmem, chlorfreiem Wasser, bis sie vollständig gelöst ist.',
        'Geben Sie das EM-1-Inokulum hinzu und rühren Sie vorsichtig um.',
        'Füllen Sie das Gemisch in eine dunkle PET-Flasche und lassen Sie 2 cm Luftraum.',
        'Verschließen Sie den Deckel und lassen Sie es 7 Tage bei warmer Umgebung (25-30 °C) fermentieren; lassen Sie das angesammelte Gas alle 2 Tage ab.',
        'Wenn der pH-Wert unter 3,8 fällt und das charakteristische süßsäuerliche Aroma auftritt, ist das aktivierte EM fertig.',
      ],
      applicationDosage:
        '2 ml bis 5 ml pro Liter bei Bodenbewässerungen oder 1 ml/l als Blattspritzung.',
      benefits: [
        'Beschleunigt die Humifizierung organischer Substanz im Boden.',
        'Erhöht die Verfügbarkeit komplexierter Mikro- und Makronährstoffe.',
        'Verleiht eine höhere Resistenz gegen Bodenpathogene.',
      ],
    },
    'kyusei-em5': {
      name: 'EM5 - Kyusei-EM-Repellent',
      description:
        'Natürlicher repellenter und vorbeugender Pflanzenschutz-Extrakt, gewonnen durch anaerobe Fermentation von EM-1 mit Cachaça/Branntwein, organischem Essig und Melasse.',
      ingredients: [
        { name: 'Aktiviertes EM-1-Inokulum oder Mutterinokulum', ratio: '100 ml' },
        { name: 'Reine Zuckerrohrmelasse', ratio: '100 ml' },
        { name: 'Zuckerrohrschnaps / Cachaça (35-40 % Alkohol)', ratio: '100 ml' },
        { name: 'Natürlicher Apfelessig (5 % Essigsäure)', ratio: '100 ml' },
        { name: 'Entchlortes / chlorfreies Wasser', ratio: '600 ml (insgesamt 1 Liter)' },
        { name: 'Optional: Knoblauch, Chilischote oder gehackte Heilkräuter', ratio: '50 g' },
      ],
      steps: [
        'Lösen Sie die Zuckerrohrmelasse in warmem, chlorfreiem Wasser in einer sauberen Flasche.',
        'Geben Sie Essig, Cachaça und das EM-1-Inokulum hinzu und mischen Sie vorsichtig.',
        'Geben Sie die gehackten Botanicals (Knoblauch und Chili) hinzu, wenn Sie eine verstärkte insektizide Wirkung wünschen.',
        'Verschließen Sie die Flasche hermetisch und fermentieren Sie 7 bis 10 Tage an einem dunklen, warmen Ort (25-30 °C).',
        'Öffnen Sie die Flasche in den ersten 4 Tagen täglich, um das angesammelte Gas abzulassen.',
        'Das EM5 ist fertig, wenn die Gasproduktion aufhört und ein alkoholisch-säuerliches Aroma bei pH < 3,5 vorliegt.',
      ],
      applicationDosage:
        '2 ml bis 5 ml pro Liter Wasser (1:500 bis 1:200) als Blattspritzung in der Dämmerung, alle 7 bis 14 Tage.',
      benefits: [
        'Bildet einen schützenden biologischen Film auf der Blattkutikula und verhindert die Keimung von Pilzsporen.',
        'Wirksame Repellentwirkung gegen Fliegen, Thripse, Blattläuse und Raupen.',
        'Stimuliert die Stärkung der epidermalen Pflanzengenwebe.',
      ],
    },
    'knf-faa': {
      name: 'FAA - Fish Amino Acid (Fischaminosäuren KNF)',
      description:
        'Fermentierter flüssiger Fischextrakt, reich an organischem Stickstoff mit schneller Aufnahme, essenziellen Aminosäuren (Glutaminsäure, Glycin) und marinen Spurenelementen.',
      ingredients: [
        { name: 'Frische Fischreste (Köpfe, Eingeweide, Gräten und Haut)', ratio: '1 Teil nach Gewicht (1 kg)' },
        { name: 'Reiner brauner Rohrzucker oder gemahlene Rapadura', ratio: '1 Teil nach Gewicht (1 kg)' },
        { name: 'Optional: Bodenmikroorganismen (IMO-3 oder LAB)', ratio: '10 ml zur Beschleunigung' },
      ],
      steps: [
        'Zerkleinern Sie das frische Fischmaterial mit einem sauberen Messer in kleine Stücke.',
        'Mischen Sie den Fisch in einem Kunststoffeimer mit der exakt gleichen Menge braunem Rohrzucker.',
        'Drücken Sie das Material nach unten und bedecken Sie die Oberfläche mit weiteren 1 cm trockenem braunem Rohrzucker.',
        'Bedecken Sie den Eimer mit einem Tuch oder porösem Papier, das mit einem Gummiband befestigt wird (Prozess mit anfänglicher Sauerstoffzufuhr).',
        'Lassen Sie es 3 bis 6 Monate an einem kühlen Ort fermentieren. Der Zucker dehydriert den Fisch osmotisch und verflüssigt das Gewebe ohne schlechte Gerüche.',
        'Seihen Sie die dichte, dunkelbraune Flüssigkeit ab. Lagern Sie das FAA in Glas- oder PET-Gefäßen.',
      ],
      applicationDosage:
        '1 ml pro Liter Wasser (1:1000) bei Bodenbewässerungen oder über das Blatt im vegetativen Wachstum.',
      benefits: [
        'Beschleunigt das vegetative Wachstum von Stängeln und Blättern mit bioassimilierbarem Stickstoff.',
        'Ernährt und vermehrt die nützlichen Pilze und Bakterien der Rhizosphäre.',
        'Fördert dicke, dunkelgrüne Blätter mit hoher photosynthetischer Effizienz.',
      ],
    },
    'knf-ffj': {
      name: 'FFJ - Fermented Fruit Juice (Fermentierter Fruchtsaft KNF)',
      description:
        'Fermentiertes Elixier aus reifen süßen Früchten (Papaya, Banane, Kürbis, Melone), sehr reich an bioverfügbarem Kalium, komplexen Zuckern und Blütehormonen.',
      ingredients: [
        { name: 'Süße, gut reife Früchte (Banane mit Schale, Papaya, Kürbis)', ratio: '1 Teil nach Gewicht' },
        { name: 'Unraffinierter brauner Vollrohrzucker', ratio: '1 Teil nach Gewicht (Verhältnis 1:1)' },
      ],
      steps: [
        'Schneiden Sie die gut reifen Früchte mit Schale und Kernen in dünne Scheiben.',
        'Mischen Sie die geschnittenen Früchte homogen mit dem braunen Rohrzucker.',
        'Füllen Sie 2/3 eines Fermentationsgefäßes und bedecken Sie die Oberseite mit atmungsaktivem Papier.',
        'Lassen Sie es 7 bis 10 Tage an einem dunklen Ort fermentieren.',
        'Filtrieren Sie den goldfarbenen, duftenden Sirup und bewahren Sie ihn in atmungsaktiven Behältern auf.',
      ],
      applicationDosage:
        '1 ml bis 2 ml pro Liter Wasser (1:1000 bis 1:500), angewendet vom Beginn bis zur Mitte der Blütephase.',
      benefits: [
        'Potenziert Wachstum, Dichte und Aroma der Früchte/medizinischen Blüten.',
        'Liefert bioverfügbares Kalium und Bor für die Zuckertranslokation.',
        'Verbessert die Synthese und das Aromaprofil der Terpene.',
      ],
    },
    'jadam-biopesticide': {
      name: 'JADAM Biopestizid - Vollständiges Abwehrsystem (JWA + JS + JHS)',
      description:
        'Ökologische Formulierung mit sehr hoher synergetischer Wirksamkeit, die das Haftmittel JWA, das Fungizid Schwefel JS und den insektiziden Kräuterextrakt JHS kombiniert.',
      ingredients: [
        { name: 'JWA (Jadam Wetting Agent - Kaliumseife)', ratio: '10 bis 15 ml/l' },
        { name: 'JS (Jadam Sulfur - löslicher Jadam-Schwefel)', ratio: '1,2 bis 2 ml/l' },
        { name: 'JHS (Jadam Herbal Solution - Knoblauch-/Chiliextrakt)', ratio: '5 bis 10 ml/l' },
        { name: 'Weiches Wasser ohne Calciumsalze (Regen- oder RO-Wasser)', ratio: '1 Liter' },
      ],
      steps: [
        'Messen Sie das saubere weiche Wasser im Tank der Spritze ab.',
        'Geben Sie zuerst das JWA (Seife) hinzu und rühren Sie kräftig, um das Wasser zu konditionieren.',
        'Geben Sie das JHS (Chili-/Knoblauch-/Chinabaum-Extrakt) hinzu und rühren Sie weiter.',
        'Geben Sie zuletzt das JS (Schwefel) hinzu und rühren Sie, bis es vollständig homogen ist.',
        'Spritzen Sie in feinem Nebel und decken Sie die Ober- und Unterseite aller Blätter in der Dämmerung ab.',
      ],
      applicationDosage:
        'Vollständige Blattspritzung in der Vegetationsphase alle 7-10 Tage (JS niemals auf ausgebildete Blüten oder bei starker Sonne ausbringen).',
      benefits: [
        'Breitbandige Kontrolle gegen Milben, Thripse, Raupen, Fliegen und Schildläuse.',
        'Sofortige Beseitigung von Blattpilzen wie Echtem Mehltau und Rost.',
        'Kosten von wenigen Cent pro Liter im Vergleich zu kommerziellen synthetischen Pflanzenschutzmitteln.',
      ],
    },
  },
  bioinputs: {
    'bio-1': {
      activeAgent: 'Antagonistischer Pilz Trichoderma harzianum (Stamm 1306)',
      dosage: '1,0 g bis 2,0 g pro Liter Wasser im Boden oder Substrat',
      targetPestOrDisease:
        'Pythium, Fusarium, Rhizoctonia, Wurzelfäule und Umfallkrankheit der Sämlinge (Damping-off)',
      astrayaNotes:
        'Beim Umpflanzen und zweiwöchentlich in der Vegetationsphase anwenden. Wirkt durch Mykoparasitismus, Konkurrenz um Raum und Nährstoffe sowie Induktion systemischer Resistenz bei Cannabis.',
    },
    'bio-2': {
      activeAgent: 'Entomopathogener Pilz Beauveria bassiana',
      dosage: '2,0 g bis 3,0 g pro Liter Wasser (Blattspritzung bei Nacht)',
      targetPestOrDisease: 'Milben, Weiße Fliege, Thripse, Blattläuse und Stängelbohrer',
      astrayaNotes:
        'Die Sporen keimen auf der Kutikula des Schädlings, durchdringen das Exoskelett und mumifizieren das Insekt innerhalb von 3 bis 5 Tagen mit weißem Myzel. Halten Sie die Blattfeuchtigkeit direkt nach der Anwendung hoch, um die Keimung zu gewährleisten.',
    },
    'bio-3': {
      activeAgent: 'Sporenbildendes Bakterium Bacillus thuringiensis var. kurstaki',
      dosage: '1,5 ml bis 2,5 ml pro Liter Wasser als Blattspritzung',
      targetPestOrDisease: 'Blattraupen, Mais-Heerwurmraupen und Blütenraupen',
      astrayaNotes:
        'Bildet Delta-Endotoxin-Proteinkristalle, die den Verdauungstrakt der Raupen nach der Aufnahme lähmen. Völlig unschädlich für Menschen, Bienen und nützliche Prädatoren.',
    },
    'bio-4': {
      productName: 'Glomus intraradices (Arbuskuläre Mykorrhiza Endomyco)',
      activeAgent:
        'Arbuskuläre Mykorrhizapilze (Rhizophagus irregularis / Glomus intraradices)',
      dosage: '5 g pro Topf im Pflanzloch beim Umpflanzen in direktem Wurzelkontakt',
      targetPestOrDisease: 'Ausweitung der Wurzelabsorptionsfläche und Wasserstress',
      astrayaNotes:
        'Die Pilzhyphen vergrößern die effektive Absorptionsfläche der Wurzel um bis zu 1000 % und verbessern die Aufnahme von Phosphor und Mikronährstoffen in lebenden Böden dramatisch.',
    },
    'bio-5': {
      activeAgent: 'Bakterium Bacillus subtilis QST 713',
      dosage: '3,0 ml bis 5,0 ml pro Liter Wasser (vorbeugend über das Blatt)',
      targetPestOrDisease:
        'Echter Mehltau (Powdery Mildew), Botrytis cinerea (Grauschimmel) und Macrophomina',
      astrayaNotes:
        'Sondert natürliche Lipopeptide (Iturine und Surfactine) ab, die die Membranen pathogener Pilze auflösen. Hervorragender Blattschutz und sicher bis zur frühen Blütephase einsetzbar.',
    },
    'bio-6': {
      activeAgent: 'Entomopathogener Pilz Metarhizium anisopliae (IBCB 425)',
      dosage: '2,0 g bis 3,0 g pro Liter Wasser als Blattspritzung am frühen Abend',
      targetPestOrDisease: 'Maiszikade, Wanzen, Käfer und Bodenlarven',
      astrayaNotes:
        'Durchdringt die Kutikula des Insekts und infiziert die Hämolymphe („grüne Muscardine-Krankheit“). Wirkt synergistisch mit Beauveria bassiana bei der Bekämpfung von Zikaden und saugenden Insekten.',
    },
    'bio-7': {
      activeAgent: 'Entomopathogener Pilz Cordyceps fumosorosea',
      dosage: '1,5 g bis 2,5 g pro Liter Wasser',
      targetPestOrDisease:
        'Weiße Fliege (alle Stadien), Weiße Milbe, Thripse und Rote Spinnmilbe',
      astrayaNotes:
        'Außergewöhnliche Kontrolle bei Ausbrüchen von Weißer Fliege und Weißer Milbe. Befällt Eier, Nymphen und Adulte und keimt bei günstiger Blattfeuchtigkeit.',
    },
    'bio-8': {
      productName: 'Azospirillum brasilense (Inokulant Azos)',
      activeAgent:
        'Diazotrophes, wachstumsförderndes Bakterium Azospirillum brasilense (Ab-V5 und Ab-V6)',
      dosage:
        '2,0 ml bis 4,0 ml pro Liter über Fertigation oder als Bad für Samen/Stecklinge',
      targetPestOrDisease:
        'Biologische Stickstofffixierung und Stimulation von Phytohormonen (Auxine)',
      astrayaNotes:
        'Fördert eine explosionsartige Bewurzelung von Klonen und Stecklingen. Fixiert atmosphärischen Stickstoff und synthetisiert native Indol-3-essigsäure (IAA).',
    },
    'bio-9': {
      productName: 'Meeresalgenextrakt (Ascophyllum nodosum)',
      activeAgent: 'Konzentrierte Meeresalge, reich an Cytokininen, Betainen und Mannit',
      dosage: '1,0 ml bis 2,0 ml pro Liter über das Blatt oder den Boden, alle 10 Tage',
      targetPestOrDisease:
        'Überwindung von Hitze- und Wasserstress, Phytotoxizität sowie Stimulation der Verzweigung',
      astrayaNotes:
        'Erhöht die Chlorophyllkonzentration, aktiviert die Proteinsynthese und stärkt das pflanzliche Immunsystem gegen Hitze- und Trockenheitsspitzen.',
    },
    'bio-10': {
      productName: 'Purpureocillium lilacinum (NematWP / biologisches Nematizid)',
      activeAgent: 'Nematophager Pilz Purpureocillium lilacinum (Paecilomyces lilacinus)',
      dosage: '2,0 g bis 4,0 g pro Liter als Drench (Bodenbewässerung) ausgebracht',
      targetPestOrDisease:
        'Wurzelgallen-Nematode (Meloidogyne spp.) und Wurzelläsions-Nematode (Pratylenchus spp.)',
      astrayaNotes:
        'Infiziert Eier, Weibchen und Juvenile schädlicher Nematoden im Boden, zerstört die Lipidschicht der Eier und reinigt den Wurzelraum.',
    },
  },
  documents: {
    'doc-1': {
      title: '1.1 Nährstoffmängel bei Cannabis - Illustrierter Leitfaden',
      category: 'Landwirtschaft & Ernährung',
      description:
        'Vollständiges PDF-Dokument mit der visuellen Diagnose von Mangelerscheinungen an Stickstoff, Phosphor, Kalium, Calcium, Magnesium, Schwefel und Mikronährstoffen samt Fotos und Korrekturmaßnahmen im Feld.',
    },
    'doc-2': {
      title: '1.2 Identifikation und Bekämpfung landwirtschaftlicher Schädlinge bei Cannabis',
      category: 'IPM & Pflanzenschutz',
      description:
        'Technisches Handbuch zu landwirtschaftlichen Schädlingen (Milben, Thripse, Blattläuse, Botrytis, Echter Mehltau, Trauermücken) und Bekämpfungsprotokolle mit biologischen Pflanzenschutzmitteln, KNF und JADAM.',
    },
    'doc-3': {
      title: 'Praxishandbuch der Koreanischen Naturlandwirtschaft (KNF) & JADAM',
      category: 'Ökologischer Anbau',
      description:
        'Protokolle zur Herstellung von FPJ, FFJ, LAB, WCA, JMS, JWA und JS, angepasst an den phytotherapeutischen Anbau von medizinischem Cannabis durch die Vereinigung.',
    },
    'doc-4': {
      title: 'Leitfaden zur agroklimatischen Kalibrierung und VPD nach phänologischer Phase',
      category: 'Meteorologie & Klima',
      description:
        'Tabelle mit Zielwerten für relative Luftfeuchtigkeit, Temperatur, Taupunkt und Dampfdruckdefizit (VPD) für Gewächshäuser und den Freilandanbau.',
    },
    'doc-5': {
      title: 'Visuelle Identität & offizielles Logo als PNG (Google Drive)',
      category: 'Identität & Medien',
      description:
        'Hochauflösende PNG-Dateien und Vektorversion des offiziellen Logos der Vereinigung.',
    },
    'doc-6': {
      title: 'Logo-Vorlage & Brand Assets (Canva Official)',
      category: 'Identität & Medien',
      description:
        'Offizieller Canva-Link mit Designvorlagen und dem offiziellen Logo-Artwork der Vereinigung.',
    },
  },
  madres: {
    'madre-1': {
      ataquePragas:
        'Mittlere Resistenz; vorbeugend gegen Echten Mehltau in Regenzeiten überwachen.',
      enraizamento: '95 % in 8-10 Tagen (hohe Rate mit KNF/IBA-Gel)',
      casaVegetacao: 'Gewächshaus #1 - Modul A',
      observacoes:
        'Ausgezeichnete vegetative Vitalität. Nimmt FIM- und LST-Schnitte zur Optimierung der Seitentriebe gut an.',
    },
    'madre-2': {
      ataquePragas:
        'Geringe Anfälligkeit für Milben; gute Toleranz gegenüber Temperaturschwankungen.',
      enraizamento: '98 % in 6-8 Tagen (beschleunigte Wurzelentwicklung)',
      casaVegetacao: 'Gewächshaus #1 - Modul B',
      observacoes:
        'Hauptmutterpflanze mit hohem Stecklingsertrag. Dicke Zweige, tolerant gegenüber starken Schnitten.',
    },
    'madre-3': {
      genetica: "Charlotte's Web (CBD-reich)",
      ataquePragas:
        'Ausgezeichnete Resistenz gegen Thripse und Weiße Fliegen; empfindlich gegen Bodenvernässung.',
      enraizamento: '92 % in 10-12 Tagen',
      casaVegetacao: 'Gewächshaus #2 - Medizinischer Bereich',
      observacoes:
        'Medizinische phytotherapeutische Sorte mit Fokus auf die Extraktion von Vollspektrum-CBD-Öl.',
    },
    'madre-4': {
      ataquePragas:
        'Erfordert häufige Aufmerksamkeit mit Beauveria bassiana wegen mittlerer Anfälligkeit für die Gemeine Spinnmilbe.',
      enraizamento:
        '88 % in 12-14 Tagen (erfordert eine Unterbodenheizung auf 24 °C während der Bewurzelung)',
      casaVegetacao: 'Gewächshaus #1 - Modul C',
      observacoes:
        'Erfordert eine kontinuierliche Calcium- und Magnesium-Supplementierung über das Blatt im Mutterpflanzen-Gewächshaus.',
    },
  },
  outdoor: {
    'out-1': {
      nomeCanteiro: 'Bio-Freilandbeet Vollsonne #1',
      tipoSubstrato:
        'Organisches Living Soil mit Rizinuspresskuchen, Knochenmehl und KNF-Mulchdecke',
      protecaoClimatica:
        'Gewächshaus mit 30 % Schattiernetz + Hagelschutznetz + vorbeugende IPM-Spritzung JWA/JHS',
      observacoes:
        'Nutzung des solaren Photoperiodismus im Frühjahr/Sommer mit automatisierter Tropfbewässerung.',
    },
  },
  events: {
    'ev-1': {
      title: 'Fertigation mit FPJ (KNF) + Cal-Mag',
      notes: 'Dosierung 1 ml/l FPJ + 1,5 ml/l Cal-Mag. Ziel-EC: 1,4 / pH 6,2.',
      dosageOrVolume: '20 Liter im Beet A',
    },
    'ev-2': {
      title: 'Präventive Spritzung mit Beauveria + JWA',
      notes:
        'Bei Sonnenuntergang oder mit ausgeschaltetem Licht ausbringen, um die Sporen des Pilzes zu schützen.',
      dosageOrVolume: '10 Liter in der Rückenspritze',
    },
  },
  mipLogs: {
    'mip-1': {
      zone: 'Gewächshaus A - Blüte 1',
      pestObserved: 'Gemeine Spinnmilbe (Tetranychus urticae)',
      actionTaken:
        'Freisetzung von Phytoseiulus persimilis + Spritzung mit Kaliumseife JWA 10 ml/l.',
      responsible: 'Agronom',
    },
  },
};
