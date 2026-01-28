import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { CustomersModule } from './customers/customers.module';
import { SalesModule } from './sales/sales.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, PrismaModule, CategoriesModule, CustomersModule, SalesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
