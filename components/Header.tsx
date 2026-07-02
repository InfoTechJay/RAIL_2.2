import Link from "next/link";
import { BarChart3, Search, UserCircle } from "lucide-react";
import { navItems } from "@/lib/constants";
import { RailWordmark } from "@/components/RailWordmark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring group inline-flex items-center rounded-md py-1" aria-label="RAIL home">
          <RailWordmark />
          <span className="ml-3 hidden h-px w-8 bg-railGold/70 transition group-hover:w-10 sm:block" aria-hidden />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/assets"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-200 transition hover:border-railGold/60 hover:text-railGold"
            aria-label="Search assets"
          >
            <Search className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/dashboard"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-railGold/50 bg-railGold/10 text-railGold transition hover:bg-railGold/15"
            aria-label="Open dashboard"
          >
            <BarChart3 className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/account"
            className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 text-sm font-semibold text-zinc-100 transition hover:border-railGold/60 hover:text-railGold"
            aria-label="Open account"
          >
            <UserCircle className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Account</span>
          </Link>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-md px-3 py-2 text-xs font-medium text-zinc-300">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
