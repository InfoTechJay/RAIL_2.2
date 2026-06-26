export function formatCurrency(value: number, compact = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0
  }).format(value);
}

export function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined) return "N/A";
  return `${value.toFixed(1)}%`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function scoreTone(score: number, inverse = false) {
  const normalized = inverse ? 100 - score : score;
  if (normalized >= 75) return "text-emerald-300 bg-emerald-400/10 border-emerald-300/20";
  if (normalized >= 50) return "text-amber-200 bg-amber-400/10 border-amber-300/20";
  return "text-red-200 bg-red-400/10 border-red-300/20";
}
