import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(private prisma : PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: createCategoryDto,
      })
    } catch (error) {
        if (error.code == 'P2002'){
          throw new ConflictException ('Category name already exists')
        }
        throw error;
    }
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        _count: {
          select: {products: true},
        },
      },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
    where: {id},
    include: {
      products: true,
    },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    try {
      return await this.prisma.category.update({
        where: {id},
        data: updateCategoryDto,
      });
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ConflictException('Category name already exists');
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.category.delete({
      where: {id},
    });
  }
}
