<style scoped>
ion-row.hydrated {
  justify-content: center;
}
</style>

<template>
  <ion-page>
      <ion-grid>
            <ion-row>
                <img src="@/assets/husky.png" alt="Picture of a husky." width="400px" />
            </ion-row>
            <ion-row>
                <h3>{{itemName}}</h3>
            </ion-row>
            <ion-row>
                <ion-button>Change Name</ion-button>
            </ion-row>
            <ion-row>
                <ion-button>Edit Quantity</ion-button>
            </ion-row>
            <ion-row>
                <!-- Add Modal for every Edit -->
                <ion-button>Edit Description</ion-button>
            </ion-row>
            <ion-row>
                <ion-button>Save</ion-button>
            </ion-row>
        </ion-grid>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Item extends Vue {
    itemName: string = "Nova";
    itemImg: any = "@/assets/husky.png";
  constructor() {
    super();
  }
}
</script>
