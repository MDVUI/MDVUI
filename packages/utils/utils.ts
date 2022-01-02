export const deleteArrayItemByValue = (arr: any[], val: any) => {
  arr = arr.map(item => item !== val)

  return arr
}
