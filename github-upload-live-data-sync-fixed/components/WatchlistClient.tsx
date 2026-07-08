"use client";

import { useMemo, useState } from "react";
import { Bell, BookmarkPlus, LockKeyhole, Trash2 } from "lucide-react";
import type { LiveAsset } from "@/lib/live-data";
import { formatDate, formatPercent } from "@/lib/format";

export function WatchlistClient({ assets }: { assets: LiveAsset[] }) {
  const initialSavedIds = assets.slice(0, 2).map((asset) => asset.id);
  const [savedIds, setSavedIds] = useState<string[]>(initialSavedIds);
  const [notes, setNotes] = useState<Record<string, string>>({
    [initialSavedIds[0] ?? ""]: "Review source updates and verification notes after the next sync.",
    [initialSavedIds[1] ?? ""]: "Track confidence score changes and new data-source coverage."
  });

  const savedAssets = useMemo(() => assets.filter((asset) => savedIds.includes(asset.id)), [savedIds]);
  const availableAssets = assets.filter((asset) => !savedIds.includes(asset.id));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        {savedAssets.map((asset) => (
          <article key={asset.id} className="rail-card rounded-lg p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-railGold">{asset.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{asset.name}</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  {asset.platform} - {asset.location} - Updated {formatDate(asset.lastUpdated)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSavedIds((ids) => ids.filter((id) => id !== asset.id))}
                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-300 transition hover:border-red-300/50 hover:text-red-200"
                aria-label={`Remove ${asset.name}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Mini label="Expected yield" value={formatPercent(asset.expectedYield)} />
              <Mini label="Risk score" value={`${asset.riskScore}`} />
              <Mini label="Liquidity" value={asset.liquidityRating} />
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Personal note</span>
              <textarea
                value={notes[asset.id] ?? ""}
                onChange={(event) => setNotes((current) => ({ ...current, [asset.id]: event.target.value }))}
                className="input min-h-24 resize-y"
                placeholder="Add diligence notes for future account sync"
              />
            </label>
          </article>
        ))}
      </section>

      <aside className="space-y-6">
        <section className="rail-card rounded-lg p-5">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5 text-railGold" aria-hidden />
            <h2 className="font-semibold text-white">Authentication Placeholder</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            This account preview uses browser state. Future user accounts will persist saved assets, personal notes, and update alerts through authenticated
            database records.
          </p>
        </section>

        <section className="rail-card rounded-lg p-5">
          <div className="mb-4 flex items-center gap-3">
            <BookmarkPlus className="h-5 w-5 text-railGold" aria-hidden />
            <h2 className="font-semibold text-white">Add Assets</h2>
          </div>
          <div className="space-y-3">
            {availableAssets.map((asset) => (
              <button
                type="button"
                key={asset.id}
                onClick={() => setSavedIds((ids) => [...ids, asset.id])}
                className="focus-ring w-full rounded-md border border-white/10 bg-ink/40 p-3 text-left transition hover:border-railGold/50"
              >
                <span className="block font-medium text-white">{asset.name}</span>
                <span className="mt-1 block text-sm text-zinc-400">{asset.category}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rail-card rounded-lg p-5">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-railGold" aria-hidden />
            <h2 className="font-semibold text-white">Future Alerts</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-400">Update alerts will cover new disclosures, risk changes, sentiment shifts, and new source checks.</p>
        </section>
      </aside>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-ink/40 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
