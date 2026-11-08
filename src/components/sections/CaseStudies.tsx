import { useI18n } from '../../i18n';
import { caseStudies } from '../../data/projects';
import { useLightbox } from '../../lib/lightbox';
import styles from './CaseStudies.module.css';

export function CaseStudies() {
  const { t, locale } = useI18n();
  const openLightbox = useLightbox();

  return (
    <section id="cases" className="chapter" aria-labelledby="cases-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.cases.number} — {t.cases.chapterLabel}</span>
        </div>
        <h2 id="cases-heading" className="chapter-title">
          {t.cases.title}
        </h2>
        <p className={styles.intro}>{t.cases.intro}</p>

        {caseStudies.map((project, i) => {
          const cs = project.caseStudy!;
          return (
            <article className={styles.case} key={project.id} id={`case-${project.id}`} aria-labelledby={`case-title-${project.id}`}>
              <header className={styles.header}>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className={styles.kind}>
                    {project.kind[locale]}
                    {project.year && <span> · {project.year}</span>}
                  </p>
                  <h3 id={`case-title-${project.id}`} className={styles.title}>
                    {project.title}
                  </h3>
                  {project.client && project.client !== project.title && (
                    <p className={styles.client}>{project.client}</p>
                  )}
                </div>
              </header>

              <div className={styles.gallery}>
                {project.assets.map((asset, idx) => (
                  <button
                    type="button"
                    key={asset.src}
                    className={`${styles.shot} ${asset.wide || idx === 0 ? styles.shotWide : ''}`}
                    onClick={() => openLightbox(project.assets, idx)}
                    aria-label={`${t.lightbox.open}: ${asset.alt}`}
                  >
                    <img src={asset.src} alt={asset.alt} loading="lazy" />
                  </button>
                ))}
              </div>

              <div className={styles.text}>
                {cs.quote && <p className={styles.quote}>{cs.quote[locale]}</p>}
                <dl className={styles.story}>
                  <div>
                    <dt>{t.cases.challenge}</dt>
                    <dd>{cs.challenge[locale]}</dd>
                  </div>
                  <div>
                    <dt>{t.cases.approach}</dt>
                    <dd>{cs.approach[locale]}</dd>
                  </div>
                  <div>
                    <dt>{t.cases.deliverables}</dt>
                    <dd>{cs.deliverables[locale]}</dd>
                  </div>
                </dl>

                <div className={styles.meta}>
                  <span>
                    <strong>{t.archive.roleLabel}</strong> {project.role[locale]}
                  </span>
                  {project.tools && (
                    <span>
                      <strong>{t.archive.toolsLabel}</strong> {project.tools.join(' · ')}
                    </span>
                  )}
                </div>

                {cs.tags && (
                  <ul className={styles.tags}>
                    {cs.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
                {cs.note && <p className={styles.note}>{cs.note[locale]}</p>}
                {project.link && (
                  <a className={styles.link} href={project.link} target="_blank" rel="noopener noreferrer">
                    {t.cases.visit} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
