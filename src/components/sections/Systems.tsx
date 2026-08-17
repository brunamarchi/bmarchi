import { useRef } from 'react';
import { useI18n } from '../../i18n';
import { useGsapStagger } from '../../hooks/useGsapStagger';
import styles from './Systems.module.css';

const PAGE_COUNT = 24;

export function Systems() {
  const { t } = useI18n();
  const pagesRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useGsapStagger(pagesRef, { childSelector: `.${styles.page}`, stagger: 0.015, y: 8, scale: 0.9 });
  useGsapStagger(tagsRef, { childSelector: `.${styles.tag}`, stagger: 0.04, y: 6, start: 'top 85%' });

  return (
    <section id="systems" className="chapter" aria-labelledby="systems-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.systems.number} — {t.systems.chapterLabel}</span>
        </div>
        <h2 id="systems-heading" className={styles.quote}>
          {t.systems.quoteLine1}
          <br />
          {t.systems.quoteLine2}
        </h2>

        <div className={styles.pages} ref={pagesRef} aria-hidden="true">
          {Array.from({ length: PAGE_COUNT }).map((_, i) => (
            <div className={styles.page} key={i} />
          ))}
        </div>

        <div className={styles.tags} ref={tagsRef}>
          {t.systems.tags.map((tag) => (
            <span className={styles.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
