import { Test, TestingModule } from '@nestjs/testing';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [BinanceController],
      providers: [BinanceService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // const binanceController = app.get(BinanceController);
      // expect(binanceController.getHello()).toBe('Hello World!');
    });
  });
});
