import { useI18n } from '../../i18n';
import styles from './Formats.module.css';

const voiceClasses = [styles.voice0, styles.voice1, styles.voice2, styles.voice3, styles.voice4, styles.voice5];

export function Formats() {
  const { t } = useI18n();

  return (
    <section id="formats" className="chapter" aria-labelledby="formats-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.formats.number} — {t.formats.chapterLabel}</span>
        </div>
        <h2 id="formats-heading" className={styles.quote}>
          {t.formats.quote}
        </h2>

        <ul className={styles.list}>
          {t.formats.formats.map((format, i) => (
            <li className={styles.item} key={format}>
              <span className={voiceClasses[i % voiceClasses.length]}>{format}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
