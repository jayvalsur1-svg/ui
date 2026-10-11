export interface WebsiteRequestFormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessCategory: string;
  preferredDesignStyle: string;
  requiredPages: string[];
  requiredFeatures: string[];
  budgetRange: string;
  expectedDeadline: string;
  additionalRequirements: string;
}

export interface BrutalProduct {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: 'Hoodies' | 'Tees' | 'Accessories' | 'Headwear';
  sizes: ('S' | 'M' | 'L' | 'XL')[];
  image: string;
  badge?: string;
  description: string;
  inStock: boolean;
}

export interface CartItem {
  product: BrutalProduct;
  selectedSize: string;
  quantity: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  genre: string;
  plays: string;
}

export interface FitnessProgram {
  id: string;
  title: string;
  category: 'HIIT' | 'Hypertrophy' | 'Mobility' | 'Calisthenics';
  durationWeeks: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  caloriesBurnedAvg: number;
  image: string;
  highlight: string;
}
