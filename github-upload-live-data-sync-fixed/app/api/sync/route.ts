import type { NextRequest } from "next/server";
import { getDataReadiness } from "@/lib/live-data";
import { runLiveSync } from "@/lib/ingestion/live-sync";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret && process.env.NODE_ENV !== "production") return true;
  if (!cronSecret) return false;

  const authHeader = request.headers.get("authorization");
  const querySecret = request.nextUrl.searchParams.get("secret");
  return authHeader === `Bearer ${cronSecret}` || querySecret === cronSecret;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return Response.json({ ok: false, error: "Unauthorized sync request" }, { status: 401 });
  }

  const result = await runLiveSync();
  const readiness = await getDataReadiness();
  return Response.json({ ok: true, result, readiness });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
