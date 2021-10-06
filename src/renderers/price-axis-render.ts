import { Matrix } from "mathjs";

import { ISettings } from "../models/isettings";

import { matrixToRealArea } from "../helpers/matrix-to-real-area";
import { IRect } from "../models/irect";

export const renderPriceAxis = (
  ctx: CanvasRenderingContext2D,
  tMatrix: Matrix,
  settings: ISettings
): void => {
  ctx.fillStyle = settings.color;
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1, ctx.canvas.clientHeight);

  const canvasRect: DOMRect = ctx.canvas.getBoundingClientRect();
  const realArea: IRect = matrixToRealArea(tMatrix, canvasRect);

  const range: number = realArea.topLeft.y - realArea.bottomRight.y;

  const tickCount: number = canvasRect.height / 50;
  const unroundedTickSize: number = range / (tickCount - 1);
  const x: number = Math.ceil(Math.log10(unroundedTickSize) - 1);
  const pow10x: number = Math.pow(10, x);
  const roundedTickRange: number =
    Math.ceil(unroundedTickSize / pow10x) * pow10x;
};
