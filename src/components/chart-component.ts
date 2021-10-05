import { ToolbarComponent } from "./toolbar-components/toolbar-component";
import { GraphComponent } from "./graph-components/graph-component";

import { IKlineSeries } from "../models/ikline-series";

import { createElement } from "../helpers/create-element";

export class ChartComponent {
  private _element: HTMLElement;
  private _toolbarComponent: ToolbarComponent;
  private _graphComponent: GraphComponent;

  private _tool: string;

  public constructor(container: HTMLElement) {
    this._element = createElement({
      type: "div",
      className: "chart",
      style: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
        width: "100%",
      },
    });

    container.appendChild(this._element);

    this._toolbarComponent = new ToolbarComponent(this);
    this._graphComponent = new GraphComponent(this);
  }

  public get element() {
    return this._element;
  }

  public get graphComponent() {
    return this._graphComponent;
  }

  public set tool(value: string) {
    this._tool = value;
  }

  public render() {
    this._graphComponent.render();
  }

  public setKlineData(klineSeriesArray: IKlineSeries[]) {
    this._graphComponent.setKlineData(klineSeriesArray);
  }

  public setTAData(taData: any[]) {
    this._graphComponent.setTAData(taData);
  }
}
