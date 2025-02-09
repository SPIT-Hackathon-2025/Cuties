import {
  createThirdwebClient,
  getContract,
  sendAndConfirmTransaction,
} from "thirdweb";

import { config } from "dotenv";

import { privateKeyToAccount } from "thirdweb/wallets";
import {
  isApprovedForAll,
  setApprovalForAll,
} from "thirdweb/extensions/erc1155";
import { createNewPack } from "thirdweb/extensions/pack";
import { sepolia } from "thirdweb/chains";

config();

const main = async () => {
  console.log("Starting script...");

  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }
  if (!process.env.THIRDWEB_SECRET_KEY) {
    throw new Error("THIRDWEB_SECRET_KEY is not set");
  }

  try {
    const EDITION_CONTRACT_ADDRESS =
      "0x2F90945E225A778B887Ff3EFfC31645DC8279C01";
    const PACK_CONTRACT_ADDRESS = "0x31Ed6bF0e42A3f1696eFD27dd0580471616C12c3"; // Use a valid pack contract address

    const chain = sepolia;

    console.log("Initializing client...");
    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY,
    });

    console.log("Converting private key to account...");
    const account = privateKeyToAccount({
      client,
      privateKey: process.env.PRIVATE_KEY,
    });

    console.log("Account address:", account.address);

    console.log("Getting contracts...");
    const contractEdition = getContract({
      address: EDITION_CONTRACT_ADDRESS,
      chain,
      client,
    });

    const contractPack = getContract({
      address: PACK_CONTRACT_ADDRESS,
      chain,
      client,
    });

    console.log("Checking if account is approved...");
    const isApproved = await isApprovedForAll({
      contract: contractEdition,
      owner: account.address,
      operator: PACK_CONTRACT_ADDRESS,
    });

    console.log(`Account is approved: ${isApproved}`);

    if (!isApproved) {
      console.log("Sending approval transaction...");
      const transaction = setApprovalForAll({
        contract: contractEdition,
        operator: PACK_CONTRACT_ADDRESS,
        approved: true,
      });

      const approvalData = await sendAndConfirmTransaction({
        transaction,
        account,
      });

      console.log(`Approval Transaction hash: ${approvalData.transactionHash}`);
    }

    console.log("Creating pack transaction...");
    const packMetadata = {
      name: "Basic Pack (#1)",
      image:
        "https://ad0e627e9349a09d849182cd3820f722.ipfscdn.io/ipfs/bafybeidkh4gxgjb57xqcbqq3ojh63tmzrw7sfkmk7uyioldya7fkic4u64/",
      description: "Basic Gun Pack",
    };
    const erc1155Rewards = [
      {
        contractAddress: EDITION_CONTRACT_ADDRESS,
        tokenId: BigInt(0),
        quantityPerReward: 1,
        totalRewards: 1,
      },
      {
        contractAddress: EDITION_CONTRACT_ADDRESS,
        tokenId: BigInt(1),
        quantityPerReward: 1,
        totalRewards: 1,
      },
      {
        contractAddress: EDITION_CONTRACT_ADDRESS,
        tokenId: BigInt(2),
        quantityPerReward: 1,
        totalRewards: 1,
      },
    ];
    
    // Debug: log the pack parameters before sending
    console.log("Pack metadata:", packMetadata);
    console.log("ERC1155 rewards:", erc1155Rewards);
    console.log("Amount distributed per open:", BigInt(1));
    
    // Change amountDistributedPerOpen to BigInt(1) to match totalRewards for each reward
    const transactionPack = createNewPack({
      contract: contractPack,
      client,
      recipient: account.address,
      tokenOwner: account.address,
      packMetadata,
      openStartTimestamp: new Date(),
      erc1155Rewards,
      amountDistributedPerOpen: BigInt(1),
    });
    
    // Debug: log the transaction pack object (input details)
    console.log("Pack transaction object:", transactionPack);

    console.log("Sending transaction for creating a new pack...");
    const dataPack = await sendAndConfirmTransaction({
      transaction: transactionPack,
      account,
    });
    
    console.log(`Pack Transaction hash: ${dataPack.transactionHash}`);
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

main();