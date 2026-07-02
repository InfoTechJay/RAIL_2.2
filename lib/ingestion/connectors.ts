import { BaseConnector, type RawIngestionRecord } from "@/lib/ingestion/base-connector";

class RegistryConnector extends BaseConnector {
  constructor(
    readonly id: string,
    readonly displayName: string,
    readonly sourceType: string,
    private readonly platform: string,
    private readonly category: string
  ) {
    super();
  }

  async fetch(): Promise<RawIngestionRecord[]> {
    return [];
  }

  async normalize(records: RawIngestionRecord[]) {
    return records.map((record, index) => ({
      sourceId: this.id,
      externalId: String(record.id ?? `${this.id}-${index}`),
      name: String(record.name ?? "Unlabeled asset"),
      platform: this.platform,
      category: this.category,
      sourceUrl: typeof record.url === "string" ? record.url : undefined,
      observedAt: new Date().toISOString(),
      payload: record
    }));
  }
}

export const connectorRegistry = [
  new RegistryConnector("realt", "RealT", "Official Marketplace", "RealT", "Tokenized Real Estate"),
  new RegistryConnector("lofty", "Lofty Marketplace", "Official Marketplace", "Lofty", "Tokenized Real Estate"),
  new RegistryConnector("digishares", "DigiShares", "Official Marketplace", "DigiShares", "Tokenized Real Estate"),
  new RegistryConnector("redswan", "RedSwan", "Official Marketplace", "RedSwan", "Tokenized Real Estate"),
  new RegistryConnector("honeybricks", "HoneyBricks", "Official Marketplace", "HoneyBricks", "Tokenized Real Estate"),
  new RegistryConnector("propy", "Propy", "Official Marketplace", "Propy", "Tokenized Real Estate"),
  new RegistryConnector("superstate-ustb", "Superstate USTB", "Official Issuer", "Superstate USTB", "Tokenized Treasuries"),
  new RegistryConnector("ondo-ousg", "Ondo OUSG", "Official Issuer", "Ondo Finance", "Tokenized Treasuries"),
  new RegistryConnector("franklin-templeton", "Franklin Templeton Digital Assets", "Official Issuer", "Franklin Templeton Digital Assets", "Money Market Funds"),
  new RegistryConnector("blackrock-buidl", "BlackRock BUIDL", "Official Issuer", "BlackRock", "Money Market Funds"),
  new RegistryConnector("securitize", "Securitize", "Official Marketplace", "Securitize", "Private Markets"),
  new RegistryConnector("republic", "Republic", "Official Marketplace", "Republic", "Private Equity"),
  new RegistryConnector("inx", "INX", "Official Marketplace", "INX", "Private Equity"),
  new RegistryConnector("tzero", "tZERO", "Official Marketplace", "tZERO", "Private Equity"),
  new RegistryConnector("tokeny", "Tokeny", "Official Marketplace", "Tokeny", "Security Tokens"),
  new RegistryConnector("rwa-xyz", "RWA.xyz", "Analytics", "RWA.xyz", "Market Intelligence")
];
