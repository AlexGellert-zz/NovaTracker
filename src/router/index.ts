import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Login from '../components/user/Login.vue'
import QuickEdit from '../components/QuickEdit.vue';
import ItemDisplay from '../components/inventory/ItemDisplay.vue';
import Inventory from '../components/inventory/Inventory.vue';
import UserList from '../components/user/UserList.vue';
import NewItem from '../components/inventory/NewItem.vue';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
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
    path: '/itemDisplay',
    name: 'ItemDisplay',
    component: ItemDisplay
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory
  },
  {
    path: '/userList',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/newItem',
    name: 'NewItem',
    component: NewItem
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
