import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ShoppingModule } from './shopping/shopping.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ShoppingModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
