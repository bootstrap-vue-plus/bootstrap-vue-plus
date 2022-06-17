import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Link from '../src/link'

const AXIOM = 'Rem is the best girl'

describe('Link.vue', () => {
  test('render slots', () => {
    const wrapper = mount(Link, {
      props: {
        href: '#',
      },
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })

  test('render props tag', () => {
    const wrapper = mount(Link, {
      props: {
        href: '#',
        'router-tag': 'span',
        active: true,
      },
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.vm.$el.className).toEqual('active')
    expect(wrapper.vm.$el.tagName.toLowerCase()).toEqual('span')
  })

  test('render props active', () => {
    const wrapper = mount(Link, {
      props: {
        href: '#',
        routerTag: 'span',
        active: true,
      },
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.vm.$el.className).toEqual('active')
  })

  test('render props active-class', () => {
    const wrapper = mount(Link, {
      props: {
        href: '#',
        active: true,
        activeClass: 'active-class',
      },
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.vm.$el.className).toEqual('active-class')
  })

  test('render props rel', () => {
    const wrapper = mount(Link, {
      props: {
        href: '#',
        rel: 'test',
      },
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.vm.$el.getAttribute('rel')).toEqual('test')
  })

  test('render props target', () => {
    const wrapper = mount(Link, {
      props: {
        href: '#',
        target: '_blank',
      },
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.vm.$el.getAttribute('target')).toEqual('_blank')
  })
})
