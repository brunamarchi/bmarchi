import { useEffect, useRef, useState } from 'react';
import type { PortfolioProject } from '../data/projects';
import { copy, type Lang } from './copy';

interface Props {
  lang: Lang;
  state: { project: PortfolioProject; index: number } | null;
  onClose: () => void;
  onContact: () => void;
}

/** Ficha do projeto: galeria + texto do caso + chamada para contato. */
export function ProjectDialog({ lang, state, onClose, onContact }: Props) {
  const c = copy[lang].work;
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const p = state?.project;

  useEffect(() => {
    setIndex(state?.index ?? 0);
    const d = ref.current;
    if (!d) return;
    if (state && !d.open) d.showModal();
    if (!state && d.open) d.close();
  }, [state]);

  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % p.assets.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + p.assets.length) % p.assets.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [p]);

  const asset = p?.assets[index];
  const cs = p?.caseStudy;

  return (
    <dialog
      ref={ref}
      className="lp-dialog"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="lp-dialog-title"
    >
      {p && (
        <div className="lp-dialog-inner">
          <button type="button" className="lp-dialog-close" onClick={onClose} aria-label={c.close}>
            ×
          </button>

          <div className="lp-dialog-media">
            {asset && <img src={asset.src} alt={asset.alt} />}
            {p.assets.length > 1 && (
              <div className="lp-dialog-nav">
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i - 1 + p.assets.length) % p.assets.length)}
                  aria-label={c.prev}
                >
                  ←
                </button>
                <span>
                  {index + 1} / {p.assets.length}
                </span>
                <button type="button" onClick={() => setIndex((i) => (i + 1) % p.assets.length)} aria-label={c.next}>
                  →
                </button>
              </div>
            )}
            {p.assets.length > 1 && (
              <div className="lp-dialog-thumbs">
                {p.assets.map((a, i) => (
                  <button
                    type="button"
                    key={a.src}
                    aria-pressed={i === index}
                    aria-label={a.alt}
                    onClick={() => setIndex(i)}
                  >
                    <img src={a.src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lp-dialog-text">
            <p className="lp-case-meta">
              {[p.kind[lang], p.client && p.client !== p.title ? p.client : undefined, p.year].filter(Boolean).join(' · ')}
            </p>
            <h2 id="lp-dialog-title" className="lp-dialog-title">
              {p.title}
            </h2>
            {cs ? (
              <dl className="lp-dialog-story">
                <div>
                  <dt>{c.challenge}</dt>
                  <dd>{cs.challenge[lang]}</dd>
                </div>
                <div>
                  <dt>{c.approach}</dt>
                  <dd>{cs.approach[lang]}</dd>
                </div>
                <div>
                  <dt>{c.deliverables}</dt>
                  <dd>{cs.deliverables[lang]}</dd>
                </div>
              </dl>
            ) : (
              <p className="lp-dialog-summary">{p.summary[lang]}</p>
            )}
            <dl className="lp-dialog-facts">
              <div>
                <dt>{c.role}</dt>
                <dd>{p.role[lang]}</dd>
              </div>
              {p.tools && (
                <div>
                  <dt>{c.tools}</dt>
                  <dd>{p.tools.join(' · ')}</dd>
                </div>
              )}
            </dl>
            {cs?.tags && (
              <ul className="lp-tags">
                {cs.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
            <div className="lp-dialog-ctas">
              <button type="button" className="lp-btn lp-btn-primary" onClick={onContact}>
                {c.ctaInlineButton} <span aria-hidden="true">→</span>
              </button>
              {p.link && (
                <a className="lp-btn lp-btn-ghost" href={p.link} target="_blank" rel="noopener noreferrer">
                  {c.visit} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
