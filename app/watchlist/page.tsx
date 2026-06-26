import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { WatchlistClient } from "@/components/WatchlistClient";

export default function WatchlistPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Watchlist"
        title="Track assets for future account workflows"
        description="Save assets, attach personal diligence notes, and preview update alerts using local mock state until authentication is added."
      />
      <WatchlistClient />
      <div className="mt-6">
        <Disclaimer compact />
      </div>
    </main>
  );
}
