export const maxDevice = 412

export const sliceArray = <T>(arr: T[], index: number): T[] => {
  return arr.filter((item, i) => i !== index)
}

export const hasOwn = (obj: object, key: string) => {
  // eslint-disable-next-line no-prototype-builtins
  return !!obj.hasOwnProperty(key)
}
export const isUndefined = (val: any) => typeof val === 'undefined'

export const cloneArray = <T>(val: T[]): T[] => new Array(...val)

export const enum Device {
  // eslint-disable-next-line no-unused-vars
  phone = 0,
  // eslint-disable-next-line no-unused-vars
  pc =1
}
export const getCurrentDevice = (): Device => {
  return window.innerWidth < maxDevice ? Device.phone : Device.pc
}
