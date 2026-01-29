import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiResponse({ status: 201, description: 'Sale created successfully' })
  create(@Body(ValidationPipe) createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({ status: 200, description: 'Return all sales' })
  findAll() {
    return this.salesService.findAll();
  }

  @Get('report/daily')
  @ApiOperation({ summary: 'Get daily sales report' })
  @ApiQuery({ name: 'date', required: false, example: '2026-01-26' })
  @ApiResponse({ status: 200, description: 'Return daily sales report' })
  getDailySalesReport(@Query('date') date?: string) {
    const reportDate = date ? new Date(date) : new Date();
    return this.salesService.getDailySalesReport(reportDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by ID' })
  @ApiResponse({ status: 200, description: 'Return a sale' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sale status' })
  @ApiResponse({ status: 200, description: 'Sale updated successfully' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale and restore stock' })
  @ApiResponse({ status: 200, description: 'Sale deleted successfully' })
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}