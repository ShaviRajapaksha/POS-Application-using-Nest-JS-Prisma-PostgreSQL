import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ProductsModule,
    SalesModule,
  ],
})
export class AppModule {}
