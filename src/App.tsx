import { I18nProvider, useI18n } from './i18n';
import { GridProvider } from './lib/gridContext';
import { LightboxProvider } from './lib/lightbox';
import { Header } from './components/layout/Header';
import { GridOverlay } from './components/layout/GridOverlay';
import { Cover } from './components/sections/Cover';
import { Intro } from './components/sections/Intro';
import { CaseStudies } from './components/sections/CaseStudies';
import { Archive } from './components/sections/Archive';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Mural } from './components/mural/Mural';
import { Herbario } from './components/herbario/Herbario';

function DocumentMeta() {
  const { t } = useI18n();
  if (typeof document !== 'undefined') {
    document.title = t.meta.title;
    document.documentElement.lang = t.htmlLang;
  }
  return null;
}

function SiteContent() {
  const { t } = useI18n();
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.nav.skipToContent}
      </a>
      <DocumentMeta />
      <Header />
      <GridOverlay />
      <main id="main-content">
        <Cover />
        <Intro />
        <CaseStudies />
        <Archive />
        <About />
        <Contact />
      </main>
    </>
  );
}

function App({ variant = 'default' }: { variant?: 'default' | 'mural' | 'herbario' }) {
  return (
    <I18nProvider>
      <GridProvider>
        <LightboxProvider>
          {variant === 'mural' ? <Mural /> : variant === 'herbario' ? <Herbario /> : <SiteContent />}
        </LightboxProvider>
      </GridProvider>
    </I18nProvider>
  );
}

export default App;
