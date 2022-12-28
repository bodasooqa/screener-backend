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
    const { config, headers, data, request } = await firstValueFrom<
      AxiosResponse<IBybitKlineResponse>
    >(
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

    if ('list' in data.result) {
      return data.result.list;
    } else {
      throw new AxiosError<BybitError>(
        data.retMsg,
        `${data.retCode}`,
        config,
        request,
        {
          config,
          headers,
          statusText: 'Bad request',
          status: 400,
          data: {
            retMsg: data.retMsg,
            retCode: data.retCode,
            time: data.time,
          },
        }
      );
    }
  }
}
