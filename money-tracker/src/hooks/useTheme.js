import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Khi component mount, kiểm tra theme đã lưu trong localStorage
  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  // Nghe khi localStorage thay đổi từ tab/component khác
  useEffect(() => {
    const handleStorageChange = () => {
      const theme = localStorage.getItem('theme');
      if (theme) {
        setIsDark(theme === 'dark');
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newDarkState = !prev;
      localStorage.setItem('theme', newDarkState ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newDarkState);
      window.dispatchEvent(new Event('storage'));
      return newDarkState;
    });
  };

  return { isDark, toggleTheme, mounted };
}