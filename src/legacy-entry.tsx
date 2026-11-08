import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.tsx';

// Versões anteriores (estudos de caso, ?tema=terra, ?versao=mural, ?versao=herbario).
export function mount(root: HTMLElement, variant: 'default' | 'mural' | 'herbario') {
  if (new URLSearchParams(window.location.search).get('tema') === 'terra') {
    document.documentElement.dataset.theme = 'terra';
  }
  createRoot(root).render(
    <StrictMode>
      <App variant={variant} />
    </StrictMode>,
  );
}
