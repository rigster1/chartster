import { MathType, Matrix, multiply } from "mathjs";
import { IRect } from "../models/irect";

export const matrixToRealArea = (
  imageMatrix: MathType,
  canvasArea: DOMRect
) => {
  const canvasTL = [0, 0, 1];
  const canvasBR = [canvasArea.width, canvasArea.height, 1];

  const realTL = multiply(imageMatrix, canvasTL) as Matrix;
  const realBR = multiply(imageMatrix, canvasBR) as Matrix;

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
