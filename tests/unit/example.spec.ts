import { createLocalVue, shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import ThemeSelector from '@/components/ThemeSelector.vue'

//User Components
import Login from '@/components/user/Login.vue'
import User from '@/components/user/User.vue'
import UserList from '@/components/user/UserList.vue'

//Inventory Components
import Inventory from '@/components/inventory/Inventory.vue'
import Item from '@/components/inventory/Item.vue'
import QuickEdit from '@/components/inventory/QuickEdit.vue'
import SearchItem from '@/components/inventory/SearchItem.vue'

//Shared Components
import MenuLeft from '@/components/shared/MenuLeft.vue'
import MenuTab from '@/components/shared/MenuTab.vue'

//Importing Vue Router
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(VueRouter)


/** Tests for Home **/
describe('Home.vue', () => {
  it('renders Home.vue and data testing', () => {
    const wrapper = shallowMount(Home, {
      stubs: ['router-link', 'ion-page', 'ion-grid', 'ion-row', 'ion-col', 'fa-icon']
    });
    expect(wrapper.vm).toBeTruthy();
  })
})

/** Tests for ThemeSelector **/
describe('ThemeSelector.vue', () => {
  it('renders ThemeSelector.vue', () => {
    const wrapper = shallowMount(ThemeSelector, {
      stubs: ['router-link', 'ion-page']
    });
    expect(wrapper.vm).toBeTruthy();
  })
})

/** Tests for Login **/
describe('Login.vue', () => {
  it('render Login.vue and login testing', () => {
    const wrapper = shallowMount(Login, {
      stubs: ['router-link', 'ion-page']
    });
    expect(wrapper.vm).toBeTruthy();
  })
})


/** Tests for user **/
describe('User.vue', () => {
  it('renders User.vue with params id: 2', () => {
    var $route = {
      path: '/userList/:id',
      components: User,
      params: {id: 2}
    }
    const wrapper = shallowMount(User, {
      mocks: {
        $route
      },
      stubs: ['router-link', 'ion-page', 'ion-avatar', 'ion-item', 'ion-label', 'ion-select', 'ion-select-option']
    });
    expect(wrapper.vm.$route.path).toBeTruthy();
  })
})

/** Tests for UserList **/
// describe('UserList.vue', () => {
//   it('renders props.msg when passed', () => {
//     const wrapper = shallowMount(UserList, {
//       stubs: ['router-link', 'ion-page']
//     });
//     wrapper.setData({userList: {id: 2, name: "member", password: "member", email: "member@member.com", alerts: 0, role: "member"}})
//     expect(wrapper.vm).toBeTruthy();
//   })
// })

/** Tests for Inventory **/
describe('Inventory.vue', () => {
  it('renders Inventory.vue and item list testing', () => {
    const wrapper = shallowMount(Inventory, {
      stubs: ['router-link', 'ion-page']
    });
    expect(wrapper.vm).toBeTruthy();
  })
})

/** Tests for Item **/
describe('Item.vue', () => {
  it('renders Item.vue with id: 2', () => {
    var $route = {
      path: '/inventory/:id',
      components: Item,
      params: {id: 2}
    }
    const wrapper = shallowMount(Item, {
      mocks: {
        $route
      },
      stubs: ['router-link', 'ion-page']
    });
    expect(wrapper.vm.$route.path).toBeTruthy();
  })
})

/** Tests for QuickEdit **/
describe('QuickEdit.vue', () => {
  it('render QuickEdit.vue and search function', () => {
    const wrapper = shallowMount(QuickEdit, {
      stubs: ['router-link', 'ion-page']
    });
    expect(wrapper.vm).toBeTruthy();
  })
})

/** Tests for SearchItem **/
describe('SearchItem.vue', () => {
  it('render SearchItem.vue and search function', () => {
    const wrapper = shallowMount(SearchItem, {
      stubs: ['router-link', 'ion-page']
    });
    expect(wrapper.vm).toBeTruthy();
  })
})

/** Tests for SearchItem **/
describe('MenuLeft.vue', () => {
  it('render MenuLeft.vue', () => {
    const wrapper = shallowMount(MenuLeft, {
      stubs: ['router-link', 'ion-page', 'ion-menu', 'ion-header', 'ion-toolbar', 'ion-title', 'ion-content']
    });
    expect(wrapper.vm).toBeTruthy();
  })
})

/** Tests for SearchItem **/
describe('MenuTab.vue', () => {
  it('render MenuTab.vue', () => {
    const wrapper = shallowMount(MenuTab, {
      stubs: ['router-link', 'ion-page', 'ion-tab-bar']
    });
    expect(wrapper.vm).toBeTruthy();
  })
})

