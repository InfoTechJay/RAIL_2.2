import type { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export type LiquidityRating = "LOW" | "MODERATE" | "HIGH" | "LOCKED";
export type InvestorEligibility = "RETAIL" | "ACCREDITED" | "QUALIFIED_PURCHASER" | "INSTITUTIONAL";
export type AssetStatus = "ACTIVE" | "FUNDING" | "CLOSED" | "PAUSED" | "MATURED";

export type LiveAsset = {
  id: string;
  name: string;
  slug: string;
  category: string;
  platform: string;
  description: string;
  location: string;
  jurisdiction: string;
  industry: string;
  assetType: string;
  blockchain: string;
  tokenSymbol: string;
  contractAddress: string;
  offeringSize: number;
  minimumInvestment: number;
  expectedYield: number;
  historicalYield: number | null;
  status: AssetStatus;
  investorEligibility: InvestorEligibility;
  liquidityRating: LiquidityRating;
  riskScore: number;
  sentimentScore: number;
  transparencyScore: number;
  liquidityScore: number;
  dataConfidenceScore: number;
  confidenceLevel: string;
  confidenceReasons: string[];
  officialSources: string[];
  supportingSources: string[];
  blockchainVerification: string;
  platformVerification: string;
  regulatoryInformation: string;
  launchDate: string;
  lastUpdated: string;
  lastVerified: string;
  disclosedAssetValue: number;
  tokenStandard: string;
  totalSupply: number;
  transferability: string;
  riskFactors: string[];
  riskBreakdown: {
    liquidity: number;
    market: number;
    issuer: number;
    regulatory: number;
  };
  sentimentSummary: string;
  outlook: string;
  documents: string[];
  dataSources: {
    name: string;
    type: string;
    reliability: number;
    lastChecked: string;
    website: string;
  }[];
  newsMentions: {
    title: string;
    publisher: string;
    sentiment: number;
    publishedAt: string;
  }[];
  scoreExplanations: {
    scoreType: string;
    value: number;
    rating: string;
    explanation: string;
    factors: string[];
  }[];
};

export type LivePlatform = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website: string;
  headquarters: string;
  yearFounded: number | null;
  regulatoryInformation: string;
  supportedBlockchains: string[];
  assetCategories: string[];
  assetsUnderManagement: number | null;
  listedAssets: number;
  totalTokenizedValue: number;
  averageRiskScore: number;
  averageTransparencyScore: number;
  averageLiquidityScore: number;
  averageSentimentScore: number;
  marketShare: number;
  recentListings: string[];
  recentNews: string[];
  lastUpdated: string;
};

export type LiveDataSource = {
  id: string;
  name: string;
  slug: string;
  sourceType: string;
  website: string;
  apiUrl: string;
  trustLevel: string;
  updateFrequency: string;
  active: boolean;
  primaryAssetTypes: string[];
  supportedBlockchains: string[];
  updateSchedule: string;
  reliability: number;
  lastChecked: string;
  lastSync: string;
  notes: string;
};

type AssetWithRelations = Prisma.AssetGetPayload<{
  include: {
    category: true;
    platform: true;
    blockchain: true;
    token: true;
    financialData: true;
    riskScores: true;
    sentimentScores: true;
    dataSources: true;
    newsMentions: true;
    scoreExplanations: true;
  };
}>;

type PlatformWithAssets = Prisma.PlatformGetPayload<{
  include: {
    assets: {
      include: {
        financialData: true;
      };
    };
  };
}>;

const fallbackCategories = [
  "Tokenized Real Estate",
  "Tokenized Treasuries",
  "Money Market Funds",
  "Private Equity",
  "Private Credit",
  "Entertainment Royalties",
  "Agriculture",
  "Other Real World Assets"
];

function dataErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown database error";
}

function logDataError(scope: string, error: unknown) {
  console.error(`[RAIL data] ${scope}: ${dataErrorMessage(error)}`);
}

function toNumber(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toDateString(value: Date | null | undefined) {
  return value ? value.toISOString() : new Date(0).toISOString();
}

export function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return value
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function latestByDate<T>(items: T[], getDate: (item: T) => Date) {
  return [...items].sort((a, b) => getDate(b).getTime() - getDate(a).getTime())[0];
}

function mapAsset(asset: AssetWithRelations): LiveAsset {
  const risk = latestByDate(asset.riskScores, (item) => item.assessedAt);
  const sentiment = latestByDate(asset.sentimentScores, (item) => item.calculatedAt);
  const token = asset.token;
  const financial = asset.financialData;
  const sourceNames = asset.dataSources.map((source) => source.name);
  const documents = sourceNames.length ? sourceNames : ["Source document review pending"];
  const riskFactors = risk?.notes?.split(";").map((item) => item.trim()).filter(Boolean) ?? ["Risk factor review pending"];

  return {
    id: asset.id,
    name: asset.name,
    slug: asset.slug,
    category: asset.category.name,
    platform: asset.platform.name,
    description: asset.description,
    location: asset.location ?? "Location pending",
    jurisdiction: asset.jurisdiction ?? "Jurisdiction pending",
    industry: asset.category.name,
    assetType: asset.assetType,
    blockchain: asset.blockchain?.name ?? "Not verified",
    tokenSymbol: asset.tokenSymbol ?? token?.symbol ?? "N/A",
    contractAddress: asset.contractAddress ?? token?.contractAddress ?? "",
    offeringSize: toNumber(asset.offeringSize),
    minimumInvestment: toNumber(asset.minimumInvestment),
    expectedYield: toNumber(asset.expectedYield),
    historicalYield: asset.historicalYield ?? null,
    status: asset.status as AssetStatus,
    investorEligibility: asset.investorEligibility as InvestorEligibility,
    liquidityRating: asset.liquidityRating as LiquidityRating,
    riskScore: asset.riskScore,
    sentimentScore: asset.sentimentScore,
    transparencyScore: asset.transparencyScore,
    liquidityScore: asset.liquidityScore,
    dataConfidenceScore: asset.dataConfidenceScore,
    confidenceLevel: asset.confidenceLevel ?? "Unrated",
    confidenceReasons: parseList(asset.confidenceReasons),
    officialSources: parseList(asset.officialSources),
    supportingSources: parseList(asset.supportingSources),
    blockchainVerification: asset.blockchainVerification ?? "Blockchain verification pending",
    platformVerification: asset.platformVerification ?? "Platform verification pending",
    regulatoryInformation: asset.regulatoryInformation ?? "Regulatory review pending",
    launchDate: toDateString(asset.launchDate),
    lastUpdated: toDateString(asset.lastUpdated),
    lastVerified: toDateString(asset.lastVerified ?? asset.lastUpdated),
    disclosedAssetValue: toNumber(financial?.disclosedAssetValue),
    tokenStandard: token?.tokenStandard ?? "Not verified",
    totalSupply: toNumber(token?.totalSupply),
    transferability: token?.transferability ?? "Transfer rules pending",
    riskFactors,
    riskBreakdown: {
      liquidity: risk?.liquidityRisk ?? asset.liquidityScore,
      market: risk?.marketRisk ?? asset.riskScore,
      issuer: risk?.issuerRisk ?? asset.riskScore,
      regulatory: risk?.regulatoryRisk ?? asset.riskScore
    },
    sentimentSummary: sentiment?.summary ?? "Sentiment source review pending.",
    outlook: "Based on available source disclosures, RAIL tracks this asset for changes in value, source quality, risk factors, and verification status.",
    documents,
    dataSources: asset.dataSources.map((source) => ({
      name: source.name,
      type: source.sourceType,
      reliability: source.reliability,
      lastChecked: toDateString(source.lastChecked),
      website: source.website ?? source.url ?? ""
    })),
    newsMentions: asset.newsMentions.map((mention) => ({
      title: mention.title,
      publisher: mention.publisher,
      sentiment: mention.sentiment,
      publishedAt: toDateString(mention.publishedAt)
    })),
    scoreExplanations: asset.scoreExplanations.map((score) => ({
      scoreType: score.scoreType,
      value: score.value,
      rating: score.rating,
      explanation: score.explanation,
      factors: parseList(score.factors)
    }))
  };
}

function mapPlatform(platform: PlatformWithAssets, totalValue: number): LivePlatform {
  const assetValue = platform.assets.reduce((sum, asset) => sum + toNumber(asset.financialData?.disclosedAssetValue), 0);
  const trackedValue = toNumber(platform.totalTokenizedValue) || assetValue;
  return {
    id: platform.id,
    name: platform.name,
    slug: platform.slug,
    description: platform.description ?? "Platform profile pending.",
    logo: platform.logo ?? platform.name.charAt(0),
    website: platform.website ?? "",
    headquarters: platform.headquarters ?? "Headquarters pending",
    yearFounded: platform.yearFounded,
    regulatoryInformation: platform.regulatoryInformation ?? "Regulatory information pending.",
    supportedBlockchains: parseList(platform.supportedBlockchains),
    assetCategories: parseList(platform.assetCategories),
    assetsUnderManagement: platform.assetsUnderManagement,
    listedAssets: platform.numberOfListedAssets || platform.assets.length,
    totalTokenizedValue: trackedValue,
    averageRiskScore: platform.averageRiskScore,
    averageTransparencyScore: platform.averageTransparencyScore,
    averageLiquidityScore: platform.averageLiquidityScore,
    averageSentimentScore: platform.averageSentimentScore,
    marketShare: totalValue > 0 ? (trackedValue / totalValue) * 100 : 0,
    recentListings: platform.assets.slice(0, 4).map((asset) => asset.name),
    recentNews: parseList(platform.newsFeed),
    lastUpdated: toDateString(platform.lastUpdated ?? platform.updatedAt)
  };
}

export async function getAssets() {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: { lastUpdated: "desc" },
      include: {
        category: true,
        platform: true,
        blockchain: true,
        token: true,
        financialData: true,
        riskScores: true,
        sentimentScores: true,
        dataSources: true,
        newsMentions: true,
        scoreExplanations: true
      }
    });
    return assets.map(mapAsset);
  } catch (error) {
    logDataError("getAssets", error);
    return [];
  }
}

export async function getAssetBySlug(slug: string) {
  try {
    const asset = await prisma.asset.findUnique({
      where: { slug },
      include: {
        category: true,
        platform: true,
        blockchain: true,
        token: true,
        financialData: true,
        riskScores: true,
        sentimentScores: true,
        dataSources: true,
        newsMentions: true,
        scoreExplanations: true
      }
    });
    return asset ? mapAsset(asset) : null;
  } catch (error) {
    logDataError(`getAssetBySlug:${slug}`, error);
    return null;
  }
}

export async function getScreenerOptions() {
  try {
    const [categories, platforms, blockchains] = await Promise.all([
      prisma.category.findMany({ orderBy: { name: "asc" } }),
      prisma.platform.findMany({ orderBy: { name: "asc" } }),
      prisma.blockchain.findMany({ orderBy: { name: "asc" } })
    ]);
    return {
      categories: categories.map((category) => category.name),
      platforms: platforms.map((platform) => platform.name),
      blockchains: blockchains.map((blockchain) => blockchain.name)
    };
  } catch (error) {
    logDataError("getScreenerOptions", error);
    return {
      categories: fallbackCategories,
      platforms: [],
      blockchains: []
    };
  }
}

export async function getPlatforms() {
  try {
    const platforms = await prisma.platform.findMany({
      orderBy: { name: "asc" },
      include: {
        assets: {
          include: {
            financialData: true
          }
        }
      }
    });
    const totalValue = platforms.reduce((sum, platform) => sum + toNumber(platform.totalTokenizedValue), 0);
    return platforms.map((platform) => mapPlatform(platform, totalValue));
  } catch (error) {
    logDataError("getPlatforms", error);
    return [];
  }
}

export async function getPlatformBySlug(slug: string) {
  const platforms = await getPlatforms();
  return platforms.find((platform) => platform.slug === slug) ?? null;
}

export async function getDataSources() {
  try {
    const sources = await prisma.dataSource.findMany({
      where: { assetId: null },
      orderBy: [{ active: "desc" }, { name: "asc" }]
    });
    return sources.map((source) => ({
      id: source.id,
      name: source.name,
      slug: source.slug ?? source.id,
      sourceType: source.sourceType,
      website: source.website ?? "",
      apiUrl: source.apiUrl ?? "",
      trustLevel: source.trustLevel ?? "Unrated",
      updateFrequency: source.updateFrequency ?? "Manual",
      active: source.active,
      primaryAssetTypes: parseList(source.primaryAssetTypes),
      supportedBlockchains: parseList(source.supportedBlockchains),
      updateSchedule: source.updateSchedule ?? "Manual review",
      reliability: source.reliability,
      lastChecked: toDateString(source.lastChecked),
      lastSync: toDateString(source.lastSync),
      notes: source.notes ?? ""
    })) satisfies LiveDataSource[];
  } catch (error) {
    logDataError("getDataSources", error);
    return [];
  }
}

export async function getDashboardData() {
  const [assets, platforms, dataSources] = await Promise.all([getAssets(), getPlatforms(), getDataSources()]);
  const totalValue = assets.reduce((sum, asset) => sum + asset.disclosedAssetValue, 0);
  const averageYield = assets.length ? assets.reduce((sum, asset) => sum + asset.expectedYield, 0) / assets.length : 0;
  const categoryMap = new Map<string, LiveAsset[]>();
  const platformMap = new Map<string, LiveAsset[]>();
  for (const asset of assets) {
    categoryMap.set(asset.category, [...(categoryMap.get(asset.category) ?? []), asset]);
    platformMap.set(asset.platform, [...(platformMap.get(asset.platform) ?? []), asset]);
  }

  return {
    metrics: {
      totalAssets: assets.length,
      totalPlatforms: platforms.length,
      totalValue,
      platformValue: platforms.reduce((sum, platform) => sum + platform.totalTokenizedValue, 0),
      dataSources: dataSources.length,
      averageYield,
      activeAssets: assets.filter((asset) => asset.status === "ACTIVE").length,
      averageTransparency: platforms.length ? Math.round(platforms.reduce((sum, platform) => sum + platform.averageTransparencyScore, 0) / platforms.length) : 0
    },
    categoryBreakdown: [...categoryMap.entries()].map(([name, categoryAssets]) => ({
      name: name.replace("Tokenized ", ""),
      value: categoryAssets.length
    })),
    yieldByCategory: [...categoryMap.entries()].map(([category, categoryAssets]) => ({
      category: category.replace("Tokenized ", ""),
      yield: Number((categoryAssets.reduce((sum, asset) => sum + asset.expectedYield, 0) / categoryAssets.length).toFixed(1))
    })),
    topPlatforms: [...platformMap.entries()].map(([platform, platformAssets]) => ({
      platform,
      assets: platformAssets.length,
      value: platformAssets.reduce((sum, asset) => sum + asset.disclosedAssetValue, 0)
    })),
    riskSentiment: assets.map((asset) => ({
      name: asset.tokenSymbol,
      risk: asset.riskScore,
      sentiment: asset.sentimentScore
    })),
    highestRisk: [...assets].sort((a, b) => b.riskScore - a.riskScore).slice(0, 3),
    recentlyUpdated: [...assets].sort((a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated)).slice(0, 4),
    newListings: [...assets].sort((a, b) => Date.parse(b.launchDate) - Date.parse(a.launchDate)).slice(0, 3),
    confidenceRanked: [...assets].sort((a, b) => b.dataConfidenceScore - a.dataConfidenceScore),
    largestPlatforms: [...platforms].sort((a, b) => b.totalTokenizedValue - a.totalTokenizedValue).slice(0, 3)
  };
}

export async function getDataReadiness() {
  const [assets, sources] = await Promise.all([getAssets(), getDataSources()]);
  let jobs: Awaited<ReturnType<typeof prisma.syncJob.findMany>> = [];
  let databaseError: string | null = null;
  try {
    jobs = await prisma.syncJob.findMany({ orderBy: { startedAt: "desc" }, take: 8 });
  } catch (error) {
    databaseError = dataErrorMessage(error);
    logDataError("getDataReadiness.syncJobs", error);
  }
  const databaseUrl = process.env.DATABASE_URL ?? "";
  const missingApiSources = sources.filter((source) => source.active && !source.apiUrl);
  const inactiveSources = sources.filter((source) => !source.active);
  const missingContractAssets = assets.filter((asset) => !asset.contractAddress);
  const lowConfidenceAssets = assets.filter((asset) => asset.dataConfidenceScore < 70);
  const missingSourceAssets = assets.filter((asset) => asset.dataSources.length < 2);
  const missingValueAssets = assets.filter((asset) => asset.disclosedAssetValue <= 0);
  const missingKeys = [
    sources.some((source) => source.slug === "rwa-xyz" && source.active) && !process.env.RWA_API_KEY ? "RWA_API_KEY" : null,
    !process.env.CRON_SECRET ? "CRON_SECRET" : null
  ].filter(Boolean) as string[];

  return {
    blockers: [
      databaseError ? `Database read failed: ${databaseError}` : null,
      !databaseUrl ? "DATABASE_URL is missing. Configure a persistent production database." : null,
      databaseUrl.startsWith("file:") ? "Production writes need a hosted persistent database; Vercel serverless file storage is not durable." : null,
      missingKeys.length ? `Missing environment variables: ${missingKeys.join(", ")}` : null
    ].filter(Boolean) as string[],
    sourceGaps: {
      missingApiSources,
      inactiveSources
    },
    assetGaps: {
      missingContractAssets,
      lowConfidenceAssets,
      missingSourceAssets,
      missingValueAssets
    },
    syncJobs: jobs.map((job) => ({
      id: job.id,
      connectorId: job.connectorId,
      sourceName: job.sourceName,
      status: job.status,
      startedAt: toDateString(job.startedAt),
      finishedAt: toDateString(job.finishedAt),
      recordsFetched: job.recordsFetched,
      recordsSaved: job.recordsSaved,
      errors: parseList(job.errors)
    }))
  };
}
