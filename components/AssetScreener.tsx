"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AssetCard } from "@/components/AssetCard";
import type { InvestorEligibility, LiquidityRating, LiveAsset } from "@/lib/live-data";

const riskOptions = [
  { label: "Any risk", value: "any" },
  { label: "Low to moderate", value: "0-55" },
  { label: "Elevated", value: "56-75" },
  { label: "High", value: "76-100" }
];

export function AssetScreener({
  assets,
  categories,
  platforms,
  blockchains
}: {
  assets: LiveAsset[];
  categories: string[];
  platforms: string[];
  blockchains: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [blockchain, setBlockchain] = useState("all");
  const [risk, setRisk] = useState("any");
  const [yieldMin, setYieldMin] = useState("0");
  const [liquidity, setLiquidity] = useState("all");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("all");
  const [eligibility, setEligibility] = useState("all");

  const filtered = useMemo(() => {
    return assets.filter((asset) => {
      const queryMatch = [asset.name, asset.category, asset.platform, asset.location, asset.industry, asset.tokenSymbol]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const [riskMin, riskMax] = risk === "any" ? [0, 100] : risk.split("-").map(Number);
      return (
        queryMatch &&
        (category === "all" || asset.category === category) &&
        (platform === "all" || asset.platform === platform) &&
        (blockchain === "all" || asset.blockchain === blockchain) &&
        asset.riskScore >= riskMin &&
        asset.riskScore <= riskMax &&
        asset.expectedYield >= Number(yieldMin || 0) &&
        (liquidity === "all" || asset.liquidityRating === liquidity) &&
        (location === "" || asset.location.toLowerCase().includes(location.toLowerCase())) &&
        (status === "all" || asset.status === status) &&
        (eligibility === "all" || asset.investorEligibility === eligibility)
      );
    });
  }, [blockchain, category, eligibility, liquidity, location, platform, query, risk, status, yieldMin]);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="rail-card h-fit rounded-lg p-5">
        <div className="mb-5 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-railGold" aria-hidden />
          <h2 className="font-semibold text-white">Filters</h2>
        </div>
        <div className="space-y-4">
          <Field label="Search">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-500" aria-hidden />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="input pl-9" placeholder="Asset, token, platform" />
            </div>
          </Field>
          <Field label="Category">
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="input">
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Platform">
            <select value={platform} onChange={(event) => setPlatform(event.target.value)} className="input">
              <option value="all">All platforms</option>
              {platforms.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Blockchain">
            <select value={blockchain} onChange={(event) => setBlockchain(event.target.value)} className="input">
              <option value="all">All chains</option>
              {blockchains.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Risk score">
            <select value={risk} onChange={(event) => setRisk(event.target.value)} className="input">
              {riskOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Expected yield at least">
            <input value={yieldMin} onChange={(event) => setYieldMin(event.target.value)} type="number" min="0" max="20" step="0.5" className="input" />
          </Field>
          <Field label="Liquidity">
            <select value={liquidity} onChange={(event) => setLiquidity(event.target.value as LiquidityRating | "all")} className="input">
              <option value="all">Any liquidity</option>
              <option value="LOW">Low</option>
              <option value="MODERATE">Moderate</option>
              <option value="HIGH">High</option>
              <option value="LOCKED">Locked</option>
            </select>
          </Field>
          <Field label="Location">
            <input value={location} onChange={(event) => setLocation(event.target.value)} className="input" placeholder="City, state, country" />
          </Field>
          <Field label="Status">
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="input">
              <option value="all">Any status</option>
              <option value="ACTIVE">Active</option>
              <option value="FUNDING">Funding</option>
              <option value="CLOSED">Closed</option>
              <option value="PAUSED">Paused</option>
              <option value="MATURED">Matured</option>
            </select>
          </Field>
          <Field label="Investor eligibility">
            <select value={eligibility} onChange={(event) => setEligibility(event.target.value as InvestorEligibility | "all")} className="input">
              <option value="all">Any eligibility</option>
              <option value="RETAIL">Retail</option>
              <option value="ACCREDITED">Accredited</option>
              <option value="QUALIFIED_PURCHASER">Qualified purchaser</option>
              <option value="INSTITUTIONAL">Institutional</option>
            </select>
          </Field>
        </div>
      </aside>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-zinc-400">
            Showing <span className="font-semibold text-white">{filtered.length}</span> of {assets.length} tracked assets
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
          {filtered.length === 0 && (
            <div className="rail-card rounded-lg p-6 md:col-span-2 xl:col-span-3">
              <h3 className="font-semibold text-white">No assets available</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                RAIL could not load asset records from the database. Check `/admin/data-readiness` and confirm `DATABASE_URL`, seeded tables, and live source credentials are configured.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</span>
      {children}
    </label>
  );
}
