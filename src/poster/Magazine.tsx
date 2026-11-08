import { Fragment, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PortfolioProject } from '../data/projects';
import { clients, languages, profile, prettyUrl, tools } from '../data/profile';
import type { Lang } from '../landing/copy';

gsap.registerPlugin(ScrollTrigger);

// Miolo da "revista": sumário, matérias (estudos de caso), galeria, perfil e
// expediente — na lógica de diagramação da Serafina: páginas brancas em
// espelho, título em sans pesado, linha fina em serif, texto em colunas com
// capitular, cabeçalho com fólio e foto sangrada numa das páginas.

const t = {
  pt: {
    issue: 'Portfólio · edição 2026',
    contents: 'Sumário',
    contentsDeck: 'Livros, didáticos, relatórios, marcas e sites: o que está nesta edição.',
    feature: 'Matéria',
    challenge: 'O desafio',
    approach: 'O que eu fiz',
    deliverables: 'Entregas',
    client: 'Cliente',
    year: 'Ano',
    role: 'Função',
    tools: 'Ferramentas',
    viewImages: 'ver imagens',
    visit: 'ver site',
    gallery: 'Galeria',
    galleryDeck: 'Mais trabalhos desta edição. Clique para ver.',
    profile: 'Perfil',
    profileDeck: 'Designer há mais de dez anos, do livro didático ao site.',
    clients: 'Editoras e marcas',
    langs: 'Idiomas',
    colophon: 'Expediente',
    closing: 'Vamos fazer alguma coisa que mereça ser publicada.',
    email: 'E-mail',
    copy: 'copiar',
    copied: 'copiado',
    cv: 'Currículo',
    cvAsk: 'pedir por e-mail',
    langNames: { portuguese: 'Português', english: 'Inglês', spanish: 'Espanhol' } as Record<string, string>,
    back: 'voltar à capa',
  },
  en: {
    issue: 'Portfolio · 2026 issue',
    contents: 'Contents',
    contentsDeck: 'Books, textbooks, reports, brands and websites: what’s in this issue.',
    feature: 'Feature',
    challenge: 'The challenge',
    approach: 'What I did',
    deliverables: 'Deliverables',
    client: 'Client',
    year: 'Year',
    role: 'Role',
    tools: 'Tools',
    viewImages: 'view images',
    visit: 'visit site',
    gallery: 'Gallery',
    galleryDeck: 'More work in this issue. Click to view.',
    profile: 'Profile',
    profileDeck: 'A designer for over ten years, from textbook to website.',
    clients: 'Publishers and brands',
    langs: 'Languages',
    colophon: 'Masthead',
    closing: 'Let’s make something worth publishing.',
    email: 'Email',
    copy: 'copy',
    copied: 'copied',
    cv: 'CV',
    cvAsk: 'request by email',
    langNames: { portuguese: 'Portuguese', english: 'English', spanish: 'Spanish' } as Record<string, string>,
    back: 'back to cover',
  },
};

interface Props {
  projects: PortfolioProject[];
  lang: Lang;
  aboutText: string[];
  onOpen: (p: PortfolioProject, index: number, from?: DOMRect) => void;
}

const pageOf = (i: number) => String(4 + i * 6).padStart(2, '0');

/** Título com cada palavra num "trilho", para a animação de subida. */
function Headline({ text, className }: { text: string; className: string }) {
  return (
    <h2 className={className} aria-label={text}>
      {text.split(' ').map((w, i, arr) => (
        <Fragment key={i}>
          <span className="mg-word" aria-hidden="true">
            <span>{w}</span>
          </span>
          {i < arr.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h2>
  );
}

export function Magazine({ projects, lang, aboutText, onOpen }: Props) {
  const s = t[lang];
  const root = useRef<HTMLDivElement>(null);
  const features = projects.filter((p) => p.caseStudy && p.assets.length > 0);
  const gallery = projects.filter((p) => !p.caseStudy && p.assets.length > 0);
  const contents = [...features, ...gallery];
  const [hover, setHover] = useState<{ src: string; x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);

  // Animações ao rolar (respeitam "reduzir movimento").
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('.mg-headline').forEach((h) => {
        gsap.from(h.querySelectorAll('.mg-word > span'), {
          yPercent: 110,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.06,
          scrollTrigger: { trigger: h, start: 'top 85%' },
        });
      });
      el.querySelectorAll<HTMLElement>('.mg-reveal').forEach((img) => {
        gsap.from(img, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: img, start: 'top 80%' },
        });
      });
      el.querySelectorAll<HTMLElement>('.mg-parallax .mg-feature-img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
      el.querySelectorAll<HTMLElement>('.mg-fade').forEach((f) => {
        gsap.from(f, {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: f, start: 'top 88%' },
        });
      });
      el.querySelectorAll<HTMLElement>('.mg-toc-row').forEach((row, i) => {
        gsap.from(row, {
          x: -24,
          opacity: 0,
          duration: 0.6,
          delay: (i % 8) * 0.04,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 92%' },
        });
      });
    }, el);
    return () => ctx.revert();
  }, [lang]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* e-mail continua visível e selecionável */
    }
  };

  const imgRect = (e: React.MouseEvent<HTMLElement>) => e.currentTarget.querySelector('img')?.getBoundingClientRect();

  return (
    <div className="mg" ref={root}>
      {/* ================= SUMÁRIO ================= */}
      <section id="projetos" className="mg-spread mg-toc" aria-labelledby="mg-contents">
        <header className="mg-folio">
          <span>{s.issue}</span>
          <span>03</span>
        </header>
        <div className="mg-toc-grid">
          <div className="mg-toc-lead">
            <Headline text={s.contents} className="mg-headline mg-headline-xl" />
            <p className="mg-deck mg-fade">{s.contentsDeck}</p>
          </div>
          <ol className="mg-toc-list" onMouseLeave={() => setHover(null)}>
            {contents.map((p) => {
              const isFeature = Boolean(p.caseStudy);
              return (
                <li key={p.id} className="mg-toc-row">
                  <a
                    href={isFeature ? `#materia-${p.id}` : '#galeria'}
                    onMouseMove={(e) => setHover({ src: p.assets[0].src, x: e.clientX, y: e.clientY })}
                    onClick={(e) => {
                      if (!isFeature) {
                        e.preventDefault();
                        onOpen(p, 0);
                      }
                    }}
                  >
                    <span className="mg-toc-page">{isFeature ? pageOf(features.indexOf(p)) : '—'}</span>
                    <span className="mg-toc-title">{p.title}</span>
                    <span className="mg-toc-kind">{p.kind[lang]}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
        {hover && (
          <img className="mg-toc-preview" src={hover.src} alt="" aria-hidden="true" style={{ left: hover.x, top: hover.y }} />
        )}
      </section>

      {/* ================= MATÉRIAS ================= */}
      {features.map((p, i) => {
        const cs = p.caseStudy!;
        const flip = i % 2 === 1;
        return (
          <article
            key={p.id}
            id={`materia-${p.id}`}
            className={`mg-spread mg-feature ${flip ? 'is-flip' : ''}`}
            aria-labelledby={`mg-h-${p.id}`}
          >
            <figure className="mg-feature-media">
              <button
                type="button"
                className="mg-feature-main mg-reveal mg-parallax"
                onClick={(e) => onOpen(p, 0, imgRect(e))}
                aria-label={`${s.viewImages}: ${p.title}`}
              >
                <img className="mg-feature-bg" src={p.assets[0].src} alt="" aria-hidden="true" loading="lazy" />
                <img className="mg-feature-img" src={p.assets[0].src} alt={p.assets[0].alt} loading="lazy" />
              </button>
              {p.assets.length > 1 && (
                <div className="mg-feature-thumbs mg-fade">
                  {p.assets.slice(1, 4).map((a, k) => (
                    <button type="button" key={a.src} onClick={(e) => onOpen(p, k + 1, imgRect(e))} aria-label={a.alt}>
                      <img src={a.src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
              <figcaption className="mg-caption">{p.assets[0].alt}</figcaption>
            </figure>

            <div className="mg-feature-text">
              <header className="mg-folio">
                <span>
                  {s.feature} · {p.kind[lang]}
                </span>
                <span>{pageOf(i)}</span>
              </header>
              <div id={`mg-h-${p.id}`}>
                <Headline text={p.title} className="mg-headline mg-headline-l" />
              </div>
              <p className="mg-deck mg-fade">{cs.challenge[lang]}</p>
              <div className="mg-columns mg-fade">
                <p className="mg-dropcap">
                  <strong>{s.approach}.</strong> {cs.approach[lang]}
                </p>
                <p>
                  <strong>{s.deliverables}.</strong> {cs.deliverables[lang]}
                </p>
                {cs.note && <p className="mg-note">{cs.note[lang]}</p>}
              </div>
              {cs.quote && <blockquote className="mg-pull mg-fade">“{cs.quote[lang]}”</blockquote>}
              {cs.tags && (
                <ul className="mg-tags mg-fade">
                  {cs.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              )}
              <dl className="mg-credits mg-fade">
                {p.client && p.client !== p.title && (
                  <div>
                    <dt>{s.client}</dt>
                    <dd>{p.client}</dd>
                  </div>
                )}
                {p.year && (
                  <div>
                    <dt>{s.year}</dt>
                    <dd>{p.year}</dd>
                  </div>
                )}
                <div>
                  <dt>{s.role}</dt>
                  <dd>{p.role[lang]}</dd>
                </div>
                {p.tools && (
                  <div>
                    <dt>{s.tools}</dt>
                    <dd>{p.tools.join(', ')}</dd>
                  </div>
                )}
              </dl>
              <div className="mg-feature-links mg-fade">
                <button type="button" onClick={(e) => onOpen(p, 0, e.currentTarget.closest('article')?.querySelector('.mg-feature-main img')?.getBoundingClientRect())}>
                  {s.viewImages} →
                </button>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    {s.visit} ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        );
      })}

      {/* ================= GALERIA ================= */}
      <section id="galeria" className="mg-spread mg-gallery" aria-labelledby="mg-gallery-h">
        <header className="mg-folio">
          <span>{s.gallery}</span>
          <span>{pageOf(features.length)}</span>
        </header>
        <div className="mg-gallery-head">
          <div id="mg-gallery-h">
            <Headline text={s.gallery} className="mg-headline mg-headline-xl" />
          </div>
          <p className="mg-deck mg-fade">{s.galleryDeck}</p>
        </div>
        <ul className="mg-gallery-grid">
          {gallery.map((p) => (
            <li key={p.id} className="mg-fade">
              <button type="button" onClick={(e) => onOpen(p, 0, imgRect(e))}>
                <span className="mg-gallery-img">
                  <img src={p.assets[0].src} alt={p.assets[0].alt} loading="lazy" />
                </span>
                <span className="mg-gallery-title">{p.title}</span>
                <span className="mg-gallery-kind">{p.kind[lang]}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= PERFIL (Sobre) ================= */}
      <section id="perfil" className="mg-spread mg-profile" aria-labelledby="mg-profile-h">
        <header className="mg-folio">
          <span>{s.profile}</span>
          <span>{pageOf(features.length + 1)}</span>
        </header>
        <div className="mg-profile-grid">
          <div className="mg-profile-lead">
            <span className="mg-kicker mg-fade">{s.profile}</span>
            <div id="mg-profile-h">
              <Headline text={profile.name} className="mg-headline mg-headline-xl" />
            </div>
            <p className="mg-deck mg-fade">{s.profileDeck}</p>
          </div>
          <div className="mg-columns mg-columns-3 mg-fade">
            {aboutText.map((para, i) => (
              <p key={i} className={i === 0 ? 'mg-dropcap' : undefined}>
                {para}
              </p>
            ))}
          </div>
          <aside className="mg-profile-side mg-fade">
            <div>
              <h3>{s.clients}</h3>
              <p>{clients.join(' · ')}</p>
            </div>
            <div>
              <h3>{s.tools}</h3>
              <p>{tools.join(' · ')}</p>
            </div>
            <div>
              <h3>{s.langs}</h3>
              <p>
                {languages
                  .filter((l) => l.level !== 'some')
                  .map((l) => s.langNames[l.key])
                  .join(' · ')}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= EXPEDIENTE (Contato) ================= */}
      <section id="contato" className="mg-spread mg-colophon" aria-labelledby="mg-colophon-h">
        <header className="mg-folio">
          <span>{s.colophon}</span>
          <span>{pageOf(features.length + 2)}</span>
        </header>
        <div className="mg-colophon-grid">
          <div id="mg-colophon-h">
            <Headline text={s.closing} className="mg-headline mg-headline-xl" />
          </div>
          <dl className="mg-colophon-list mg-fade">
            <div>
              <dt>{s.email}</dt>
              <dd>
                <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                <button type="button" className="mg-chip" onClick={copyEmail}>
                  {copied ? `✓ ${s.copied}` : s.copy}
                </button>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
                  in/bruna-marchi ↗
                </a>
              </dd>
            </div>
            <div>
              <dt>Behance</dt>
              <dd>
                <a href={profile.contact.behance} target="_blank" rel="noopener noreferrer">
                  {prettyUrl(profile.contact.behance)} ↗
                </a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href={profile.contact.github} target="_blank" rel="noopener noreferrer">
                  {prettyUrl(profile.contact.github)} ↗
                </a>
              </dd>
            </div>
            <div>
              <dt>{s.cv}</dt>
              <dd>
                <a href={`mailto:${profile.contact.email}?subject=${encodeURIComponent('[Portfólio] Pedido de currículo')}`}>
                  {s.cvAsk} →
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <footer className="mg-colophon-foot">
          <span>© 2026 {profile.name}</span>
          <span>Santa Catarina, Brasil</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            ↑ {s.back}
          </a>
        </footer>
      </section>
    </div>
  );
}
