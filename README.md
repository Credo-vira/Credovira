# Credovira

Credovira is a real-time dashboard for monitoring DeFi lending markets on Solana. It aggregates data from multiple protocols to help users discover the best lending and borrowing opportunities across platforms by comparing interest rates, risk levels, and market conditions.

## Features

- Real-time interest rate comparison across major Solana DeFi lending platforms
- Risk analysis based on LTV (loan-to-value), liquidity levels, and utilization
- Visualization of strategies and historical lending data
- Integration with Solana protocols (starting with Solend)
- User reputation system through NFT-based ratings
- Built-in wallet connection for personalized insights

## Technology Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Solana Web3.js (for wallet and blockchain interaction)
- REST API integrations with DeFi protocols (Solend, etc.)
- On-chain analytics via RPC

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn or npm
- Phantom wallet extension (for user authentication)

### Installation

```bash
git clone https://github.com/Credo-vira/Credovira.git
cd Credovira
yarn install
yarn dev
```

## Project Structure
```
/app                - Next.js 15 App Router directory (pages and layouts)
/components         - Reusable UI components
/lib                - Utilities for fetching data from DeFi protocols
/hooks              - Custom React hooks for data and wallet state
```