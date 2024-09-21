-- CreateTable
CREATE TABLE "nftCollectionSchema" (
    "id" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "collectionName" TEXT NOT NULL,
    "collectionDescription" TEXT NOT NULL,
    "collectionImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "creatorWalletAddress" TEXT NOT NULL,
    "collectionAddress" TEXT NOT NULL,

    CONSTRAINT "nftCollectionSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nftSchema" (
    "id" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "mintPrice" INTEGER NOT NULL,
    "mintSupply" INTEGER NOT NULL,
    "mintSupplyLeft" INTEGER,
    "scarcity" TEXT,
    "creatorAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "collectionAddress" TEXT NOT NULL,

    CONSTRAINT "nftSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nftSchema_imageUrl_key" ON "nftSchema"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- AddForeignKey
ALTER TABLE "nftCollectionSchema" ADD CONSTRAINT "nftCollectionSchema_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nftSchema" ADD CONSTRAINT "nftSchema_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "nftCollectionSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nftSchema" ADD CONSTRAINT "nftSchema_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
