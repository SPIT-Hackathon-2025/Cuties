"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useActiveWallet } from "thirdweb/react";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { useActiveAccount } from "thirdweb/react";
import { defineChain, getContract, sendTransaction } from "thirdweb";
import { client } from "../client";
import { MARKET_CONTRACT_ADDRESS } from "../const/addresses";
import { buyFromListing } from "thirdweb/extensions/marketplace";



export default function Shop() {
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const walletInfo = useActiveWallet();
  const account = useActiveAccount();
  const chain = defineChain(walletInfo?.getChain()?.id ?? 11155111);

  const market = getContract({
    address: MARKET_CONTRACT_ADDRESS,
    chain,
    client,
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const lists = await getAllValidListings({
          contract: market,
          start: 0,
          count: BigInt(8),
        });
        setListings(lists);
      } catch (error) {
        console.error("Error fetching valid listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const formatIpfsUrl = (url: string) => {
    return url.replace("ipfs://", "https://ad0e627e9349a09d849182cd3820f722.ipfscdn.io/ipfs/");
  }

  const buyNFtT = async (listingId: number) => {
    const transaction = await buyFromListing({
      contract: market,
      listingId: BigInt(listingId),
      quantity: 1n,
      recipient: account?.address || "",
    });

    if (!account) {
      console.error("Account not found");
      return;
    }

    await sendTransaction({
      transaction,
      account: account,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center font-medieval">
        Welcome to the Shop
      </h1>
      {isLoading ? (<div>
        <motion.div
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity }}
        >
          <motion.div
            className="border-t-4 border-blue-500 rounded-full w-16 h-16"
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          />
        </motion.div>
        <h1 className="text-3xl font-bold mb-8 text-center font-medieval">
          Loading Lists ...
        </h1>
      </div>) : (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full max-w-xs"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative h-80 w-full">
                <Image
                  src={formatIpfsUrl(listing.asset.metadata.image)}
                  alt={listing.asset.metadata.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h2 className="text-xl font-medieval mb-2 text-black">
                  {listing.asset.metadata.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2 h-10 overflow-y-auto font-medieval">
                  {listing.asset.metadata.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-medieval">
                    Amount left: {listing.quantity.toString()}
                  </span>
                  <span className="font-bold text-green-600 font-medieval">
                    {listing.currencyValuePerToken.displayValue} ETH
                  </span>
                </div>
                {!account ? (
                  <p>Please Connect Wallet</p>
                ) : (
                  <button
                    onClick={buyNFtT.bind(null, listing.id)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 font-medieval"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
