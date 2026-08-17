import { useGrid } from '../../lib/gridContext';
import { useI18n } from '../../i18n';
import styles from './GridOverlay.module.css';

export function GridOverlay() {
  const { visible } = useGrid();
  if (!visible) return null;
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.columns}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div className={styles.col} key={i} />
        ))}
      </div>
    </div>
  );
}

export function GridToggleButton({ className, textClassName }: { className?: string; textClassName?: string }) {
  const { visible, toggle } = useGrid();
  const { t } = useI18n();
  const label = visible ? t.nav.gridToggleHide : t.nav.gridToggleShow;
  return (
    <button
      type="button"
      className={className ?? styles.toggle}
      aria-pressed={visible}
      onClick={toggle}
    >
      <span aria-hidden="true">⊞</span>
      <span className={textClassName}>{label}</span>
    </button>
  );
}
