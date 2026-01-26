import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsEmail()
    email: string;
}