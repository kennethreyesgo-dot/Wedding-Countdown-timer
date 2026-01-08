
export enum Theme {
  CLASSIC_WHITE = 'classic-white',
  ROMANTIC_ROSE = 'romantic-rose',
  BOHO_CHIC = 'boho-chic',
  ELEGANT_NAVY = 'elegant-navy',
  GARDEN_GREEN = 'garden-green'
}

export interface WeddingConfig {
  partner1: string;
  partner2: string;
  weddingDate: string; // ISO string
  theme: Theme;
  backgroundImageUrl: string;
  showQuote: boolean;
  message: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
