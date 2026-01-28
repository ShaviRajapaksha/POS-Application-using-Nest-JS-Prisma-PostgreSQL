import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      return await this.prisma.customer.create({
        data: createCustomerDto
      })
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exist');
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.customer.findMany({
      include: {
        _count: {
          select: {
            sales:true
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: {id},
      include: {
        sales: {
          orderBy: {createdAt: 'desc'},
          take: 10,
        },
      },
    });

    if(!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`)
    }

    return customer
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id);
    
    try {

    } catch (error) {
      if (error.code == 'P2002') {
        throw new ConflictException('Email already exist');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.customer.delete({
      where: {id}
    });
  }
}
