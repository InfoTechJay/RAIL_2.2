import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
};

export function StatCard({ label, value, detail, icon }: StatCardProps) {
  return (
    <div className="rail-card rounded-lg p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
          {detail ? <p className="mt-2 text-sm text-zinc-400">{detail}</p> : null}
        </div>
        {icon ? <div className="rounded-md border border-railGold/25 bg-railGold/10 p-2 text-railGold">{icon}</div> : null}
      </div>
    </div>
  );
}
