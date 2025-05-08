import "./globals.css";
import { ReactNode } from "react";
import { SolanaWalletProvider } from "@/components/Wallet/SolanaWalletProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  );
}