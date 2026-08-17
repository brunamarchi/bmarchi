import { useRef } from 'react';
import { useI18n } from '../../i18n';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import styles from './Cover.module.css';

export function Cover() {
  const { t } = useI18n();
  const titleRef = useRef<HTMLHeadingElement>(null);
  useGsapReveal(titleRef, { y: 24, duration: 1 });

  return (
    <section id="top" className={styles.cover} aria-label={t.cover.eyebrowName}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className={styles.middle}>
          <div>
            <h1 className={styles.title} ref={titleRef}>
              {t.cover.titleLine1}
              <br />
              <em>{t.cover.titleLine2}</em>
            </h1>
            <p className={styles.subtitle}>{t.cover.subtitle}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <a href="#intro" className={styles.scrollCta}>
            {t.cover.scrollCta}
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v9M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
          <span>{t.cover.pageIndicator}</span>
        </div>
      </div>
    </section>
  );
}
