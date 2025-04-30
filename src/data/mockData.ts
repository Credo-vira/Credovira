export type LendingPool = {
    platform: string;
    asset: string;
    supplyAPY: number;
    borrowAPY: number;
    ltv: number;
    riskScore: number;
  };
  
  export const pools: LendingPool[] = [
    {
      platform: "Solend",
      asset: "SOL",
      supplyAPY: 4.2,
      borrowAPY: 7.8,
      ltv: 75,
      riskScore: 42,
    },
    {
      platform: "Kamino",
      asset: "USDC",
      supplyAPY: 5.0,
      borrowAPY: 9.5,
      ltv: 80,
      riskScore: 58,
    },
    {
      platform: "MarginFi",
      asset: "wBTC",
      supplyAPY: 2.1,
      borrowAPY: 5.7,
      ltv: 60,
      riskScore: 35,
    },
  ];