import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useI18n } from '../i18n';
import type { ProjectAsset } from '../data/projects';
import styles from './lightbox.module.css';

export interface LightboxMeta {
  title: string;
  subtitle?: string;
  text?: string;
}

interface LightboxState {
  images: ProjectAsset[];
  index: number;
  meta?: LightboxMeta;
}

type OpenFn = (images: ProjectAsset[], index: number, meta?: LightboxMeta) => void;

const LightboxContext = createContext<OpenFn | null>(null);

/** Visualizador em tela cheia para as imagens de projeto (páginas duplas, miolos). */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const [state, setState] = useState<LightboxState | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback<OpenFn>((images, index, meta) => setState({ images, index, meta }), []);
  const close = useCallback(() => setState(null), []);
  const step = useCallback(
    (delta: number) =>
      setState((s) => (s ? { ...s, index: (s.index + delta + s.images.length) % s.images.length } : s)),
    [],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (state && !dialog.open) dialog.showModal();
    if (!state && dialog.open) dialog.close();
  }, [state]);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [state, step]);

  const current = state?.images[state.index];
  const many = (state?.images.length ?? 0) > 1;

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-label={current?.alt}
      >
        {current && (
          <figure className={styles.figure}>
            <img className={styles.image} src={current.src} alt={current.alt} />
            {state?.meta && (
              <div className={styles.meta}>
                <p className={styles.metaTitle}>{state.meta.title}</p>
                {state.meta.subtitle && <p className={styles.metaSub}>{state.meta.subtitle}</p>}
                {state.meta.text && <p className={styles.metaText}>{state.meta.text}</p>}
              </div>
            )}
            <figcaption className={styles.caption}>
              {current.alt}
              {many && (
                <span className={styles.count}>
                  {state!.index + 1} / {state!.images.length}
                </span>
              )}
            </figcaption>
          </figure>
        )}
        <button type="button" className={styles.close} onClick={close} aria-label={t.lightbox.close}>
          ×
        </button>
        {many && (
          <>
            <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => step(-1)} aria-label={t.lightbox.prev}>
              ←
            </button>
            <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => step(1)} aria-label={t.lightbox.next}>
              →
            </button>
          </>
        )}
      </dialog>
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
}
