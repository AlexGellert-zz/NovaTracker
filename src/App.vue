<style>
@import "./styles/main.less";

ion-app.app-md {
  background: var(--layout-body-background);
}

.toolbar-background-md{
  background: var(--layout-body-background);
}

.fa-bars{
  margin-right: 10px;
}

.loginHeader {
  padding-top: 10px;
  text-align: center;
  background: var(--nav-background);
  height: 180px;
}

h4{
  margin: 0px 5px;
  font-size: 25px;
}

.toolbar-title{
  display: contents;
}

.headerIcon{
  fill: var(--nav-fill);
  margin-left: 5px;
  padding: 5px;
  height: 50px;
  width: 50px;
}
.nova{
    background: black;
    border-radius: 50%;
}
</style>

<template>
  <ion-app>
    <ion-page v-if="isLoggedIn">
      <menu-left />
      <ion-header>
        <ion-toolbar>
          <ion-title>
            <svg-icon class="headerIcon" name="novaIcon" /><h4>Nova's Inventory</h4>
          </ion-title>
          <fa-icon class="menu" @click="openStart()" icon="bars" />
        </ion-toolbar>
      </ion-header>
      <router-view></router-view>
    </ion-page>
    <ion-page v-if="!isLoggedIn">
      <div class="loginHeader">
        <img class="nova" src="./assets/husky.png"/>
        <h2>Nova's Inventory Tracker</h2>
      </div>
      <Login @success="success" />
    </ion-page>
  </ion-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuLeft from "./components/shared/MenuLeft.vue";
import { dataBaseAPI } from "./services/dataBaseAPI";
import Login from "./components/user/Login.vue";
import SvgIcon from "./components/shared/svg/svg.vue";

@Component({
  components: {
    MenuLeft,
    Login,
    SvgIcon
  },
})
export default class App extends Vue {
  isLoggedIn: boolean = true;
  constructor() {
    super();
  }

  created() {
    dataBaseAPI.readUsers();
    dataBaseAPI.readInventory();
  }

  openStart() {
    var openMenu = (document.querySelector("ion-menu-controller") as any).open(
      "start"
    );
  }
  success() {
    this.isLoggedIn = true;
  }
}
</script>


