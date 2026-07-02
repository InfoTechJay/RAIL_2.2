export type RawIngestionRecord = Record<string, unknown>;
export type NormalizedAssetRecord = {
  sourceId: string;
  externalId: string;
  name: string;
  platform: string;
  category: string;
  sourceUrl?: string;
  observedAt: string;
  payload: Record<string, unknown>;
};

export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export type IngestionLogEntry = {
  connector: string;
  status: "success" | "failed" | "skipped";
  message: string;
  recordedAt: string;
};

export abstract class BaseConnector {
  abstract readonly id: string;
  abstract readonly displayName: string;
  abstract readonly sourceType: string;

  abstract fetch(): Promise<RawIngestionRecord[]>;
  abstract normalize(records: RawIngestionRecord[]): Promise<NormalizedAssetRecord[]>;

  validate(records: NormalizedAssetRecord[]): ValidationResult {
    const errors = records.flatMap((record) => {
      const missing = ["sourceId", "externalId", "name", "platform", "category"].filter((key) => !record[key as keyof NormalizedAssetRecord]);
      return missing.map((field) => `${record.externalId || "unknown"} missing ${field}`);
    });
    return { valid: errors.length === 0, errors };
  }

  calculateConfidence(record: NormalizedAssetRecord) {
    const hasSource = Boolean(record.sourceUrl);
    const hasPayload = Object.keys(record.payload).length > 0;
    return {
      score: 55 + (hasSource ? 20 : 0) + (hasPayload ? 15 : 0),
      reasons: [hasSource ? "Source URL present" : "Source URL missing", hasPayload ? "Payload captured" : "Payload empty"]
    };
  }

  async save(records: NormalizedAssetRecord[]) {
    return records.length;
  }

  log(entry: Omit<IngestionLogEntry, "connector" | "recordedAt">): IngestionLogEntry {
    return {
      connector: this.displayName,
      recordedAt: new Date().toISOString(),
      ...entry
    };
  }

  async run() {
    const raw = await this.fetch();
    const normalized = await this.normalize(raw);
    const validation = this.validate(normalized);
    if (!validation.valid) {
      return this.log({ status: "failed", message: validation.errors.join("; ") });
    }
    const saved = await this.save(normalized);
    return this.log({ status: "success", message: `${saved} records normalized and queued for persistence` });
  }
}
