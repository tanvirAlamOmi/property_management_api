/*
  Warnings:

  - You are about to drop the column `landSizeId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `LandSize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_landSizeId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "landSizeId",
ADD COLUMN     "landSize" DOUBLE PRECISION,
ADD COLUMN     "landUnitId" INTEGER;

-- DropTable
DROP TABLE "LandSize";

-- CreateTable
CREATE TABLE "LandUnit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "LandUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandUnit_name_key" ON "LandUnit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LandUnit_symbol_key" ON "LandUnit"("symbol");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_landUnitId_fkey" FOREIGN KEY ("landUnitId") REFERENCES "LandUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
