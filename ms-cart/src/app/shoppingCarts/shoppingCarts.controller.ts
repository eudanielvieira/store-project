import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ShoppingCartsService } from './shoppingCarts.service';
import { ProductDTO } from './dtos/product.dto';

@Controller('carts')
@ApiTags('Carts')
export class ShoppingCartsController {
  constructor(private shoppingCartsService: ShoppingCartsService) {}

  @Post('user-id/:userId')
  @ApiOperation({
    summary: 'Create a Shopping Cart',
  })
  async createEmptyCart(@Param('userId') userId: string) {
    return await this.shoppingCartsService.createEmptyCart(userId);
  }

  @Get('cart-id/:cartId/user-id/:userId')
  @ApiOperation({
    summary: 'Get a Shopping Cart',
  })
  async getCart(
    @Param('cartId') cartId: string,
    @Param('userId') userId: string,
  ) {
    return await this.shoppingCartsService.getCart(cartId, userId);
  }

  @Put('add-product/cart-id/:cartId/user-id/:userId')
  @ApiOperation({
    summary: 'Add a Product from a Shopping Cart',
  })
  async addProductFromCart(
    @Param('cartId') cartId: string,
    @Param('userId') userId: string,
    @Body() productDTO: ProductDTO,
  ) {
    return await this.shoppingCartsService.addProductFromCart(
      cartId,
      userId,
      productDTO,
    );
  }

  @Delete('cart-id/:cartId/user-id/:userId/product-id/:productId')
  @ApiOperation({
    summary: 'Delete a Product from a Shopping Cart',
  })
  async deleteProductFromCart(
    @Param('cartId') cartId: string,
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return await this.shoppingCartsService.deleteProductFromCart(
      cartId,
      userId,
      productId,
    );
  }
}
