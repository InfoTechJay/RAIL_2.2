import { AssetScreener } from "@/components/AssetScreener";
import { Disclaimer } from "@/components/Disclaimer";
import { getAssets, getScreenerOptions } from "@/lib/live-data";

export const dynamic = "force-dynamic";

export default async function AssetsPage() {
  const [assets, options] = await Promise.all([getAssets(), getScreenerOptions()]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-railGold">Asset Screener</p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">Search and filter tokenized real-world assets</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          Compare assets by category, platform, blockchain, risk, expected yield, liquidity, location, status, and eligibility.
        </p>
      </div>
      <AssetScreener assets={assets} categories={options.categories} platforms={options.platforms} blockchains={options.blockchains} />
      <div className="mt-8">
        <Disclaimer compact />
      </div>
    </main>
  );
}
