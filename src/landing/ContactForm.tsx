import { useState, type FormEvent, type RefObject } from 'react';
import { profile } from '../data/profile';
import { copy, type ContactIntent, type Lang } from './copy';

interface Props {
  lang: Lang;
  intent: ContactIntent;
  setIntent: (i: ContactIntent) => void;
  nameRef: RefObject<HTMLInputElement | null>;
}

const INTENTS: ContactIntent[] = ['project', 'job', 'cv', 'other'];

/**
 * Formulário que monta um e-mail (mailto:) com o briefing organizado.
 * O site é estático: nada é enviado por ele — quem visita revisa e envia do
 * próprio e-mail. Assim não há servidor, cadastro nem dado guardado.
 */
export function ContactForm({ lang, intent, setIntent, nameRef }: Props) {
  const c = copy[lang].contact;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const email = profile.contact.email;

  const mailto = (subject: string, body: string) =>
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    if (!name) {
      setError(c.form.required);
      nameRef.current?.focus();
      return;
    }
    setError('');
    const company = String(data.get('company') ?? '').trim();
    const kind = String(data.get('kind') ?? '');
    const deadline = String(data.get('deadline') ?? '');
    const message = String(data.get('message') ?? '').trim();
    const L = c.bodyLabels;
    const subject = `[Portfólio] ${c.subjects[intent]} — ${name}${company ? ` / ${company}` : ''}`;
    const lines = [`${L.name}: ${name}`];
    if (company) lines.push(`${L.company}: ${company}`);
    if (kind) lines.push(`${L.kind}: ${kind}`);
    if (deadline) lines.push(`${L.deadline}: ${deadline}`);
    if (message) lines.push('', `${L.message}:`, message);
    const body = lines.join('\n');
    window.location.href = mailto(subject, body);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(c.copy, email);
    }
  };

  const showProjectFields = intent === 'project' || intent === 'job';

  return (
    <>
      <div className="lp-contact-intro">
        <p className="lp-eyebrow lp-eyebrow-light">{c.eyebrow}</p>
        <h2 className="lp-h2 lp-h2-light">{c.title}</h2>
        <p className="lp-contact-text">{c.text}</p>

        <p className="lp-direct-label">{c.direct}</p>
        <div className="lp-direct">
          <a className="lp-direct-email" href={`mailto:${email}`}>
            {email}
          </a>
          <button type="button" className="lp-chip" onClick={copyEmail} aria-live="polite">
            {copied ? `✓ ${c.copied}` : c.copy}
          </button>
        </div>
        <div className="lp-direct-links">
          <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={profile.contact.behance} target="_blank" rel="noopener noreferrer">
            Behance ↗
          </a>
          <a href={mailto(`[Portfólio] ${c.subjects.cv}`, '')}>{c.cv} →</a>
        </div>
      </div>

      <form className="lp-form" onSubmit={onSubmit} noValidate>
        <fieldset className="lp-intents">
          <legend>{c.form.intent}</legend>
          {INTENTS.map((i) => (
            <label key={i} className={intent === i ? 'is-active' : ''}>
              <input type="radio" name="intent" value={i} checked={intent === i} onChange={() => setIntent(i)} />
              {c.form.intents[i]}
            </label>
          ))}
        </fieldset>

        <div className="lp-field-row">
          <label className="lp-field">
            <span>{c.form.name} *</span>
            <input ref={nameRef} name="name" autoComplete="name" aria-invalid={error ? true : undefined} />
          </label>
          <label className="lp-field">
            <span>{c.form.company}</span>
            <input name="company" autoComplete="organization" />
          </label>
        </div>

        {showProjectFields && (
          <div className="lp-field-row">
            <label className="lp-field">
              <span>{c.form.kind}</span>
              <select name="kind" defaultValue="">
                <option value="">—</option>
                {c.form.kinds.map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </label>
            <label className="lp-field">
              <span>{c.form.deadline}</span>
              <select name="deadline" defaultValue="">
                <option value="">—</option>
                {c.form.deadlines.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        <label className="lp-field">
          <span>{c.form.message}</span>
          <textarea name="message" rows={4} />
        </label>

        {error && (
          <p className="lp-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="lp-btn lp-btn-accent lp-btn-block">
          {c.form.send} <span aria-hidden="true">→</span>
        </button>
        <p className="lp-form-note">{c.form.note}</p>
      </form>
    </>
  );
}
