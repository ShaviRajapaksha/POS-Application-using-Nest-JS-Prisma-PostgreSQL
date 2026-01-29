import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {

  @ApiProperty({ example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'High-performance laptop', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 50 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'Lap-001' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 123.45 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  categoryId?: number;
}