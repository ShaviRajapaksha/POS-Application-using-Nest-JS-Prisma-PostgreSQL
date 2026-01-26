import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class SaleItemDto {
    @ApiProperty()
    @IsInt()
    productId: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    quantity: number;
}