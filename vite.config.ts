import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base relativa: funciona em GitHub Pages de projeto (usuario.github.io/repo/)
// sem precisar saber o nome do repositório em build time. Se o site for
// publicado na raiz de um domínio próprio, defina VITE_BASE_PATH=/ no build.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? './',
});
