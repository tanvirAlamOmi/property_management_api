-- CreateEnum
CREATE TYPE "PoolType" AS ENUM ('IN_GROUND', 'ABOVE_GROUND', 'INFINITY', 'LAP', 'PLUNGE');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "pool" BOOLEAN DEFAULT false,
ADD COLUMN     "poolSize" DOUBLE PRECISION,
ADD COLUMN     "poolType" "PoolType";
