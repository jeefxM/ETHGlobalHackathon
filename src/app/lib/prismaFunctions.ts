"use server";

import prisma from "./prisma";

// export const uploadNftCollectionToDB = async (
//     ownerAddress: string,
//     collectionName: string,
//     collectionDescription: string,
//     collectionImage: string,
//     creatorId: string,
//     creatorWalletAddress: string,
//     collectionAddress: string,
//     nfts: any[] // Replace `any` with the type of your NFTs
//   ) => {
//     await prisma.nftCollectionSchema.create({
//       data: {
//         ownerAddress,
//         collectionName,
//         collectionDescription,
//         collectionImage,
//         creatorId,
//         creatorWalletAddress,
//         collectionAddress,
//         nfts: {
//           create: nfts, // This assumes that `nfts` is an array of objects that match the `nftSchema` model
//         },
//       },
//     })
//   }

export const createUser = async (address: string) => {
  try {
    const data = await prisma.user.create({
      data: {
        address: address,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const uploadCollectionToDb = async (
  ownerAddress: string,
  collectionName: string,
  collectionAddress: string,
  collectionImage: string,
  creatorId: string,
  collectionDescription: string,
  tokenId: string,
  discordLink: string
) => {
  try {
    const data = await prisma.nftCollectionSchema.create({
      data: {
        ownerAddress: ownerAddress,
        collectionName: collectionName,
        collectionAddress: collectionAddress,
        collectionImage: collectionImage,
        creatorWalletAddress: ownerAddress,
        creatorId: creatorId,
        collectionDescription: collectionDescription,
        tokenId: tokenId,
        discordLink: discordLink,
      },
    });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (address: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        address: address,
      },
      include: {
        ownedNfts: true,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getCollections = async () => {
  try {
    const data = await prisma.nftCollectionSchema.findMany({});
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const claimNft = async (userId: string, nftId: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ownedNfts: {
          connect: { id: nftId },
        },
      },
    });
    return updatedUser;
  } catch (err) {
    console.log(err);
  }
};
