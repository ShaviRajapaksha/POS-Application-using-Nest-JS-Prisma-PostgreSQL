import { Injectable, BadRequestException } from '@nestjs/common';
import { SaleItemDto } from './dto/sale-item.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(cashierId: number, items: SaleItemDto[]) {
    return this.prisma.$transaction(async (tx) => {
      let total = 0;
      const saleItems: { productId: number; quantity: number; price: any }[] = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product || product.stock < item.quantity) {
          throw new BadRequestException('Insufficient stock');
        }

        total += Number(product.price) * item.quantity;

        saleItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });

        await tx.product.update({
          where: { id: product.id },
          data: { stock: product.stock - item.quantity },
        });
      }

      return tx.sale.create({
        data: {
          cashierId,
          total,
          items: { create: saleItems },
        },
      });
    });
  }
}
