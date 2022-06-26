import { defineComponent, h, mergeProps, renderSlot } from 'vue'
import { isPlainObject } from '@bootstrap-vue-plus/utils'
import { transitionProps } from './props'

const NO_FADE_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: 'show',
  leaveClass: 'show',
  leaveActiveClass: '',
  leaveToClass: '',
}

const FADE_PROPS = {
  ...NO_FADE_PROPS,
  enterActiveClass: 'fade',
  leaveActiveClass: 'fade',
}

const Transition = defineComponent({
  name: 'BvTransition',
  props: transitionProps,
  setup(props, { slots }) {
    return () => {
      let transProps = props.transProps
      if (!isPlainObject(transProps)) {
        transProps = props.noFade ? NO_FADE_PROPS : FADE_PROPS
        if (props.appear) {
          // Default the appear classes to equal the enter classes
          transProps = {
            ...transProps,
            appear: true,
            appearClass: transProps.enterClass,
            appearActiveClass: transProps.enterActiveClass,
            appearToClass: transProps.enterToClass,
          }
        }
      }
      transProps = {
        mode: props.mode,
        ...transProps,
        // We always need `css` true
        css: true,
      }

      return h('transition', mergeProps(props, transProps), [
        renderSlot(slots, 'default'),
      ])
    }
  },
})

export default Transition
export type TransitionInstance = InstanceType<typeof Transition>
