export const sliceArray = <T>(arr: T[], index: number): T[] => {
  return arr.filter((item, i) => i !== index)
}

export const hasOwn = (obj: object, key: string) => {
  // eslint-disable-next-line no-prototype-builtins
  return !!obj.hasOwnProperty(key)
}
export const isUndefined = (val: any) => typeof val === 'undefined'
