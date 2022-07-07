import { buildProps } from '@bootstrap-vue-plus/utils'
import type { ExtractPropTypes } from 'vue'

export const transporterProps = buildProps({
  appear: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
  },
  noFade: {
    type: Boolean,
    default: false,
  },
  transProps: {
    type: Object,
  },
} as const)
export type TransporterProps = ExtractPropTypes<typeof transporterProps>
