import React, { createContext, useState, useEffect } from 'react';

// Export Context để components có thể dùng trực tiếp
export const ThemeContext = createContext();

// Provider component
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // BƯỚC 1: Khi app start - Load từ localStorage
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

  // BƯỚC 3: Khi thay đổi - Update Context + localStorage
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
