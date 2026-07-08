import { prisma } from "@/lib/prisma";

type RawRecord = Record<string, unknown>;

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "unlabeled";
}

function readPath(record: RawRecord, path: string) {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, record);
}

function text(record: RawRecord, paths: string[], fallback = "") {
  for (const path of paths) {
    const value = readPath(record, path);
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return fallback;
}

function number(record: RawRecord, paths: string[], fallback = 0) {
  for (const path of paths) {
    const value = readPath(record, path);
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && Number.isFinite(Number(value))) return Number(value);
  }
  return fallback;
}

function arrayText(record: RawRecord, paths: string[]) {
  for (const path of paths) {
    const value = readPath(record, path);
    if (Array.isArray(value)) {
      return value.map((item) => (typeof item === "string" ? item : text(item as RawRecord, ["name", "chain", "network"]))).filter(Boolean);
    }
    if (typeof value === "string" && value.trim()) return [value.trim()];
  }
  return [];
}

function extractRecords(payload: unknown): RawRecord[] {
  if (Array.isArray(payload)) return payload.filter((item): item is RawRecord => Boolean(item && typeof item === "object"));
  if (!payload || typeof payload !== "object") return [];
  const objectPayload = payload as RawRecord;
  for (const key of ["data", "results", "assets", "items"]) {
    const value = objectPayload[key];
    if (Array.isArray(value)) return value.filter((item): item is RawRecord => Boolean(item && typeof item === "object"));
  }
  return [];
}

async function ensureCategory(name: string) {
  return prisma.category.upsert({
    where: { slug: slugify(name) },
    update: { name },
    create: {
      name,
      slug: slugify(name),
      description: `${name} assets tracked from live source data.`
    }
  });
}

async function ensurePlatform(name: string, website = "") {
  return prisma.platform.upsert({
    where: { slug: slugify(name) },
    update: {
      name,
      website: website || undefined,
      description: `Live platform profile created from source ingestion for ${name}.`,
      lastUpdated: new Date()
    },
    create: {
      name,
      slug: slugify(name),
      website: website || undefined,
      description: `Live platform profile created from source ingestion for ${name}.`,
      lastUpdated: new Date()
    }
  });
}

async function ensureBlockchain(name: string) {
  return prisma.blockchain.upsert({
    where: { name },
    update: {},
    create: {
      name,
      symbol: name.slice(0, 6).toUpperCase()
    }
  });
}

async function saveRwaRecord(record: RawRecord, dataSourceId: string) {
  const name = text(record, ["name", "asset_name", "token_name", "title"]);
  if (!name) return false;

  const symbol = text(record, ["symbol", "ticker", "token_symbol"], "RWA");
  const categoryName = text(record, ["asset_class", "asset_class_name", "asset_type", "category"], "Other Real World Assets");
  const platformName = text(record, ["issuer.name", "issuer_name", "protocol.name", "protocol_name", "platform", "manager"], "RWA.xyz");
  const website = text(record, ["issuer.website", "website", "url"]);
  const chains = arrayText(record, ["chains", "chain_names", "networks", "blockchains"]);
  const blockchainName = chains[0] ?? text(record, ["chain", "network", "blockchain"], "Ethereum");
  const contractAddress = text(record, ["contract_address", "address", "token_address"]);
  const disclosedValue = number(record, [
    "total_asset_value_dollar.val",
    "total_asset_value_dollar",
    "circulating_market_value_dollar.val",
    "circulating_market_value_dollar",
    "market_value_dollar.val",
    "market_value_dollar",
    "tvl.val",
    "tvl"
  ]);
  const expectedYield = number(record, ["apy.val", "apy", "yield.val", "yield", "yield_to_maturity.val", "yield_to_maturity"]);
  const description = text(record, ["description", "summary"], `Live RWA.xyz record for ${name}.`);

  const [category, platform, blockchain] = await Promise.all([ensureCategory(categoryName), ensurePlatform(platformName, website), ensureBlockchain(blockchainName)]);
  const now = new Date();
  const asset = await prisma.asset.upsert({
    where: { slug: `rwa-${slugify(name)}-${slugify(symbol)}` },
    update: {
      categoryId: category.id,
      platformId: platform.id,
      blockchainId: blockchain.id,
      description,
      contractAddress: contractAddress || undefined,
      tokenSymbol: symbol,
      expectedYield,
      status: "ACTIVE",
      riskScore: 45,
      sentimentScore: 60,
      transparencyScore: 72,
      liquidityScore: 55,
      dataConfidenceScore: contractAddress ? 78 : 68,
      confidenceLevel: contractAddress ? "High" : "Moderate",
      confidenceReasons: JSON.stringify(["Imported from RWA.xyz live API", contractAddress ? "Contract address present" : "Contract address pending"]),
      officialSources: JSON.stringify([]),
      supportingSources: JSON.stringify(["RWA.xyz"]),
      lastVerified: now,
      lastUpdated: now
    },
    create: {
      name,
      slug: `rwa-${slugify(name)}-${slugify(symbol)}`,
      categoryId: category.id,
      platformId: platform.id,
      description,
      location: "Global",
      jurisdiction: "Source-specific",
      assetType: categoryName,
      blockchainId: blockchain.id,
      tokenSymbol: symbol,
      contractAddress: contractAddress || null,
      offeringSize: disclosedValue,
      minimumInvestment: 0,
      expectedYield,
      historicalYield: null,
      status: "ACTIVE",
      investorEligibility: "INSTITUTIONAL",
      liquidityRating: "MODERATE",
      riskScore: 45,
      sentimentScore: 60,
      transparencyScore: 72,
      liquidityScore: 55,
      dataConfidenceScore: contractAddress ? 78 : 68,
      confidenceLevel: contractAddress ? "High" : "Moderate",
      confidenceReasons: JSON.stringify(["Imported from RWA.xyz live API", contractAddress ? "Contract address present" : "Contract address pending"]),
      officialSources: JSON.stringify([]),
      supportingSources: JSON.stringify(["RWA.xyz"]),
      blockchainVerification: contractAddress ? `${blockchainName} contract reference available: ${contractAddress}` : "Blockchain contract reference pending",
      platformVerification: `${platformName} matched from RWA.xyz source data`,
      regulatoryInformation: "Regulatory source verification pending",
      launchDate: now,
      lastUpdated: now,
      lastVerified: now
    }
  });

  await prisma.financialData.upsert({
    where: { assetId: asset.id },
    update: {
      disclosedAssetValue: disclosedValue,
      expectedYield,
      valuationDate: now
    },
    create: {
      assetId: asset.id,
      disclosedAssetValue: disclosedValue,
      offeringSize: disclosedValue,
      minimumInvestment: 0,
      expectedYield,
      historicalYield: null,
      distributionRate: expectedYield,
      valuationDate: now
    }
  });

  if (symbol) {
    await prisma.token.upsert({
      where: { assetId: asset.id },
      update: {
        blockchainId: blockchain.id,
        symbol,
        contractAddress: contractAddress || null
      },
      create: {
        assetId: asset.id,
        blockchainId: blockchain.id,
        symbol,
        contractAddress: contractAddress || null,
        tokenStandard: "Source reported",
        decimals: 18,
        transferability: "Transferability verification pending"
      }
    });
  }

  await prisma.dataSource.deleteMany({
    where: {
      assetId: asset.id,
      sourceType: "RWA.xyz Live API"
    }
  });

  await prisma.dataSource.create({
    data: {
      assetId: asset.id,
      name: "RWA.xyz",
      sourceType: "RWA.xyz Live API",
      website: "https://rwa.xyz",
      apiUrl: "https://api.rwa.xyz/v4/assets",
      trustLevel: "High",
      updateFrequency: "Daily",
      active: true,
      primaryAssetTypes: JSON.stringify([categoryName]),
      supportedBlockchains: JSON.stringify(chains.length ? chains : [blockchainName]),
      updateSchedule: "Daily sync",
      reliability: 88,
      lastChecked: now,
      lastSync: now,
      notes: `Live import for ${name}.`
    }
  });

  await prisma.dataSource.updateMany({
    where: { id: dataSourceId },
    data: {
      lastSync: now,
      lastChecked: now
    }
  });

  return true;
}

export async function syncRwaXyz() {
  const source = await prisma.dataSource.findFirst({
    where: {
      slug: "rwa-xyz"
    }
  });
  const apiUrl = source?.apiUrl || "https://api.rwa.xyz/v4/assets";
  const job = await prisma.syncJob.create({
    data: {
      connectorId: "rwa-xyz",
      sourceName: "RWA.xyz",
      status: "RUNNING",
      errors: JSON.stringify([])
    }
  });

  try {
    if (!process.env.RWA_API_KEY) {
      throw new Error("RWA_API_KEY is required for RWA.xyz live ingestion.");
    }

    const response = await fetch(apiUrl, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.RWA_API_KEY}`
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`RWA.xyz request failed with ${response.status} ${response.statusText}`);
    }

    const payload = await response.json();
    const records = extractRecords(payload).slice(0, Number(process.env.SYNC_BATCH_LIMIT ?? 100));
    let saved = 0;

    for (const record of records) {
      if (await saveRwaRecord(record, source?.id ?? "")) saved += 1;
    }

    await prisma.syncJob.update({
      where: { id: job.id },
      data: {
        status: "SUCCESS",
        finishedAt: new Date(),
        recordsFetched: records.length,
        recordsSaved: saved,
        errors: JSON.stringify([])
      }
    });

    return { connectorId: "rwa-xyz", status: "SUCCESS", recordsFetched: records.length, recordsSaved: saved };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown sync error";
    await prisma.syncJob.update({
      where: { id: job.id },
      data: {
        status: "FAILED",
        finishedAt: new Date(),
        errors: JSON.stringify([message])
      }
    });
    return { connectorId: "rwa-xyz", status: "FAILED", recordsFetched: 0, recordsSaved: 0, error: message };
  }
}

export async function runLiveSync() {
  return {
    startedAt: new Date().toISOString(),
    results: [await syncRwaXyz()]
  };
}
