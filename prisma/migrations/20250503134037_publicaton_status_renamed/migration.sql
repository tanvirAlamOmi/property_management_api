/*
  Warnings:

  - The `landSize` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LandSize" AS ENUM ('ARES', 'HECTARES');

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "landSize",
ADD COLUMN     "landSize" "LandSize";
