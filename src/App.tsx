import { I18nProvider, useI18n } from './i18n';
import { GridProvider } from './lib/gridContext';
import { Header } from './components/layout/Header';
import { GridOverlay } from './components/layout/GridOverlay';
import { Cover } from './components/sections/Cover';
import { Intro } from './components/sections/Intro';
import { SelectedWork } from './components/sections/SelectedWork';
import { Systems } from './components/sections/Systems';
import { Precision } from './components/sections/Precision';
import { Direction } from './components/sections/Direction';
import { Formats } from './components/sections/Formats';
import { Process } from './components/sections/Process';
import { OutsideMargin } from './components/sections/OutsideMargin';
import { Trajectory } from './components/sections/Trajectory';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';

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
        <SelectedWork />
        <Systems />
        <Precision />
        <Direction />
        <Formats />
        <Process />
        <OutsideMargin />
        <Trajectory />
        <About />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <I18nProvider>
      <GridProvider>
        <SiteContent />
      </GridProvider>
    </I18nProvider>
  );
}

export default App;
