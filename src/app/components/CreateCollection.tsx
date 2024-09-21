import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  ConnectWallet,
  ThirdwebSDK,
  useAddress,
  useSigner,
} from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";

import { SDKOptions } from "@thirdweb-dev/react";
import { ThirdwebClient } from "../lib/constants";
import { createUser, getUser } from "../lib/prismaFunctions";
import { uploadCollectionToDb } from "../lib/prismaFunctions";
import useSWR from "swr";
import { AirdaoTestnet } from "@thirdweb-dev/chains";
import { useEdgeStore } from "@/lib/edgestore";

const fetcher = async (address: string) => {
  const user = await getUser(address);
  return user;
};

const CreateCollection = () => {
  const address = useAddress();
  const { edgestore } = useEdgeStore();

  const { data: user, error } = useSWR(address ? address : null, fetcher);

  const signer = useSigner();
  const schema = z.object({
    nftName: z.string().min(3).max(50),
    nftDescription: z.string().optional(),
    discordLink: z.string(),
    collectionAddress: z.string().min(42).max(42),
    price: z.string().min(0),
    nftImage: z.instanceof(File),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  console.log(form.formState);

  const DeployERC721Contract = async (
    collectionData: z.infer<typeof schema>
  ) => {
    // console.log(collectionData.nftImage);
    const res = await edgestore.publicFiles.upload({
      file: collectionData.nftImage,
    });
    console.log(res);
    const sdk = await ThirdwebSDK.fromSigner(signer!, AirdaoTestnet, {
      clientId: ThirdwebClient,
    });
    // const contract = await sdk.deployer.deployEdition({
    //   name: collectionData.nftName,
    //   primary_sale_recipient: address!,
    // });
    if (!user) {
      await createUser(address!);
    }

    try {
      const editionDrop = await sdk.getContract(
        collectionData.collectionAddress,
        "edition-drop"
      );

      const nextTokenId = await editionDrop?.erc1155.nextTokenIdToMint();
      await editionDrop?.erc1155.lazyMint([
        {
          name: collectionData.nftName,
          description: collectionData.nftDescription || "",
          owner: address!,
          image: res.url,
        },
      ]);
      try {
        const recipt = await editionDrop.erc1155.claimConditions.set(
          nextTokenId,
          [
            {
              metadata: {
                name: "title",
              },
              price: collectionData.price,
              maxClaimablePerWallet: 1,
              maxClaimableSupply: 1000,
              startTime: new Date(),
              waitInSeconds: 60 * 60 * 24 * 7,
            },
          ],
          false
        );

        console.log(recipt);
        const user = await getUser(address!);
        if (user) {
          await uploadCollectionToDb(
            address!,
            collectionData.nftName,
            collectionData.collectionAddress,
            res.url,
            user.id,
            collectionData.nftDescription || "",
            nextTokenId.toString(),
            collectionData.discordLink
          );
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (collectionData: z.infer<typeof schema>) => {
    await DeployERC721Contract(collectionData);
  };

  return (
    <div>
      <Form {...form}>
        <div className="flex justify-between">
          <p className="ali text-semibold flex justify-center align-middle text-xl">
            Create Your Tokengated NFT
          </p>
        </div>
        <p>{``}</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="nftName"
            render={({ field }) => (
              <FormItem className="pt-5">
                <FormLabel className="">NFT Name</FormLabel>
                <FormControl>
                  <Input placeholder="Collection name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nftDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFT description (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Collection description" />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nftImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFT Image</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discordLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discord Link</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Discord link" />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collectionAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Collection address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (in AMB)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    placeholder="Price in AMB"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {address && (
            <p className=" text-sm font-semibold">
              {`Collection Owner's Wallet address`}
              {address!.slice(0, 4) + "..." + address!.slice(-4)}
            </p>
          )}

          <ConnectWallet switchToActiveChain />
          <div>
            {address && (
              <Button type="submit">
                {form.formState.isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCollection;
