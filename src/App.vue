<style>
@import "./styles/main.less";
</style>

<template>
  <ion-app>
    <ion-page>
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
  </ion-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuLeft from "./components/shared/MenuLeft.vue";
import { dataBaseAPI } from "./services/dataBaseAPI";

@Component({
  components: {
    MenuLeft,
  },
})
export default class App extends Vue {

  async beforeCreate(){
    await dataBaseAPI.readUsers();
    await dataBaseAPI.readInventory();
  }
  openStart() {
    var openMenu = (document.querySelector("ion-menu-controller") as any).open("start");
  }
}
</script>


