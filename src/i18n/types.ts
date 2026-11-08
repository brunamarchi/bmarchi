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
  cases: {
    number: string;
    chapterLabel: string;
    title: string;
    intro: string;
    challenge: string;
    approach: string;
    deliverables: string;
    visit: string;
  };
  archive: {
    number: string;
    chapterLabel: string;
    title: string;
    intro: string;
    filterLabel: string;
    filterAll: string;
    segments: Record<ProjectSegment, string>;
    alsoTitle: string;
    noImages: string;
    roleLabel: string;
    toolsLabel: string;
    visit: string;
    privateApp: string;
    githubCta: string;
  };
  mural: {
    workTitle: string;
    hint: string;
    pieces: string;
  };
  herbario: {
    labelNo: string;
    labelName: string;
    labelFamily: string;
    familyValue: string;
    labelCollected: string;
    collectedValue: string;
    swatchTitle: string;
    swatchIntro: string;
    swatchNames: Record<'dry' | 'trees' | 'bark' | 'earth' | 'wood', string>;
    collectionTitle: string;
    collectionIntro: string;
    showAll: string;
    specimen: string;
    notesTitle: string;
    unpublished: string;
    specimens: string;
    labelType: string;
    labelClient: string;
    labelYear: string;
  };
  lightbox: {
    open: string;
    close: string;
    prev: string;
    next: string;
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
