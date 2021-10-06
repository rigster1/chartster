import { IKlineSeries } from "../models/ikline-series";

export interface IChartApi {
  render(): void;
  setKlineData(klineSeriesArray: IKlineSeries[]): void;
  setTAData(klineData: any[]): void;
}
