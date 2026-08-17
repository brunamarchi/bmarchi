import { useI18n } from '../../i18n';
import { timeline, priorHistoryOrganizations } from '../../data/timeline';
import styles from './Trajectory.module.css';

function groupByYear() {
  const groups = new Map<string, typeof timeline>();
  for (const entry of timeline) {
    const list = groups.get(entry.year) ?? [];
    list.push(entry);
    groups.set(entry.year, list);
  }
  return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

export function Trajectory() {
  const { t, locale } = useI18n();
  const groups = groupByYear();

  return (
    <section id="trajectory" className="chapter" aria-labelledby="trajectory-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.trajectory.number} — {t.trajectory.chapterLabel}</span>
        </div>
        <h2 id="trajectory-heading" className={styles.quote}>
          {t.trajectory.quote}
        </h2>

        <div className={styles.timeline}>
          {groups.map(([year, entries]) => (
            <div className={styles.yearGroup} key={year}>
              <span className={styles.year}>{year}</span>
              <div className={styles.entries}>
                {entries.map((entry) => (
                  <div className={styles.entry} key={entry.id}>
                    <div className={styles.cover}>{t.trajectory.entryPlaceholder}</div>
                    <div>
                      <div className={styles.entryTitle}>{entry.title}</div>
                      {entry.organization && <div className={styles.entryOrg}>{entry.organization}</div>}
                      {entry.note && (
                        <div className={styles.entryNote}>
                          {locale === 'pt' ? entry.note.pt : entry.note.en}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.priorHistory}>
          <div className={styles.priorHistoryTitle}>{t.trajectory.priorHistoryTitle}</div>
          <p className={styles.priorHistoryNote}>{t.trajectory.priorHistoryNote}</p>
          <div className={styles.chips}>
            {priorHistoryOrganizations.map((org) => (
              <span className={styles.chip} key={org}>
                {org}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
