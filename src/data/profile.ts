// Camada de dados — perfil. Não inventar fatos: ver CONTENT_BASE.md.

export type LanguageLevel = 'native' | 'fluent' | 'some';

export interface LanguageEntry {
  key: string;
  level: LanguageLevel;
}

export const languages: LanguageEntry[] = [
  { key: 'portuguese', level: 'native' },
  { key: 'english', level: 'fluent' },
  { key: 'spanish', level: 'fluent' },
  { key: 'french', level: 'some' },
  { key: 'italian', level: 'some' },
];

export const tools: string[] = [
  'Adobe InDesign',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'WoodWing Studio / Assets',
  'MathType',
  'Mathtools',
  'Figma',
  'Adobe Firefly',
];

export const expertiseAreas: string[] = [
  'editArt',
  'editorialDesign',
  'pnld',
  'educationalPublications',
  'artDirection',
  'editorialCoordination',
  'layout',
  'covers',
  'editorialProduction',
  'illustration',
  'imageAdaptation',
  'fileClosing',
  'printAndDigital',
  'webDesign',
];

// Editoras e clientes com quem já trabalhou — mostrados como prova logo no
// início do site. Os nomes do "histórico anterior" já eram públicos no site;
// anos e responsabilidades seguem sem detalhe até ela confirmar.
export const clients: string[] = [
  'Editora do Brasil',
  'Poliedro Educação',
  'Saraiva',
  'Moderna',
  'Macmillan',
  'Guinness Book',
  'Editacuja',
  'Yoyo Books',
  'Grupo Eureka',
  'Explorum',
  'Lotus Estúdio',
  'Obá Editorial',
  'A Girafa Editora',
  'Josapar / Tio João',
];

export const profile = {
  name: 'Bruna Marchi',
  location: 'Santa Catarina, Brasil',
  siteUrl: 'https://brunamarchi.github.io/bmarchi/',
  contact: {
    // E-mail que aparece em "Dados de contato" do LinkedIn dela (lido em 2026-09-17).
    email: 'luiza.marchi@gmail.com',
    linkedin: 'https://www.linkedin.com/in/bruna-marchi-91300232/',
    behance: 'https://www.behance.net/brunamarchi_br',
    github: 'https://github.com/brunamarchi',
  },
};

/** Exibe uma URL sem protocolo nem barra final: "behance.net/brunamarchi_br". */
export function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
