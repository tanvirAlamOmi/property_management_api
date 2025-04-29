// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Categories and Subcategories
  const residential = await prisma.category.upsert({
    where: { name: 'Residential' },
    update: {},
    create: {
      name: 'Residential',
      subcategories: {
        create: [
          { name: 'Villa' },
          { name: 'House' },
          { name: 'Apartment' },
          { name: 'Townhouse' },
        ],
      },
    },
  });

  const land = await prisma.category.upsert({
    where: { name: 'Land' },
    update: {},
    create: {
      name: 'Land',
      subcategories: {
        create: [
          { name: 'Development Land' },
          { name: 'Agricultural Land' },
          { name: 'Rice Field' },
        ],
      },
    },
  });

  const commercial = await prisma.category.upsert({
    where: { name: 'Commercial' }, // Fixed "Resedential" typo to "Commercial"
    update: {},
    create: {
      name: 'Commercial',
      subcategories: {
        create: [
          { name: 'Shop' },
          { name: 'Restaurant' },
          { name: 'Cafe' },
          { name: 'Ruko' },
        ],
      },
    },
  });

  const development = await prisma.category.upsert({
    where: { name: 'Development' },
    update: {},
    create: {
      name: 'Development',
      subcategories: {
        create: [
          { name: 'Off-Plan Projects' },
        ],
      },
    },
  });

  // Transaction Types
  await prisma.transactionType.upsert({
    where: { name: 'Sale' },
    update: {},
    create: {
      name: 'Sale',
      propertyStatus: {
        create: [
          { name: 'Freehold' },
          { name: 'Leasehold' },
        ],
      },
    },
  });

  await prisma.transactionType.upsert({
    where: { name: 'Rental' },
    update: {},
    create: {
      name: 'Rental',
      propertyStatus: {
        create: [
          { name: 'Monthly' },
          { name: 'Yearly' },
        ],
      },
    },
  });

  // Ownership Types
  const ownershipTypes = [
    'Freehold (Hak Milik)',
    'Leasehold (Hak Sewa)',
    'Right of Use (Hak Pakai)',
    'Strata Title',
    'Right to Build (HGB / Hak Guna Bangunan)',
  ];

  for (const name of ownershipTypes) {
    await prisma.ownershipType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Building Permits
  const buildingPermits = [
    'PBG (Persetujuan Bangunan Gedung)',
    'SLF (Sertifikat Laik Fungsi)',
  ];

  for (const name of buildingPermits) {
    await prisma.buildingPermit.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

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
    'Yellow',
    'Green',
    'Red',
  ];

  for (const name of zone) {
    await prisma.zone.upsert({
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