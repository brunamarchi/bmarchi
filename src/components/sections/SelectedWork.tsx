import { useI18n } from '../../i18n';
import { projects } from '../../data/projects';
import styles from './SelectedWork.module.css';

export function SelectedWork() {
  const { t, locale } = useI18n();

  return (
    <section id="work" className="chapter" aria-labelledby="work-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.selectedWork.number} — {t.selectedWork.chapterLabel}</span>
        </div>
        <h2 id="work-heading" className="chapter-title">
          {t.selectedWork.title}
        </h2>
        <p className={styles.intro}>{t.selectedWork.intro}</p>

        <div className={styles.list}>
          {projects.map((project, i) => (
            <details className={styles.item} key={project.id}>
              <summary className={styles.summary}>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.title}>
                  {project.title}
                  {project.client && <span className={styles.client}>{project.client}</span>}
                </span>
                <span className={styles.client}>{project.partner ?? project.category[0]}</span>
                <span className={styles.year}>{project.year ?? '—'}</span>
              </summary>
              <div className={styles.details}>
                <div>
                  {project.summary && (
                    <p className={styles.summaryText}>
                      {locale === 'pt' ? project.summary.pt : project.summary.en}
                    </p>
                  )}
                </div>
                <div className={styles.meta}>
                  <div>
                    <div className={styles.metaLabel}>Role</div>
                    <div>{project.role.join(' · ')}</div>
                  </div>
                  {project.tools && (
                    <div>
                      <div className={styles.metaLabel}>Tools</div>
                      <div>{project.tools.join(' · ')}</div>
                    </div>
                  )}
                  <div className={styles.placeholder}>
                    {project.publishable ? t.selectedWork.caseComingSoon : t.selectedWork.notPublishable}
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
