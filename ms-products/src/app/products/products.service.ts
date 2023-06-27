import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const product = await this.productModel.create(createProductDto);
    return product.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find();
  }

  async findOne(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    return this.productModel.findByIdAndRemove(id);
  }
}
