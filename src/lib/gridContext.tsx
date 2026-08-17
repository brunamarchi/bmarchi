import { createContext, useContext, useState, type ReactNode } from 'react';

interface GridContextValue {
  visible: boolean;
  toggle: () => void;
}

const GridContext = createContext<GridContextValue | null>(null);

export function GridProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <GridContext.Provider value={{ visible, toggle: () => setVisible((v) => !v) }}>
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  const ctx = useContext(GridContext);
  if (!ctx) throw new Error('useGrid must be used within GridProvider');
  return ctx;
}
