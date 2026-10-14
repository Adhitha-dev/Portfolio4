export type WorkCategory = 'all' | 'web' | 'sec' | 'vfx';

export interface WorkItem {
  id: string;
  category: 'web' | 'sec' | 'vfx';
  index: number;
  badge: string;
  ring: string;
  title: string;
  description: string;
  stack: string;
  actionText: string;
  accentBeacon?: string;
}
