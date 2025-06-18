export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  platforms: Platform[];
  popularity: number;
  imageUrl: string;
  tutorialUrl?: string;
  features: string[];
  pricing: Pricing;
  tags: string[];
}

export interface Platform {
  name: 'Windows' | 'macOS' | 'Linux' | 'iOS' | 'Android' | 'Web';
  url?: string;
}

export interface Pricing {
  type: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  price?: number;
  currency?: string;
}

export interface SearchResult {
  tools: Tool[];
  total: number;
  category: string;
} 