import { useRef } from 'react';
import { useI18n } from '../../i18n';
import { useGsapStagger } from '../../hooks/useGsapStagger';
import styles from './Direction.module.css';

const CENTER = 200;
const RADIUS = 150;
const NODE_RADIUS = 44;

export function Direction() {
  const { t } = useI18n();
  const diagramRef = useRef<SVGSVGElement>(null);

  useGsapStagger(diagramRef as unknown as React.RefObject<HTMLElement>, {
    childSelector: `.${styles.nodeCircle}, .${styles.nodeLabel}`,
    stagger: 0.05,
    y: 0,
    scale: 0.85,
  });

  const roles = t.direction.roles;
  const positions = roles.map((label, i) => {
    const angle = (i / roles.length) * Math.PI * 2 - Math.PI / 2;
    return {
      label,
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    };
  });

  return (
    <section id="direction" className="chapter" aria-labelledby="direction-heading">
      <div className="container">
        <div className="chapter-heading">
          <span className="chapter-number">{t.direction.number} — {t.direction.chapterLabel}</span>
        </div>
        <h2 id="direction-heading" className="visually-hidden">
          {t.direction.title}
        </h2>

        <div className={styles.quotes}>
          <p className={styles.quote}>{t.direction.quote1}</p>
          <p className={styles.quote}>{t.direction.quote2}</p>
        </div>

        <div className={styles.diagramWrap}>
          <svg
            className={styles.diagram}
            viewBox="0 0 400 400"
            role="img"
            aria-label={roles.join(', ')}
            ref={diagramRef}
          >
            {positions.map((p) => (
              <line
                key={`link-${p.label}`}
                className={styles.link}
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
              />
            ))}
            <circle className={styles.centerCircle} cx={CENTER} cy={CENTER} r={30} />
            <text className={styles.centerLabel} x={CENTER} y={CENTER}>
              BM
            </text>
            {positions.map((p) => (
              <g key={p.label}>
                <circle className={styles.nodeCircle} cx={p.x} cy={p.y} r={NODE_RADIUS} />
                <text className={styles.nodeLabel} x={p.x} y={p.y}>
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
