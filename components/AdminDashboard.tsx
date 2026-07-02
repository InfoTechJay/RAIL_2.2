"use client";

import { useMemo, useState } from "react";
import { Activity, CheckCircle2, Clock3, DatabaseZap, Edit3, FileCheck2, Layers3, Plus, RotateCw, Save, ShieldAlert, Trash2, X } from "lucide-react";
import { connectorRegistry } from "@/lib/ingestion/connectors";
import { dataSources } from "@/lib/data-source-registry";
import { assets as seedAssets, categories, platforms, type RailAsset } from "@/lib/mock-data";
import { platformProfiles } from "@/lib/platform-data";

type EditableAsset = Pick<
  RailAsset,
  "id" | "name" | "category" | "platform" | "riskScore" | "sentimentScore" | "expectedYield" | "status" | "location"
>;

const emptyAsset: EditableAsset = {
  id: "",
  name: "",
  category: categories[0],
  platform: platforms[0],
  riskScore: 50,
  sentimentScore: 50,
  expectedYield: 0,
  status: "FUNDING",
  location: ""
};

const adminWorkflows = [
  { label: "Manage Platforms", detail: `${platformProfiles.length} intelligence profiles`, icon: Layers3 },
  { label: "Manage Categories", detail: `${categories.length} asset classes`, icon: FileCheck2 },
  { label: "Manage Data Sources", detail: `${dataSources.length} registry sources`, icon: DatabaseZap },
  { label: "Trigger Sync Jobs", detail: `${connectorRegistry.length} connector shells`, icon: RotateCw }
];

const pendingApprovals = [
  "Review source confidence changes before publishing",
  "Approve normalized asset updates from connectors",
  "Flag conflicting issuer, chain, or regulatory data"
];

const syncHistory = [
  { source: "RWA.xyz", status: "Queued", detail: "Daily market intelligence sync" },
  { source: "SEC EDGAR", status: "Ready", detail: "Regulatory document scan" },
  { source: "PolygonScan", status: "Ready", detail: "Contract verification check" }
];

const auditLogs = [
  "Asset score methodology updated",
  "Data source trust level reviewed",
  "Admin role gate pending authentication provider"
];

export function AdminDashboard() {
  const [records, setRecords] = useState<EditableAsset[]>(
    seedAssets.map(({ id, name, category, platform, riskScore, sentimentScore, expectedYield, status, location }) => ({
      id,
      name,
      category,
      platform,
      riskScore,
      sentimentScore,
      expectedYield,
      status,
      location
    }))
  );
  const [editing, setEditing] = useState<EditableAsset | null>(null);
  const isEditingExisting = useMemo(() => Boolean(editing?.id && records.some((record) => record.id === editing.id)), [editing, records]);

  function saveRecord() {
    if (!editing || !editing.name.trim()) return;
    if (isEditingExisting) {
      setRecords((current) => current.map((record) => (record.id === editing.id ? editing : record)));
    } else {
      setRecords((current) => [{ ...editing, id: `asset-${Date.now()}` }, ...current]);
    }
    setEditing(null);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rail-card rounded-lg p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-white">Asset Registry</h2>
            <p className="mt-1 text-sm text-zinc-400">Mock admin state for future Prisma-backed CRUD operations.</p>
          </div>
          <button
            type="button"
            onClick={() => setEditing(emptyAsset)}
            className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-railGold/60 bg-railGold/10 px-4 py-2 text-sm font-semibold text-railGold transition hover:bg-railGold/15"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Add Asset
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                <th className="border-b border-white/10 px-3 py-3">Asset</th>
                <th className="border-b border-white/10 px-3 py-3">Category</th>
                <th className="border-b border-white/10 px-3 py-3">Platform</th>
                <th className="border-b border-white/10 px-3 py-3">Yield</th>
                <th className="border-b border-white/10 px-3 py-3">Risk</th>
                <th className="border-b border-white/10 px-3 py-3">Sentiment</th>
                <th className="border-b border-white/10 px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="text-zinc-300">
                  <td className="border-b border-white/5 px-3 py-4">
                    <span className="block font-medium text-white">{record.name}</span>
                    <span className="mt-1 block text-xs text-zinc-500">{record.location}</span>
                  </td>
                  <td className="border-b border-white/5 px-3 py-4">{record.category}</td>
                  <td className="border-b border-white/5 px-3 py-4">{record.platform}</td>
                  <td className="border-b border-white/5 px-3 py-4">{record.expectedYield.toFixed(1)}%</td>
                  <td className="border-b border-white/5 px-3 py-4">{record.riskScore}</td>
                  <td className="border-b border-white/5 px-3 py-4">{record.sentimentScore}</td>
                  <td className="border-b border-white/5 px-3 py-4">
                    <div className="flex gap-2">
                      <IconButton label={`Edit ${record.name}`} onClick={() => setEditing(record)} icon={<Edit3 className="h-4 w-4" />} />
                      <IconButton
                        label={`Delete ${record.name}`}
                        onClick={() => setRecords((current) => current.filter((item) => item.id !== record.id))}
                        icon={<Trash2 className="h-4 w-4" />}
                        danger
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </section>

        <aside className="space-y-6">
          <section className="rail-card rounded-lg p-5">
          <h2 className="font-semibold text-white">{editing ? (isEditingExisting ? "Edit Asset" : "Add Asset") : "Admin Controls"}</h2>
          {editing ? (
            <div className="mt-5 space-y-4">
              <AdminField label="Name">
                <input value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} className="input" />
              </AdminField>
              <AdminField label="Category">
                <select value={editing.category} onChange={(event) => setEditing({ ...editing, category: event.target.value })} className="input">
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Platform">
                <select value={editing.platform} onChange={(event) => setEditing({ ...editing, platform: event.target.value })} className="input">
                  {platforms.map((platform) => (
                    <option key={platform}>{platform}</option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Location or industry">
                <input value={editing.location} onChange={(event) => setEditing({ ...editing, location: event.target.value })} className="input" />
              </AdminField>
              <div className="grid grid-cols-3 gap-3">
                <AdminField label="Yield">
                  <input
                    type="number"
                    value={editing.expectedYield}
                    onChange={(event) => setEditing({ ...editing, expectedYield: Number(event.target.value) })}
                    className="input"
                  />
                </AdminField>
                <AdminField label="Risk">
                  <input type="number" value={editing.riskScore} onChange={(event) => setEditing({ ...editing, riskScore: Number(event.target.value) })} className="input" />
                </AdminField>
                <AdminField label="Sentiment">
                  <input
                    type="number"
                    value={editing.sentimentScore}
                    onChange={(event) => setEditing({ ...editing, sentimentScore: Number(event.target.value) })}
                    className="input"
                  />
                </AdminField>
              </div>
              <AdminField label="Status">
                <select value={editing.status} onChange={(event) => setEditing({ ...editing, status: event.target.value as EditableAsset["status"] })} className="input">
                  <option value="ACTIVE">Active</option>
                  <option value="FUNDING">Funding</option>
                  <option value="CLOSED">Closed</option>
                  <option value="PAUSED">Paused</option>
                  <option value="MATURED">Matured</option>
                </select>
              </AdminField>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={saveRecord}
                  className="focus-ring inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md border border-railGold/60 bg-railGold/10 px-4 py-2 text-sm font-semibold text-railGold"
                >
                  <Save className="h-4 w-4" aria-hidden />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-300"
                  aria-label="Cancel"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
            ) : (
              <div className="mt-4 space-y-3">
                {adminWorkflows.map((workflow) => (
                  <WorkflowItem key={workflow.label} label={workflow.label} detail={workflow.detail} icon={<workflow.icon className="h-4 w-4" aria-hidden />} />
                ))}
                <p className="pt-2 text-sm leading-6 text-zinc-400">
                  Future implementation should protect this route with role-based authentication and persist changes through Prisma mutations.
                </p>
              </div>
            )}
          </section>

          <section className="rail-card rounded-lg p-5">
            <h2 className="font-semibold text-white">Data Source Workflow</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Live integrations can be added as connector adapters that fetch, normalize, validate, score confidence, save, and log source data.
            </p>
            <div className="mt-4 grid gap-2">
              <WorkflowItem label="Active sources" detail={`${dataSources.filter((source) => source.active).length} enabled`} icon={<CheckCircle2 className="h-4 w-4" aria-hidden />} />
              <WorkflowItem label="Failed imports" detail="No failures in mock queue" icon={<ShieldAlert className="h-4 w-4" aria-hidden />} />
              <WorkflowItem label="Sync history" detail={`${syncHistory.length} sample jobs`} icon={<Clock3 className="h-4 w-4" aria-hidden />} />
            </div>
          </section>
        </aside>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <AdminPanel title="Approval Queue" items={pendingApprovals} />
        <AdminPanel title="Recent Sync Jobs" items={syncHistory.map((job) => `${job.source}: ${job.status} - ${job.detail}`)} />
        <AdminPanel title="Audit Log" items={auditLogs} />
      </section>
    </div>
  );
}

function WorkflowItem({ label, detail, icon }: { label: string; detail: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-white/10 bg-ink/40 p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-railGold/20 bg-railGold/10 text-railGold">{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-white">{label}</span>
        <span className="mt-0.5 block text-xs text-zinc-500">{detail}</span>
      </span>
    </div>
  );
}

function AdminPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rail-card rounded-lg p-5">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-railGold" aria-hidden />
        <h2 className="font-semibold text-white">{title}</h2>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <p key={item} className="rounded-md border border-white/10 bg-ink/40 p-3 text-sm leading-6 text-zinc-300">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</span>
      {children}
    </label>
  );
}

function IconButton({ label, onClick, icon, danger = false }: { label: string; onClick: () => void; icon: React.ReactNode; danger?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white/5 transition ${
        danger ? "border-red-300/20 text-red-200 hover:border-red-300/50" : "border-white/10 text-zinc-300 hover:border-railGold/50 hover:text-railGold"
      }`}
    >
      {icon}
    </button>
  );
}
