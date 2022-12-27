import { Module } from '@nestjs/common';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('BINANCE_API_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BinanceController],
  providers: [BinanceService],
})
export class BinanceModule {}
