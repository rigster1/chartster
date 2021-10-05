import { MathType, Matrix } from "mathjs";
import { IObjectTree } from "../models/iobject-tree";
import { ISettings } from "../models/isettings";

export const renderTimeAxis = (
  ctx: CanvasRenderingContext2D,
  tMatrix: Matrix,
  settings: ISettings
) => {
  ctx.fillStyle = settings.color;
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, 1);
};
