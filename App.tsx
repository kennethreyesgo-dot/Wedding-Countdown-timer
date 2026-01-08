
import React, { useState, useEffect, useCallback } from 'react';
import { WeddingConfig, TimeLeft } from './types';
import { DEFAULT_CONFIG, THEMES } from './constants';
import { CountdownDisplay } from './components/CountdownDisplay';
import { SettingsPanel } from './components/SettingsPanel';

const App: React.FC = () => {
  const [config, setConfig] = useState<WeddingConfig>(() => {
    const saved = localStorage.getItem('wedding_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const target = new Date(config.weddingDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      return;
    }

    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    });
  }, [config.weddingDate]);

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const handleSaveConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    localStorage.setItem('wedding_config', JSON.stringify(newConfig));
    setIsSettingsOpen(false);
  };

  const currentTheme = THEMES[config.theme];

  return (
    <div 
      className={`min-h-screen relative flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 ${currentTheme.bg}`}
      style={{
        backgroundImage: config.backgroundImageUrl ? `url(${config.backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={`absolute inset-0 ${currentTheme.overlay} backdrop-blur-[1px]`} />

      {/* Visible Settings Toggle */}
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className="absolute bottom-6 right-6 z-40 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white shadow-lg transition-all hover:scale-110 active:scale-95 animate-pulse-subtle"
        title="Setup & Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <main className="relative z-10 w-full max-w-4xl px-4 py-8 flex flex-col items-center text-center animate-fade-in-up">
        <div className="mb-8 md:mb-12">
          <h1 className={`text-5xl md:text-8xl font-script mb-2 drop-shadow-lg ${currentTheme.text}`}>
            {config.partner1} <span className="text-3xl md:text-5xl">&</span> {config.partner2}
          </h1>
          <p className={`text-sm md:text-xl uppercase tracking-[0.4em] font-light ${currentTheme.accent}`}>
            {new Date(config.weddingDate).toLocaleDateString(undefined, { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} — {new Date(config.weddingDate).toLocaleTimeString(undefined, {
              hour: 'numeric',
              minute: '2-digit'
            })}
          </p>
        </div>

        <CountdownDisplay timeLeft={timeLeft} theme={config.theme} />
        
        {config.message && (
          <div className="mt-12 max-w-2xl px-6">
            <p className={`text-xl md:text-2xl font-serif italic ${currentTheme.text}`}>
              "{config.message}"
            </p>
          </div>
        )}
      </main>

      {isSettingsOpen && (
        <SettingsPanel 
          config={config} 
          onSave={handleSaveConfig} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      )}

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
