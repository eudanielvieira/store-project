import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from './product.dto';

export class CartDataDto {
  @ApiProperty()
  cartId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  product: ProductDTO;
}
