"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function WalletButton() {
  return (
    <div className="my-4">
      <WalletMultiButton />
    </div>
  );
}