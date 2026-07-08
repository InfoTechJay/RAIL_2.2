import { AlertTriangle, BadgeDollarSign, Database, Layers3, PlusCircle, ShieldCheck } from "lucide-react";
import { CategoryBreakdownChart, PlatformChart, RiskSentimentChart, YieldByCategoryChart } from "@/components/Charts";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { getDashboardData } from "@/lib/live-data";
import { formatCurrency, formatDate, formatPercent } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();
  const { metrics } = dashboard;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Market Dashboard"
        title="Tokenized real-world asset market intelligence"
        description="A research command center for tracked assets, platforms, disclosed value, category exposure, source quality, confidence, and market activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total assets" value={`${metrics.totalAssets}`} detail="Current database records" icon={<Database className="h-4 w-4" />} />
        <StatCard label="Total platforms" value={`${metrics.totalPlatforms}`} detail="Issuer and marketplace profiles" icon={<Layers3 className="h-4 w-4" />} />
        <StatCard label="Asset value" value={formatCurrency(metrics.totalValue, true)} detail="Asset-level disclosures" icon={<BadgeDollarSign className="h-4 w-4" />} />
        <StatCard label="Platform value" value={formatCurrency(metrics.platformValue, true)} detail="Platform intelligence records" icon={<BadgeDollarSign className="h-4 w-4" />} />
        <StatCard label="Data sources" value={`${metrics.dataSources}`} detail="Registry entries" icon={<ShieldCheck className="h-4 w-4" />} />
        <StatCard label="Avg projected yield" value={formatPercent(metrics.averageYield)} detail="Reported, not guaranteed" icon={<PlusCircle className="h-4 w-4" />} />
        <StatCard label="Active assets" value={`${metrics.activeAssets}`} detail="Currently monitored" icon={<AlertTriangle className="h-4 w-4" />} />
        <StatCard label="Avg transparency" value={`${metrics.averageTransparency}`} detail="Platform disclosure score" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartPanel title="Assets by Category">
          <CategoryBreakdownChart data={dashboard.categoryBreakdown} />
        </ChartPanel>
        <ChartPanel title="Average Projected Yield by Category">
          <YieldByCategoryChart data={dashboard.yieldByCategory} />
        </ChartPanel>
        <ChartPanel title="Largest Platforms by Disclosed Value">
          <PlatformChart data={dashboard.topPlatforms} />
        </ChartPanel>
        <ChartPanel title="Risk and Sentiment Monitor">
          <RiskSentimentChart data={dashboard.riskSentiment} />
        </ChartPanel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ListPanel title="Highest Risk Assets" items={dashboard.highestRisk.map((asset) => [asset.name, `Risk ${asset.riskScore} - ${asset.category}`])} />
        <ListPanel title="Recently Updated Assets" items={dashboard.recentlyUpdated.map((asset) => [asset.name, formatDate(asset.lastUpdated)])} />
        <ListPanel title="Recently Added Assets" items={dashboard.newListings.map((asset) => [asset.name, `${formatDate(asset.launchDate)} - ${asset.status}`])} />
        <ListPanel title="Largest Platforms" items={dashboard.largestPlatforms.map((platform) => [platform.name, `${formatCurrency(platform.totalTokenizedValue, true)} tracked value`])} />
        <ListPanel
          title="Highest Confidence Assets"
          items={dashboard.confidenceRanked.slice(0, 3).map((asset) => [asset.name, `Confidence ${asset.dataConfidenceScore} - ${asset.confidenceLevel}`])}
        />
        <ListPanel
          title="Lowest Confidence Assets"
          items={[...dashboard.confidenceRanked].reverse().slice(0, 3).map((asset) => [asset.name, `Confidence ${asset.dataConfidenceScore} - review sources`])}
        />
        <ListPanel title="Fastest Growing Categories" items={["Tokenized Treasuries", "Private Credit", "Tokenized Real Estate"].map((category) => [category, "Historical snapshot tracking needed"])} />
        <ListPanel title="Most Viewed Assets" items={dashboard.recentlyUpdated.slice(0, 3).map((asset) => [asset.name, "Account analytics pending"])} />
        <ListPanel title="Most Followed Assets" items={dashboard.confidenceRanked.slice(0, 3).map((asset) => [asset.name, "Watchlist analytics pending"])} />
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
