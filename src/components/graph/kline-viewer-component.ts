import { createElement } from "../../helpers/create-element";
import { multiplyMatrix } from "../../helpers/matrix-multiplication";
import { IPoint } from "../../models/ipoints";
import { ChartComponent } from "../chart-component";
import { GraphComponent } from "./graph-component";

export class KlineViewerComponent {
  private _graphComponent: GraphComponent;

  private _canvas: HTMLCanvasElement;
  private _canvasContext: CanvasRenderingContext2D;

  private _drag: Boolean;
  private _dragStart: IPoint;
  private _dragEnd: IPoint;

  public constructor(graphComponent: GraphComponent) {
    this._graphComponent = graphComponent;

    this._canvas = createElement({
      type: "canvas",
      className: "kline-canvas",
      style: {
        float: "left"
      }
      attributes: {
        height: `${this._graphComponent.element.clientHeight - 100}`,
        width: `${this._graphComponent.element.clientWidth - 100}`,
      },
    });

    this._graphComponent.element.appendChild(this.canvas);

    this._canvas.onmousedown = (event: MouseEvent) => {
      this.graphMouseDown(event);
    };

    this._canvas.onmousemove = (event: MouseEvent) => {
      this.graphMouseMove(event);
    };

    this._canvas.onmouseup = (event: MouseEvent) => {
      this.graphMouseUp(event);
    };

    this._canvas.onwheel = (event: WheelEvent) => {
      this.graphWheel(event);
    };

    this._canvasContext = this._canvas.getContext("2d");

    this._drag = false;
    this._dragStart = {
      x: 0,
      y: 0,
    };
    this._dragEnd = {
      x: 0,
      y: 0,
    };
  }

  public get canvas() {
    return this._canvas;
  }

  public get canvasContext() {
    return this._canvasContext;
  }

  public getMousePos(event: MouseEvent) {
    var rect = this._canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  public graphMouseDown(event: MouseEvent) {
    this._dragStart = {
      x: event.pageX - this._canvas.offsetLeft,
      y: event.pageY - this._canvas.offsetTop,
    };

    this._drag = true;
  }

  public graphMouseUp(event: MouseEvent) {
    this._drag = false;
  }

  public graphMouseMove(event: MouseEvent) {
    if (this._drag) {
      this._dragEnd = {
        x: event.pageX - this._canvas.offsetLeft,
        y: event.pageY - this._canvas.offsetTop,
      };
      var xDrag = this._dragEnd.x - this._dragStart.x;
      var yDrag = this._dragEnd.y - this._dragStart.y;

      this._graphComponent.transformationMatrix[2] += xDrag;
      this._graphComponent.transformationMatrix[5] += yDrag;

      this._dragStart = this._dragEnd;

      this._graphComponent.render();
    }
  }

  public graphWheel(event: WheelEvent) {
    var scaleFactor = 0;

    if (event.deltaY > 0) scaleFactor = 0.75;
    else scaleFactor = 1.25;

    var mosPos = this.getMousePos(event);

    var t1 = [1, 0, mosPos.x, 0, 1, 0 /*mosPos.y*/, 0, 0, 1];
    var s = [scaleFactor, 0, 0, 0, 1 /*scaleFactor*/, 0, 0, 0, 1];
    var t2 = [1, 0, -mosPos.x, 0, 1, 0 /*-mosPos.y*/, 0, 0, 1];

    // var t1 = [1, 0, mosPos.x, 0, 1, mosPos.y, 0, 0, 1];
    // var s = [scaleFactor, 0, 0, 0, scaleFactor, 0, 0, 0, 1];
    // var t2 = [1, 0, -mosPos.x, 0, 1, -mosPos.y, 0, 0, 1];

    var x1 = multiplyMatrix(t1, s);
    var x2 = multiplyMatrix(x1, t2);

    var x3 = multiplyMatrix(x2, this._graphComponent.transformationMatrix);

    this._graphComponent.transformationMatrix = x3;

    console.log(x3);

    event.preventDefault();

    this._graphComponent.render();
  }
}
