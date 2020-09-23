import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../components/Home.vue'

//Inventory
import Item from '../components/inventory/Item.vue';
import Inventory from '../components/inventory/Inventory.vue';
import QuickEdit from '../components/inventory/QuickEdit.vue';
import BarCodeScanner from '../components/inventory/BarCodeScanner.vue';
import SearchItem from '../components/inventory/SearchItem.vue'

//User
import Login from '../components/user/Login.vue'
import UserList from '../components/user/UserList.vue';
import User from '../components/user/User.vue';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/quickEdit',
    name: 'QuickEdit',
    component: QuickEdit
  },
  {
    path: '/newItem',
    name: 'NewItem',
    component: Item
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory
  },
  {
    path: '/inventory/:id',
    name: 'Item',
    component: Item
  },
  {
    path: '/userList',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/userList/:id',
    name: 'User',
    component: User
  },
  {
    path: '/newUser',
    name: 'NewUser',
    component: User
  },
  {
    path: '/barCodeScanner',
    name: 'BarCodeScanner',
    component: BarCodeScanner
  },
  {
    path: '/searchItem',
    name: 'SearchItem',
    component: SearchItem
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
