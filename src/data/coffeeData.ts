import type { CoffeeBean, BrewMethod } from '../types/coffee';

export const COFFEE_BEANS: CoffeeBean[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Yirgacheffe Misty Valley G1',
    origin: 'Gedeo Zone, Yirgacheffe',
    region: 'Yirgacheffe',
    country: 'Ethiopia',
    continent: 'Africa',
    farm: 'Idido Cooperative',
    variety: 'Kurume & Indigenous Heirloom',
    elevation: '2,050m - 2,200m',
    process: 'Natural',
    roastLevel: 'Light',
    scaScore: 91.5,
    tastingNotes: ['Bergamot', 'Ripe Blueberry', 'Jasmine Flower', 'Meyer Lemon', 'Peach Nectar'],
    description: 'An ethereal cup bursting with floral aromatics, intoxicating wild blueberry sweetness, and a sparkling citrus acidity characteristic of pristine Ethiopian naturals.',
    price: 22.50,
    weight: '250g',
    color: '#e07a5f',
    profile: {
      acidity: 9,
      sweetness: 8.5,
      body: 6,
      floral: 9.5,
      fruity: 9,
      cocoaNutty: 3
    },
    recommendedBrew: 'V60 Pour Over',
    harvestDate: 'Nov 2025 - Jan 2026',
    inStock: true,
    featured: true
  },
  {
    id: 'colombia-huila-geisha',
    name: 'El Paraiso Geisha Reserve',
    origin: 'Huila, San Adolfo',
    region: 'Huila',
    country: 'Colombia',
    continent: 'Latin America',
    farm: 'Finca El Paraiso',
    variety: 'Geisha (Panama Lineage)',
    elevation: '1,950m',
    process: 'Anaerobic Washed',
    roastLevel: 'Light',
    scaScore: 93.0,
    tastingNotes: ['Lemongrass', 'White Peach', 'Orange Blossom', 'Manuka Honey', 'Lychee'],
    description: 'A champion-tier Geisha micro-lot undergoing 48-hour anaerobic thermal shock fermentation, producing exquisite tropical vibrancy and silky tea-like elegance.',
    price: 34.00,
    weight: '250g',
    color: '#f4a261',
    profile: {
      acidity: 9.5,
      sweetness: 9,
      body: 5.5,
      floral: 9.8,
      fruity: 9.2,
      cocoaNutty: 2.5
    },
    recommendedBrew: 'Chemex',
    harvestDate: 'Oct 2025',
    inStock: true,
    featured: true
  },
  {
    id: 'panama-boquete-esmeralda',
    name: 'Boquete Private Reserve',
    origin: 'Boquete, Chiriquí',
    region: 'Boquete',
    country: 'Panama',
    continent: 'Latin America',
    farm: 'Hacienda La Esmeralda',
    variety: 'Geisha 1500+',
    elevation: '1,800m',
    process: 'Washed',
    roastLevel: 'Light',
    scaScore: 92.5,
    tastingNotes: ['Papaya', 'Jasmine', 'Mandarin Orange', 'Wild Bergamot', 'Cane Sugar'],
    description: 'Renowned world-wide from the volcanic slopes of Volcán Barú. Extraordinary purity, perfumed floral bouquet, and crystal-clear lingering finish.',
    price: 38.00,
    weight: '250g',
    color: '#e76f51',
    profile: {
      acidity: 8.8,
      sweetness: 9,
      body: 6,
      floral: 9.5,
      fruity: 8.8,
      cocoaNutty: 3
    },
    recommendedBrew: 'V60 Pour Over',
    harvestDate: 'Dec 2025',
    inStock: true
  },
  {
    id: 'kenya-nyeri-hill',
    name: 'Nyeri Hill Peaberry AA',
    origin: 'Nyeri County, Mount Kenya',
    region: 'Nyeri',
    country: 'Kenya',
    continent: 'Africa',
    farm: 'Nyeri Hill Estate',
    variety: 'SL-28, SL-34, Batian',
    elevation: '1,900m',
    process: 'Washed',
    roastLevel: 'Medium-Light',
    scaScore: 90.0,
    tastingNotes: ['Blackcurrant', 'Ruby Grapefruit', 'Brown Sugar', 'Cranberry Tart', 'Tomato Vine'],
    description: 'Classic Kenyan powerhouse with pronounced phosphoric acidity, juicy tart currant sweetness, and a complex syrupy mouthfeel.',
    price: 24.00,
    weight: '250g',
    color: '#b56576',
    profile: {
      acidity: 9.5,
      sweetness: 8,
      body: 7.5,
      floral: 6.5,
      fruity: 9.5,
      cocoaNutty: 4
    },
    recommendedBrew: 'Aeropress',
    harvestDate: 'Jan 2026',
    inStock: true,
    featured: true
  },
  {
    id: 'guatemala-antigua-medina',
    name: 'Antigua Los Volcanes',
    origin: 'Antigua Valley',
    region: 'Antigua',
    country: 'Guatemala',
    continent: 'Latin America',
    farm: 'Finca Medina',
    variety: 'Bourbon, Caturra',
    elevation: '1,650m',
    process: 'Washed',
    roastLevel: 'Medium',
    scaScore: 88.5,
    tastingNotes: ['70% Dark Chocolate', 'Roasted Almond', 'Brown Sugar', 'Orange Zest', 'Caramel'],
    description: 'Shade-grown in mineral-rich volcanic soil nestled between three volcanoes. Harmonious balance of velvety dark cacao, rich almond praline, and warm caramel.',
    price: 19.50,
    weight: '250g',
    color: '#6d597a',
    profile: {
      acidity: 6,
      sweetness: 8.5,
      body: 8.5,
      floral: 4,
      fruity: 5.5,
      cocoaNutty: 9.5
    },
    recommendedBrew: 'French Press',
    harvestDate: 'Feb 2026',
    inStock: true
  },
  {
    id: 'costa-rica-tarrazu-honey',
    name: 'Tarrazú Red Honey Estate',
    origin: 'Tarrazú Valley',
    region: 'Tarrazú',
    country: 'Costa Rica',
    continent: 'Latin America',
    farm: 'La Candelilla Estate',
    variety: 'Catuai & Typica',
    elevation: '1,750m',
    process: 'Honey',
    roastLevel: 'Medium-Light',
    scaScore: 89.5,
    tastingNotes: ['Honeycrisp Apple', 'Maple Syrup', 'Toffee', 'Yellow Plum', 'Vanilla Bean'],
    description: 'Processed with 50% fruit mucilage retained on the drying beds, imbuing the cup with sumptuous honeyed mouthfeel and crisp orchard fruit sweetness.',
    price: 21.00,
    weight: '250g',
    color: '#d4a373',
    profile: {
      acidity: 7.5,
      sweetness: 9,
      body: 8,
      floral: 6,
      fruity: 7.5,
      cocoaNutty: 7
    },
    recommendedBrew: 'V60 Pour Over',
    harvestDate: 'Jan 2026',
    inStock: true
  },
  {
    id: 'sumatra-mandheling-triple',
    name: 'Gayo Mountain Triple-Pick',
    origin: 'Aceh, Lake Toba',
    region: 'Gayo Highlands',
    country: 'Indonesia',
    continent: 'Asia-Pacific',
    farm: 'Jagong Village Smallholders',
    variety: 'Ateng, Tim Tim, Typica',
    elevation: '1,500m',
    process: 'Wet-Hulled',
    roastLevel: 'Medium-Dark',
    scaScore: 88.0,
    tastingNotes: ['Dark Cacao Nibs', 'Cedar Wood', 'Black Cardamom', 'Molasses', 'Earthy Pine'],
    description: 'Traditional Giling Basah processing delivers a profoundly heavy, buttery body with rich pipe tobacco, forest cedar, dark cocoa, and lingering sweet spice.',
    price: 20.00,
    weight: '250g',
    color: '#355070',
    profile: {
      acidity: 4,
      sweetness: 7,
      body: 9.8,
      floral: 2,
      fruity: 4,
      cocoaNutty: 9
    },
    recommendedBrew: 'French Press',
    harvestDate: 'Nov 2025',
    inStock: true
  },
  {
    id: 'yemen-mocha-matari',
    name: 'Bani Matar Ancient Heritage',
    origin: 'Bani Matar Province',
    region: 'Sana’a',
    country: 'Yemen',
    continent: 'Middle East',
    farm: 'Bani Matar Terraced Mountain Farms',
    variety: 'Dawairi, Jaadi (Ancient Typica)',
    elevation: '2,250m',
    process: 'Natural',
    roastLevel: 'Medium',
    scaScore: 92.0,
    tastingNotes: ['Dried Fig', 'Dark Cocoa', 'Cinnamon Bark', 'Dates', 'Pomegranate Molasses'],
    description: 'Grown on millennia-old terraced cliffs using ancient dry processing. Exotic, winey, and decadent with notes of sun-dried fruit and rich Arabian spices.',
    price: 36.00,
    weight: '250g',
    color: '#9e2a2b',
    profile: {
      acidity: 7,
      sweetness: 8.8,
      body: 9,
      floral: 5,
      fruity: 8,
      cocoaNutty: 8.8
    },
    recommendedBrew: 'Siphon',
    harvestDate: 'Dec 2025',
    inStock: true,
    featured: true
  }
];

export const BREW_METHODS: BrewMethod[] = [
  {
    id: 'v60',
    name: 'Hario V60',
    icon: 'cone',
    description: 'Iconic conical dripper with 60° spiral ribs, emphasizing delicate florals, crisp acidity, and maximum flavor clarity.',
    defaultDose: 18,
    defaultRatio: 16, // 1:16 -> 288g water
    minRatio: 14,
    maxRatio: 18,
    grindSize: 'Medium-Fine (Table Salt)',
    grindMicrons: 650,
    grindLevel: 'Medium-Fine',
    waterTempC: 93,
    idealTime: '3:00 - 3:30 min',
    steps: [
      {
        id: 1,
        title: 'Rinse Filter & Preheat',
        durationSeconds: 20,
        targetWaterGrams: 0,
        description: 'Rinse paper filter with hot water to remove papery taste and preheat vessel. Discard rinse water and add ground coffee. Create a small well in center.',
        tip: 'Shake gently to flatten coffee bed evenly.'
      },
      {
        id: 2,
        title: 'The Bloom Phase',
        durationSeconds: 45,
        targetWaterGrams: 50,
        description: 'Pour 50g of water (approx 2x-3x dose) in gentle concentric circles. Let coffee expand and release trapped CO2 gas.',
        tip: 'Watch the grounds bubble and degas—this is crucial for sweetness.'
      },
      {
        id: 3,
        title: 'First Continuous Pour',
        durationSeconds: 45,
        targetWaterGrams: 160,
        description: 'Pour spiraling outwards from center to edge (avoiding direct wall contact) until reaching 160g total.',
        tip: 'Keep pour rate steady around 4g to 5g per second.'
      },
      {
        id: 4,
        title: 'Second Main Pour',
        durationSeconds: 50,
        targetWaterGrams: 288,
        description: 'Gently pour the remaining water up to your target yield. Give the brewer one gentle swirl to ensure a flat bed.',
        tip: 'A flat bed ensures even extraction without channeling.'
      },
      {
        id: 5,
        title: 'Drawdown & Serve',
        durationSeconds: 40,
        targetWaterGrams: 288,
        description: 'Allow water to drip completely through coffee bed. Remove dripper, swirl server to aerate, and enjoy.',
        tip: 'Target total contact time between 3:00 and 3:30 minutes.'
      }
    ]
  },
  {
    id: 'chemex',
    name: 'Chemex Glass',
    icon: 'hourglass',
    description: 'Heavy bonded paper filters deliver ultra-clean, tea-like body with zero sediment and heightened sweetness.',
    defaultDose: 30,
    defaultRatio: 16, // 1:16 -> 480g water
    minRatio: 14,
    maxRatio: 17,
    grindSize: 'Medium-Coarse (Coarse Sea Salt)',
    grindMicrons: 850,
    grindLevel: 'Medium-Coarse',
    waterTempC: 94,
    idealTime: '4:00 - 4:45 min',
    steps: [
      {
        id: 1,
        title: 'Rinse Thick Filter',
        durationSeconds: 25,
        targetWaterGrams: 0,
        description: 'Place 3-ply side facing spout. Rinse thoroughly with hot water and drain out the pour spout.',
        tip: 'Heavy Chemex paper requires ample hot water rinse.'
      },
      {
        id: 2,
        title: 'Coffee Bloom',
        durationSeconds: 45,
        targetWaterGrams: 80,
        description: 'Pour 80g water evenly over grounds. Allow to bloom fully for 45 seconds.',
        tip: 'Ensure all dry grounds are saturated evenly.'
      },
      {
        id: 3,
        title: 'Stage 1 Pulse Pour',
        durationSeconds: 60,
        targetWaterGrams: 280,
        description: 'Pour in slow spirals raising the slurry level halfway up the cone.',
        tip: 'Maintain smooth circular motion without splashing.'
      },
      {
        id: 4,
        title: 'Stage 2 Final Pour',
        durationSeconds: 60,
        targetWaterGrams: 480,
        description: 'Top up with remaining water to target total. Swirl gently.',
        tip: 'Let drawdown complete evenly.'
      },
      {
        id: 5,
        title: 'Decant & Swirl',
        durationSeconds: 50,
        targetWaterGrams: 480,
        description: 'Discard filter and swirl Chemex carafe to homogenize layers before serving.',
        tip: 'Chemex retains heat well—sip as it cools for tasting notes progression.'
      }
    ]
  },
  {
    id: 'aeropress',
    name: 'AeroPress (Inverted)',
    icon: 'press',
    description: 'Immersion plus air pressure extraction. Fast, versatile, with rich body and smooth, low-bitterness sweetness.',
    defaultDose: 16,
    defaultRatio: 14, // 1:14 -> 224g water
    minRatio: 12,
    maxRatio: 16,
    grindSize: 'Fine-Medium (Fine Sand)',
    grindMicrons: 550,
    grindLevel: 'Fine',
    waterTempC: 88,
    idealTime: '2:00 min',
    steps: [
      {
        id: 1,
        title: 'Prep Inverted Setup',
        durationSeconds: 20,
        targetWaterGrams: 0,
        description: 'Set AeroPress upside down with plunger set at marker 4. Rinse paper filter in cap.',
        tip: 'Preheat the chamber with hot water.'
      },
      {
        id: 2,
        title: 'Rapid Pour & Stir',
        durationSeconds: 30,
        targetWaterGrams: 224,
        description: 'Add ground coffee and pour all 224g of water in 15 seconds. Stir vigorously 5-6 times with paddle.',
        tip: 'Vigorous agitation unlocks heavy body.'
      },
      {
        id: 3,
        title: 'Steep Under Cap',
        durationSeconds: 50,
        targetWaterGrams: 224,
        description: 'Fasten filter cap tightly. Let steep undisturbed until timer reaches 1:40.',
        tip: 'Slightly cooler water (88°C) prevents harsh astringency.'
      },
      {
        id: 4,
        title: 'Flip & Steady Press',
        durationSeconds: 30,
        targetWaterGrams: 224,
        description: 'Carefully flip onto cup and press gently with body weight over 25-30 seconds. Stop when you hear a hiss.',
        tip: 'Stopping at the hiss avoids extracting bitter astringent fines.'
      }
    ]
  },
  {
    id: 'french-press',
    name: 'French Press',
    icon: 'carafe',
    description: 'Full immersion brewing with metal mesh filter. Delivers unmatched syrupy mouthfeel and heavy chocolate richness.',
    defaultDose: 30,
    defaultRatio: 15, // 1:15 -> 450g water
    minRatio: 13,
    maxRatio: 16,
    grindSize: 'Coarse (Kosher Salt / Breadcrumbs)',
    grindMicrons: 1000,
    grindLevel: 'Coarse',
    waterTempC: 95,
    idealTime: '4:30 - 5:00 min',
    steps: [
      {
        id: 1,
        title: 'Add Grounds & Pre-wet',
        durationSeconds: 20,
        targetWaterGrams: 0,
        description: 'Add coarse grounds to pre-warmed press pot.',
        tip: 'Coarse grind prevents excessive silt in the cup.'
      },
      {
        id: 2,
        title: 'Fill & Crust Formation',
        durationSeconds: 40,
        targetWaterGrams: 450,
        description: 'Pour all 450g vigorously ensuring all grounds are saturated. Place plunger on top just to retain heat.',
        tip: 'Do not press plunger down yet.'
      },
      {
        id: 3,
        title: '4-Minute Steep',
        durationSeconds: 180,
        targetWaterGrams: 450,
        description: 'Let steep for 3 minutes. At 4:00, gently break the floating crust with two spoons and scoop out foam.',
        tip: 'Scooping surface foam yields a remarkably cleaner cup.'
      },
      {
        id: 4,
        title: 'Plunge & Pour Immediately',
        durationSeconds: 30,
        targetWaterGrams: 450,
        description: 'Insert plunger and press down slowly with steady pressure. Decant immediately into cups or server.',
        tip: 'Leaving coffee in the press causes bitter over-extraction.'
      }
    ]
  },
  {
    id: 'espresso',
    name: 'Specialty Espresso',
    icon: 'cup',
    description: 'High pressure (9 bar) espresso extraction resulting in thick golden crema, syrupy density, and intense flavor concentration.',
    defaultDose: 18,
    defaultRatio: 2.2, // 1:2.2 -> 40g liquid espresso yield
    minRatio: 1.8,
    maxRatio: 2.5,
    grindSize: 'Extra Fine (Powder with slight grit)',
    grindMicrons: 250,
    grindLevel: 'Fine',
    waterTempC: 93.5,
    idealTime: '26 - 30 sec',
    steps: [
      {
        id: 1,
        title: 'Dose, WDT & Tamp',
        durationSeconds: 15,
        targetWaterGrams: 0,
        description: 'Grind 18g into portafilter basket. Use WDT needle distribution tool to break clumps, then tamp level with 30 lbs pressure.',
        tip: 'A level tamp prevents high-pressure water channeling.'
      },
      {
        id: 2,
        title: 'Pre-infusion Stage',
        durationSeconds: 6,
        targetWaterGrams: 5,
        description: 'Engage pump for low-pressure (2-3 bar) pre-infusion to saturate puck uniformly.',
        tip: 'First drops appear around 5 to 7 seconds.'
      },
      {
        id: 3,
        title: 'Full 9-Bar Extraction',
        durationSeconds: 22,
        targetWaterGrams: 40,
        description: 'Ramp to 9 bar. Stream transitions from deep warm amber to hazelnut crema striping.',
        tip: 'Target 38g-40g yield at 28 seconds total time.'
      },
      {
        id: 4,
        title: 'Stir & Savor',
        durationSeconds: 10,
        targetWaterGrams: 40,
        description: 'Stir crema into the espresso shot with demitasse spoon for balanced flavor harmony from top to bottom.',
        tip: 'Sip alongside sparkling water to reset palate.'
      }
    ]
  },
  {
    id: 'cold-brew',
    name: 'Slow Drip / Cold Brew',
    icon: 'drop',
    description: '12-24 hour slow cold water extraction. Ultra sweet, chocolatey, low acidity, and remarkably smooth on ice.',
    defaultDose: 60,
    defaultRatio: 8, // 1:8 concentrate -> 480g water
    minRatio: 6,
    maxRatio: 10,
    grindSize: 'Extra Coarse (Raw Sugar crystals)',
    grindMicrons: 1200,
    grindLevel: 'Coarse',
    waterTempC: 15,
    idealTime: '12 - 16 hrs',
    steps: [
      {
        id: 1,
        title: 'Dose & Cold Water Infusion',
        durationSeconds: 30,
        targetWaterGrams: 480,
        description: 'Combine extra coarse coffee with filtered room temperature or cold water in glass brewing pitcher.',
        tip: 'Gently stir to ensure no dry pockets remain.'
      },
      {
        id: 2,
        title: 'Cold Steep (Fridge / Room Temp)',
        durationSeconds: 60,
        targetWaterGrams: 480,
        description: 'Seal and refrigerate for 14-16 hours (or 12 hours at cool room temperature).',
        tip: 'Cold extraction dissolves sweetness while leaving astringent tannins behind.'
      },
      {
        id: 3,
        title: 'Filter & Bottle Concentrate',
        durationSeconds: 30,
        targetWaterGrams: 480,
        description: 'Pass through paper or fine cloth filter into clean glass bottle. Store chilled for up to 14 days.',
        tip: 'Dilute 1:1 with iced water, tonic, or oat milk.'
      }
    ]
  }
];

export const FLAVOR_TAGS = [
  'All Profiles',
  'Floral & Jasmine',
  'Citrus & Berry',
  'Tropical Fruit',
  'Dark Chocolate',
  'Caramel & Honey',
  'Spicy & Earthy'
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'How do you prefer to brew and enjoy your coffee?',
    subtitle: 'This helps determine optimal roast level and grind solubility.',
    options: [
      {
        label: 'Black Pour Over or Chemex',
        description: 'Clean, tea-like, highlighting delicate terroir & origin aromatics',
        tag: 'PourOver',
        favors: ['ethiopia-yirgacheffe', 'colombia-huila-geisha', 'panama-boquete-esmeralda']
      },
      {
        label: 'Espresso or Rich Moka Pot',
        description: 'Concentrated, heavy crema, high body & intense extraction',
        tag: 'Espresso',
        favors: ['guatemala-antigua-medina', 'sumatra-mandheling-triple', 'kenya-nyeri-hill']
      },
      {
        label: 'Creamy Milk Drinks (Latte, Cappuccino, Flat White)',
        description: 'Needs rich cocoa/caramel backbone that cuts through steamed milk',
        tag: 'Milk',
        favors: ['guatemala-antigua-medina', 'costa-rica-tarrazu-honey', 'sumatra-mandheling-triple']
      },
      {
        label: 'French Press or Iced Cold Brew',
        description: 'Full-bodied, velvety, sweet and exceptionally smooth',
        tag: 'Immersion',
        favors: ['costa-rica-tarrazu-honey', 'yemen-mocha-matari', 'guatemala-antigua-medina']
      }
    ]
  },
  {
    id: 2,
    question: 'What flavor spectrum speaks most to your palate?',
    subtitle: 'Select the sensory notes that make your mouth water.',
    options: [
      {
        label: 'Vibrant Florals & Wild Berries',
        description: 'Jasmine blossom, bergamot, fresh blueberries, and peach nectar',
        tag: 'FloralBerry',
        favors: ['ethiopia-yirgacheffe', 'colombia-huila-geisha']
      },
      {
        label: 'Exotic Tropical Fruits & Bright Citrus',
        description: 'Passion fruit, lychee, lemongrass, and crisp pink grapefruit',
        tag: 'TropicalCitrus',
        favors: ['colombia-huila-geisha', 'kenya-nyeri-hill', 'panama-boquete-esmeralda']
      },
      {
        label: 'Decadent Dark Chocolate, Toffee & Praline',
        description: 'Velvety cacao nibs, roasted almonds, brown sugar, and maple',
        tag: 'ChocNutty',
        favors: ['guatemala-antigua-medina', 'costa-rica-tarrazu-honey']
      },
      {
        label: 'Complex Dried Fruits, Fig, Wood & Exotic Spices',
        description: 'Dates, black cardamom, cedar, molasses, and pomegranate wine',
        tag: 'SpiceEarthy',
        favors: ['yemen-mocha-matari', 'sumatra-mandheling-triple']
      }
    ]
  },
  {
    id: 3,
    question: 'How do you like your coffee body & acidity profile?',
    subtitle: 'From sparkling bright and crisp to heavy syrupy velvet.',
    options: [
      {
        label: 'Sparkling Acidity & Light Silky Body',
        description: 'Juicy, dynamic, wine-like clarity that refreshes every sip',
        tag: 'HighAcidity',
        favors: ['ethiopia-yirgacheffe', 'colombia-huila-geisha', 'kenya-nyeri-hill']
      },
      {
        label: 'Harmonious Sweet Balance',
        description: 'Mellow citric sweetness, honeyed roundness, smooth finish',
        tag: 'Balanced',
        favors: ['costa-rica-tarrazu-honey', 'panama-boquete-esmeralda']
      },
      {
        label: 'Heavy Syrupy Body & Low Acidity',
        description: 'Thick, creamy, lingering cacao finish with deep comfort',
        tag: 'HeavyBody',
        favors: ['sumatra-mandheling-triple', 'guatemala-antigua-medina', 'yemen-mocha-matari']
      }
    ]
  },
  {
    id: 4,
    question: 'What is your specialty coffee experience level?',
    subtitle: 'So we can tailor brewing gear and tasting guidance for you.',
    options: [
      {
        label: 'Curious Enthusiast',
        description: 'I love delicious coffee and want to explore specialty origins with easy guides',
        tag: 'Beginner',
        favors: ['costa-rica-tarrazu-honey', 'ethiopia-yirgacheffe']
      },
      {
        label: 'Home Barista Aficionado',
        description: 'I grind fresh daily, own scales/drippers, and love dialing in extraction',
        tag: 'Intermediate',
        favors: ['colombia-huila-geisha', 'kenya-nyeri-hill']
      },
      {
        label: 'Sensory Cupper & Geisha Hunter',
        description: 'I seek 90+ SCA micro-lots, anaerobic ferments, and rare cultivars',
        tag: 'Pro',
        favors: ['panama-boquete-esmeralda', 'colombia-huila-geisha', 'yemen-mocha-matari']
      }
    ]
  }
];
