import { AlertTriangle, BadgeDollarSign, Database, Layers3, PlusCircle, ShieldCheck } from "lucide-react";
import { CategoryBreakdownChart, PlatformChart, RiskSentimentChart, YieldByCategoryChart } from "@/components/Charts";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { dataSources } from "@/lib/data-source-registry";
import { assets, dashboardMetrics } from "@/lib/mock-data";
import { platformMetrics, platformProfiles } from "@/lib/platform-data";
import { calculateDataConfidence } from "@/lib/scoring";
import { formatCurrency, formatDate, formatPercent } from "@/lib/format";

export default function DashboardPage() {
  const metrics = dashboardMetrics();
  const platformStats = platformMetrics();
  const highestRisk = [...assets].sort((a, b) => b.riskScore - a.riskScore).slice(0, 3);
  const recentlyUpdated = [...assets].sort((a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated)).slice(0, 4);
  const newListings = [...assets].sort((a, b) => Date.parse(b.launchDate) - Date.parse(a.launchDate)).slice(0, 3);
  const confidenceRanked = assets
    .map((asset) => ({ asset, confidence: calculateDataConfidence(asset) }))
    .sort((a, b) => b.confidence.value - a.confidence.value);
  const largestPlatforms = [...platformProfiles].sort((a, b) => b.totalTokenizedValue - a.totalTokenizedValue).slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Market Dashboard"
        title="Tokenized real-world asset market intelligence"
        description="A research command center for tracked assets, platforms, disclosed value, category exposure, source quality, confidence, and market activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total assets" value={`${metrics.totalAssets}`} detail="Current tracked sample" icon={<Database className="h-4 w-4" />} />
        <StatCard label="Total platforms" value={`${platformStats.totalPlatforms}`} detail="Issuer and marketplace profiles" icon={<Layers3 className="h-4 w-4" />} />
        <StatCard label="Asset value" value={formatCurrency(metrics.totalValue, true)} detail="Asset-level disclosures" icon={<BadgeDollarSign className="h-4 w-4" />} />
        <StatCard label="Platform value" value={formatCurrency(platformStats.totalTokenizedValue, true)} detail="Platform intelligence sample" icon={<BadgeDollarSign className="h-4 w-4" />} />
        <StatCard label="Data sources" value={`${dataSources.length}`} detail="Registry entries" icon={<ShieldCheck className="h-4 w-4" />} />
        <StatCard label="Avg projected yield" value={formatPercent(metrics.averageYield)} detail="Reported, not guaranteed" icon={<PlusCircle className="h-4 w-4" />} />
        <StatCard label="Active assets" value={`${metrics.activeAssets}`} detail="Currently monitored" icon={<AlertTriangle className="h-4 w-4" />} />
        <StatCard label="Avg transparency" value={`${platformStats.averageTransparency}`} detail="Platform disclosure score" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartPanel title="Assets by Category">
          <CategoryBreakdownChart />
        </ChartPanel>
        <ChartPanel title="Average Projected Yield by Category">
          <YieldByCategoryChart />
        </ChartPanel>
        <ChartPanel title="Largest Platforms by Disclosed Value">
          <PlatformChart />
        </ChartPanel>
        <ChartPanel title="Risk and Sentiment Monitor">
          <RiskSentimentChart />
        </ChartPanel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ListPanel title="Highest Risk Assets" items={highestRisk.map((asset) => [asset.name, `Risk ${asset.riskScore} - ${asset.category}`])} />
        <ListPanel title="Recently Updated Assets" items={recentlyUpdated.map((asset) => [asset.name, formatDate(asset.lastUpdated)])} />
        <ListPanel title="Recently Added Assets" items={newListings.map((asset) => [asset.name, `${formatDate(asset.launchDate)} - ${asset.status}`])} />
        <ListPanel title="Largest Platforms" items={largestPlatforms.map((platform) => [platform.name, `${formatCurrency(platform.totalTokenizedValue, true)} tracked value`])} />
        <ListPanel
          title="Highest Confidence Assets"
          items={confidenceRanked.slice(0, 3).map(({ asset, confidence }) => [asset.name, `Confidence ${confidence.value} - ${confidence.rating}`])}
        />
        <ListPanel
          title="Lowest Confidence Assets"
          items={[...confidenceRanked].reverse().slice(0, 3).map(({ asset, confidence }) => [asset.name, `Confidence ${confidence.value} - review sources`])}
        />
        <ListPanel title="Fastest Growing Categories" items={["Tokenized Treasuries", "Private Credit", "Tokenized Real Estate"].map((category, index) => [category, `${18 - index * 4}% sample growth`])} />
        <ListPanel title="Most Viewed Assets" items={assets.slice(0, 3).map((asset, index) => [asset.name, `${1200 - index * 180} sample views`])} />
        <ListPanel title="Most Followed Assets" items={assets.slice(2, 5).map((asset, index) => [asset.name, `${420 - index * 65} sample follows`])} />
      </div>

      <div className="mt-6">
        <Disclaimer compact />
      </div>
    </main>
  );
}

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rail-card rounded-lg p-5">
      <h2 className="mb-4 font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function ListPanel({ title, items }: { title: string; items: string[][] }) {
  return (
    <section className="rail-card rounded-lg p-5">
      <h2 className="mb-4 font-semibold text-white">{title}</h2>
      <div className="space-y-3">
        {items.map(([name, detail]) => (
          <div key={`${title}-${name}`} className="rounded-md border border-white/10 bg-ink/40 p-4">
            <p className="font-medium text-white">{name}</p>
            <p className="mt-1 text-sm text-zinc-400">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
