<template>
<ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu - Basic</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="openStart()">Open Start Menu</ion-button>
    </ion-content>
</ion-app>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    openStart() {
      document.querySelector("ion-menu-controller").open("start");
    }
  }
};
</script>
