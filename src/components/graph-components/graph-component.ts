import { identity, Matrix } from "mathjs";

import { IKline } from "../../models/ikline";
import { IKlineSeries } from "../../models/ikline-series";
import { IObjectTree } from "../../models/iobject-tree";
import { IRect } from "../../models/irect";

import { createElement } from "../../helpers/create-element";
import { realAreaToMatrix } from "../../helpers/real-area-to-matrix";
import { renderGraph } from "../../renderers/graph-render";

import { ChartComponent } from "../chart-component";
import { KlineViewerComponent } from "./kline-viewer-component";
import { PriceAxisComponent } from "./price-axis-component";
import { SettingsComponent } from "./settings-component";
import { TimeAxisComponent } from "./time-axis-component";

export class GraphComponent {
  private _element: HTMLElement;

  private _klineViewerComponent: KlineViewerComponent;
  private _priceAxisComponent: PriceAxisComponent;
  private _timeAxisComponent: TimeAxisComponent;
  private _settingsComponent: SettingsComponent;

  private _klineSeriesArray: IKlineSeries[];
  private _objectTree: IObjectTree;

  private _transformationMatrix: Matrix;

  public constructor(chartComponent: ChartComponent) {
    this._element = createElement({
      type: "div",
      className: "graph",
      style: {
        lineHeight: 0,
        height: "100%",
        width: "100%",
        flex: "1",
      },
    });

    chartComponent.element.appendChild(this._element);

    this._klineViewerComponent = new KlineViewerComponent(this);
    this._priceAxisComponent = new PriceAxisComponent(this);
    this._timeAxisComponent = new TimeAxisComponent(this);
    this._settingsComponent = new SettingsComponent(this);

    this._klineSeriesArray = [];
    this._objectTree = {
      klineSeries: {
        interval: 0,
        klines: [],
      },
      taData: [],
    };

    this._transformationMatrix = identity(3, 3) as Matrix;
  }

  public get element(): HTMLElement {
    return this._element;
  }

  public get transformationMatrix(): Matrix {
    return this._transformationMatrix;
  }

  public set transformationMatrix(value: Matrix) {
    this._transformationMatrix = value;
  }

  public render(): void {
    this._objectTree.klineSeries = this._klineSeriesArray[0];

    renderGraph(
      this._klineViewerComponent.canvasContext,
      this._priceAxisComponent.canvasContext,
      this._timeAxisComponent.canvasContext,
      this._objectTree,
      this._transformationMatrix
    );
  }

  public setKlineData(klineSeriesArray: IKlineSeries[]): void {
    this._klineSeriesArray[0] = klineSeriesArray[0];

    const interval: number = klineSeriesArray[0].interval;
    const klines: IKline[] = klineSeriesArray[0].klines;

    const maxHigh: number = Math.max(...klines.map((o) => o.high), 0);
    const minLow: number = Math.min(
      ...klines.map((o) => o.low),
      Number.MAX_VALUE
    );

    const height: number = maxHigh - minLow;

    const realArea: IRect = {
      topLeft: {
        x: klines[0].openTime - interval,
        y: maxHigh + height / 10,
      },
      bottomRight: {
        x: klines[klines.length - 1].openTime + interval,
        y: minLow - height / 10,
      },
    };

    this._transformationMatrix = realAreaToMatrix(
      realArea,
      this._klineViewerComponent.canvas.getBoundingClientRect()
    );
  }

  public setTAData(taData: any[]): void {
    this._objectTree.taData = taData;
  }
}
