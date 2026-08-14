function Section({ label, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="h-px w-4 bg-gold-500/50" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-gold-600 font-sans font-semibold">
          {label}
        </span>
      </div>
      <p className="text-ink-800 leading-relaxed font-sans text-[15px]">{children}</p>
    </div>
  );
}

export default function HexagramDetail({ hexagram }) {
  if (!hexagram) return null;
  return (
    <div className="space-y-5">
      <Section label="Hüküm">{hexagram.judgment}</Section>
      <Section label="İmge">{hexagram.image}</Section>
      <Section label="Anlam">{hexagram.meaning}</Section>
    </div>
  );
}
