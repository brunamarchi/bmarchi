// Idioma automático pelo país de acesso, sem chamar nenhum serviço externo.
// O país vem do fuso horário do aparelho (Intl). Se o fuso não indicar um país
// conhecido, usa a região do idioma do navegador (ex.: "es-MX" → MX).
// País de língua portuguesa → pt; espanhola → es; francesa → fr; resto → en.
import { LANGS, type Lang } from './copy';

const PT = new Set(['BR', 'PT', 'AO', 'MZ', 'GW', 'CV', 'ST', 'TL', 'MO']);
const ES = new Set([
  'ES', 'MX', 'CO', 'AR', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN',
  'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'GQ',
]);
const FR = new Set([
  'FR', 'MC', 'LU', 'BE', 'SN', 'CI', 'ML', 'BF', 'NE', 'GN', 'TG', 'BJ', 'CM',
  'GA', 'CG', 'CD', 'CF', 'TD', 'MG', 'DJ', 'HT', 'RE', 'MQ', 'GP', 'GF', 'PF', 'NC',
]);

/** Fusos horários dos países que usam pt, es ou fr. Os demais caem em inglês. */
const TZ: Record<string, string> = {
  // Brasil
  'America/Sao_Paulo': 'BR', 'America/Bahia': 'BR', 'America/Fortaleza': 'BR',
  'America/Recife': 'BR', 'America/Maceio': 'BR', 'America/Belem': 'BR',
  'America/Manaus': 'BR', 'America/Cuiaba': 'BR', 'America/Campo_Grande': 'BR',
  'America/Porto_Velho': 'BR', 'America/Boa_Vista': 'BR', 'America/Rio_Branco': 'BR',
  'America/Araguaina': 'BR', 'America/Santarem': 'BR', 'America/Noronha': 'BR',
  'America/Eirunepe': 'BR',
  // Outros países de língua portuguesa
  'Europe/Lisbon': 'PT', 'Atlantic/Azores': 'PT', 'Atlantic/Madeira': 'PT',
  'Africa/Luanda': 'AO', 'Africa/Maputo': 'MZ', 'Africa/Bissau': 'GW',
  'Atlantic/Cape_Verde': 'CV', 'Africa/Sao_Tome': 'ST', 'Asia/Dili': 'TL', 'Asia/Macau': 'MO',
  // Espanha e América hispânica
  'Europe/Madrid': 'ES', 'Atlantic/Canary': 'ES', 'Africa/Ceuta': 'ES',
  'America/Mexico_City': 'MX', 'America/Cancun': 'MX', 'America/Merida': 'MX',
  'America/Monterrey': 'MX', 'America/Matamoros': 'MX', 'America/Chihuahua': 'MX',
  'America/Ciudad_Juarez': 'MX', 'America/Ojinaga': 'MX', 'America/Mazatlan': 'MX',
  'America/Bahia_Banderas': 'MX', 'America/Hermosillo': 'MX', 'America/Tijuana': 'MX',
  'America/Bogota': 'CO', 'America/Lima': 'PE', 'America/Caracas': 'VE',
  'America/Santiago': 'CL', 'America/Punta_Arenas': 'CL', 'Pacific/Easter': 'CL',
  'America/Buenos_Aires': 'AR', 'America/Cordoba': 'AR', 'America/Montevideo': 'UY',
  'America/Asuncion': 'PY', 'America/La_Paz': 'BO', 'America/Guayaquil': 'EC',
  'Pacific/Galapagos': 'EC', 'America/Panama': 'PA', 'America/Costa_Rica': 'CR',
  'America/Managua': 'NI', 'America/Tegucigalpa': 'HN', 'America/El_Salvador': 'SV',
  'America/Guatemala': 'GT', 'America/Havana': 'CU', 'America/Santo_Domingo': 'DO',
  'America/Puerto_Rico': 'PR', 'Africa/Malabo': 'GQ',
  // França e países de língua francesa
  'Europe/Paris': 'FR', 'Europe/Monaco': 'MC', 'Europe/Luxembourg': 'LU',
  'Europe/Brussels': 'BE', 'Africa/Dakar': 'SN', 'Africa/Abidjan': 'CI',
  'Africa/Bamako': 'ML', 'Africa/Ouagadougou': 'BF', 'Africa/Niamey': 'NE',
  'Africa/Conakry': 'GN', 'Africa/Lome': 'TG', 'Africa/Porto-Novo': 'BJ',
  'Africa/Douala': 'CM', 'Africa/Libreville': 'GA', 'Africa/Brazzaville': 'CG',
  'Africa/Kinshasa': 'CD', 'Africa/Lubumbashi': 'CD', 'Africa/Bangui': 'CF',
  'Africa/Ndjamena': 'TD', 'Indian/Antananarivo': 'MG', 'Africa/Djibouti': 'DJ',
  'America/Port-au-Prince': 'HT', 'Indian/Reunion': 'RE', 'America/Martinique': 'MQ',
  'America/Guadeloupe': 'GP', 'America/Cayenne': 'GF', 'Pacific/Tahiti': 'PF',
  'Pacific/Noumea': 'NC',
};

function countryFromTimezone(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('America/Argentina/')) return 'AR';
    return TZ[tz] ?? null;
  } catch {
    return null;
  }
}

function countryFromBrowser(): string | null {
  for (const l of navigator.languages ?? [navigator.language]) {
    const region = l?.split('-')[1];
    if (region && /^[A-Za-z]{2}$/.test(region)) return region.toUpperCase();
  }
  return null;
}

export function langForCountry(country: string | null): Lang {
  if (!country) return 'en';
  if (PT.has(country)) return 'pt';
  if (ES.has(country)) return 'es';
  if (FR.has(country)) return 'fr';
  return 'en';
}

/**
 * Ordem: ?lang= no link (escolha explícita) → país pelo fuso → país pela
 * região do navegador → inglês. Robôs de busca e de prévia de link recebem pt.
 */
export function initialLang(): Lang {
  const p = new URLSearchParams(window.location.search).get('lang') as Lang | null;
  if (p && LANGS.includes(p)) return p;
  if (/bot|crawl|spider|linkedin|whatsapp|facebookexternalhit/i.test(navigator.userAgent)) return 'pt';
  return langForCountry(countryFromTimezone() ?? countryFromBrowser());
}
