import { nextTick, onActivated, onMounted } from 'vue'
import {
  attemptFocus,
  buildProps,
  isVisible,
  matches,
  requestAF,
  select,
} from '@bootstrap-vue-plus/utils'
import { useProp } from '../use-prop'
import { useContext } from '../use-context'

const SELECTOR = 'input, textarea, select'

export const formControlProps = buildProps({
  //
  autofocus: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  form: {
    type: String,
  },
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
} as const)

export const useFormControl = () => {
  const elRef = useContext<HTMLElement | undefined>('$el')
  const autofocus = useProp<boolean>('autofocus')

  const handleAutofocus = () => {
    nextTick(() => {
      requestAF(() => {
        let el = elRef.value
        if (!el) return
        if (autofocus.value && isVisible(el)) {
          if (!matches(el, SELECTOR)) {
            el = select(SELECTOR, el)
          }
          el && attemptFocus(el)
        }
      })
    })
  }

  onMounted(handleAutofocus)

  onActivated(handleAutofocus)
}
