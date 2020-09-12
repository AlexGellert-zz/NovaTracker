<style scoped>

</style>

<template>
  <div>
      New Item
      <ion-button>Button</ion-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NewItem extends Vue {
  constructor() {
    super();
  }
}
</script>
