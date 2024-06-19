import { useState, useEffect } from 'react';

export const useColorMode = () => {
  const [colorMode, setColorMode] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue('--initial-color-mode');
    setColorMode(initialColorValue || 'light');
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (colorMode === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return { colorMode, toggleColorMode };
};
