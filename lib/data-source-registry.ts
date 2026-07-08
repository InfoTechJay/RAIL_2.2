export type DataSourceRecord = {
  name: string;
  slug: string;
  sourceType: "Official Issuer" | "Official Marketplace" | "Blockchain Explorer" | "Regulatory" | "Market Data" | "Analytics" | "News" | "Community" | "Manual Research";
  website: string;
  apiUrl?: string;
  trustLevel: "High" | "Medium" | "Low";
  updateFrequency: "Real-time" | "Daily" | "Weekly" | "Monthly" | "Manual";
  active: boolean;
  lastSync: string;
  notes: string;
  primaryAssetTypes: string[];
  supportedBlockchains: string[];
  updateSchedule: string;
};

type DataSourceSeed = [
  name: string,
  sourceType: DataSourceRecord["sourceType"],
  website: string,
  trustLevel: DataSourceRecord["trustLevel"],
  primaryAssetTypes: string[],
  supportedBlockchains: string[],
  updateFrequency: DataSourceRecord["updateFrequency"]
];

const dataSourceSeeds: DataSourceSeed[] = [
  ["RealT", "Official Marketplace", "https://realt.co", "High", ["Tokenized Real Estate"], ["Ethereum", "Gnosis"], "Daily"],
  ["Lofty Marketplace", "Official Marketplace", "https://www.lofty.ai", "High", ["Tokenized Real Estate"], ["Algorand"], "Daily"],
  ["Republic", "Official Marketplace", "https://republic.com", "High", ["Private Equity", "Entertainment Royalties"], ["Ethereum", "Avalanche"], "Weekly"],
  ["DigiShares", "Official Marketplace", "https://digishares.io", "Medium", ["Tokenized Real Estate", "Private Markets"], ["Ethereum", "Polygon"], "Weekly"],
  ["Superstate USTB", "Official Issuer", "https://superstate.co", "High", ["Tokenized Treasuries"], ["Ethereum"], "Daily"],
  ["Ondo OUSG", "Official Issuer", "https://ondo.finance", "High", ["Tokenized Treasuries", "Government Securities"], ["Ethereum", "Polygon"], "Daily"],
  ["Franklin Templeton Digital Assets", "Official Issuer", "https://www.franklintempleton.com", "High", ["Money Market Funds", "Government Securities"], ["Stellar", "Polygon"], "Daily"],
  ["BlackRock BUIDL", "Official Issuer", "https://www.blackrock.com", "High", ["Tokenized Treasuries", "Money Market Funds"], ["Ethereum"], "Daily"],
  ["Securitize", "Official Marketplace", "https://securitize.io", "High", ["Private Equity", "Private Credit", "Tokenized Treasuries"], ["Ethereum", "Polygon", "Avalanche"], "Daily"],
  ["tZERO", "Official Marketplace", "https://www.tzero.com", "Medium", ["Private Equity", "Security Tokens"], ["Ethereum"], "Weekly"],
  ["INX", "Official Marketplace", "https://www.inx.co", "Medium", ["Private Equity", "Security Tokens"], ["Ethereum"], "Weekly"],
  ["Tokeny", "Official Marketplace", "https://tokeny.com", "Medium", ["Security Tokens", "Other Real World Assets"], ["Ethereum", "Polygon"], "Weekly"],
  ["RedSwan", "Official Marketplace", "https://redswan.io", "Medium", ["Tokenized Real Estate"], ["Ethereum"], "Weekly"],
  ["RWA.xyz", "Analytics", "https://rwa.xyz", "High", ["Market Intelligence"], ["Ethereum", "Polygon", "Arbitrum", "Base"], "Daily"],
  ["Etherscan", "Blockchain Explorer", "https://etherscan.io", "High", ["On-chain Verification"], ["Ethereum"], "Real-time"],
  ["PolygonScan", "Blockchain Explorer", "https://polygonscan.com", "High", ["On-chain Verification"], ["Polygon"], "Real-time"],
  ["Arbiscan", "Blockchain Explorer", "https://arbiscan.io", "High", ["On-chain Verification"], ["Arbitrum"], "Real-time"],
  ["Basescan", "Blockchain Explorer", "https://basescan.org", "High", ["On-chain Verification"], ["Base"], "Real-time"],
  ["Solscan", "Blockchain Explorer", "https://solscan.io", "High", ["On-chain Verification"], ["Solana"], "Real-time"],
  ["XRPL Explorer", "Blockchain Explorer", "https://livenet.xrpl.org", "Medium", ["On-chain Verification"], ["XRPL"], "Real-time"],
  ["Stellar Expert", "Blockchain Explorer", "https://stellar.expert", "High", ["On-chain Verification"], ["Stellar"], "Real-time"],
  ["SEC EDGAR", "Regulatory", "https://www.sec.gov/edgar", "High", ["Regulatory Filings"], ["N/A"], "Daily"],
  ["Reuters", "News", "https://www.reuters.com", "Medium", ["News"], ["N/A"], "Daily"],
  ["Bloomberg", "Market Data", "https://www.bloomberg.com", "Medium", ["Market Data", "News"], ["N/A"], "Daily"],
  ["CoinDesk", "News", "https://www.coindesk.com", "Medium", ["News"], ["N/A"], "Daily"],
  ["The Block", "News", "https://www.theblock.co", "Medium", ["News"], ["N/A"], "Daily"],
  ["Blockworks", "News", "https://blockworks.co", "Medium", ["News"], ["N/A"], "Daily"]
];

const apiUrls: Record<string, string> = {
  "rwa-xyz": "https://api.rwa.xyz/v4/assets"
};

export const dataSources: DataSourceRecord[] = dataSourceSeeds.map(([name, sourceType, website, trustLevel, primaryAssetTypes, supportedBlockchains, updateFrequency]) => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  sourceType,
  website,
  apiUrl: apiUrls[name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")],
  trustLevel,
  updateFrequency,
  active: true,
  lastSync: "2026-06-30",
  notes: "Seeded source registry entry. Connector integration pending.",
  primaryAssetTypes,
  supportedBlockchains,
  updateSchedule: updateFrequency === "Real-time" ? "Continuous explorer checks" : `${updateFrequency} sync review`
}));
