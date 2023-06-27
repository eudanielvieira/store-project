import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CartProductDTO } from './dtos/cart-product.dto';

@Injectable()
export class CartService {
  apiProductsUrl: string;
  httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
    this.apiProductsUrl = process.env.MS_CART_URL;
  }

  async createEmptyCart(userId: string) {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.apiProductsUrl}/carts/user-id/${userId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCart(cartId: string, userId: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `${this.apiProductsUrl}/carts/cart-id/${cartId}/user-id/${userId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductFromCart(
    cartId: string,
    userId: string,
    productDTO: CartProductDTO,
  ) {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.apiProductsUrl}/carts/cart-id/${cartId}/user-id/${userId}`,
        productDTO,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(
    cartId: string,
    userId: string,
    productId: string,
  ) {
    try {
      const response = await this.httpService.axiosRef.delete(
        `${this.apiProductsUrl}/carts/cart-id/${cartId}/user-id/${userId}/product-id/${productId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
