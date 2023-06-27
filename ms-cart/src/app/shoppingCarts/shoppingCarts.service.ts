import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { CartProduct } from './entities/cartProduct.entity';

import { ProductDTO } from './dtos/product.dto';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,
  ) {}

  async createEmptyCart(userId: string) {
    const newCart = this.cartRepository.create({
      userId: userId,
      totalPrice: 0,
      totalQuantity: 0,
    });
    return await this.cartRepository.save(newCart);
  }

  async getCart(cartId: string, userId: string) {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId }, //TODO: add userIdc
      relations: ['cartProducts'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async addProductFromCart(
    cartId: string,
    userId: string,
    productDTO: ProductDTO,
  ) {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId }, //TODO: add userId
      relations: ['cartProducts'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartProduct = this.cartProductRepository.create({
      cart: cart.id,
      productId: productDTO.productId,
      quantity: productDTO.quantity,
      price: productDTO.price,
    });

    this.cartProductRepository.save(cartProduct);

    cart.totalPrice += productDTO.quantity * productDTO.price;
    cart.totalQuantity += productDTO.quantity;

    return await this.cartRepository.save(cart);
  }

  async deleteProductFromCart(
    cartId: string,
    userId: string,
    productId: string,
  ) {
    const cartData = await this.cartRepository.findOne({
      where: { id: cartId }, //TODO: add userId
      relations: ['cartProducts'],
    });

    if (!cartData) {
      throw new NotFoundException('Cart not found');
    }

    const productData = await this.cartProductRepository.findOne({
      where: { id: productId },
      relations: ['cart'],
    });

    if (!productData) {
      throw new NotFoundException('Product not found on cart');
    }

    cartData.totalPrice -= productData.quantity * productData.price;
    cartData.totalQuantity -= productData.quantity;

    await this.cartProductRepository.delete(productId);

    return await this.cartRepository.save(cartData);
  }
}
