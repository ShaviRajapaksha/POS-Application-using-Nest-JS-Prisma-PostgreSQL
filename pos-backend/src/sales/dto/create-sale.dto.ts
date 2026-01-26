import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, ValidateNested } from "class-validator";
import { SaleItemDto } from "./sale-item.dto";
import { Type } from "class-transformer";

export class CreateSalesDto {
    @ApiProperty()
    @ArrayMinSize(1)
    @ValidateNested({ each: true})
    @Type(() => SaleItemDto)
    items: SaleItemDto[];
}