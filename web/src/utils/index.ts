//参考文章：https://juejin.cn/post/6844903929705136141
export const deepCopy = (target: any) => {
  if (typeof target === 'object') {
    //判断是数组还是对象
    const result: any = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (typeof target[key] === 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }
    return result
  }
  return target
}

export const findItem = (items: any, id: string) => {
  return items.find((item: any) => item.id === id)
}
