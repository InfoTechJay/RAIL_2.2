import { DatabaseZap, ShieldCheck } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { getDataReadiness, getDataSources } from "@/lib/live-data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function DataSourcesPage() {
  const [dataSources, readiness] = await Promise.all([getDataSources(), getDataReadiness()]);
  const active = dataSources.filter((source) => source.active).length;
  const highTrust = dataSources.filter((source) => source.trustLevel === "High").length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Data Source Registry"
        title="Every displayed data point needs provenance"
        description="RAIL tracks issuer, marketplace, chain, regulatory, analytics, news, and manual research sources so users can understand why data should be trusted."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Registered sources" value={`${dataSources.length}`} detail="Seeded registry entries" icon={<DatabaseZap className="h-4 w-4" />} />
        <StatCard label="Active sources" value={`${active}`} detail="Enabled for future sync jobs" icon={<ShieldCheck className="h-4 w-4" />} />
        <StatCard label="High trust" value={`${highTrust}`} detail="Official or authoritative sources" />
        <StatCard label="Connector status" value={readiness.blockers.length ? "Needs setup" : "Ready"} detail="Live sync readiness" />
      </div>

      {(readiness.blockers.length > 0 || readiness.sourceGaps.missingApiSources.length > 0) && (
        <section className="rail-card mt-6 rounded-lg p-5">
          <h2 className="font-semibold text-white">Data Readiness</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {readiness.blockers.map((blocker) => (
              <p key={blocker} className="rounded-md border border-railGold/20 bg-railGold/10 p-3 text-sm leading-6 text-railGoldSoft">
                {blocker}
              </p>
            ))}
            <p className="rounded-md border border-white/10 bg-ink/40 p-3 text-sm leading-6 text-zinc-300">
              {readiness.sourceGaps.missingApiSources.length} active sources need API URLs before automated ingestion can pull from them.
            </p>
          </div>
        </section>
      )}

      <section className="rail-card mt-6 rounded-lg p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                <th className="border-b border-white/10 px-3 py-3">Source</th>
                <th className="border-b border-white/10 px-3 py-3">Type</th>
                <th className="border-b border-white/10 px-3 py-3">Trust</th>
                <th className="border-b border-white/10 px-3 py-3">Frequency</th>
                <th className="border-b border-white/10 px-3 py-3">Asset types</th>
                <th className="border-b border-white/10 px-3 py-3">Chains</th>
                <th className="border-b border-white/10 px-3 py-3">API</th>
                <th className="border-b border-white/10 px-3 py-3">Last sync</th>
              </tr>
            </thead>
            <tbody>
              {dataSources.map((source) => (
                <tr key={source.slug} className="text-zinc-300">
                  <td className="border-b border-white/5 px-3 py-4">
                    <a href={source.website} target="_blank" rel="noreferrer" className="font-medium text-white hover:text-railGold">
                      {source.name}
                    </a>
                    <p className="mt-1 text-xs text-zinc-500">{source.notes}</p>
                  </td>
                  <td className="border-b border-white/5 px-3 py-4">{source.sourceType}</td>
                  <td className="border-b border-white/5 px-3 py-4">{source.trustLevel}</td>
                  <td className="border-b border-white/5 px-3 py-4">{source.updateFrequency}</td>
                  <td className="border-b border-white/5 px-3 py-4">{source.primaryAssetTypes.join(", ")}</td>
                  <td className="border-b border-white/5 px-3 py-4">{source.supportedBlockchains.join(", ")}</td>
                  <td className="border-b border-white/5 px-3 py-4">{source.apiUrl ? "Configured" : "Missing"}</td>
                  <td className="border-b border-white/5 px-3 py-4">{formatDate(source.lastSync)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-6">
        <Disclaimer compact />
      </div>
    </main>
  );
}
