import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvButtonGroup } from '..'

describe('button-group', () => {
  test('has expected default structure', async () => {
    const wrapper = mount(BvButtonGroup)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.text()).toBe('')

    wrapper.unmount()
  })

  test('should render default slot', async () => {
    const wrapper = mount(BvButtonGroup, {
      slots: {
        default: '<span>foobar</span>',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.text()).toBe('foobar')

    wrapper.unmount()
  })

  test('should apply vertical class', async () => {
    const wrapper = mount(BvButtonGroup, {
      props: {
        vertical: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).not.toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  test('should apply size class', async () => {
    const wrapper = mount(BvButtonGroup, {
      props: {
        size: 'sm',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('btn-group-sm')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  test('should apply size class when vertical', async () => {
    const wrapper = mount(BvButtonGroup, {
      props: {
        size: 'sm',
        vertical: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group-sm')
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).not.toContain('btn-group')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  test('has custom role when aria-role prop set', async () => {
    const wrapper = mount(BvButtonGroup, {
      props: {
        ariaRole: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('foobar')

    wrapper.unmount()
  })
})
