import { useI18n } from '../../i18n';
import { profile, prettyUrl } from '../../data/profile';
import styles from './Contact.module.css';

export function Contact() {
  const { t } = useI18n();
  const { email, linkedin, behance, github } = profile.contact;

  const links = [
    { label: t.contact.emailLabel, href: `mailto:${email}`, text: email },
    { label: t.contact.linkedinLabel, href: linkedin, text: 'in/bruna-marchi' },
    { label: t.contact.behanceLabel, href: behance, text: prettyUrl(behance) },
    { label: t.contact.githubLabel, href: github, text: prettyUrl(github) },
  ];

  return (
    <section id="contact" className="chapter" aria-labelledby="contact-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.contact.number} — {t.contact.chapterLabel}</span>
        </div>
        <h2 id="contact-heading" className={styles.quote}>
          {t.contact.quote}
        </h2>
        <p className={styles.lead}>{t.contact.lead}</p>

        <ul className={styles.links}>
          {links.map((link) => {
            const external = !link.href.startsWith('mailto:');
            return (
              <li key={link.label}>
                <a
                  className={styles.link}
                  href={link.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={styles.linkLabel}>{link.label}</span>
                  <span className={styles.linkValue}>
                    {link.text} <span aria-hidden="true">{external ? '↗' : '→'}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

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
