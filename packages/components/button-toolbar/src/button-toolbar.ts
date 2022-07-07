import { computed, defineComponent, h, onMounted, ref, renderSlot } from 'vue'
import {
  attemptFocus,
  contains,
  isVisible,
  selectAll,
  stopEvent,
} from '@bootstrap-vue-plus/utils'
import {
  CODE_DOWN,
  CODE_LEFT,
  CODE_RIGHT,
  CODE_UP,
} from '@bootstrap-vue-plus/constants'
import { buttonToolbarProps } from './props'

const ITEM_SELECTOR = [
  '.btn:not(.disabled):not([disabled]):not(.dropdown-item)',
  '.form-control:not(.disabled):not([disabled])',
  'select:not(.disabled):not([disabled])',
  'input[type="checkbox"]:not(.disabled)',
  'input[type="radio"]:not(.disabled)',
].join(',')

const ButtonToolbar = defineComponent({
  name: 'BvButtonToolbar',
  props: buttonToolbarProps,
  setup(props, { slots }) {
    const divRef = ref<HTMLElement>()

    onMounted(() => {
      if (props.keyNav) {
        getItems()
      }
    })

    const getItems = () => {
      const items: any[] = selectAll(ITEM_SELECTOR, divRef.value)
      // Ensure `tabindex="-1"` is set on every item
      items.forEach((item) => {
        item.tabIndex = -1
      })
      return items.filter((el) => isVisible(el))
    }

    const focusFirst = (event: any) => {
      const items = getItems()
      attemptFocus(items[0])
    }
    const focusPrev = (event: any) => {
      let items = getItems()
      const index = items.indexOf(event.target)
      if (index > -1) {
        items = items.slice(0, index).reverse()
        attemptFocus(items[0])
      }
    }
    const focusNext = (event: any) => {
      let items = getItems()
      const index = items.indexOf(event.target)
      if (index > -1) {
        items = items.slice(index + 1)
        attemptFocus(items[0])
      }
    }
    const focusLast = (event: any) => {
      const items = getItems().reverse()
      attemptFocus(items[0])
    }
    const onFocusin = (event: any) => {
      if (
        event.target === divRef.value &&
        !contains(divRef.value, event.relatedTarget)
      ) {
        stopEvent(event)
        focusFirst(event)
      }
    }
    const onKeydown = (event: any) => {
      const { keyCode, shiftKey } = event
      if (keyCode === CODE_UP || keyCode === CODE_LEFT) {
        stopEvent(event)
        shiftKey ? focusFirst(event) : focusPrev(event)
      } else if (keyCode === CODE_DOWN || keyCode === CODE_RIGHT) {
        stopEvent(event)
        shiftKey ? focusLast(event) : focusNext(event)
      }
    }

    const computedAttrs = computed(() => ({
      role: 'toolbar',
      tabindex: props.keyNav ? '0' : null,
    }))

    const computedListeners = computed(() =>
      props.keyNav
        ? {
            onFocusin,
            onKeydown,
          }
        : {}
    )

    return () => {
      return h(
        'div',
        {
          ref: divRef,
          class: ['btn-toolbar', { 'justify-content-between': props.justify }],
          ...computedAttrs.value,
          ...computedListeners.value,
        },
        [renderSlot(slots, 'default')]
      )
    }
  },
})

export default ButtonToolbar
export type ButtonToolbarInstance = InstanceType<typeof ButtonToolbar>
