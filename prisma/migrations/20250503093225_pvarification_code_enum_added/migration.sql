/*
  Warnings:

  - Changed the type of `type` on the `VerificationCode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ValidationCodeType" AS ENUM ('RESET', 'REGISTER');

-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "type",
ADD COLUMN     "type" "ValidationCodeType" NOT NULL;
