<style scoped>
@import "./../styles/themes.less";

.layout-body-background {
  margin-top: 0px !important;
  padding: 5px;
  padding-top: 20px;
}

h4 {
  text-align: left;
}

.singleLine {
  margin-left: 4px;
  margin-bottom: 4%;
  width: 97%;
  height: 1px;
  background: white;
}

ul {
  padding: 0;
}

li {
  counter-increment: index; 
  display: flex;
  align-items: center;
  padding: 12px 0;
  color: var(--nav-fill);
  font-size: 18px;
}

li::before {
  content: counters(index, ".", decimal-leading-zero);
  font-size: 1.5rem;
  text-align: right;
  font-weight: bold;
  min-width: 50px;
  padding-right: 12px;
  align-self: flex-start;
  background-image: linear-gradient(to bottom, var(--nav-fill), var(--nav-fill));
  -webkit-background-clip: text;
}

li + li {
  border-top: 1px solid rgb(255, 255, 255);
}

.m-button{
    border-radius: 8px;
    margin: 0px 10px;
    padding: 8px 28px 9px 21px;
    overflow: hidden;
    height: 45px;
    width: 38%;
    font-size: 18px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.centerButton{
  display: block;
  margin: auto;
}

</style>

<template>
  <ion-page class="layout-body-background">
    <h4 class="header">Theme Selector</h4>
    <div class="singleLine"></div>
    <ul>
      <li class="item-content" @click="changeTheme(null)">
        <label>Dark</label>
      </li>
      <li class="item-content" @click="changeTheme('light')">
        <label>Light</label>
      </li>
      <li class="item-content" @click="changeTheme('blue')">
        <label>Blue</label>
      </li>
      <li class="item-content" @click="changeTheme('green')">
        <label>Green</label>
      </li>
    </ul>

    <button class="m-button m-button-list centerButton" @click="saveTheme()" >Save Theme</button>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import SvgIcon from "./shared/svg/svg.vue";
import { novaUser } from "@/types/index";
const rootEl = document.documentElement;

@Component({
  components: {
    SvgIcon,
  },
})
export default class ThemeSelector extends Vue {
  currentUser: any;
  constructor() {
    super();
    this.currentUser = dataBaseAPI.getCurrentUser();
  }

  changeTheme(color){
    var currentTheme = rootEl.getAttribute('data-theme');
    if(color != currentTheme){
      rootEl.setAttribute('data-theme', color);
    }
  }

  saveTheme(){
    this.currentUser.user_theme = rootEl.getAttribute('data-theme');
    dataBaseAPI.updateUser(this.currentUser).then((res) => {
      this.$router.push('/');
    });
    
  }
}
</script>
