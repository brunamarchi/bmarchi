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
  'WoodWing',
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
  'editorialProduction',
  'illustration',
  'imageAdaptation',
  'fileClosing',
  'printAndDigital',
];

export const profile = {
  name: 'Bruna Marchi',
  role: 'Editorial Practice',
  location: 'Santa Catarina, Brasil',
  contact: {
    email: '[CONTEÚDO A CONFIRMAR]',
    linkedin: '[CONTEÚDO A CONFIRMAR]',
    behance: '[CONTEÚDO A CONFIRMAR]',
  },
};
