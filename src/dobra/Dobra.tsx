import { Fragment, useEffect, useRef, useState } from 'react';
import { projects, type PortfolioProject } from '../data/projects';
import { clients, profile, tools } from '../data/profile';
import { LANGS, WHATSAPP, projectCopy, ui, type Lang, type Section } from './copy';
import photo from './assets/bruna-escritorio.webp';
import { displacementMap, supportsRefraction } from './glass';
import { initialLang } from './locale';

// Versão "dobra": o site inteiro é a primeira dobra. A foto da Bruna no
// escritório cobre todo o banner e um carrossel de palavras gigante
// (arrastável). Cada palavra abre um modal. Textos em src/dobra/copy.ts (pt/en/es/fr).

const t = ui;
const CV_URL = `${import.meta.env.BASE_URL}curriculo-bruna-marchi.pdf`;

const ORDER: Section[] = ['projetos', 'sobre', 'perfil', 'contato'];

// Curadoria: 8 projetos, do mais forte para o mercado editorial ao mais
// complementar. Os outros continuam em src/data/projects.ts (versão pôster).
const FEATURED = [
  'comecando-albertina', // projeto editorial completo: capa, caixa e miolo
  'poliedro', // didático em escala: sistema em centenas de páginas
  'mentalidades-matematicas', // design de informação, relatório
  'yoyo-books', // infantil / livro-brinquedo, mercado internacional
  'josapar-tio-joao', // editorial para marca grande
  'explorum', // didático digital
  'comodines-transmedia', // kit editorial em espanhol
  'poemas-miudinhos', // livro infantil, capa e miolo
  'shell-team', // site: academia, área kids e pré-venda de livro
];
const COPIES = 3;

function LangSwitch({ lang, onLang, label }: { lang: Lang; onLang: (l: Lang) => void; label: string }) {
  return (
    <div className="db-langs" role="group" aria-label={label}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === lang}
          className={l === lang ? 'is-on' : undefined}
          onClick={() => onLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* Palavra com letras que "rolam" no hover                              */
/* ------------------------------------------------------------------ */
function RollWord({ text }: { text: string }) {
  return (
    <span className="db-roll" aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="db-letter" style={{ ['--d' as string]: `${i * 22}ms` }}>
          <span>{ch === ' ' ? '\u00a0' : ch}</span>
          <span>{ch === ' ' ? '\u00a0' : ch}</span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Carrossel de palavras: corre sozinho, arrasta com mouse/dedo         */
/* ------------------------------------------------------------------ */
function Marquee({ labels, onPick }: { labels: Record<Section, string>; onPick: (s: Section, from?: DOMRect) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const el = wrap.current!;
    const tr = track.current!;
    const reduce = prefersReduced();
    let x = 0;
    let setW = tr.scrollWidth / COPIES;
    let vel = reduce ? 0 : -0.9;
    const base = reduce ? 0 : -0.9;
    let drag: { start: number; x0: number; last: number; lt: number } | null = null;
    let hovering = false;
    let raf = 0;

    const wrapX = () => {
      if (setW <= 0) return;
      while (x <= -setW) x += setW;
      while (x > 0) x -= setW;
    };
    const loop = () => {
      if (!drag) {
        const target = hovering ? base * 0.25 : base;
        vel += (target - vel) * 0.05;
        x += vel;
      }
      wrapX();
      tr.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag = { start: e.clientX, x0: x, last: e.clientX, lt: performance.now() };
      dragged.current = false;
      el.classList.add('is-grabbing');
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp, { once: true });
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.start;
      if (Math.abs(dx) > 6) dragged.current = true;
      const now = performance.now();
      vel = ((e.clientX - drag.last) / Math.max(1, now - drag.lt)) * 16;
      drag.last = e.clientX;
      drag.lt = now;
      x = drag.x0 + dx;
    };
    const onUp = () => {
      drag = null;
      el.classList.remove('is-grabbing');
      window.removeEventListener('pointermove', onMove);
    };
    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      vel = Math.max(-40, Math.min(40, vel - d * 0.08));
    };
    const onResize = () => {
      setW = tr.scrollWidth / COPIES;
    };
    const enter = () => (hovering = true);
    const leave = () => (hovering = false);

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(onResize);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [labels]);

  return (
    <nav className="db-marquee" ref={wrap} aria-label="Seções">
      <div className="db-track" ref={track}>
        {Array.from({ length: COPIES }, (_, c) => (
          <div className="db-part" key={c} aria-hidden={c > 0 ? true : undefined}>
            {ORDER.map((key) => (
              <Fragment key={key}>
                <button
                  type="button"
                  className="db-word"
                  tabIndex={c > 0 ? -1 : 0}
                  aria-label={labels[key]}
                  onClick={(e) => {
                    if (dragged.current) {
                      e.preventDefault();
                      dragged.current = false;
                      return;
                    }
                    onPick(key, e.currentTarget.getBoundingClientRect());
                  }}
                >
                  <RollWord text={labels[key]} />
                </button>
                <span className="db-dot" aria-hidden="true" />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                               */
/* ------------------------------------------------------------------ */
export function Dobra() {
  const [lang, setLangState] = useState<Lang>(initialLang);
  // escolha manual fica no link (?lang=), para valer no recarregar e ao compartilhar
  const setLang = (l: Lang) => {
    setLangState(l);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', l);
    window.history.replaceState(null, '', url);
  };
  const s = t[lang];
  const [open, setOpen] = useState<Section | 'menu' | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const pick = (k: Section | 'menu', from?: DOMRect) => {
    setOrigin(from ?? null);
    setOpen(k);
  };
  const [loading, setLoading] = useState(() => !prefersReduced());
  const [word, setWord] = useState(0);

  useEffect(() => {
    document.title = s.docTitle;
    document.documentElement.lang = s.htmlLang;
  }, [lang]);

  // Abertura: palavras trocando no centro, depois a capa aparece.
  useEffect(() => {
    if (!loading) return;
    const iv = window.setInterval(() => setWord((w) => w + 1), 340);
    const to = window.setTimeout(() => setLoading(false), 340 * s.loader.length + 200);
    return () => {
      window.clearInterval(iv);
      window.clearTimeout(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`db ${loading ? 'is-loading' : 'is-ready'}`}>
      <h1 className="visually-hidden">{s.h1}</h1>

      <div className="db-loader" aria-hidden="true">
        <span className="db-loader-c tl">Bruna</span>
        <span className="db-loader-c tr">Marchi</span>
        <span className="db-loader-c bl">{s.portfolio}</span>
        <span className="db-loader-c br">2026</span>
        <span className="db-loader-word">{s.loader[Math.min(word, s.loader.length - 1)]}</span>
      </div>

      <section className="db-hero" aria-label={profile.name}>
        <div className="db-photo">
          <img src={photo} alt="Bruna Marchi sentada à mesa de trabalho, com livro aberto e notebook" />
        </div>

        <header className="db-nav">
          <a className="db-logo" href="./?versao=dobra">
            Bruna Marchi
          </a>
          <div className="db-nav-right">
            <LangSwitch lang={lang} onLang={setLang} label={s.langLabel} />
          <button type="button" className="db-menu" onClick={(e) => pick('menu', e.currentTarget.getBoundingClientRect())} aria-haspopup="dialog">
            <span>{s.menu}</span>
            <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
              <path d="M6 11h20M6 16h20M6 21h20" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          </div>
        </header>

        <p className="db-hint">{s.hint}</p>

        <Marquee labels={s.items} onPick={pick} />
      </section>

      <Modal
        open={open}
        origin={origin}
        lang={lang}
        onClose={() => setOpen(null)}
        onPick={setOpen}
        onLang={setLang}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */
function Modal({
  open,
  origin,
  lang,
  onClose,
  onPick,
  onLang,
}: {
  open: Section | 'menu' | null;
  origin: DOMRect | null;
  lang: Lang;
  onClose: () => void;
  onPick: (s: Section) => void;
  onLang: (l: Lang) => void;
}) {
  const s = t[lang];
  const ref = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const originRef = useRef<DOMRect | null>(null);
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [copied, setCopied] = useState(false);
  const [waName, setWaName] = useState('');
  const [waMsg, setWaMsg] = useState('');
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(null);
  const shown = FEATURED.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is PortfolioProject => Boolean(p && p.assets.length > 0),
  );

  // deslocamento até o ponto de onde o modal "nasce" (a palavra clicada)
  const offsetTo = (panel: HTMLElement, from: DOMRect | null) => {
    if (!from) return { dx: 0, dy: 40 };
    const r = panel.getBoundingClientRect();
    return {
      dx: from.left + from.width / 2 - (r.left + r.width / 2),
      dy: from.top + from.height / 2 - (r.top + r.height / 2),
    };
  };

  // Abertura: a gota de vidro sai da palavra, estica e assenta com mola.
  const animateIn = () => {
    const panel = panelRef.current;
    if (!panel || prefersReduced()) return;
    const { dx, dy } = offsetTo(panel, originRef.current);
    panel.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(0.1, 0.06)`, opacity: 0, borderRadius: '999px' },
        { offset: 0.3, opacity: 1 },
        { offset: 0.58, transform: 'translate(0, 0) scale(1.03, 0.965)', borderRadius: '34px' },
        { offset: 0.76, transform: 'scale(0.988, 1.014)' },
        { offset: 0.9, transform: 'scale(1.004, 0.996)' },
        { transform: 'none', borderRadius: getComputedStyle(panel).borderTopLeftRadius },
      ],
      { duration: 900, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    );
    revealContent(260);
  };

  // Conteúdo entra em cascata, desfocado → nítido.
  const revealContent = (delay = 0) => {
    const panel = panelRef.current;
    if (!panel || prefersReduced()) return;
    const items = [
      panel.querySelector('.db-modal-head'),
      ...Array.from(panel.querySelectorAll('.db-modal-body > * > *, .db-modal-body > p')),
    ].filter(Boolean) as HTMLElement[];
    items.slice(0, 14).forEach((el, i) =>
      el.animate(
        [
          { opacity: 0, transform: 'translateY(16px)', filter: 'blur(6px)' },
          { opacity: 1, transform: 'none', filter: 'blur(0)' },
        ],
        { duration: 620, delay: delay + i * 45, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' },
      ),
    );
  };

  useEffect(() => {
    const d = ref.current!;
    setProject(null);
    if (open && !d.open) {
      originRef.current = origin;
      d.showModal();
      closing.current = false;
      animateIn();
    } else if (open) {
      revealContent();
    }
    if (!open && d.open) d.close();
    d.querySelector('.db-modal-body')?.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    ref.current?.querySelector('.db-modal-body')?.scrollTo(0, 0);
    if (open) revealContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // Mapa de refração do tamanho exato do painel (refeito se o tamanho muda).
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel || !supportsRefraction) return;
    let timer = 0;
    let last = '';
    const build = () => {
      const w = panel.offsetWidth;
      const h = panel.offsetHeight;
      const key = `${w}x${h}`;
      if (!w || !h || key === last) return;
      last = key;
      const radius = parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 28;
      setMap({ url: displacementMap(w, h, radius, Math.min(56, Math.min(w, h) * 0.12)), w, h });
    };
    build();
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(build, 120);
    });
    ro.observe(panel);
    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
    };
  }, [open]);

  // Fechamento: encolhe de volta para a palavra, como gota.
  const requestClose = () => {
    const d = ref.current;
    const panel = panelRef.current;
    if (!d || closing.current) return;
    closing.current = true;
    if (!panel || prefersReduced()) return onClose();
    const { dx, dy } = offsetTo(panel, originRef.current);
    const a = panel.animate(
      [
        { transform: 'none', opacity: 1 },
        { offset: 0.3, transform: 'scale(1.02, 0.98)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.1, 0.06)`, opacity: 0, borderRadius: '999px' },
      ],
      { duration: 460, easing: 'cubic-bezier(0.55, 0, 0.75, 0.2)', fill: 'forwards' },
    );
    d.classList.add('is-closing');
    a.onfinish = () => {
      d.classList.remove('is-closing');
      onClose();
      a.cancel();
    };
  };

  // Brilho especular que segue o ponteiro, como luz batendo no vidro.
  const onGlassMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* e-mail continua visível e selecionável */
    }
  };

  const title = open === 'menu' ? s.menu : open ? s.items[open] : '';

  return (
    <dialog
      ref={ref}
      className="db-modal"
      aria-labelledby="db-modal-title"
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && requestClose()}
    >
      {map && (
        <svg className="db-glass-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <filter
            id="db-glass"
            x="0"
            y="0"
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage href={map.url} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="96" xChannelSelector="R" yChannelSelector="G" result="dr" />
            <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="90" xChannelSelector="R" yChannelSelector="G" result="dg" />
            <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="84" xChannelSelector="R" yChannelSelector="G" result="db" />
            <feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" />
          </filter>
        </svg>
      )}
      {open && (
        <div
          ref={panelRef}
          className={`db-modal-panel is-${project ? 'projeto' : open} ${map ? 'is-refract' : ''}`}
          onPointerMove={onGlassMove}
        >
          <span className="db-glass-scrim" aria-hidden="true" />
          <header className="db-modal-head">
            <h2 id="db-modal-title" className="db-modal-title">
              {project ? project.title : title}
            </h2>
            <button type="button" className="db-modal-close" onClick={requestClose} aria-label={s.close} title={s.close}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div className="db-modal-body">
            {open === 'menu' && (
              <div className="db-menu-list">
                {ORDER.map((k, i) => (
                  <button type="button" key={k} onClick={() => onPick(k)}>
                    <span className="db-num">{String(i + 1).padStart(2, '0')}</span>
                    <RollWord text={s.items[k]} />
                    <span className="visually-hidden">{s.items[k]}</span>
                  </button>
                ))}
                <div className="db-lang">
                  <span className="db-label">{s.langLabel}</span>
                  <LangSwitch lang={lang} onLang={onLang} label={s.langLabel} />
                </div>
              </div>
            )}

            {open === 'projetos' && !project && (
              <>
                <ul className="db-grid">
                  {shown.map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => setProject(p)}>
                        <span className="db-card-img">
                          <img src={p.assets[0].src} alt="" loading="lazy" />
                        </span>
                        <span className="db-card-title">{p.title}</span>
                        <span className="db-card-kind">{projectCopy[p.id]?.[lang].kind ?? p.kind.pt}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {open === 'projetos' && project && <ProjectView p={project} lang={lang} onBack={() => setProject(null)} />}

            {open === 'sobre' && (
              <div className="db-prose">
                {s.about.map((para, i) => (
                  <p key={i} className={i === 0 ? 'db-lead' : undefined}>
                    {para}
                  </p>
                ))}
              </div>
            )}

            {open === 'perfil' && (
              <div className="db-profile">
                <p className="db-deck">{s.profileDeck}</p>
                <section className="db-services" aria-label={s.servicesTitle}>
                  <h3 className="db-sub">{s.servicesTitle}</h3>
                  <ul>
                    {s.services.map((it) => (
                      <li key={it.title}>
                        <strong>{it.title}</strong>
                        <span>{it.text}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="db-how" aria-label={s.howTitle}>
                  <h3 className="db-sub">{s.howTitle}</h3>
                  <ol>
                    {s.how.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ol>
                </section>
                <dl>
                  <div>
                    <dt>{s.clients}</dt>
                    <dd>
                      <ul className="db-chips">
                        {clients.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>{s.tools}</dt>
                    <dd>
                      <ul className="db-chips">
                        {tools.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>{s.langs}</dt>
                    <dd>
                      <ul className="db-chips">
                        {s.langList.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>{s.formats}</dt>
                    <dd>
                      <ul className="db-chips">
                        {s.formatList.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {open === 'contato' && (
              <div className="db-contact">
                <p className="db-closing">{s.closing}</p>

                <ul className="db-social">
                  <li>
                    <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.96c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75Z"
                        />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a href={profile.contact.behance} target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M8.2 11.4c.9-.4 1.4-1.1 1.4-2.2C9.6 7 8 6.3 6 6.3H.8v11.4h5.4c2 0 3.9-1 3.9-3.3 0-1.4-.7-2.5-1.9-3Zm-5-3.1h2.4c.9 0 1.7.3 1.7 1.3 0 1-.6 1.3-1.5 1.3H3.2V8.3Zm2.6 7.4H3.2v-3.1h2.7c1.1 0 1.8.5 1.8 1.6 0 1.2-.8 1.5-1.9 1.5ZM15.1 7h4.5v1.3h-4.5V7Zm6.7 6.6c0-2.6-1.5-4.7-4.2-4.7-2.6 0-4.4 2-4.4 4.6 0 2.7 1.7 4.5 4.4 4.5 2.1 0 3.4-.9 4-2.9h-2.1c-.2.7-1.1 1.1-1.8 1.1-1.3 0-2-.8-2-2.1h6.1v-.5Zm-6.1-1c.1-1.1.8-1.7 1.8-1.7 1.1 0 1.6.6 1.7 1.7h-3.5Z"
                        />
                      </svg>
                      <span>Behance</span>
                    </a>
                  </li>
                  <li>
                    <a href={CV_URL} download="curriculo-bruna-marchi.pdf">
                      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                        <path
                          d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{s.cvDownload}</span>
                    </a>
                  </li>
                </ul>

                <form
                  className="db-wa"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value ?? 'wa';
                    const text = `${s.waGreeting(waName.trim())}\n\n${waMsg.trim()}`.trim();
                    if (via === 'wa' || via === 'both') {
                      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
                    }
                    if (via === 'mail' || via === 'both') {
                      const subject = `${s.mailSubject}${waName.trim() ? ` · ${waName.trim()}` : ''}`;
                      window.location.href = `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
                    }
                  }}
                >
                  <h3 className="db-sub">{s.waTitle}</h3>
                  <label>
                    <span className="db-label">{s.waName}</span>
                    <input value={waName} onChange={(e) => setWaName(e.target.value)} autoComplete="name" />
                  </label>
                  <label>
                    <span className="db-label">{s.waMessage}</span>
                    <textarea
                      value={waMsg}
                      onChange={(e) => setWaMsg(e.target.value)}
                      placeholder={s.waMessagePh}
                      rows={3}
                      required
                    />
                  </label>
                  <div className="db-send">
                    <button type="submit" name="via" value="wa" className="db-send-btn is-wa">
                      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"
                        />
                      </svg>
                      {s.waSend}
                    </button>
                    <button type="submit" name="via" value="mail" className="db-send-btn is-mail">
                      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                        <path d="M3 6h18v12H3z M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      </svg>
                      {s.waSendMail}
                    </button>
                    <button type="submit" name="via" value="both" className="db-send-btn is-both">
                      {s.waSendBoth}
                    </button>
                  </div>
                </form>

                <p className="db-email-line">
                  <span className="db-label">{s.email}</span>
                  <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                  <button type="button" className="db-mini" onClick={copyEmail} aria-live="polite">
                    {copied ? s.copied : s.copy}
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

function ProjectView({ p, lang, onBack }: { p: PortfolioProject; lang: Lang; onBack: () => void }) {
  const s = t[lang];
  const [idx, setIdx] = useState(0);
  const n = p.assets.length;
  const base = lang === 'pt' ? 'pt' : 'en';
  const pc = projectCopy[p.id]?.[lang] ?? {
    kind: p.kind[base],
    role: p.role[base],
    headline: p.summary[base],
    problem: p.caseStudy?.challenge[base] ?? '',
    solution: p.caseStudy?.approach[base] ?? '',
    impact: p.caseStudy?.deliverables[base] ?? '',
  };


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (n < 2) return;
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % n);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + n) % n);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [n]);

  return (
    <article className="db-project">
      <button type="button" className="db-back" onClick={onBack}>
        ← {s.back}
      </button>
      <figure className="db-project-media">
        <img key={p.assets[idx].src} src={p.assets[idx].src} alt={p.assets[idx].alt} />
        {n > 1 && (
          <div className="db-project-nav">
            <button type="button" onClick={() => setIdx((i) => (i - 1 + n) % n)} aria-label={s.prev}>
              ←
            </button>
            <span>
              {String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => setIdx((i) => (i + 1) % n)} aria-label={s.next}>
              →
            </button>
          </div>
        )}
      </figure>
      <div className="db-project-text">
        <p className="db-label">{[pc.kind, p.client !== p.title ? p.client : undefined, p.year?.replace(/\s*—\s*/, '–')].filter(Boolean).join(' · ')}</p>
        <p className="db-headline">{pc.headline}</p>
        <dl>
          {pc.problem && (
            <div>
              <dt>{s.challenge}</dt>
              <dd>{pc.problem}</dd>
            </div>
          )}
          {pc.solution && (
            <div>
              <dt>{s.approach}</dt>
              <dd>{pc.solution}</dd>
            </div>
          )}
          {pc.impact && (
            <div>
              <dt>{s.deliverables}</dt>
              <dd>{pc.impact}</dd>
            </div>
          )}
        </dl>
        <p className="db-label">
          {s.role}: {pc.role}
        </p>
        {p.link && (
          <a className="db-mini" href={p.link} target="_blank" rel="noopener noreferrer">
            {s.visit} ↗
          </a>
        )}
      </div>
    </article>
  );
}
