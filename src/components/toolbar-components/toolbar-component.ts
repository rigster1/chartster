import { createElement } from "../../helpers/create-element";

import { ChartComponent } from "../chart-component";

export class ToolbarComponent {
  private _element: HTMLElement;
  private _logoElement: HTMLElement;
  private _symbolElement: HTMLElement;
  private _timesElement: HTMLElement;
  private _toolsElement: HTMLElement;

  public constructor(chartComponent: ChartComponent) {
    const color = "#131722";

    this._element = createElement({
      type: "div",
      className: "toolbar",
      style: {
        borderBottom: "1px solid white",
        height: "50px",
        display: "flex",
        flexFlow: "row",
        backgroundColor: color,
      },
    });

    chartComponent.element.appendChild(this._element);

    this._logoElement = createElement({
      type: "div",
      className: "toolbar__logo",
      style: {
        height: "100%",
        width: "50px",
        backgroundColor: color,
      },
    });

    this._element.appendChild(this._logoElement);

    this._symbolElement = createElement({
      type: "div",
      className: "toolbar__symbol",
      style: {
        height: "100%",
        width: "100px",
        backgroundColor: color,
      },
    });

    this._element.appendChild(this._symbolElement);

    this._timesElement = createElement({
      type: "div",
      className: "toolbar__times",
      innerHTML: "<h3>Hi</h3>",
      style: {
        height: "100%",
        backgroundColor: color,
      },
    });

    this._element.appendChild(this._timesElement);

    this._toolsElement = createElement({
      type: "div",
      className: "toolbar__times",
      style: {
        flex: "1",
        height: "100%",
        backgroundColor: color,
      },
    });

    this._element.appendChild(this._toolsElement);
  }

  public get element(): HTMLElement {
    return this._element;
  }
}
