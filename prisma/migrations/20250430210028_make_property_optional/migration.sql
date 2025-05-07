-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_buildingPermitId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_ownershipTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_parkingSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_propertyStatusId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_subcategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_transactionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_zoneId_fkey";

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "subcategoryId" DROP NOT NULL,
ALTER COLUMN "ownershipTypeId" DROP NOT NULL,
ALTER COLUMN "transactionTypeId" DROP NOT NULL,
ALTER COLUMN "propertyStatusId" DROP NOT NULL,
ALTER COLUMN "buildingPermitId" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "zipCode" DROP NOT NULL,
ALTER COLUMN "roadAccess" DROP NOT NULL,
ALTER COLUMN "zoneId" DROP NOT NULL,
ALTER COLUMN "parkingSpaceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownershipTypeId_fkey" FOREIGN KEY ("ownershipTypeId") REFERENCES "OwnershipType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "TransactionType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_propertyStatusId_fkey" FOREIGN KEY ("propertyStatusId") REFERENCES "PropertyStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_buildingPermitId_fkey" FOREIGN KEY ("buildingPermitId") REFERENCES "BuildingPermit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
