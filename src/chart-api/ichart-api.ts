import { IKlineSeries } from "../models/ikline-series";

export interface IChartApi {
  setKlineData(klineSeriesArray: IKlineSeries[]): void;
  setTAData(klineData: any[]): void;
  render(): void;
}
