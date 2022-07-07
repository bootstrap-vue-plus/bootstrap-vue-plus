import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onDeactivated,
  provide,
  ref,
  unref,
  warn,
  watch,
} from 'vue'
import Popper from '@popperjs/core'
import {
  BvEvent,
  attemptFocus,
  buildProps,
  closest,
  contains,
  getRootEventName,
  isNull,
  isVisible,
  requestAF,
  selectAll,
  stopEvent,
} from '@bootstrap-vue-plus/utils'
import {
  CODE_DOWN,
  CODE_ENTER,
  CODE_ESC,
  CODE_SPACE,
  CODE_UP,
  EVENT_NAME_CLICK,
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_SHOW,
  EVENT_NAME_SHOWN,
  EVENT_NAME_TOGGLE,
  HAS_TOUCH_SUPPORT,
} from '@bootstrap-vue-plus/constants'
import emitter from 'tiny-emitter/instance'
import { idProps, useId } from '../use-id'
import { useProp } from '../use-prop'
import { useContext } from '../use-context'
import { useFocusIn } from '../use-focus-in'
import { useClickOut } from '../use-click-out'
import type { BvEventProps } from '@bootstrap-vue-plus/utils'
import type { ComponentPublicInstance } from 'vue'

// --- Constants ---

const ROOT_EVENT_NAME_SHOWN = getRootEventName('BvDropdown', EVENT_NAME_SHOWN)
const ROOT_EVENT_NAME_HIDDEN = getRootEventName('BvDropdown', EVENT_NAME_HIDDEN)

// CSS selectors
const SELECTOR_FORM_CHILD = '.dropdown form'
const SELECTOR_ITEM = ['.dropdown-item', '.b-dropdown-form']
  .map((selector) => `${selector}:not(.disabled):not([disabled])`)
  .join(', ')

// --- Helper methods ---

// Return an array of visible items
const filterVisibles = (els: HTMLElement[]) => (els || []).filter(isVisible)

type EmitFn = (event: string, ...args: any[]) => void

function emitOnRoot(
  $root: ComponentPublicInstance | null | undefined,
  event: string,
  ...args: any[]
) {
  $root && $root.$emit(event, ...args)
}

export const dropdownProps = buildProps({
  ...idProps,
  //
  boundary: {
    type: [HTMLElement, String],
    default: 'scrollParent',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  dropleft: {
    type: Boolean,
    default: false,
  },
  dropright: {
    type: Boolean,
    default: false,
  },
  dropup: {
    type: Boolean,
    default: false,
  },
  noFlip: {
    type: Boolean,
    default: false,
  },
  offset: {
    type: [String, Number],
    default: 0,
  },
  popperOpts: {
    type: Object,
    default: {},
  },
  right: {
    type: Boolean,
    default: false,
  },
} as const)

export const useDropdown = () => {
  const visible = ref<boolean>(false)
  const visibleChangePrevented = ref<boolean>(false)

  const safeId = useId()
  const { listenForFocusIn } = useFocusIn()
  const { listenForClickOut } = useClickOut()
  const proxy = useContext<ComponentPublicInstance | null>()
  const $refs = useContext('$refs')
  const $root = useContext<ComponentPublicInstance | null>('$root')
  const $emit = useContext<EmitFn>('$emit')
  const $el = useContext<any>('$el')
  const id = useProp<string>('id')
  const boundary = useProp<HTMLElement | string>('boundary')
  const disabled = useProp<boolean>('disabled')
  const dropleft = useProp<boolean>('dropleft')
  const dropright = useProp<boolean>('dropright')
  const dropup = useProp<boolean>('dropup')
  const noFlip = useProp<boolean>('noFlip')
  const offset = useProp<string | number>('offset')
  const popperOpts = useProp<object>('popperOpts')
  const right = useProp<boolean>('right')
  const split = useProp<boolean>('split')
  const bvNavbar = inject('bvNavbar')
  provide('bvDropdown', proxy)

  let _popper: any = null
  let _hideTimeout: any = null

  // --- Helper computed ---

  const inNavbar = computed(() => {
    return !isNull(bvNavbar)
  })

  const toggler = computed(() => {
    const { toggle } = $refs.value as any
    return toggle ? toggle.$el || toggle : null
  })

  const directionClass = computed(() => {
    if (unref(dropup)) {
      return 'dropup'
    } else if (unref(dropright)) {
      return 'dropright'
    } else if (unref(dropleft)) {
      return 'dropleft'
    }
    return ''
  })

  const boundaryClass = computed(() => {
    // Position `static` is needed to allow menu to "breakout" of the `scrollParent`
    // boundaries when boundary is anything other than `scrollParent`
    // See: https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
    return unref(boundary) !== 'scrollParent' && !unref(inNavbar)
      ? 'position-static'
      : ''
  })

  const hideDelay = computed(() => {
    return unref(inNavbar) ? (HAS_TOUCH_SUPPORT ? 300 : 50) : 0
  })

  watch(visible, (newValue, oldValue) => {
    if (unref(visibleChangePrevented)) {
      visibleChangePrevented.value = false
      return
    }

    if (newValue !== oldValue) {
      const eventName = newValue ? EVENT_NAME_SHOW : EVENT_NAME_HIDE
      const bvEvent = new BvEvent(eventName, {
        cancelable: true,
        vueTarget: unref(proxy),
        target: (unref($refs) as any).menu,
        relatedTarget: null,
        componentId: unref(safeId) ? unref(safeId)() : unref(id) || null,
      } as BvEventProps)
      emitEvent(bvEvent)
      if (bvEvent.prevented()) {
        // Reset value and exit if canceled
        visibleChangePrevented.value = true
        visible.value = oldValue
        // Just in case a child element triggered `this.hide(true)`
        // this.$off(EVENT_NAME_HIDDEN, focusToggler)
        emitter.off(EVENT_NAME_HIDDEN, focusToggler)
        return
      }
      if (newValue) {
        showMenu()
      } else {
        hideMenu()
      }
    }
  })

  watch(disabled, (newValue, oldValue) => {
    if (newValue !== oldValue && newValue && unref(visible)) {
      // Hide dropdown if disabled changes to true
      visible.value = false
    }
  })

  onDeactivated(() => {
    // In case we are inside a `<keep-alive>`
    visible.value = false
    whileOpenListen(false)
    destroyPopper()
  })

  onBeforeUnmount(() => {
    visible.value = false
    whileOpenListen(false)
    destroyPopper()
    clearHideTimeout()
  })

  const emitEvent = (bvEvent: BvEvent) => {
    const { type } = bvEvent
    emitOnRoot(unref($root), getRootEventName('BvDropdown', type), bvEvent)
    unref($emit) && unref($emit)!(type, bvEvent)
  }

  const showMenu = () => {
    if (unref(disabled)) {
      /* istanbul ignore next */
      return
    }

    // Only instantiate Popper.js when dropdown is not in `<b-navbar>`
    if (!unref(inNavbar)) {
      if (typeof Popper === 'undefined') {
        /* istanbul ignore next */
        warn(
          'Popper.js not found. Falling back to CSS positioning',
          'BvDropdown'
        )
      } else {
        // For dropup with alignment we use the parent element as popper container
        let el =
          (unref(dropup) && unref(right)) || unref(split)
            ? unref($el)
            : (unref($refs) as any).toggle
        // Make sure we have a reference to an element, not a component!
        el = el.$el || el
        // Instantiate Popper.js
        createPopper(el)
      }
    }

    // Ensure other menus are closed
    emitOnRoot(unref($root), ROOT_EVENT_NAME_SHOWN, unref(proxy))

    // Enable listeners
    whileOpenListen(true)

    // Wrap in `$nextTick()` to ensure menu is fully rendered/shown
    nextTick(() => {
      // Focus on the menu container on show
      focusMenu()
      // Emit the shown event
      unref($emit) && unref($emit)!(EVENT_NAME_SHOWN)
    })
  }

  const hideMenu = () => {
    whileOpenListen(false)
    emitOnRoot(unref($root), ROOT_EVENT_NAME_HIDDEN, unref(proxy))
    unref($emit) && unref($emit)!(EVENT_NAME_HIDDEN)
    destroyPopper()
  }

  const createPopper = (element: any) => {
    destroyPopper()
    _popper = Popper.createPopper(
      element,
      (unref($refs) as any).menu,
      getPopperConfig()
    )
  }

  const destroyPopper = () => {
    _popper && _popper.destroy()
    _popper = null
  }

  const updatePopper = () => {
    try {
      _popper && _popper.update()
    } catch {}
  }

  const clearHideTimeout = () => {
    clearTimeout(_hideTimeout)
    _hideTimeout = null
  }

  const getPopperConfig = (): Record<string, any> => {
    return {}
  }

  // Turn listeners on/off while open
  const whileOpenListen = (isOpen: boolean) => {
    // Hide the dropdown when clicked outside
    listenForClickOut.value = isOpen
    // Hide the dropdown when it loses focus
    listenForFocusIn.value = isOpen
    // Hide the dropdown when another dropdown is opened
    const method = isOpen ? 'on' : 'off'
    // this.$root[method](ROOT_EVENT_NAME_SHOWN, rootCloseListener)
    emitter[method](ROOT_EVENT_NAME_SHOWN, rootCloseListener)
  }

  const rootCloseListener = (vm: any) => {
    if (vm !== unref(proxy)) {
      visible.value = false
    }
  }

  // Public method to show dropdown
  const show = () => {
    if (unref(disabled)) {
      return
    }
    // Wrap in a `requestAF()` to allow any previous
    // click handling to occur first
    requestAF(() => {
      visible.value = true
    })
  }

  // Public method to hide dropdown
  const hide = (refocus = false) => {
    /* istanbul ignore next */
    if (unref(disabled)) {
      return
    }
    visible.value = false
    if (refocus) {
      // Child element is closing the dropdown on click
      // this.$once(EVENT_NAME_HIDDEN, focusToggler)
      emitter.once(EVENT_NAME_HIDDEN, focusToggler)
    }
  }

  // Called only by a button that toggles the menu
  const toggle = (event: any) => {
    event = event || {}
    // Early exit when not a click event or ENTER, SPACE or DOWN were pressed
    const { type, keyCode } = event
    if (
      type !== 'click' &&
      !(
        type === 'keydown' &&
        [CODE_ENTER, CODE_SPACE, CODE_DOWN].includes(keyCode)
      )
    ) {
      /* istanbul ignore next */
      return
    }
    /* istanbul ignore next */
    if (unref(disabled)) {
      visible.value = false
      return
    }
    unref($emit) && unref($emit)!(EVENT_NAME_TOGGLE, event)
    stopEvent(event)
    // Toggle visibility
    if (unref(visible)) {
      hide(true)
    } else {
      show()
    }
  }

  // Mousedown handler for the toggle
  /* istanbul ignore next */
  const onMousedown = (event: any) => {
    // We prevent the 'mousedown' event for the toggle to stop the
    // 'focusin' event from being fired
    // The event would otherwise be picked up by the global 'focusin'
    // listener and there is no cross-browser solution to detect it
    // relates to the toggle click
    // The 'click' event will still be fired and we handle closing
    // other dropdowns there too
    // See https://github.com/bootstrap-vue/bootstrap-vue/issues/4328
    stopEvent(event, { propagation: false })
  }

  // Called from dropdown menu context
  const onKeydown = (event: any) => {
    const { keyCode } = event
    if (keyCode === CODE_ESC) {
      // Close on ESC
      onEsc(event)
    } else if (keyCode === CODE_DOWN) {
      // Down Arrow
      focusNext(event, false)
    } else if (keyCode === CODE_UP) {
      // Up Arrow
      focusNext(event, true)
    }
  }

  // If user presses ESC, close the menu
  const onEsc = (event: any) => {
    if (unref(visible)) {
      visible.value = false
      stopEvent(event)
      // Return focus to original trigger button
      // this.$once(EVENT_NAME_HIDDEN, focusToggler)
      emitter.once(EVENT_NAME_HIDDEN, focusToggler)
    }
  }

  // Called only in split button mode, for the split button
  const onSplitClick = (event: any) => {
    /* istanbul ignore next */
    if (unref(disabled)) {
      visible.value = false
      return
    }
    $emit.value && $emit.value(EVENT_NAME_CLICK, event)
  }

  // Shared hide handler between click-out and focus-in events
  const hideHandler = (event: any) => {
    const { target } = event
    if (
      unref(visible) &&
      !contains((unref($refs) as any).menu, target) &&
      !contains(unref(toggler), target)
    ) {
      clearHideTimeout()
      _hideTimeout = setTimeout(() => hide(), unref(hideDelay))
    }
  }

  // Document click-out listener
  const clickOutHandler = (event: any) => {
    hideHandler(event)
  }

  // Document focus-in listener
  const focusInHandler = (event: any) => {
    hideHandler(event)
  }

  // Keyboard nav
  const focusNext = (event: any, up: boolean) => {
    // Ignore key up/down on form elements
    const { target } = event
    if (!unref(visible) || (event && closest(SELECTOR_FORM_CHILD, target))) {
      /* istanbul ignore next: should never happen */
      return
    }
    stopEvent(event)
    nextTick(() => {
      const items = getItems()
      if (items.length < 1) {
        /* istanbul ignore next: should never happen */
        return
      }
      let index = items.indexOf(target)
      if (up && index > 0) {
        index--
      } else if (!up && index < items.length - 1) {
        index++
      }
      if (index < 0) {
        /* istanbul ignore next: should never happen */
        index = 0
      }
      focusItem(index, items)
    })
  }

  const focusItem = (index: number, items: HTMLElement[]) => {
    const el = items.find((el, i) => i === index)
    if (!el) return
    attemptFocus(el)
  }

  const getItems = () => {
    // Get all items
    return filterVisibles(selectAll(SELECTOR_ITEM, (unref($refs) as any).menu))
  }

  const focusMenu = () => {
    attemptFocus((unref($refs) as any).menu)
  }

  const focusToggler = () => {
    nextTick(() => {
      attemptFocus(unref(toggler))
    })
  }

  return {
    visible,
    noFlip,
    offset,
    popperOpts,

    directionClass,
    boundaryClass,

    updatePopper,
    toggle,
    onMousedown,
    onKeydown,
    onSplitClick,
    clickOutHandler,
    focusInHandler,
  }
}
