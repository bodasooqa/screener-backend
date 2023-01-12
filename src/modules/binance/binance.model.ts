export type IBinanceCandle = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Unused field, ignore
];

export type IBinanceKlineResponse = IBinanceCandle[];

export interface IBinanceError {
  code: number;
  msg: string;
}

export interface IBinanceGetKlineRequestParams {
  symbol: string;
  interval: string;
  startTime: string;
  limit?: string;
}

export interface IBinanceExchangeSymbol {
  symbol: string;
  lastId: number;
  count: number;
}

export type BinanceExchangeSymbols = IBinanceExchangeSymbol[];
