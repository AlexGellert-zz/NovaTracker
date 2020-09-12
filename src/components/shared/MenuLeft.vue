<template>
  <ion-menu side="start" content-id="menu-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Start Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="menu-content">
      <ion-list lines="full">
        <ion-item v-for="item in items" :key="item.name">
          <ion-icon :name="item.icon" slot="start"></ion-icon>
          <ion-label>{{ item.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default class MenuLeft extends Vue {
    items = [{ name: 'Home', icon: 'home', href: 'home' }, { name: 'About', icon: 'information-circle', href: 'about' },
        { name: 'Articles', icon: 'list-box', href: 'articles' }, { name: 'Log out', icon: 'logout', href: 'logout' }]
    constructor(){
        super();
    }
  }
</script>