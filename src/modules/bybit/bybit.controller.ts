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
      .catch((error: AxiosError<BybitError>) => {
        console.log(error);
        if ('response' in error) {
          res.status(error.response.status).json(error.response.data);
          console.log('ERROR:', error.response.data.retMsg);
        } else {
          res.status(500).json({
            msg: error.message,
          });
          console.log('ERROR:', error.message);
        }
      });
  }
}
