import { multiplyMatrix } from "../helpers/matrix-multiplication";
import { IKline } from "../models/ikline";
import { IKlineSeries } from "../models/ikline-series";
import { IObjectTree } from "../models/iobject-tree";

export const renderKlines = (
  ctx: CanvasRenderingContext2D,
  klineSeries: IKlineSeries,
  tMatrix: Array<number>
) => {
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

      const tLI = multiplyMatrix(tMatrix, tL);
      const bRI = multiplyMatrix(tMatrix, bR);

      ctx.fillStyle = accumulation ? "#f6e7c2" : "#649fd7";
      ctx.fillRect(tLI[0], tLI[1], bRI[0] - tLI[0], bRI[1] - tLI[1]);
    };

    const wick = () => {
      const tL = [kline.openTime, kline.high, 1];
      const bR = [kline.openTime, kline.low, 1];

      const tLI = multiplyMatrix(tMatrix, tL);
      const bRI = multiplyMatrix(tMatrix, bR);

      ctx.strokeStyle = accumulation ? "#f6e7c2" : "#649fd7";
      ctx.beginPath();
      ctx.moveTo(tLI[0], tLI[1]);
      ctx.lineTo(bRI[0], bRI[1]);
      ctx.stroke();
    };

    wick();
    body();
  });
};
