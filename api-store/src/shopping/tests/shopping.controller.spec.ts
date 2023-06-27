import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingController } from '../shopping.controller';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';
import { CartProductDTO } from '../dtos/cart-product.dto';
import { CreateProductDto } from '../dtos/create-product.dto';

describe('ShoppingController', () => {
  let controller: ShoppingController;
  let cartService: CartService;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingController],
      providers: [CartService, ProductsService],
    }).compile();

    controller = module.get<ShoppingController>(ShoppingController);
    cartService = module.get<CartService>(CartService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('getProducts', () => {
    it('should get all products', async () => {
      const expectedResponse = {
        id: 'idExample',
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      jest
        .spyOn(productsService, 'getProducts')
        .mockResolvedValueOnce(expectedResponse);

      const result = await controller.getProducts();

      expect(result).toBe(expectedResponse);
      expect(productsService.getProducts).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should get a product by ID', async () => {
      const productId = 'product123';
      const expectedResponse = {
        id: 'idExample',
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      jest
        .spyOn(productsService, 'getProductById')
        .mockResolvedValueOnce(expectedResponse);

      const result = await controller.getProductById(productId);

      expect(result).toBe(expectedResponse);
      expect(productsService.getProductById).toHaveBeenCalledWith(productId);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const product: CreateProductDto = {
        name: 'Product 1',
        description: 'Product 1 description',
        price: 19.99,
      };
      const expectedResponse = {
        id: 'idExample',
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      jest
        .spyOn(productsService, 'createProduct')
        .mockResolvedValueOnce(expectedResponse);

      const result = await controller.createProduct(product);

      expect(result).toBe(expectedResponse);
      expect(productsService.createProduct).toHaveBeenCalledWith(product);
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
      const expectedResponse = {
        id: 'idExample',
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      jest
        .spyOn(productsService, 'updateProduct')
        .mockResolvedValueOnce(expectedResponse);

      const result = await controller.updateProduct(productId, product);

      expect(result).toBe(expectedResponse);
      expect(productsService.updateProduct).toHaveBeenCalledWith(
        productId,
        product,
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const productId = 'product123';
      const expectedResponse = {
        id: 'idExample',
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      jest
        .spyOn(productsService, 'deleteProduct')
        .mockResolvedValueOnce(expectedResponse);

      const result = await controller.deleteProduct(productId);

      expect(result).toBe(expectedResponse);
      expect(productsService.deleteProduct).toHaveBeenCalledWith(productId);
    });
  });

  describe('createEmptyCart', () => {
    it('should create an empty cart', async () => {
      const userId = 'user123';
      const expectedResponse = {
        id: 'idExample',
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      jest
        .spyOn(cartService, 'createEmptyCart')
        .mockResolvedValueOnce(expectedResponse);

      const result = await controller.createEmptyCart(userId);

      expect(result).toBe(expectedResponse);
      expect(cartService.createEmptyCart).toHaveBeenCalledWith(userId);
    });
  });

  describe('getCart', () => {
    it('should get a shopping cart', async () => {
      const cartId = 'cart123';
      const userId = 'user123';
      const expectedResponse = {
        id: 'idExample',
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      jest
        .spyOn(cartService, 'getCart')
        .mockResolvedValueOnce(expectedResponse);

      const result = await controller.getCart(cartId, userId);

      expect(result).toBe(expectedResponse);
      expect(cartService.getCart).toHaveBeenCalledWith(cartId, userId);
    });
  });

  describe('addProductFromCart', () => {
    it('should add a product to a shopping cart', async () => {
      const cartId = 'cart123';
      const userId = 'user123';
      const cartProduct: CartProductDTO = {
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      const expectedResponse = {
        id: 'idExample',
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      jest
        .spyOn(cartService, 'addProductFromCart')
        .mockResolvedValueOnce(expectedResponse);

      const result = await controller.addProductFromCart(
        cartId,
        userId,
        cartProduct,
      );

      expect(result).toBe(expectedResponse);
      expect(cartService.addProductFromCart).toHaveBeenCalledWith(
        cartId,
        userId,
        cartProduct,
      );
    });
  });

  describe('deleteProductFromCart', () => {
    it('should delete a product from a shopping cart', async () => {
      const cartId = 'cart123';
      const userId = 'user123';
      const productId = 'product123';
      const expectedResponse = {
        id: 'idExample',
        productId: 'productIdExample',
        price: 10,
        quantity: 1,
      };
      jest
        .spyOn(cartService, 'deleteProductFromCart')
        .mockResolvedValueOnce(expectedResponse);

      const result = await controller.deleteProductFromCart(
        cartId,
        userId,
        productId,
      );

      expect(result).toBe(expectedResponse);
      expect(cartService.deleteProductFromCart).toHaveBeenCalledWith(
        cartId,
        userId,
        productId,
      );
    });
  });
});
