import { useI18n } from '../../i18n';
import { languages, tools, expertiseAreas } from '../../data/profile';
import styles from './About.module.css';

// Sem foto por enquanto: o bloco tracejado "Fotografia a confirmar" saiu do ar.
// Quando a foto chegar, volte a usar a grade de 2 colunas (.grid) com <img>.

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="chapter" aria-labelledby="about-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.about.number} — {t.about.chapterLabel}</span>
        </div>
        <h2 id="about-heading" className="visually-hidden">
          {t.about.title}
        </h2>

        <p className={styles.bio}>{t.about.bio}</p>

        <div className={styles.metaGrid}>
          <div className={styles.metaBlock}>
            <h3 className={styles.metaTitle}>{t.about.expertiseTitle}</h3>
            <ul className={styles.tagList}>
              {expertiseAreas.map((key) => (
                <li className={styles.tag} key={key}>
                  {t.about.expertiseAreas[key]}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.metaBlock}>
            <h3 className={styles.metaTitle}>{t.about.toolsTitle}</h3>
            <ul className={styles.tagList}>
              {tools.map((tool) => (
                <li className={styles.tag} key={tool}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.metaBlock}>
            <h3 className={styles.metaTitle}>{t.about.languagesTitle}</h3>
            <ul className={styles.langList}>
              {languages.map((lang) => (
                <li key={lang.key}>
                  {t.about.languageNames[lang.key] ?? lang.key}{' '}
                  <span className={styles.langLevel}>— {t.about.languageLevels[lang.level]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.metaBlock}>
            <h3 className={styles.metaTitle}>{t.about.availabilityTitle}</h3>
            <p className={styles.availability}>{t.about.availability}</p>
            <p className={styles.location}>{t.colophon.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
