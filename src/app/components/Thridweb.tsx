"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import {
  Arbitrum,
  Polygon,
  Airdao,
  BinanceTestnet,
  AirdaoTestnet,
} from "@thirdweb-dev/chains";
import {
  coinbaseWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  smartWallet,
  trustWallet,
} from "@thirdweb-dev/react";

import { ThirdwebClient } from "../lib/constants";

// Dynamically import ThirdwebProvider
const ThirdwebProviderDynamic = dynamic(
  () => import("@thirdweb-dev/react").then((mod) => mod.ThirdwebProvider),
  { ssr: false }
);

interface Props {
  children: ReactNode;
}

const smartWalletOptions = {
  gasless: true,
  factoryAddress: "0x80eF1a54C72f651A6527B2FF69A0879717e2c437",
};
const activeChains = [Arbitrum];

const ThirdwebAppWrapper: React.FC<Props> = ({ children }) => {
  return (
    <ThirdwebProviderDynamic
      clientId={ThirdwebClient}
      activeChain={AirdaoTestnet}
      supportedWallets={[
        // smartWallet(metamaskWallet(), smartWalletOptions),
        metamaskWallet(),
      ]}
    >
      {children}
    </ThirdwebProviderDynamic>
  );
};

export default ThirdwebAppWrapper;

// export { ThirdwebProvider } from "@thirdweb-dev/react"
