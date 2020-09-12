<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu - Basic</ion-title>
      </ion-toolbar>
    </ion-header>
    <menu-left />
        <router-view></router-view>
    </ion-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuLeft from "./components/MenuLeft.vue";


@Component({
  components: {
    MenuLeft,
  }
})
export default class App extends Vue {
      goBackHome() {
      this.$router.push('/')
    }
}
</script>


