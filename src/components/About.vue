<style>
.my-custom-menu {
  --width: 500px;
}
</style>

<template>
<ion-app>
<ion-button @click="goBackHome()" full>Go Back!</ion-button>
</ion-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
    constructor(){
        super();
    }
    goBackHome() {
      this.$router.push('/')
    }
  }
</script>
