import { defineComponent, h, renderSlot } from 'vue'
import { formTextProps } from './props'

const FormText = defineComponent({
  name: 'BvFormText',
  props: formTextProps,
  setup(props, { slots }) {
    return () => {
      return h(
        props.tag,
        {
          class: {
            'form-text': !props.inline,
            [`text-${props.textVariant}`]: props.textVariant,
          },
          id: props.id,
        },
        [renderSlot(slots, 'default')]
      )
    }
  },
})

export default FormText
export type FormTextInstance = InstanceType<typeof FormText>
