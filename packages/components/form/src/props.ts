import { buildProps } from '@bootstrap-vue-plus/utils'
import { formOptionControlProps } from '@bootstrap-vue-plus/hooks'
import type { ExtractPropTypes } from 'vue'

export const formProps = buildProps({
  //
  id: {
    type: String,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  novalidate: {
    type: Boolean,
    default: false,
  },
  validated: {
    type: Boolean,
    default: false,
  },
} as const)
export type FormProps = ExtractPropTypes<typeof formProps>

export const formDatalistProps = buildProps({
  ...formOptionControlProps,

  //
  id: {
    type: String,
    default: undefined,
    required: true,
  },
} as const)
export type FormDatalistProps = ExtractPropTypes<typeof formDatalistProps>

export const formInvalidFeedbackProps = buildProps({
  //
  ariaLive: {
    type: String,
  },
  forceShow: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
  },
  role: {
    type: String,
  },
  state: {
    type: Boolean,
    default: null,
  },
  tag: {
    type: String,
    default: 'div',
  },
  tooltip: {
    type: Boolean,
    default: false,
  },
} as const)
export type FormInvalidFeedbackProps = ExtractPropTypes<
  typeof formInvalidFeedbackProps
>

export const formTextProps = buildProps({
  //
  id: {
    type: String,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'small',
  },
  textVariant: {
    type: String,
    default: 'muted',
  },
} as const)
export type FormTextProps = ExtractPropTypes<typeof formTextProps>

export const formValidFeedbackProps = buildProps({
  //
  ariaLive: {
    type: String,
  },
  forceShow: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
  },
  role: {
    type: String,
  },
  state: {
    type: Boolean,
    default: null,
  },
  tag: {
    type: String,
    default: 'div',
  },
  tooltip: {
    type: Boolean,
    default: false,
  },
} as const)
export type FormValidFeedbackProps = ExtractPropTypes<
  typeof formValidFeedbackProps
>
