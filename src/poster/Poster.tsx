import { useEffect, useRef, useState } from 'react';
import { Magazine } from './Magazine';
import { projects, type PortfolioProject } from '../data/projects';
import { profile } from '../data/profile';
import { copy, type Lang } from '../landing/copy';
import photo from './assets/bruna.webp';
import cutout from './assets/bruna-recorte.webp';

// Versão "pôster": capa no estilo de cartaz editorial com grade de construção,
// réguas e mira que acompanham o mouse; o nome passa por trás da Bruna
// (foto recortada por cima do texto). Todos os textos da capa são links.

const t = {
  pt: {
    by: 'Portfólio de:',
    spaced: 'designer',
    toWork: 'ver projetos',
    toContact: 'fale comigo',
    sub: 'Livros, didáticos, relatórios, materiais de marca e sites — do conceito ao arquivo final.',
    colA: ['PROJETOS', 'trabalhos'],
    colB: ['BEHANCE', 'portfólio completo'],
    colC: ['CONTATO', 'e-mail e LinkedIn'],
    workTitle: 'Projetos selecionados',
    drag: 'arraste, role para o lado ou use as setas',
    open: 'abrir',
    aboutTitle: 'Sobre',
    coverTitle: 'Bruna Marchi, designer',
    aboutShort: 'Designer há mais de dez anos. Livros, didáticos, relatórios, marca e sites — do conteúdo ao arquivo final.',
    more: 'Saiba mais',
    aboutText: [
      'Sou Bruna Marchi, designer há mais de dez anos. Meu trabalho começa no conteúdo: entender o que precisa ser dito, para quem e em quantas páginas, antes de escolher a primeira fonte.',
      'Faço livros e coleções didáticas — do PNLD aos materiais de pré-vestibular —, livros infantis e literários, relatórios e guias, materiais de marca, ilustração e sites. Cuido do projeto gráfico, da edição de arte e da diagramação até o arquivo final, pronto para a gráfica ou para ir ao ar.',
      'Já trabalhei para Editora do Brasil, Poliedro Educação, Saraiva, Moderna, Macmillan, Editacuja, Yoyo Books e Josapar, entre outras editoras e marcas. Uso InDesign, Illustrator, Photoshop, Figma e WoodWing, e trabalho em português, inglês e espanhol, de Santa Catarina para qualquer lugar.',
    ],
    clients: 'Editoras e marcas',
    tools: 'Ferramentas',
    langs: 'Idiomas',
    contactTitle: 'Vamos fazer alguma coisa que mereça ser publicada.',
    copy: 'copiar e-mail',
    copied: 'copiado',
    close: 'fechar',
    lang: 'EN',
    cv: 'pedir currículo',
  },
  en: {
    by: 'Portfolio by:',
    spaced: 'designer',
    toWork: 'see the work',
    toContact: 'get in touch',
    sub: 'Books, textbooks, reports, brand materials and websites — from concept to final files.',
    colA: ['WORK', 'projects'],
    colB: ['BEHANCE', 'full portfolio'],
    colC: ['CONTACT', 'email and LinkedIn'],
    workTitle: 'Selected work',
    drag: 'drag, scroll sideways or use the arrows',
    open: 'open',
    aboutTitle: 'About',
    coverTitle: 'Bruna Marchi, designer',
    aboutShort: 'Designer for over ten years. Books, textbooks, reports, brand and websites — from content to final files.',
    more: 'Learn more',
    aboutText: [
      'I’m Bruna Marchi, a designer with more than ten years of experience. My work starts with the content: understanding what needs to be said, to whom and across how many pages, before choosing the first typeface.',
      'I make books and textbook series — from Brazil’s national textbook programme to exam-prep materials —, children’s and literary books, reports and guides, brand materials, illustration and websites. I handle book design, art editing and layout through to final files, ready for print or to go live.',
      'Clients include Editora do Brasil, Poliedro Educação, Saraiva, Moderna, Macmillan, Editacuja, Yoyo Books and Josapar, among other publishers and brands. I work with InDesign, Illustrator, Photoshop, Figma and WoodWing, in English, Portuguese and Spanish, from southern Brazil to anywhere.',
    ],
    clients: 'Publishers and brands',
    tools: 'Tools',
    langs: 'Languages',
    contactTitle: 'Let’s make something worth publishing.',
    copy: 'copy email',
    copied: 'copied',
    close: 'close',
    lang: 'PT',
    cv: 'request CV',
  },
};

function initialLang(): Lang {
  const p = new URLSearchParams(window.location.search).get('lang');
  if (p === 'en' || p === 'pt') return p;
  if (/bot|crawl|spider|linkedin|whatsapp|facebookexternalhit/i.test(navigator.userAgent)) return 'pt';
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

type OpenState = { project: PortfolioProject; index: number; from?: DOMRect };

const pad4 = (n: number) => String(Math.max(0, Math.min(9999, Math.round(n)))).padStart(4, '0');

/* ------------------------------------------------------------------ */
/* Réguas: faixas de marcação que deslizam com o mouse                 */
/* ------------------------------------------------------------------ */
function Ruler({ side }: { side: 'left' | 'right' }) {
  const labels = Array.from({ length: 41 }, (_, i) => (i - 10) * 100);
  return (
    <div className={`ps-ruler ps-ruler-${side}`} aria-hidden="true">
      <div className="ps-ruler-strip">
        {labels.map((n) => (
          <span key={n} className="ps-ruler-num" style={{ ['--i' as string]: (n + 1000) / 100 }}>
            {Math.abs(n)}
          </span>
        ))}
      </div>
      <span className="ps-ruler-marker" />
    </div>
  );
}

export function Poster() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const s = t[lang];
  const c = copy[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [hot, setHot] = useState(false);
  const [open, setOpen] = useState<OpenState | null>(null);

  useEffect(() => {
    document.title = `${profile.name} — ${c.hero.eyebrow}`;
    document.documentElement.lang = c.htmlLang;
  }, [c]);

  /*
   * Mira + réguas: movimento ocasional e suave, para não atrapalhar a leitura.
   * - Quando o mouse para por ~1,2 s, a mira desliza até ele (uma vez).
   * - Sem interação, a cada ~9 s ela desliza para um novo ponto.
   * - Fora dessas transições nada se move. Com "reduzir movimento", fica parada.
   */
  const hotRef = useRef(false);
  useEffect(() => {
    hotRef.current = hot;
  }, [hot]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stage = hero;
    let cx = 0.5;
    let cy = 0.42;
    let raf = 0;
    let gliding = false;
    let mouse: { x: number; y: number; t: number } | null = null;
    let lastGlide = performance.now();

    const apply = () => {
      const r = hero.getBoundingClientRect();
      if (stage) {
        const sr = stage.getBoundingClientRect();
        const sx = (r.left + cx * r.width - sr.left) / sr.width;
        const sy = (r.top + cy * r.height - sr.top) / sr.height;
        hero.style.setProperty('--sx', String(Math.min(1, Math.max(0, sx))));
        hero.style.setProperty('--sy', String(Math.min(1, Math.max(0, sy))));
      }
      hero.style.setProperty('--px', `${cx * r.width}px`);
      hero.style.setProperty('--py', `${cy * r.height}px`);
      if (readoutRef.current) readoutRef.current.textContent = `x ${pad4(cx * 1080)} · y ${pad4(cy * 1080)}`;
    };

    const glideTo = (tx: number, ty: number, duration = 2200) => {
      if (reduce || gliding) return;
      const fx = cx;
      const fy = cy;
      const t0 = performance.now();
      gliding = true;
      lastGlide = t0;
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / duration);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; // ease-in-out
        cx = fx + (tx - fx) * e;
        cy = fy + (ty - fy) * e;
        apply();
        if (k < 1) raf = requestAnimationFrame(step);
        else gliding = false;
      };
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = hero.getBoundingClientRect();
      mouse = {
        x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
        y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
        t: performance.now(),
      };
    };

    const tick = window.setInterval(() => {
      if (gliding || hotRef.current) return;
      const now = performance.now();
      if (mouse && now - mouse.t > 1200) {
        const far = Math.abs(mouse.x - cx) + Math.abs(mouse.y - cy) > 0.06;
        if (far) glideTo(mouse.x, mouse.y, 1800);
        mouse = null;
        return;
      }
      if (now - lastGlide > 9000 && (!mouse || now - mouse.t > 4000)) {
        glideTo(0.25 + Math.random() * 0.5, 0.25 + Math.random() * 0.45, 2600);
      }
    }, 400);

    apply();
    hero.addEventListener('pointermove', onMove);
    window.addEventListener('resize', apply);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(tick);
      hero.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', apply);
    };
  }, []);

  const hotProps = { onPointerEnter: () => setHot(true), onPointerLeave: () => setHot(false) };



  return (
    <div className="ps">
      {/* ======================= CAPA ======================= */}
      {/* ======================= PRIMEIRA DOBRA: página dupla ======================= */}
      <section className={`ps-spread ${hot ? 'is-hot' : ''}`} aria-labelledby="ps-name">
        <img className="ps-spread-blur" src={photo} alt="" aria-hidden="true" />
        {/* a foto inteira, com o nome por trás da Bruna */}
        <div ref={heroRef} className="ps-stage">
          <div className="ps-frame">
            <img className="ps-photo" src={photo} alt="Bruna Marchi sentada à mesa de trabalho, com livro aberto e notebook" />

            <svg className="ps-grid" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
              <g>
                <line x1="333" y1="0" x2="333" y2="1000" />
                <line x1="667" y1="0" x2="667" y2="1000" />
                <line x1="0" y1="430" x2="1000" y2="430" />
                <line x1="160" y1="60" x2="500" y2="430" />
                <line x1="840" y1="60" x2="500" y2="430" />
                <circle cx="485" cy="250" r="330" />
                <circle cx="485" cy="250" r="190" />
              </g>
            </svg>

            <span className="ps-spaced" aria-hidden="true">
              {['b', 'r', 'u', 'n', 'a'].map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </span>

            <h1 id="ps-name" className="ps-name">
              <span className="visually-hidden">Bruna </span>Marchi
            </h1>

            <img className="ps-cutout" src={cutout} alt="" aria-hidden="true" />

            {/* chamada de capa: texto direto sobre a foto, acima do "chi" */}
            <div id="sobre" className="ps-coverline" role="group" aria-labelledby="ps-about">
              <h2 id="ps-about" className="ps-coverline-title">{s.coverTitle}</h2>
              <p className="ps-coverline-text">{s.aboutShort}</p>
              <a className="ps-coverline-more" href="#perfil" {...hotProps}>
                {s.more} →
              </a>
            </div>

            <div className="ps-top">
              <span>{s.by}</span>
              <span className="ps-arrow" aria-hidden="true" />
              <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" {...hotProps}>
                in/bruna-marchi ↗
              </a>
            </div>
          </div>

          <Ruler side="left" />
          <Ruler side="right" />

          <div className="ps-cross" aria-hidden="true">
            <span className="ps-cross-v" />
            <span className="ps-cross-h" />
            <span className="ps-readout" ref={readoutRef} />
          </div>
        </div>

        <button type="button" className="ps-lang" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} {...hotProps}>
          {s.lang}
        </button>
      </section>

      {/* ======================= MIOLO DA REVISTA ======================= */}
      <Magazine
        projects={projects}
        lang={lang}
        aboutText={s.aboutText}
        onOpen={(project, index, from) => setOpen({ project, index, from })}
      />

      <Detail state={open} lang={lang} closeLabel={s.close} onClose={() => setOpen(null)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ficha do projeto                                                     */
/* ------------------------------------------------------------------ */
function Detail({
  state,
  lang,
  closeLabel,
  onClose,
}: {
  state: OpenState | null;
  lang: Lang;
  closeLabel: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closing = useRef(false);
  const [idx, setIdx] = useState(0);
  const w = copy[lang].work;
  const p = state?.project;
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Abertura: a imagem sai do cartão clicado e cresce até a ficha (FLIP).
  useEffect(() => {
    setIdx(state?.index ?? 0);
    const d = ref.current;
    if (!d) return;
    if (state && !d.open) {
      d.showModal();
      closing.current = false;
      if (reduce) return;
      d.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
      const img = imgRef.current;
      const from = state.from;
      const run = () => {
        if (!img) return;
        const to = img.getBoundingClientRect();
        if (from && to.width > 0) {
          const sx = from.width / to.width;
          const sy = from.height / to.height;
          const dx = from.left + from.width / 2 - (to.left + to.width / 2);
          const dy = from.top + from.height / 2 - (to.top + to.height / 2);
          img.animate(
            [
              { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0.6 },
              { transform: 'none', opacity: 1 },
            ],
            { duration: 620, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
          );
        } else {
          img.animate([{ transform: 'scale(0.94)', opacity: 0 }, { transform: 'none', opacity: 1 }], {
            duration: 420,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          });
        }
      };
      if (img && !img.complete) img.addEventListener('load', run, { once: true });
      else requestAnimationFrame(run);
    }
    if (!state && d.open) d.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Fechamento animado (botão, clique fora, Esc).
  const requestClose = () => {
    const d = ref.current;
    if (!d || closing.current) return;
    closing.current = true;
    if (reduce) {
      onClose();
      return;
    }
    const a = d.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(12px) scale(0.985)' },
      ],
      { duration: 220, easing: 'ease-in', fill: 'forwards' },
    );
    a.onfinish = () => {
      onClose();
      a.cancel();
    };
  };

  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % p.assets.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + p.assets.length) % p.assets.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [p]);

  const cs = p?.caseStudy;
  return (
    <dialog
      ref={ref}
      className="ps-detail"
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && requestClose()}
      aria-labelledby="ps-detail-title"
    >
      {p && (
        <div className="ps-detail-inner">
          <button type="button" className="ps-detail-close ps-mono" onClick={requestClose}>
            {closeLabel} ×
          </button>
          <div className="ps-detail-media">
            <img ref={imgRef} key={p.assets[idx].src} className="ps-detail-img" src={p.assets[idx].src} alt={p.assets[idx].alt} />
            {p.assets.length > 1 && (
              <div className="ps-detail-nav ps-mono">
                <button type="button" onClick={() => setIdx((i) => (i - 1 + p.assets.length) % p.assets.length)} aria-label={w.prev}>
                  ←
                </button>
                <span>
                  {String(idx + 1).padStart(2, '0')} / {String(p.assets.length).padStart(2, '0')}
                </span>
                <button type="button" onClick={() => setIdx((i) => (i + 1) % p.assets.length)} aria-label={w.next}>
                  →
                </button>
              </div>
            )}
          </div>
          <div className="ps-detail-text">
            <span className="ps-mono">
              {[p.kind[lang], p.client !== p.title ? p.client : undefined, p.year].filter(Boolean).join(' · ')}
            </span>
            <h2 id="ps-detail-title" className="ps-detail-title">{p.title}</h2>
            {cs ? (
              <dl>
                <div>
                  <dt className="ps-mono">{w.challenge}</dt>
                  <dd>{cs.challenge[lang]}</dd>
                </div>
                <div>
                  <dt className="ps-mono">{w.approach}</dt>
                  <dd>{cs.approach[lang]}</dd>
                </div>
                <div>
                  <dt className="ps-mono">{w.deliverables}</dt>
                  <dd>{cs.deliverables[lang]}</dd>
                </div>
              </dl>
            ) : (
              <p>{p.summary[lang]}</p>
            )}
            <p className="ps-mono ps-detail-role">
              {w.role}: {p.role[lang]}
            </p>
            <div className="ps-detail-ctas">
              <a className="ps-btn" href="#contato" onClick={requestClose}>
                {w.ctaInlineButton} →
              </a>
              {p.link && (
                <a className="ps-btn ps-btn-ghost" href={p.link} target="_blank" rel="noopener noreferrer">
                  {w.visit} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
