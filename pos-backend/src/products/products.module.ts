import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
