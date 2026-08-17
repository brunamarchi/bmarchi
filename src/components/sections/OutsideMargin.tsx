import { useI18n } from '../../i18n';
import styles from './OutsideMargin.module.css';

export function OutsideMargin() {
  const { t } = useI18n();

  return (
    <section id="margin" className={styles.section} aria-labelledby="margin-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className={styles.eyebrow}>
            {t.outsideMargin.number} — {t.outsideMargin.chapterLabel}
          </span>
        </div>
        <h2 id="margin-heading" className={styles.quote}>
          {t.outsideMargin.quote}
        </h2>
        <p className={styles.lead}>{t.outsideMargin.lead}</p>

        <div className={styles.gallery} aria-hidden="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className={styles.piece} key={i}>
              {t.outsideMargin.comingSoon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
