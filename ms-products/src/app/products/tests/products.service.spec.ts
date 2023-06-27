import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from '../products.service';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: Model<ProductDocument>;

  const mockProductDto = {
    save: jest.fn().mockResolvedValue({
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    }),
  };

  const mockProductList = [
    {
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockProductDto),
            findAll: jest.fn().mockResolvedValue(mockProductDto),
            find: jest.fn().mockResolvedValue(mockProductList),
            findById: jest.fn().mockResolvedValue(mockProductList[0]),
            remove: jest.fn(),
            findByIdAndRemove: jest.fn(),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockProductList[0]),
            update: jest.fn().mockResolvedValue(mockProductList[0]),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productModel = module.get<Model<ProductDocument>>(
      getModelToken(Product.name),
    );
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
      };

      const product = await service.create(createProductDto);
      expect(product).toStrictEqual(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      expect(await service.findAll()).toStrictEqual(mockProductList);
    });
  });

  describe('findOne', () => {
    it('should return the product with the given id', async () => {
      const product = await service.findOne('1');
      expect(product).toStrictEqual(mockProductList[0]);
    });
  });

  describe('update', () => {
    it('should update the product with the given id', async () => {
      const product = await service.update('1', {
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
      });

      expect(product).toStrictEqual(mockProductList[0]);
    });
  });

  describe('remove', () => {
    it('should remove the product with the given id', async () => {
      await service.remove('1');
      expect(productModel.findByIdAndRemove).toBeCalledWith('1');
    });
  });
});
