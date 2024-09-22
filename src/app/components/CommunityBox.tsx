import React, { useState } from "react";
import Image from "next/image";
import { useAddress, useNFTBalance, Web3Button } from "@thirdweb-dev/react";
import { useOwnedNFTs } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import Link from "next/link";
import { claimNft } from "../lib/prismaFunctions";

interface Item {
  id: string;
  ownerAddress: string;
  collectionName: string;
  collectionDescription: string;
  collectionImage: string;
  createdAt: Date;
  creatorId: string;
  creatorWalletAddress: string;
  collectionAddress: string;
  tokenId: string;
  discordLink: string;
  ownerId: string | null;
}

interface CommunityBoxProps {
  index: number;
  item: Item;
  address: string;
  userId: string;
}

const CommunityBox: React.FC<CommunityBoxProps> = ({
  index,
  item,
  address,
  userId,
}) => {
  const [value, setValue] = useState(false);
  const { contract } = useContract(item.collectionAddress);
  const { data: ownsNft, error } = useNFTBalance(
    contract,
    address,
    item.tokenId
  );

  console.log(ownsNft?.toNumber(), "owns");

  // console.log(item);

  // console.log("owns", ownsNft);
  return (
    <div
      key={index}
      className="w-[300px] h-[250px] rounded-3xl bg-[#F7E7F9] relative overflow-hidden group"
    >
      <Image
        src={item.collectionImage}
        alt="Collection Image"
        layout="fill"
        objectFit="cover"
        className="rounded-3xl group-hover:opacity-0 transition-opacity duration-300"
      />
      <div className="absolute inset-0 flex  items-center justify-center p-4 bg-[#F7E7F9] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {ownsNft?.toNumber() ? (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-xl font-semibold">{item.collectionName}</p>
            <Link
              className="bg-[#71237A] text-white px-6 py-2 rounded-[40px] max-w-[200px] text-center whitespace-nowrap overflow-hidden text-ellipsis"
              href={`https://${item.discordLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discord
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center font-semibold">
            {item.collectionName}
            <Web3Button
              contractAddress={item.collectionAddress}
              action={(contract) => {
                contract.erc1155.claim(item.tokenId, 1);
                claimNft(userId, item.id);
              }}
              // className="bg-transparent"
              style={{
                backgroundColor: "#71237A",
                color: "white",
                padding: "0.5rem 1.5rem",
                borderRadius: "40px",
                maxWidth: "200px",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Mint
            </Web3Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityBox;
