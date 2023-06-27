import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartsController } from '../shoppingCarts.controller';
import { ShoppingCartsService } from '../shoppingCarts.service';
import { CartProduct } from '../entities/CartProduct.entity';

describe('ShoppingCartsController', () => {
  let controller: ShoppingCartsController;
  let service: ShoppingCartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartsController],
      providers: [
        {
          provide: ShoppingCartsService,
          useValue: {
            createEmptyCart: jest.fn(),
            getCart: jest.fn(),
            addProductFromCart: jest.fn(),
            deleteProductFromCart: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShoppingCartsController>(ShoppingCartsController);
    service = module.get<ShoppingCartsService>(ShoppingCartsService);
  });

  describe('createEmptyCart', () => {
    it('should call createEmptyCart method in service', async () => {
      await controller.createEmptyCart('patient_id_moked');
      expect(service.createEmptyCart).toBeCalledTimes(1);
    });
  });

  describe('createEmptyCart', () => {
    it('should call getCart method in service', async () => {
      await controller.getCart('patient_id_moked', 'cart_id_moked');
      expect(service.getCart).toBeCalledTimes(1);
    });
  });

  describe('createEmptyCart', () => {
    it('should call addProductFromCart method in service', async () => {
      await controller.addProductFromCart(
        'patient_id_moked',
        'cart_id_moked',
        new CartProduct(),
      );
      expect(service.addProductFromCart).toBeCalledTimes(1);
    });
  });

  describe('createEmptyCart', () => {
    it('should call addProductFromCart method in service', async () => {
      await controller.deleteProductFromCart(
        'patient_id_moked',
        'cart_id_moked',
        'product_id_moked',
      );
      expect(service.deleteProductFromCart).toBeCalledTimes(1);
    });
  });
});
