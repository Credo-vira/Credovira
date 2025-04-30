import { LendingPool } from "@/data/mockData";

type Props = {
  data: LendingPool[];
};

export default function LendingTable({ data }: Props) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Platform</th>
            <th className="px-4 py-2">Asset</th>
            <th className="px-4 py-2">Supply APY</th>
            <th className="px-4 py-2">Borrow APY</th>
            <th className="px-4 py-2">LTV</th>
            <th className="px-4 py-2">Risk</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pool, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2">{pool.platform}</td>
              <td className="px-4 py-2">{pool.asset}</td>
              <td className="px-4 py-2">{pool.supplyAPY}%</td>
              <td className="px-4 py-2">{pool.borrowAPY}%</td>
              <td className="px-4 py-2">{pool.ltv}%</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs ${
                    pool.riskScore <= 30
                      ? "bg-green-500"
                      : pool.riskScore <= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {pool.riskScore}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}