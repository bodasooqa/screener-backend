import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { BybitService } from './bybit.service';
import { Response } from 'express';
import { AxiosError } from 'axios';
import { BybitError, IBybitGetKlineRequestParams } from './bybit.model';

@Controller('bybit')
export class BybitController {
  constructor(private readonly bybitService: BybitService) {}

  @Get('kline')
  async getKline(
    @Query() params: IBybitGetKlineRequestParams,
    @Res() res: Response
  ) {
    this.bybitService
      .getKline(params)
      .then((data) => {
        res.status(HttpStatus.OK).json(data);
      })
      .catch(({ response }: AxiosError<BybitError>) => {
        console.log('ERROR:', response.data.retMsg);
        res.status(response.status).json(response.data);
      });
  }
}
