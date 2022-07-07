import { nextTick } from 'vue'
import { describe, expect, test } from 'vitest'
import { useClickOut } from '../use-click-out'

describe('utils/click-out', () => {
  test('works', async () => {
    let count = 0
    const clickOutHandler = () => {
      count++
    }

    const { listenForClickOut } = useClickOut(clickOutHandler)

    const clickEvent = new MouseEvent('click')

    expect(count).toBe(0)
    // expect(wrapper.vm.listenForClickOut).toBe(true)

    // When `this.listenForClickOut` is `true`
    listenForClickOut.value = true
    await nextTick()
    expect(count).toBe(0)
    document.dispatchEvent(clickEvent)
    expect(count).toBe(1)

    // When `this.listenForClickOut` is `false`
    listenForClickOut.value = false
    await nextTick()
    document.dispatchEvent(clickEvent)
    expect(count).toBe(1)
  })
})
