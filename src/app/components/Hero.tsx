"use client";
import {
  ConnectWallet,
  ThirdwebSDK,
  useAddress,
  useSigner,
  Web3Button,
} from "@thirdweb-dev/react";
import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateCollection from "./CreateCollection";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { getCollections, getUser } from "../lib/prismaFunctions";
import useSWR from "swr";
import Image from "next/image";
import { useOwnedNFTs } from "@thirdweb-dev/react";
import CommunityBox from "./CommunityBox";
import YourCommunities from "./YourCommunities";

const fetcher = async () => {
  const data = await getCollections();
  return data;
};

const userFetcher = async (address: string) => {
  const data = await getUser(address);
  return data;
};

const Hero = () => {
  const address = useAddress();

  const { data: collections, error } = useSWR("collections", fetcher);
  const { data: user, isLoading } = useSWR(address, userFetcher);

  if (!isLoading) {
    console.log("user", user);
  }

  return (
    <div className={`font-kmrRegular`}>
      {user && <YourCommunities user={user} />}
      <div className="flex flex-col justiy w-full items-start gap-14">
        <p className="text-4xl text-center f font-kmr font-kmrRegular">{`Popular communities`}</p>
        <div className="flex flex-row gap-4 flex-wrap justify-start">
          {collections &&
            collections.map((item, index) => (
              <CommunityBox
                key={index}
                index={index}
                item={item}
                address={address ? address : ""}
                userId={user ? user.id : ""}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
