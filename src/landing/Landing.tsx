import { useEffect, useMemo, useRef, useState } from 'react';
import { projects, type PortfolioProject } from '../data/projects';
import { clients, profile } from '../data/profile';
import { copy, type ContactIntent, type Lang } from './copy';
import { ProjectDialog } from './ProjectDialog';
import { ContactForm } from './ContactForm';

function initialLang(): Lang {
  const p = new URLSearchParams(window.location.search).get('lang');
  if (p === 'en' || p === 'pt') return p;
  if (/bot|crawl|spider|linkedin|whatsapp|facebookexternalhit/i.test(navigator.userAgent)) return 'pt';
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

const heroPick = ['comecando-albertina', 'josapar-tio-joao', 'yoyo-books', 'mentalidades-matematicas'];

export function Landing() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const c = copy[lang];
  const [intent, setIntent] = useState<ContactIntent>('project');
  const [open, setOpen] = useState<{ project: PortfolioProject; index: number } | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = c.title;
    document.documentElement.lang = c.htmlLang;
  }, [c]);

  // CTA fixo no celular: aparece depois que a abertura sai da tela e some
  // quando o formulário de contato está visível.
  useEffect(() => {
    const hero = heroRef.current;
    const contact = document.getElementById('contato');
    if (!hero || !contact || !('IntersectionObserver' in window)) return;
    let heroVisible = true;
    let contactVisible = false;
    const update = () => setShowSticky(!heroVisible && !contactVisible);
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === contact) contactVisible = entry.isIntersecting;
      }
      update();
    });
    io.observe(hero);
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  const cases = useMemo(() => projects.filter((p) => p.caseStudy), []);
  const more = useMemo(() => projects.filter((p) => !p.caseStudy && p.assets.length > 0), []);
  const heroImages = heroPick
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is PortfolioProject => Boolean(p))
    .map((p) => ({ project: p, asset: p.assets[0] }));

  const goContact = (next: ContactIntent) => {
    setIntent(next);
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
  };

  const meta = (p: PortfolioProject) =>
    [p.kind[lang], p.client && p.client !== p.title ? p.client : undefined, p.year].filter(Boolean).join(' · ');

  return (
    <div className="lp">
      <a className="lp-skip" href="#conteudo">
        {lang === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
      </a>

      {/* ---------------- Barra superior ---------------- */}
      <header className="lp-top">
        <a href="#inicio" className="lp-brand">
          <span className="lp-brand-name">{profile.name}</span>
          <span className="lp-status">
            <i aria-hidden="true" />
            {c.status}
          </span>
        </a>
        <nav className="lp-nav" aria-label="Menu">
          <a href="#projetos">{c.nav.work}</a>
          <a href="#servicos">{c.nav.services}</a>
          <a href="#processo">{c.nav.process}</a>
          <a href="#duvidas">{c.nav.faq}</a>
        </nav>
        <div className="lp-top-actions">
          <button type="button" className="lp-lang" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>
            {c.nav.lang}
          </button>
          <button type="button" className="lp-btn lp-btn-primary lp-btn-sm" onClick={() => goContact('project')}>
            {c.nav.cta}
          </button>
        </div>
      </header>

      <main id="conteudo">
        {/* ---------------- Abertura ---------------- */}
        <section id="inicio" className="lp-hero" ref={heroRef}>
          <div className="lp-wrap lp-hero-grid">
            <div className="lp-hero-text">
              <p className="lp-eyebrow">{c.hero.eyebrow}</p>
              <h1 className="lp-h1">
                {c.hero.titleA} <span className="lp-mark">{c.hero.titleB}</span> {c.hero.titleC}
              </h1>
              <p className="lp-lead">{c.hero.lead}</p>
              <div className="lp-hero-ctas">
                <button type="button" className="lp-btn lp-btn-primary" onClick={() => goContact('project')}>
                  {c.hero.ctaProject} <span aria-hidden="true">→</span>
                </button>
                <button type="button" className="lp-btn lp-btn-ghost" onClick={() => goContact('job')}>
                  {c.hero.ctaJob}
                </button>
              </div>
            </div>

            <div className="lp-hero-art">
              {heroImages.map(({ project, asset }, i) => (
                <button
                  key={project.id}
                  type="button"
                  className={`lp-hero-tile lp-hero-tile-${i}`}
                  onClick={() => setOpen({ project, index: 0 })}
                  aria-label={`${c.work.open}: ${project.title}`}
                >
                  <img src={asset.src} alt={asset.alt} />
                  <span className="lp-hero-caption">{project.title}</span>
                </button>
              ))}
              <span className="lp-hero-badge">{c.hero.badge}</span>
            </div>
          </div>
        </section>

        {/* ---------------- Clientes ---------------- */}
        <section className="lp-clients" aria-label={c.clientsLabel}>
          <div className="lp-wrap">
            <p className="lp-clients-label">{c.clientsLabel}</p>
            <ul className="lp-clients-list">
              {clients.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- Números ---------------- */}
        <section className="lp-stats" aria-label="Resumo">
          <div className="lp-wrap lp-stats-grid">
            {c.stats.map((s) => (
              <div className="lp-stat" key={s.label}>
                <span className="lp-stat-value">{s.value}</span>
                <span className="lp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Serviços ---------------- */}
        <section id="servicos" className="lp-section">
          <div className="lp-wrap">
            <p className="lp-eyebrow">{c.services.eyebrow}</p>
            <h2 className="lp-h2">{c.services.title}</h2>
            <div className="lp-services">
              {c.services.items.map((s, i) => (
                <article className="lp-service" key={s.key}>
                  <span className="lp-service-num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul className="lp-tags">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <button type="button" className="lp-link" onClick={() => goContact('project')}>
                    {c.services.cta} →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Projetos ---------------- */}
        <section id="projetos" className="lp-section lp-section-alt">
          <div className="lp-wrap">
            <p className="lp-eyebrow">{c.work.eyebrow}</p>
            <h2 className="lp-h2">{c.work.title}</h2>

            <div className="lp-cases">
              {cases.map((p) => (
                <article className="lp-case" key={p.id}>
                  <button
                    type="button"
                    className="lp-case-media"
                    onClick={() => setOpen({ project: p, index: 0 })}
                    aria-label={`${c.work.open}: ${p.title}`}
                  >
                    <img src={p.assets[0].src} alt={p.assets[0].alt} loading="lazy" />
                    {p.assets.length > 1 && <span className="lp-count">+{p.assets.length - 1}</span>}
                  </button>
                  <div className="lp-case-body">
                    <p className="lp-case-meta">{meta(p)}</p>
                    <h3 className="lp-case-title">{p.title}</h3>
                    <p className="lp-case-challenge">{p.caseStudy!.challenge[lang]}</p>
                    <p className="lp-case-deliv">
                      <strong>{c.work.deliverables}:</strong> {p.caseStudy!.deliverables[lang]}
                    </p>
                    <button type="button" className="lp-link" onClick={() => setOpen({ project: p, index: 0 })}>
                      {c.work.open} →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <p className="lp-nda">{c.work.nda}</p>

            <h3 className="lp-h3">{c.work.moreTitle}</h3>
            <ul className="lp-more">
              {more.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => setOpen({ project: p, index: 0 })}>
                    <span className="lp-more-img">
                      <img src={p.assets[0].src} alt={p.assets[0].alt} loading="lazy" />
                    </span>
                    <span className="lp-more-title">{p.title}</span>
                    <span className="lp-more-kind">{p.kind[lang]}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="lp-inline-cta">
              <p>{c.work.ctaInline}</p>
              <button type="button" className="lp-btn lp-btn-primary" onClick={() => goContact('project')}>
                {c.work.ctaInlineButton} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ---------------- Por que ---------------- */}
        <section className="lp-section lp-why">
          <div className="lp-wrap">
            <p className="lp-eyebrow lp-eyebrow-light">{c.why.eyebrow}</p>
            <div className="lp-why-grid">
              {c.why.items.map((w) => (
                <div key={w.title} className="lp-why-item">
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Como funciona ---------------- */}
        <section id="processo" className="lp-section">
          <div className="lp-wrap">
            <p className="lp-eyebrow">{c.process.eyebrow}</p>
            <h2 className="lp-h2">{c.process.title}</h2>
            <ol className="lp-steps">
              {c.process.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="lp-step-num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- Dúvidas ---------------- */}
        <section id="duvidas" className="lp-section lp-section-alt">
          <div className="lp-wrap lp-faq-grid">
            <div>
              <p className="lp-eyebrow">{c.faq.eyebrow}</p>
              <h2 className="lp-h2">{c.nav.faq}</h2>
            </div>
            <div className="lp-faq">
              {c.faq.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Contato ---------------- */}
        <section id="contato" className="lp-section lp-contact">
          <div className="lp-wrap lp-contact-grid">
            <ContactForm lang={lang} intent={intent} setIntent={setIntent} nameRef={nameRef} />
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-wrap lp-footer-inner">
          <span>© 2026 {profile.name}</span>
          <span>{c.footer}</span>
          <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>

      <div className={`lp-sticky ${showSticky ? 'is-visible' : ''}`}>
        <button type="button" className="lp-btn lp-btn-primary" onClick={() => goContact('project')}>
          {c.stickyCta} <span aria-hidden="true">→</span>
        </button>
      </div>

      <ProjectDialog
        lang={lang}
        state={open}
        onClose={() => setOpen(null)}
        onContact={() => {
          setOpen(null);
          goContact('project');
        }}
      />
    </div>
  );
}
