import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private service: ProductService) {}

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }
}