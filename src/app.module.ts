import {
  // CacheModule,
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BybitModule } from './modules/bybit/bybit.module';
import { BinanceModule } from './modules/binance/binance.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TODO: Realise cache management
    // CacheModule.register({
    //   isGlobal: true,
    // }),
    BybitModule,
    BinanceModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
