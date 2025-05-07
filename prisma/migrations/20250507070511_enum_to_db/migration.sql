/*
  Warnings:

  - You are about to drop the column `furnishing` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `landSize` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `poolType` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `roadAccess` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "furnishing",
DROP COLUMN "landSize",
DROP COLUMN "poolType",
DROP COLUMN "roadAccess",
DROP COLUMN "status",
ADD COLUMN     "furnishingId" INTEGER,
ADD COLUMN     "landSizeId" INTEGER,
ADD COLUMN     "poolTypeId" INTEGER,
ADD COLUMN     "pricePerYear" DOUBLE PRECISION,
ADD COLUMN     "publicationStatus" "PropertyPublicationStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "roadAccessId" INTEGER;

-- DropEnum
DROP TYPE "Furnishing";

-- DropEnum
DROP TYPE "LandSize";

-- DropEnum
DROP TYPE "PoolType";

-- DropEnum
DROP TYPE "RoadAccess";

-- CreateTable
CREATE TABLE "Furnishing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Furnishing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadAccess" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RoadAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoolType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PoolType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandSize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LandSize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Furnishing_name_key" ON "Furnishing"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RoadAccess_name_key" ON "RoadAccess"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PoolType_name_key" ON "PoolType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LandSize_name_key" ON "LandSize"("name");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_roadAccessId_fkey" FOREIGN KEY ("roadAccessId") REFERENCES "RoadAccess"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_landSizeId_fkey" FOREIGN KEY ("landSizeId") REFERENCES "LandSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_furnishingId_fkey" FOREIGN KEY ("furnishingId") REFERENCES "Furnishing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_poolTypeId_fkey" FOREIGN KEY ("poolTypeId") REFERENCES "PoolType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
