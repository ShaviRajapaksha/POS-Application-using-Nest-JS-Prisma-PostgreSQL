import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Decimal } from '@prisma/client/runtime/client';


@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    const { items, customerId, taxAmount = 0, discount = 0, paymentMethod } = createSaleDto;

    // Validate products and stock
    for (const item of items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
        );
      }
    }

    // Calculate totals
    const totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const finalAmount = totalAmount + taxAmount - discount;

    // Create sale with items in a transaction
    return this.prisma.$transaction(async (tx) => {
      // Create sale
      const sale = await tx.sale.create({
        data: {
          customerId,
          totalAmount: new Decimal(totalAmount),
          taxAmount: new Decimal(taxAmount),
          discount: new Decimal(discount),
          finalAmount: new Decimal(finalAmount),
          paymentMethod,
          saleItems: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: new Decimal(item.unitPrice),
              totalPrice: new Decimal(item.unitPrice * item.quantity),
            })),
          },
        },
        include: {
          saleItems: {
            include: {
              product: true,
            },
          },
          customer: true,
        },
      });

      // Update product stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return sale;
    });
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: {
        customer: true,
        saleItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: {
        customer: true,
        saleItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    await this.findOne(id);

    return this.prisma.sale.update({
      where: { id },
      data: updateSaleDto,
      include: {
        customer: true,
        saleItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const sale = await this.findOne(id);

    // Restore stock if sale is being deleted
    return this.prisma.$transaction(async (tx) => {
      // Restore stock
      for (const item of sale.saleItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      // Delete sale (cascade will delete sale items)
      return tx.sale.delete({
        where: { id },
      });
    });
  }

  // Additional useful methods
  async getSalesByDateRange(startDate: Date, endDate: Date) {
    return this.prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        customer: true,
        saleItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getDailySalesReport(date: Date) {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const sales = await this.getSalesByDateRange(startOfDay, endOfDay);

    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.finalAmount), 0);
    const totalTax = sales.reduce((sum, sale) => sum + Number(sale.taxAmount), 0);
    const totalDiscount = sales.reduce((sum, sale) => sum + Number(sale.discount), 0);

    return {
      date,
      totalSales,
      totalRevenue,
      totalTax,
      totalDiscount,
      sales,
    };
  }
}