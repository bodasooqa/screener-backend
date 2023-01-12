import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BinanceService } from '../binance/binance.service';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
// import { StoreService } from '../store/store.service';
// import { CachedSymbols } from '../store/store.model';

@Injectable()
export class TasksService {
  constructor(
    // private readonly storeService: StoreService
    private readonly binanceService: BinanceService,
    private readonly firebaseAdminService: FirebaseAdminService
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async updateBinanceSpotSymbols() {
    const symbols = await this.binanceService.getSpotSymbols();
    const formattedSymbols = symbols
      .filter((symbol) => symbol.lastId > 0 && !!symbol.count)
      .map((symbol) => symbol.symbol);

    await this.firebaseAdminService.setBinanceSpot(formattedSymbols);

    // await this.storeService.set<string[]>(
    //   CachedSymbols.BINANCE_SPOT,
    //   formattedSymbols
    // );
  }
}
