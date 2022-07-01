import { defineComponent, h, renderSlot } from 'vue'
import { formValidFeedbackProps } from './props'

const FormValidFeedback = defineComponent({
  name: 'BvFormValidFeedback',
  props: formValidFeedbackProps,
  setup(props, { slots }) {
    return () => {
      return h(
        props.tag,
        {
          class: {
            'd-block': props.forceShow === true || props.state === true,
            'valid-feedback': !props.tooltip,
            'valid-tooltip': props.tooltip,
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

export default FormValidFeedback
export type FormValidFeedbackInstance = InstanceType<typeof FormValidFeedback>
