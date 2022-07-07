import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvHover } from '../hover'

describe('v-bv-hover directive', () => {
  test('works', async () => {
    let hovered1 = false
    let hovered2 = false
    const App = {
      data() {
        return {
          text: 'FOO',
          changeHandler: false,
        }
      },
      directives: {
        BvHover,
      },
      methods: {
        handleHover1(isHovered: boolean) {
          hovered1 = isHovered
        },
        handleHover2(isHovered: boolean) {
          hovered2 = isHovered
        },
      },
      template: `<div v-bv-hover="changeHandler ? handleHover2 : handleHover1"><span>{{ text }}</span></div>`,
    }
    const wrapper = mount(App)

    expect(wrapper.vm).toBeDefined()
    expect(hovered1).toBe(false)

    await wrapper.trigger('mouseenter')
    expect(hovered1).toBe(true)

    await wrapper.trigger('mouseleave')
    expect(hovered1).toBe(false)

    await wrapper.setData({ text: 'BAR' })
    await wrapper.trigger('mouseenter')
    expect(hovered1).toBe(true)

    await wrapper.setData({ changeHandler: true })
    await wrapper.trigger('mouseenter')
    expect(hovered2).toBe(true)

    wrapper.unmount()
  })
})
