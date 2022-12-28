import { Module } from '@nestjs/common';
import { BybitController } from './bybit.controller';
import { BybitService } from './bybit.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('BYBIT_API_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BybitController],
  providers: [BybitService],
})
export class BybitModule {}
