import { getSolendUserPositions } from "@/lib/getSolendUserPositions";

export default async function LendingTable() {
  const solendData = await getSolendUserPositions();

  function formatNumber(n: number) {
    return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  
  function calculateRisk(ltv: number, borrowApy: number, tvl: number) {
    let score = 0;
    if (ltv > 75) score += 2;
    if (borrowApy > 10) score += 2;
    if (tvl < 500_000) score += 2;
    return score;
  }
  
  function riskIndicator(score: number) {
    if (score <= 1) return <span className="text-green-600 font-semibold">🟢 Низкий</span>;
    if (score <= 3) return <span className="text-yellow-600 font-semibold">🟠 Средний</span>;
    return <span className="text-red-600 font-semibold">🔴 Высокий</span>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">📊 DeFi кредитные рынки (Solend)</h2>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-2 px-3">Токен</th>
            <th className="py-2 px-3">Supply APY</th>
            <th className="py-2 px-3">Borrow APY</th>
            <th className="py-2 px-3">LTV</th>
            <th className="py-2 px-3">TVL</th>
            <th className="py-2 px-3">Риск</th>
          </tr>
        </thead>
        <tbody>
          {solendData.map((item, idx) => {
            const risk = calculateRisk(item.ltv, item.borrowApy, item.tvl);
            return (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{item.symbol}</td>
                <td className="py-2 px-3 text-green-600 font-medium">{item.supplyApy.toFixed(2)}%</td>
                <td className="py-2 px-3 text-red-500">{item.borrowApy.toFixed(2)}%</td>
                <td className="py-2 px-3">{item.ltv.toFixed(0)}%</td>
                <td className="py-2 px-3">${item.tvl.toLocaleString()}</td>
                <td className="py-2 px-3">{riskIndicator(risk)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

