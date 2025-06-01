'use client';

import { getSolendUserPositions } from '@/lib/getSolendUserPositions';
import { useEffect, useState } from 'react';

export default function UserPositions() {
  const [positions, setPositions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSolendUserPositions();
        setPositions(data);
      } catch (e: any) {
        setError(e.message);
      }
    }

    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Ошибка: {error}</div>;
  if (!positions.length) return <div>Загрузка позиций...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Позиции пользователя на Solend</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Токен</th>
            <th className="p-2 border">Депозит</th>
            <th className="p-2 border">Кредит</th>
            <th className="p-2 border">APY (депозит)</th>
            <th className="p-2 border">APY (кредит)</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.symbol} className="text-center">
              <td className="p-2 border">{pos.symbol}</td>
              <td className="p-2 border">{pos.deposited.toFixed(2)}</td>
              <td className="p-2 border">{pos.borrowed.toFixed(2)}</td>
              <td className="p-2 border">{pos.supplyApy.toFixed(2)}%</td>
              <td className="p-2 border">{pos.borrowApy.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}