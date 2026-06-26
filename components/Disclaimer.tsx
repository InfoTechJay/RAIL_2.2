import { ShieldAlert } from "lucide-react";
import { complianceDisclaimer } from "@/lib/constants";

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`rail-card rounded-lg ${compact ? "p-4" : "p-6 md:p-7"}`}>
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-railGold" aria-hidden />
        <div>
          <h2 className={`${compact ? "text-sm" : "text-base"} font-semibold text-white`}>Educational Information Only</h2>
          <p className={`${compact ? "mt-1 text-xs" : "mt-2 text-sm"} leading-6 text-zinc-300`}>{complianceDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}
