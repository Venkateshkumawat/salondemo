import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorTheme } from '../types';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Color Palettes (Tailwind 50-900 values in RGB)
const themes: Record<ColorTheme, Record<string, string>> = {
  teal: {
    '50': '240 253 250', '100': '204 251 241', '200': '153 246 228', '300': '94 234 212', 
    '400': '45 212 191', '500': '20 184 166', '600': '13 148 136', '700': '15 118 110', 
    '800': '17 94 89', '900': '19 78 74'
  },
  blue: {
    '50': '239 246 255', '100': '219 234 254', '200': '191 219 254', '300': '147 197 253',
    '400': '96 165 250', '500': '59 130 246', '600': '37 99 235', '700': '29 78 216',
    '800': '30 64 175', '900': '30 58 138'
  },
  violet: {
    '50': '245 243 255', '100': '237 233 254', '200': '221 214 254', '300': '196 181 253',
    '400': '167 139 250', '500': '139 92 246', '600': '124 58 237', '700': '109 40 217',
    '800': '91 33 182', '900': '76 29 149'
  },
  rose: {
    '50': '255 241 242', '100': '255 228 230', '200': '254 205 211', '300': '253 164 175',
    '400': '251 113 133', '500': '244 63 94', '600': '225 29 72', '700': '190 18 60',
    '800': '159 18 57', '900': '136 19 55'
  },
  amber: {
    '50': '255 251 235', '100': '254 243 199', '200': '253 230 138', '300': '252 211 77',
    '400': '251 191 36', '500': '245 158 11', '600': '217 119 6', '700': '180 83 9',
    '800': '146 64 14', '900': '120 53 15'
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('teal');

  // Load from local storage on mount
  useEffect(() => {
    const savedDark = localStorage.getItem('isDarkMode') === 'true';
    const savedColor = localStorage.getItem('colorTheme') as ColorTheme;
    
    setIsDarkMode(savedDark);
    if (savedColor && themes[savedColor]) {
      setColorTheme(savedColor);
    }
  }, []);

  // Apply Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', String(isDarkMode));
  }, [isDarkMode]);

  // Apply CSS Variables for Color Theme
  useEffect(() => {
    const root = document.documentElement;
    const palette = themes[colorTheme];
    
    Object.keys(palette).forEach((key) => {
      root.style.setProperty(`--color-primary-${key}`, palette[key]);
    });
    
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
