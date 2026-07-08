import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { WatchlistClient } from "@/components/WatchlistClient";
import { getAssets } from "@/lib/live-data";

export const dynamic = "force-dynamic";

export default async function WatchlistPage() {
  const assets = await getAssets();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Watchlist"
        title="Track assets for future account workflows"
        description="Save assets, attach personal diligence notes, and preview update alerts before authenticated account persistence is added."
      />
      <WatchlistClient assets={assets} />
      <div className="mt-6">
        <Disclaimer compact />
      </div>
    </main>
  );
}
