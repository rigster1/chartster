import { IKline } from "./ikline";

export interface IKlineSeries {
  interval: number;
  klines: IKline[];
}
