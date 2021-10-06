import { IKlineSeries } from "../models/ikline-series";

import { createElement } from "../helpers/create-element";

import { ToolbarComponent } from "./toolbar-components/toolbar-component";
import { GraphComponent } from "./graph-components/graph-component";

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

  public get element(): HTMLElement {
    return this._element;
  }

  public get graphComponent(): GraphComponent {
    return this._graphComponent;
  }

  public set tool(value: string) {
    this._tool = value;
  }

  public render(): void {
    this._graphComponent.render();
  }

  public setKlineData(klineSeriesArray: IKlineSeries[]): void {
    this._graphComponent.setKlineData(klineSeriesArray);
  }

  public setTAData(taData: any[]): void {
    this._graphComponent.setTAData(taData);
  }
}
