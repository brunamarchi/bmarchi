import { useRef } from 'react';
import { useI18n } from '../../i18n';
import { useGsapStagger } from '../../hooks/useGsapStagger';
import styles from './Process.module.css';

export function Process() {
  const { t } = useI18n();
  const stepsRef = useRef<HTMLDivElement>(null);

  useGsapStagger(stepsRef, { childSelector: `.${styles.step}`, stagger: 0.04, y: 10 });

  return (
    <section id="process" className="chapter" aria-labelledby="process-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.process.number} — {t.process.chapterLabel}</span>
        </div>
        <h2 id="process-heading" className="chapter-title">
          {t.process.title}
        </h2>

        <div className={styles.steps} ref={stepsRef}>
          {t.process.steps.map((step, i) => (
            <div className={styles.step} key={step}>
              <span className={styles.stepIndex}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.stepLabel}>{step}</span>
            </div>
          ))}
        </div>

        <div className={styles.gallery}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div className={styles.placeholder} key={i}>
              {t.process.note}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
