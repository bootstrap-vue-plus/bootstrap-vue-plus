import { isString } from './types'

class BootstrapVuePlusError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'BootstrapVuePlusError'
  }
}

export function throwError(scope: string, m: string): never {
  throw new BootstrapVuePlusError(`[${scope}] ${m}`)
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope)
      ? new BootstrapVuePlusError(`[${scope}] ${message}`)
      : scope
    // eslint-disable-next-line no-console
    console.warn(error)
  }
}
