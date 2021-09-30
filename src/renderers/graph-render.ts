import { getDisplayAreaMatrix } from "../helpers/get-display-area-matrix";
import { multiplyMatrix } from "../helpers/matrix-multiplication";
import { IObjectTree } from "../models/iobject-tree";
import { renderKlines } from "./klines-render";
import { renderPriceAxis } from "./price-axis-render";
import { renderTA } from "./ta-render";
import { renderTimeAxis } from "./time-axis-render";

export const renderGraph = (
  ctx: CanvasRenderingContext2D,
  objectTree: IObjectTree,
  tMatrix: Array<number>
) => {
  ctx.fillStyle = "#131722";
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  renderKlines(ctx, objectTree.klineSeries, tMatrix);
  //renderTA(ctx, objectTree.taData);

  //renderPriceAxis(ctx, tMatrix);
  //renderTimeAxis(ctx, tMatrix);
};
