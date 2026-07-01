import Image from "next/image";
import { Activity, BadgeDollarSign, Database, Layers3 } from "lucide-react";
import { AssetCard } from "@/components/AssetCard";
import { ButtonLink } from "@/components/ButtonLink";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { CategoryBreakdownChart } from "@/components/Charts";
import { assets, categories, dashboardMetrics } from "@/lib/mock-data";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function HomePage() {
  const metrics = dashboardMetrics();
  const featured = assets.slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image src="/rail-hero.png" alt="" fill priority className="object-cover object-center opacity-55" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/84 to-ink/30" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink to-transparent" />
        </div>
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-md border border-railGold/25 bg-railGold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-railGold">
              Real Asset Information Ledger
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Explore Tokenized Real-World Assets 
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              RAIL helps investors track tokenized real estate, private markets, entertainment assets, and alternative investments using
              transparent data, risk analysis, market outlooks, and sentiment tools.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/assets">Explore Assets</ButtonLink>
              <ButtonLink href="/dashboard" variant="secondary">
                View Market Dashboard
              </ButtonLink>
            </div>
          </div>
          <div className="hidden lg:block" aria-hidden>
            <div className="rail-card rounded-lg p-5 shadow-glow">
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Tracked" value={`${metrics.totalAssets}`} detail="Sample assets" icon={<Database className="h-4 w-4" />} />
                <StatCard label="Value" value={formatCurrency(metrics.totalValue, true)} detail="Disclosed" icon={<BadgeDollarSign className="h-4 w-4" />} />
                <StatCard label="Avg yield" value={formatPercent(metrics.averageYield)} detail="Projected" icon={<Activity className="h-4 w-4" />} />
                <StatCard label="Categories" value={`${categories.length}`} detail="RWA sectors" icon={<Layers3 className="h-4 w-4" />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader title="Featured Assets" description="Representative asset profiles across real estate, private markets, royalties, farmland, and credit." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite/55">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Trending Categories"
              title="The Central Ledger for RWA Tracking"
              description="RAIL structures tokenized alternatives around asset class, platform, jurisdiction, risk indicators, and disclosure quality."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category} className="rounded-lg border border-white/10 bg-ink/45 p-4">
                  <p className="font-semibold text-white">{category}</p>
                  <p className="mt-2 text-sm text-zinc-400">Tracked with yield, liquidity, sentiment, risk, and source transparency signals.</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rail-card rounded-lg p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-white">Market Snapshot</h3>
              <span className="text-xs text-zinc-500">Mock data</span>
            </div>
            <CategoryBreakdownChart />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Disclaimer />
      </section>
    </main>
  );
}
