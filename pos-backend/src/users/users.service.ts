import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateUserDto) {
        return this.prisma.user.create({data: dto});
    }

    findAll() {
        return this.prisma.user.findMany();
    }
}