import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateProductDto) {
        return this.prisma.product.create({ data: dto});
    }

    findAll() {
        return this.prisma.product.findMany();
    }
}