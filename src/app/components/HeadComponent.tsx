import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConnectWallet } from "@thirdweb-dev/react";
import CreateCollection from "./CreateCollection";
import { CiCirclePlus } from "react-icons/ci";
import Logo from "../../../public/logo.svg";
import Image from "next/image";

const HeadComponent = () => {
  return (
    <div className="flex flex-row justify-between items-center fo font-s font-sans">
      <div>
        <Image src={Logo} alt="Airgate Logo" width={120} height={36} />
        {/* <p>Airgate</p> */}
      </div>
      <div className="flex gap-5 items-center font-sans">
        <Dialog>
          <DialogTrigger className="flex items-center gap-1 text-lg">
            <CiCirclePlus size={32} /> Create
          </DialogTrigger>
          <DialogContent className="h-[80%] overflow-y-auto font-sans">
            <CreateCollection />
          </DialogContent>
        </Dialog>

        <ConnectWallet
          className="bg-[#999] font-sans"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #71237A",
            color: "#71237A",
            borderRadius: "38px",
            fontFamily: "sans-serif",
          }}
          btnTitle="Connect Wallet"
          switchToActiveChain
          theme="light"
        />
      </div>
    </div>
  );
};

export default HeadComponent;
