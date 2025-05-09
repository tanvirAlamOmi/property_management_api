import { IsString, IsInt, IsOptional, IsArray, IsNumber, ValidateNested, IsBoolean, ValidateIf, IsNotEmpty, ValidationOptions, ValidationArguments, registerDecorator } from 'class-validator';
import { Type } from 'class-transformer';
 
class Feature {
  @IsString()
  value: string;

  @IsBoolean()
  isDefault: boolean;
}

export class CreateBasePropertyDto { 
  @IsString()
  title: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  buildingPermitId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  zoneId?: number; 

  @IsOptional()
  @IsString()
  googleMapLink?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt ()
  roadAccessId? : number; 

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  nearbyPoints?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  numberOfFloors?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxRooms?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt ()
  furnishingId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  parkingSpaceId?: number; 

  @IsOptional()
  @IsString()
  description?: string; 

  @IsOptional()
  @IsString()
  videoLink?: string; 
  
  @IsOptional()
  @IsNumber()
  buildingYear?: number;

  @IsOptional()
  @IsString()
  availableDate?: string; 

  @IsOptional()
  @IsNumber()
  pricePerYear?: number;

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
  @Type(() => Number)
  @IsInt()
  beds?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  baths?: number;
}

export class CreatePropertyDto extends CreateBasePropertyDto {  
  @Type(() => Number)
  @IsInt ()
  categoryId?: number;

  @Type(() => Number)
  @IsInt()
  subcategoryId?: number;

  @Type(() => Number)
  @IsInt()
  ownershipTypeId?: number;

  @Type(() => Number)
  @IsInt()
  transactionTypeId?: number;

  @Type(() => Number)
  @IsInt()
  propertyStatusId?: number;

  @IsString()
  address?: string;

  @IsString()
  location?: string;

  @IsString()
  zipCode?: string; 

  @Type(() => Number)
  @IsInt ()
  landSizeId?: number;

  @IsNumber()
  builtUpArea?: number;

  @IsNumber()
  pricePerUnit?: number;

  @IsNumber()
  totalPrice?: number;
}
 
export class CreateDraftPropertyDto extends CreateBasePropertyDto { 
  @Type(() => Number)
  @IsOptional() 
  @IsInt ()
  categoryId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  subcategoryId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  ownershipTypeId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  transactionTypeId?: number;

  @Type(() => Number)
  @IsOptional()
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

