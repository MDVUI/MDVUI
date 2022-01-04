export const deleteArrayItemByValue = (arr: any[], val: any) => {
  arr = arr.map(item => item !== val)

  return arr
}

export const hasOwn = (obj: object, key: string) => {
  // eslint-disable-next-line no-prototype-builtins
  return !!obj.hasOwnProperty(key)
}
