import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, Min } from "class-validator";

export class CreateSaleItemDto {
    @ApiProperty({ example: '1' })
    @IsInt()
    productId: number;

    @ApiProperty({ example:2 })
    @IsInt()
    @Min(1)
    quantity: number;

    @ApiProperty({ example: 999.9 })
    @IsNumber()
    @Min(0)
    unitPrice: number;

}
