export const multiplyMatrix = (m: Array<number>, v: Array<number>) => {
  if (v.length == 3) {
    return [
      m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
      m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
      m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
    ];
  }
  if (v.length == 9) {
    return [
      m[0] * v[0] + m[1] * v[3] + m[2] * v[6],
      m[0] * v[1] + m[1] * v[4] + m[2] * v[7],
      m[0] * v[2] + m[1] * v[5] + m[2] * v[8],

      m[3] * v[0] + m[4] * v[3] + m[5] * v[6],
      m[3] * v[1] + m[4] * v[4] + m[5] * v[7],
      m[3] * v[2] + m[4] * v[5] + m[5] * v[8],

      m[6] * v[0] + m[7] * v[3] + m[8] * v[6],
      m[6] * v[1] + m[7] * v[4] + m[8] * v[7],
      m[6] * v[2] + m[7] * v[5] + m[8] * v[8],
    ];
  }
};
