import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import {
  BinanceExchangeSymbols,
  IBinanceError,
  IBinanceGetKlineRequestParams,
  IBinanceKlineResponse,
} from './binance.model';

@Injectable()
export class BinanceService {
  constructor(private readonly httpService: HttpService) {}

  async getKline(
    params: IBinanceGetKlineRequestParams
  ): Promise<IBinanceKlineResponse> {
    const { data } = await firstValueFrom<AxiosResponse<IBinanceKlineResponse>>(
      this.httpService
        .get<IBinanceKlineResponse>('/api/v3/klines', {
          params: {
            ...params,
            limit: Number(params.limit) || 500,
          },
        })
        .pipe(
          catchError((error: AxiosError<IBinanceError>) => {
            throw error;
          })
        )
    );

    return data;
  }

  async getSpotSymbols(): Promise<BinanceExchangeSymbols> {
    const { data } = await firstValueFrom<
      AxiosResponse<BinanceExchangeSymbols>
    >(
      this.httpService
        .get<BinanceExchangeSymbols>('/api/v3/ticker/24hr', {
          params: {
            type: 'MINI',
          },
        })
        .pipe(
          catchError((error: AxiosError<IBinanceError>) => {
            throw error;
          })
        )
    );

    return data;
  }
}
