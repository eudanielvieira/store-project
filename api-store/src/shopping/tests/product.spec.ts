import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';

import { ProductsService } from '../products.service';
import { CreateProductDto } from '../dtos/create-product.dto';

describe('ProductsService', () => {
  let productsService: ProductsService;
  const httpService = new HttpService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('getProducts', () => {
    it('should get the products', async () => {
      const response = {};
      jest
        .spyOn(httpService.axiosRef, 'get')
        .mockResolvedValueOnce(Promise.resolve({ data: response }));

      const result = await productsService.getProducts();

      expect(result).toEqual(response);
      expect(httpService.axiosRef.get).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products`,
      );
    });

    it('should throw an error if an error occurs during the request', async () => {
      const expectedError = new Error('Request failed');
      jest
        .spyOn(httpService.axiosRef, 'get')
        .mockRejectedValueOnce(expectedError);

      await expect(productsService.getProducts()).rejects.toThrow();

      expect(httpService.axiosRef.get).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products`,
      );
    });
  });

  describe('getProductById', () => {
    it('should get a product by ID', async () => {
      const productId = 'product123';
      const response = {};
      jest
        .spyOn(httpService.axiosRef, 'get')
        .mockResolvedValueOnce(Promise.resolve({ data: response }));

      const result = await productsService.getProductById(productId);

      expect(result).toEqual(response);
      expect(httpService.axiosRef.get).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products/${productId}`,
      );
    });

    it('should throw an error if an error occurs during the request', async () => {
      const productId = 'product123';
      const expectedError = new Error('Request failed');
      jest
        .spyOn(httpService.axiosRef, 'get')
        .mockRejectedValueOnce(expectedError);

      await expect(productsService.getProductById(productId)).rejects.toThrow();
      expect(httpService.axiosRef.get).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products/${productId}`,
      );
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const product: CreateProductDto = {
        name: 'Product 1',
        description: 'Product 1 description',
        price: 19.99,
      };
      const response = {};
      jest
        .spyOn(httpService.axiosRef, 'post')
        .mockResolvedValueOnce(Promise.resolve({ data: response }));

      const result = await productsService.createProduct(product);

      expect(result).toEqual(response);
      expect(httpService.axiosRef.post).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products`,
        product,
      );
    });

    it('should throw an error if an error occurs during the request', async () => {
      const product: CreateProductDto = {
        name: 'Product 1',
        description: 'Product 1 description',
        price: 19.99,
      };
      const expectedError = new Error('Request failed');
      jest
        .spyOn(httpService.axiosRef, 'post')
        .mockRejectedValueOnce(expectedError);

      await expect(productsService.createProduct(product)).rejects.toThrow();
      expect(httpService.axiosRef.post).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products`,
        product,
      );
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const productId = 'product123';
      const product: CreateProductDto = {
        name: 'Product 1',
        description: 'Product 1 description',
        price: 19.99,
      };
      const response = {};
      jest
        .spyOn(httpService.axiosRef, 'put')
        .mockResolvedValueOnce(Promise.resolve({ data: response }));

      const result = await productsService.updateProduct(productId, product);

      expect(result).toEqual(response);
      expect(httpService.axiosRef.put).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products/${productId}`,
        product,
      );
    });

    it('should throw an error if an error occurs during the request', async () => {
      const productId = 'product123';
      const product: CreateProductDto = {
        name: 'Product 1',
        description: 'Product 1 description',
        price: 19.99,
      };
      const expectedError = new Error('Request failed');
      jest
        .spyOn(httpService.axiosRef, 'put')
        .mockRejectedValueOnce(expectedError);

      await expect(
        productsService.updateProduct(productId, product),
      ).rejects.toThrow();
      expect(httpService.axiosRef.put).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products/${productId}`,
        product,
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const productId = 'product123';
      const response = {};
      jest
        .spyOn(httpService.axiosRef, 'delete')
        .mockResolvedValueOnce(Promise.resolve({ data: response }));
      const result = await productsService.deleteProduct(productId);

      expect(result).toEqual(response);
      expect(httpService.axiosRef.delete).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products/${productId}`,
      );
    });

    it('should throw an error if an error occurs during the request', async () => {
      const productId = 'product123';
      const expectedError = new Error('Request failed');
      jest
        .spyOn(httpService.axiosRef, 'delete')
        .mockRejectedValueOnce(expectedError);

      await expect(productsService.deleteProduct(productId)).rejects.toThrow();
      expect(httpService.axiosRef.delete).toHaveBeenCalledWith(
        `${productsService.apiProductsUrl}/products/${productId}`,
      );
    });
  });
});
