
import React, { useState, useEffect } from 'react';
import { WeddingConfig, Theme } from '../types';

interface SettingsPanelProps {
  config: WeddingConfig;
  onSave: (config: WeddingConfig) => void;
  onClose: () => void;
}

type Tab = 'design' | 'share';

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ config, onSave, onClose }) => {
  const [formData, setFormData] = useState<WeddingConfig>(config);
  const [activeTab, setActiveTab] = useState<Tab>('design');
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleThemeChange = (theme: Theme) => {
    setFormData(prev => ({ ...prev, theme }));
  };

  const embedCode = `<iframe 
  src="${currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1') ? 'YOUR_LIVE_URL_HERE' : currentUrl}" 
  width="100%" 
  height="500" 
  style="border:none; border-radius: 16px; overflow:hidden;" 
  scrolling="no" 
  frameborder="0">
</iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-stone-800">Countdown Setup</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-2 border-b border-stone-100">
          <button 
            onClick={() => setActiveTab('design')}
            className={`pb-3 px-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'design' ? 'border-rose-500 text-rose-600' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            1. Design
          </button>
          <button 
            onClick={() => setActiveTab('share')}
            className={`pb-3 px-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'share' ? 'border-rose-500 text-rose-600' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            2. Host & Embed
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'design' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Partner 1</label>
                  <input
                    type="text"
                    value={formData.partner1}
                    onChange={e => setFormData({ ...formData, partner1: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Partner 2</label>
                  <input
                    type="text"
                    value={formData.partner2}
                    onChange={e => setFormData({ ...formData, partner2: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Wedding Date</label>
                <input
                  type="datetime-local"
                  value={formData.weddingDate.slice(0, 16)}
                  onChange={e => setFormData({ ...formData, weddingDate: new Date(e.target.value).toISOString() })}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">Theme</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {Object.values(Theme).map(theme => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => handleThemeChange(theme)}
                      className={`py-2 text-[10px] rounded border transition-all uppercase tracking-tighter ${
                        formData.theme === theme ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {theme.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
              >
                Apply Changes
              </button>
            </form>
          ) : (
            <div className="space-y-8">
              <section>
                <h3 className="text-sm font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px]">1</span>
                  Publish to GitHub
                </h3>
                <div className="space-y-3 pl-7">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 leading-relaxed">
                    <strong>GitHub Pages Settings:</strong>
                  </div>
                  <ul className="text-xs text-stone-500 space-y-3 list-disc ml-4">
                    <li>Go to <strong>Settings</strong> → <strong>Pages</strong></li>
                    <li><strong>Source:</strong> Select "Deploy from a branch"</li>
                    <li><strong>Branch:</strong> Select <span className="font-bold text-stone-800">main</span></li>
                    <li><strong>Folder:</strong> Select <span className="font-bold text-rose-600">/ (root)</span> <br/><span className="text-[10px] italic">(Do NOT select "docs")</span></li>
                    <li>Click <strong>Save</strong> and wait 60 seconds</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px]">2</span>
                  Embed in Google Sites
                </h3>
                <div className="pl-7 space-y-3">
                  <p className="text-xs text-stone-500">Copy this code and paste it into the <strong>Embed → Embed Code</strong> box on your Google Site.</p>
                  <div className="relative">
                    <pre className="bg-stone-900 p-4 rounded-lg text-[10px] text-stone-300 font-mono overflow-x-auto border border-stone-800 leading-normal">
                      {embedCode}
                    </pre>
                    <button
                      onClick={copyToClipboard}
                      className={`absolute top-2 right-2 px-3 py-1 rounded text-[10px] font-bold transition-all ${
                        copySuccess ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {copySuccess ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-stone-50 border-t border-stone-100">
          <p className="text-[10px] text-stone-400 text-center leading-relaxed italic">
            Tip: Your custom settings are saved in your browser. Update them anytime and re-copy the code if needed.
          </p>
        </div>
      </div>
    </div>
  );
};
