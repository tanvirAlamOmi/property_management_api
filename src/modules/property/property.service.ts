import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDraftPropertyDto, CreatePropertyDto } from './dto/create-property.dto';
import { Furnishing, LandSize, PoolType, Prisma, PropertyPublicationStatus, PropertyStatus, RoadAccess, Role, ValidationCodeType } from '@prisma/client';
import { ListPropertiesDto } from './dto/list-properties.dto';
import { join } from 'path';
import * as fs from 'fs';
import { UpdateDraftPropertyDto, UpdatePropertyDto } from './dto/update-property.dto';
import { validationError } from '../../common/helpers/validation-error.helper';

@Injectable()
export class PropertyService { 
  constructor(private prisma: PrismaService) {}
 
  private transformFeatures(features: { value: string; isDefault: boolean }[] | undefined) {
    if (!features || !Array.isArray(features)) return [];
      return features.map(feature => ({
        value: feature.value,
        isDefault: feature.isDefault,
      }));
  }

  async createProperty(dto: CreatePropertyDto | CreateDraftPropertyDto, files: Express.Multer.File[] = [], status: PropertyPublicationStatus) {
    const imagePaths = files.map(file => `/uploads/${file.filename}`);

    await this.validateIds(dto);

    const data: Prisma.PropertyUncheckedCreateInput = {
      title: dto.title,
      categoryId: dto.categoryId,
      subcategoryId: dto.subcategoryId,
      ownershipTypeId: dto.ownershipTypeId,
      transactionTypeId: dto.transactionTypeId,
      propertyStatusId: dto.propertyStatusId,
      buildingPermitId: dto.buildingPermitId,
      address: dto.address,
      location: dto.location,
      zipCode: dto.zipCode,
      googleMapLink: dto.googleMapLink,
      roadAccessId: dto.roadAccessId,
      nearbyPoints: dto.nearbyPoints || [],
      zoneId: dto.zoneId,
      landSizeId: dto.landSizeId,
      builtUpArea: dto.builtUpArea,
      pricePerUnit: dto.pricePerUnit,
      totalPrice: dto.totalPrice,
      pricePerYear: dto.pricePerYear,
      numberOfFloors: dto.numberOfFloors,
      maxRooms: dto.maxRooms,
      beds: dto.beds,
      baths: dto.baths,
      furnishingId: dto.furnishingId,
      buildingYear: dto.buildingYear,
      availableDate: dto.availableDate,
      parkingSpaceId: dto.parkingSpaceId,
      pool: dto.pool,
      poolTypeId: dto.poolTypeId,
      poolSize: dto.poolSize,
      description: dto.description,
      images: imagePaths,
      videoLink: dto.videoLink,
      livingSpace: this.transformFeatures(dto.livingSpace),
      kitchen: this.transformFeatures(dto.kitchen),
      utilitiesIncluded: this.transformFeatures(dto.utilitiesIncluded),
      servicesIncluded: this.transformFeatures(dto.servicesIncluded),
      additionalFeatures: this.transformFeatures(dto.additionalFeatures),
      publicationStatus : status
    };
  
    return await this.prisma.property.create({ data }); 
  }
 
  private async validateIds(dto: CreatePropertyDto | CreateDraftPropertyDto | UpdatePropertyDto | UpdateDraftPropertyDto) {
    const validations = [
      dto.categoryId && this.prisma.category.findUnique({ where: { id: dto.categoryId } }).then(category => {
        if (!category) {
          validationError('categoryId', `Invalid categoryId: ${dto.categoryId}`); 
        }
      }),
      dto.subcategoryId && this.prisma.subcategory.findUnique({ where: { id: dto.subcategoryId } }).then(subcategory => {
        if (!subcategory) {
          validationError('subcategoryId', `Invalid subcategoryId: ${dto.subcategoryId}`); 
        }
      }),
      dto.ownershipTypeId && this.prisma.ownershipType.findUnique({ where: { id: dto.ownershipTypeId } }).then(ownership => {
        if (!ownership) {
          validationError('ownershipTypeId', `Invalid ownershipTypeId: ${dto.ownershipTypeId}`); 
        }
      }),

      dto.transactionTypeId && this.prisma.transactionType.findUnique({ where: { id: dto.transactionTypeId } }).then(transaction => {
        if (!transaction) {
          validationError('transactionTypeId', `Invalid transactionTypeId: ${dto.transactionTypeId}`); 
        }
      }),

      dto.propertyStatusId && this.prisma.propertyStatus.findUnique({ where: { id: dto.propertyStatusId } }).then(status => {
        if (!status) {
          validationError('propertyStatusId', `Invalid propertyStatusId: ${dto.propertyStatusId}`); 
        }
      }),

      dto.buildingPermitId && this.prisma.buildingPermit.findUnique({ where: { id: dto.buildingPermitId } }).then(permit => {
        if (!permit) {
          validationError('buildingPermitId', `Invalid buildingPermitId: ${dto.buildingPermitId}`); 
        }
      }),

      dto.zoneId && this.prisma.zone.findUnique({ where: { id: dto.zoneId } }).then(zone => {
        if (!zone) {
          validationError('zoneId', `Invalid zoneId: ${dto.zoneId}`); 
        }
      }),
      dto.parkingSpaceId && this.prisma.parkingSpace.findUnique({ where: { id: dto.parkingSpaceId } }).then(parking => {
        if (!parking) {
          validationError('parkingSpaceId', `Invalid parkingSpaceId: ${dto.parkingSpaceId}`); 
        } 
      }),
    ].filter(Boolean); 
  
    await Promise.all(validations);
  }

  async listProperties(dto: ListPropertiesDto, status: PropertyPublicationStatus) {
    const { page = 1, limit = 20, search, ...filters } = dto;
    const skip = (page - 1) * limit;

     const where: Prisma.PropertyWhereInput = {
      publicationStatus: status,
      categoryId: filters.categoryId,
      subcategoryId: filters.subcategoryId,
      transactionTypeId: filters.transactionTypeId, 
      totalPrice: {
        gte: filters.totalPriceMin,
        lte: filters.totalPriceMax,
      }, 
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    try {
      const [properties, total] = await Promise.all([
        this.prisma.property.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            category: true,
            subcategory: true,
            transactionType: true 
          },
        }),
        this.prisma.property.count({ where }),
      ]);

      return {
        data: properties,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
       throw new BadRequestException(`Failed to list ${status} properties`);
    }
  }

  async deleteProperty(id: number) { 
    const existingProperty = await this.prisma.property.findUnique({
      where: { id },
      select: { images: true },
    });
    if (!existingProperty) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    try {
      await this.prisma.property.delete({ where: { id } });

      existingProperty.images.forEach(image => {
        const filePath = join(__dirname, '..', '..', image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

       return { message: `Property ID ${id} deleted successfully` };
    } catch (error) {
       throw new BadRequestException('Failed to delete property');
    }
  }

  async updateProperty(id: number, dto: UpdatePropertyDto | UpdateDraftPropertyDto , files: Express.Multer.File[] = [], status: PropertyPublicationStatus) {
    const existingProperty = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      throw new BadRequestException('Property not found');
    }

    const imagePaths = files.length > 0 ? files.map(file => `/uploads/${file.filename}`) : existingProperty.images;

    await this.validateIds(dto);

    const data = {
      title: dto.title,
      categoryId: dto.categoryId,
      subcategoryId: dto.subcategoryId,
      ownershipTypeId: dto.ownershipTypeId,
      transactionTypeId: dto.transactionTypeId,
      propertyStatusId: dto.propertyStatusId,
      buildingPermitId: dto.buildingPermitId,
      address: dto.address,
      location: dto.location,
      zipCode: dto.zipCode,
      googleMapLink: dto.googleMapLink,
      roadAccessId: dto.roadAccessId,
      nearbyPoints: dto.nearbyPoints,
      zoneId: dto.zoneId,
      landSizeId: dto.landSizeId,
      builtUpArea: dto.builtUpArea,
      pricePerUnit: dto.pricePerUnit,
      totalPrice: dto.totalPrice,
      pricePerYear: dto.pricePerYear,
      numberOfFloors: dto.numberOfFloors,
      maxRooms: dto.maxRooms,
      beds: dto.beds,
      baths: dto.baths,
      furnishingId: dto.furnishingId,
      buildingYear: dto.buildingYear,
      availableDate: dto.availableDate,
      parkingSpaceId: dto.parkingSpaceId,
      pool: dto.pool,
      poolTypeId: dto.poolTypeId,
      poolSize: dto.poolSize,
      description: dto.description,
      images: imagePaths,
      videoLink: dto.videoLink,
      livingSpace: this.transformFeatures(dto.livingSpace),
      kitchen: this.transformFeatures(dto.kitchen),
      utilitiesIncluded: this.transformFeatures(dto.utilitiesIncluded),
      servicesIncluded: this.transformFeatures(dto.servicesIncluded),
      additionalFeatures: this.transformFeatures(dto.additionalFeatures),
      publicationStatus: status, 
    };

    // Remove undefined fields to prevent overwriting with null
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    return this.prisma.property.update({
      where: { id },
      data: cleanedData,
    });
  }


  async getPropertyOptions(): Promise<{
    [key: string]: { id: string | number; name: string; [key: string]: any }[] | { min: number; max: number };
    }> {
    const fetchSimpleTable = async (model: any) =>
      model.findMany({ select: { id: true, name: true } });

    try {
      const [
        categories,
        transactionTypes,
        ownershipTypes,
        buildingPermits,
        parkingSpaces,
        zones,
        furnishings,
        roadAccesses,
        poolTypes,
        landSizes,
        priceRange,
      ] = await Promise.all([

        // Fetch categories with subcategories
        this.prisma.category.findMany({
          select: {
            id: true,
            name: true,
            subcategories: { select: { id: true, name: true, categoryId: true } },
          },
        }),

        // Fetch transaction types with property statuses and categories
        this.prisma.transactionType.findMany({
          include: {
            propertyStatuses: { select: { id: true, name: true, transactionTypeId: true } },
            categories: { select: { id: true } },
          },
        }),

        // Fetch ownership types with categories
        fetchSimpleTable(this.prisma.ownershipType).then((items) =>
          Promise.all(
            items.map(async (item) => ({
              ...item,
              categories: await this.prisma.category.findMany({
                where: { ownershipTypes: { some: { id: item.id } } },
                select: { id: true },
              }),
            })),
          ),
        ),
        
        // Fetch building permits with categories
        fetchSimpleTable(this.prisma.buildingPermit).then((items) =>
          Promise.all(
            items.map(async (item) => ({
              ...item,
              categories: await this.prisma.category.findMany({
                where: { buildingPermits: { some: { id: item.id } } },
                select: { id: true },
              }),
            })),
          ),
        ),
        fetchSimpleTable(this.prisma.parkingSpace),
        fetchSimpleTable(this.prisma.zone),
        fetchSimpleTable(this.prisma.furnishing),
        fetchSimpleTable(this.prisma.roadAccess),
        fetchSimpleTable(this.prisma.poolType),
        fetchSimpleTable(this.prisma.landSize),
        this.prisma.property.aggregate({
          _min: { totalPrice: true },
          _max: { totalPrice: true },
        }),
      ]);

      const propertyStatusesWithCategories = await this.prisma.propertyStatus.findMany({
        select: {
          id: true,
          name: true,
          transactionTypeId: true,
          categories: { select: { id: true } },
        },
      });

      // Transform data to match the desired response format
      const data = {
        Category: categories.map((item) => ({
          id: item.id,
          name: item.name,
        })),
        subcategories: categories.flatMap((item) =>
          item.subcategories.map((sub) => ({
            id: sub.id,
            name: sub.name,
            categoryId: sub.categoryId,
          })),
        ),
        TransactionType: transactionTypes.map((item) => ({
          id: item.id,
          name: item.name,
          categoryId: item.categories.map((c) => c.id),
        })),
       propertyStatuses: propertyStatusesWithCategories.map((status) => ({
          id: status.id,
          name: status.name,
          transactionTypeId: status.transactionTypeId,
          categoryId: status.categories.map((c) => c.id),
        })),
        OwnershipType: ownershipTypes.map((item) => ({
          id: item.id,
          name: item.name,
          categoryId: item.categories.map((c) => c.id),
        })),
        BuildingPermit: buildingPermits.map((item) => ({
          id: item.id,
          name: item.name,
          categoryId: item.categories.map((c) => c.id),
        })),
        ParkingSpace: parkingSpaces.map((item) => ({
          id: item.id,
          name: item.name,
        })),
        Zone: zones.map((item) => ({
          id: item.id,
          name: item.name,
        })),
        Furnishing: furnishings.map((item) => ({
          id: item.id,
          name: item.name,
        })),
        RoadAccess: roadAccesses.map((item) => ({
          id: item.id,
          name: item.name,
        })),
        PoolType: poolTypes.map((item) => ({
          id: item.id,
          name: item.name,
        })),
        LandSize: landSizes.map((item) => ({
          id: item.id,
          name: item.name,
        })),
        PriceRange: {
          min: priceRange._min.totalPrice ?? 0,
          max: priceRange._max.totalPrice ?? 0,
        },
      };

      return data;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to retrieve property options');
    }
  }

  async getPropertyById(id: number) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true } },
        subcategory: { select: { id: true, name: true  } },
        ownershipType: { select: { id: true, name: true } },
        transactionType: { select: { id: true, name: true } },
        propertyStatus: { select: { id: true, name: true  } },
        buildingPermit: { select: { id: true, name: true } },
        zone: { select: { id: true, name: true } },
        parkingSpace: { select: { id: true, name: true } },
        furnishing: { select: { id: true, name: true } },
        roadAccess: { select: { id: true, name: true } },
        poolType: { select: { id: true, name: true } },
        landSize: { select: { id: true, name: true } },
      },
    });

    if (!property) {
      throw new BadRequestException(`Property with ID ${id} not found`);
    }

    return property;
  }

  async bulkDeleteProperties(ids: number[]): Promise<{ message: string }> {
     const existingProperties = await this.prisma.property.findMany({
      where: { id: { in: ids } },
      select: { id: true, images: true },
    });
  
    if (existingProperties.length === 0) {
      throw new NotFoundException('No properties found with the provided IDs');
    }
  
    const foundIds = existingProperties.map(prop => prop.id);
    const missingIds = ids.filter(id => !foundIds.includes(id));
  
    try {
       await this.prisma.property.deleteMany({
        where: { id: { in: foundIds } },
      });
  
      existingProperties.forEach(property => {
        property.images.forEach(image => {
          const filePath = join(__dirname, '..', '..', image);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      });
  
      let message = `Successfully deleted ${foundIds.length} properties`;
      if (missingIds.length > 0) {
        message += `. The following IDs were not found: ${missingIds.join(', ')}`;
      }
  
      return { message };
    } catch (error) {
      throw new BadRequestException('Failed to delete properties in bulk');
    }
  }
}