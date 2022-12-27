import { Module } from '@nestjs/common';
import { BybitController } from './bybit.controller';
import { BybitService } from './bybit.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      // baseURL: 'https://api-testnet.bybit.com',
      baseURL: 'https://api.bytick.com',
    }),
  ],
  controllers: [BybitController],
  providers: [BybitService],
})
export class BybitModule {}
