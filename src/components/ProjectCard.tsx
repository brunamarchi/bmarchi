import { useState } from 'react';
import { useI18n } from '../i18n';
import type { PortfolioProject } from '../data/projects';
import styles from './ProjectCard.module.css';

interface Props {
  project: PortfolioProject;
  /** Texto do link externo (ex.: "Ver site"). */
  linkLabel?: string;
  /** Mostrado no lugar da imagem/link quando não há nenhum dos dois. */
  fallbackNote?: string;
}

export function ProjectCard({ project, linkLabel, fallbackNote }: Props) {
  const { t, locale } = useI18n();
  const [active, setActive] = useState(0);
  const main = project.assets[active];

  return (
    <article className={styles.card} aria-labelledby={`project-${project.id}`}>
      {main ? (
        <div className={styles.media}>
          <img className={styles.image} src={main.src} alt={main.alt} loading="lazy" />
        </div>
      ) : (
        <div className={`${styles.media} ${styles.mediaEmpty}`} aria-hidden="true">
          <span>{project.title}</span>
        </div>
      )}

      {project.assets.length > 1 && (
        <div className={styles.thumbs} role="group" aria-label={project.title}>
          {project.assets.map((asset, i) => (
            <button
              type="button"
              key={asset.src}
              className={styles.thumb}
              aria-pressed={i === active}
              aria-label={asset.alt}
              onClick={() => setActive(i)}
            >
              <img src={asset.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <div className={styles.body}>
        <p className={styles.kind}>
          {project.kind[locale]}
          {project.year && <span> · {project.year}</span>}
        </p>
        <h3 id={`project-${project.id}`} className={styles.title}>
          {project.title}
        </h3>
        {(project.client || project.partner) && (
          <p className={styles.client}>
            {[project.client !== project.title ? project.client : undefined, project.partner]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
        <p className={styles.summary}>{project.summary[locale]}</p>

        <dl className={styles.meta}>
          <div>
            <dt>{t.selectedWork.roleLabel}</dt>
            <dd>{project.role[locale]}</dd>
          </div>
          {project.tools && (
            <div>
              <dt>{t.selectedWork.toolsLabel}</dt>
              <dd>{project.tools.join(' · ')}</dd>
            </div>
          )}
        </dl>

        {project.link && linkLabel ? (
          <a className={styles.link} href={project.link} target="_blank" rel="noopener noreferrer">
            {linkLabel} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          fallbackNote && <p className={styles.note}>{fallbackNote}</p>
        )}
      </div>
    </article>
  );
}
