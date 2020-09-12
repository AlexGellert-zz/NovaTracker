<style scoped>

</style>

<template>
  <ion-content>
      UserList
      <ion-button>Button</ion-button>
  </ion-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class UserList extends Vue {
  constructor() {
    super();
  }
}
</script>
