import { Test, TestingModule } from '@nestjs/testing';
import { BybitController } from './bybit.controller';
import { BybitService } from './bybit.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [BybitController],
      providers: [BybitService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // const bybitController = app.get(BybitController);
      // expect(bybitController.getKline('BTCUSDT')).toBe('Hello World!');
    });
  });
});
