import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ShoppingController } from './shopping.controller';
import { CartService } from './cart.service';
import { ProductsService } from './products.service';

@Module({
  imports: [HttpModule],
  controllers: [ShoppingController],
  providers: [CartService, ProductsService],
  exports: [ShoppingModule],
})
export class ShoppingModule {}
