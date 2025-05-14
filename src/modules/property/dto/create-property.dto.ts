import { IsString, IsInt, IsOptional, IsArray, IsNumber, ValidateNested, IsBoolean, ValidateIf, IsNotEmpty, ValidationOptions, ValidationArguments, registerDecorator, MinLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
 
class Feature {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsBoolean()
  isDefault: boolean;
}

export class CreateBasePropertyDto { 
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  title: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'Building permit ID must be a positive number' })
  buildingPermitId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Zone ID must be a positive number' })
  zoneId?: number; 

  @IsOptional()
  @IsString()
  googleMapLink?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt ()
  @Min(1, { message: 'Road access ID must be a positive number' })
  roadAccessId? : number; 

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true, message: 'Each nearby point must be at least 1 character' })
  nearbyPoints?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, { message: 'Number of floors cannot be negative' })
  numberOfFloors?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, { message: 'Max rooms cannot be negative' })
  maxRooms?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt ()
  @Min(1, { message: 'Furnishing ID must be a positive number' })
  furnishingId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'Parking space ID must be a positive number' })
  parkingSpaceId?: number; 

  @IsOptional()
  @IsString()
  description?: string; 

  @IsOptional()
  @IsString()
  videoLink?: string; 
  
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Building year cannot be negative' })
  buildingYear?: number;

  @IsOptional()
  @IsString()
  availableDate?: string; 

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price per year cannot be negative' })
  pricePerYear?: number;

  @IsOptional()
  @IsBoolean()
  pool?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt ()
  @Min(1, { message: 'Pool type ID must be a positive number' })
  poolTypeId?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Pool size cannot be negative' })
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
  @IsInt ()
  @Min(1, { message: 'Land Unit must be a positive number' })
  landUnitId?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, { message: 'Number of beds cannot be negative' })
  beds?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, { message: 'Number of baths cannot be negative' })
  baths?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[]
}

export class CreatePropertyDto extends CreateBasePropertyDto {  
  @Type(() => Number)
  @IsInt ()
  @Min(1, { message: 'Category ID must be a positive number' })
  categoryId?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'Subcategory ID must be a positive number' })
  subcategoryId?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'Ownership type ID must be a positive number' })
  ownershipTypeId?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'Transaction type ID must be a positive number' })
  transactionTypeId?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'Property status ID must be a positive number' })
  propertyStatusId?: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Address must be at least 3 characters' })
  address?: string;

  @IsString()
  @MinLength(3, { message: 'Location must be at least 3 characters' })
  location?: string;

  @IsString()
  zipCode?: string; 
 
  @IsNumber()
  @Min(0, { message: 'land size cannot be negative' })
  landSize?: number;

  @IsNumber()
  @Min(0, { message: 'Built-up area cannot be negative' })
  builtUpArea?: number;

  @IsNumber()
  @Min(0, { message: 'Price per unit cannot be negative' })
  pricePerUnit?: number;

  @IsNumber()
  @Min(0, { message: 'Total price cannot be negative' })
  totalPrice?: number;
}
 
export class CreateDraftPropertyDto extends CreateBasePropertyDto { 
  @Type(() => Number)
  @IsOptional() 
  @IsInt ()
  @Min(1, { message: 'Category ID must be a positive number' })
  categoryId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Subcategory ID must be a positive number' })
  subcategoryId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Ownership type ID must be a positive number' })
  ownershipTypeId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Transaction type ID must be a positive number' })
  transactionTypeId?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Property status ID must be a positive number' })
  propertyStatusId?: number;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Address must be at least 3 characters' })
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Location must be at least 3 characters' })
  location?: string;

  @IsOptional()
  @IsString()
  zipCode?: string; 
   
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Land size cannot be negative' })
  landSize?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Built-up area cannot be negative' })
  builtUpArea?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price per unit cannot be negative' })
  pricePerUnit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Total price cannot be negative' })
  totalPrice?: number;
}

