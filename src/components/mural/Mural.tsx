import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n';
import { projects, segments, type PortfolioProject, type ProjectAsset, type ProjectSegment } from '../../data/projects';
import { clients, profile, prettyUrl } from '../../data/profile';
import { useLightbox } from '../../lib/lightbox';
import styles from './Mural.module.css';

// Versão "mural": o portfólio como uma parede de peças (estilo quadro do Pinterest).
// Imagem primeiro; o texto do projeto aparece ao abrir a peça.

type Filter = 'all' | ProjectSegment;

interface Tile {
  project: PortfolioProject;
  asset: ProjectAsset;
  index: number;
}

/** Intercala os projetos (1ª imagem de cada, depois a 2ª...) para o mural ficar variado. */
function buildTiles(list: PortfolioProject[]): Tile[] {
  const withImages = list.filter((p) => p.assets.length > 0);
  const max = Math.max(0, ...withImages.map((p) => p.assets.length));
  const tiles: Tile[] = [];
  for (let i = 0; i < max; i++) {
    for (const project of withImages) {
      const asset = project.assets[i];
      if (asset) tiles.push({ project, asset, index: i });
    }
  }
  return tiles;
}

export function Mural() {
  const { t, locale, toggleLocale } = useI18n();
  const openLightbox = useLightbox();
  const [filter, setFilter] = useState<Filter>('all');

  const tiles = useMemo(
    () => buildTiles(projects.filter((p) => filter === 'all' || p.segment === filter)),
    [filter],
  );

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t.archive.filterAll },
    ...segments.map((s) => ({ id: s, label: t.archive.segments[s] })),
  ];

  const open = (tile: Tile) => {
    const p = tile.project;
    openLightbox(p.assets, tile.index, {
      title: p.title,
      subtitle: [p.kind[locale], p.client !== p.title ? p.client : undefined, p.year].filter(Boolean).join(' · '),
      text: p.caseStudy ? `${p.caseStudy.approach[locale]}` : p.summary[locale],
    });
  };

  const { email, linkedin, behance, github } = profile.contact;

  return (
    <>
      <a href="#mural" className="skip-link">
        {t.nav.skipToContent}
      </a>
      <header className={styles.header}>
        <a href="#top" className={styles.brand}>
          {profile.name}
          <span>{t.header.role}</span>
        </a>
        <nav className={styles.nav} aria-label={t.nav.menuLabel}>
          <a href="#mural">{t.mural.workTitle}</a>
          <a href="#about">{t.about.title}</a>
          <a href="#contact">{t.contact.chapterLabel}</a>
          <button type="button" onClick={toggleLocale} aria-label={t.nav.langLabel}>
            {t.nav.langLabel}
          </button>
        </nav>
      </header>

      <main id="main-content">
        <section id="top" className={styles.hero} aria-labelledby="mural-heading">
          <div className={styles.heroInner}>
            <h1 id="mural-heading" className={styles.role}>
              {t.cover.role}
            </h1>
            <p className={styles.statement}>
              {t.cover.titleLine1} <em>{t.cover.titleLine2}</em>
            </p>
            <p className={styles.subtitle}>{t.cover.subtitle}</p>
            <p className={styles.clients}>
              <span>{t.intro.clientsTitle}:</span> {clients.join(' · ')}
            </p>
          </div>
        </section>

        <section id="mural" className={styles.muralSection} aria-labelledby="mural-title">
          <div className={styles.bar}>
            <h2 id="mural-title" className={styles.barTitle}>
              {t.mural.workTitle}
              <span>
                {tiles.length} {t.mural.pieces}
              </span>
            </h2>
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
          <p className={styles.hint}>{t.mural.hint}</p>

          <ul className={styles.wall}>
            {tiles.map((tile) => (
              <li className={styles.tile} key={tile.asset.src + tile.project.id}>
                <button
                  type="button"
                  className={styles.tileButton}
                  onClick={() => open(tile)}
                  aria-label={`${tile.project.title} — ${tile.asset.alt}`}
                >
                  <img src={tile.asset.src} alt={tile.asset.alt} loading="lazy" />
                  <span className={styles.tileCaption}>
                    <span className={styles.tileTitle}>{tile.project.title}</span>
                    <span className={styles.tileKind}>{tile.project.kind[locale]}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <h2 id="about-title" className={styles.sectionLabel}>
            {t.about.title}
          </h2>
          <p className={styles.bio}>{t.about.bio}</p>
          <p className={styles.availability}>{t.about.availability}</p>
        </section>

        <section id="contact" className={styles.contact} aria-labelledby="contact-title">
          <h2 id="contact-title" className={styles.contactQuote}>
            {t.contact.quote}
          </h2>
          <ul className={styles.contactLinks}>
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={behance} target="_blank" rel="noopener noreferrer">
                {prettyUrl(behance)} ↗
              </a>
            </li>
            <li>
              <a href={github} target="_blank" rel="noopener noreferrer">
                {prettyUrl(github)} ↗
              </a>
            </li>
          </ul>
          <p className={styles.colophon}>
            {t.colophon.rights} · {t.colophon.location}
          </p>
        </section>
      </main>
    </>
  );
}
