import { RX_HTML_TAGS } from '@bootstrap-vue-plus/constants'
import { toString } from '../strings'
import { from as arrayFrom } from '../arrays'
import { isFunction } from '../types'

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
