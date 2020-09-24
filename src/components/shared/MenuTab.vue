<style scoped>
@import './../../styles/themes.less';

.bottom{
  position: absolute;
  display: flex;
  background: var(--layout-login-background);
  bottom: 0px;
  width: 100%;
  padding-bottom: 5px;
  box-shadow: 1px 0px 0px 1px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.align{
  display: flex;
  width: 100%;
}

.router{
  text-decoration: none;
  text-align: center;
  margin: 10px;
  width: 100%;
  color: var(--router-color);
  fill: var(--nav-fill);
}

.icon{
    margin: auto;
    height: 2em;
    width: 2em;
    margin-bottom: 5px;
}


.tab-label{
  margin: 0;
    display: block;
    overflow: hidden;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
}

a:not(.button):hover {
    color: var(--router-active);
    fill: var(--router-active) !important;
}

a:active{
  fill: var(--router-active) !important;
}

</style>

<template>
  <ion-page class="bottom footer">
      <ion-tab-bar class="align">
          <router-link class="router" :to="{path: `/inventory`}">
          <svg-icon class="icon" name="list" />
          <label class="tab-label">Inventory</label>
          </router-link>


          <router-link class="router"  :to="{path: `/barCodeScanner`}">
          <svg-icon class="icon" name="barcode" />
          <label class="tab-label">Scan</label>
          </router-link>

          <router-link class="router" :to="{path: `/searchItem`}">
          <svg-icon class="icon" name="magnify" />
          <label class="tab-label">Search</label>
          </router-link>
      </ion-tab-bar>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SvgIcon from "./svg/svg.vue"

@Component({
    components: {
        SvgIcon
    }
})
export default class MenuTab extends Vue {
  constructor() {
    super();
  }
}
</script>
