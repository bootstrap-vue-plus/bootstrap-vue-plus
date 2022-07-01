import { defineComponent, h, renderSlot } from 'vue'
import { htmlOrText } from '@bootstrap-vue-plus/utils'
import { useFormOptions } from '@bootstrap-vue-plus/hooks'
import { formDatalistProps } from './props'

const FormDatalist = defineComponent({
  name: 'BvFormDatalist',
  props: formDatalistProps,
  setup(props, { slots }) {
    const formOptions = useFormOptions()
    return () => {
      const $options = formOptions.value.map((option, index) => {
        const { value, text, html, disabled } = option

        return h('option', {
          value,
          disabled,
          innerHTML: htmlOrText(html, text),
          key: `option_${index}`,
        })
      })

      return h('datalist', { id: props.id }, [
        $options,
        renderSlot(slots, 'default'),
      ])
    }
  },
})

export default FormDatalist
export type FormDatalistInstance = InstanceType<typeof FormDatalist>
