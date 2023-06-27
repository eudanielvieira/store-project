import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartProduct } from '../entities/cartProduct.entity';
import { ProductDTO } from '../dtos/product.dto';
import { ShoppingCartsService } from '../shoppingCarts.service';

describe('ShoppingCartsService', () => {
  let service: ShoppingCartsService;
  let cartRepository: Repository<Cart>;
  let cartProductRepository: Repository<CartProduct>;

  beforeEach(async () => {
    cartRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    } as any;

    cartProductRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new ShoppingCartsService(cartRepository, cartProductRepository);
  });

  describe('createEmptyCart', () => {
    it('should create an empty cart', async () => {
      const userId = 'user123';
      const newCart = {
        id: 'cart123',
        userId,
        totalPrice: 0,
        totalQuantity: 0,
        status: 'active',
        createdAt: new Date(),
        cartProducts: [],
        hasId: jest.fn(),
        save: jest.fn(),
        remove: jest.fn(),
        softRemove: jest.fn(),
        recover: jest.fn(),
        reload: jest.fn(),
        toJSON: jest.fn(),
      };

      jest.spyOn(cartRepository, 'create').mockReturnValue(newCart);
      jest.spyOn(cartRepository, 'save').mockResolvedValue(newCart);

      const result = await service.createEmptyCart(userId);

      expect(cartRepository.create).toHaveBeenCalledWith({
        userId: userId,
        totalPrice: 0,
        totalQuantity: 0,
      });
      expect(cartRepository.save).toHaveBeenCalledWith(newCart);
      expect(result).toEqual(newCart);
    });
  });

  describe('getCart', () => {
    it('should get the cart by cartId and userId', async () => {
      const cartProduct: CartProduct = new CartProduct();
      cartProduct.id = 'cartProduct123';
      cartProduct.productId = 'product123';
      cartProduct.price = 20;
      cartProduct.quantity = 2;

      const cart: Cart = new Cart();
      cart.id = 'cart123';
      cart.status = 'active';
      cart.userId = 'user123';
      cart.totalPrice = 100;
      cart.totalQuantity = 5;
      cart.createdAt = new Date();
      cart.cartProducts = [cartProduct];

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(cart);

      const result = await service.getCart('cart123', 'user123');

      expect(cartRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'cart123', userId: 'user123' },
        relations: ['cartProducts'],
      });
      expect(result).toEqual(cart);
    });

    it('should throw NotFoundException if the cart does not exist', async () => {
      const cartId = 'cart123';
      const userId = 'user123';
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getCart(cartId, userId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(cartRepository.findOne).toHaveBeenCalledWith({
        where: { id: cartId, userId: userId },
        relations: ['cartProducts'],
      });
    });
  });

  describe('addProductFromCart', () => {
    it('should add a product to the cart', async () => {
      const cartId = 'cart123';
      const userId = 'user123';
      const productDTO: ProductDTO = {
        productId: 'product123',
        price: 50,
        quantity: 2,
      };

      const cartProduct: CartProduct = new CartProduct();
      cartProduct.id = 'cartProduct123';
      cartProduct.productId = 'product123';
      cartProduct.price = 20;
      cartProduct.quantity = 2;

      const cart: Cart = new Cart();
      cart.id = 'cart123';
      cart.status = 'active';
      cart.userId = 'user123';
      cart.totalPrice = 100;
      cart.totalQuantity = 5;
      cart.createdAt = new Date();
      cart.cartProducts = [cartProduct];

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(cart);
      jest.spyOn(cartProductRepository, 'create').mockReturnValue(cartProduct);
      jest.spyOn(cartProductRepository, 'save').mockResolvedValue(null);
      jest.spyOn(cartRepository, 'save').mockResolvedValue(cart);

      const result = await service.addProductFromCart(
        cartId,
        userId,
        productDTO,
      );

      expect(cartRepository.findOne).toHaveBeenCalledWith({
        where: { id: cartId, userId: userId },
        relations: ['cartProducts'],
      });
      expect(cartProductRepository.create).toHaveBeenCalledWith({
        cart: cart.id,
        productId: productDTO.productId,
        quantity: productDTO.quantity,
        price: productDTO.price,
      });
      expect(cartProductRepository.save).toHaveBeenCalledWith(cartProduct);
      expect(cart.totalPrice).toBe(200);
      expect(cart.totalQuantity).toBe(7);
      expect(cartRepository.save).toHaveBeenCalledWith(cart);
      expect(result).toEqual(cart);
    });

    it('should throw NotFoundException if the cart does not exist', async () => {
      const cartId = 'cart123';
      const userId = 'user123';
      const productDTO: ProductDTO = {
        productId: 'product123',
        price: 50,
        quantity: 2,
      };
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.addProductFromCart(cartId, userId, productDTO),
      ).rejects.toThrowError(NotFoundException);
      expect(cartRepository.findOne).toHaveBeenCalledWith({
        where: { id: cartId, userId: userId },
        relations: ['cartProducts'],
      });
    });
  });

  describe('deleteProductFromCart', () => {
    it('should delete a product from the cart', async () => {
      const cartId = 'cart123';
      const userId = 'user123';
      const productId = 'product2';

      const cartProduct: CartProduct = new CartProduct();
      cartProduct.id = 'cartProduct123';
      cartProduct.productId = 'product123';
      cartProduct.price = 20;
      cartProduct.quantity = 2;

      const cart: Cart = new Cart();
      cart.id = 'cart123';
      cart.status = 'active';
      cart.userId = 'user123';
      cart.totalPrice = 100;
      cart.totalQuantity = 3;
      cart.createdAt = new Date();
      cart.cartProducts = [cartProduct];

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(cart);
      jest
        .spyOn(cartProductRepository, 'findOne')
        .mockResolvedValue(cartProduct);
      jest.spyOn(cartProductRepository, 'delete').mockResolvedValue(null);
      jest.spyOn(cartRepository, 'save').mockResolvedValue(cart);

      const result = await service.deleteProductFromCart(
        cartId,
        userId,
        productId,
      );

      expect(cartRepository.findOne).toHaveBeenCalledWith({
        where: { id: cartId, userId: userId },
        relations: ['cartProducts'],
      });
      expect(cartProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
        relations: ['cart'],
      });
      expect(cartProductRepository.delete).toHaveBeenCalledWith(productId);
      expect(cart.totalPrice).toBe(60);
      expect(cart.totalQuantity).toBe(1);
      expect(cartRepository.save).toHaveBeenCalledWith(cart);
      expect(result).toEqual(cart);
    });

    it('should throw NotFoundException if the cart does not exist', async () => {
      const cartId = 'cart123';
      const userId = 'user123';
      const productId = 'product2';
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteProductFromCart(cartId, userId, productId),
      ).rejects.toThrowError(NotFoundException);
      expect(cartRepository.findOne).toHaveBeenCalledWith({
        where: { id: cartId, userId: userId },
        relations: ['cartProducts'],
      });
    });

    it('should throw NotFoundException if the product does not exist on the cart', async () => {
      const cartId = 'cart123';
      const userId = 'user123';
      const productId = 'product2';
      const cartProduct: CartProduct = new CartProduct();
      cartProduct.id = 'cartProduct123';
      cartProduct.productId = 'product123';
      cartProduct.price = 20;
      cartProduct.quantity = 2;

      const cart: Cart = new Cart();
      cart.id = 'cart123';
      cart.status = 'active';
      cart.userId = 'user123';
      cart.totalPrice = 100;
      cart.totalQuantity = 3;
      cart.createdAt = new Date();
      cart.cartProducts = [cartProduct];

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(cart);
      jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteProductFromCart(cartId, userId, productId),
      ).rejects.toThrowError(NotFoundException);
      expect(cartRepository.findOne).toHaveBeenCalledWith({
        where: { id: cartId, userId: userId },
        relations: ['cartProducts'],
      });
      expect(cartProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
        relations: ['cart'],
      });
    });
  });
});
