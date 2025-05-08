"use client";

import { useWalletInfo } from "@/hooks/useWalletInfo";

export default function WalletInfo() {
  const { publicKey, balance } = useWalletInfo();

  if (!publicKey) return null;

  return (
    <div className="p-4 bg-white rounded-xl shadow mb-6 border border-gray-200">
      <p className="text-gray-800 font-medium">
        🧾 Адрес: <span className="text-sm text-gray-500">{publicKey.toBase58()}</span>
      </p>
      <p className="text-gray-800 font-medium">
        💰 Баланс:{" "}
        {balance !== null ? (
          <span className="text-green-600">{balance.toFixed(4)} SOL</span>
        ) : (
          "Загрузка..."
        )}
      </p>
    </div>
  );
}