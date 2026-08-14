import { trigramsOf } from "../utils/iching.js";

export default function TrigramPair({ lines }) {
  const { lower, upper } = trigramsOf(lines);
  return (
    <div className="flex items-center justify-center gap-3 text-stone-500">
      <div className="flex items-center gap-1.5">
        <span className="text-lg leading-none">{upper.symbol}</span>
        <span className="text-[11px] tracking-wide">{upper.tr}</span>
      </div>
      <span className="text-stone-300">·</span>
      <div className="flex items-center gap-1.5">
        <span className="text-lg leading-none">{lower.symbol}</span>
        <span className="text-[11px] tracking-wide">{lower.tr}</span>
      </div>
    </div>
  );
}
