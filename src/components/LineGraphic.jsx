export default function LineGraphic({ value, isChanging, animate, delay = 0 }) {
  const isYang = value === 1;
  return (
    <div
      className={`flex items-center h-6 ${animate ? "opacity-0 animate-fadeUp" : ""}`}
      style={animate ? { animationDelay: `${delay}ms`, animationFillMode: "forwards" } : undefined}
    >
      <div className="w-full flex items-center justify-center relative">
        {isYang ? (
          <div
            className={`h-2.5 w-full rounded-sm transition-colors ${
              isChanging
                ? "bg-gradient-to-r from-seal-500 via-gold-500 to-seal-500 bg-[length:200%_100%] animate-shimmer"
                : "bg-ink-800"
            }`}
          />
        ) : (
          <div className="flex w-full gap-4">
            <div
              className={`h-2.5 flex-1 rounded-sm transition-colors ${
                isChanging
                  ? "bg-gradient-to-r from-seal-500 via-gold-500 to-seal-500 bg-[length:200%_100%] animate-shimmer"
                  : "bg-ink-800"
              }`}
            />
            <div
              className={`h-2.5 flex-1 rounded-sm transition-colors ${
                isChanging
                  ? "bg-gradient-to-r from-seal-500 via-gold-500 to-seal-500 bg-[length:200%_100%] animate-shimmer"
                  : "bg-ink-800"
              }`}
            />
          </div>
        )}
        {isChanging && (
          <span
            className="absolute -right-7 text-seal-600 text-sm font-bold leading-none"
            title={isYang ? "Değişen yang çizgi (eski yang)" : "Değişen yin çizgi (eski yin)"}
          >
            {isYang ? "○" : "✕"}
          </span>
        )}
      </div>
    </div>
  );
}
