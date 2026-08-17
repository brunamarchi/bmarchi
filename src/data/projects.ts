// Camada de dados — projetos.
// Baseado em PROJECT_DATA_TEMPLATE.ts e CONTENT_BASE.md.
// Não inventar clientes, datas, cargos, números ou resultados.
// Onde faltar confirmação, usar '[CONTEÚDO A CONFIRMAR]' / '[CONTENT TO CONFIRM]'.

export type ProjectCategory =
  | 'pnld'
  | 'education'
  | 'assessment'
  | 'children'
  | 'institutional'
  | 'commercial'
  | 'digital'
  | 'magazine';

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
    id: 'trilhas-matematica-8',
    title: 'Trilhas Matemática — 8º ano',
    client: 'Saraiva / Grupo SM',
    year: '[CONTEÚDO A CONFIRMAR]',
    category: ['pnld', 'education'],
    role: ['Diagramação', 'Checklist de capítulo', 'Fechamento de arte para gráfica'],
    tools: ['Adobe InDesign'],
    summary: {
      pt: '[CONTEÚDO A CONFIRMAR]',
      en: '[CONTENT TO CONFIRM]',
    },
    scope: 'PNLD',
    publishable: true,
    featured: true,
    assets: [],
  },
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
    id: 'ways-bilingual-school',
    title: 'Ways Bilingual School',
    partner: 'Arco Educação',
    year: 'dez/2025',
    category: ['education'],
    role: ['[CONTEÚDO A CONFIRMAR]'],
    summary: {
      pt: 'Projeto realizado via Arco Educação, reforçando experiência em educação bilíngue.',
      en: 'Project delivered via Arco Educação, reinforcing experience in bilingual education.',
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
    id: 'revista-eureka',
    title: 'Revista Eureka — 3ª edição',
    client: 'Revista Eureka',
    year: 'nov/2025',
    category: ['magazine'],
    role: ['Diagramação de revista'],
    summary: {
      pt: 'Diagramação da 3ª edição da revista.',
      en: 'Layout of the magazine’s 3rd edition.',
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
