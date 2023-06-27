import { ProductDTO } from './product.dto';

export class ShoppingCartDTO {
  shoppingCartId: string;
  userId: string;
  totalPrice: number;
  totalQuantity: number;
  products: ProductDTO[];
}
