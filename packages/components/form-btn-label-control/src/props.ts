import { buildProps, omit } from '@bootstrap-vue-plus/utils'
import {
  dropdownProps,
  formControlProps,
  formSizeProps,
  formStateProps,
  idProps,
} from '@bootstrap-vue-plus/hooks'
import type { ExtractPropTypes } from 'vue'

export const formBtnLabelControlProps = buildProps({
  ...idProps,
  ...formSizeProps,
  ...formStateProps,
  ...omit(dropdownProps, ['disabled']),
  ...omit(formControlProps, ['autofocus']),
  //
  buttonOnly: {
    type: Boolean,
    default: false,
  },
  buttonVariant: {
    type: String,
    default: 'secondary',
  },
  formattedValue: {
    type: String,
  },
  labelSelected: {
    type: String,
  },
  lang: {
    type: String,
  },
  menuClass: {
    type: [String, Object, Array],
  },
  placeholder: {
    type: String,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  rtl: {
    type: Boolean,
    default: null,
  },
  modelValue: {
    type: String,
    default: '',
  },
} as const)
export type FormBtnLabelControlProps = ExtractPropTypes<
  typeof formBtnLabelControlProps
>
