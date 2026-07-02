"use client";

import { useState } from "react";
import { CheckCircle2, LockKeyhole, Mail, UserPlus } from "lucide-react";

export function AuthPanel() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="rail-card rounded-lg p-5 md:p-7">
      <div className="mb-6 flex rounded-md border border-white/10 bg-ink/55 p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setSubmitted(false);
          }}
          className={`focus-ring min-h-10 flex-1 rounded px-4 text-sm font-semibold transition ${
            mode === "login" ? "bg-railGold text-ink" : "text-zinc-300 hover:text-white"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("register");
            setSubmitted(false);
          }}
          className={`focus-ring min-h-10 flex-1 rounded px-4 text-sm font-semibold transition ${
            mode === "register" ? "bg-railGold text-ink" : "text-zinc-300 hover:text-white"
          }`}
        >
          Register
        </button>
      </div>

      <div className="mb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-md border border-railGold/25 bg-railGold/10 text-railGold">
          {mode === "login" ? <LockKeyhole className="h-5 w-5" aria-hidden /> : <UserPlus className="h-5 w-5" aria-hidden />}
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-white">{mode === "login" ? "Sign in to RAIL" : "Create your RAIL account"}</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {mode === "login"
            ? "Access saved assets, notes, alerts, and account preferences once authentication is connected."
            : "Register for future watchlists, research notes, update alerts, and account-level settings."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" ? (
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Full name</span>
            <input className="input" name="name" placeholder="Jane Analyst" autoComplete="name" />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Email</span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-zinc-500" aria-hidden />
            <input className="input pl-10" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Password</span>
          <input
            className="input"
            name="password"
            type="password"
            placeholder={mode === "login" ? "Enter password" : "Create password"}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
        </label>

        {mode === "register" ? (
          <label className="flex items-start gap-3 rounded-md border border-white/10 bg-ink/45 p-3 text-sm leading-6 text-zinc-300">
            <input type="checkbox" className="mt-1" required />
            <span>I understand RAIL provides research tools and educational information only, not investment, legal, tax, brokerage, custody, or securities services.</span>
          </label>
        ) : null}

        <button
          type="submit"
          className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-md border border-railGold bg-railGold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-railGoldSoft"
        >
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      {submitted ? (
        <div className="mt-5 flex gap-3 rounded-md border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-200">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>This MVP has captured the interaction locally. Connect an auth provider before enabling production account access.</p>
        </div>
      ) : null}
    </section>
  );
}
