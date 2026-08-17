// Camada de dados — trajetória.
// Não inventar anos, cargos, obras ou responsabilidades.
// Entradas sem confirmação usam placeholder textual e cover: null.

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  organization?: string;
  note?: {
    pt: string;
    en: string;
  };
  confirmed: boolean;
  cover?: {
    src: string;
    alt: string;
  } | null;
}

// Histórico anterior mencionado em CONTENT_BASE.md, sem datas/cargos confirmados.
// Ordem alfabética — não representa cronologia real até confirmação.
export const priorHistoryOrganizations: string[] = [
  'A Girafa Editora',
  'ERJ Composição',
  'Editacuja Transmídia',
  'Obá Editorial',
  'Saraiva',
  'Moderna',
  'Guinness Book',
  'Macmillan',
];

export const timeline: TimelineEntry[] = [
  {
    id: 'josapar-2024',
    year: '2024',
    title: 'Josapar / Tio João',
    organization: 'Josapar',
    note: {
      pt: 'Livreto institucional — layout e diagramação.',
      en: 'Institutional booklet — layout and design.',
    },
    confirmed: true,
    cover: null,
  },
  {
    id: 'mentalidades-2024',
    year: '2024',
    title: 'Mentalidades Matemáticas',
    note: {
      pt: 'Relatório institucional/anual.',
      en: 'Institutional / annual report.',
    },
    confirmed: true,
    cover: null,
  },
  {
    id: 'poliedro-2024',
    year: '2024',
    title: 'Poliedro Educação',
    note: {
      pt: 'Início da atuação PJ/freelance contínua.',
      en: 'Start of ongoing freelance work.',
    },
    confirmed: true,
    cover: null,
  },
  {
    id: 'ingles-mackenzie-2025',
    year: '2025',
    title: 'Coleção Inglês Mackenzie',
    organization: 'Lotus Estúdio',
    confirmed: true,
    cover: null,
  },
  {
    id: 'yoyo-2025',
    year: '2025',
    title: 'Yoyo Books',
    confirmed: true,
    cover: null,
  },
  {
    id: 'mentalidades-2025',
    year: '2025',
    title: 'Mentalidades Matemáticas',
    note: {
      pt: 'Relatório institucional/anual.',
      en: 'Institutional / annual report.',
    },
    confirmed: true,
    cover: null,
  },
  {
    id: 'explorum-2026',
    year: '2026',
    title: 'Explorum — Educação Digital',
    note: {
      pt: 'Guia sobre IA na Educação.',
      en: 'Guide on AI in Education.',
    },
    confirmed: true,
    cover: null,
  },
];
