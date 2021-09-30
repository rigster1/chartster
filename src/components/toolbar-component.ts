import { createElement } from "../helpers/create-element";
import { ChartComponent } from "./chart-component";

export class ToolbarComponent {
  private _element: HTMLElement;

  public constructor(chartComponent: ChartComponent) {
    this._element = createElement({
      type: "div",
      className: "toolbar",
      innerHTML:
        "<h1>Temporary text</h1><h1>Temporary text</h1><h1>Temporary text</h1>",
      style: {
        backgroundColor: "#E8647C",
      },
    });

    chartComponent.element.appendChild(this._element);
  }

  public get element() {
    return this._element;
  }
}
