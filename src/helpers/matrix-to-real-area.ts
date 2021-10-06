import { MathType, matrix, Matrix, multiply } from "mathjs";

import { IRect } from "../models/irect";

export const matrixToRealArea = (
  imageMatrix: MathType,
  canvasArea: DOMRect
): IRect => {
  const canvasTL: Matrix = matrix([0, 0, 1]);
  const canvasBR: Matrix = matrix([canvasArea.width, canvasArea.height, 1]);

  const realTL: Matrix = multiply(imageMatrix, canvasTL) as Matrix;
  const realBR: Matrix = multiply(imageMatrix, canvasBR) as Matrix;

  return {
    topLeft: {
      x: realTL.get([0]),
      y: realTL.get([1]),
    },
    bottomRight: {
      x: realBR.get([0]),
      y: realBR.get([1]),
    },
  };
};
