import { useI18n } from '../../i18n';
import { digitalProjects } from '../../data/projects';
import { profile, prettyUrl } from '../../data/profile';
import { ProjectCard } from '../ProjectCard';
import styles from './Digital.module.css';

export function Digital() {
  const { t } = useI18n();

  return (
    <section id="digital" className="chapter" aria-labelledby="digital-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.digital.number} — {t.digital.chapterLabel}</span>
        </div>
        <h2 id="digital-heading" className="chapter-title">
          {t.digital.title}
        </h2>
        <p className={styles.intro}>{t.digital.intro}</p>

        <div className={styles.grid}>
          {digitalProjects.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
              linkLabel={t.digital.visit}
              fallbackNote={t.digital.privateApp}
            />
          ))}
        </div>

        <a className={styles.github} href={profile.contact.github} target="_blank" rel="noopener noreferrer">
          {t.digital.githubCta} — {prettyUrl(profile.contact.github)} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
