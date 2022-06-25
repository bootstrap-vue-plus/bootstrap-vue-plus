import { isArray, isObject } from '@vue/shared'
import { isNil } from 'lodash-unified'

export { isArray, isObject, isDate, isPromise, isSymbol } from '@vue/shared'
export { isVNode } from 'vue'

export const toType = (value: any) => typeof value

export const isUndefined = (val: any): val is undefined => val === undefined

export const isNull = (val: any): val is null => val === null

export const isEvent = (val: any): val is Event => val instanceof Event

export const isFunction = (val: any): boolean => toType(val) === 'function'

export const isBoolean = (val: any) => toType(val) === 'boolean'

export const isNumber = (val: any) => toType(val) === 'number'

export const isString = (val: any): boolean => toType(val) === 'string'

export const isPlainObject = (obj: any): obj is object =>
  Object.prototype.toString.call(obj) === '[object Object]'

export const isUndefinedOrNull = (value: any) =>
  isUndefined(value) || isNull(value)

export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

// export const isElement = (e: unknown): e is Element => {
//   if (typeof Element === 'undefined') return false
//   return e instanceof Element
// }

export const isPropAbsent = (prop: unknown): prop is null | undefined => {
  return isNil(prop)
}
