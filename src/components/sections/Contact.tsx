import { useI18n } from '../../i18n';
import { profile } from '../../data/profile';
import styles from './Contact.module.css';

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="chapter" aria-labelledby="contact-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.contact.number} — {t.contact.chapterLabel}</span>
        </div>
        <h2 id="contact-heading" className={styles.quote}>
          {t.contact.quote}
        </h2>

        <div className={styles.links}>
          <div className={styles.link}>
            <span className={styles.linkLabel}>{t.contact.emailLabel}</span>
            <span className={styles.linkValue}>{profile.contact.email}</span>
          </div>
          <div className={styles.link}>
            <span className={styles.linkLabel}>{t.contact.linkedinLabel}</span>
            <span className={styles.linkValue}>{profile.contact.linkedin}</span>
          </div>
          <div className={styles.link}>
            <span className={styles.linkLabel}>{t.contact.behanceLabel}</span>
            <span className={styles.linkValue}>{profile.contact.behance}</span>
          </div>
        </div>

        <footer className={styles.colophon}>
          <span>{t.colophon.rights}</span>
          <span>{t.colophon.fonts}</span>
          <span>{t.colophon.location}</span>
          <a href="#top">{t.colophon.backToTop}</a>
        </footer>
      </div>
    </section>
  );
}
