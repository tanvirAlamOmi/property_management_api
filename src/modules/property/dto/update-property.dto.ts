import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Feature {
  @IsString()
  value: string;

  @IsBoolean()
  isDefault: boolean;
}

export class UpdateBasePropertyDto {
  @IsString()
  title?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  buildingPermitId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt ()
  roadAccessId: number;

  @IsOptional()
  @IsString()
  googleMapLink?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  videoLink?: string;
 
  @IsOptional()
  @IsNumber()
  pricePerYear?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Feature)
  livingSpace?: Feature[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Feature)
  kitchen?: Feature[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Feature)
  utilitiesIncluded?: Feature[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Feature)
  servicesIncluded?: Feature[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Feature)
  additionalFeatures?: Feature[];

  @IsOptional()
  @IsBoolean()
  pool?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt ()
  poolTypeId?: number;

  @IsOptional()
  @IsNumber()
  poolSize?: number;

  @IsOptional()
  @IsNumber()
  buildingYear?: number;

  @IsOptional()
  @IsString()
  availableDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  nearbyPoints?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  zoneId?: number; 

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  numberOfFloors: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxRooms: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsInt ()
  furnishingId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  parkingSpaceId: number; 
  
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  beds: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  baths: number;
  
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[]
}

 export class UpdatePropertyDto extends UpdateBasePropertyDto {  
  @Type(() => Number)
  @IsInt()
  categoryId: number;

  @Type(() => Number)
  @IsInt()
  subcategoryId: number;

  @Type(() => Number)
  @IsInt()
  ownershipTypeId: number;

  @Type(() => Number)
  @IsInt()
  transactionTypeId: number;

  @Type(() => Number)
  @IsInt()
  propertyStatusId: number;

  @IsString()
  address: string;

  @IsString()
  location: string;

  @IsString()
  zipCode: string;

  @Type(() => Number)
  @IsInt ()
  landSizeId: number;

  @IsNumber()
  builtUpArea: number;

  @IsNumber()
  pricePerUnit: number;

  @IsNumber()
  totalPrice: number;
}

export class UpdateDraftPropertyDto extends UpdateBasePropertyDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subcategoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  ownershipTypeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  transactionTypeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  propertyStatusId?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt ()
  landSizeId?: number;

  @IsOptional()
  @IsNumber()
  builtUpArea?: number;

  @IsOptional()
  @IsNumber()
  pricePerUnit?: number;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}