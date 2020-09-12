<style scoped>

</style>

<template>
  <div>
      Template
      <ion-button>Button</ion-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Inventory extends Vue {
  constructor() {
    super();
  }
}
</script>
