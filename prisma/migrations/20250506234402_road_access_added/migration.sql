/*
  Warnings:

  - The values [EXCELLENT,GOOD,FAIR,POOR] on the enum `RoadAccess` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoadAccess_new" AS ENUM ('DIRECT_PUBLIC_ROAD_ACCESS', 'DIRECT_PRIVATE_ROAD_ACCESS', 'SHARED_ACCESS', 'GATED_ACCESS', 'NO_DIRECT_ROAD_ACCESS');
ALTER TABLE "Property" ALTER COLUMN "roadAccess" TYPE "RoadAccess_new" USING ("roadAccess"::text::"RoadAccess_new");
ALTER TYPE "RoadAccess" RENAME TO "RoadAccess_old";
ALTER TYPE "RoadAccess_new" RENAME TO "RoadAccess";
DROP TYPE "RoadAccess_old";
COMMIT;
