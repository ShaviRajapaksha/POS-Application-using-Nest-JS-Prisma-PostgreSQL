import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({ example: 'Sam Smith' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'samsmith@example.com', required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ example: '+94771234567', required: false })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ example: 'Main st, Colombo', required: false })
    @IsString()
    @IsOptional()
    address?: string
}
