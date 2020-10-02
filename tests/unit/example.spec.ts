import { shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import ThemeSelector from '@/components/ThemeSelector.vue'

//User Components
import Login from '@/components/user/Login.vue'
import User from '@/components/user/User.vue'
import UserList from '@/components/user/UserList.vue'

//Inventory Components
import BarCodeScanner from '@/components/inventory/BarCodeScanner.vue'
import Inventory from '@/components/inventory/Inventory.vue'
import Item from '@/components/inventory/Item.vue'
import QuickEdit from '@/components/inventory/QuickEdit.vue'
import SearchItem from '@/components/inventory/SearchItem.vue'

//Shared Components
import MenuLeft from '@/components/shared/MenuLeft.vue'
import MenuTab from '@/components/shared/MenuTab.vue'
import CameraComponent from '@/components/shared/CameraComponent.vue'



describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.vm).toBeTruthy();
  })
})
