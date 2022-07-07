import { RX_HTML_TAGS } from '@bootstrap-vue-plus/constants'
import { toString } from '../strings'
import { from as arrayFrom } from '../arrays'
import { isFunction, isNull } from '../types'

const ELEMENT_PROTO = Element.prototype as any

// See: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
/* istanbul ignore next */
export const matchesEl =
  ELEMENT_PROTO.matches ||
  ELEMENT_PROTO.msMatchesSelector ||
  ELEMENT_PROTO.webkitMatchesSelector

// See: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
/* istanbul ignore next */
export const closestEl =
  ELEMENT_PROTO.closest ||
  function (sel: string) {
    let el = document as any
    do {
      // Use our "patched" matches function
      if (matches(el, sel)) {
        return el
      }
      el = el.parentElement || el.parentNode
    } while (!isNull(el) && el.nodeType === Node.ELEMENT_NODE)
    return null
  }

export const isTag = (tag: unknown, name: unknown) =>
  toString(tag).toLowerCase() === toString(name).toLowerCase()

export const HAS_DOCUMENT_SUPPORT = typeof document !== 'undefined'
export const DOCUMENT = HAS_DOCUMENT_SUPPORT ? document : {}

// Determine if an element is an HTML element
export const isElement = (el: HTMLElement) =>
  !!(el && el.nodeType === Node.ELEMENT_NODE)

// Get the currently active HTML element
export const getActiveElement = (excludes: any[] = []) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { activeElement } = DOCUMENT
  return activeElement && !excludes.includes(activeElement)
    ? activeElement
    : null
}

// Determine if an HTML element is the currently active element
export const isActiveElement = (el: HTMLElement) =>
  isElement(el) && el === getActiveElement()

// Attempt to focus an element, and return `true` if successful
export const attemptFocus = (el: HTMLElement, options = {}) => {
  try {
    el.focus(options)
  } catch {}
  return isActiveElement(el)
}

// Attempt to blur an element, and return `true` if successful
export const attemptBlur = (el: HTMLElement) => {
  try {
    el.blur()
  } catch {}
  return !isActiveElement(el)
}

export const selectAll = (selector: string, root: any): any[] =>
  arrayFrom((isElement(root) ? root : DOCUMENT).querySelectorAll(selector))

// Returns true if the parent element contains the child element
export const contains = (parent: HTMLElement | undefined, child: HTMLElement) =>
  parent && isFunction(parent.contains) ? parent.contains(child) : false

// Removes anything that looks like an HTML tag from the supplied string
export const stripTags = (text = '') => String(text).replace(RX_HTML_TAGS, '')

export const htmlOrText = (innerHTML: any, textContent: any) =>
  innerHTML ? innerHTML : textContent ? textContent : null

// `requestAnimationFrame()` convenience method
/* istanbul ignore next: JSDOM always returns the first option */
export const requestAF = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  // Fallback, but not a true polyfill
  // Only needed for Opera Mini
  /* istanbul ignore next */
  ((cb) => setTimeout(cb, 16))
).bind(window)

// Select a single element, returns `null` if not found
export const select = (selector: string, root: any) =>
  (isElement(root) ? root : DOCUMENT).querySelector(selector) || null

// Determine if an element matches a selector
export const matches = (el: any, selector: string) =>
  isElement(el) ? matchesEl.call(el, selector) : false

// Finds closest element matching selector. Returns `null` if not found
export const closest = (selector: string, root: any, includeRoot = false) => {
  if (!isElement(root)) {
    return null
  }
  const el = closestEl.call(root, selector)

  // Native closest behaviour when `includeRoot` is truthy,
  // else emulate jQuery closest and return `null` if match is
  // the passed in root element when `includeRoot` is falsey
  return includeRoot ? el : el === root ? null : el
}
