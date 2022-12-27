import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BybitModule } from './modules/bybit/bybit.module';
import { BinanceModule } from './modules/binance/binance.module';

@Module({
  imports: [BybitModule, BinanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
