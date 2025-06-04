/* eslint-disable @typescript-eslint/no-explicit-any */

export async function fetchReserveStats() {
  const res = await fetch("https://api.solend.fi/v1/markets/configs?scope=all&deployment=production");
  const data = await res.json();

  const mainMarket = data.find((m: any) => m.name === "main");
  const reserveAddresses = mainMarket.reserves.map((r: any)=> r.address);
  const reserveUrl = `https://api.solend.fi/reserves?scope=main&ids=${reserveAddresses.join(",")}`;

  const reservesRes = await fetch(reserveUrl);
  const reservesData = await reservesRes.json();

  console.log(reservesData);
  
  return reservesData;
}