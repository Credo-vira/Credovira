export async function getSolendUserPositions(wallet: string) {
    const url = `https://api.solend.fi/v1/user/${wallet}?network=mainnet`;
  
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Не удалось получить позиции пользователя");
    }
  
    const data = await res.json();
  
    return data.user.positions.map((pos: any) => ({
      symbol: pos.symbol,
      deposited: pos.amountDeposited,
      borrowed: pos.amountBorrowed,
      supplyApy: pos.supplyApy * 100,
      borrowApy: pos.borrowApy * 100,
      collateralValue: pos.collateralValue,
      borrowValue: pos.borrowValue,
    }));
  }