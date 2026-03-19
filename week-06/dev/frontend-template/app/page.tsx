'use client';

import { WalletConnect } from '@/components/WalletConnect';
import ChainSound from "../components/ChainSound";

export default function Page() {
     return (
    <main style={{ padding: "24px" }}>
      <h1>ChainSound dApp</h1>

      <WalletConnect />
      <ChainSound />
    </main>
  );
}