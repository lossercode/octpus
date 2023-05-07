// 节流函数
export const throttle = (fn: Function, delay: number) => {
  let timer: number | null = null
  return (...args: any[]) => {
    if (timer === null) {
      fn.call(this, args)
      timer = setTimeout(() => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = null
      }, delay)
    }
  }
}
