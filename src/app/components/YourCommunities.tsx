import { useOwnedNFTs, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import React from "react";

interface OwnedNFT {
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

interface User {
  ownedNfts: OwnedNFT[];
}

interface YourCommunitiesProps {
  user: User;
}

const YourCommunities: React.FC<YourCommunitiesProps> = ({ user }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Address copied to clipboard!");
  };

  return (
    <div className="my-16 flex flex-wrap gap-4 justify-center flex-col">
      <p className="text-4xl font-kmrBold">Your Communites</p>

      <div className="flex flex-row gap-4 flex-wrap">
        {user.ownedNfts.map((nft) => (
          <div
            key={nft.id}
            className="w-[300px] h-[290px] rounded-3xl bg-[#F7E7F9] relative overflow-hidden group"
          >
            <Image
              src={nft.collectionImage}
              alt="Collection Image"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl group-hover:opacity-0 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex flex-col p-4 bg-[#fff] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-xl font-semibold">{nft.collectionName}</h2>

              <button
                onClick={() => copyToClipboard(nft.collectionAddress)}
                className="bg-[#71237A] text-white px-4 py-2 rounded-[40px] mt-auto"
              >
                Join Discord
              </button>
              <button
                onClick={() => copyToClipboard(nft.collectionAddress)}
                className="bg-[#71237A] text-white px-4 py-2 rounded-[40px] mt-auto"
              >
                Copy Address
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourCommunities;
