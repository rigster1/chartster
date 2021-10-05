import { Settings } from "http2";
import { MathType, Matrix } from "mathjs";
import { IObjectTree } from "../models/iobject-tree";
import { ISettings } from "../models/isettings";
import { renderKlines } from "./klines-render";
import { renderPriceAxis } from "./price-axis-render";
import { renderTA } from "./ta-render";
import { renderTimeAxis } from "./time-axis-render";

export const renderGraph = (
  klineCtx: CanvasRenderingContext2D,
  priceCtx: CanvasRenderingContext2D,
  timeCtx: CanvasRenderingContext2D,
  objectTree: IObjectTree,
  tMatrix: Matrix
) => {
  const settings: ISettings = {
    color: "#131722",
  };

  renderKlines(klineCtx, objectTree.klineSeries, tMatrix, settings);
  //renderTA(ctx, objectTree.taData);

  renderPriceAxis(priceCtx, tMatrix, settings);
  renderTimeAxis(timeCtx, tMatrix, settings);
};
