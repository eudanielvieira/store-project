import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoppingCartsModule } from './shoppingCarts/shoppingCarts.module';
import { typeOrmConfigAsync } from '../configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ShoppingCartsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
