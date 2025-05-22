export async function fetchReserveStats() {
  const res = await fetch("https://api.solend.fi/v1/markets/configs?scope=all&deployment=production");
  const data = await res.json();

  const mainMarket = data.find(m => m.name === "main");
  const reserveAddresses = mainMarket.reserves.map(r => r.address);
  const reserveUrl = `https://api.solend.fi/reserves?scope=main&ids=${reserveAddresses.join(",")}`;

  const reservesRes = await fetch(reserveUrl);
  const reservesData = await reservesRes.json();

  console.log(reservesData);
  
  return reservesData;
}