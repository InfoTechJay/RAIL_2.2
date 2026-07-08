import { PrismaClient } from "@prisma/client";
import { dataSources } from "../lib/data-source-registry";
import { assets, blockchains, categories, platforms } from "../lib/mock-data";
import { platformProfiles } from "../lib/platform-data";
import { calculateDataConfidence, explainLiquidityScore, explainRiskScore, explainSentimentScore, explainTransparencyScore } from "../lib/scoring";

const prisma = new PrismaClient();

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function reliabilityForTrust(trustLevel: string) {
  if (trustLevel === "High") return 90;
  if (trustLevel === "Medium") return 72;
  return 55;
}

function platformNameForSource(sourceName: string) {
  const aliases: Record<string, string> = {
    "Lofty Marketplace": "Lofty",
    "Ondo OUSG": "Ondo Finance",
    "BlackRock BUIDL": "BlackRock BUIDL"
  };
  return aliases[sourceName] ?? sourceName;
}

function serialize(value: unknown) {
  return JSON.stringify(value);
}

async function main() {
  const categoryRecords = new Map<string, string>();
  const platformRecords = new Map<string, string>();
  const blockchainRecords = new Map<string, string>();

  for (const categoryName of categories) {
    const category = await prisma.category.upsert({
      where: { slug: slugify(categoryName) },
      update: {
        name: categoryName,
        description: `${categoryName} assets tracked by RAIL.`
      },
      create: {
        name: categoryName,
        slug: slugify(categoryName),
        description: `${categoryName} assets tracked by RAIL.`
      }
    });
    categoryRecords.set(categoryName, category.id);
  }

  for (const blockchainName of blockchains) {
    const blockchain = await prisma.blockchain.upsert({
      where: { name: blockchainName },
      update: {
        symbol: blockchainName.slice(0, 4).toUpperCase()
      },
      create: {
        name: blockchainName,
        symbol: blockchainName.slice(0, 4).toUpperCase()
      }
    });
    blockchainRecords.set(blockchainName, blockchain.id);
  }

  const profileByName = new Map(platformProfiles.map((profile) => [profile.name, profile]));
  for (const platformName of platforms) {
    const profile = profileByName.get(platformName);
    const platform = await prisma.platform.upsert({
      where: { slug: slugify(platformName) },
      update: {
        name: platformName,
        logo: profile?.logo,
        website: profile?.website,
        description: profile?.description ?? `${platformName} platform profile tracked by RAIL.`,
        headquarters: profile?.headquarters,
        yearFounded: profile?.yearFounded,
        regulatoryInformation: profile?.regulatoryInformation,
        supportedBlockchains: serialize(profile?.supportedBlockchains ?? []),
        assetCategories: serialize(profile?.assetCategories ?? []),
        assetsUnderManagement: profile?.assetsUnderManagement,
        numberOfListedAssets: profile?.listedAssets ?? 0,
        totalTokenizedValue: profile?.totalTokenizedValue,
        averageRiskScore: profile?.averageRiskScore ?? 0,
        averageTransparencyScore: profile?.averageTransparencyScore ?? 0,
        averageLiquidityScore: profile?.averageLiquidityScore ?? 0,
        averageSentimentScore: profile?.averageSentimentScore ?? 0,
        newsFeed: serialize(profile?.recentNews ?? []),
        lastUpdated: profile?.lastUpdated ? new Date(profile.lastUpdated) : null
      },
      create: {
        name: platformName,
        slug: slugify(platformName),
        logo: profile?.logo,
        website: profile?.website,
        description: profile?.description ?? `${platformName} platform profile tracked by RAIL.`,
        headquarters: profile?.headquarters,
        yearFounded: profile?.yearFounded,
        regulatoryInformation: profile?.regulatoryInformation,
        supportedBlockchains: serialize(profile?.supportedBlockchains ?? []),
        assetCategories: serialize(profile?.assetCategories ?? []),
        assetsUnderManagement: profile?.assetsUnderManagement,
        numberOfListedAssets: profile?.listedAssets ?? 0,
        totalTokenizedValue: profile?.totalTokenizedValue,
        averageRiskScore: profile?.averageRiskScore ?? 0,
        averageTransparencyScore: profile?.averageTransparencyScore ?? 0,
        averageLiquidityScore: profile?.averageLiquidityScore ?? 0,
        averageSentimentScore: profile?.averageSentimentScore ?? 0,
        newsFeed: serialize(profile?.recentNews ?? []),
        lastUpdated: profile?.lastUpdated ? new Date(profile.lastUpdated) : null
      }
    });
    platformRecords.set(platformName, platform.id);
  }

  for (const source of dataSources) {
    const platformId = platformRecords.get(platformNameForSource(source.name));
    await prisma.dataSource.upsert({
      where: { slug: source.slug },
      update: {
        platformId,
        name: source.name,
        sourceType: source.sourceType,
        website: source.website,
        apiUrl: source.apiUrl,
        trustLevel: source.trustLevel,
        updateFrequency: source.updateFrequency,
        active: source.active,
        primaryAssetTypes: serialize(source.primaryAssetTypes),
        supportedBlockchains: serialize(source.supportedBlockchains),
        updateSchedule: source.updateSchedule,
        reliability: reliabilityForTrust(source.trustLevel),
        lastChecked: new Date(source.lastSync),
        lastSync: new Date(source.lastSync),
        notes: source.notes
      },
      create: {
        platformId,
        name: source.name,
        slug: source.slug,
        sourceType: source.sourceType,
        website: source.website,
        apiUrl: source.apiUrl,
        trustLevel: source.trustLevel,
        updateFrequency: source.updateFrequency,
        active: source.active,
        primaryAssetTypes: serialize(source.primaryAssetTypes),
        supportedBlockchains: serialize(source.supportedBlockchains),
        updateSchedule: source.updateSchedule,
        reliability: reliabilityForTrust(source.trustLevel),
        lastChecked: new Date(source.lastSync),
        lastSync: new Date(source.lastSync),
        notes: source.notes
      }
    });
  }

  for (const asset of assets) {
    const confidence = calculateDataConfidence(asset);
    const liquidity = explainLiquidityScore(asset);
    const explanations = [
      { scoreType: "RAIL Risk Score", ...explainRiskScore(asset) },
      { scoreType: "RAIL Transparency Score", ...explainTransparencyScore(asset) },
      { scoreType: "RAIL Liquidity Score", ...liquidity },
      { scoreType: "RAIL Sentiment Score", ...explainSentimentScore(asset) },
      { scoreType: "RAIL Data Confidence Score", ...confidence }
    ];

    const createdAsset = await prisma.asset.upsert({
      where: { slug: asset.slug },
      update: {
        categoryId: categoryRecords.get(asset.category)!,
        platformId: platformRecords.get(asset.platform)!,
        blockchainId: blockchainRecords.get(asset.blockchain),
        riskScore: asset.riskScore,
        sentimentScore: asset.sentimentScore,
        transparencyScore: asset.transparencyScore,
        liquidityScore: liquidity.value,
        dataConfidenceScore: confidence.value,
        confidenceLevel: confidence.rating,
        confidenceReasons: serialize(confidence.factors),
        lastVerified: new Date(confidence.lastVerified),
        officialSources: serialize(confidence.officialSources),
        supportingSources: serialize(confidence.supportingSources),
        blockchainVerification: asset.contractAddress
          ? `${asset.blockchain} contract reference available: ${asset.contractAddress}`
          : "Blockchain contract reference pending",
        platformVerification: `${asset.platform} disclosure review required before production confidence approval`,
        regulatoryInformation: `${asset.jurisdiction} regulatory context should be verified against official filings and issuer documents`,
        lastUpdated: new Date(asset.lastUpdated)
      },
      create: {
        name: asset.name,
        slug: asset.slug,
        categoryId: categoryRecords.get(asset.category)!,
        platformId: platformRecords.get(asset.platform)!,
        description: asset.description,
        location: asset.location,
        jurisdiction: asset.jurisdiction,
        assetType: asset.assetType,
        blockchainId: blockchainRecords.get(asset.blockchain),
        tokenSymbol: asset.tokenSymbol,
        contractAddress: asset.contractAddress,
        offeringSize: asset.offeringSize,
        minimumInvestment: asset.minimumInvestment,
        expectedYield: asset.expectedYield,
        historicalYield: asset.historicalYield,
        status: asset.status,
        investorEligibility: asset.investorEligibility,
        liquidityRating: asset.liquidityRating,
        riskScore: asset.riskScore,
        sentimentScore: asset.sentimentScore,
        transparencyScore: asset.transparencyScore,
        liquidityScore: liquidity.value,
        dataConfidenceScore: confidence.value,
        confidenceLevel: confidence.rating,
        confidenceReasons: serialize(confidence.factors),
        lastVerified: new Date(confidence.lastVerified),
        officialSources: serialize(confidence.officialSources),
        supportingSources: serialize(confidence.supportingSources),
        blockchainVerification: asset.contractAddress
          ? `${asset.blockchain} contract reference available: ${asset.contractAddress}`
          : "Blockchain contract reference pending",
        platformVerification: `${asset.platform} disclosure review required before production confidence approval`,
        regulatoryInformation: `${asset.jurisdiction} regulatory context should be verified against official filings and issuer documents`,
        launchDate: new Date(asset.launchDate),
        lastUpdated: new Date(asset.lastUpdated),
        token: {
          create: {
            blockchainId: blockchainRecords.get(asset.blockchain),
            symbol: asset.tokenSymbol,
            contractAddress: asset.contractAddress,
            tokenStandard: asset.tokenStandard,
            totalSupply: asset.totalSupply,
            decimals: 18,
            transferability: asset.transferability
          }
        },
        financialData: {
          create: {
            disclosedAssetValue: asset.disclosedAssetValue,
            offeringSize: asset.offeringSize,
            minimumInvestment: asset.minimumInvestment,
            expectedYield: asset.expectedYield,
            historicalYield: asset.historicalYield,
            distributionRate: asset.expectedYield,
            valuationDate: new Date(asset.lastUpdated)
          }
        },
        riskScores: {
          create: {
            score: asset.riskScore,
            liquidityRisk: asset.riskBreakdown.liquidity,
            marketRisk: asset.riskBreakdown.market,
            issuerRisk: asset.riskBreakdown.issuer,
            regulatoryRisk: asset.riskBreakdown.regulatory,
            methodology: "RAIL mock scoring model v0.1",
            notes: asset.riskFactors.join("; "),
            assessedAt: new Date(asset.lastUpdated)
          }
        },
        sentimentScores: {
          create: {
            score: asset.sentimentScore,
            sourceCount: asset.newsMentions.length + asset.dataSources.length,
            trend: asset.sentimentScore >= 65 ? "POSITIVE" : asset.sentimentScore >= 55 ? "MIXED" : "NEUTRAL",
            summary: asset.sentimentSummary,
            calculatedAt: new Date(asset.lastUpdated)
          }
        },
        dataSources: {
          create: asset.dataSources.map((source) => ({
            name: source.name,
            sourceType: source.type,
            reliability: source.reliability,
            lastChecked: new Date(source.lastChecked)
          }))
        },
        newsMentions: {
          create: asset.newsMentions.map((mention) => ({
            title: mention.title,
            publisher: mention.publisher,
            sentiment: mention.sentiment,
            publishedAt: new Date(mention.publishedAt)
          }))
        },
        scoreExplanations: {
          create: explanations.map((score) => ({
            scoreType: score.scoreType,
            value: score.value,
            rating: score.rating,
            explanation: score.explanation,
            factors: serialize(score.factors),
            calculatedAt: new Date(asset.lastUpdated)
          }))
        }
      }
    });

    await prisma.distribution.deleteMany({
      where: {
        assetId: createdAsset.id,
        notes: "Sample quarterly distribution"
      }
    });

    await prisma.distribution.create({
      data: {
        assetId: createdAsset.id,
        amount: Math.round(asset.disclosedAssetValue * (asset.expectedYield / 100) / 4),
        periodStart: new Date("2026-01-01"),
        periodEnd: new Date("2026-03-31"),
        paidAt: new Date("2026-04-15"),
        notes: "Sample quarterly distribution"
      }
    });
  }

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@rail.local" },
    update: {
      role: "ADMIN"
    },
    create: {
      email: "demo@rail.local",
      name: "Demo Analyst",
      role: "ADMIN"
    }
  });

  const firstAsset = await prisma.asset.findFirstOrThrow({ where: { slug: assets[0].slug } });
  await prisma.watchlist.upsert({
    where: { userId_assetId: { userId: demoUser.id, assetId: firstAsset.id } },
    update: {
      alertOnUpdates: true
    },
    create: {
      userId: demoUser.id,
      assetId: firstAsset.id,
      alertOnUpdates: true
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
