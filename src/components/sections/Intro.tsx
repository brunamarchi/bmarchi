import { useI18n } from '../../i18n';
import { clients } from '../../data/profile';
import styles from './Intro.module.css';

export function Intro() {
  const { t } = useI18n();

  return (
    <section id="intro" className="chapter" aria-labelledby="intro-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.intro.number} — {t.intro.eyebrow}</span>
        </div>
        <h2 id="intro-heading" className="visually-hidden">
          {t.intro.eyebrow}
        </h2>

        <p className={styles.lead}>{t.intro.lead}</p>

        <h3 className={styles.areasTitle}>{t.intro.clientsTitle}</h3>
        <ul className={styles.clients}>
          {clients.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        <h3 className={styles.areasTitle}>{t.intro.areasTitle}</h3>
        <ol className={styles.areas}>
          {t.intro.areas.map((area, i) => (
            <li className={styles.area} key={area.title}>
              <span className={styles.areaIndex}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className={styles.areaTitle}>{area.title}</div>
                <p className={styles.areaDescription}>{area.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
