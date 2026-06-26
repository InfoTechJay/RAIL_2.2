import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const classes =
    variant === "primary"
      ? "border-railGold bg-railGold text-ink hover:bg-railGoldSoft"
      : "border-white/15 bg-white/5 text-zinc-100 hover:border-railGold/60 hover:text-railGoldSoft";

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold transition ${classes}`}
    >
      {children}
    </Link>
  );
}
