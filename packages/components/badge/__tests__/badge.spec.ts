import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvBadge } from '..'

describe('badge', () => {
  test('should have base classes', async () => {
    const wrapper = mount(BvBadge)

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).toBeUndefined()

    wrapper.unmount()
  })

  test('should have default slot content', async () => {
    const wrapper = mount(BvBadge, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.text()).toBe('foobar')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).toBeUndefined()

    wrapper.unmount()
  })

  test('should apply variant class', async () => {
    const wrapper = mount(BvBadge, {
      props: {
        variant: 'danger',
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('badge-danger')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.unmount()
  })

  test('should apply pill class', async () => {
    const wrapper = mount(BvBadge, {
      props: {
        pill: true,
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('badge-pill')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.unmount()
  })

  test('should have active class when prop active set', async () => {
    const wrapper = mount(BvBadge, {
      props: {
        active: true,
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.unmount()
  })

  test('should have disabled class when prop disabled set', async () => {
    const wrapper = mount(BvBadge, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')

    wrapper.unmount()
  })

  test('renders custom root element', async () => {
    const wrapper = mount(BvBadge, {
      props: {
        tag: 'small',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.unmount()
  })

  test('renders link when href provided', async () => {
    const wrapper = mount(BvBadge, {
      props: {
        href: '/foo/bar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBeDefined()
    expect(wrapper.attributes('href')).toBe('/foo/bar')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.unmount()
  })
})
