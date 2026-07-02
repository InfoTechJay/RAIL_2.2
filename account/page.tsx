import Link from "next/link";
import { AuthPanel } from "@/components/AuthPanel";
import { Disclaimer } from "@/components/Disclaimer";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-railGold">Account Access</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">Login or register for RAIL account tools</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
          Accounts will support saved assets, personal diligence notes, alert preferences, and role-based admin access. The current form is ready
          for integration with a production authentication provider.
        </p>
        <div className="mt-6 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
          <Feature title="Watchlists" detail="Save tokenized assets for follow-up research." />
          <Feature title="Alerts" detail="Prepare daily or weekly update notifications." />
          <Feature title="Notes" detail="Keep private research notes tied to asset records." />
          <Feature title="Roles" detail="Separate standard users from future admin access." />
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          Already exploring?{" "}
          <Link href="/assets" className="font-semibold text-railGold hover:text-railGoldSoft">
            Return to asset screener
          </Link>
        </p>
      </section>
      <div className="space-y-5">
        <AuthPanel />
        <Disclaimer compact />
      </div>
    </main>
  );
}

function Feature({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-charcoal/80 p-4">
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-2 leading-6 text-zinc-400">{detail}</p>
    </div>
  );
}
