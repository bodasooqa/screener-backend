import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import {
  BybitError,
  IBybitGetKlineRequestParams,
  IBybitKline,
  IBybitKlineResponse,
} from './bybit.model';

@Injectable()
export class BybitService {
  constructor(private readonly httpService: HttpService) {}

  async getKline(params: IBybitGetKlineRequestParams): Promise<IBybitKline> {
    const { data } = await firstValueFrom<AxiosResponse<IBybitKlineResponse>>(
      this.httpService
        .get<IBybitKlineResponse>('/spot/v3/public/quote/kline', {
          params: {
            ...params,
            limit: Number(params.limit) || 500,
            endTime: Date.now(),
          },
        })
        .pipe(
          catchError((error: AxiosError<BybitError>) => {
            throw error;
          })
        )
    );

    return data.result.list;
  }
}
