<style>
@import "./styles/main.less";
</style>

<template>
  <ion-app>
    <ion-page v-if="isLoggedIn">
      <menu-left />
      <ion-header>
        <ion-toolbar>
          <ion-title>
            <fa-icon icon="dog" />Nova's Inventory
          </ion-title>
          <fa-icon class="menu" @click="openStart()" icon="bars" />
        </ion-toolbar>
      </ion-header>
      <router-view></router-view>
    </ion-page>
    <ion-page v-if="!isLoggedIn">
      <menu-left />
      <ion-header>
        <ion-toolbar>
          <ion-title>
            <fa-icon icon="dog" />Nova's Inventory
          </ion-title>
          <fa-icon class="menu" icon="bars" />
        </ion-toolbar>
      </ion-header>
      <Login @success="success"/>
    </ion-page>
  </ion-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuLeft from "./components/shared/MenuLeft.vue";
import { dataBaseAPI } from "./services/dataBaseAPI";
import Login from "./components/user/Login.vue";

@Component({
  components: {
    MenuLeft,
    Login
  },
})
export default class App extends Vue {
  isLoggedIn: boolean = false;
  constructor(){
    super();
  }
  openStart() {
    var openMenu = (document.querySelector("ion-menu-controller") as any).open("start");
  }
  success(){
    this.isLoggedIn = true;
  }
}
</script>


