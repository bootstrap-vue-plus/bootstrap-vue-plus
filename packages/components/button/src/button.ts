import { defineComponent, h, mergeProps, renderSlot } from 'vue'
import {
  concat,
  isEvent,
  isFunction,
  stopEvent,
} from '@bootstrap-vue-plus/utils'
import { CODE_ENTER, CODE_SPACE } from '@bootstrap-vue-plus/constants'
import BvLink from '../../link'
import {
  computeAttrs,
  computeClass,
  computeLinkProps,
  handleFocus,
  isLink,
  isNonStandardTag,
  isToggle,
} from './utils'
import { buttonProps } from './props'

const Button = defineComponent({
  name: 'BvButton',
  props: buttonProps,
  setup(props, { slots, attrs }) {
    return () => {
      const toggle = isToggle(props)
      const link = isLink(props)
      const nonStandardTag = isNonStandardTag(props)
      const hashLink = link && props.href === '#'
      const on: Record<string, any> = {
        onKeydown(event: any) {
          // When the link is a `href="#"` or a non-standard tag (has `role="button"`),
          // we add a keydown handlers for CODE_SPACE/CODE_ENTER
          /* istanbul ignore next */
          if (props.disabled || !(nonStandardTag || hashLink)) {
            return
          }
          const { keyCode } = event
          // Add CODE_SPACE handler for `href="#"` and CODE_ENTER handler for non-standard tags
          if (
            keyCode === CODE_SPACE ||
            (keyCode === CODE_ENTER && nonStandardTag)
          ) {
            const target = event.currentTarget || event.target
            stopEvent(event, { propagation: false })
            target.click()
          }
        },
        onClick(event: any) {
          /* istanbul ignore if: blink/button disabled should handle this */
          if (props.disabled && isEvent(event)) {
            stopEvent(event)
          } else if (toggle && attrs && attrs['onUpdate:pressed']) {
            // Send `.sync` updates to any "pressed" prop (if `.sync` listeners)
            // `concat()` will normalize the value to an array without
            // double wrapping an array value in an array
            concat(attrs['onUpdate:pressed']).forEach((fn: any) => {
              if (isFunction(fn)) {
                fn(!props.pressed)
              }
            })
          }
        },
      }

      if (toggle) {
        on.onFocusin = handleFocus
        on.onFocusout = handleFocus
      }

      const componentData = {
        class: computeClass(props),
        ...computeLinkProps(props),
        ...computeAttrs(props, attrs),
        ...on,
      }

      if (link) {
        return h(BvLink, mergeProps(props, componentData), [
          renderSlot(slots, 'default'),
        ])
      }

      return h(props.tag, mergeProps(props, componentData), [
        renderSlot(slots, 'default'),
      ])
    }
  },
})

export default Button
export type ButtonInstance = InstanceType<typeof Button>
