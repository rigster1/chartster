import { add, matrix, Matrix, multiply } from "mathjs";

import { IPoint } from "../../models/ipoints";

import { createElement } from "../../helpers/create-element";
import { resizeCanvas } from "../../helpers/resize-canvas";

import { GraphComponent } from "./graph-component";

export class KlineViewerComponent {
  private _graphComponent: GraphComponent;

  private _canvas: HTMLCanvasElement;
  private _canvasContext: CanvasRenderingContext2D;

  private _drag: boolean;
  private _dragStart: IPoint;
  private _dragEnd: IPoint;

  public constructor(graphComponent: GraphComponent) {
    this._graphComponent = graphComponent;

    const height: number = this._graphComponent.element.clientHeight - 100;
    const width: number = this._graphComponent.element.clientWidth - 100;

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

    this._canvas.onmousedown = (event: MouseEvent): void => {
      this.graphMouseDown(event);
    };

    this._canvas.onmousemove = (event: MouseEvent): void => {
      this.graphMouseMove(event);
    };

    this._canvas.onmouseup = (event: MouseEvent): void => {
      this.graphMouseUp(event);
    };

    this._canvas.onwheel = (event: WheelEvent): void => {
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

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public get canvasContext(): CanvasRenderingContext2D {
    return this._canvasContext;
  }

  public getMousePos(event: MouseEvent): IPoint {
    const rect: DOMRect = this._canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  public graphMouseDown(event: MouseEvent): void {
    this._dragStart = {
      x: event.pageX - this._canvas.offsetLeft,
      y: event.pageY - this._canvas.offsetTop,
    };

    this._drag = true;
  }

  public graphMouseUp(event: MouseEvent): void {
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

  public graphMouseMove(event: MouseEvent): void {
    if (this._drag) {
      this._dragEnd = {
        x: event.pageX - this._canvas.offsetLeft,
        y: event.pageY - this._canvas.offsetTop,
      };

      const xDrag: number = this._dragEnd.x - this._dragStart.x;
      const yDrag: number = this._dragEnd.y - this._dragStart.y;

      const transform: Matrix = matrix([
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

  public graphWheel(event: WheelEvent): void {
    var scaleFactor: number = 0;

    if (event.deltaY > 0) scaleFactor = 0.92;
    else scaleFactor = 1.08;

    const mosPos: IPoint = this.getMousePos(event);

    const t1: Matrix = matrix([
      [1, 0, mosPos.x],
      [0, 1, 0 /*mosPos.y*/],
      [0, 0, 1],
    ]);

    const s: Matrix = matrix([
      [scaleFactor, 0, 0],
      [0, 1 /*sF*/, 0],
      [0, 0, 1],
    ]);

    const t2: Matrix = matrix([
      [1, 0, -mosPos.x],
      [0, 1, 0 /*-mosPos.y*/],
      [0, 0, 1],
    ]);

    const x1: Matrix = multiply(t1, s) as Matrix;
    const x2: Matrix = multiply(x1, t2);

    const x3: Matrix = multiply(x2, this._graphComponent.transformationMatrix);

    this._graphComponent.transformationMatrix = x3;

    this._graphComponent.render();

    event.preventDefault();
  }
}
