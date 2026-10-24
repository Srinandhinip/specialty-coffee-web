export type RoastLevel = 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';

export type ProcessMethod = 'Washed' | 'Natural' | 'Honey' | 'Anaerobic Washed' | 'Wet-Hulled';

export type Continent = 'Africa' | 'Latin America' | 'Asia-Pacific' | 'Middle East';

export interface FlavorProfile {
  acidity: number;      // 1-10
  sweetness: number;    // 1-10
  body: number;         // 1-10
  floral: number;       // 1-10
  fruity: number;       // 1-10
  cocoaNutty: number;   // 1-10
}

export interface CoffeeBean {
  id: string;
  name: string;
  origin: string;
  region: string;
  country: string;
  continent: Continent;
  farm: string;
  variety: string;
  elevation: string;
  process: ProcessMethod;
  roastLevel: RoastLevel;
  scaScore: number;
  tastingNotes: string[];
  description: string;
  price: number;
  weight: string; // e.g. "250g"
  color: string; // Accent theme color
  profile: FlavorProfile;
  recommendedBrew: string;
  harvestDate: string;
  inStock: boolean;
  featured?: boolean;
}

export interface BrewStep {
  id: number;
  title: string;
  durationSeconds: number;
  targetWaterGrams: number;
  description: string;
  tip?: string;
}

export interface BrewMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  defaultDose: number;      // grams
  defaultRatio: number;     // e.g. 15 for 1:15
  minRatio: number;
  maxRatio: number;
  grindSize: string;
  grindMicrons: number;
  grindLevel: 'Fine' | 'Medium-Fine' | 'Medium' | 'Medium-Coarse' | 'Coarse';
  waterTempC: number;
  idealTime: string;
  steps: BrewStep[];
}

export interface CustomBlendItem {
  beanId: string;
  percentage: number;
}

export interface CustomBlend {
  name: string;
  beans: { bean: CoffeeBean; percentage: number }[];
  roastLevel: RoastLevel;
  flavorNotes: string[];
  packageColor: string;
  grindType: string;
  price: number;
  weight: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  beanId?: string;
  isCustomBlend?: boolean;
  name: string;
  origin?: string;
  roastLevel?: RoastLevel;
  grind: string;
  weight: string;
  price: number;
  quantity: number;
  customDetails?: {
    components: string;
    packageColor: string;
  };
}

export interface QuizAnswer {
  brewMethod?: string;
  milkPreference?: string;
  flavorPreference?: string;
  roastPreference?: string;
}
