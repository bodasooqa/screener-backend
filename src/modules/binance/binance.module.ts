import { Module } from '@nestjs/common';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      // baseURL: 'https://api-testnet.bybit.com',
      baseURL: 'https://api.binance.com',
    }),
  ],
  controllers: [BinanceController],
  providers: [BinanceService],
})
export class BinanceModule {}
