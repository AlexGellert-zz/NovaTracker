<style scoped>

</style>

<template>
  <ion-page>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>

      About Page
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
    constructor(){
        super();
    }
  }
</script>
