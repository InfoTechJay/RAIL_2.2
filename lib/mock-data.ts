export type LiquidityRating = "LOW" | "MODERATE" | "HIGH" | "LOCKED";
export type InvestorEligibility = "RETAIL" | "ACCREDITED" | "QUALIFIED_PURCHASER" | "INSTITUTIONAL";
export type AssetStatus = "ACTIVE" | "FUNDING" | "CLOSED" | "PAUSED" | "MATURED";

export type RailAsset = {
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
  launchDate: string;
  lastUpdated: string;
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
  }[];
  newsMentions: {
    title: string;
    publisher: string;
    sentiment: number;
    publishedAt: string;
  }[];
};

export const categories = [
  "Tokenized Real Estate",
  "Tokenized Treasuries",
  "Money Market Funds",
  "Private Equity",
  "Private Credit",
  "Entertainment Royalties",
  "Music Rights",
  "Film Rights",
  "Sports Assets",
  "Infrastructure",
  "Agriculture",
  "Carbon Credits",
  "Commodities",
  "Art & Collectibles",
  "Public Equities",
  "Government Securities",
  "Other Real World Assets",
  "Tokenized Private Company",
  "Entertainment Royalty",
  "Farmland"
];

export const platforms = [
  "RealT",
  "Lofty",
  "Superstate USTB",
  "Ondo Finance",
  "Franklin Templeton Digital Assets",
  "BlackRock BUIDL",
  "Securitize",
  "Republic",
  "DigiShares",
  "RedSwan",
  "Tokeny",
  "INX",
  "tZERO",
  "Propy",
  "Binaryx",
  "HoneyBricks",
  "Harbor Ledger",
  "CapTableX",
  "RoyaltyVault",
  "AgriToken Markets",
  "CreditRail"
];
export const blockchains = ["Ethereum", "Polygon", "Avalanche", "Stellar", "Arbitrum", "Base", "Solana", "XRPL", "Gnosis", "Algorand"];

export const assets: RailAsset[] = [
  {
    id: "asset-1",
    name: "Austin Multifamily Income Fund",
    slug: "austin-multifamily-income-fund",
    category: "Tokenized Real Estate",
    platform: "Harbor Ledger",
    description:
      "A tokenized fractional interest in a stabilized multifamily portfolio in Austin, Texas, focused on rental income, occupancy stability, and periodic reporting.",
    location: "Austin, Texas",
    jurisdiction: "United States",
    industry: "Residential real estate",
    assetType: "Income-producing property",
    blockchain: "Polygon",
    tokenSymbol: "AMIF",
    contractAddress: "0x7a14...92c1",
    offeringSize: 18500000,
    minimumInvestment: 5000,
    expectedYield: 7.2,
    historicalYield: 6.8,
    status: "ACTIVE",
    investorEligibility: "ACCREDITED",
    liquidityRating: "MODERATE",
    riskScore: 46,
    sentimentScore: 72,
    transparencyScore: 84,
    launchDate: "2024-10-14",
    lastUpdated: "2026-06-18",
    disclosedAssetValue: 22400000,
    tokenStandard: "ERC-3643",
    totalSupply: 1850000,
    transferability: "KYC-gated secondary transfers",
    riskFactors: ["Regional rent pressure", "Interest-rate sensitivity", "Secondary market depth"],
    riskBreakdown: { liquidity: 58, market: 42, issuer: 36, regulatory: 48 },
    sentimentSummary: "Positive coverage around occupancy, tempered by sensitivity to multifamily financing conditions.",
    outlook: "Stable income profile if occupancy remains above underwriting and refinancing spreads narrow.",
    documents: ["Offering memorandum", "Quarterly occupancy report", "Property valuation summary"],
    dataSources: [
      { name: "Issuer quarterly report", type: "Issuer disclosure", reliability: 86, lastChecked: "2026-06-18" },
      { name: "County property records", type: "Public registry", reliability: 78, lastChecked: "2026-06-15" }
    ],
    newsMentions: [
      { title: "Tokenized real estate platforms add income reporting tools", publisher: "Private Markets Review", sentiment: 68, publishedAt: "2026-06-02" }
    ]
  },
  {
    id: "asset-2",
    name: "Nova Robotics Series B SPV",
    slug: "nova-robotics-series-b-spv",
    category: "Tokenized Private Company",
    platform: "CapTableX",
    description:
      "A digital security representing interests in a special purpose vehicle with exposure to a late-stage industrial automation company.",
    location: "Boston, Massachusetts",
    jurisdiction: "United States",
    industry: "Industrial automation",
    assetType: "Private company SPV",
    blockchain: "Ethereum",
    tokenSymbol: "NOVA-B",
    contractAddress: "0x31de...bb71",
    offeringSize: 42000000,
    minimumInvestment: 25000,
    expectedYield: 0,
    historicalYield: null,
    status: "CLOSED",
    investorEligibility: "QUALIFIED_PURCHASER",
    liquidityRating: "LOW",
    riskScore: 78,
    sentimentScore: 64,
    transparencyScore: 61,
    launchDate: "2025-03-03",
    lastUpdated: "2026-06-11",
    disclosedAssetValue: 42000000,
    tokenStandard: "ERC-1400",
    totalSupply: 420000,
    transferability: "Issuer-approved transfers only",
    riskFactors: ["No operating cash yield", "Private valuation uncertainty", "Concentrated company exposure"],
    riskBreakdown: { liquidity: 86, market: 74, issuer: 68, regulatory: 62 },
    sentimentSummary: "Mixed but improving sentiment after new enterprise contracts, with valuation scrutiny still elevated.",
    outlook: "Upside depends on revenue quality, future financing terms, and eventual exit opportunities.",
    documents: ["SPV operating agreement", "Risk factor supplement", "Investor update memo"],
    dataSources: [
      { name: "SPV administrator update", type: "Issuer disclosure", reliability: 74, lastChecked: "2026-06-11" },
      { name: "Private company news scan", type: "News aggregation", reliability: 62, lastChecked: "2026-06-09" }
    ],
    newsMentions: [
      { title: "Industrial automation startup expands logistics deployment", publisher: "Automation Market Daily", sentiment: 73, publishedAt: "2026-05-22" }
    ]
  },
  {
    id: "asset-3",
    name: "Indie Film Royalty Pool 2026",
    slug: "indie-film-royalty-pool-2026",
    category: "Entertainment Royalty",
    platform: "RoyaltyVault",
    description:
      "A tokenized royalty stream tied to a diversified slate of independent film distribution agreements and streaming revenue participation.",
    location: "Los Angeles, California",
    jurisdiction: "United States",
    industry: "Entertainment",
    assetType: "Royalty participation",
    blockchain: "Stellar",
    tokenSymbol: "IFRP",
    contractAddress: "GB5J...A2RQ",
    offeringSize: 6400000,
    minimumInvestment: 1000,
    expectedYield: 9.4,
    historicalYield: 8.1,
    status: "FUNDING",
    investorEligibility: "RETAIL",
    liquidityRating: "LOW",
    riskScore: 69,
    sentimentScore: 58,
    transparencyScore: 66,
    launchDate: "2026-04-20",
    lastUpdated: "2026-06-20",
    disclosedAssetValue: 6400000,
    tokenStandard: "Stellar asset",
    totalSupply: 640000,
    transferability: "Platform marketplace only",
    riskFactors: ["Revenue volatility", "Distributor reporting lag", "Audience demand concentration"],
    riskBreakdown: { liquidity: 80, market: 72, issuer: 56, regulatory: 50 },
    sentimentSummary: "Moderate sentiment with attention on the distribution partners and limited historical data.",
    outlook: "Performance will likely vary by release cadence, streaming placement, and collection transparency.",
    documents: ["Royalty waterfall summary", "Distribution contract abstract", "Monthly revenue methodology"],
    dataSources: [
      { name: "Platform royalty report", type: "Platform data", reliability: 72, lastChecked: "2026-06-20" },
      { name: "Distributor statement sample", type: "Third-party document", reliability: 64, lastChecked: "2026-06-12" }
    ],
    newsMentions: [
      { title: "Alternative royalty products attract smaller investors", publisher: "Alt Asset Ledger", sentiment: 59, publishedAt: "2026-06-13" }
    ]
  },
  {
    id: "asset-4",
    name: "Delta Valley Farmland Note",
    slug: "delta-valley-farmland-note",
    category: "Farmland",
    platform: "AgriToken Markets",
    description:
      "A tokenized note supported by leased row-crop farmland with indexed lease escalators, crop insurance monitoring, and annual land valuation reviews.",
    location: "Mississippi Delta",
    jurisdiction: "United States",
    industry: "Agriculture",
    assetType: "Asset-backed note",
    blockchain: "Avalanche",
    tokenSymbol: "DVFN",
    contractAddress: "0xaf02...56ed",
    offeringSize: 11200000,
    minimumInvestment: 2500,
    expectedYield: 6.5,
    historicalYield: 6.2,
    status: "ACTIVE",
    investorEligibility: "ACCREDITED",
    liquidityRating: "MODERATE",
    riskScore: 54,
    sentimentScore: 67,
    transparencyScore: 79,
    launchDate: "2025-09-08",
    lastUpdated: "2026-06-17",
    disclosedAssetValue: 12800000,
    tokenStandard: "ERC-3643",
    totalSupply: 1120000,
    transferability: "Whitelisted transfers",
    riskFactors: ["Weather exposure", "Commodity-linked tenant health", "Valuation frequency"],
    riskBreakdown: { liquidity: 55, market: 58, issuer: 42, regulatory: 46 },
    sentimentSummary: "Generally positive due to steady lease coverage and conservative leverage.",
    outlook: "Expected to remain defensive if lease collections and insurance coverage stay on plan.",
    documents: ["Farm appraisal digest", "Lease coverage report", "Collateral monitoring policy"],
    dataSources: [
      { name: "USDA regional data", type: "Public dataset", reliability: 81, lastChecked: "2026-06-16" },
      { name: "Collateral trustee report", type: "Trustee disclosure", reliability: 83, lastChecked: "2026-06-17" }
    ],
    newsMentions: [
      { title: "Farmland income products gain attention during rate uncertainty", publisher: "Real Asset Monitor", sentiment: 66, publishedAt: "2026-05-30" }
    ]
  },
  {
    id: "asset-5",
    name: "SMB Revenue Finance 2025-2",
    slug: "smb-revenue-finance-2025-2",
    category: "Private Credit",
    platform: "CreditRail",
    description:
      "A tokenized private credit pool financing short-duration revenue-based advances to diversified small and midsize businesses.",
    location: "United States",
    jurisdiction: "United States",
    industry: "Private credit",
    assetType: "Credit pool",
    blockchain: "Polygon",
    tokenSymbol: "SMB25",
    contractAddress: "0x87f1...c334",
    offeringSize: 26000000,
    minimumInvestment: 10000,
    expectedYield: 11.1,
    historicalYield: 10.6,
    status: "ACTIVE",
    investorEligibility: "ACCREDITED",
    liquidityRating: "LOW",
    riskScore: 72,
    sentimentScore: 55,
    transparencyScore: 70,
    launchDate: "2025-12-01",
    lastUpdated: "2026-06-21",
    disclosedAssetValue: 24800000,
    tokenStandard: "ERC-1400",
    totalSupply: 260000,
    transferability: "Restricted secondary transfers",
    riskFactors: ["Borrower default rate", "Macroeconomic sensitivity", "Servicer performance"],
    riskBreakdown: { liquidity: 76, market: 68, issuer: 70, regulatory: 52 },
    sentimentSummary: "Cautious sentiment as yield remains attractive but delinquencies require close tracking.",
    outlook: "Risk-adjusted returns depend on loss reserves, borrower diversification, and servicer transparency.",
    documents: ["Borrowing base certificate", "Servicer report", "Pool stratification tape"],
    dataSources: [
      { name: "Servicer monthly tape", type: "Servicer data", reliability: 76, lastChecked: "2026-06-21" },
      { name: "Trust account summary", type: "Custodial statement", reliability: 80, lastChecked: "2026-06-18" }
    ],
    newsMentions: [
      { title: "Private credit tokenization tests investor demand for shorter duration pools", publisher: "Credit Markets Desk", sentiment: 54, publishedAt: "2026-06-04" }
    ]
  }
];

export const educationArticles = [
  {
    title: "What are RWAs?",
    summary: "A plain-English overview of real-world assets represented through digital records, tokens, transfer agents, or blockchain infrastructure.",
    readTime: "7 min"
  },
  {
    title: "Tokenized Real Estate",
    summary: "How property interests, rental income streams, transfer restrictions, disclosures, and property documents can be represented digitally.",
    readTime: "6 min"
  },
  {
    title: "Tokenized Treasuries",
    summary: "How treasury-backed and money market fund products are structured, verified, and compared across tokenized fund platforms.",
    readTime: "8 min"
  },
  {
    title: "Security Tokens",
    summary: "A research primer on regulated digital securities, compliance controls, transfer rules, and investor eligibility checks.",
    readTime: "9 min"
  },
  {
    title: "Smart Contracts",
    summary: "What smart contracts can and cannot verify, and why contract data should be paired with issuer, platform, and regulatory sources.",
    readTime: "10 min"
  },
  {
    title: "Investment Risks",
    summary: "A neutral overview of market, issuer, liquidity, regulatory, operational, and valuation risks in tokenized asset research.",
    readTime: "5 min"
  },
  {
    title: "Liquidity Risk",
    summary: "Why an asset can have a token and still be difficult to sell, transfer, value, or exit under stressed market conditions.",
    readTime: "8 min"
  },
  {
    title: "Platform Risk",
    summary: "How to evaluate issuer, marketplace, custody, transfer agent, reporting, compliance, and operational dependencies.",
    readTime: "7 min"
  },
  {
    title: "How RAIL Scores Assets",
    summary: "How RAIL's placeholder scoring engines use explainable factors for risk, transparency, liquidity, sentiment, and confidence.",
    readTime: "9 min"
  },
  {
    title: "How Data is Verified",
    summary: "How official issuer sources, blockchain explorers, regulatory filings, supporting sources, freshness, and conflicts affect trust.",
    readTime: "9 min"
  }
];

export function getAssetBySlug(slug: string) {
  return assets.find((asset) => asset.slug === slug);
}

export function dashboardMetrics() {
  const totalValue = assets.reduce((sum, asset) => sum + asset.disclosedAssetValue, 0);
  const averageYield = assets.reduce((sum, asset) => sum + asset.expectedYield, 0) / assets.length;
  return {
    totalAssets: assets.length,
    totalValue,
    averageYield,
    activeAssets: assets.filter((asset) => asset.status === "ACTIVE").length
  };
}

export const categoryBreakdown = categories
  .map((category) => ({
    name: category.replace("Tokenized ", ""),
    value: assets.filter((asset) => asset.category === category).length
  }))
  .filter((category) => category.value > 0);

export const yieldByCategory = categories
  .map((category) => {
    const categoryAssets = assets.filter((asset) => asset.category === category);
    const average = categoryAssets.reduce((sum, asset) => sum + asset.expectedYield, 0) / categoryAssets.length;
    return {
      category: category.replace("Tokenized ", "").replace("Entertainment ", "Entertainment"),
      yield: Number.isFinite(average) ? Number(average.toFixed(1)) : 0,
      count: categoryAssets.length
    };
  })
  .filter((category) => category.count > 0)
  .map(({ count, ...category }) => category);

export const topPlatforms = platforms
  .map((platform) => ({
    platform,
    assets: assets.filter((asset) => asset.platform === platform).length,
    value: assets.filter((asset) => asset.platform === platform).reduce((sum, asset) => sum + asset.disclosedAssetValue, 0)
  }))
  .filter((platform) => platform.assets > 0);
