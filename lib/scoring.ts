import type { RailAsset } from "./mock-data";

export type ScoreExplanation = {
  value: number;
  rating: "Low" | "Moderate" | "High" | "Very High";
  explanation: string;
  factors: string[];
};

export function ratingForScore(value: number, inverse = false): ScoreExplanation["rating"] {
  const score = inverse ? 100 - value : value;
  if (score >= 80) return "Very High";
  if (score >= 65) return "High";
  if (score >= 45) return "Moderate";
  return "Low";
}

export function explainRiskScore(asset: RailAsset): ScoreExplanation {
  return {
    value: asset.riskScore,
    rating: ratingForScore(asset.riskScore),
    explanation: "Risk score combines liquidity, market, issuer, and regulatory factors using explicitly listed inputs.",
    factors: asset.riskFactors
  };
}

export function explainTransparencyScore(asset: RailAsset): ScoreExplanation {
  const factors = [
    `${asset.dataSources.length} listed data sources`,
    `${asset.documents.length} supporting documents`,
    asset.contractAddress ? "Token contract reference present" : "Token contract reference incomplete"
  ];
  return {
    value: asset.transparencyScore,
    rating: ratingForScore(asset.transparencyScore),
    explanation: "Transparency score reflects source availability, document coverage, token data, and reporting detail.",
    factors
  };
}

export function explainLiquidityScore(asset: RailAsset): ScoreExplanation {
  const liquidityValue = asset.liquidityRating === "HIGH" ? 82 : asset.liquidityRating === "MODERATE" ? 58 : asset.liquidityRating === "LOW" ? 34 : 18;
  return {
    value: liquidityValue,
    rating: ratingForScore(liquidityValue),
    explanation: "Liquidity score is derived from transferability, marketplace availability, and stated liquidity rating.",
    factors: [asset.liquidityRating, asset.transferability, "Secondary-market depth should be independently verified"]
  };
}

export function explainSentimentScore(asset: RailAsset): ScoreExplanation {
  return {
    value: asset.sentimentScore,
    rating: ratingForScore(asset.sentimentScore),
    explanation: asset.sentimentSummary,
    factors: asset.newsMentions.map((mention) => `${mention.publisher}: ${mention.title}`)
  };
}

export function calculateDataConfidence(asset: RailAsset): ScoreExplanation & { lastVerified: string; officialSources: string[]; supportingSources: string[] } {
  const officialSources = asset.dataSources.filter((source) => /issuer|platform|trustee|servicer/i.test(source.type)).map((source) => source.name);
  const supportingSources = asset.dataSources.filter((source) => !officialSources.includes(source.name)).map((source) => source.name);
  const sourceScore = Math.min(30, asset.dataSources.length * 10);
  const documentScore = Math.min(20, asset.documents.length * 7);
  const chainScore = asset.contractAddress ? 15 : 0;
  const freshnessScore = Date.parse(asset.lastUpdated) >= Date.parse("2026-06-01") ? 15 : 5;
  const completenessScore = asset.description && asset.expectedYield !== null && asset.riskScore ? 20 : 10;
  const value = Math.min(100, sourceScore + documentScore + chainScore + freshnessScore + completenessScore);

  return {
    value,
    rating: ratingForScore(value),
    explanation: "Data confidence measures source quality, chain references, document coverage, freshness, completeness, and conflict risk.",
    factors: [
      officialSources.length ? "Official source present" : "No official source identified",
      asset.contractAddress ? "Blockchain contract reference present" : "Blockchain contract reference missing",
      `${asset.documents.length} document references`,
      `Last updated ${asset.lastUpdated}`,
      "No automated conflict checks active yet"
    ],
    lastVerified: asset.lastUpdated,
    officialSources,
    supportingSources
  };
}
