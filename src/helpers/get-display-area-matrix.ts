import { IRect } from "../models/irect";
import { multiplyMatrix } from "./matrix-multiplication";

export const getDisplayAreaMatrix = (realArea: IRect, canvasArea: DOMRect) => {
  const realWidth = realArea.bottomRight.x - realArea.topLeft.x;
  const realHeight = realArea.topLeft.y - realArea.bottomRight.y;

  const canvasWidth = canvasArea.width;
  const canvasHeight = canvasArea.height;

  var tMatrix = [
    1,
    0,
    -realArea.topLeft.x,
    0,
    1,
    -realArea.bottomRight.y,
    0,
    0,
    1,
  ];

  const xScale = canvasWidth / realWidth;
  const yScale = canvasHeight / realHeight;

  console.log(realHeight);

  console.log(canvasWidth, realWidth);
  console.log(canvasHeight, realHeight);

  var s = [xScale, 0, 0, 0, yScale, 0, 0, 0, 1];

  var x3 = multiplyMatrix(s, tMatrix);

  tMatrix = x3;

  console.log(tMatrix);

  return tMatrix;
};
