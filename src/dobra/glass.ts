// "Liquid glass": mapa de deslocamento que simula a borda curva de um vidro
// grosso. Perto da borda, o fundo é "puxado" para dentro (refração), como uma
// lente convexa; no miolo, nada se desloca. Usado por um filtro SVG
// (feDisplacementMap) aplicado como backdrop-filter no modal.

/** true no Chrome/Edge/Opera: os únicos que aceitam url() em backdrop-filter. */
export const supportsRefraction = (() => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Chrome\/|Chromium\//.test(ua) && !/Firefox\//.test(ua);
})();

/**
 * Gera o mapa (PNG em data URL). R = deslocamento em x, G = em y, 128 = zero.
 * Calculado em meia resolução; o filtro estica para o tamanho real.
 */
export function displacementMap(width: number, height: number, radius: number, bezel: number): string {
  const k = 0.5;
  const w = Math.max(2, Math.round(width * k));
  const h = Math.max(2, Math.round(height * k));
  const r = radius * k;
  const b = bezel * k;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const hw = w / 2;
  const hh = h / 2;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      // distância com sinal até a borda de um retângulo arredondado
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const sd = Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r;
      const dist = -sd; // > 0 dentro

      let nx = 0;
      let ny = 0;
      if (qx > 0 && qy > 0) {
        const l = Math.hypot(qx, qy) || 1;
        nx = (qx / l) * Math.sign(px);
        ny = (qy / l) * Math.sign(py);
      } else if (qx > qy) {
        nx = Math.sign(px);
      } else {
        ny = Math.sign(py);
      }

      // perfil de "superfície convexa": forte na borda, some no miolo
      const t = Math.min(1, Math.max(0, dist / b));
      const mag = dist <= 0 ? 0 : Math.pow(1 - t, 2.2);

      const i = (y * w + x) * 4;
      d[i] = 128 - nx * mag * 127;
      d[i + 1] = 128 - ny * mag * 127;
      d[i + 2] = 128;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}
