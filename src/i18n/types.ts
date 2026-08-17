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
  cover: {
    eyebrowName: string;
    eyebrowRole: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    scrollCta: string;
    pageIndicator: string;
  };
  intro: {
    number: string;
    eyebrow: string;
    lead: string;
    words: string[];
    areasTitle: string;
    areas: { title: string; description: string }[];
  };
  selectedWork: {
    number: string;
    chapterLabel: string;
    title: string;
    intro: string;
    viewCase: string;
    notPublishable: string;
    caseComingSoon: string;
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
  direction: {
    number: string;
    chapterLabel: string;
    title: string;
    quote1: string;
    quote2: string;
    roles: string[];
  };
  formats: {
    number: string;
    chapterLabel: string;
    title: string;
    quote: string;
    formats: string[];
  };
  process: {
    number: string;
    chapterLabel: string;
    title: string;
    quote: string;
    steps: string[];
    note: string;
  };
  outsideMargin: {
    number: string;
    chapterLabel: string;
    title: string;
    quote: string;
    lead: string;
    comingSoon: string;
  };
  trajectory: {
    number: string;
    chapterLabel: string;
    title: string;
    quote: string;
    priorHistoryTitle: string;
    priorHistoryNote: string;
    entryPlaceholder: string;
  };
  about: {
    number: string;
    chapterLabel: string;
    title: string;
    bio: string;
    photoPlaceholder: string;
    expertiseTitle: string;
    toolsTitle: string;
    languagesTitle: string;
    locationLabel: string;
    availability: string;
    languageLevels: Record<'native' | 'fluent' | 'some', string>;
    languageNames: Record<string, string>;
    expertiseAreas: Record<string, string>;
  };
  contact: {
    number: string;
    chapterLabel: string;
    title: string;
    quote: string;
    emailLabel: string;
    linkedinLabel: string;
    behanceLabel: string;
  };
  colophon: {
    rights: string;
    fonts: string;
    location: string;
    backToTop: string;
  };
}
