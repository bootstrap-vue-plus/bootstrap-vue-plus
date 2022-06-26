export const waitNT = (ctx: any) =>
  new Promise((resolve) => ctx.$nextTick(resolve))

export const waitRAF = () =>
  new Promise((resolve) => requestAnimationFrame(resolve))
