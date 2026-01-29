import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSaleDto } from './create-sale.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    @ApiProperty({ example: 'completed', enum: ['completed', 'cancelled', 'refunded'], required: false })
    @IsString()
    @IsIn(['completed', 'cancelled', 'refunded'])
    @IsOptional()
    status?: string;
}
