import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private service: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }
}