import Link from "next/link";
import { ArrowUpRight, Building2, Globe2, Layers3, ShieldCheck } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { getPlatforms } from "@/lib/live-data";
import { formatCurrency, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function PlatformsPage() {
  const platforms = await getPlatforms();
  const metrics = {
    totalPlatforms: platforms.length,
    totalTokenizedValue: platforms.reduce((sum, platform) => sum + platform.totalTokenizedValue, 0),
    averageRisk: platforms.length ? Math.round(platforms.reduce((sum, platform) => sum + platform.averageRiskScore, 0) / platforms.length) : 0,
    averageTransparency: platforms.length ? Math.round(platforms.reduce((sum, platform) => sum + platform.averageTransparencyScore, 0) / platforms.length) : 0
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Platforms"
        title="Compare RWA issuers, marketplaces, and managers"
        description="Platform Intelligence tracks the organizations behind tokenized real-world assets, including coverage, supported chains, transparency, risk, and source quality."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tracked platforms" value={`${metrics.totalPlatforms}`} detail="Issuer and marketplace profiles" icon={<Building2 className="h-4 w-4" />} />
        <StatCard label="Tracked value" value={formatCurrency(metrics.totalTokenizedValue, true)} detail="Reported and estimated coverage" icon={<Globe2 className="h-4 w-4" />} />
        <StatCard label="Avg risk" value={`${metrics.averageRisk}`} detail="Platform-level score" icon={<ShieldCheck className="h-4 w-4" />} />
        <StatCard label="Avg transparency" value={`${metrics.averageTransparency}`} detail="Disclosure and source quality" icon={<Layers3 className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {platforms.map((platform) => (
          <article key={platform.slug} className="rail-card rounded-lg p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-railGold/25 bg-railGold/10 text-lg font-semibold text-railGold">
                  {platform.logo}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-railGold">{platform.headquarters}</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">{platform.name}</h2>
                </div>
              </div>
              <Link href={`/platforms/${platform.slug}`} className="focus-ring rounded-md border border-white/10 bg-white/5 p-2 text-zinc-300 hover:text-railGold" aria-label={`View ${platform.name}`}>
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-400">{platform.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <Metric label="Assets" value={`${platform.listedAssets}`} />
              <Metric label="Value" value={formatCurrency(platform.totalTokenizedValue, true)} />
              <Metric label="Risk" value={`${platform.averageRiskScore}`} />
              <Metric label="Updated" value={formatDate(platform.lastUpdated)} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {platform.assetCategories.slice(0, 3).map((category) => (
                <span key={category} className="rounded-md border border-white/10 bg-ink/45 px-2.5 py-1 text-xs text-zinc-300">
                  {category}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <Disclaimer compact />
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-ink/40 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
