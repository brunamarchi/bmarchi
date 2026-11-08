# Bruna Marchi — designer editorial e editora de arte

**→ [brunamarchi.github.io/bmarchi](https://brunamarchi.github.io/bmarchi/)** · [LinkedIn](https://www.linkedin.com/in/bruna-marchi-91300232/) · [Behance](https://www.behance.net/brunamarchi_br)

Meu portfólio: livros didáticos (PNLD, ENEM, vestibulares), livros infantis e literários, capas, materiais de marca e sites. Desenhado e construído por mim, com a mesma lógica de grid e hierarquia que uso na página impressa.

*Editorial designer and art editor — textbooks, children’s and literary books, covers, brand publications and websites. Remote from Brazil. Site in Portuguese and English (`?lang=en`).*

---

React + TypeScript + Vite + GSAP, bilíngue (PT/EN, arquitetura pronta para ES), publicado no GitHub Pages.

Conceito: **entre método e expressão**. Fonte de verdade do conteúdo/direção de arte está no pacote `CLAUDE_MASTER_PROMPT.md` / `CONTENT_BASE.md` / `DESIGN_SYSTEM.md` usado para gerar este projeto.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  data/          # profile.ts, projects.ts, timeline.ts — conteúdo estruturado, sem texto solto em componentes
  i18n/          # pt.ts, en.ts (ativos), es.ts (estrutura pronta, ver instruções no arquivo), types.ts, index.tsx (provider)
  styles/        # tokens.css (design tokens), global.css
  hooks/         # useReducedMotion, useGsapReveal, useGsapStagger
  lib/           # gsap.ts (registro de plugins), gridContext.tsx (estado do grid overlay)
  components/
    layout/      # Header, GridOverlay
    sections/    # Cover, Intro, CaseStudies, Archive, About, Contact
```

## Como substituir um placeholder editorial

Placeholders aparecem como `[CONTEÚDO A CONFIRMAR]` / `[CONTENT TO CONFIRM]` (texto) ou como blocos tracejados com legenda (imagens/capas — ex: "Case visual em preparação", "Fotografia a confirmar", "Capa a confirmar"). Eles existem porque o pacote de conteúdo original marcou esses dados como não confirmados — não foram inventados.

- **Textos** (bio, resumos de projeto, contato): edite diretamente em `src/i18n/pt.ts` e `src/i18n/en.ts`, ou em `src/data/profile.ts` (`profile.contact`).
- **Imagens de projeto**: adicione arquivos em `src/assets/` (crie a pasta) ou `public/`, depois preencha o array `assets` do projeto em `src/data/projects.ts` com `{ src, alt, type }`. Troque o bloco `.placeholder` correspondente em `SelectedWork.tsx` por um `<img>` usando esse array quando o primeiro asset real chegar.
- **Foto do About**: substitua o `<div className={styles.photo}>{t.about.photoPlaceholder}</div>` em `About.tsx` por uma tag `<img>`.
- **Capas da Trajetória**: preencha `cover: { src, alt }` em `src/data/timeline.ts` e ajuste `Trajectory.tsx` para renderizar `<img>` quando `entry.cover` existir.

## Como adicionar um novo projeto

Adicione um objeto ao array `projects` em `src/data/projects.ts`, seguindo o tipo `PortfolioProject`. Ele aparece automaticamente na seção "Selected Work" (03). Não invente cliente, ano, papel ou resultado — use `'[CONTEÚDO A CONFIRMAR]'` até ter certeza.

## Como editar traduções

PT e EN vivem em `src/i18n/pt.ts` e `src/i18n/en.ts`, seguindo o mesmo formato tipado (`src/i18n/types.ts`). Qualquer chave nova precisa ser adicionada nos três lugares (`types.ts`, `pt.ts`, `en.ts`) para o TypeScript continuar validando.

**Espanhol**: a estrutura está pronta mas inativa (ver `src/i18n/es.ts` para o passo a passo de ativação). Não foi preenchida com traduções não revisadas.

## Grid overlay (easter egg)

Botão "⊞ Mostrar grid" no header (`src/components/layout/Header.tsx` + `GridOverlay.tsx`) revela as colunas reais do layout (12 desktop / 8 tablet / 4 mobile via `--grid-columns` em `tokens.css`). Não bloqueia interação e funciona em qualquer seção, incluindo "Fora da margem" (09), que inverte o esquema de cores como ruptura conceitual do grid.

## Acessibilidade e motion

- Skip link para o conteúdo principal.
- `lang` do `<html>` muda dinamicamente com o idioma selecionado.
- Toda animação GSAP/ScrollTrigger é desativada (estado final aplicado sem transição) quando `prefers-reduced-motion: reduce`, tanto via JavaScript (`useReducedMotion`) quanto via regra CSS global de segurança em `global.css`.
- Cores de texto secundário (`--color-ink-faint`, `--color-ink-soft`) calibradas para >= 4.5:1 de contraste (WCAG AA) em modo claro e escuro.

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy.yml` já está configurado: qualquer push em `main` builda o projeto e publica em GitHub Pages via Actions (sem precisar de branch `gh-pages` manual).

Passos:

1. Crie o repositório no GitHub e suba este projeto (`git remote add origin ...` / `git push -u origin main`).
2. No GitHub, vá em **Settings → Pages** e defina **Source: GitHub Actions**.
3. O `base` do Vite é relativo (`./`) por padrão — funciona tanto em `usuario.github.io/repo/` quanto (se configurado) num domínio próprio. Para forçar um base específico, defina a variável de ambiente `VITE_BASE_PATH` no workflow.
4. Depois do primeiro deploy, atualize `<link rel="canonical">`, `og:url` e `Sitemap:` (em `index.html`, `public/robots.txt`, `public/sitemap.xml`) com a URL final.

## Dados ainda pendentes (ver auditoria original)

- Fotografia da Bruna, capas/spreads reais dos projetos listados.
- E-mail, LinkedIn e Behance definitivos (`src/data/profile.ts`).
- Cor de acento editorial (`--color-accent` em `src/styles/tokens.css`, hoje herdando `--color-ink` de propósito).
- Trajetória anterior a 2024 (datas/cargos não confirmados — ver `priorHistoryOrganizations` em `src/data/timeline.ts`).
