import { HEXAGRAMS } from "../data/hexagrams.js";

// Lookup by binary key "l0l1l2l3l4l5" (bottom to top)
const byKey = {};
HEXAGRAMS.forEach((h) => {
  byKey[h.lines.join("")] = h;
});

export function hexagramByLines(lines) {
  return byKey[lines.join("")] || null;
}

// The eight trigrams, keyed by their 3-line pattern (bottom to top).
export const TRIGRAMS = {
  "111": { cn: "乾", tr: "Gök", symbol: "☰" },
  "110": { cn: "兌", tr: "Göl", symbol: "☱" },
  "101": { cn: "離", tr: "Ateş", symbol: "☲" },
  "100": { cn: "震", tr: "Gök Gürültüsü", symbol: "☳" },
  "011": { cn: "巽", tr: "Rüzgâr", symbol: "☴" },
  "010": { cn: "坎", tr: "Su", symbol: "☵" },
  "001": { cn: "艮", tr: "Dağ", symbol: "☶" },
  "000": { cn: "坤", tr: "Yeryüzü", symbol: "☷" },
};

export function trigramsOf(lines) {
  const lower = lines.slice(0, 3).join("");
  const upper = lines.slice(3, 6).join("");
  return { lower: TRIGRAMS[lower], upper: TRIGRAMS[upper] };
}

// Traditional three-coin method: each coin is heads (3) or tails (2).
// 6 = old yin (changing), 7 = young yang, 8 = young yin, 9 = old yang (changing)
export function tossCoinsForLine() {
  let total = 0;
  const coins = [];
  for (let i = 0; i < 3; i++) {
    const heads = Math.random() < 0.5;
    coins.push(heads);
    total += heads ? 3 : 2;
  }
  let base;
  let isChanging = false;
  if (total === 6) {
    base = 0;
    isChanging = true;
  } else if (total === 7) {
    base = 1;
  } else if (total === 8) {
    base = 0;
  } else {
    base = 1;
    isChanging = true;
  }
  return { coins, total, base, isChanging };
}

export function buildHexagram() {
  const lines = [];
  const changing = [];
  const throws = [];
  for (let i = 0; i < 6; i++) {
    const { coins, total, base, isChanging } = tossCoinsForLine();
    lines.push(base);
    changing.push(isChanging);
    throws.push({ coins, total });
  }
  return { lines, changing, throws };
}

export function transformedLines(lines, changing) {
  return lines.map((l, i) => (changing[i] ? (l === 1 ? 0 : 1) : l));
}

export function castHexagram() {
  const { lines, changing, throws } = buildHexagram();
  const primary = hexagramByLines(lines);
  const hasChanging = changing.some(Boolean);
  let secondary = null;
  if (hasChanging) {
    secondary = hexagramByLines(transformedLines(lines, changing));
  }
  return { lines, changing, throws, primary, secondary, hasChanging };
}

export function changingLineNumbers(changing) {
  return changing
    .map((c, i) => (c ? i + 1 : null))
    .filter((n) => n !== null);
}
