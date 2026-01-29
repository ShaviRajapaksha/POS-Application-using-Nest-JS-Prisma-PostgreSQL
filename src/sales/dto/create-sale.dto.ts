import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { CreateSaleItemDto } from "./create-sale-item.dto";
import { Type } from "class-transformer";

export class CreateSaleDto {
    @ApiProperty({ example: 1, required: false })
    @IsInt()
    @IsOptional()
    customerId?: number;

    @ApiProperty({ example: 0, required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    taxAmount?: number;

    @ApiProperty({ example: 0, required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    discount?: number;

    @ApiProperty({ example: 'cash', enum: ['cash', 'card', 'mobile'] })
    @IsString()
    @IsIn([ 'cash', 'card', 'mobile' ])
    paymentMethod: string;

    @ApiProperty({ type: [CreateSaleItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(()=> CreateSaleItemDto)
    items: CreateSaleItemDto[];
}
