import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CartProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
