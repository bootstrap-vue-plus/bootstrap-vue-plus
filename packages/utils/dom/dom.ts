import { toString } from '../strings'

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

// Add a class to an element
export const addClass = (el: HTMLElement, className: string) => {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    el.classList.add(className)
  }
}

// Remove a class from an element
export const removeClass = (el: HTMLElement, className: string) => {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    el.classList.remove(className)
  }
}
