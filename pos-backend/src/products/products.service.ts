import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "../prisma/prisma.service";

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