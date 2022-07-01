import { computed } from 'vue'
import {
  buildProps,
  get,
  isArray,
  isPlainObject,
  isUndefined,
  keysOf,
  stripTags,
} from '@bootstrap-vue-plus/utils'
import { useProp } from '../use-prop'
import type { ComputedRef } from 'vue'

export const formOptionControlProps = buildProps({
  //
  disabledField: {
    type: String,
    default: 'disabled',
  },
  htmlField: {
    type: String,
    default: 'html',
  },
  options: {
    type: [Array, Object],
    default: [],
  },
  textField: {
    type: String,
    default: 'text',
  },
  valueField: {
    type: String,
    default: 'value',
  },
} as const)

export const useFormOptions = (): ComputedRef<Array<any>> => {
  const options = useProp<Array<any> | Record<string, any>>('options')
  const valueField = useProp<string>('valueField')
  const textField = useProp<string>('textField')
  const htmlField = useProp<string>('htmlField')
  const disabledField = useProp<string>('disabledField')

  const normalizeOption = (
    option: Record<string, any>,
    key: string | null = null
  ) => {
    // When the option is an object, normalize it
    if (isPlainObject(option)) {
      const value = get(option, valueField.value)
      const text = get(option, textField.value)
      return {
        value: isUndefined(value) ? key || text : value,
        text: stripTags(String(isUndefined(text) ? key : text)),
        html: get(option, htmlField.value),
        disabled: Boolean(get(option, disabledField.value)),
      }
    }
    // Otherwise create an `<option>` object from the given value
    return {
      value: key || option,
      text: stripTags(String(option)),
      disabled: false,
    }
  }

  const normalizeOptions = (
    options: Array<any> | Record<string, any> | undefined
  ): Array<any> => {
    // Normalize the given options array
    if (isArray(options)) {
      return options.map((option) => normalizeOption(option))
    } else if (isPlainObject(options)) {
      // Normalize a `options` object to an array of options
      return keysOf(options).map((key) =>
        normalizeOption(options[key] || {}, key)
      )
    }
    // If not an array or object, return an empty array
    /* istanbul ignore next */
    return []
  }

  return computed(() => normalizeOptions(options.value))
}
