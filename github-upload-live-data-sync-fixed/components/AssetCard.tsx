import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { LiveAsset } from "@/lib/live-data";
import { formatDate, formatPercent, scoreTone } from "@/lib/format";

export function AssetCard({ asset }: { asset: LiveAsset }) {
  return (
    <article className="rail-card flex h-full flex-col rounded-lg p-5 transition hover:border-railGold/35">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-railGold">{asset.category}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{asset.name}</h3>
        </div>
        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300">{asset.status}</span>
      </div>
      <p className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
        <MapPin className="h-4 w-4 text-zinc-500" aria-hidden />
        {asset.location || asset.industry}
      </p>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-300">{asset.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <Metric label="Platform" value={asset.platform} />
        <Metric label="Expected yield" value={formatPercent(asset.expectedYield)} />
        <Metric label="Liquidity" value={asset.liquidityRating} />
        <Metric label="Updated" value={formatDate(asset.lastUpdated)} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${scoreTone(asset.riskScore, true)}`}>Risk {asset.riskScore}</span>
        <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${scoreTone(asset.sentimentScore)}`}>Sentiment {asset.sentimentScore}</span>
      </div>
      <Link
        href={`/assets/${asset.slug}`}
        className="focus-ring mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-railGold/60 hover:text-railGold"
      >
        View Details
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-ink/45 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 truncate font-medium text-zinc-100">{value}</p>
    </div>
  );
}
