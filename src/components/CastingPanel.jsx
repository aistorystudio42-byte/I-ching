import Coin from "./Coin.jsx";

export default function CastingPanel({ step, currentCoins }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-300/70 p-8 shadow-card">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans">
          Çizgi {step} / 6 atılıyor
        </span>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        {currentCoins.map((heads, i) => (
          <Coin key={`${step}-${i}`} heads={heads} delay={i * 90} />
        ))}
      </div>

      <div className="flex justify-center gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i < step ? "w-6 bg-gold-500" : "w-3 bg-stone-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
