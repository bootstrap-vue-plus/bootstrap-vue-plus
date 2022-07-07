import {
  HAS_PASSIVE_EVENT_SUPPORT,
  ROOT_EVENT_NAME_PREFIX,
  ROOT_EVENT_NAME_SEPARATOR,
  RX_BV_PREFIX,
} from '@bootstrap-vue-plus/constants'
import { isObject, kebabCase } from '@bootstrap-vue-plus/utils'

/** @deprecated use `element.addEventListener` instead */
export const on = (
  element: HTMLElement | Document | Window | Element,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void => {
  if (element && event && handler) {
    element?.addEventListener(event, handler, useCapture)
  }
}

/** @deprecated use `element.addEventListener` instead */
export const off = (
  element: HTMLElement | Document | Window | Element,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void => {
  if (element && event && handler) {
    element?.removeEventListener(event, handler, useCapture)
  }
}

/** @deprecated use `element.addEventListener` instead */
export const once = (
  el: HTMLElement,
  event: string,
  fn: EventListener
): void => {
  const listener = function (this: any, ...args: any) {
    if (fn) {
      fn.apply(this, args)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export const composeEventHandlers = <E>(
  theirsHandler?: (event: E) => boolean | void,
  oursHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) => {
  const handleEvent = (event: E) => {
    const shouldPrevent = theirsHandler?.(event)

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler?.(event)
    }
  }
  return handleEvent
}

type WhenMouseHandler = (e: PointerEvent) => any
export const whenMouse = (handler: WhenMouseHandler): WhenMouseHandler => {
  return (e: PointerEvent) =>
    e.pointerType === 'mouse' ? handler(e) : undefined
}

export const stopEvent = (
  event: Event,
  {
    preventDefault = true,
    propagation = true,
    immediatePropagation = false,
  } = {}
) => {
  if (preventDefault) {
    event.preventDefault()
  }
  if (propagation) {
    event.stopPropagation()
  }
  if (immediatePropagation) {
    event.stopImmediatePropagation()
  }
}

// Normalize event options based on support of passive option
// Exported only for testing purposes
export const parseEventOptions = (options: any) => {
  /* istanbul ignore else: can't test in JSDOM, as it supports passive */
  if (HAS_PASSIVE_EVENT_SUPPORT) {
    return isObject(options) ? options : { capture: !!options || false }
  } else {
    // Need to translate to actual Boolean value
    return !!(isObject(options) ? options.capture : options)
  }
}

// Attach an event listener to an element
export const eventOn = (
  el: HTMLElement,
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  options: Record<string, any>
) => {
  if (el && el.addEventListener) {
    el.addEventListener(eventName, handler, parseEventOptions(options))
  }
}

// Remove an event listener from an element
export const eventOff = (
  el: HTMLElement,
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  options: Record<string, any>
) => {
  if (el && el.removeEventListener) {
    el.removeEventListener(eventName, handler, parseEventOptions(options))
  }
}

// Utility method to add/remove a event listener based on first argument (boolean)
// It passes all other arguments to the `eventOn()` or `eventOff` method
export const eventOnOff = (on: boolean, ...args: any[]) => {
  const method = on ? eventOn : eventOff
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  method(...args)
}

// Helper method to convert a component/directive name to a base event name
// `getBaseEventName('BNavigationItem')` => 'navigation-item'
// `getBaseEventName('BVToggle')` => 'toggle'
const getBaseEventName = (value: string) =>
  kebabCase(value.replace(RX_BV_PREFIX, ''))

// Get a root event name by component/directive and event name
// `getBaseEventName('BModal', 'show')` => 'bv::modal::show'
export const getRootEventName = (name: string, eventName: string) =>
  [ROOT_EVENT_NAME_PREFIX, getBaseEventName(name), eventName].join(
    ROOT_EVENT_NAME_SEPARATOR
  )

// Get a root action event name by component/directive and action name
// `getRootActionEventName('BModal', 'show')` => 'bv::show::modal'
export const getRootActionEventName = (name: string, actionName: string) =>
  [ROOT_EVENT_NAME_PREFIX, actionName, getBaseEventName(name)].join(
    ROOT_EVENT_NAME_SEPARATOR
  )
