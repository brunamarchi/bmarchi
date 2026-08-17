import { useI18n } from '../../i18n';
import { languages, tools, expertiseAreas, profile } from '../../data/profile';
import styles from './About.module.css';

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

        <div className={styles.grid}>
          <div className={styles.photo}>{t.about.photoPlaceholder}</div>

          <div>
            <p className={styles.bio}>{t.about.bio}</p>

            <div className={styles.metaGrid}>
              <div className={styles.metaBlock}>
                <span className={styles.metaTitle}>{t.about.expertiseTitle}</span>
                <div className={styles.tagList}>
                  {expertiseAreas.map((key) => (
                    <span className={styles.tag} key={key}>
                      {t.about.expertiseAreas[key]}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.metaBlock}>
                <span className={styles.metaTitle}>{t.about.toolsTitle}</span>
                <div className={styles.tagList}>
                  {tools.map((tool) => (
                    <span className={styles.tag} key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.metaBlock}>
                <span className={styles.metaTitle}>{t.about.languagesTitle}</span>
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
                <span className={styles.metaTitle}>{t.about.locationLabel}</span>
                <p>{t.about.availability}</p>
              </div>
            </div>

            <p className={styles.footerMeta}>{profile.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
