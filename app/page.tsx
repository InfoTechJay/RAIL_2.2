import Image from "next/image";
import { Bell, BookOpen, ChartNoAxesCombined, Database, FileSearch, LockKeyhole, ShieldCheck, UserPlus } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { categories } from "@/lib/mock-data";

const unlockItems = [
  {
    title: "Asset Screener",
    detail: "Filter tokenized real-world assets by category, platform, chain, risk, yield profile, liquidity, status, and eligibility."
  },
  {
    title: "Risk & Sentiment Indicators",
    detail: "Review structured research signals, source quality, market tone, transparency, and update history in one workspace."
  },
  {
    title: "Watchlists & Notes",
    detail: "Save assets, track changes, and prepare private diligence notes as account features are connected."
  },
  {
    title: "Market Dashboard",
    detail: "Monitor category exposure, disclosed value, platform concentration, high-risk assets, and recent listings."
  }
];

const workflow = [
  { label: "Aggregate", icon: <Database className="h-5 w-5" aria-hidden />, detail: "Collect issuer, platform, public-record, document, and market references." },
  { label: "Normalize", icon: <FileSearch className="h-5 w-5" aria-hidden />, detail: "Structure real-world asset data into comparable research fields." },
  { label: "Evaluate", icon: <ChartNoAxesCombined className="h-5 w-5" aria-hidden />, detail: "Surface risk, sentiment, liquidity, transparency, and source signals." },
  { label: "Monitor", icon: <Bell className="h-5 w-5" aria-hidden />, detail: "Prepare daily or weekly refreshes for account-based alerts and tracking." }
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image src="/rail-hero.png" alt="" fill priority className="object-cover object-center opacity-48" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/48" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-md border border-railGold/25 bg-railGold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-railGold">
              Real Asset Information Ledger
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Research Tokenized Real-World Assets with Confidence
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              RAIL is an account-based research platform for tokenized real estate, private markets, royalties, farmland, credit, and other
              real-world investment products. Public visitors get a high-level overview. Account users unlock the research workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/login">Create Account</ButtonLink>
              <ButtonLink href="/account" variant="secondary">
                View Account Tools
              </ButtonLink>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500">
              RAIL is for market data, research tools, and education. It does not provide investment advice or securities offerings.
            </p>
          </div>

          <div className="rail-card rounded-lg p-5 shadow-glow">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-railGold">Member Preview</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Research Workspace</h2>
              </div>
              <div className="rounded-md border border-railGold/25 bg-railGold/10 p-2 text-railGold">
                <LockKeyhole className="h-5 w-5" aria-hidden />
              </div>
            </div>

            <div className="space-y-3">
              {["Tokenized real estate", "Private credit", "Entertainment royalty"].map((label) => (
                <div key={label} className="rounded-md border border-white/10 bg-ink/55 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-white">{label}</p>
                    <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-400">Account required</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <LockedMetric label="Risk" />
                    <LockedMetric label="Yield" />
                    <LockedMetric label="Sentiment" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-md border border-railGold/20 bg-railGold/10 p-4 text-sm leading-6 text-railGoldSoft">
              Create an account to access asset-level profiles, documents, data sources, outlooks, and saved research workflows.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Platform Overview"
          title="A research layer for tokenized real-world assets"
          description="RAIL organizes fragmented tokenized asset information into a structured ledger built for discovery, comparison, and ongoing monitoring."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {unlockItems.map((item) => (
            <article key={item.title} className="rail-card rounded-lg p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-railGold/25 bg-railGold/10 text-railGold">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite/55">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Coverage"
              title="Markets RAIL is built to track"
              description="The public site shows the scope of coverage without publishing the full research ledger to unauthenticated visitors."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category} className="rounded-lg border border-white/10 bg-ink/45 p-4">
                  <p className="font-semibold text-white">{category}</p>
                  <p className="mt-2 text-sm text-zinc-400">Structured overview available publicly. Detailed asset research requires an account.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rail-card rounded-lg p-5">
            <div className="mb-5 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-railGold" aria-hidden />
              <h3 className="font-semibold text-white">How RAIL Works</h3>
            </div>
            <div className="space-y-4">
              {workflow.map((step) => (
                <div key={step.label} className="flex gap-4 rounded-md border border-white/10 bg-ink/45 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-railGold/25 bg-railGold/10 text-railGold">
                    {step.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{step.label}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.72fr_0.28fr] lg:px-8">
        <div className="rail-card rounded-lg p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-railGold">Account Access</p>
              <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Unlock the full research workspace</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                Account access is designed for watchlists, private notes, alert preferences, and deeper research pages while keeping the public
                landing page intentionally limited.
              </p>
            </div>
            <ButtonLink href="/login">
              <span className="inline-flex items-center gap-2">
                <UserPlus className="h-4 w-4" aria-hidden />
                Get Started
              </span>
            </ButtonLink>
          </div>
        </div>
        <Disclaimer compact />
      </section>
    </main>
  );
}

function LockedMetric({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <div className="mt-2 h-3 w-16 rounded-full bg-zinc-700/70" />
    </div>
  );
}
