type RailWordmarkProps = {
  size?: "sm" | "md";
};

export function RailWordmark({ size = "md" }: RailWordmarkProps) {
  const textSize = size === "sm" ? "text-xl" : "text-2xl";
  const tracking = size === "sm" ? "tracking-[0.22em]" : "tracking-[0.28em]";

  return (
    <span className={`rail-wordmark inline-flex items-baseline font-semibold ${textSize} ${tracking}`} aria-label="RAIL">
      <span>R</span>
      <span className="relative">
        A
        <span className="absolute -bottom-0.5 right-0 h-1.5 w-2.5 rotate-[-12deg] bg-railGold" aria-hidden />
      </span>
      <span>I</span>
      <span>L</span>
    </span>
  );
}
