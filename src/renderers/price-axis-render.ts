import { MathType, Matrix } from "mathjs";
import { matrixToRealArea } from "../helpers/matrix-to-real-area";
import { IObjectTree } from "../models/iobject-tree";
import { ISettings } from "../models/isettings";

export const renderPriceAxis = (
  ctx: CanvasRenderingContext2D,
  tMatrix: Matrix,
  settings: ISettings
) => {
  ctx.fillStyle = settings.color;
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1, ctx.canvas.clientHeight);

  const canvasRect = ctx.canvas.getBoundingClientRect();
  const realArea = matrixToRealArea(tMatrix, canvasRect);

  const range = realArea.topLeft.y - realArea.bottomRight.y;
  console.log("range", range);
  const tickCount = canvasRect.height / 50;
  const unroundedTickSize = range / (tickCount - 1);
  const x = Math.ceil(Math.log10(unroundedTickSize) - 1);
  const pow10x = Math.pow(10, x);
  const roundedTickRange = Math.ceil(unroundedTickSize / pow10x) * pow10x;
  return roundedTickRange;
};
