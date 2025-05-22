export async function getSolendUserPositions() {
  return [
    {
      symbol: "SOL",
      deposited: 12.5,
      borrowed: 5.3,
      supplyApy: 4.25,
      borrowApy: 7.8,
      collateralValue: 300,
      borrowValue: 150,
      tvl: 100_000,
      ltv: 50, 
    },
    {
      symbol: "USDC",
      deposited: 2000,
      borrowed: 0,
      supplyApy: 2.1,
      borrowApy: 0,
      collateralValue: 2000,
      borrowValue: 0,
      tvl: 250_000,
      ltv: 0,
    },
    {
      symbol: "BTC",
      deposited: 0.08,
      borrowed: 0.01,
      supplyApy: 1.9,
      borrowApy: 5.4,
      collateralValue: 4800,
      borrowValue: 600,
      tvl: 300_000,
      ltv: 12,
    }
  ];
}