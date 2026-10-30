// Utilitários compartilhados entre a intro e o hero para desenhar a floresta.

export const rnd = (i, k) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function pine(x, base, hgt, wid) {
  const tiers = [
    [1, 0.55, 0.3],
    [0.8, 0.3, 0.42],
    [0.58, 0.08, 0.5],
  ];
  let d = '';
  tiers.forEach(([top, bot, hw]) => {
    const yt = base - hgt * top;
    const yb = base - hgt * bot;
    d += `M${x},${yt} L${x + wid * hw},${yb} L${x - wid * hw},${yb} Z `;
  });
  const tw = wid * 0.06;
  d += `M${x - tw},${base - hgt * 0.1} L${x + tw},${base - hgt * 0.1} L${x + tw},${base} L${x - tw},${base} Z`;
  return d;
}
