import Link from "next/link";
import { RailWordmark } from "@/components/RailWordmark";
import { complianceDisclaimer, navItems } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link href="/" className="focus-ring inline-flex rounded-md" aria-label="RAIL home">
            <RailWordmark size="sm" />
          </Link>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500">{complianceDisclaimer}</p>
        </div>
        <nav className="flex flex-wrap gap-2 md:justify-end" aria-label="Footer navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-railGold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-7xl border-t border-white/5 px-4 py-4 text-xs text-zinc-600 sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} RAIL. Market data and educational research tools only.
      </div>
    </footer>
  );
}
