import React from 'react';
import { useTheme } from '../components/ThemeContext';
import { Card, Button, Input } from '../components/UI';
import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { ColorTheme } from '../types';

export const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode, colorTheme, setColorTheme } = useTheme();

  const themes: { id: ColorTheme; label: string; color: string }[] = [
    { id: 'teal', label: 'Mint Teal', color: '#14b8a6' },
    { id: 'blue', label: 'Ocean Blue', color: '#3b82f6' },
    { id: 'violet', label: 'Royal Violet', color: '#8b5cf6' },
    { id: 'rose', label: 'Rose Red', color: '#f43f5e' },
    { id: 'amber', label: 'Sunset Amber', color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your salon preferences and application appearance.</p>
      </div>

      {/* Appearance Section */}
      <Card>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
        
        {/* Dark Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Theme Preference</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose between light and dark mode for your dashboard.</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
            <button 
              onClick={() => isDarkMode && toggleDarkMode()}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${!isDarkMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Sun className="h-4 w-4" /> Light
            </button>
            <button 
              onClick={() => !isDarkMode && toggleDarkMode()}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Moon className="h-4 w-4" /> Dark
            </button>
          </div>
        </div>

        {/* Color Theme Selector */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Accent Color</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Select a primary color for buttons, links, and highlights.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setColorTheme(t.id)}
                className={`
                  relative flex items-center justify-between p-3 rounded-xl border transition-all
                  ${colorTheme === t.id 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: t.color }}></div>
                  <span className={`text-sm font-medium ${colorTheme === t.id ? 'text-primary-900 dark:text-primary-100' : 'text-gray-700 dark:text-gray-300'}`}>
                    {t.label}
                  </span>
                </div>
                {colorTheme === t.id && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-600 text-white rounded-full p-1 shadow-sm">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Account Settings (Mock) */}
      <Card>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Salon Details</h2>
        <div className="space-y-4 max-w-lg">
          <Input label="Salon Name" defaultValue="MintSalon" />
          <div className="grid grid-cols-2 gap-4">
             <Input label="Contact Phone" defaultValue="(555) 123-4567" />
             <Input label="Contact Email" defaultValue="hello@mintsalon.com" />
          </div>
          <Input label="Address" defaultValue="123 Styling Ave, New York, NY" />
          
          <div className="pt-4 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
