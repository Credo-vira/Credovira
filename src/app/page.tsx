import LendingTable from "@/components/LendingTable";
import { pools } from "@/data/mockData";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Credovira: DeFi Lending Markets</h1>
      <LendingTable data={pools} />
    </main>
  );
}