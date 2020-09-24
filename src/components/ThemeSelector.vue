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
  border-top: 1px solid rgba(255,255,255,0.2);
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
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import SvgIcon from "./shared/svg/svg.vue";

@Component({
  components: {
    SvgIcon,
  },
})
export default class ThemeSelector extends Vue {
  constructor() {
    super();
  }

  changeTheme(color){
    const rootEl = document.documentElement;
    const currentTheme = rootEl.getAttribute('data-theme');
    console.log("current theme: " + currentTheme);
    if(color != currentTheme){
      rootEl.setAttribute('data-theme', color);
    }
  }
}
</script>
