import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.subcategory.deleteMany();
  await prisma.propertyStatus.deleteMany();
  await prisma.transactionType.deleteMany();
  await prisma.ownershipType.deleteMany();
  await prisma.buildingPermit.deleteMany();
  await prisma.category.deleteMany();

  // Categories and Subcategories 
await prisma.category.createMany({
      data: [
        { name: 'Residential' },
        { name: 'Land' },
        { name: 'Commercial' },
        { name: 'Development' },
      ],
    });

    // Seed subcategories
    await prisma.subcategory.createMany({
      data: [
        { name: 'Villa', categoryId: 1 },
        { name: 'House', categoryId: 1 },
        { name: 'Apartment', categoryId: 1 },
        { name: 'Townhouse', categoryId: 1 },
        { name: 'Development Land', categoryId: 2 },
        { name: 'Agricultural Land', categoryId: 2 },
        { name: 'Rice Field', categoryId: 2 },
        { name: 'Shop', categoryId: 3 },
        { name: 'Restaurant', categoryId: 3 },
        { name: 'Cafe', categoryId: 3 },
        { name: 'Ruko', categoryId: 3 },
        { name: 'Off-Plan Projects', categoryId: 4 },
      ],
    });

  // Transaction Types
  const transactionTypes = await prisma.transactionType.createMany({
      data: [
        { name: 'Sale' },
        { name: 'Rental' },
      ],
    });

    // Seed property statuses
    const propertyStatuses = await prisma.propertyStatus.createMany({
      data: [
        { name: 'Freehold', transactionTypeId: 1 },
        { name: 'Leasehold', transactionTypeId: 1 },
        { name: 'Monthly', transactionTypeId: 2 },
        { name: 'Yearly', transactionTypeId: 2 },
      ],
    });

  // Ownership Types
 await prisma.ownershipType.createMany({
      data: [
        { name: 'Freehold (Hak Milik)' },
        { name: 'Leasehold (Hak Sewa)' },
        { name: 'Right of Use (Hak Pakai)' },
        { name: 'Strata Title' },
        { name: 'Right to Build (HGB / Hak Guna Bangunan)' },
      ],
    });

  // Building Permits
 await prisma.buildingPermit.createMany({ 
      data: [
        { name: 'PBG (Persetujuan Bangunan Gedung)' },
        { name: 'SLF (Sertifikat Laik Fungsi)' },
      ],
    });

    await prisma.transactionType.update({
      where: { id: 1 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        },
      },
    });
    await prisma.transactionType.update({
      where: { id: 2 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 3 }],
        },
      },
    });

    // Connect categories to property statuses
    await prisma.propertyStatus.update({
      where: { id: 1 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        },
      },
    });
    await prisma.propertyStatus.update({
      where: { id: 2 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        },
      },
    });
    await prisma.propertyStatus.update({
      where: { id: 3 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 3 }],
        },
      },
    });
    await prisma.propertyStatus.update({
      where: { id: 4 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 3 }],
        },
      },
    });

    // Connect categories to ownership types
    await prisma.ownershipType.update({
      where: { id: 1 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        },
      },
    });
    await prisma.ownershipType.update({
      where: { id: 2 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        },
      },
    });
    await prisma.ownershipType.update({
      where: { id: 3 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
        },
      },
    });
    await prisma.ownershipType.update({
      where: { id: 4 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 3 }],
        },
      },
    });
    await prisma.ownershipType.update({
      where: { id: 5 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        },
      },
    });

    // Connect categories to building permits
    await prisma.buildingPermit.update({
      where: { id: 1 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 3 }, { id: 4 }],
        },
      },
    });
    await prisma.buildingPermit.update({
      where: { id: 2 },
      data: {
        categories: {
          connect: [{ id: 1 }, { id: 3 }, { id: 4 }],
        },
      },
    });

   // Building Permits
   const parkingSpace = [
    'Car',
    'Bike',
  ];

  for (const name of parkingSpace) {
    await prisma.parkingSpace.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const zone = [
    'Green Zone',
    'Yellow Zone',
    'Red Zone',
    'Pink Zone',
    'Orange Zone',
    'Blue Zone',
  ];

  for (const name of zone) {
    await prisma.zone.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const furnishing = [
    'Furnished',
    'Unfurnished'
  ];

  for (const name of furnishing) {
    await prisma.furnishing.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const roadAccess = [
    'Direct Public Road Access',
    'Direct Private Road Access',
    'Shared Access',
    'Gated Access',
    'No Direct Road Access' 
  ];

  for (const name of roadAccess) {
    await prisma.roadAccess.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }


  const poolType = [
    'In-ground',
    'Above-ground'
  ];

  for (const name of poolType) {
    await prisma.poolType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const landSize = [
    'are (a)',
    'm²',
    'ft²'
  ];

  for (const name of landSize) {
    await prisma.landSize.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });