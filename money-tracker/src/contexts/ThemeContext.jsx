import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark);
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newDarkState = !prev;
      
      try {
        localStorage.setItem('theme', newDarkState ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newDarkState);
      } catch (error) {
        console.error('Failed to save theme:', error);
      }
      
      return newDarkState;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
