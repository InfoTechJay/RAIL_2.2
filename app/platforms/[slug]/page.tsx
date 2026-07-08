import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { StatCard } from "@/components/StatCard";
import { getPlatformBySlug } from "@/lib/live-data";
import { formatCurrency, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function PlatformDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = await getPlatformBySlug(slug);

  if (!platform) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/platforms" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-railGold">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to platforms
      </Link>

      <section className="rail-card rounded-lg p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-railGold">Platform Intelligence</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{platform.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">{platform.description}</p>
            <a href={platform.website} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-railGold hover:text-railGoldSoft">
              Official website
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard label="Listed assets" value={`${platform.listedAssets}`} detail="Reported/estimated coverage" />
            <StatCard label="Tokenized value" value={formatCurrency(platform.totalTokenizedValue, true)} detail="Platform-level estimate" />
            <StatCard label="Average risk" value={`${platform.averageRiskScore}`} detail="Explainable score" />
            <StatCard label="Transparency" value={`${platform.averageTransparencyScore}`} detail="Disclosure and source quality" />
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="space-y-6">
          <Panel title="Overview">
            <InfoGrid
              items={[
                ["Headquarters", platform.headquarters],
                ["Year founded", platform.yearFounded ? `${platform.yearFounded}` : "Not available"],
                ["Market share", `${platform.marketShare.toFixed(1)}% of tracked database value`],
                ["Last updated", formatDate(platform.lastUpdated)]
              ]}
            />
          </Panel>

          <Panel title="Platform Scores">
            <InfoGrid
              items={[
                ["Average yield", "Derived from listed asset disclosures when available"],
                ["Average risk", `${platform.averageRiskScore}`],
                ["Average transparency", `${platform.averageTransparencyScore}`],
                ["Average liquidity", `${platform.averageLiquidityScore}`],
                ["Average sentiment", `${platform.averageSentimentScore}`]
              ]}
            />
          </Panel>

          <Panel title="Recent Listings and News">
            <div className="grid gap-3 md:grid-cols-2">
              <List title="Recent listings" items={platform.recentListings} />
              <List title="Recent news" items={platform.recentNews} />
            </div>
          </Panel>
        </div>

        <aside className="space-y-6">
          <Panel title="Supported Chains">
            <TagList items={platform.supportedBlockchains} />
          </Panel>
          <Panel title="Investment Types">
            <TagList items={platform.assetCategories} />
          </Panel>
          <Panel title="Regulatory Information">
            <p className="text-sm leading-6 text-zinc-400">{platform.regulatoryInformation}</p>
          </Panel>
          <Disclaimer compact />
        </aside>
      </div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rail-card rounded-lg p-5">
      <h2 className="mb-4 font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function InfoGrid({ items }: { items: [string, string][] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-md border border-white/10 bg-ink/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">{label}</p>
          <p className="mt-2 text-sm text-zinc-100">{value}</p>
        </div>
      ))}
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-md border border-white/10 bg-ink/40 px-3 py-1.5 text-xs font-semibold text-zinc-300">
          {item}
        </span>
      ))}
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-white/10 bg-ink/40 p-4">
      <p className="font-semibold text-white">{title}</p>
      <div className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">
        {items.map((item) => (
          <p key={item}>Based on available data: {item}</p>
        ))}
      </div>
    </div>
  );
}
