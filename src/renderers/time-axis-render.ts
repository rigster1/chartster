import { Matrix } from "mathjs";

import { ISettings } from "../models/isettings";

export const renderTimeAxis = (
  ctx: CanvasRenderingContext2D,
  tMatrix: Matrix,
  settings: ISettings
): void => {
  ctx.fillStyle = settings.color;
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, 1);
};
