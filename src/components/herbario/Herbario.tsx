import { useMemo, useState, type CSSProperties } from 'react';
import { useI18n } from '../../i18n';
import { projects, type PortfolioProject, type ProjectSegment } from '../../data/projects';
import { clients, expertiseAreas, languages, profile, prettyUrl, tools } from '../../data/profile';
import { useLightbox } from '../../lib/lightbox';
import { Branch, DyeRibbon, SeedPod, paperGrain } from './Botanicals';
import styles from './Herbario.module.css';

// Versão "Herbário editorial".
// Paleta terra (galhos secos, árvores, casca, terra, madeira) + linguagem de
// pesquisa de tintas naturais: faixas de pigmento, cartela de cor, etiquetas de
// herbário, ramos a traço. Cada cor da cartela "tinge" um tipo de trabalho.

type Dye = 'dry' | 'trees' | 'bark' | 'earth' | 'wood';

const DYES: Record<Dye, { hex: string; ink: string; segment: ProjectSegment }> = {
  bark: { hex: '#802E00', ink: '#F4EADF', segment: 'education' },
  trees: { hex: '#31381C', ink: '#DDB199', segment: 'books' },
  wood: { hex: '#DDB199', ink: '#351C11', segment: 'institutional' },
  dry: { hex: '#6D4638', ink: '#F4EADF', segment: 'illustration' },
  earth: { hex: '#351C11', ink: '#DDB199', segment: 'digital' },
};
const DYE_ORDER: Dye[] = ['dry', 'trees', 'bark', 'earth', 'wood'];
const dyeOf = (segment: ProjectSegment): Dye =>
  (Object.keys(DYES) as Dye[]).find((k) => DYES[k].segment === segment) ?? 'bark';

const pad = (n: number) => String(n).padStart(3, '0');

export function Herbario() {
  const { t, locale, toggleLocale } = useI18n();
  const openLightbox = useLightbox();
  const [dye, setDye] = useState<Dye | null>(null);
  const h = t.herbario;

  const numbered = useMemo(() => projects.map((p, i) => ({ project: p, no: i + 1 })), []);
  const visible = numbered.filter(({ project }) => !dye || project.segment === DYES[dye].segment);
  const countBy = (d: Dye) => projects.filter((p) => p.segment === DYES[d].segment).length;

  const open = (p: PortfolioProject, index: number) =>
    openLightbox(p.assets, index, {
      title: p.title,
      subtitle: [p.kind[locale], p.client !== p.title ? p.client : undefined, p.year].filter(Boolean).join(' · '),
      text: p.caseStudy ? p.caseStudy.approach[locale] : p.summary[locale],
    });

  const pick = (d: Dye) => {
    setDye((cur) => (cur === d ? null : d));
    document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const rootStyle = {
    '--grain': paperGrain,
    '--tint': dye ? DYES[dye].hex : '#802E00',
  } as CSSProperties;

  const flatLay = [projects.find((p) => p.id === 'comecando-albertina'), projects.find((p) => p.id === 'josapar-tio-joao'), projects.find((p) => p.id === 'mentalidades-matematicas')]
    .filter(Boolean)
    .map((p) => ({ project: p!, asset: p!.assets[0] }));

  const { email, linkedin, behance, github } = profile.contact;

  return (
    <div className={styles.root} style={rootStyle}>
      <a href="#colecao" className="skip-link">
        {t.nav.skipToContent}
      </a>

      <header className={styles.header}>
        <a href="#inicio" className={styles.brand}>
          {profile.name}
          <span>{t.header.role}</span>
        </a>
        <nav className={styles.nav} aria-label={t.nav.menuLabel}>
          <a href="#cartela">{h.swatchTitle}</a>
          <a href="#colecao">{h.collectionTitle}</a>
          <a href="#sobre">{t.about.title}</a>
          <a href="#contato">{t.contact.chapterLabel}</a>
          <button type="button" onClick={toggleLocale} aria-label={t.nav.langLabel}>
            {t.nav.langLabel}
          </button>
        </nav>
      </header>

      <main id="main-content">
        {/* ---------------- Abertura ---------------- */}
        <section id="inicio" className={styles.hero} aria-labelledby="h-title">
          <DyeRibbon
            className={styles.heroRibbon}
            colors={['#6D4638', '#802E00', '#802E00', '#9A3A0A', '#6D4638']}
            d="M 330 660 C 300 440, 560 470, 640 300 S 680 20, 980 -40"
            width={150}
            seed={4}
          />
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <dl className={styles.label}>
                <div>
                  <dt>{h.labelNo}</dt>
                  <dd>001</dd>
                </div>
                <div>
                  <dt>{h.labelName}</dt>
                  <dd>{profile.name}</dd>
                </div>
                <div>
                  <dt>{h.labelFamily}</dt>
                  <dd>{h.familyValue}</dd>
                </div>
                <div>
                  <dt>{h.labelCollected}</dt>
                  <dd>{h.collectedValue}</dd>
                </div>
              </dl>
              <h1 id="h-title" className={styles.role}>
                {t.cover.role}
              </h1>
              <p className={styles.statement}>
                {t.cover.titleLine1}
                <br />
                <em>{t.cover.titleLine2}</em>
              </p>
              <p className={styles.subtitle}>{t.cover.subtitle}</p>
              <div className={styles.ctas}>
                <a href="#colecao" className={styles.ctaPrimary}>
                  {h.collectionTitle}
                </a>
                <a href="#contato" className={styles.ctaSecondary}>
                  {t.cover.ctaContact}
                </a>
              </div>
            </div>

            {/* Mesa de trabalho: peças montadas, ramo e semente (como um flat-lay) */}
            <div className={styles.table} aria-label={h.collectionTitle}>
              {flatLay.map(({ project, asset }, i) => (
                <button
                  type="button"
                  key={project.id}
                  className={`${styles.mount} ${styles[`mount${i}`]}`}
                  onClick={() => open(project, 0)}
                  aria-label={`${t.lightbox.open}: ${project.title}`}
                >
                  <img src={asset.src} alt={asset.alt} />
                  <span className={styles.mountTag}>{project.title}</span>
                </button>
              ))}
              <Branch className={styles.tableBranch} color="#31381C" leaves={11} />
              <SeedPod className={styles.tablePod} color="#6D4638" />
              <SeedPod className={styles.tablePod2} color="#802E00" />
            </div>
          </div>
        </section>

        {/* ---------------- Cartela de cor ---------------- */}
        <section id="cartela" className={styles.chart} aria-labelledby="h-chart">
          <div className={styles.sectionHead}>
            <h2 id="h-chart" className={styles.sectionTitle}>
              {h.swatchTitle}
            </h2>
            <p className={styles.sectionIntro}>{h.swatchIntro}</p>
          </div>
          <div className={styles.swatches} role="group" aria-label={t.archive.filterLabel}>
            {DYE_ORDER.map((d, i) => {
              const info = DYES[d];
              return (
                <button
                  type="button"
                  key={d}
                  className={styles.swatch}
                  aria-pressed={dye === d}
                  onClick={() => pick(d)}
                  style={{ '--dye': info.hex, '--dye-ink': info.ink } as CSSProperties}
                >
                  <span className={styles.swatchColor}>
                    <span className={styles.swatchName}>{h.swatchNames[d]}</span>
                    <span className={styles.swatchHex}>{info.hex}</span>
                  </span>
                  <span className={styles.swatchStroke}>
                    <DyeRibbon
                      colors={[info.hex, info.hex]}
                      d="M 110 300 C 330 170, 640 430, 890 290"
                      width={330}
                      seed={i * 5 + 2}
                    />
                  </span>
                  <span className={styles.swatchSegment}>
                    {t.archive.segments[info.segment]}
                    <small>
                      {countBy(d)} {h.specimens}
                    </small>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ---------------- Coleção ---------------- */}
        <section id="colecao" className={styles.collection} aria-labelledby="h-collection">
          <div className={styles.sectionHead}>
            <h2 id="h-collection" className={styles.sectionTitle}>
              {h.collectionTitle}
              <span className={styles.count}>
                {visible.length} {h.specimens}
              </span>
            </h2>
            <p className={styles.sectionIntro}>{h.collectionIntro}</p>
            {dye && (
              <button type="button" className={styles.clear} onClick={() => setDye(null)}>
                <span className={styles.clearDot} /> {t.archive.segments[DYES[dye].segment]} — {h.showAll} ×
              </button>
            )}
          </div>

          <div className={styles.sheets}>
            {visible.map(({ project, no }) => {
              const d = dyeOf(project.segment);
              const style = { '--dye': DYES[d].hex } as CSSProperties;
              const cs = project.caseStudy;
              const main = project.assets[0];
              return (
                <article
                  key={project.id}
                  className={`${styles.sheet} ${cs ? styles.sheetCase : ''} ${main ? '' : styles.sheetNoImage}`}
                  style={style}
                  data-light={d === 'wood' ? '' : undefined}
                  aria-labelledby={`sp-${project.id}`}
                >
                  {main && (
                    <div className={styles.sheetMedia}>
                      <button
                        type="button"
                        className={styles.specimen}
                        onClick={() => open(project, 0)}
                        aria-label={`${t.lightbox.open}: ${main.alt}`}
                      >
                        <img src={main.src} alt={main.alt} loading="lazy" />
                      </button>
                      {project.assets.length > 1 && (
                        <div className={styles.thumbs}>
                          {project.assets.slice(1, 6).map((a, i) => (
                            <button
                              type="button"
                              key={a.src}
                              onClick={() => open(project, i + 1)}
                              aria-label={`${t.lightbox.open}: ${a.alt}`}
                            >
                              <img src={a.src} alt="" loading="lazy" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles.sheetBody}>
                    <dl className={styles.tag}>
                      <div className={styles.tagHead}>
                        <dt>{h.specimen}</dt>
                        <dd>
                          {h.labelNo} {pad(no)}
                        </dd>
                        <span className={styles.tagDye} title={h.swatchNames[d]} />
                      </div>
                      <div>
                        <dt>{h.labelName}</dt>
                        <dd id={`sp-${project.id}`} className={styles.tagName}>
                          {project.title}
                        </dd>
                      </div>
                      <div>
                        <dt>{h.labelType}</dt>
                        <dd>{project.kind[locale]}</dd>
                      </div>
                      {(project.client || project.partner) && project.client !== project.title && (
                        <div>
                          <dt>{h.labelClient}</dt>
                          <dd>{[project.client, project.partner].filter(Boolean).join(' · ')}</dd>
                        </div>
                      )}
                      {project.year && (
                        <div>
                          <dt>{h.labelYear}</dt>
                          <dd>{project.year}</dd>
                        </div>
                      )}
                      <div>
                        <dt>{t.archive.roleLabel}</dt>
                        <dd>{project.role[locale]}</dd>
                      </div>
                    </dl>

                    {cs ? (
                      <div className={styles.notes}>
                        <p className={styles.notesTitle}>{h.notesTitle}</p>
                        {cs.quote && <p className={styles.quote}>{cs.quote[locale]}</p>}
                        <p>
                          <strong>{t.cases.challenge}.</strong> {cs.challenge[locale]}
                        </p>
                        <p>
                          <strong>{t.cases.approach}.</strong> {cs.approach[locale]}
                        </p>
                        <p>
                          <strong>{t.cases.deliverables}.</strong> {cs.deliverables[locale]}
                        </p>
                        {cs.tags && (
                          <ul className={styles.seeds}>
                            {cs.tags.map((tag) => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                        )}
                        {cs.note && <p className={styles.small}>{cs.note[locale]}</p>}
                      </div>
                    ) : (
                      <p className={styles.summary}>{project.summary[locale]}</p>
                    )}

                    {!main && project.segment !== 'digital' && <p className={styles.small}>{h.unpublished}</p>}
                    {!main && project.segment === 'digital' && <p className={styles.small}>{t.archive.privateApp}</p>}
                    {project.link && (
                      <a className={styles.link} href={project.link} target="_blank" rel="noopener noreferrer">
                        {t.cases.visit} ↗
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ---------------- Sobre ---------------- */}
        <section id="sobre" className={styles.about} aria-labelledby="h-about">
          <Branch className={styles.aboutBranch} color="#DDB199" leaves={13} />
          <div className={styles.aboutInner}>
            <h2 id="h-about" className={styles.sectionTitle}>
              {t.about.title}
            </h2>
            <p className={styles.bio}>{t.about.bio}</p>
            <p className={styles.clients}>
              <span>{t.intro.clientsTitle}</span>
              {clients.join(' · ')}
            </p>
            <div className={styles.aboutGrid}>
              <div>
                <h3>{t.about.expertiseTitle}</h3>
                <ul className={styles.seeds}>
                  {expertiseAreas.map((k) => (
                    <li key={k}>{t.about.expertiseAreas[k]}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t.about.toolsTitle}</h3>
                <ul className={styles.seeds}>
                  {tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t.about.languagesTitle}</h3>
                <ul className={styles.plain}>
                  {languages.map((l) => (
                    <li key={l.key}>
                      {t.about.languageNames[l.key]} <span>— {t.about.languageLevels[l.level]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t.about.availabilityTitle}</h3>
                <p>{t.about.availability}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Contato ---------------- */}
        <section id="contato" className={styles.contact} aria-labelledby="h-contact">
          <DyeRibbon
            className={styles.contactRibbon}
            colors={['#DDB199', '#6D4638', '#351C11']}
            d="M -40 160 C 220 520, 520 -40, 760 300 S 960 520, 1060 380"
            width={110}
            seed={11}
          />
          <div className={styles.contactInner}>
            <h2 id="h-contact" className={styles.contactQuote}>
              {t.contact.quote}
            </h2>
            <p className={styles.contactLead}>{t.contact.lead}</p>
            <ul className={styles.contactLinks}>
              <li>
                <span>{t.contact.emailLabel}</span>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <span>{t.contact.linkedinLabel}</span>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  in/bruna-marchi ↗
                </a>
              </li>
              <li>
                <span>{t.contact.behanceLabel}</span>
                <a href={behance} target="_blank" rel="noopener noreferrer">
                  {prettyUrl(behance)} ↗
                </a>
              </li>
              <li>
                <span>{t.contact.githubLabel}</span>
                <a href={github} target="_blank" rel="noopener noreferrer">
                  {prettyUrl(github)} ↗
                </a>
              </li>
            </ul>
          </div>
          <footer className={styles.footer}>
            <span>{t.colophon.rights}</span>
            <span className={styles.footerStrip} aria-hidden="true">
              {DYE_ORDER.map((d) => (
                <i key={d} style={{ background: DYES[d].hex }} />
              ))}
            </span>
            <span>{t.colophon.location}</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
