import { computed } from 'vue'
import { buildProps } from '@bootstrap-vue-plus/utils'
import { idProps } from '../use-id'
import { formControlProps } from '../use-form-control'
import { formSizeProps } from '../use-form-size'
import { formStateProps } from '../use-form-state'
import { formCustomProps } from '../use-form-custom'

export const formRadioCheckProps = buildProps({
  ...idProps,
  ...idProps,
  ...formControlProps,
  ...formSizeProps,
  ...formStateProps,
  ...formCustomProps,
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

export const useFormRadioCheck = () => {
  return computed(() => ({}))
}
