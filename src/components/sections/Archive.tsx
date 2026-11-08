import { useState } from 'react';
import { useI18n } from '../../i18n';
import { archive, segments, type ProjectSegment } from '../../data/projects';
import { profile, prettyUrl } from '../../data/profile';
import { ProjectCard } from '../ProjectCard';
import styles from './Archive.module.css';

type Filter = 'all' | ProjectSegment;

export function Archive() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = archive.filter((p) => filter === 'all' || p.segment === filter);
  // Projetos digitais sem imagem (ex.: app com login) continuam como card.
  const cards = visible.filter((p) => p.assets.length > 0 || p.segment === 'digital');
  const textOnly = visible.filter((p) => p.assets.length === 0 && p.segment !== 'digital');
  const used = new Set(archive.map((p) => p.segment));

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t.archive.filterAll },
    ...segments.filter((s) => used.has(s)).map((s) => ({ id: s, label: t.archive.segments[s] })),
  ];

  return (
    <section id="archive" className="chapter" aria-labelledby="archive-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.archive.number} — {t.archive.chapterLabel}</span>
        </div>
        <h2 id="archive-heading" className="chapter-title">
          {t.archive.title}
        </h2>

        <div className={styles.toolbar}>
          <p className={styles.intro}>{t.archive.intro}</p>
          <div className={styles.filters} role="group" aria-label={t.archive.filterLabel}>
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
          {cards.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
              linkLabel={t.archive.visit}
              fallbackNote={project.segment === 'digital' ? t.archive.privateApp : undefined}
            />
          ))}
        </div>

        {textOnly.length > 0 && (
          <div className={styles.also}>
            <h3 className={styles.alsoTitle}>
              {t.archive.alsoTitle} <span>— {t.archive.noImages}</span>
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

        <a className={styles.github} href={profile.contact.github} target="_blank" rel="noopener noreferrer">
          {t.archive.githubCta} — {prettyUrl(profile.contact.github)} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
