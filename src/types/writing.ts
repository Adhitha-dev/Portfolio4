export type WritingCategory = 'all' | 'systems' | 'consensus' | 'crypto' | 'graphics';

export interface DispatchItem {
  id: string;
  category: 'systems' | 'consensus' | 'crypto' | 'graphics';
  orbit: string;
  episode: string;
  date: string;
  readTime?: string;
  title: string;
  excerpt: string;
  targetOrScheme: string;
  attestationOrMetric: string;
  glyph: 'systems' | 'consensus' | 'crypto' | 'graphics' | 'systems-alt' | 'crypto-alt';
  fullContent?: string;
  specs?: { label: string; value: string }[];
}
