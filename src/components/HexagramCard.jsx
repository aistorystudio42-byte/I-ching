import LineGraphic from "./LineGraphic.jsx";
import TrigramPair from "./TrigramPair.jsx";

export default function HexagramCard({ hexagram, changing, title, accent, animate }) {
  if (!hexagram) return null;
  return (
    <div
      className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl border p-6 shadow-card hover:shadow-cardHover transition-shadow duration-300 ${
        accent ? "border-gold-500/40" : "border-stone-300/70"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-sans font-medium">
          {title}
        </span>
        <span className="text-[11px] font-sans text-stone-400">
          №&nbsp;{hexagram.n}
        </span>
      </div>

      <div className="flex flex-col-reverse gap-2.5 mb-5 pr-7">
        {hexagram.lines.map((l, i) => (
          <LineGraphic
            key={i}
            value={l}
            isChanging={changing ? changing[i] : false}
            animate={animate}
            delay={i * 90}
          />
        ))}
      </div>

      <div className="text-center">
        <div className="text-4xl font-serif text-ink-900 text-shadow-sm">
          {hexagram.cn}
        </div>
        <div className="text-xs text-stone-500 italic font-sans mt-0.5">
          {hexagram.py}
        </div>
        <div className="text-lg font-semibold text-ink-900 mt-1.5 font-sans">
          {hexagram.tr}
        </div>
        <div className="mt-3">
          <TrigramPair lines={hexagram.lines} />
        </div>
      </div>
    </div>
  );
}
