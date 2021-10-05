import { MathType, Matrix, multiply, subset } from "mathjs";
import { IKline } from "../models/ikline";
import { IKlineSeries } from "../models/ikline-series";
import { IObjectTree } from "../models/iobject-tree";
import { ISettings } from "../models/isettings";

export const renderKlines = (
  ctx: CanvasRenderingContext2D,
  klineSeries: IKlineSeries,
  tMatrix: Matrix,
  settings: ISettings
) => {
  ctx.fillStyle = settings.color;
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  const barWidth = klineSeries.interval * 0.75;

  klineSeries.klines.forEach((kline) => {
    const accumulation = kline.open >= kline.close;

    const body = () => {
      const tL = [
        kline.openTime - barWidth / 2,
        accumulation ? kline.close : kline.open,
        1,
      ];
      const bR = [
        kline.openTime + barWidth / 2,
        accumulation ? kline.open : kline.close,
        1,
      ];

      const tLI = multiply(tMatrix, tL) as Matrix;
      const bRI = multiply(tMatrix, bR) as Matrix;

      const width = bRI.get([0]) - tLI.get([0]);
      const height = bRI.get([1]) - tLI.get([1]);

      ctx.fillStyle = accumulation ? "#649fd7" : "#f6e7c2";
      ctx.fillRect(
        Math.round(tLI.get([0])),
        Math.round(tLI.get([1])),
        Math.round(width),
        Math.round(Math.abs(height) < 1 ? 1 : height)
      );
    };

    const wick = () => {
      const tL = [kline.openTime, kline.high, 1];
      const bR = [kline.openTime, kline.low, 1];

      const tLI = multiply(tMatrix, tL);
      const bRI = multiply(tMatrix, bR);

      ctx.strokeStyle = accumulation ? "#649fd7" : "#f6e7c2";
      ctx.beginPath();

      console.log(tLI.get([0]), tLI.get([1]));

      ctx.moveTo(tLI.get([0]), tLI.get([1]));
      ctx.lineTo(bRI.get([0]), bRI.get([1]));
      ctx.stroke();
    };

    wick();
    body();
  });
};
