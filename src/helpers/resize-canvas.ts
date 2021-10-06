export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const scale: number = window.devicePixelRatio;
  canvas.width = width * scale;
  canvas.height = height * scale;

  ctx.scale(scale, scale);
};
