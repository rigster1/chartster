import { matrix, Matrix, multiply } from "mathjs";

import { IKlineSeries } from "../models/ikline-series";
import { ISettings } from "../models/isettings";

export const renderKlines = (
  ctx: CanvasRenderingContext2D,
  klineSeries: IKlineSeries,
  tMatrix: Matrix,
  settings: ISettings
): void => {
  ctx.fillStyle = settings.color;
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  const barWidth: number = klineSeries.interval * 0.75;

  klineSeries.klines.forEach((kline) => {
    const accumulation: boolean = kline.close >= kline.open;

    const bodyTL: Matrix = matrix([
      kline.openTime - barWidth / 2,
      accumulation ? kline.close : kline.open,
      1,
    ]);
    const bodyBR: Matrix = matrix([
      kline.openTime + barWidth / 2,
      accumulation ? kline.open : kline.close,
      1,
    ]);

    const bodyTLImage: Matrix = multiply(tMatrix, bodyTL);
    const bodyBRImage: Matrix = multiply(tMatrix, bodyBR);

    const wickTL: Matrix = matrix([kline.openTime, kline.high, 1]);
    const wickBR: Matrix = matrix([kline.openTime, kline.low, 1]);

    const wickTLImage: Matrix = multiply(tMatrix, wickTL);
    const wickBRImage: Matrix = multiply(tMatrix, wickBR);

    var tempBodyWidth: number = bodyBRImage.get([0]) - bodyTLImage.get([0]);
    var tempBodyHeight: number = bodyBRImage.get([1]) - bodyTLImage.get([1]);

    const bodyX: number = Math.round(bodyTLImage.get([0]));
    const bodyY: number = Math.round(bodyTLImage.get([1]));
    const bodyWidth: number = 2 * Math.floor(tempBodyWidth / 2) + 1;
    const bodyHeight: number =
      tempBodyHeight > 1 ? Math.round(tempBodyHeight) : 1;

    const wickX: number = bodyX + bodyWidth / 2 - 0.5;
    const wickY: number = wickTLImage.get([1]);
    const wickWidth: number = 1;
    const wickHeight: number = wickBRImage.get([1]) - wickTLImage.get([1]);

    ctx.fillStyle = accumulation ? "#f6e7c2" : "#649fd7";
    ctx.fillRect(bodyX, bodyY, bodyWidth, bodyHeight);
    ctx.fillRect(wickX, wickY, wickWidth, wickHeight);
  });
};
