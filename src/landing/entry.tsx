import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/600.css';
import '@fontsource/instrument-sans/700.css';
import './landing.css';
import { Landing } from './Landing';

export function mount(root: HTMLElement) {
  createRoot(root).render(
    <StrictMode>
      <Landing />
    </StrictMode>,
  );
}
