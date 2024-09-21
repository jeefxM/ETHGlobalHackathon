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
import { getCollections } from "../lib/prismaFunctions";
import useSWR from "swr";
import Image from "next/image";
import { useOwnedNFTs } from "@thirdweb-dev/react";
import CommunityBox from "./CommunityBox";

const data = [
  {
    name: "Airgate",
    description: "Token gated discord groups",
    image: "",
    address: "123123",
  },
  {
    name: "Airgate",
    description: "Token gated discord groups",
    image: "",
    address: "123123",
  },
  {
    name: "Airgate",
    description: "Token gated discord groups",
    image: "",
    address: "123123",
  },
  {
    name: "Airgate",
    description: "Token gated discord groups",
    image: "",
    address: "123123",
  },
  {
    name: "Airgate",
    description: "Token gated discord groups",
    image: "",
    address: "123123",
  },
  {
    name: "Airgate",
    description: "Token gated discord groups",
    image: "",
    address: "123123",
  },
];

const fetcher = async () => {
  const data = await getCollections();
  return data;
};

const Hero = () => {
  // const uploadUserInDB = async () => {
  // const addres = useAddress();
  //   await createUser(addres);
  // };
  const { data: collections, error } = useSWR("collections", fetcher);

  console.log(collections);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-28 gap-14">
      <h1 className="font-medium text-6xl">{`Token gated discord groups`}</h1>
      <div className="flex flex-row gap-4 flex-wrap">
        {collections &&
          collections!.map((item, index) => (
            <CommunityBox index={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Hero;
