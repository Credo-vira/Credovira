"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export function useWalletInfo() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) return;

    const fetchBalance = async () => {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / 1e9); 
    };

    fetchBalance();
  }, [publicKey, connection]);

  return { publicKey, balance };
}