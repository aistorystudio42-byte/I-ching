import { useEffect, useRef, useState } from "react";
import HexagramCard from "./components/HexagramCard.jsx";
import HexagramDetail from "./components/HexagramDetail.jsx";
import CastingPanel from "./components/CastingPanel.jsx";
import { castHexagram, changingLineNumbers } from "./utils/iching.js";

const HISTORY_KEY = "iching-history";
const HISTORY_LIMIT = 12;

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(entries) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {
    /* storage unavailable — ignore */
  }
}

function formatResultText(question, result) {
  const changed = changingLineNumbers(result.changing);
  const lines = [
    question ? `Soru: ${question}` : null,
    `Hekzagram: ${result.primary.n}. ${result.primary.tr} (${result.primary.cn} · ${result.primary.py})`,
    changed.length ? `Değişen çizgiler: ${changed.join(", ")}` : null,
    result.hasChanging && result.secondary
      ? `Dönüşen: ${result.secondary.n}. ${result.secondary.tr} (${result.secondary.cn} · ${result.secondary.py})`
      : null,
    "",
    "Hüküm:",
    result.primary.judgment,
  ]
    .filter(Boolean)
    .join("\n");
  return lines;
}

export default function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [castQuestion, setCastQuestion] = useState("");
  const [tossing, setTossing] = useState(false);
  const [step, setStep] = useState(0);
  const [currentCoins, setCurrentCoins] = useState([true, false, true]);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setHistory(loadHistory());
    return () => clearInterval(timerRef.current);
  }, []);

  const handleCast = () => {
    setTossing(true);
    setResult(null);
    setStep(0);
    setCopied(false);
    const q = question.trim();
    setCastQuestion(q);

    const full = castHexagram();
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setStep(i);
      const throwCoins = full.throws[i - 1];
      setCurrentCoins(throwCoins ? throwCoins.coins : [true, false, true]);
      if (i >= 6) {
        clearInterval(timerRef.current);
        setResult(full);
        setTossing(false);
        setHistory((prev) => {
          const entry = {
            id: Date.now(),
            date: new Date().toISOString(),
            question: q,
            primary: { n: full.primary.n, tr: full.primary.tr, cn: full.primary.cn },
            secondary: full.secondary
              ? { n: full.secondary.n, tr: full.secondary.tr, cn: full.secondary.cn }
              : null,
          };
          const next = [entry, ...prev].slice(0, HISTORY_LIMIT);
          saveHistory(next);
          return next;
        });
      }
    }, 320);
  };

  const handleReset = () => {
    setResult(null);
    setQuestion("");
    setStep(0);
  };

  const handleCopy = async () => {
    if (!result) return;
    const text = formatResultText(castQuestion, result);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  return (
    <div className="min-h-screen text-ink-900 font-serif">
      <div className="max-w-2xl mx-auto px-6 py-14">
        <header className="text-center mb-10 animate-fadeUp">
          <div className="text-5xl mb-3 text-ink-800 tracking-widest">☰☷</div>
          <h1 className="text-4xl font-bold tracking-tight text-shadow-sm">
            易經
          </h1>
          <h2 className="text-xl text-stone-600 mt-1 font-sans font-medium">
            I Ching · Değişimler Kitabı
          </h2>
          <p className="text-sm text-stone-500 mt-4 max-w-md mx-auto leading-relaxed font-sans">
            Geleneksel üç sikke yöntemiyle bir hekzagram çekin. King Wen
            sırasına göre 64 hekzagramın tümü ve geleneksel yorumları içerir.
          </p>
        </header>

        {!result && !tossing && (
          <div className="mb-8 animate-fadeUp">
            <label className="block text-xs uppercase tracking-[0.2em] text-stone-500 font-sans mb-2 text-center">
              Sorunuz (isteğe bağlı)
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Zihninizde tuttuğunuz soruyu buraya yazabilirsiniz…"
              rows={2}
              className="w-full resize-none rounded-xl border border-stone-300 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm font-sans text-ink-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/60 transition"
            />
          </div>
        )}

        <div className="flex justify-center gap-3 mb-10">
          {!result && (
            <button
              onClick={handleCast}
              disabled={tossing}
              className="px-8 py-3 bg-ink-900 text-paper-50 rounded-full text-sm tracking-wide uppercase font-sans font-medium hover:bg-ink-800 active:scale-[0.98] transition-all disabled:opacity-50 shadow-card"
            >
              {tossing ? `Çekiliyor…` : "Hekzagram Çek"}
            </button>
          )}
          {result && !tossing && (
            <>
              <button
                onClick={handleCast}
                className="px-6 py-2.5 bg-ink-900 text-paper-50 rounded-full text-sm tracking-wide uppercase font-sans font-medium hover:bg-ink-800 active:scale-[0.98] transition-all shadow-card"
              >
                Yeniden Çek
              </button>
              <button
                onClick={handleCopy}
                className="px-6 py-2.5 bg-white/70 text-ink-800 border border-stone-300 rounded-full text-sm tracking-wide uppercase font-sans font-medium hover:bg-white transition-all"
              >
                {copied ? "Kopyalandı ✓" : "Sonucu Kopyala"}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-transparent text-stone-500 rounded-full text-sm tracking-wide uppercase font-sans font-medium hover:text-stone-700 transition-all"
              >
                Temizle
              </button>
            </>
          )}
        </div>

        {tossing && (
          <div className="animate-fadeUp">
            <CastingPanel step={step} currentCoins={currentCoins} />
          </div>
        )}

        {result && !tossing && (
          <div className="space-y-8 animate-fadeUp">
            {castQuestion && (
              <div className="text-center -mt-2">
                <span className="text-xs font-sans text-stone-500 italic">
                  “{castQuestion}”
                </span>
              </div>
            )}

            <div
              className={`grid gap-6 ${
                result.hasChanging ? "sm:grid-cols-2" : "grid-cols-1 max-w-sm mx-auto"
              }`}
            >
              <HexagramCard
                hexagram={result.primary}
                changing={result.changing}
                title="Birincil Hekzagram"
                animate
              />
              {result.hasChanging && (
                <HexagramCard
                  hexagram={result.secondary}
                  title="Dönüşen Hekzagram"
                  accent
                />
              )}
            </div>

            {result.hasChanging && (
              <p className="text-xs text-center text-stone-500 font-sans -mt-2">
                Turuncu çizgiler <strong>{changingLineNumbers(result.changing).join(", ")}</strong>{" "}
                numaralı değişen çizgilerdir (eski yin/yang). Bu çizgiler
                dönüşerek ikinci hekzagramı oluşturur.
              </p>
            )}

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-stone-300/70 p-7 shadow-card">
              <h3 className="text-lg font-semibold mb-4 font-sans text-ink-900">
                {result.primary.n}. {result.primary.tr}{" "}
                <span className="text-stone-400 font-normal">
                  ({result.primary.cn} · {result.primary.py})
                </span>
              </h3>
              <HexagramDetail hexagram={result.primary} />
            </div>

            {result.hasChanging && result.secondary && (
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-gold-500/30 p-7 shadow-card">
                <h3 className="text-lg font-semibold mb-4 font-sans text-ink-900">
                  Dönüşüm: {result.secondary.n}. {result.secondary.tr}{" "}
                  <span className="text-stone-400 font-normal">
                    ({result.secondary.cn} · {result.secondary.py})
                  </span>
                </h3>
                <HexagramDetail hexagram={result.secondary} />
              </div>
            )}
          </div>
        )}

        {!result && !tossing && (
          <div className="text-center text-stone-400 text-sm font-sans mt-16 animate-fadeUp">
            Sorunuzu zihninizde tutarak “Hekzagram Çek” düğmesine basın.
          </div>
        )}

        {!result && !tossing && history.length > 0 && (
          <div className="mt-16 animate-fadeUp">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans">
                Geçmiş Çekilişler
              </span>
              <button
                onClick={clearHistory}
                className="text-xs text-stone-400 hover:text-stone-600 font-sans transition"
              >
                Temizle
              </button>
            </div>
            <ul className="space-y-2">
              {history.map((h) => (
                <li
                  key={h.id}
                  className="flex items-center justify-between bg-white/40 border border-stone-300/60 rounded-lg px-4 py-2.5 text-sm font-sans"
                >
                  <div className="min-w-0">
                    <div className="text-ink-800 truncate">
                      {h.primary.n}. {h.primary.tr}
                      {h.secondary ? ` → ${h.secondary.n}. ${h.secondary.tr}` : ""}
                    </div>
                    {h.question && (
                      <div className="text-stone-400 text-xs italic truncate">
                        “{h.question}”
                      </div>
                    )}
                  </div>
                  <span className="text-stone-400 text-xs shrink-0 ml-3">
                    {new Date(h.date).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="mt-16 pt-6 border-t border-stone-300 text-xs text-stone-400 text-center leading-relaxed font-sans">
          King Wen sıralaması · 64 hekzagram · Geleneksel Hüküm, İmge ve Anlam
          metinleri klasik I Ching kaynaklarına dayanılarak özetlenmiştir.
        </footer>
      </div>
    </div>
  );
}
