import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { Response } from 'express';
import { AxiosError } from 'axios';
import { IBinanceError, IBinanceGetKlineRequestParams } from './binance.model';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('kline')
  async getKline(
    @Query()
    { symbol, interval, startTime, limit }: IBinanceGetKlineRequestParams,
    @Res() res: Response
  ) {
    this.binanceService
      .getKline({ symbol, interval, startTime, limit })
      .then((data) => {
        res.status(HttpStatus.OK).json(data);
      })
      .catch(({ response }: AxiosError<IBinanceError>) => {
        console.log('ERROR:', response.data.msg);
        res.status(response.status).json(response.data);
      });
  }
}
