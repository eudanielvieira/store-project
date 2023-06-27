import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { mongooseConfig } from '../configs/mongoose.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync(mongooseConfig),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
