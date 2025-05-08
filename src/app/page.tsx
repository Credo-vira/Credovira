import LendingTable from "@/components/LendingTable";
import WalletButton from "@/components/Wallet/WalletButton";
import WalletInfo from "@/components/Wallet/WalletInfo"
import SolendPositions from "@/components/Positions/SolendPositions";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Credovira: DeFi Lending Dashboard</h1>
      <WalletButton />
      <WalletInfo />
      <SolendPositions />
      <LendingTable />
    </main>
  );
}