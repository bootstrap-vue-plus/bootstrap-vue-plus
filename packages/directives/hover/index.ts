import { eventOnOff, isFunction } from '@bootstrap-vue-plus/utils'
import {
  EVENT_OPTIONS_NO_CAPTURE,
  IS_BROWSER,
} from '@bootstrap-vue-plus/constants'
import type { ObjectDirective } from 'vue'

// --- Constants ---

const PROP = '__BV_hover_handler__'
const MOUSEENTER = 'mouseenter'
const MOUSELEAVE = 'mouseleave'

// --- Helper methods ---

const createListener = (handler: any) => {
  const listener = (event: any) => {
    handler(event.type === MOUSEENTER, event)
  }
  listener.fn = handler
  return listener
}

const updateListeners = (on: boolean, el: any, listener: any) => {
  eventOnOff(on, el, MOUSEENTER, listener, EVENT_OPTIONS_NO_CAPTURE)
  eventOnOff(on, el, MOUSELEAVE, listener, EVENT_OPTIONS_NO_CAPTURE)
}

// --- Directive bind/unbind/update handler ---

const directive = (el: any, { value: handler = null }) => {
  if (IS_BROWSER) {
    const listener = el[PROP]
    const hasListener = isFunction(listener)
    const handlerChanged = !(hasListener && listener.fn === handler)
    if (hasListener && handlerChanged) {
      updateListeners(false, el, listener)
      delete el[PROP]
    }
    if (isFunction(handler) && handlerChanged) {
      el[PROP] = createListener(handler)
      updateListeners(true, el, el[PROP])
    }
  }
}

export const BvHover: ObjectDirective = {
  beforeMount: directive,
  updated: directive,
  unmounted(el: HTMLElement) {
    directive(el, { value: null })
  },
}

export default BvHover
