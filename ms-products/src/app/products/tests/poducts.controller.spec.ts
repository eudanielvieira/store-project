import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue(new CreateProductDto()),
            update: jest.fn().mockResolvedValue(new UpdateProductDto()),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new CreateProductDto()),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  test('should be defined', () => {
    expect(ProductsController).toBeDefined();
    expect(ProductsService).toBeDefined();
  });

  describe('create', () => {
    test('should create a product', async () => {
      const product = new CreateProductDto();
      await controller.create(product);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    test('should update a product', async () => {
      const product = new UpdateProductDto();
      await controller.update('1', product);
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    test('should return an array of products', async () => {
      expect(await controller.findAll()).toStrictEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    test('should return a product', async () => {
      expect(await controller.findOne('1')).toStrictEqual(
        new CreateProductDto(),
      );
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    test('should remove a product', async () => {
      expect(await controller.remove('1')).toBeNull();
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
