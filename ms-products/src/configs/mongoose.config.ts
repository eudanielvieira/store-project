import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export default class MongooseConfig {
  static getMongoConfig(configService: ConfigService): MongooseModuleOptions {
    return {
      uri: configService.get<string>('MONGO_URI'),
      dbName: configService.get<string>('MONGO_DB_NAME'),
    };
  }
}

export const mongooseConfig = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<MongooseModuleOptions> =>
    MongooseConfig.getMongoConfig(configService),
  inject: [ConfigService],
};
