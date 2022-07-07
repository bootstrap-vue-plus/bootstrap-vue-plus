import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { eventOff, eventOn } from '@bootstrap-vue-plus/utils'
import { EVENT_OPTIONS_NO_CAPTURE } from '@bootstrap-vue-plus/constants'

export const useFocusIn = (clickOutHandler?: (event: any) => void) => {
  const listenForFocusIn = ref<boolean>(false)

  let focusInElement: any = null
  watch(listenForFocusIn, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      eventOff(
        focusInElement,
        'focusin',
        _clickOutHandler,
        EVENT_OPTIONS_NO_CAPTURE
      )
      if (newValue) {
        eventOn(
          focusInElement,
          'focusin',
          _clickOutHandler,
          EVENT_OPTIONS_NO_CAPTURE
        )
      }
    }
  })

  onMounted(() => {
    if (!focusInElement) {
      focusInElement = document
    }
    if (listenForFocusIn.value) {
      eventOn(
        focusInElement,
        'focusin',
        _clickOutHandler,
        EVENT_OPTIONS_NO_CAPTURE
      )
    }
  })

  onBeforeUnmount(() => {
    eventOff(
      focusInElement,
      'focusin',
      _clickOutHandler,
      EVENT_OPTIONS_NO_CAPTURE
    )
  })

  const _clickOutHandler = (event: any) => {
    if (clickOutHandler) {
      clickOutHandler(event)
    }
  }

  return {
    listenForFocusIn,
  }
}
