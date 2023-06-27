import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { HttpService } from '@nestjs/axios';
import { CartProductDTO } from '../dtos/cart-product.dto';

describe('CartService', () => {
  let cartService: CartService;
  const httpService = new HttpService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [CartService],
    }).compile();

    cartService = module.get<CartService>(CartService);
  });

  describe('createEmptyCart', () => {
    it('should create an empty cart', async () => {
      const response = {};
      const userId = 'userIdExample';

      jest
        .spyOn(httpService.axiosRef, 'post')
        .mockResolvedValueOnce(Promise.resolve({ data: response }));

      const result = await cartService.createEmptyCart(userId);

      expect(httpService.axiosRef.post).toHaveBeenCalledWith(
        `${cartService.apiProductsUrl}/carts/user-id/${userId}`,
      );

      expect(result).toEqual(response);
    });

    it('should throw an error if an error occurs during the request', async () => {
      const userId = 'userIdExample';

      jest
        .spyOn(httpService.axiosRef, 'get')
        .mockRejectedValue(new Error('error'));

      await expect(cartService.createEmptyCart(userId)).rejects.toThrowError();
    });
  });

  describe('getCart', () => {
    it('should retrieve the cart', async () => {
      const response = {};
      const cartId = 'cartIdExample';
      const userId = 'userIdExample';

      jest
        .spyOn(httpService.axiosRef, 'get')
        .mockResolvedValue(Promise.resolve({ data: response }));

      const result = await cartService.getCart(cartId, userId);

      expect(httpService.axiosRef.get).toHaveBeenCalledWith(
        `${cartService.apiProductsUrl}/carts/cart-id/${cartId}/user-id/${userId}`,
      );

      expect(result).toEqual(response);
    });

    it('should throw an error if an error occurs during the request', async () => {
      const cartId = 'cartIdExample';
      const userId = 'userIdExample';

      jest
        .spyOn(httpService.axiosRef, 'get')
        .mockRejectedValue(new Error('error'));

      await expect(cartService.getCart(cartId, userId)).rejects.toThrowError();
    });
  });

  describe('addProductFromCart', () => {
    it('should add a product to the cart', async () => {
      const response = {};
      const cartId = 'cartIdExample';
      const userId = 'userIdExample';
      const productDTO: CartProductDTO = {
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };

      jest
        .spyOn(httpService.axiosRef, 'post')
        .mockResolvedValue(Promise.resolve({ data: response }));

      const result = await cartService.addProductFromCart(
        cartId,
        userId,
        productDTO,
      );

      expect(httpService.axiosRef.post).toHaveBeenCalledWith(
        `${cartService.apiProductsUrl}/carts/cart-id/${cartId}/user-id/${userId}`,
        productDTO,
      );

      expect(result).toEqual(response);
    });

    it('should throw an error if an error occurs during the request', async () => {
      const cartId = 'cartIdExample';
      const userId = 'userIdExample';
      const productDTO: CartProductDTO = {
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };

      jest
        .spyOn(httpService.axiosRef, 'post')
        .mockRejectedValue(new Error('error'));

      await expect(
        cartService.addProductFromCart(cartId, userId, productDTO),
      ).rejects.toThrowError();
    });
  });

  describe('deleteProductFromCart', () => {
    it('should delete a product from the cart', async () => {
      const response = {};
      const cartId = 'cartIdExample';
      const userId = 'userIdExample';
      const productId = 'productIdExample';

      jest
        .spyOn(httpService.axiosRef, 'delete')
        .mockResolvedValue(Promise.resolve({ data: response }));

      const result = await cartService.deleteProductFromCart(
        cartId,
        userId,
        productId,
      );

      expect(httpService.axiosRef.delete).toHaveBeenCalledWith(
        `${cartService.apiProductsUrl}/carts/cart-id/${cartId}/user-id/${userId}/product-id/${productId}`,
      );

      expect(result).toEqual(response);
    });

    it('should throw an error if an error occurs during the request', async () => {
      const cartId = 'cartIdExample';
      const userId = 'userIdExample';
      const productId = 'productIdExample';

      jest
        .spyOn(httpService.axiosRef, 'delete')
        .mockRejectedValue(new Error('error'));

      await expect(
        cartService.deleteProductFromCart(cartId, userId, productId),
      ).rejects.toThrowError();
    });
  });
});
