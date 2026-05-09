import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

// Define o atributo do tema imediatamente (antes da renderização) para evitar o efeito de flash
function getInitialDark() {
  try {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getInitialDark);

  // Aplicar o tema a <html> sempre que houver uma alteração
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  // Define também imediatamente no mount para que as variáveis CSS estejam corretas antes do primeiro render
  useState(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  });

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
