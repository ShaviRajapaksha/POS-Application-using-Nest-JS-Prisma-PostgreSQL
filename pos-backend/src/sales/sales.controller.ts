import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SalesService } from "./sales.service";
import { CreateSalesDto } from "./dto/create-sale.dto";

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
    constructor(private service: SalesService) {}

    @Post()
    create(@Body() dto: CreateSalesDto) {
        return this.service.createSale(1, dto.items);
    }
}