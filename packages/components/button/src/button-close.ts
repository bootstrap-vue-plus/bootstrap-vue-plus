import { defineComponent, h, mergeProps, renderSlot } from 'vue'
import { isEvent, stopEvent } from '@bootstrap-vue-plus/utils'
import { buttonCloseProps } from './props'

const ButtonClose = defineComponent({
  name: 'BvButtonClose',
  props: buttonCloseProps,
  setup(props, { slots }) {
    return () => {
      const componentData: any = {
        class: [
          'close',
          {
            [`text-${props.textVariant}`]: props.textVariant,
          },
        ],
        ...{
          type: 'button',
          '^disabled': props.disabled ? props.disabled : null,
          'aria-label': props.ariaLabel ? String(props.ariaLabel) : null,
        },
        onClick(event: any) {
          // Ensure click on button HTML content is also disabled
          /* istanbul ignore if: bug in JSDOM still emits click on inner element */
          if (props.disabled && isEvent(event)) {
            stopEvent(event)
          }
        },
      }

      if (!slots.default) {
        componentData.innerHTML = props.content
      }

      return h('button', mergeProps(props, componentData), [
        renderSlot(slots, 'default'),
      ])
    }
  },
})

export default ButtonClose
export type ButtonCloseInstance = InstanceType<typeof ButtonClose>
