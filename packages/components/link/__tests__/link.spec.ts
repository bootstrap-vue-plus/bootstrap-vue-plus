import { defineComponent, h, renderSlot } from 'vue'
import { mount } from '@vue/test-utils'
import emitter from 'tiny-emitter/instance'
import { describe, expect, test, vi } from 'vitest'
import { BvLink } from '..'

describe('bv-link', () => {
  test('has expected default structure', async () => {
    const wrapper = mount(BvLink)

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('#')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('renders content from default slot', async () => {
    const wrapper = mount(BvLink, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('#')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })

  test('sets attribute href to user supplied value', async () => {
    const wrapper = mount(BvLink, {
      props: {
        href: '/foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('sets attribute href when user supplied href is hash target', async () => {
    const wrapper = mount(BvLink, {
      props: {
        href: '#foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('#foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('should set href to string `to` prop', async () => {
    const wrapper = mount(BvLink, {
      props: {
        to: '/foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('should set href to path from `to` prop', async () => {
    const wrapper = mount(BvLink, {
      props: {
        to: { path: '/foobar' },
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_self')
    expect(wrapper.attributes('rel')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('should default rel to `noopener` when target==="_blank"', async () => {
    const wrapper = mount(BvLink, {
      props: {
        href: '/foobar',
        target: '_blank',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_blank')
    expect(wrapper.attributes('rel')).toEqual('noopener')
    expect(wrapper.classes().length).toBe(0)

    wrapper.unmount()
  })

  test('should render the given rel to when target==="_blank"', async () => {
    const wrapper = mount(BvLink, {
      props: {
        href: '/foobar',
        target: '_blank',
        rel: 'alternate',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toEqual('/foobar')
    expect(wrapper.attributes('target')).toEqual('_blank')
    expect(wrapper.attributes('rel')).toEqual('alternate')
    expect(wrapper.classes().length).toBe(0)

    wrapper.unmount()
  })

  test('should add "active" class when prop active=true', async () => {
    const wrapper = mount(BvLink, {
      props: {
        active: true,
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  test('should add aria-disabled="true" when disabled', async () => {
    const wrapper = mount(BvLink, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('aria-disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toEqual('true')

    wrapper.unmount()
  })

  test("should add '.disabled' class when prop disabled=true", async () => {
    const wrapper = mount(BvLink, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('disabled')

    wrapper.unmount()
  })

  test('focus and blur methods work', async () => {
    const wrapper = mount(BvLink, {
      attachTo: document.body,
      props: {
        href: '#foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')

    expect(document.activeElement).not.toBe(wrapper.element)
    wrapper.vm.$el.focus()
    expect(document.activeElement).toBe(wrapper.element)
    wrapper.vm.$el.blur()
    expect(document.activeElement).not.toBe(wrapper.element)

    wrapper.unmount()
  })

  describe('click handling', () => {
    test('should invoke click handler bound by Vue when clicked on', async () => {
      let called = 0
      let event = null
      const wrapper = mount(BvLink, {
        attrs: {
          onclick: (e: Event) => {
            event = e
            called++
          },
        },
      })

      expect(wrapper.element.tagName).toBe('A')
      expect(called).toBe(0)
      expect(event).toEqual(null)
      await wrapper.find('a').trigger('click')
      expect(called).toBe(1)
      expect(event).toBeInstanceOf(MouseEvent)

      wrapper.unmount()
    })

    test('should invoke multiple click handlers bound by Vue when clicked on', async () => {
      const spy1 = vi.fn()
      const spy2 = vi.fn()
      const wrapper = mount(BvLink, {
        attrs: {
          test: 'test',
          click: [spy1, spy2],
        },
      })
      expect(wrapper.element.tagName).toBe('A')
      expect(spy1).not.toHaveBeenCalled()
      expect(spy2).not.toHaveBeenCalled()
      await wrapper.find('a').trigger('click')
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()

      wrapper.unmount()
    })

    test('should NOT invoke click handler bound by Vue when disabled and clicked', async () => {
      let called = 0
      let event = null
      const wrapper = mount(BvLink, {
        props: {
          disabled: true,
        },
        attrs: {
          onclick: (e: Event) => {
            event = e
            called++
          },
        },
      })
      expect(wrapper.element.tagName).toBe('A')
      expect(called).toBe(0)
      expect(event).toEqual(null)
      await wrapper.find('a').trigger('click')
      expect(called).toBe(1)
      expect(event).not.toBeNull()

      wrapper.unmount()
    })

    test('should NOT invoke click handler bound via "addEventListener" when disabled and clicked', async () => {
      const wrapper = mount(BvLink, {
        props: {
          disabled: true,
        },
        global: {
          mocks: {
            $on: (...args: any[]) => emitter.on(...args),
          },
        },
      })
      const spy = vi.fn()
      expect(wrapper.element.tagName).toBe('A')
      wrapper.find('a').element.addEventListener('click', spy)
      await wrapper.find('a').trigger('click')
      expect(spy).not.toHaveBeenCalled()

      wrapper.unmount()
    })

    test('should emit "bv::link::clicked" on $root when clicked on', async () => {
      const spy = vi.fn()
      const App = {
        render() {
          return h('div', [h(BvLink, { href: '/foo' }, 'link')])
        },
      }

      const wrapper = mount(App, {
        global: {
          mocks: {
            $on: (...args: any[]) => emitter.on(...args),
          },
        },
      })
      expect(wrapper.vm).toBeDefined()
      wrapper.vm.$root.$on('bv::link::clicked', spy)

      await wrapper.find('a').trigger('click')
      expect(spy).toHaveBeenCalled()

      wrapper.unmount()
    })

    test('should not emit "bv::link::clicked" on $root when clicked on when disabled', async () => {
      const spy = vi.fn()
      const App = {
        render() {
          return h('div', [h(BvLink, { href: '/foo', disabled: true }, 'link')])
        },
      }

      const wrapper = mount(App, {
        global: {
          mocks: {
            $on: (...args: any[]) => emitter.on(...args),
          },
        },
      })
      expect(wrapper.vm).toBeDefined()
      wrapper.vm.$on('bv::link::clicked', spy)

      await wrapper.find('a').trigger('click')
      expect(spy).not.toHaveBeenCalled()

      wrapper.unmount()
    })

    test('should emit "clicked::link" on $root when clicked on', async () => {
      const spy = vi.fn()
      const App = {
        render() {
          return h('div', [h(BvLink, { href: '/foo' }, 'link')])
        },
      }

      const wrapper = mount(App, {
        global: {
          mocks: {
            $on: (...args: any[]) => emitter.on(...args),
          },
        },
      })
      // expect(wrapper.element).toBe(1)
      expect(wrapper.vm).toBeDefined()
      wrapper.vm.$root.$on('clicked::link', spy)
      // wrapper.find('div').element.addEventListener('clicked::link', spy)

      await wrapper.find('a').trigger('click')
      expect(spy).toHaveBeenCalled()

      wrapper.unmount()
    })

    test('should not emit "clicked::link" on $root when clicked on when disabled', async () => {
      const spy = vi.fn()
      const App = {
        render() {
          return h('div', [h(BvLink, { href: '/foo', disabled: true }, 'link')])
        },
      }

      const wrapper = mount(App, {
        global: {
          mocks: {
            $on: (...args: any[]) => emitter.on(...args),
          },
        },
      })
      expect(wrapper.vm).toBeDefined()
      wrapper.vm.$on('clicked::link', spy)

      await wrapper.find('a').trigger('click')
      expect(spy).not.toHaveBeenCalled()

      wrapper.unmount()
    })
  })

  describe('router-link support', () => {
    test('works', async () => {
      const mockRouter = {
        push: vi.fn(),
        mode: 'abstract',
        routes: [
          {
            path: '/',
            component: { name: 'R', template: '<div class="r">ROOT</div>' },
          },
          {
            path: '/a',
            component: { name: 'A', template: '<div class="a">A</div>' },
          },
          {
            path: '/b',
            component: { name: 'B', template: '<div class="a">B</div>' },
          },
        ],
      }

      // Fake Gridsome `<g-link>` component
      const GLink = defineComponent({
        name: 'GLink',
        props: {
          to: {
            type: [String, Object],
            default: '',
          },
        },
        setup(props, { slots }) {
          return () => {
            return h('a', { href: props.to }, [renderSlot(slots, 'default')])
          }
        },
      })

      const App = {
        render() {
          return h('main', [
            // router-link
            h(BvLink, { to: '/a' }, ['to-a']),
            // regular link
            h(BvLink, { href: '/a' }, ['href-a']),
            // router-link
            h(BvLink, { to: { path: '/b' } }, ['to-path-b']),
            // g-link
            h(BvLink, { routerComponentName: 'g-link', to: '/a' }, [
              'g-link-a',
            ]),
            h('router-view'),
          ])
        },
      }

      const wrapper = mount(App, {
        attachTo: document.body,
        global: {
          components: {
            'g-link': GLink,
          },
          mocks: {
            $router: mockRouter,
          },
        },
      })

      expect(wrapper.vm).toBeDefined()
      expect(wrapper.element.tagName).toBe('MAIN')

      expect(wrapper.findAllComponents(BvLink).length).toBe(4)

      const $links = wrapper.findAllComponents(BvLink)
      $links.forEach(($link) => {
        expect($link.element).toBeDefined()
        expect($links[0].element.tagName).toBe('ROUTER-LINK')
      })
      expect(
        $links.map(($link) => $link.element.tagName === 'ROUTER-LINK')
      ).toStrictEqual([true, false, true, false])

      expect($links[3].element.tagName === 'G-LINK').toBe(true)

      wrapper.unmount()
    })
  })
})
