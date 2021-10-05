import { createElement } from "../../helpers/create-element";
import { IPoint } from "../../models/ipoints";
import { ChartComponent } from "../chart-component";
import { GraphComponent } from "./graph-component";

export class SettingsComponent {
  private _element: HTMLElement;

  private _graphComponent: GraphComponent;

  public constructor(graphComponent: GraphComponent) {
    this._graphComponent = graphComponent;

    this._element = createElement({
      type: "div",
      className: "settings-div",
      style: {
        backgroundColor: "#1A1423",
        float: "right",
        height: `100px`,
        width: `100px`,
        borderTop: "1px solid white",
        borderLeft: "1px solid white",
      },
    });

    this._graphComponent.element.appendChild(this.element);

    this.element.onmousedown = (event: MouseEvent) => {
      console.log("click");
    };
  }

  public get element() {
    return this._element;
  }
}
