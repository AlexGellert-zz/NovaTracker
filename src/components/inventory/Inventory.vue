<style scoped>
ion-col{
  border: 1px solid grey;
}

</style>

<template>
  <ion-page>
    <ion-page>
    <ion-grid>
      <ion-row>
        <ion-col>Inventory List</ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="six">Name</ion-col>
        <ion-col>Quantity</ion-col>
        <ion-col>Edit</ion-col>
      </ion-row>
      <ion-row v-for="(item, index) in inventory" :key="index">
        <ion-col class="six">{{item.item_name}}</ion-col>
        <ion-col>{{item.item_quantity}}</ion-col>
        <ion-col><router-link :to="{path: `/inventory/${item.id}`, params:{item: item.id}}"><ion-button>Edit</ion-button></router-link></ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { novaItem } from "@/types/index";

@Component
export default class Inventory extends Vue {
  inventory: novaItem[] = dataBaseAPI.state.itemList;

  constructor() {
    super();
  }

}
</script>
