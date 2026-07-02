import Link from "next/link";
import { Bell, BookmarkCheck, FileText, LockKeyhole, UserCircle } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Account"
        title="Your RAIL account workspace"
        description="A placeholder account center for standard users. Connect authentication to enable saved preferences, private notes, and update alerts."
      />

      <div className="grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
        <section className="rail-card rounded-lg p-5 md:p-6">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-md border border-railGold/25 bg-railGold/10 text-railGold">
                <UserCircle className="h-7 w-7" aria-hidden />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Standard User</h1>
                <p className="mt-1 text-sm text-zinc-400">Authentication not connected yet</p>
              </div>
            </div>
            <Link
              href="/login"
              className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-railGold bg-railGold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-railGoldSoft"
            >
              Login / Register
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <AccountCard icon={<BookmarkCheck className="h-5 w-5" />} title="Saved Assets" value="2 sample assets" detail="Future accounts will persist watchlists to the database." />
            <AccountCard icon={<FileText className="h-5 w-5" />} title="Research Notes" value="Local placeholder" detail="Private notes will sync after auth is integrated." />
            <AccountCard icon={<Bell className="h-5 w-5" />} title="Update Alerts" value="Not configured" detail="Daily or weekly refresh alerts can be added here." />
            <AccountCard icon={<LockKeyhole className="h-5 w-5" />} title="Role" value="Standard user" detail="Admin tools remain separated from the public navigation." />
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rail-card rounded-lg p-5">
            <h2 className="font-semibold text-white">Authentication Roadmap</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
              <p>Future auth provider options: Clerk, Auth.js, Supabase Auth, or Vercel-integrated OAuth.</p>
              <p>Once connected, protect `/admin`, store watchlists by user ID, and add account-level alert preferences.</p>
            </div>
          </section>
          <Disclaimer compact />
        </aside>
      </div>
    </main>
  );
}

function AccountCard({ icon, title, value, detail }: { icon: React.ReactNode; title: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-ink/45 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-railGold/25 bg-railGold/10 p-2 text-railGold">{icon}</div>
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm text-railGoldSoft">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{detail}</p>
    </div>
  );
}
