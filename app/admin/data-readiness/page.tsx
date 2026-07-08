import { AlertTriangle, CheckCircle2, DatabaseZap } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { getDataReadiness } from "@/lib/live-data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function DataReadinessPage() {
  const readiness = await getDataReadiness();
  const sourceGapCount = readiness.sourceGaps.missingApiSources.length + readiness.sourceGaps.inactiveSources.length;
  const assetGapCount =
    readiness.assetGaps.missingContractAssets.length +
    readiness.assetGaps.lowConfidenceAssets.length +
    readiness.assetGaps.missingSourceAssets.length +
    readiness.assetGaps.missingValueAssets.length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Admin"
        title="Live data readiness"
        description="Operational checklist for moving RAIL from seeded research records to live, recurring ingestion."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Blockers" value={`${readiness.blockers.length}`} detail="Must fix before production sync" icon={<AlertTriangle className="h-4 w-4" />} />
        <StatCard label="Source gaps" value={`${sourceGapCount}`} detail="API or activity setup" icon={<DatabaseZap className="h-4 w-4" />} />
        <StatCard label="Asset gaps" value={`${assetGapCount}`} detail="Verification/data quality issues" icon={<AlertTriangle className="h-4 w-4" />} />
        <StatCard label="Recent sync jobs" value={`${readiness.syncJobs.length}`} detail="Latest ingestion history" icon={<CheckCircle2 className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Production Blockers" items={readiness.blockers.length ? readiness.blockers : ["No production blockers detected."]} />
        <Panel title="Sources Missing API URLs" items={readiness.sourceGaps.missingApiSources.slice(0, 12).map((source) => `${source.name} - ${source.sourceType}`)} />
        <Panel title="Low Confidence Assets" items={readiness.assetGaps.lowConfidenceAssets.slice(0, 12).map((asset) => `${asset.name} - confidence ${asset.dataConfidenceScore}`)} />
        <Panel title="Missing Contract References" items={readiness.assetGaps.missingContractAssets.slice(0, 12).map((asset) => `${asset.name} - ${asset.blockchain}`)} />
      </div>

      <section className="rail-card mt-6 rounded-lg p-5">
        <h2 className="font-semibold text-white">Sync History</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                <th className="border-b border-white/10 px-3 py-3">Source</th>
                <th className="border-b border-white/10 px-3 py-3">Status</th>
                <th className="border-b border-white/10 px-3 py-3">Fetched</th>
                <th className="border-b border-white/10 px-3 py-3">Saved</th>
                <th className="border-b border-white/10 px-3 py-3">Started</th>
                <th className="border-b border-white/10 px-3 py-3">Errors</th>
              </tr>
            </thead>
            <tbody>
              {readiness.syncJobs.map((job) => (
                <tr key={job.id} className="text-zinc-300">
                  <td className="border-b border-white/5 px-3 py-4">{job.sourceName}</td>
                  <td className="border-b border-white/5 px-3 py-4">{job.status}</td>
                  <td className="border-b border-white/5 px-3 py-4">{job.recordsFetched}</td>
                  <td className="border-b border-white/5 px-3 py-4">{job.recordsSaved}</td>
                  <td className="border-b border-white/5 px-3 py-4">{formatDate(job.startedAt)}</td>
                  <td className="border-b border-white/5 px-3 py-4">{job.errors.join("; ") || "None"}</td>
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

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rail-card rounded-lg p-5">
      <h2 className="font-semibold text-white">{title}</h2>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <p key={item} className="rounded-md border border-white/10 bg-ink/40 p-3 text-sm leading-6 text-zinc-300">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
