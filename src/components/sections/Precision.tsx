import { useRef } from 'react';
import { useI18n } from '../../i18n';
import { useGsapStagger } from '../../hooks/useGsapStagger';
import styles from './Precision.module.css';

export function Precision() {
  const { t } = useI18n();
  const examsRef = useRef<HTMLOListElement>(null);

  useGsapStagger(examsRef, { childSelector: `.${styles.exam}`, stagger: 0.06, y: 14 });

  return (
    <section id="precision" className="chapter" aria-labelledby="precision-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.precision.number} — {t.precision.chapterLabel}</span>
        </div>
        <h2 id="precision-heading" className="chapter-title">
          {t.precision.title}
        </h2>

        <div className={styles.grid}>
          <ol className={styles.exams} ref={examsRef}>
            {t.precision.exams.map((exam, i) => (
              <li className={styles.exam} key={exam}>
                <span className={styles.examIndex}>{String(i + 1).padStart(2, '0')}</span>
                {exam}
              </li>
            ))}
          </ol>
          <div className={styles.side}>
            <p className={styles.intro}>{t.precision.intro}</p>
            <div className={styles.narrative}>
              {t.precision.narrative.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
