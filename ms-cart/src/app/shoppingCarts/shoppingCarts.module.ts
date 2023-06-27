import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoppingCartsController } from './shoppingCarts.controller';
import { ShoppingCartsService } from './shoppingCarts.service';

import { Cart } from './entities/cart.entity';
import { CartProduct } from './entities/cartProduct.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([CartProduct]),
  ],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService],
  exports: [ShoppingCartsModule],
})
export class ShoppingCartsModule {}
