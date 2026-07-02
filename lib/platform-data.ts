import { assets, categories } from "./mock-data";

export type PlatformProfile = {
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

export const platformProfiles: PlatformProfile[] = [
  {
    name: "RealT",
    slug: "realt",
    description: "Tokenized real estate marketplace focused on fractional property interests and rental-income reporting.",
    logo: "R",
    website: "https://realt.co",
    headquarters: "Boca Raton, Florida",
    yearFounded: 2019,
    regulatoryInformation: "Platform disclosures and jurisdiction-specific investor eligibility should be reviewed before relying on any listing.",
    supportedBlockchains: ["Gnosis", "Ethereum"],
    assetCategories: ["Tokenized Real Estate"],
    assetsUnderManagement: null,
    listedAssets: 430,
    totalTokenizedValue: 108000000,
    averageRiskScore: 58,
    averageTransparencyScore: 72,
    averageLiquidityScore: 49,
    averageSentimentScore: 68,
    marketShare: 9.4,
    recentListings: ["Residential income portfolios", "Single-family rental assets"],
    recentNews: ["Expanded marketplace reporting and property-level disclosures"],
    lastUpdated: "2026-06-28"
  },
  {
    name: "Lofty",
    slug: "lofty",
    description: "Real estate tokenization marketplace with fractional property ownership and investor dashboards.",
    logo: "L",
    website: "https://www.lofty.ai",
    headquarters: "United States",
    yearFounded: 2018,
    regulatoryInformation: "Marketplace disclosures, property documents, and transfer constraints require source-level verification.",
    supportedBlockchains: ["Algorand"],
    assetCategories: ["Tokenized Real Estate"],
    assetsUnderManagement: null,
    listedAssets: 160,
    totalTokenizedValue: 52000000,
    averageRiskScore: 61,
    averageTransparencyScore: 69,
    averageLiquidityScore: 52,
    averageSentimentScore: 65,
    marketShare: 4.5,
    recentListings: ["Residential rentals", "Short-term rental assets"],
    recentNews: ["New property listings and investor reporting updates"],
    lastUpdated: "2026-06-27"
  },
  {
    name: "Superstate USTB",
    slug: "superstate-ustb",
    description: "Institutional tokenized treasury product infrastructure focused on regulated fund access and on-chain transferability.",
    logo: "S",
    website: "https://superstate.co",
    headquarters: "United States",
    yearFounded: 2023,
    regulatoryInformation: "Fund documents, transfer restrictions, and regulatory filings should be treated as primary sources.",
    supportedBlockchains: ["Ethereum"],
    assetCategories: ["Tokenized Treasuries", "Government Securities"],
    assetsUnderManagement: null,
    listedAssets: 1,
    totalTokenizedValue: 91000000,
    averageRiskScore: 34,
    averageTransparencyScore: 86,
    averageLiquidityScore: 63,
    averageSentimentScore: 76,
    marketShare: 7.9,
    recentListings: ["USTB tokenized treasury exposure"],
    recentNews: ["Institutional treasury tokenization continues to expand"],
    lastUpdated: "2026-06-29"
  },
  {
    name: "Ondo Finance",
    slug: "ondo-finance",
    description: "Tokenized fund and treasury product issuer focused on on-chain access to traditional yield-bearing instruments.",
    logo: "O",
    website: "https://ondo.finance",
    headquarters: "United States",
    yearFounded: 2021,
    regulatoryInformation: "Product documentation, fund structure, and jurisdictional eligibility should be verified per product.",
    supportedBlockchains: ["Ethereum", "Polygon", "Arbitrum"],
    assetCategories: ["Tokenized Treasuries", "Money Market Funds", "Government Securities"],
    assetsUnderManagement: null,
    listedAssets: 3,
    totalTokenizedValue: 430000000,
    averageRiskScore: 39,
    averageTransparencyScore: 82,
    averageLiquidityScore: 69,
    averageSentimentScore: 78,
    marketShare: 37.5,
    recentListings: ["OUSG", "USDY ecosystem updates"],
    recentNews: ["Tokenized treasury products remain a leading RWA category"],
    lastUpdated: "2026-06-29"
  },
  {
    name: "Franklin Templeton Digital Assets",
    slug: "franklin-templeton-digital-assets",
    description: "Institutional asset manager offering blockchain-recorded fund shares and digital asset infrastructure.",
    logo: "F",
    website: "https://www.franklintempleton.com",
    headquarters: "San Mateo, California",
    yearFounded: 1947,
    regulatoryInformation: "SEC filings, fund prospectuses, and official fund disclosures are primary verification sources.",
    supportedBlockchains: ["Stellar", "Polygon"],
    assetCategories: ["Money Market Funds", "Government Securities", "Tokenized Treasuries"],
    assetsUnderManagement: null,
    listedAssets: 1,
    totalTokenizedValue: 380000000,
    averageRiskScore: 28,
    averageTransparencyScore: 91,
    averageLiquidityScore: 71,
    averageSentimentScore: 82,
    marketShare: 33.1,
    recentListings: ["Blockchain-recorded money market fund shares"],
    recentNews: ["Traditional asset managers continue tokenized fund pilots and launches"],
    lastUpdated: "2026-06-30"
  },
  {
    name: "Securitize",
    slug: "securitize",
    description: "Digital securities platform supporting tokenized funds, transfer agents, investor onboarding, and compliant distribution.",
    logo: "S",
    website: "https://securitize.io",
    headquarters: "Miami, Florida",
    yearFounded: 2017,
    regulatoryInformation: "Transfer agent, broker-dealer, ATS, and product-specific disclosures should be reviewed by source.",
    supportedBlockchains: ["Ethereum", "Polygon", "Avalanche"],
    assetCategories: ["Private Equity", "Private Credit", "Tokenized Treasuries", "Other Real World Assets"],
    assetsUnderManagement: null,
    listedAssets: 80,
    totalTokenizedValue: 260000000,
    averageRiskScore: 48,
    averageTransparencyScore: 80,
    averageLiquidityScore: 58,
    averageSentimentScore: 73,
    marketShare: 22.6,
    recentListings: ["Institutional fund tokens", "Private market products"],
    recentNews: ["Digital securities infrastructure remains central to institutional RWA issuance"],
    lastUpdated: "2026-06-28"
  },
  {
    name: "Republic",
    slug: "republic",
    description: "Private market investment platform supporting startup, real estate, gaming, and alternative asset offerings.",
    logo: "R",
    website: "https://republic.com",
    headquarters: "New York, New York",
    yearFounded: 2016,
    regulatoryInformation: "Offerings may involve crowdfunding, Reg D, Reg CF, or other exemptions depending on product structure.",
    supportedBlockchains: ["Ethereum", "Avalanche"],
    assetCategories: ["Private Equity", "Entertainment Royalties", "Sports Assets", "Other Real World Assets"],
    assetsUnderManagement: null,
    listedAssets: 120,
    totalTokenizedValue: 145000000,
    averageRiskScore: 67,
    averageTransparencyScore: 65,
    averageLiquidityScore: 42,
    averageSentimentScore: 66,
    marketShare: 12.6,
    recentListings: ["Private company campaigns", "Entertainment and gaming offerings"],
    recentNews: ["Private market access platforms broaden alternative investment categories"],
    lastUpdated: "2026-06-26"
  },
  {
    name: "RWA.xyz",
    slug: "rwa-xyz",
    description: "Market intelligence and analytics source tracking tokenized real-world asset products and on-chain activity.",
    logo: "R",
    website: "https://rwa.xyz",
    headquarters: "Market data provider",
    yearFounded: null,
    regulatoryInformation: "Analytics source; use alongside issuer, chain, and regulatory sources for verification.",
    supportedBlockchains: ["Ethereum", "Polygon", "Arbitrum", "Base"],
    assetCategories: categories,
    assetsUnderManagement: null,
    listedAssets: 1000,
    totalTokenizedValue: 1200000000,
    averageRiskScore: 50,
    averageTransparencyScore: 74,
    averageLiquidityScore: 60,
    averageSentimentScore: 72,
    marketShare: 100,
    recentListings: ["RWA market intelligence index"],
    recentNews: ["RWA data infrastructure is becoming a core market layer"],
    lastUpdated: "2026-06-30"
  }
];

export function getPlatformBySlug(slug: string) {
  return platformProfiles.find((platform) => platform.slug === slug);
}

export function platformAssets(platformName: string) {
  return assets.filter((asset) => asset.platform === platformName);
}

export function platformMetrics() {
  return {
    totalPlatforms: platformProfiles.length,
    totalTokenizedValue: platformProfiles.reduce((sum, platform) => sum + platform.totalTokenizedValue, 0),
    averageRisk: Math.round(platformProfiles.reduce((sum, platform) => sum + platform.averageRiskScore, 0) / platformProfiles.length),
    averageTransparency: Math.round(platformProfiles.reduce((sum, platform) => sum + platform.averageTransparencyScore, 0) / platformProfiles.length)
  };
}
