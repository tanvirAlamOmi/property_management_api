/*
  Warnings:

  - The `buildingYear` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `livingSpace` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `kitchen` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `utilitiesIncluded` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `servicesIncluded` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `additionalFeatures` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "buildingYear",
ADD COLUMN     "buildingYear" INTEGER,
DROP COLUMN "livingSpace",
ADD COLUMN     "livingSpace" JSONB[],
DROP COLUMN "kitchen",
ADD COLUMN     "kitchen" JSONB[],
DROP COLUMN "utilitiesIncluded",
ADD COLUMN     "utilitiesIncluded" JSONB[],
DROP COLUMN "servicesIncluded",
ADD COLUMN     "servicesIncluded" JSONB[],
DROP COLUMN "additionalFeatures",
ADD COLUMN     "additionalFeatures" JSONB[];
