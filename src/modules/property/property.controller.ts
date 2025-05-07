import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, UseInterceptors, UploadedFiles, BadRequestException, Query, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreateDraftPropertyDto, CreatePropertyDto } from './dto/create-property.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { ResponseHelper } from 'src/common/helpers/response.helper'; 
import { ImageFilesInterceptor } from 'src/common/intercepters/file-upload.interceptor';
import { ListPropertiesDto } from './dto/list-properties.dto';
import { UpdateDraftPropertyDto, UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyPublicationStatus } from '@prisma/client';
import { BulkDeleteDto,   } from './dto/delete-property.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
 
  @Get('options')
  @HttpCode(HttpStatus.OK)
  async getPropertyOptions(): Promise<ApiResponse<any>> {
    const options = await this.propertyService.getPropertyOptions();
    return ResponseHelper.success(options, 'Property options retrieved');
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ImageFilesInterceptor('images'))
  async createProperty(
    @Body() createPropertyDto: CreatePropertyDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ApiResponse<any>> {
    const property = await this.propertyService.createProperty(createPropertyDto, files, PropertyPublicationStatus.PUBLISHED);
    return ResponseHelper.success(property, 'Property created successfully');
  }

  @Post('drafts')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ImageFilesInterceptor('images'))
  async createDraftProperty(
    @Body() createPropertyDto: CreateDraftPropertyDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ApiResponse<any>> {
    const property = await this.propertyService.createProperty(createPropertyDto, files, PropertyPublicationStatus.DRAFT);
    return ResponseHelper.success(property, 'Property created successfully');
  } 

  @Get( )
  @HttpCode(HttpStatus.OK)
  async listPublishedProperties(
    @Query() query: ListPropertiesDto,
  ): Promise<ApiResponse<any>> {
    const result = await this.propertyService.listProperties(query, PropertyPublicationStatus.PUBLISHED);
    return ResponseHelper.success(
      result.data,
      'Published properties retrieved successfully',
      { pagination: result.pagination },
    );
  }

  @Get('drafts')
  @HttpCode(HttpStatus.OK)
  async listDraftProperties(
    @Query() query: ListPropertiesDto,
  ): Promise<ApiResponse<any>> {
    const result = await this.propertyService.listProperties(query, PropertyPublicationStatus.DRAFT);
    return ResponseHelper.success(
      result.data,
      'Draft properties retrieved successfully',
      { pagination: result.pagination },
    );
  }
 
 @Delete('bulk')
 @HttpCode(HttpStatus.OK)
 async bulkDeleteProperties(
   @Body() dto: BulkDeleteDto
 ): Promise<ApiResponse<any>> {
   const result = await this.propertyService.bulkDeleteProperties(dto.ids);
   return ResponseHelper.success(null, result.message);
 }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProperty(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<any>> {
    const result = await this.propertyService.deleteProperty(id);
    return ResponseHelper.success(null, result.message);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ImageFilesInterceptor('images'))
  async updateProperty(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ApiResponse<any>> {
    const property = await this.propertyService.updateProperty(id, updatePropertyDto, files, PropertyPublicationStatus.PUBLISHED);
    return ResponseHelper.success(property, 'Property updated successfully');
  }

  @Put('drafts/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ImageFilesInterceptor('images'))
  async updateDraftProperty(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDraftPropertyDto: UpdateDraftPropertyDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ApiResponse<any>> {
    const property = await this.propertyService.updateProperty(id, updateDraftPropertyDto, files, PropertyPublicationStatus.DRAFT);
    return ResponseHelper.success(property, 'Draft property updated successfully');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProperty(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<any>> {
    const property = await this.propertyService.getPropertyById(id);
    return ResponseHelper.success(property, 'property retrieved successfully'); 
  }


}