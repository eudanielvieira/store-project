import { ProductDTO } from './product.dto';

export class CreateEmptyCart {
  shoppingCartId: string;
  userId: string;
  totalPrice: number;
  totalQuantity: number;
  products: ProductDTO[];
}
