import { defineComponent, h, renderSlot } from 'vue'
import { formProps } from './props'

const Form = defineComponent({
  name: 'BvForm',
  props: formProps,
  setup(props, { slots }) {
    return () => {
      return h(
        'form',
        {
          class: {
            'form-inline': props.inline,
            'was-validated': props.validated,
          },
          id: props.id,
          novalidate: props.novalidate,
        },
        [renderSlot(slots, 'default')]
      )
    }
  },
})

export default Form
export type FormInstance = InstanceType<typeof Form>
