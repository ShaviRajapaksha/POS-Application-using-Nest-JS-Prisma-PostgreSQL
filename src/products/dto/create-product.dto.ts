import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty({example: 'Laptop'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'High-performance laptop', required: false})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({example: 50})
    @IsNumber()
    @Min(0)
    stock: number;

    @ApiProperty({example: 'Lap-001'})
    @IsString()
    @IsNotEmpty()
    sku: string;
}
