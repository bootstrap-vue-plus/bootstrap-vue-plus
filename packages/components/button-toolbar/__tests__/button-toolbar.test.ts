import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { waitNT } from '@bootstrap-vue-plus/utils'
import { BvButton } from '../../button'
import { BvButtonGroup } from '../../button-group'
import { BvButtonToolbar } from '..'

describe('button-toolbar', () => {
  test('toolbar root should be "div"', async () => {
    const wrapper = mount(BvButtonToolbar)
    expect(wrapper.element.tagName).toBe('DIV')
    wrapper.unmount()
  })

  test('toolbar should contain base class', async () => {
    const wrapper = mount(BvButtonToolbar)
    expect(wrapper.classes()).toContain('btn-toolbar')
    wrapper.unmount()
  })

  test('toolbar should not have class "justify-content-between"', async () => {
    const wrapper = mount(BvButtonToolbar)
    expect(wrapper.classes()).not.toContain('justify-content-between')
    wrapper.unmount()
  })

  test('toolbar should have role', async () => {
    const wrapper = mount(BvButtonToolbar)
    expect(wrapper.attributes('role')).toBe('toolbar')
    wrapper.unmount()
  })

  test('toolbar should not have tabindex by default', async () => {
    const wrapper = mount(BvButtonToolbar)
    expect(wrapper.attributes('tabindex')).toBeUndefined()
    wrapper.unmount()
  })

  test('toolbar should have class "justify-content-between" when justify set', async () => {
    const wrapper = mount(BvButtonToolbar, {
      props: {
        justify: true,
      },
    })
    expect(wrapper.classes()).toContain('justify-content-between')
    expect(wrapper.classes()).toContain('btn-toolbar')
    wrapper.unmount()
  })

  test('toolbar should have tabindex when key-nav set', async () => {
    const wrapper = mount(BvButtonToolbar, {
      props: {
        keyNav: true,
      },
    })
    expect(wrapper.attributes('tabindex')).toBeDefined()
    expect(wrapper.attributes('tabindex')).toBe('0')
    wrapper.unmount()
  })

  // These tests are wrapped in a new describe to limit the scope of the getBCR Mock
  describe('keyboard navigation', () => {
    const origGetBCR = Element.prototype.getBoundingClientRect

    beforeEach(() => {
      // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
      // In our test below, all pagination buttons would normally be visible
      Element.prototype.getBoundingClientRect = vi.fn(() => ({
        width: 24,
        height: 24,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }))
    })

    afterEach(() => {
      // Restore prototype
      Element.prototype.getBoundingClientRect = origGetBCR
    })

    // Test App for keynav
    const App = {
      render() {
        return h(BvButtonToolbar, { keyNav: true }, [
          h(BvButtonGroup, [h(BvButton, 'a'), h(BvButton, 'b')]),
          h(BvButtonGroup, [
            h(BvButton, { disabled: true }, 'c'),
            h(BvButton, 'd'),
          ]),
          h(BvButtonGroup, [h(BvButton, 'e'), h(BvButton, 'f')]),
        ])
      },
    }

    test('has correct structure', async () => {
      const wrapper = mount(App, {
        attachTo: document.body,
      })

      await waitNT(wrapper.vm)

      expect(wrapper.find('div.btn-toolbar').exists()).toBe(true)
      expect(wrapper.find('div.btn-toolbar').attributes('tabindex')).toBe('0')

      const $groups = wrapper.findAll('div.btn-group')
      expect($groups).toBeDefined()
      expect($groups.length).toBe(3)

      const $btns = wrapper.findAll('button')
      expect($btns).toBeDefined()
      expect($btns.length).toBe(6)
      expect($btns[0].attributes('tabindex')).toBe('-1')
      expect($btns[1].attributes('tabindex')).toBe('-1')
      expect($btns[2].attributes('tabindex')).toBeUndefined() // Disabled button
      expect($btns[3].attributes('tabindex')).toBe('-1')
      expect($btns[4].attributes('tabindex')).toBe('-1')
      expect($btns[5].attributes('tabindex')).toBe('-1')

      wrapper.unmount()
    })

    test('focuses first button when tabbed into', async () => {
      const wrapper = mount(App, {
        attachTo: document.body,
      })

      await waitNT(wrapper.vm)

      expect(wrapper.find('div.btn-toolbar').exists()).toBe(true)
      expect(wrapper.find('div.btn-toolbar').attributes('tabindex')).toBe('0')

      const $btns = wrapper.findAll('button')
      expect($btns).toBeDefined()
      expect($btns.length).toBe(6)

      expect(document.activeElement).not.toBe(wrapper.element)
      expect(document.activeElement).not.toBe($btns[0].element)

      await wrapper.find('div.btn-toolbar').trigger('focusin')
      expect(document.activeElement).toBe($btns[0].element)

      wrapper.unmount()
    })

    test('keyboard navigation works', async () => {
      const wrapper = mount(App, {
        attachTo: document.body,
      })

      await waitNT(wrapper.vm)

      expect(wrapper.find('div.btn-toolbar').exists()).toBe(true)
      expect(wrapper.find('div.btn-toolbar').attributes('tabindex')).toBe('0')

      const $btns = wrapper.findAll('button')
      expect($btns).toBeDefined()
      expect($btns.length).toBe(6)

      // Focus first button
      $btns[0].element.focus()
      expect(document.activeElement).toBe($btns[0].element)

      // Cursor right
      await $btns[0].trigger('keydown.right')
      expect(document.activeElement).toBe($btns[1].element)

      // Cursor right (skips disabled button)
      await $btns[1].trigger('keydown.right')
      expect(document.activeElement).toBe($btns[3].element)

      // Cursor shift-right (focuses last button)
      await $btns[1].trigger('keydown.right', { shiftKey: true })
      expect(document.activeElement).toBe($btns[5].element)

      // Cursor left
      await $btns[5].trigger('keydown.left')
      expect(document.activeElement).toBe($btns[4].element)

      // Cursor shift left (focuses first button)
      await $btns[5].trigger('keydown.left', { shiftKey: true })
      expect(document.activeElement).toBe($btns[0].element)

      wrapper.unmount()
    })
  })
})
