type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6 max-w-3xl">
      {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-railGold">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-6 text-zinc-400 md:text-base">{description}</p> : null}
    </div>
  );
}
