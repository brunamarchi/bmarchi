// Camada de dados — projetos.
// Baseado em PROJECT_DATA_TEMPLATE.ts, CONTENT_BASE.md e na Experiência do
// LinkedIn dela (lida em 2026-09-17).
// Não inventar clientes, datas, cargos, números ou resultados. Ano não
// confirmado fica sem campo `year` (o site simplesmente não mostra).

import sustentabilidadeEurekaCover from '../assets/projects/sustentabilidade-eureka/cover.jpg';
import comecandoAlbertinaCover from '../assets/projects/comecando-albertina/cover.png';
import comodinesTransmediaCover from '../assets/projects/comodines-transmedia/cover.jpg';
import poemasMiudinhosCover from '../assets/projects/poemas-miudinhos/cover.png';
import depoisDoTremorCover from '../assets/projects/depois-do-tremor/cover.png';
import poliedroCover from '../assets/projects/poliedro/cover.jpg';
import josaparCover from '../assets/projects/josapar-tio-joao/cover.jpg';
import explorumCover from '../assets/projects/explorum/cover.jpg';
import shellTeamCover from '../assets/projects/shell-team/cover.jpg';
import yoyoSecreto from '../assets/projects/yoyo-books/cover-secreto.jpg';
import yoyoGalinhas from '../assets/projects/yoyo-books/cover-galinhas.jpg';
import yoyoNaFazenda from '../assets/projects/yoyo-books/cover-na-fazenda.jpg';
import yoyoAbaGalinha from '../assets/projects/yoyo-books/cover-aba-galinha.jpg';
import yoyoAbaUrso from '../assets/projects/yoyo-books/cover-aba-urso.jpg';
import yoyoResolva from '../assets/projects/yoyo-books/cover-resolva.jpg';

/** Segmentos usados no filtro de "Trabalhos" — o que um recrutador procura. */
export type ProjectSegment = 'education' | 'books' | 'institutional' | 'digital';

export const segments: ProjectSegment[] = ['education', 'books', 'institutional'];

export interface ProjectAsset {
  src: string;
  alt: string;
  type: 'cover' | 'spread' | 'detail' | 'process' | 'photo' | 'screen';
  caption?: string;
}

type Bilingual = { pt: string; en: string };

export interface PortfolioProject {
  id: string;
  title: string;
  client?: string;
  partner?: string;
  year?: string;
  segment: ProjectSegment;
  /** Tipo de peça, curto e buscável: "Livros didáticos · pré-vestibular". */
  kind: Bilingual;
  role: Bilingual;
  tools?: string[];
  summary: Bilingual;
  link?: string;
  /** false = experiência real, mas sem imagem publicável (contrato/embargo). */
  publishable: boolean;
  assets: ProjectAsset[];
}

export const projects: PortfolioProject[] = [
  {
    id: 'poliedro',
    title: 'Poliedro Educação',
    client: 'Poliedro Educação',
    year: '2024 — 2026',
    segment: 'education',
    kind: { pt: 'Livros didáticos · pré-vestibular', en: 'Textbooks · exam prep' },
    role: { pt: 'Edição de arte e diagramação', en: 'Art editing and layout' },
    tools: ['InDesign', 'WoodWing', 'MathType', 'Mathtools'],
    summary: {
      pt: 'Cadernos, apostilas, gabaritos comentados e coletâneas para ENEM, ITA, UERJ, EPCAR, Colégio Naval e ESPCEX. Fluxo de arte em WoodWing, acompanhamento de colaboradores externos e fórmulas de exatas em MathType.',
      en: 'Workbooks, course packs, annotated answer keys and compilations for ENEM, ITA, UERJ, EPCAR, Colégio Naval and ESPCEX. Art workflow in WoodWing, external contributors, and STEM formulas in MathType.',
    },
    publishable: true,
    assets: [
      { src: poliedroCover, alt: 'Cadernos Octa Mais e revisões Poliedro, Ensino Médio e Pré-Vestibular', type: 'cover' },
    ],
  },
  {
    id: 'yoyo-books',
    title: 'Yoyo Books',
    client: 'Yoyo Books',
    year: '2025',
    segment: 'books',
    kind: { pt: 'Livros infantis · livro-brinquedo', en: 'Children’s books · novelty' },
    role: { pt: 'Diagramação', en: 'Layout' },
    summary: {
      pt: 'Coleções infantis para o Brasil: livros de abas, toque e sinta, com quebra-cabeça de madeira, caneta de tinta invisível e “resolva, apague e refaça”.',
      en: 'Children’s collections for Brazil: lift-the-flap, touch-and-feel, wooden-puzzle, invisible-ink pen and wipe-clean books.',
    },
    publishable: true,
    assets: [
      { src: yoyoNaFazenda, alt: '"Na Fazenda", livro toque e sinta com quebra-cabeça de madeira', type: 'cover' },
      { src: yoyoSecreto, alt: '"Minha Caneta Espiã" e "Minha Caneta Secreta", livros com caneta de tinta invisível', type: 'cover' },
      { src: yoyoGalinhas, alt: '"Galinha e seus amigos", primeiro livro e quebra-cabeça de madeira', type: 'cover' },
      { src: yoyoAbaGalinha, alt: '"Levante a aba e descubra — Fazenda", exemplar impresso', type: 'photo' },
      { src: yoyoAbaUrso, alt: 'Livro de abas "Levante a aba e descubra", exemplar impresso', type: 'photo' },
      { src: yoyoResolva, alt: '"Resolva, apague e refaça" — Adição e subtração, e Tabuada', type: 'cover' },
    ],
  },
  {
    id: 'comecando-albertina',
    title: 'Começando Albertina',
    client: 'Editacuja',
    segment: 'books',
    kind: { pt: 'Livro · capa, caixa e miolo', en: 'Book · cover, slipcase, interior' },
    role: { pt: 'Projeto gráfico completo', en: 'Full graphic design' },
    summary: {
      pt: 'Capa, caixa e abertura do livro de Deise Abreu Pacheco (“nossa vida no armário nos anos 90”), com conceito visual de fita cassete.',
      en: 'Cover, slipcase and opening spread for Deise Abreu Pacheco’s book, built around a cassette-tape concept.',
    },
    publishable: true,
    assets: [
      { src: comecandoAlbertinaCover, alt: 'Capa, caixa e contracapa de "Começando Albertina", editora Editacuja', type: 'cover' },
    ],
  },
  {
    id: 'explorum',
    title: 'Explorum — Educação Digital',
    client: 'Explorum',
    year: '2026',
    segment: 'education',
    kind: { pt: 'Guias digitais · educação', en: 'Digital guides · education' },
    role: { pt: 'Diagramação', en: 'Layout' },
    summary: {
      pt: 'Cliente recorrente. Guias digitais de educação — o mais recente sobre IA na Educação (2026).',
      en: 'Recurring client. Digital education guides — most recently on AI in Education (2026).',
    },
    publishable: true,
    assets: [
      { src: explorumCover, alt: 'Capas da Coleção Explorum, Livro do Aluno, Gaudí Editorial', type: 'cover' },
    ],
  },
  {
    id: 'comodines-transmedia',
    title: 'Los Comodines de Transmedia',
    client: 'Editacuja',
    partner: 'MinTIC / Proexport Colômbia',
    segment: 'books',
    kind: { pt: 'Kit editorial · livro + cartas', en: 'Editorial kit · book + cards' },
    role: { pt: 'Design gráfico', en: 'Graphic design' },
    summary: {
      pt: 'Kit em caixa (livro-guia + baralho) sobre transmídia para o mercado editorial, em espanhol, para a Colômbia. Crédito de design gráfico na ficha técnica.',
      en: 'Boxed kit (guidebook + card deck) on transmedia for the publishing industry, in Spanish, for Colombia. Graphic design credited on the colophon.',
    },
    publishable: true,
    assets: [
      { src: comodinesTransmediaCover, alt: 'Caixa e cartas do kit "Los Comodines de Transmedia", com crédito de design gráfico de Bruna Marchi', type: 'cover' },
    ],
  },
  {
    id: 'sustentabilidade-eureka',
    title: 'Sustentabilidade — Livro do Educador',
    client: 'Grupo Eureka',
    segment: 'education',
    kind: { pt: 'Capas · coleção didática', en: 'Covers · textbook series' },
    role: { pt: 'Design de capa', en: 'Cover design' },
    summary: {
      pt: 'Capas da coleção em 3 volumes: Educação Infantil, 1º–2º e 3º–5º ano do Fundamental.',
      en: 'Covers for a 3-volume series: early childhood, grades 1–2 and 3–5.',
    },
    publishable: true,
    assets: [
      { src: sustentabilidadeEurekaCover, alt: 'Capas da coleção Sustentabilidade, Grupo Eureka, volumes 1 a 3', type: 'cover' },
    ],
  },
  {
    id: 'josapar-tio-joao',
    title: 'Arroz Tio João',
    client: 'Josapar',
    year: '2024',
    segment: 'institutional',
    kind: { pt: 'Livreto de marca · receitas', en: 'Brand booklet · recipes' },
    role: { pt: 'Capa, guardas e diagramação', en: 'Cover, endpapers and layout' },
    summary: {
      pt: 'Livreto institucional “para cozinhar e encantar!” para a marca Tio João — design editorial a serviço de uma marca de consumo.',
      en: 'Institutional booklet for the Tio João rice brand — editorial design in service of a consumer brand.',
    },
    publishable: true,
    assets: [
      { src: josaparCover, alt: 'Capa do livreto "Arroz Tio João — para cozinhar e encantar!"', type: 'cover' },
    ],
  },
  {
    id: 'poemas-miudinhos',
    title: 'Poemas Miudinhos',
    client: 'Caramelo',
    segment: 'books',
    kind: { pt: 'Capa · livro infantil', en: 'Cover · children’s book' },
    role: { pt: 'Design de capa', en: 'Cover design' },
    summary: {
      pt: 'Poemas de Neusa Sorrenti, ilustrações de Gabriela Gil.',
      en: 'Poems by Neusa Sorrenti, illustrations by Gabriela Gil.',
    },
    publishable: true,
    assets: [
      { src: poemasMiudinhosCover, alt: 'Capa de "Poemas Miudinhos — para brincar e ritmar", editora Caramelo', type: 'cover' },
    ],
  },
  {
    id: 'depois-do-tremor',
    title: 'Depois do Tremor',
    segment: 'books',
    kind: { pt: 'Capa · literatura', en: 'Cover · literary' },
    role: { pt: 'Design de capa', en: 'Cover design' },
    summary: {
      pt: 'Jean Portante, tradução de Maria João Cantinho.',
      en: 'Jean Portante, translated by Maria João Cantinho.',
    },
    publishable: true,
    assets: [
      { src: depoisDoTremorCover, alt: 'Capa de "Depois do Tremor", de Jean Portante', type: 'cover' },
    ],
  },

  // --- Sem imagem publicável: aparecem como lista compacta -----------------
  {
    id: 'editora-do-brasil',
    title: 'Editora do Brasil',
    client: 'Editora do Brasil',
    year: '2023 — 2026',
    segment: 'education',
    kind: { pt: 'Livros didáticos · PNLD', en: 'Textbooks · PNLD' },
    role: { pt: 'Edição de arte', en: 'Art editing' },
    tools: ['InDesign', 'WoodWing'],
    summary: {
      pt: 'Edição de arte de livros para o PNLD: fluxo de arte em WoodWing, ilustradores e estúdios externos, projeto gráfico e especificações do edital. Material sob contrato — sem imagens.',
      en: 'Art editing of PNLD textbooks: WoodWing art workflow, external illustrators and studios, design system and public-tender specs. Under contract — no images.',
    },
    publishable: false,
    assets: [],
  },
  {
    id: 'ingles-mackenzie',
    title: 'Coleção Inglês Mackenzie',
    partner: 'Lotus Estúdio',
    year: '2025',
    segment: 'education',
    kind: { pt: 'Coleção didática · inglês', en: 'Textbook series · English' },
    role: { pt: 'Diagramação', en: 'Layout' },
    summary: { pt: 'Diagramação de coleção didática de inglês.', en: 'Layout of an English-language textbook series.' },
    publishable: true,
    assets: [],
  },
  {
    id: 'mentalidades-matematicas',
    title: 'Mentalidades Matemáticas',
    client: 'Mentalidades Matemáticas',
    year: '2024 — 2025',
    segment: 'institutional',
    kind: { pt: 'Relatório anual', en: 'Annual report' },
    role: { pt: 'Diagramação', en: 'Layout' },
    summary: { pt: 'Relatórios de atividades 2024 e 2025. Cliente recorrente.', en: 'Activity reports for 2024 and 2025. Recurring client.' },
    publishable: true,
    assets: [],
  },
];

/** Projetos digitais (sites e interfaces) — repositórios em github.com/brunamarchi. */
export const digitalProjects: PortfolioProject[] = [
  {
    id: 'shell-team',
    title: 'Shell Team Jiu-Jitsu',
    client: 'Shell Team · Florianópolis',
    year: '2026',
    segment: 'digital',
    kind: { pt: 'Site · academia e livro infantil', en: 'Website · gym and children’s book' },
    role: { pt: 'Design e construção do site', en: 'Site design and build' },
    tools: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    summary: {
      pt: 'Site da academia com aulas, grade de horários interativa, área Shell Kids (jogos e desenhos para colorir) e página de pré-venda do livro O Cinturão de Ouro.',
      en: 'Gym website with classes, an interactive timetable, a Shell Kids area (games and colouring pages) and a pre-sale page for the book O Cinturão de Ouro.',
    },
    link: 'https://brunamarchi.github.io/shell-team/',
    publishable: true,
    assets: [
      { src: shellTeamCover, alt: 'Página inicial do site Shell Team, área Kids: ilustração da mestra de kimono e título "Cair, levantar e tentar de novo"', type: 'screen' },
    ],
  },
  {
    id: 'primepork',
    title: 'Prime Pork',
    client: 'Prime Pork',
    year: '2026',
    segment: 'digital',
    kind: { pt: 'App web · controle de estoque', en: 'Web app · inventory' },
    role: { pt: 'Design de interface e construção', en: 'Interface design and build' },
    tools: ['React', 'Tailwind', 'Supabase'],
    summary: {
      pt: 'Sistema mobile-first para um pequeno produtor: estoque, compras de matéria-prima, pedidos por cliente e mapa de clientes. Uso interno, com login.',
      en: 'Mobile-first system for a small food producer: stock, raw-material purchases, orders per client and a client map. Internal use, behind login.',
    },
    publishable: true,
    assets: [],
  },
];
