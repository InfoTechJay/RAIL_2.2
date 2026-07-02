import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { StatCard } from "@/components/StatCard";
import { assets, getAssetBySlug } from "@/lib/mock-data";
import { formatCurrency, formatDate, formatPercent, scoreTone } from "@/lib/format";
import { calculateDataConfidence, explainLiquidityScore, explainRiskScore, explainSentimentScore, explainTransparencyScore } from "@/lib/scoring";

export function generateStaticParams() {
  return assets.map((asset) => ({ slug: asset.slug }));
}

export default async function AssetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);

  if (!asset) notFound();

  const confidence = calculateDataConfidence(asset);
  const scoreExplanations = [
    ["RAIL Risk Score", explainRiskScore(asset)],
    ["RAIL Transparency Score", explainTransparencyScore(asset)],
    ["RAIL Liquidity Score", explainLiquidityScore(asset)],
    ["RAIL Sentiment Score", explainSentimentScore(asset)],
    ["RAIL Data Confidence Score", confidence]
  ] as const;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/assets" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-railGold">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to screener
      </Link>

      <section className="rail-card rounded-lg p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-railGold">{asset.category}</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{asset.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">{asset.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge label={asset.platform} />
              <Badge label={asset.blockchain} />
              <Badge label={asset.status} />
              <Badge label={asset.investorEligibility.replace("_", " ")} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <StatCard label="Expected yield" value={formatPercent(asset.expectedYield)} detail="Projected, not guaranteed" />
            <StatCard label="Disclosed value" value={formatCurrency(asset.disclosedAssetValue, true)} detail="Based on mock issuer data" />
            <StatCard label="Minimum" value={formatCurrency(asset.minimumInvestment)} detail="Sample minimum investment" />
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
        <div className="space-y-6">
          <DetailSection title="Overview">
            <InfoGrid
              items={[
                ["Location / Industry", `${asset.location} / ${asset.industry}`],
                ["Jurisdiction", asset.jurisdiction],
                ["Asset type", asset.assetType],
                ["Launch date", formatDate(asset.launchDate)],
                ["Last updated", formatDate(asset.lastUpdated)],
                ["Liquidity rating", asset.liquidityRating]
              ]}
            />
          </DetailSection>

          <DetailSection title="Investment Data">
            <InfoGrid
              items={[
                ["Offering size", formatCurrency(asset.offeringSize)],
                ["Disclosed asset value", formatCurrency(asset.disclosedAssetValue)],
                ["Minimum investment", formatCurrency(asset.minimumInvestment)],
                ["Expected yield", formatPercent(asset.expectedYield)],
                ["Historical yield", formatPercent(asset.historicalYield)],
                ["Investor eligibility", asset.investorEligibility.replace("_", " ")]
              ]}
            />
          </DetailSection>

          <DetailSection title="Token Data">
            <InfoGrid
              items={[
                ["Token symbol", asset.tokenSymbol],
                ["Blockchain", asset.blockchain],
                ["Contract address", asset.contractAddress],
                ["Token standard", asset.tokenStandard],
                ["Total supply", asset.totalSupply.toLocaleString()],
                ["Transferability", asset.transferability]
              ]}
            />
          </DetailSection>

          <DetailSection title="Risk Analysis">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className={`rounded-md border px-3 py-1.5 text-sm font-semibold ${scoreTone(asset.riskScore, true)}`}>Composite risk {asset.riskScore}</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300">Transparency {asset.transparencyScore}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(asset.riskBreakdown).map(([label, value]) => (
                <RiskBar key={label} label={label} value={value} />
              ))}
            </div>
            <ul className="mt-5 grid gap-2 text-sm text-zinc-300">
              {asset.riskFactors.map((factor) => (
                <li key={factor} className="rounded-md border border-white/10 bg-ink/40 p-3">
                  {factor}
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="RAIL Scoring">
            <div className="grid gap-3 md:grid-cols-2">
              {scoreExplanations.map(([title, score]) => (
                <div key={title} className="rounded-md border border-white/10 bg-ink/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm text-zinc-400">{score.explanation}</p>
                    </div>
                    <span className="rounded-md border border-railGold/25 bg-railGold/10 px-2.5 py-1 text-sm font-semibold text-railGold">
                      {score.value}
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">Factors used</p>
                  <ul className="mt-2 space-y-1 text-sm leading-6 text-zinc-300">
                    {score.factors.slice(0, 4).map((factor) => (
                      <li key={factor}>Based on available data: {factor}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Sentiment Analysis">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-md border px-3 py-1.5 text-sm font-semibold ${scoreTone(asset.sentimentScore)}`}>Sentiment {asset.sentimentScore}</span>
              <p className="text-sm leading-6 text-zinc-300">{asset.sentimentSummary}</p>
            </div>
            <div className="mt-4 grid gap-3">
              {asset.newsMentions.map((mention) => (
                <div key={mention.title} className="rounded-md border border-white/10 bg-ink/40 p-4">
                  <p className="font-medium text-white">{mention.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {mention.publisher} - {formatDate(mention.publishedAt)} - Sentiment {mention.sentiment}
                  </p>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Outlook">
            <p className="text-sm leading-7 text-zinc-300">{asset.outlook}</p>
            <p className="mt-4 rounded-md border border-railGold/20 bg-railGold/10 p-4 text-sm leading-6 text-railGoldSoft">
              This outlook is informational research commentary only and is not investment advice or a call to action.
            </p>
          </DetailSection>
        </div>

        <aside className="space-y-6">
          <DetailSection title="Documents">
            <div className="space-y-2">
              {asset.documents.map((document) => (
                <div key={document} className="flex items-center gap-3 rounded-md border border-white/10 bg-ink/40 p-3 text-sm text-zinc-300">
                  <FileText className="h-4 w-4 text-railGold" aria-hidden />
                  {document}
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Trust & Verification">
            <div className="space-y-3">
              <div className="rounded-md border border-railGold/20 bg-railGold/10 p-4">
                <p className="text-sm font-semibold text-railGoldSoft">
                  Data Confidence {confidence.value} - {confidence.rating}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{confidence.explanation}</p>
                <p className="mt-2 text-xs text-zinc-500">Last verified {formatDate(confidence.lastVerified)}</p>
              </div>
              <TrustRow label="Official Sources" value={confidence.officialSources.length ? confidence.officialSources.join(", ") : "No official source identified yet"} />
              <TrustRow label="Supporting Sources" value={confidence.supportingSources.length ? confidence.supportingSources.join(", ") : "Supporting source review pending"} />
              <TrustRow label="Blockchain Verification" value={asset.contractAddress ? `${asset.blockchain} contract reference available: ${asset.contractAddress}` : "Blockchain contract reference pending"} />
              <TrustRow label="Platform Verification" value={`${asset.platform} disclosure review required before production confidence approval`} />
              <TrustRow label="Regulatory Information" value={`${asset.jurisdiction} regulatory context should be verified against official filings and issuer documents`} />
            </div>
          </DetailSection>

          <DetailSection title="Data Sources">
            <div className="space-y-3">
              {asset.dataSources.map((source) => (
                <div key={source.name} className="rounded-md border border-white/10 bg-ink/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-white">{source.name}</p>
                    <ExternalLink className="h-4 w-4 text-zinc-500" aria-hidden />
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{source.type}</p>
                  <p className="mt-2 text-xs text-zinc-500">
                    Reliability {source.reliability} - Checked {formatDate(source.lastChecked)}
                  </p>
                </div>
              ))}
            </div>
          </DetailSection>

          <Disclaimer compact />
        </aside>
      </div>
    </main>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rail-card rounded-lg p-5 md:p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
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
          <p className="mt-2 text-sm font-medium text-zinc-100">{value}</p>
        </div>
      ))}
    </div>
  );
}

function RiskBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="capitalize text-zinc-300">{label} risk</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-railGold" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300">{label}</span>;
}

function TrustRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-ink/40 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{value}</p>
    </div>
  );
}
