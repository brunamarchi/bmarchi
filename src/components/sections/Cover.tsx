import { useRef } from 'react';
import { useI18n } from '../../i18n';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import { coverImages } from '../../data/projects';
import styles from './Cover.module.css';

export function Cover() {
  const { t } = useI18n();
  const titleRef = useRef<HTMLParagraphElement>(null);
  useGsapReveal(titleRef, { y: 24, duration: 1 });

  return (
    <section id="top" className={styles.cover} aria-labelledby="cover-heading">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className={styles.middle}>
          <div>
            {/* O h1 diz quem ela é e o que faz (é o que o Google e o recrutador leem
                primeiro); o mote "Entre método e expressão" segue como título visual. */}
            <h1 id="cover-heading" className={styles.role}>
              {t.cover.role}
            </h1>
            <p className={styles.title} ref={titleRef}>
              {t.cover.titleLine1}
              <br />
              <em>{t.cover.titleLine2}</em>
            </p>
            <p className={styles.subtitle}>{t.cover.subtitle}</p>
            <div className={styles.ctas}>
              <a href="#cases" className={styles.ctaPrimary}>
                {t.cover.ctaWork}
              </a>
              <a href="#contact" className={styles.ctaSecondary}>
                {t.cover.ctaContact}
              </a>
            </div>
          </div>
          {/* Primeira tela já mostra trabalho, não só texto. */}
          <a href="#cases" className={styles.collage} aria-label={t.cover.ctaWork}>
            {coverImages.map((img) => (
              <span className={styles.collageItem} key={img.src}>
                <img src={img.src} alt={img.alt} />
              </span>
            ))}
          </a>
        </div>

        <div className={styles.bottom}>
          <a href="#intro" className={styles.scrollCta}>
            {t.intro.eyebrow}
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v9M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
          <span>{t.cover.pageIndicator}</span>
        </div>
      </div>
    </section>
  );
}
