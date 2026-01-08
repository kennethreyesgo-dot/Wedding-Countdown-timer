
import { Theme, WeddingConfig } from './types';

export const DEFAULT_CONFIG: WeddingConfig = {
  partner1: 'Mai',
  partner2: 'Ken',
  weddingDate: '2026-01-24T09:30:00.000',
  theme: Theme.ROMANTIC_ROSE,
  backgroundImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920',
  showQuote: false,
  message: ''
};

export const THEMES = {
  [Theme.CLASSIC_WHITE]: {
    bg: 'bg-stone-50',
    overlay: 'bg-white/40',
    text: 'text-stone-800',
    accent: 'text-stone-500',
    card: 'bg-white/80 backdrop-blur-md',
    border: 'border-stone-200'
  },
  [Theme.ROMANTIC_ROSE]: {
    bg: 'bg-rose-50',
    overlay: 'bg-rose-100/30',
    text: 'text-rose-900',
    accent: 'text-rose-400',
    card: 'bg-white/70 backdrop-blur-sm',
    border: 'border-rose-100'
  },
  [Theme.BOHO_CHIC]: {
    bg: 'bg-orange-50',
    overlay: 'bg-orange-100/20',
    text: 'text-stone-700',
    accent: 'text-orange-400',
    card: 'bg-white/60 backdrop-blur-md',
    border: 'border-orange-100'
  },
  [Theme.ELEGANT_NAVY]: {
    bg: 'bg-slate-900',
    overlay: 'bg-slate-900/50',
    text: 'text-white',
    accent: 'text-slate-300',
    card: 'bg-slate-800/40 backdrop-blur-md',
    border: 'border-slate-700'
  },
  [Theme.GARDEN_GREEN]: {
    bg: 'bg-emerald-50',
    overlay: 'bg-emerald-100/20',
    text: 'text-emerald-900',
    accent: 'text-emerald-500',
    card: 'bg-white/80 backdrop-blur-md',
    border: 'border-emerald-100'
  }
};
