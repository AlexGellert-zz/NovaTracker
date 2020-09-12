<style scoped>
@import './../styles/home.less';
</style>

<template>
  <div>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-button class="homeBtn">Check Inventory</ion-button>
        </ion-col>
        <ion-col>
          <ion-button class="homeBtn">Add Quantity</ion-button>
        </ion-col>
      </ion-row>
      <ion-row v-if="isAdmin">
        <ion-col>
          <ion-button class="homeBtn">Edit Users</ion-button>
        </ion-col>
        <ion-col>
          <ion-button class="homeBtn">Add Items</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CameraComponent from "./shared/CameraComponent.vue";

@Component({
  components: {
    CameraComponent,
  },
})
export default class Home extends Vue {
  isAdmin: boolean = true;
  constructor() {
    super();
  }
}
</script>
