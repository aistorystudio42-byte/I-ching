export default function Coin({ heads, delay = 0 }) {
  return (
    <div className="perspective h-8 w-8 shrink-0">
      <div
        className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-sm animate-coinFlip ${
          heads
            ? "bg-gradient-to-br from-gold-400 to-gold-600 border-gold-600 text-ink-900"
            : "bg-gradient-to-br from-paper-100 to-paper-300 border-stone-400 text-stone-600"
        }`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {heads ? "陽" : "陰"}
      </div>
    </div>
  );
}
