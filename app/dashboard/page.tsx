import { AlertTriangle, BadgeDollarSign, Database, PlusCircle } from "lucide-react";
import { CategoryBreakdownChart, PlatformChart, RiskSentimentChart, YieldByCategoryChart } from "@/components/Charts";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { assets, dashboardMetrics } from "@/lib/mock-data";
import { formatCurrency, formatDate, formatPercent } from "@/lib/format";

export default function DashboardPage() {
  const metrics = dashboardMetrics();
  const highestRisk = [...assets].sort((a, b) => b.riskScore - a.riskScore).slice(0, 3);
  const recentlyUpdated = [...assets].sort((a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated)).slice(0, 4);
  const newListings = [...assets].sort((a, b) => Date.parse(b.launchDate) - Date.parse(a.launchDate)).slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Market Dashboard"
        title="Tokenized real-world asset market overview"
        description="A mock-data command center for tracked assets, disclosed value, category exposure, yields, platform concentration, risk, and listing activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total tracked assets" value={`${metrics.totalAssets}`} detail="Across five sample sectors" icon={<Database className="h-4 w-4" />} />
        <StatCard label="Disclosed value" value={formatCurrency(metrics.totalValue, true)} detail="Issuer and platform disclosures" icon={<BadgeDollarSign className="h-4 w-4" />} />
        <StatCard label="Average projected yield" value={formatPercent(metrics.averageYield)} detail="Projected, not guaranteed" icon={<PlusCircle className="h-4 w-4" />} />
        <StatCard label="Active assets" value={`${metrics.activeAssets}`} detail="Currently monitored" icon={<AlertTriangle className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartPanel title="Category Breakdown">
          <CategoryBreakdownChart />
        </ChartPanel>
        <ChartPanel title="Average Projected Yield by Category">
          <YieldByCategoryChart />
        </ChartPanel>
        <ChartPanel title="Top Platforms by Disclosed Value">
          <PlatformChart />
        </ChartPanel>
        <ChartPanel title="Risk and Sentiment Monitor">
          <RiskSentimentChart />
        </ChartPanel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ListPanel title="Highest Risk Assets" items={highestRisk.map((asset) => [asset.name, `Risk ${asset.riskScore} · ${asset.category}`])} />
        <ListPanel title="Recently Updated Assets" items={recentlyUpdated.map((asset) => [asset.name, formatDate(asset.lastUpdated)])} />
        <ListPanel title="New Listings" items={newListings.map((asset) => [asset.name, `${formatDate(asset.launchDate)} · ${asset.status}`])} />
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
          <div key={name} className="rounded-md border border-white/10 bg-ink/40 p-4">
            <p className="font-medium text-white">{name}</p>
            <p className="mt-1 text-sm text-zinc-400">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
