// Camada de dados — projetos.
// Baseado em PROJECT_DATA_TEMPLATE.ts e CONTENT_BASE.md.
// Não inventar clientes, datas, cargos, números ou resultados.
// Onde faltar confirmação, usar '[CONTEÚDO A CONFIRMAR]' / '[CONTENT TO CONFIRM]'.

import sustentabilidadeEurekaCover from '../assets/projects/sustentabilidade-eureka/cover.jpg';
import comecandoAlbertinaCover from '../assets/projects/comecando-albertina/cover.png';
import comodinesTransmediaCover from '../assets/projects/comodines-transmedia/cover.jpg';
import poemasMiudinhosCover from '../assets/projects/poemas-miudinhos/cover.png';
import depoisDoTremorCover from '../assets/projects/depois-do-tremor/cover.png';

export type ProjectCategory =
  | 'pnld'
  | 'education'
  | 'assessment'
  | 'children'
  | 'institutional'
  | 'commercial'
  | 'digital'
  | 'magazine'
  | 'literary';

export interface ProjectAsset {
  src: string;
  alt: string;
  type: 'cover' | 'spread' | 'detail' | 'process' | 'photo';
  caption?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client?: string;
  partner?: string;
  year?: string;
  category: ProjectCategory[];
  role: string[];
  tools?: string[];
  summary?: {
    pt: string;
    en: string;
  };
  scope?: string;
  publishable: boolean;
  featured: boolean;
  assets: ProjectAsset[];
}

export const projects: PortfolioProject[] = [
  {
    id: 'poliedro',
    title: 'Poliedro Educação',
    client: 'Poliedro Educação',
    year: '2024 — atual',
    category: ['education', 'assessment'],
    role: ['Design editorial', 'Diagramação'],
    tools: ['Adobe InDesign', 'WoodWing'],
    summary: {
      pt: 'Materiais para ENEM, ITA, UERJ, EPCAR, Colégio Naval, ESPCEX, OCM, cadernos, gabaritos comentados, apostilas e coletâneas de vestibular. Atuação PJ/freelance contínua, com fluxo em Asana e WoodWing DAM.',
      en: 'Materials for ENEM, ITA, UERJ, EPCAR, Colégio Naval, ESPCEX, OCM, workbooks, annotated answer keys, course packs and entrance-exam compilations. Ongoing freelance work, with workflow in Asana and WoodWing DAM.',
    },
    scope: 'Precisão, escala, consistência e prazo',
    publishable: true,
    featured: true,
    assets: [],
  },
  {
    id: 'yoyo-books',
    title: 'Yoyo Books',
    client: 'Yoyo Books',
    year: '2025',
    category: ['children'],
    role: ['Diagramação'],
    summary: {
      pt: 'Coleções de livros infantis.',
      en: 'Children’s book collections.',
    },
    publishable: true,
    featured: true,
    assets: [],
  },
  {
    id: 'ingles-mackenzie',
    title: 'Coleção Inglês Mackenzie',
    partner: 'Lotus Estúdio',
    year: 'jul/2025',
    category: ['education'],
    role: ['Diagramação'],
    summary: {
      pt: 'Diagramação de coleção didática de inglês.',
      en: 'Layout of an English-language teaching collection.',
    },
    publishable: true,
    featured: false,
    assets: [],
  },
  {
    id: 'explorum',
    title: 'Explorum — Educação Digital',
    client: 'Explorum',
    year: '2026',
    category: ['digital', 'education'],
    role: ['Diagramação de guias digitais'],
    summary: {
      pt: 'Cliente recorrente. Projeto recente: guia sobre IA na Educação (2026). Diagramação de guias digitais.',
      en: 'Recurring client. Recent project: a guide on AI in Education (2026). Layout of digital guides.',
    },
    publishable: true,
    featured: false,
    assets: [],
  },
  {
    id: 'mentalidades-matematicas',
    title: 'Mentalidades Matemáticas',
    client: 'Mentalidades Matemáticas',
    year: '2024 — 2025',
    category: ['institutional'],
    role: ['Diagramação de relatório institucional/anual'],
    summary: {
      pt: 'Relatórios de atividades 2024 e 2025. Cliente recorrente.',
      en: 'Activity reports for 2024 and 2025. Recurring client.',
    },
    publishable: true,
    featured: false,
    assets: [],
  },
  {
    id: 'josapar-tio-joao',
    title: 'Josapar / Tio João',
    client: 'Josapar',
    year: 'set/2024',
    category: ['commercial', 'institutional'],
    role: ['Layout e diagramação de livreto institucional', 'Capa, guardas e contracapa'],
    summary: {
      pt: 'Livreto institucional. Atuação comercial fora do setor educacional.',
      en: 'Institutional booklet. Commercial work outside the education sector.',
    },
    publishable: true,
    featured: false,
    assets: [],
  },
  {
    id: 'sustentabilidade-eureka',
    title: 'Sustentabilidade — Livro do Educador',
    client: 'Grupo Eureka',
    year: '[CONTEÚDO A CONFIRMAR]',
    category: ['education', 'children'],
    role: ['Design de capa'],
    summary: {
      pt: 'Capas para coleção de 3 volumes (Educação Infantil, 1º-2º ano e 3º-5º ano do Ensino Fundamental). Autoras Juliana Cuoco Badari e Luciana Moreira Martins.',
      en: 'Covers for a 3-volume collection (Early Childhood, Elementary grades 1-2 and 3-5). Authors Juliana Cuoco Badari and Luciana Moreira Martins.',
    },
    publishable: true,
    featured: false,
    assets: [
      { src: sustentabilidadeEurekaCover, alt: 'Capas da coleção Sustentabilidade, Grupo Eureka, volumes 1 a 3', type: 'cover' },
    ],
  },
  {
    id: 'comecando-albertina',
    title: 'Começando Albertina — nossa vida no armário nos anos 90',
    client: 'Editacuja',
    year: '[CONTEÚDO A CONFIRMAR]',
    category: ['literary', 'commercial'],
    role: ['Design de capa e embalagem'],
    summary: {
      pt: 'Projeto gráfico completo (capa, caixa e miolo de abertura) do livro de Deise Abreu Pacheco, com conceito visual de fita cassete.',
      en: 'Full graphic design (cover, slipcase and opening spread) for Deise Abreu Pacheco’s book, built around a cassette-tape visual concept.',
    },
    publishable: true,
    featured: false,
    assets: [
      { src: comecandoAlbertinaCover, alt: 'Capa, caixa e contracapa de "Começando Albertina", editora Editacuja', type: 'cover' },
    ],
  },
  {
    id: 'comodines-transmedia',
    title: 'Los Comodines de Transmedia (TME)',
    client: 'Editacuja',
    partner: 'MinTIC / Proexport Colômbia',
    year: '[CONTEÚDO A CONFIRMAR]',
    category: ['digital', 'literary'],
    role: ['Design gráfico'],
    summary: {
      pt: 'Kit educativo em caixa (livro-guia + cartas) sobre transmídia para o mercado editorial. Crédito de "Design gráfico: Bruna Marchi" na ficha técnica da peça.',
      en: 'Boxed educational kit (guidebook + card deck) on transmedia for the publishing industry. Credited "Graphic design: Bruna Marchi" on the piece’s colophon.',
    },
    publishable: true,
    featured: false,
    assets: [
      { src: comodinesTransmediaCover, alt: 'Caixa e cartas do kit "Los Comodines de Transmedia", com crédito de design gráfico de Bruna Marchi', type: 'cover' },
    ],
  },
  {
    id: 'poemas-miudinhos',
    title: 'Poemas Miudinhos — para brincar e ritmar',
    client: 'Caramelo',
    year: '[CONTEÚDO A CONFIRMAR]',
    category: ['children', 'literary'],
    role: ['Design de capa'],
    summary: {
      pt: 'Capa de livro infantil de poemas, texto de Neusa Sorrenti e ilustrações de Gabriela Gil.',
      en: 'Cover for a children’s poetry book, written by Neusa Sorrenti with illustrations by Gabriela Gil.',
    },
    publishable: true,
    featured: false,
    assets: [
      { src: poemasMiudinhosCover, alt: 'Capa de "Poemas Miudinhos — para brincar e ritmar", editora Caramelo', type: 'cover' },
    ],
  },
  {
    id: 'depois-do-tremor',
    title: 'Depois do Tremor',
    client: '[CONTEÚDO A CONFIRMAR]',
    year: '[CONTEÚDO A CONFIRMAR]',
    category: ['literary'],
    role: ['Design de capa'],
    summary: {
      pt: 'Capa do livro de Jean Portante, tradução de Maria João Cantinho.',
      en: 'Cover for Jean Portante’s book, translated by Maria João Cantinho.',
    },
    publishable: true,
    featured: false,
    assets: [
      { src: depoisDoTremorCover, alt: 'Capa de "Depois do Tremor", de Jean Portante', type: 'cover' },
    ],
  },
  {
    id: 'editora-do-brasil',
    title: 'Editora do Brasil',
    client: 'Editora do Brasil',
    year: '2024 — 2026',
    category: ['pnld', 'education'],
    role: ['Arte PNLD'],
    summary: {
      pt: 'Contratos PJ recorrentes em 2024, 2025 e 2026. Experiência profissional; material visual não publicável por restrição contratual.',
      en: 'Recurring freelance contracts in 2024, 2025 and 2026. Professional experience; visual material cannot be published due to contract restrictions.',
    },
    publishable: false,
    featured: false,
    assets: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
