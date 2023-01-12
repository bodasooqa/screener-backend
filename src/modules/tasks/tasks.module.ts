import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { BinanceModule } from '../binance/binance.module';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
// import { StoreModule } from '../store/store.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BinanceModule,
    FirebaseAdminModule,
    // StoreModule,
  ],
  providers: [TasksService],
})
export class TasksModule {}
