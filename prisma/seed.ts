import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // Seed categories
  const categoryData: Prisma.CategoryCreateInput[] = [
    { name: 'Residential' },
    { name: 'Land' },
    { name: 'Commercial' },
    { name: 'Development' },
  ];

  const categories: { id: number; name: string }[] = [];
  for (const cat of categoryData) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name },
      select: { id: true, name: true },
    });
    categories.push(category);
  }

  // Map category names to IDs with null checks
  const categoryIds: { [key: string]: number } = {
    Residential: categories.find((c) => c.name === 'Residential')?.id ?? (await prisma.category.create({ data: { name: 'Residential' } })).id,
    Land: categories.find((c) => c.name === 'Land')?.id ?? (await prisma.category.create({ data: { name: 'Land' } })).id,
    Commercial: categories.find((c) => c.name === 'Commercial')?.id ?? (await prisma.category.create({ data: { name: 'Commercial' } })).id,
    Development: categories.find((c) => c.name === 'Development')?.id ?? (await prisma.category.create({ data: { name: 'Development' } })).id,
  };

  // Seed subcategories
  const subcategoryData = [
    { name: 'Villa', categoryId: categoryIds.Residential },
    { name: 'House', categoryId: categoryIds.Residential },
    { name: 'Apartment', categoryId: categoryIds.Residential },
    { name: 'Townhouse', categoryId: categoryIds.Residential },
    { name: 'Development Land', categoryId: categoryIds.Land },
    { name: 'Agricultural Land', categoryId: categoryIds.Land },
    { name: 'Rice Field', categoryId: categoryIds.Land },
    { name: 'Shop', categoryId: categoryIds.Commercial },
    { name: 'Restaurant', categoryId: categoryIds.Commercial },
    { name: 'Cafe', categoryId: categoryIds.Commercial },
    { name: 'Ruko', categoryId: categoryIds.Commercial },
    { name: 'Off-Plan Projects', categoryId: categoryIds.Development },
  ];

  for (const sub of subcategoryData) {
    await prisma.subcategory.upsert({
      where: { name: sub.name },
      update: {
        category: {
          connect: { id: sub.categoryId },
        },
      },
      create: {
        name: sub.name,
        category: {
          connect: { id: sub.categoryId },
        },
      },
    });
  }

  // Seed transaction types
  const transactionTypeData: { name: string; categoryIds: number[] }[] = [
    { name: 'Sale', categoryIds: [categoryIds.Residential, categoryIds.Land, categoryIds.Commercial, categoryIds.Development] },
    { name: 'Rental', categoryIds: [categoryIds.Residential, categoryIds.Commercial] },
  ];

  const transactionTypes: { id: number; name: string }[] = [];
  for (const tt of transactionTypeData) {
    const transactionType = await prisma.transactionType.upsert({
      where: { name: tt.name },
      update: {
        categories: {
          set: tt.categoryIds.map((id) => ({ id })),
        },
      },
      create: {
        name: tt.name,
        categories: {
          connect: tt.categoryIds.map((id) => ({ id })),
        },
      },
      select: { id: true, name: true },
    });
    transactionTypes.push(transactionType);
  }

  // Map transaction type names to IDs with null checks
  const transactionTypeIds: { [key: string]: number } = {
    Sale: transactionTypes.find((tt) => tt.name === 'Sale')?.id ?? (await prisma.transactionType.create({ data: { name: 'Sale' } })).id,
    Rental: transactionTypes.find((tt) => tt.name === 'Rental')?.id ?? (await prisma.transactionType.create({ data: { name: 'Rental' } })).id,
  };

  // Seed property statuses
  const propertyStatusData: { name: string; transactionTypeId: number; categoryIds: number[] }[] = [
    { name: 'Freehold', transactionTypeId: transactionTypeIds.Sale, categoryIds: [categoryIds.Residential, categoryIds.Land, categoryIds.Commercial, categoryIds.Development] },
    { name: 'Leasehold', transactionTypeId: transactionTypeIds.Sale, categoryIds: [categoryIds.Residential, categoryIds.Land, categoryIds.Commercial, categoryIds.Development] },
    { name: 'Monthly', transactionTypeId: transactionTypeIds.Rental, categoryIds: [categoryIds.Residential, categoryIds.Commercial] },
    { name: 'Yearly', transactionTypeId: transactionTypeIds.Rental, categoryIds: [categoryIds.Residential, categoryIds.Commercial] },
  ];

  for (const ps of propertyStatusData) {
    await prisma.propertyStatus.upsert({
      where: { name: ps.name },
      update: {
        transactionTypeId: ps.transactionTypeId,
        categories: {
          set: ps.categoryIds.map((id) => ({ id })),
        },
      },
      create: {
        name: ps.name,
        transactionTypeId: ps.transactionTypeId,
        categories: {
          connect: ps.categoryIds.map((id) => ({ id })),
        },
      },
    });
  }

  // Seed ownership types
  const ownershipTypeData: { name: string; categoryIds: number[] }[] = [
    { name: 'Freehold (Hak Milik)', categoryIds: [categoryIds.Residential, categoryIds.Land, categoryIds.Commercial, categoryIds.Development] },
    { name: 'Leasehold (Hak Sewa)', categoryIds: [categoryIds.Residential, categoryIds.Land, categoryIds.Commercial, categoryIds.Development] },
    { name: 'Right of Use (Hak Pakai)', categoryIds: [categoryIds.Residential, categoryIds.Land, categoryIds.Commercial] },
    { name: 'Strata Title', categoryIds: [categoryIds.Residential, categoryIds.Commercial] },
    { name: 'Right to Build (HGB / Hak Guna Bangunan)', categoryIds: [categoryIds.Residential, categoryIds.Land, categoryIds.Commercial, categoryIds.Development] },
  ];

  for (const ot of ownershipTypeData) {
    await prisma.ownershipType.upsert({
      where: { name: ot.name },
      update: {
        categories: {
          set: ot.categoryIds.map((id) => ({ id })),
        },
      },
      create: {
        name: ot.name,
        categories: {
          connect: ot.categoryIds.map((id) => ({ id })),
        },
      },
    });
  }

  // Seed building permits
  const buildingPermitData: { name: string; categoryIds: number[] }[] = [
    { name: 'PBG (Persetujuan Bangunan Gedung)', categoryIds: [categoryIds.Residential, categoryIds.Commercial, categoryIds.Development] },
    { name: 'SLF (Sertifikat Laik Fungsi)', categoryIds: [categoryIds.Residential, categoryIds.Commercial, categoryIds.Development] },
  ];

  for (const bp of buildingPermitData) {
    await prisma.buildingPermit.upsert({
      where: { name: bp.name },
      update: {
        categories: {
          set: bp.categoryIds.map((id) => ({ id })),
        },
      },
      create: {
        name: bp.name,
        categories: {
          connect: bp.categoryIds.map((id) => ({ id })),
        },
      },
    });
  }

  // Seed parking spaces
  const parkingSpaceData = ['Car', 'Bike'];

  for (const name of parkingSpaceData) {
    await prisma.parkingSpace.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Seed zones
  const zoneData = ['Green Zone', 'Yellow Zone', 'Red Zone', 'Pink Zone', 'Orange Zone', 'Blue Zone'];

  for (const name of zoneData) {
    await prisma.zone.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Seed furnishings
  const furnishingData = ['Furnished', 'Unfurnished'];

  for (const name of furnishingData) {
    await prisma.furnishing.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Seed road access
  const roadAccessData = [
    'Direct Public Road Access',
    'Direct Private Road Access',
    'Shared Access',
    'Gated Access',
    'No Direct Road Access',
  ];

  for (const name of roadAccessData) {
    await prisma.roadAccess.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Seed pool types
  const poolTypeData = ['In-ground', 'Above-ground'];

  for (const name of poolTypeData) {
    await prisma.poolType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Seed land sizes
  const landSizeData = ['are (a)', 'm²', 'ft²'];

  for (const name of landSizeData) {
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