import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n';
import { profile } from '../../data/profile';
import { GridToggleButton } from './GridOverlay';
import styles from './Header.module.css';

export function Header() {
  const { t, locale, toggleLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header}>
        <a href="#top" className={styles.name}>
          {profile.name.toUpperCase()}
          <span className={styles.role}>{t.header.role}</span>
        </a>
        <div className={styles.right}>
          <span className={styles.location}>{profile.location}</span>
          <button
            type="button"
            className={styles.langButton}
            aria-pressed={locale === 'en'}
            onClick={toggleLocale}
            aria-label={t.nav.langLabel}
          >
            {t.nav.langLabel}
          </button>
          <GridToggleButton textClassName={styles.gridLabelText} />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="chapter-index"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {t.nav.menuLabel}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="chapter-index"
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuLabel}
        >
          <div className={styles.panelHeader}>
            <span>{profile.name}</span>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label={t.nav.closeLabel}>
              ×
            </button>
          </div>
          <nav aria-label={t.nav.menuLabel}>
            <ul className={styles.panelList}>
              {t.nav.chapters.map((chapter) => (
                <li className={styles.panelItem} key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    className={styles.panelLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={styles.panelNumber}>{chapter.number}</span>
                    <span>{chapter.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
