
import React, { useState } from 'react';
import { WeddingConfig, Theme } from '../types';

interface SettingsPanelProps {
  config: WeddingConfig;
  onSave: (config: WeddingConfig) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ config, onSave, onClose }) => {
  const [formData, setFormData] = useState<WeddingConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleThemeChange = (theme: Theme) => {
    setFormData(prev => ({ ...prev, theme }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 overflow-y-auto animate-slide-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-stone-800">Wedding Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Partner 1</label>
              <input
                type="text"
                value={formData.partner1}
                onChange={e => setFormData({ ...formData, partner1: e.target.value })}
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Partner 2</label>
              <input
                type="text"
                value={formData.partner2}
                onChange={e => setFormData({ ...formData, partner2: e.target.value })}
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Wedding Date & Time</label>
            <input
              type="datetime-local"
              value={formData.weddingDate.slice(0, 16)}
              onChange={e => setFormData({ ...formData, weddingDate: new Date(e.target.value).toISOString() })}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Custom Message</label>
            <textarea
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Background Image URL</label>
            <input
              type="url"
              value={formData.backgroundImageUrl}
              onChange={e => setFormData({ ...formData, backgroundImageUrl: e.target.value })}
              className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all"
            />
            <p className="text-xs text-stone-400 mt-1">Leave blank for default</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-3">Theme Selection</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(Theme).map(theme => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => handleThemeChange(theme)}
                  className={`py-2 px-1 text-xs rounded-lg border-2 transition-all capitalize ${
                    formData.theme === theme ? 'border-rose-500 bg-rose-50' : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  {theme.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showQuote"
              checked={formData.showQuote}
              onChange={e => setFormData({ ...formData, showQuote: e.target.checked })}
              className="w-4 h-4 text-rose-500 rounded border-stone-300 focus:ring-rose-400"
            />
            <label htmlFor="showQuote" className="text-sm font-medium text-stone-600">
              Enable AI-Generated Romantic Quotes
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-stone-800 text-white py-4 rounded-xl font-medium hover:bg-stone-900 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Save Changes
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-stone-100">
          <p className="text-xs text-stone-400 text-center">
            Designed for Google Sites. Settings are saved locally.
          </p>
        </div>
      </div>
    </div>
  );
};
