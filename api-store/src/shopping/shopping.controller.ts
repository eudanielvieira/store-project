import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CartService } from './cart.service';
import { CartProductDTO } from './dtos/cart-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shopping')
@ApiTags('Shopping')
export class ShoppingController {
  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
  ) {}

  @Get('products')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all products' })
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Get('products/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get product by id' })
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(id);
  }

  @Post('products')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create product' })
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productsService.createProduct(product);
  }

  @Put('products/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update product by id' })
  async updateProduct(
    @Param('id') id: string,
    @Body() product: CreateProductDto,
  ) {
    return await this.productsService.updateProduct(id, product);
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete product by id' })
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(id);
  }

  @Post('cart/user-id/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a Shopping Cart',
  })
  async createEmptyCart(@Param('userId') userId: string) {
    return await this.cartService.createEmptyCart(userId);
  }

  @Get('cart/cart-id/:cartId/user-id/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get a Shopping Cart',
  })
  async getCart(
    @Param('cartId') cartId: string,
    @Param('userId') userId: string,
  ) {
    return await this.cartService.getCart(cartId, userId);
  }

  @Put('cart/cart-id/:cartId/user-id/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Add a Product from a Shopping Cart',
  })
  async addProductFromCart(
    @Param('cartId') cartId: string,
    @Param('userId') userId: string,
    @Body() cartProductDTO: CartProductDTO,
  ) {
    return await this.cartService.addProductFromCart(
      cartId,
      userId,
      cartProductDTO,
    );
  }

  @Delete('cart/cart-id/:cartId/user-id/:userId/product-id/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete a Product from a Shopping Cart',
  })
  async deleteProductFromCart(
    @Param('cartId') cartId: string,
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return await this.cartService.deleteProductFromCart(
      cartId,
      userId,
      productId,
    );
  }
}
