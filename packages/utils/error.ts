class MDVUIError extends Error {
  constructor(m: string) {
    super(m)
    this.name = '[MDVUI Error]'
  }
}

export function throwError(scope: string, m: string): never {
  throw new MDVUIError(`[${scope}] ${m}`)
}

export function debugWarn(scope: string, message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(new MDVUIError(`[${scope}] ${message}`))
  }
}
