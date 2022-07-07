import {
  RX_HYPHENATE,
  RX_TRIM_LEFT,
  RX_TRIM_RIGHT,
  RX_UN_KEBAB,
} from '@bootstrap-vue-plus/constants'
import { isArray, isPlainObject, isUndefinedOrNull } from './types'
export { camelize, capitalize, hyphenate } from '@vue/shared'

// Converts PascalCase or camelCase to kebab-case
export const kebabCase = (str: string) => {
  return str.replace(RX_HYPHENATE, '-$1').toLowerCase()
}

// Converts a kebab-case or camelCase string to PascalCase
export const pascalCase = (str: string) => {
  str = kebabCase(str).replace(RX_UN_KEBAB, (_, c) =>
    c ? c.toUpperCase() : ''
  )
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export const escapeStringRegexp = (string = '') =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')

export const toString = (val: any, spaces = 2) => {
  return isUndefinedOrNull(val)
    ? ''
    : isArray(val) ||
      (isPlainObject(val) && val.toString === Object.prototype.toString)
    ? JSON.stringify(val, null, spaces)
    : String(val)
}

// Remove leading white space from a string
export const trimLeft = (str: any) => toString(str).replace(RX_TRIM_LEFT, '')

// Remove Trailing white space from a string
export const trimRight = (str: any) => toString(str).replace(RX_TRIM_RIGHT, '')

// Remove leading and trailing white space from a string
export const trim = (str: any) => toString(str).trim()

// Lower case a string
export const lowerCase = (str: any) => toString(str).toLowerCase()

// Upper case a string
export const upperCase = (str: any) => toString(str).toUpperCase()
