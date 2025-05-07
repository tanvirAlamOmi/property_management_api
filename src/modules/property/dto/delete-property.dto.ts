import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ArrayNotEmpty, IsNumber } from 'class-validator';

export class BulkDeleteDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  ids: number[];
}