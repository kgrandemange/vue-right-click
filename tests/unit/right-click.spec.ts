import { shallowMount } from '@vue/test-utils'
import RightClick from '@/components/RightClick.vue'

describe('RightClick.vue', () => {

  it('renders throw an error when items are not setted', () => {
    // @ts-ignore
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    const wrapper = shallowMount(RightClick)
    expect(spy).toBeCalled();
    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: Missing required prop');
    spy.mockRestore();
  })

  it('render item name props (with one item)', () => {
    const items = [{
      id: 1,
      name: 'test',
      action: ''
    }]

    const wrapper = shallowMount(RightClick, {
      propsData: {
        items
      }
    })

    expect(wrapper.text()).toMatch(items[0].name)
  })

  it('render item name props (with multiple items)', () => {
    const items = [{
      id: 1,
      name: 'item 1',
      action: ''
    }, {
      id: 2,
      name: 'item 2',
      action: ''
    }]

    const wrapper = shallowMount(RightClick, {
      propsData: {
        items
      }
    })

    console.log(wrapper.text())
    console.log(wrapper.html())
    expect(wrapper.text()).toMatch(`${items[0].name}${items[1].name}`)
  })
})
