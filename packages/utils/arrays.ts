import { isFunction } from './types'

export const unique = <T>(arr: T[]) => [...new Set(arr)]

type Many<T> = T | ReadonlyArray<T>
// TODO: rename to `ensureArray`
/** like `_.castArray`, except falsy value returns empty array. */
export const castArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) return []
  return Array.isArray(arr) ? arr : [arr]
}

// TODO: remove import alias
// avoid naming conflicts
export { castArray as ensureArray } from 'lodash-unified'

// --- Static ---

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const from = (...args: any) => Array.from(...args)

// --- Instance ---

export const arrayIncludes = (array: Array<any>, value: any) =>
  array.includes(value)
export const concat = (...args: any) => Array.prototype.concat.apply([], args)

// --- Utilities ---

export const createArray = (length: number, fillFn: any) => {
  const mapFn = isFunction(fillFn) ? fillFn : () => fillFn
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, { length } as any).map(mapFn)
}

export const flatten = (array: Array<any>) =>
  array.reduce((result, item) => concat(result, item), [])

export const flattenDeep = (array: Array<any>): Array<any> =>
  array.reduce(
    (result, item) =>
      concat(result, Array.isArray(item) ? flattenDeep(item) : item),
    []
  )
