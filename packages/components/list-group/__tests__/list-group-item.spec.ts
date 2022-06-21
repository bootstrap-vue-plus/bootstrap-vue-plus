import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvListGroupItem } from '..'

describe('list-group > list-group-item', () => {
  test('default should have tag div', async () => {
    const wrapper = mount(BvListGroupItem)

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.unmount()
  })

  test('default should contain only single class of list-group-item', async () => {
    const wrapper = mount(BvListGroupItem)

    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.classes()).toContain('list-group-item')

    wrapper.unmount()
  })

  test('default should not have class list-group-item-action', async () => {
    const wrapper = mount(BvListGroupItem)

    expect(wrapper.classes()).not.toContain('list-group-item-action')

    wrapper.unmount()
  })

  test('default should not have class active', async () => {
    const wrapper = mount(BvListGroupItem)

    expect(wrapper.classes()).not.toContain('active')

    wrapper.unmount()
  })

  test('default should not have class disabled', async () => {
    const wrapper = mount(BvListGroupItem)

    expect(wrapper.classes()).not.toContain('disabled')

    wrapper.unmount()
  })

  test('default should not have type attribute', async () => {
    const wrapper = mount(BvListGroupItem)

    expect(wrapper.attributes('type')).toBeUndefined()

    wrapper.unmount()
  })

  test('default should not have disabled attribute', async () => {
    const wrapper = mount(BvListGroupItem)

    expect(wrapper.attributes('disabled')).toEqual('false')

    wrapper.unmount()
  })

  test('should have disabled class when disabled=true', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { disabled: true },
    })

    expect(wrapper.classes()).toContain('disabled')

    wrapper.unmount()
  })

  test('should have active class when active=true', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { active: true },
    })

    expect(wrapper.classes()).toContain('active')

    wrapper.unmount()
  })

  test('should have variant class and base class when variant set', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { variant: 'danger' },
    })

    expect(wrapper.classes()).toContain('list-group-item')
    expect(wrapper.classes()).toContain('list-group-item-danger')

    wrapper.unmount()
  })

  test('should have tag a when href is set', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { href: '/foobar' },
    })

    expect(wrapper.element.tagName).toBe('A')

    wrapper.unmount()
  })

  test('should have class list-group-item-action when href is set', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { href: '/foobar' },
    })

    expect(wrapper.classes()).toContain('list-group-item-action')

    wrapper.unmount()
  })

  test('should have class list-group-item-action when action=true', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { action: true },
    })

    expect(wrapper.classes()).toContain('list-group-item-action')

    wrapper.unmount()
  })

  test('should have class list-group-item-action when tag=a', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { tag: 'a' },
    })

    expect(wrapper.classes()).toContain('list-group-item-action')

    wrapper.unmount()
  })

  test('should have href attribute when href is set', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { href: '/foobar' },
    })

    expect(wrapper.attributes('href')).toBe('/foobar')

    wrapper.unmount()
  })

  test('should have tag button when tag=button', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { tag: 'button' },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')

    wrapper.unmount()
  })

  test('should have tag a when tag=a', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { tag: 'a' },
    })
    expect(wrapper.element.tagName).toBe('A')
  })

  test('should have tag button when button=true', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { button: true },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')

    wrapper.unmount()
  })

  test('should have tag button when button=true and tag=foo', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: {
        button: true,
        tag: 'foo',
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')

    wrapper.unmount()
  })

  test('should not have href when button=true and href set', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: {
        button: true,
        href: '/foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('href')).toBeUndefined()

    wrapper.unmount()
  })

  test('should have class list-group-item-action when button=true', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { button: true },
    })

    expect(wrapper.classes()).toContain('list-group-item-action')

    wrapper.unmount()
  })

  test('should have type=button when button=true', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { button: true },
    })

    expect(wrapper.attributes('type')).toEqual('button')

    wrapper.unmount()
  })

  test('should have type=submit when button=true and attr type=submit', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { button: true },
      attrs: { type: 'submit' },
    })

    expect(wrapper.attributes('type')).toEqual('submit')

    wrapper.unmount()
  })

  test('should not have attribute disabled when button=true and disabled not set', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: { button: true },
    })

    expect(wrapper.attributes('disabled')).toBeUndefined()

    wrapper.unmount()
  })

  test('should have attribute disabled when button=true and disabled=true', async () => {
    const wrapper = mount(BvListGroupItem, {
      props: {
        button: true,
        disabled: true,
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()

    wrapper.unmount()
  })
})
