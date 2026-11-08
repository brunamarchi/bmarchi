import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/bodoni-moda/400.css';
import '@fontsource/bodoni-moda/400-italic.css';
import '@fontsource/dm-mono/300.css';
import '@fontsource/dm-mono/400.css';
import '@fontsource/source-serif-4/400.css';
import '@fontsource/source-serif-4/400-italic.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/archivo/600.css';
import '@fontsource/archivo/700.css';
import '@fontsource/archivo/800.css';
import '@fontsource/source-serif-4/600.css';
import './poster.css';
import './magazine.css';
import { Poster } from './Poster';

export function mount(root: HTMLElement) {
  createRoot(root).render(
    <StrictMode>
      <Poster />
    </StrictMode>,
  );
}
