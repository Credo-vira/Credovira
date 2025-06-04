'use client'

import { fetchReserveStats } from '@/lib/getSolendMarkets'
import { useEffect, useState } from 'react';

type ReserveStats = {
  reserve: {
    liquidity: {
      symbol?: string;
      mintPubkey: string;
      availableAmount?: string;
      borrowedAmountWads?: string;
      mintDecimals?: number;
    };
    config?: {
      loanToValueRatio?: number;
    };
  };
  rates?: {
    supplyInterest?: string;
    borrowInterest?: string;
  };
};

export default function LendingTable() {
  const [solendData, setSolendData] = useState<ReserveStats[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      const data = await fetchReserveStats();
      setSolendData(data.results)
    }

    getData();
  }, []);

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

  const processedData = solendData
    .map((item) => {
      const { reserve, rates } = item;
      const liquidity = reserve?.liquidity;

      const symbol = liquidity?.symbol || liquidity?.mintPubkey.slice(0, 10) + "...";
      const tokenPrice = 1;

      const supplyAPY = parseFloat(rates?.supplyInterest || "0").toFixed(2);
      const borrowAPY = parseFloat(rates?.borrowInterest || "0").toFixed(2);
      const ltv = (reserve?.config?.loanToValueRatio || 0) / 100;

      const available = parseFloat(liquidity?.availableAmount || "0") / Math.pow(10, liquidity?.mintDecimals || 6);
      const borrowed = parseFloat(liquidity?.borrowedAmountWads || "0") / 1e18;
      const tvl = (available + borrowed) * tokenPrice;

      const riskScore = calculateRisk(ltv * 100, parseFloat(borrowAPY), tvl);

      return {
        symbol,
        supplyAPY,
        borrowAPY,
        ltv,
        tvl,
        riskScore,
      };
    })
    .sort((a, b) => sortOrder === 'asc' ? a.tvl - b.tvl : b.tvl - a.tvl);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const currentData = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">📊 DeFi кредитные рынки (Solend)</h2>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-2 px-3">Токен</th>
            <th className="py-2 px-3 text-right">Supply APY</th>
            <th className="py-2 px-3 text-right">Borrow APY</th>
            <th className="py-2 px-3 text-right">LTV</th>
            <th
              className="py-2 px-3 text-right cursor-pointer"
              onClick={() => {
                setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
                setCurrentPage(1);
              }}
            >
              Total liquidity {sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th className="py-2 px-3 text-right">Риск</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="p-3">{item.symbol}</td>
              <td className="p-3 text-right">{item.supplyAPY}%</td>
              <td className="p-3 text-right">{item.borrowAPY}%</td>
              <td className="p-3 text-right">{(item.ltv * 100).toFixed(0)}%</td>
              <td className="p-3 text-right">${item.tvl.toFixed(2)}</td>
              <td className="p-3 text-right">{riskIndicator(item.riskScore)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ← Назад
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Вперёд →
        </button>
      </div>
    </div>
  );
}