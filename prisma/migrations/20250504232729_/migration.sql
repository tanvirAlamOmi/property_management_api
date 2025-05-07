/*
  Warnings:

  - The `livingSpace` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `kitchen` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `utilitiesIncluded` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `servicesIncluded` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `additionalFeatures` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "livingSpace",
ADD COLUMN     "livingSpace" TEXT[],
DROP COLUMN "kitchen",
ADD COLUMN     "kitchen" TEXT[],
DROP COLUMN "utilitiesIncluded",
ADD COLUMN     "utilitiesIncluded" TEXT[],
DROP COLUMN "servicesIncluded",
ADD COLUMN     "servicesIncluded" TEXT[],
DROP COLUMN "additionalFeatures",
ADD COLUMN     "additionalFeatures" TEXT[];
