import { PrismaClient } from "@prisma/client";
import { assets } from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  const categoryRecords = new Map<string, string>();
  const platformRecords = new Map<string, string>();
  const blockchainRecords = new Map<string, string>();

  for (const asset of assets) {
    const category = await prisma.category.upsert({
      where: { slug: asset.category.toLowerCase().replaceAll(" ", "-") },
      update: {},
      create: {
        name: asset.category,
        slug: asset.category.toLowerCase().replaceAll(" ", "-"),
        description: `${asset.category} assets tracked by RAIL.`
      }
    });
    categoryRecords.set(asset.category, category.id);

    const platform = await prisma.platform.upsert({
      where: { slug: asset.platform.toLowerCase().replaceAll(" ", "-") },
      update: {},
      create: {
        name: asset.platform,
        slug: asset.platform.toLowerCase().replaceAll(" ", "-"),
        description: `Sample ${asset.platform} platform profile.`
      }
    });
    platformRecords.set(asset.platform, platform.id);

    const blockchain = await prisma.blockchain.upsert({
      where: { name: asset.blockchain },
      update: {},
      create: {
        name: asset.blockchain,
        symbol: asset.blockchain.slice(0, 4).toUpperCase()
      }
    });
    blockchainRecords.set(asset.blockchain, blockchain.id);
  }

  for (const asset of assets) {
    const createdAsset = await prisma.asset.upsert({
      where: { slug: asset.slug },
      update: {
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
        }
      }
    });

    await prisma.distribution.createMany({
      data: [
        {
          assetId: createdAsset.id,
          amount: Math.round(asset.disclosedAssetValue * (asset.expectedYield / 100) / 4),
          periodStart: new Date("2026-01-01"),
          periodEnd: new Date("2026-03-31"),
          paidAt: new Date("2026-04-15"),
          notes: "Sample quarterly distribution"
        }
      ],
      skipDuplicates: true
    });
  }

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@rail.local" },
    update: {},
    create: {
      email: "demo@rail.local",
      name: "Demo Analyst",
      role: "ADMIN"
    }
  });

  const firstAsset = await prisma.asset.findFirstOrThrow({ where: { slug: assets[0].slug } });
  await prisma.watchlist.upsert({
    where: { userId_assetId: { userId: demoUser.id, assetId: firstAsset.id } },
    update: {},
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
