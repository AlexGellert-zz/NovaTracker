<style>
@import './styles/main.less';
</style>

<template>
  <ion-app>
    <menu-left />
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu - Basic</ion-title>
        <fa-icon class="menu" @click="openStart()" icon="bars"/>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <router-view></router-view>
    </ion-content>
    </ion-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuLeft from "./components/shared/MenuLeft.vue";



@Component({
  components: {
    MenuLeft
  }
})
export default class App extends Vue {
    goBackHome() {
      this.$router.push('/')
    }

    openStart() {
      var openMenu = (document.querySelector("ion-menu-controller") as any).open("start");
    }
}
</script>


