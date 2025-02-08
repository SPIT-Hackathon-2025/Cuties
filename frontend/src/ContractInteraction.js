// src/ContractInteraction.js
import React from 'react';
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { client } from "./client";

const contract = getContract({
  client,
  address: "your_contract_address_here",
  chain: sepolia,
});

function ContractInteraction() {
  const { data: tokenUri, isLoading } = useReadContract({
    contract,
    method: "function tokenURI(uint256 tokenId) returns (string)",
    params: [1n],
  });

  const { mutate: sendTransaction } = useSendTransaction();

  const handleMint = async () => {
    const transaction = prepareContractCall({
      contract,
      method: "function mint(address to)",
      params: ["recipient_address_here"],
    });
    sendTransaction(transaction);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading token URI...</p>
      ) : (
        <p>Token URI: {tokenUri}</p>
      )}
      <button onClick={handleMint}>Mint NFT</button>
    </div>
  );
}

export default ContractInteraction;