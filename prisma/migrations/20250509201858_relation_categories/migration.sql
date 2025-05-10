-- CreateTable
CREATE TABLE "_CategoryTransactionType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryTransactionType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryPropertyStatus" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryPropertyStatus_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryOwnershipType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryOwnershipType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryBuildingPermit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryBuildingPermit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryTransactionType_B_index" ON "_CategoryTransactionType"("B");

-- CreateIndex
CREATE INDEX "_CategoryPropertyStatus_B_index" ON "_CategoryPropertyStatus"("B");

-- CreateIndex
CREATE INDEX "_CategoryOwnershipType_B_index" ON "_CategoryOwnershipType"("B");

-- CreateIndex
CREATE INDEX "_CategoryBuildingPermit_B_index" ON "_CategoryBuildingPermit"("B");

-- AddForeignKey
ALTER TABLE "_CategoryTransactionType" ADD CONSTRAINT "_CategoryTransactionType_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryTransactionType" ADD CONSTRAINT "_CategoryTransactionType_B_fkey" FOREIGN KEY ("B") REFERENCES "TransactionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryPropertyStatus" ADD CONSTRAINT "_CategoryPropertyStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryPropertyStatus" ADD CONSTRAINT "_CategoryPropertyStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryOwnershipType" ADD CONSTRAINT "_CategoryOwnershipType_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryOwnershipType" ADD CONSTRAINT "_CategoryOwnershipType_B_fkey" FOREIGN KEY ("B") REFERENCES "OwnershipType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryBuildingPermit" ADD CONSTRAINT "_CategoryBuildingPermit_A_fkey" FOREIGN KEY ("A") REFERENCES "BuildingPermit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryBuildingPermit" ADD CONSTRAINT "_CategoryBuildingPermit_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
