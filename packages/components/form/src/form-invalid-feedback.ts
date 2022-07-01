import { defineComponent, h, renderSlot } from 'vue'
import { formInvalidFeedbackProps } from './props'

const FormInvalidFeedback = defineComponent({
  name: 'BvFormInvalidFeedback',
  props: formInvalidFeedbackProps,
  setup(props, { slots }) {
    return () => {
      return h(
        props.tag,
        {
          class: {
            'd-block': props.forceShow === true || props.state === false,
            'invalid-feedback': !props.tooltip,
            'invalid-tooltip': props.tooltip,
          },
          id: props.id || null,
          role: props.role || null,
          'aria-live': props.ariaLive || null,
          'aria-atomic': props.ariaLive ? 'true' : null,
        },
        [renderSlot(slots, 'default')]
      )
    }
  },
})

export default FormInvalidFeedback
export type FormInvalidFeedbackInstance = InstanceType<
  typeof FormInvalidFeedback
>
