import { add, matrix, Matrix, multiply } from "mathjs";
import { createElement } from "../../helpers/create-element";
import { resizeCanvas } from "../../helpers/resize-canvas";
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

    const height = this._graphComponent.element.clientHeight - 100;
    const width = this._graphComponent.element.clientWidth - 100;

    this._canvas = createElement({
      type: "canvas",
      className: "kline-canvas",
      style: {
        float: "left",
        height: `${height}px`,
        width: `${width}px`,
      },
    });

    this._canvasContext = this._canvas.getContext("2d");

    resizeCanvas(this._canvas, this._canvasContext, width, height);

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
    this._dragStart = {
      x: 0,
      y: 0,
    };
    this._dragEnd = {
      x: 0,
      y: 0,
    };
  }

  public graphMouseMove(event: MouseEvent) {
    console.log(this._graphComponent.transformationMatrix);

    if (this._drag) {
      this._dragEnd = {
        x: event.pageX - this._canvas.offsetLeft,
        y: event.pageY - this._canvas.offsetTop,
      };

      console.log(this._dragEnd);

      var xDrag = this._dragEnd.x - this._dragStart.x;
      var yDrag = this._dragEnd.y - this._dragStart.y;

      var transform: Matrix = matrix([
        [0, 0, xDrag],
        [0, 0, yDrag],
        [0, 0, 0],
      ]);

      this._graphComponent.transformationMatrix = add(
        this._graphComponent.transformationMatrix,
        transform
      ) as Matrix;

      this._dragStart = this._dragEnd;

      this._graphComponent.render();
    }
  }

  public graphWheel(event: WheelEvent) {
    var scaleFactor = 0;

    if (event.deltaY > 0) scaleFactor = 0.9;
    else scaleFactor = 1.1;

    var mosPos = this.getMousePos(event);

    var t1: Matrix = matrix([
      [1, 0, mosPos.x],
      [0, 1, 0 /*mosPos.y*/],
      [0, 0, 1],
    ]);
    var s: Matrix = matrix([
      [scaleFactor, 0, 0],
      [0, 1 /*sF*/, 0],
      [0, 0, 1],
    ]);
    var t2: Matrix = matrix([
      [1, 0, -mosPos.x],
      [0, 1, 0 /*-mosPos.y*/],
      [0, 0, 1],
    ]);

    var x1: Matrix = multiply(t1, s) as Matrix;
    var x2: Matrix = multiply(x1, t2);

    var x3: Matrix = multiply(x2, this._graphComponent.transformationMatrix);

    this._graphComponent.transformationMatrix = x3;

    console.log(x3);

    event.preventDefault();

    this._graphComponent.render();
  }
}
