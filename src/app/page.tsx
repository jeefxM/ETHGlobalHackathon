"use client";
import Image from "next/image";
import Hero from "./components/Hero";
import HeadComponent from "./components/HeadComponent";
import { getUser } from "./lib/prismaFunctions";
import { use, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();

  const getUserId = async () => {
    if (address) {
      const user = await getUser(address!);
      console.log(user);
      return user;
    }
  };

  useEffect(() => {
    getUserId();
  }, [address]);
  return (
    <div className="max-w-screen-lg min-h-screen mx-auto p-4">
      <HeadComponent />

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
      </main>
    </div>
  );
}
