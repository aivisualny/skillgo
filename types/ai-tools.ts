export interface AITool {
  id: string;
  name: string;
  description: string;
  category: 'image' | 'video' | 'multimodal';
  platform: string[];
  url: string;
  features: string[];
  pricing: 'free' | 'paid' | 'freemium';
  community?: {
    platform: string;
    url: string;
  }[];
  tutorials?: {
    title: string;
    url: string;
  }[];
}

export interface AIToolCategory {
  id: string;
  name: string;
  description: string;
  tools: AITool[];
} 