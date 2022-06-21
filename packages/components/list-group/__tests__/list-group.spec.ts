import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvListGroup } from '..'

describe('list-group', () => {
  test('default should have tag div', async () => {
    const wrapper = mount(BvListGroup)

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.unmount()
  })

  test('default should contain only single class of list-group', async () => {
    const wrapper = mount(BvListGroup)

    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).not.toContain('list-group-flush')
    expect(wrapper.classes()).not.toContain('list-group-horizontal')

    wrapper.unmount()
  })

  test('should have tag ul then prop tag=ul', async () => {
    const wrapper = mount(BvListGroup, {
      props: { tag: 'ul' },
    })

    expect(wrapper.element.tagName).toBe('UL')

    wrapper.unmount()
  })

  test('should have class list-group-flush when prop flush=true', async () => {
    const wrapper = mount(BvListGroup, {
      props: { flush: true },
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-flush')
    expect(wrapper.classes()).not.toContain('list-group-horizontal')

    wrapper.unmount()
  })

  test('should have class list-group-horizontal when prop horizontal=true', async () => {
    const wrapper = mount(BvListGroup, {
      props: { horizontal: true },
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).not.toContain('list-group-flush')
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-horizontal')

    wrapper.unmount()
  })

  test('should have class list-group-horizontal-md when prop horizontal=md', async () => {
    const wrapper = mount(BvListGroup, {
      props: { horizontal: 'md' },
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).not.toContain('list-group-flush')
    expect(wrapper.classes()).not.toContain('list-group-horizontal')
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-horizontal-md')

    wrapper.unmount()
  })

  test('should not have class list-group-horizontal when prop horizontal=true and flush=true', async () => {
    const wrapper = mount(BvListGroup, {
      props: {
        horizontal: true,
        flush: true,
      },
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).not.toContain('list-group-horizontal')
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-flush')

    wrapper.unmount()
  })

  test('should not have class list-group-horizontal-lg when prop horizontal=lg and flush=true', async () => {
    const wrapper = mount(BvListGroup, {
      props: {
        horizontal: 'lg',
        flush: true,
      },
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).not.toContain('list-group-horizontal-lg')
    expect(wrapper.classes()).not.toContain('list-group-horizontal')
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('list-group-flush')

    wrapper.unmount()
  })

  test('should accept custom classes', async () => {
    const wrapper = mount(BvListGroup, {
      attrs: {
        class: 'foobar',
      },
    })

    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('list-group')
    expect(wrapper.classes()).toContain('foobar')

    wrapper.unmount()
  })
})
