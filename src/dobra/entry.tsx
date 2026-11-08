import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/archivo/800.css';
import './dobra.css';
import { Dobra } from './Dobra';

export function mount(root: HTMLElement) {
  createRoot(root).render(
    <StrictMode>
      <Dobra />
    </StrictMode>,
  );
}
