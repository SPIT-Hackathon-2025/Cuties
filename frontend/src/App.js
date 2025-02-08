import React from 'react';
import { ConnectButton, useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "./client";

function WalletInfo() {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    address: account?.address,
  });

  if (!account) return null;

  return (
    <div>
      <p>Wallet address: {account.address}</p>
      {isLoading ? (
        <p>Loading balance...</p>
      ) : (
        <p>
          Wallet balance: {balance?.displayValue} {balance?.symbol}
        </p>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>My Web3 App</h1>
      <ConnectButton client={client} />
      <WalletInfo />
    </div>
  );
}

export default App;