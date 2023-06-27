import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CartProductDTO } from './dtos/cart-product.dto';

@Injectable()
export class CartService {
  apiCartUrl: string;
  httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
    this.apiCartUrl = process.env.MS_CART_URL;
  }

  async createEmptyCart(userId: string) {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.apiCartUrl}/carts/user-id/${userId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCart(cartId: string, userId: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `${this.apiCartUrl}/carts/cart-id/${cartId}/user-id/${userId}`,
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
      const response = await this.httpService.axiosRef.put(
        `${this.apiCartUrl}/carts/cart-id/${cartId}/user-id/${userId}`,
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
        `${this.apiCartUrl}/carts/cart-id/${cartId}/user-id/${userId}/product-id/${productId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
