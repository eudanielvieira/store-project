import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  apiProductsUrl: string;
  httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
    this.apiProductsUrl = process.env.MS_PRODUCTS_URL;
  }

  async getProducts() {
    try {
      const response = await this.httpService.axiosRef.get(
        `${this.apiProductsUrl}/products`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `${this.apiProductsUrl}/products/${id}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(product: CreateProductDto) {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.apiProductsUrl}/products`,
        product,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(id: string, product: CreateProductDto) {
    try {
      const response = await this.httpService.axiosRef.put(
        `${this.apiProductsUrl}/products/${id}`,
        product,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id: string) {
    try {
      const response = await this.httpService.axiosRef.delete(
        `${this.apiProductsUrl}/products/${id}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
