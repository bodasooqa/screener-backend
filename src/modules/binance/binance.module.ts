import { Module } from '@nestjs/common';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('BINANCE_API_URL'),
      }),
      inject: [ConfigService],
    }),
    FirebaseAdminModule,
  ],
  controllers: [BinanceController],
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}
