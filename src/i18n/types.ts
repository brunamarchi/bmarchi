import type { ProjectSegment } from '../data/projects';

export type Locale = 'pt' | 'en';

export interface Dictionary {
  htmlLang: string;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    langLabel: string;
    gridToggleShow: string;
    gridToggleHide: string;
    skipToContent: string;
    menuLabel: string;
    closeLabel: string;
    chapters: { id: string; number: string; label: string }[];
  };
  header: {
    role: string;
  };
  cover: {
    role: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaWork: string;
    ctaContact: string;
    pageIndicator: string;
  };
  intro: {
    number: string;
    eyebrow: string;
    lead: string;
    clientsTitle: string;
    areasTitle: string;
    areas: { title: string; description: string }[];
  };
  selectedWork: {
    number: string;
    chapterLabel: string;
    title: string;
    intro: string;
    filterLabel: string;
    filterAll: string;
    segments: Record<Exclude<ProjectSegment, 'digital'>, string>;
    alsoTitle: string;
    noImages: string;
    roleLabel: string;
    toolsLabel: string;
  };
  systems: {
    number: string;
    chapterLabel: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    tags: string[];
  };
  precision: {
    number: string;
    chapterLabel: string;
    title: string;
    intro: string;
    exams: string[];
    narrative: string[];
  };
  digital: {
    number: string;
    chapterLabel: string;
    title: string;
    intro: string;
    visit: string;
    privateApp: string;
    githubCta: string;
  };
  about: {
    number: string;
    chapterLabel: string;
    title: string;
    bio: string;
    expertiseTitle: string;
    toolsTitle: string;
    languagesTitle: string;
    availabilityTitle: string;
    availability: string;
    languageLevels: Record<'native' | 'fluent' | 'some', string>;
    languageNames: Record<string, string>;
    expertiseAreas: Record<string, string>;
  };
  contact: {
    number: string;
    chapterLabel: string;
    quote: string;
    lead: string;
    emailLabel: string;
    linkedinLabel: string;
    behanceLabel: string;
    githubLabel: string;
  };
  colophon: {
    rights: string;
    fonts: string;
    location: string;
    backToTop: string;
  };
}
