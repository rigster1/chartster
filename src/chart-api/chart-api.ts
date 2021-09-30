import { ChartComponent } from "../components/chart-component";
import { IChartApi } from "./ichart-api";
import { IKlineSeries } from "../models/ikline-series";

export class ChartApi implements IChartApi {
  private _container: HTMLElement;

  private _chartComponent: ChartComponent;

  public constructor(container: HTMLElement) {
    if (container === null) throw new Error("Element with that id not found");
    this._container = container;

    this._chartComponent = new ChartComponent(container);
  }

  public render() {
    this._chartComponent.render();
  }

  public setKlineData(klineSeriesArray: IKlineSeries[]): void {
    this._chartComponent.setKlineData(klineSeriesArray);
  }

  public setTAData(taData: any[]): void {
    this._chartComponent.setTAData(taData);
  }
}
