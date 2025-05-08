"use client";
import { useWallet } from "@solana/wallet-adapter-react";

export function useUserAddress() {
  const { publicKey } = useWallet();
  return publicKey?.toBase58() ?? null;
}