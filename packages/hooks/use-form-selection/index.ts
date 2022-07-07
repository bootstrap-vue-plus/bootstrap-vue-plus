import { computed } from 'vue'
import { buildProps } from '@bootstrap-vue-plus/utils'

export const formSelectionProps = buildProps({
  //
  ariaLabel: {
    type: String,
  },
  ariaLabelledby: {
    type: String,
  },
  button: {
    type: Boolean,
    default: false,
  },
  buttonVariant: {
    type: String,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: undefined,
  },
} as const)

export const useFormSelection = () => {
  return computed(() => ({}))
}
