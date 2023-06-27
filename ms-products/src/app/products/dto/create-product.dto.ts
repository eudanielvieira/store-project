import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
