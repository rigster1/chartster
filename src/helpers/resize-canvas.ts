export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  var scale = window.devicePixelRatio;
  console.log("scale", scale);
  canvas.width = width * scale;
  canvas.height = height * scale;

  ctx.scale(scale, scale);
};
