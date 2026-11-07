import { useState } from 'react';
import { useI18n } from '../../i18n';
import { projects, segments, type ProjectSegment } from '../../data/projects';
import { ProjectCard } from '../ProjectCard';
import styles from './SelectedWork.module.css';

type Filter = 'all' | ProjectSegment;

export function SelectedWork() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = projects.filter((p) => filter === 'all' || p.segment === filter);
  const withImages = visible.filter((p) => p.assets.length > 0);
  const textOnly = visible.filter((p) => p.assets.length === 0);

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t.selectedWork.filterAll },
    ...segments.map((s) => ({ id: s, label: t.selectedWork.segments[s as keyof typeof t.selectedWork.segments] })),
  ];

  return (
    <section id="work" className="chapter" aria-labelledby="work-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.selectedWork.number} — {t.selectedWork.chapterLabel}</span>
        </div>
        <h2 id="work-heading" className="chapter-title">
          {t.selectedWork.title}
        </h2>

        <div className={styles.toolbar}>
          <p className={styles.intro}>{t.selectedWork.intro}</p>
          <div className={styles.filters} role="group" aria-label={t.selectedWork.filterLabel}>
            {filters.map((f) => (
              <button
                type="button"
                key={f.id}
                className={styles.filter}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {withImages.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>

        {textOnly.length > 0 && (
          <div className={styles.also}>
            <h3 className={styles.alsoTitle}>
              {t.selectedWork.alsoTitle} <span>— {t.selectedWork.noImages}</span>
            </h3>
            <ul className={styles.alsoList}>
              {textOnly.map((p) => (
                <li className={styles.alsoItem} key={p.id}>
                  <span className={styles.alsoName}>{p.title}</span>
                  <span className={styles.alsoKind}>
                    {p.kind[locale]}
                    {p.partner && ` · ${p.partner}`}
                  </span>
                  <span className={styles.alsoYear}>{p.year}</span>
                  <p className={styles.alsoSummary}>{p.summary[locale]}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
