import { identity, MathType, Matrix } from "mathjs";

import { IKlineSeries } from "../../models/ikline-series";
import { IObjectTree } from "../../models/iobject-tree";

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

  private _klineSeriesArray: IKlineSeries[] = [];
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

    this._objectTree = {
      klineSeries: {
        interval: 0,
        klines: [],
      },
      taData: [],
    };

    this._transformationMatrix = identity(3, 3) as Matrix;
  }

  public get element() {
    return this._element;
  }

  public get transformationMatrix() {
    return this._transformationMatrix;
  }

  public set transformationMatrix(value: Matrix) {
    this._transformationMatrix = value;
  }

  public render() {
    this._objectTree.klineSeries = this._klineSeriesArray[0];

    renderGraph(
      this._klineViewerComponent.canvasContext,
      this._priceAxisComponent.canvasContext,
      this._timeAxisComponent.canvasContext,
      this._objectTree,
      this._transformationMatrix
    );
  }

  public setKlineData(klineSeriesArray: IKlineSeries[]) {
    this._klineSeriesArray[0] = klineSeriesArray[0];

    const interval = klineSeriesArray[0].interval;
    const klines = klineSeriesArray[0].klines;

    const accumulation = klines[0].close > klines[0].open;

    const maxHigh = Math.max(...klines.map((o) => o.high), 0);
    const minLow = Math.min(...klines.map((o) => o.low), Number.MAX_VALUE);
    const height = maxHigh - minLow;

    console.log("maxHigh", maxHigh);
    console.log("minLow", minLow);

    this._transformationMatrix = realAreaToMatrix(
      {
        topLeft: {
          x: klines[0].openTime - interval,
          y: maxHigh + height / 10,
        },
        bottomRight: {
          x: klines[klines.length - 1].openTime + interval,
          y: minLow - height / 10,
        },
      },
      this._klineViewerComponent.canvas.getBoundingClientRect()
    );

    console.log("start", this._transformationMatrix);
  }

  public setTAData(taData: any[]) {
    this._objectTree.taData = taData;
  }
}
