export interface IBybitCandle {
  t: number;
  s: string;
  sn: string;
  c: string;
  h: string;
  l: string;
  o: string;
  v: string;
}

export type IBybitKline = IBybitCandle[];

export interface IBybitKlineResponse extends BybitError {
  result: {
    list: IBybitKline;
  };
}

export interface BybitError {
  retCode: number;
  retMsg: string;
  time: number;
}

export interface IBybitGetKlineRequestParams {
  symbol: string;
  interval: string;
  startTime: string;
  limit?: string;
}
