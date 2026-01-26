import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({summary: 'Create a new product'})
  @ApiResponse({status: 201, description: 'Product created successfully'})
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all products'})
  @ApiResponse({status: 200, description: 'Return all products'})
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a product by ID'})
  @ApiResponse({status:200, description: 'Return a product'})
  @ApiResponse({status:404, description: 'Product not found'})
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a product'})
  @ApiResponse({status:200, description: 'Product updated successfully'})
  @ApiResponse({status:404, description: 'Product not found'})
  update(@Param('id') id: string, @Body(ValidationPipe) updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a product'})
  @ApiResponse({status:200, description: 'Product deleted successfully'})
  @ApiResponse({status:404, description: 'Product not found'})
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
