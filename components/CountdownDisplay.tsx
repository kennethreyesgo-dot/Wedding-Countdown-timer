
import React from 'react';
import { TimeLeft, Theme } from '../types';
import { THEMES } from '../constants';

interface CountdownDisplayProps {
  timeLeft: TimeLeft;
  theme: Theme;
}

const CountdownUnit: React.FC<{ value: number; label: string; theme: Theme }> = ({ value, label, theme }) => {
  const themeStyles = THEMES[theme];
  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl ${themeStyles.card} shadow-lg min-w-[80px] md:min-w-[120px] transition-all hover:scale-105 border ${themeStyles.border}`}>
      <span className={`text-3xl md:text-5xl font-serif font-bold ${themeStyles.text}`}>
        {value.toString().padStart(2, '0')}
      </span>
      <span className={`text-xs md:text-sm uppercase tracking-widest mt-1 ${themeStyles.accent}`}>
        {label}
      </span>
    </div>
  );
};

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ timeLeft, theme }) => {
  const themeStyles = THEMES[theme];

  if (timeLeft.isPast) {
    return (
      <div className={`text-center py-10 px-6 rounded-3xl ${themeStyles.card} shadow-2xl max-w-2xl mx-auto border ${themeStyles.border}`}>
        <h2 className={`text-4xl md:text-6xl font-script mb-4 ${themeStyles.text}`}>Just Married!</h2>
        <p className={`text-lg italic ${themeStyles.accent}`}>Wishing you a lifetime of love and happiness.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6 animate-fade-in">
      <CountdownUnit value={timeLeft.days} label="Days" theme={theme} />
      <CountdownUnit value={timeLeft.hours} label="Hours" theme={theme} />
      <CountdownUnit value={timeLeft.minutes} label="Minutes" theme={theme} />
      <CountdownUnit value={timeLeft.seconds} label="Seconds" theme={theme} />
    </div>
  );
};
