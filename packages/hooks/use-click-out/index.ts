import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { contains, eventOff, eventOn } from '@bootstrap-vue-plus/utils'
import { EVENT_OPTIONS_NO_CAPTURE } from '@bootstrap-vue-plus/constants'
import { useContext } from '../use-context'

export const useClickOut = (clickOutHandler?: (event: any) => void) => {
  const elRef = useContext<HTMLElement | undefined>('$el')
  const listenForClickOut = ref<boolean>(false)

  let clickOutElement: any = null
  let clickOutEventName: any = null
  watch(listenForClickOut, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      eventOff(
        clickOutElement,
        clickOutEventName,
        _clickOutHandler,
        EVENT_OPTIONS_NO_CAPTURE
      )
      if (newValue) {
        eventOn(
          clickOutElement,
          clickOutEventName,
          _clickOutHandler,
          EVENT_OPTIONS_NO_CAPTURE
        )
      }
    }
  })

  onMounted(() => {
    if (!clickOutElement) {
      clickOutElement = document
    }
    if (!clickOutEventName) {
      clickOutEventName = 'click'
    }
    if (listenForClickOut.value) {
      eventOn(
        clickOutElement,
        clickOutEventName,
        _clickOutHandler,
        EVENT_OPTIONS_NO_CAPTURE
      )
    }
  })

  onBeforeUnmount(() => {
    eventOff(
      clickOutElement,
      clickOutEventName,
      _clickOutHandler,
      EVENT_OPTIONS_NO_CAPTURE
    )
  })

  const isClickOut = (event: any) => {
    return !contains(elRef.value, event.target)
  }

  const _clickOutHandler = (event: any) => {
    if (clickOutHandler && isClickOut(event)) {
      clickOutHandler(event)
    }
  }

  return {
    listenForClickOut,
  }
}
