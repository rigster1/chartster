import { matrix, Matrix, multiply } from "mathjs";
import { IRect } from "../models/irect";

export const realAreaToMatrix = (
  realArea: IRect,
  canvasArea: DOMRect
): Matrix => {
  const realWidth: number = realArea.bottomRight.x - realArea.topLeft.x;
  const realHeight: number = realArea.topLeft.y - realArea.bottomRight.y;

  const canvasWidth: number = canvasArea.width;
  const canvasHeight: number = canvasArea.height;

  var tMatrix: Matrix = matrix([
    [1, 0, -realArea.topLeft.x],
    [0, 1, -realArea.topLeft.y],
    [0, 0, 1],
  ]);

  const xScale: number = canvasWidth / realWidth;
  const yScale: number = canvasHeight / -realHeight;

  var s: Matrix = matrix([
    [xScale, 0, 0],
    [0, yScale, 0],
    [0, 0, 1],
  ]);

  var x3: Matrix = multiply(tMatrix, s);

  return x3;
};
