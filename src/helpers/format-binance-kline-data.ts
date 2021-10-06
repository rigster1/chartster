import { IKlineSeries } from "../models/ikline-series";

export const formatBinanceKlineData = (
  binanceKlineData: any[][]
): IKlineSeries[] => {
  const newKlineData: IKlineSeries = {
    interval: binanceKlineData[0][6] - binanceKlineData[0][0],
    klines: [],
  };

  binanceKlineData.forEach((binanceKline) => {
    newKlineData.klines.push({
      openTime: binanceKline[0],
      open: parseInt(binanceKline[1]),
      high: parseInt(binanceKline[2]),
      low: parseInt(binanceKline[3]),
      close: parseInt(binanceKline[4]),
    });
  });

  return [newKlineData];
};
