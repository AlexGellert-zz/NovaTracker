<style scoped>

ion-row.hydrated {
  justify-content: center;
}

.avatar-md {
  width: 200px;
  height: 200px;
}

.newItem{
  float: right;
}

</style>

<template>
  <ion-page>
      <h1 v-if="newItem">New Item</h1>
      <h1 v-if="!newItem">Item Name: {{item.name}}</h1>
    <form>
      <ion-item>
        <img v-if="stockImage" src="@/assets/husky.png" alt="Picture of a husky." width="250px" @click="uploadImage()"/>
        <img v-if="!stockImage" :src="item.item_image" @click="uploadImage()"  width="250px" />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Name</ion-label>
        <ion-input :disabled="permission" type="text" :value="item.name" v-model="item.name" @ionChange="item.name = $event.target.value" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Description</ion-label>
        <ion-textarea :disabled="permission" type="text" :value="item.item_description" v-model="item.item_description" @ionChange="item.item_description = $event.target.value" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Quantity</ion-label>
        <ion-input type="text" :value="item.item_quantity" v-model="item.item_quantity" @ionChange="item.item_quantity = $event.target.value" required />
      </ion-item>

        <ion-button class="newItem" type="submit" @click="addItem($event)" v-if="newItem">Create New Item</ion-button>
        <ion-button class="newItem" type="submit" @click="updateItem($event)" v-if="!newItem">Update Item</ion-button>
    </form>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { photoService } from "@/services/PhotoService"
import { novaItem, novaUser } from "@/types/index";

@Component
export default class Inventory extends Vue {
  item: novaItem = {name: "", item_description: "" , item_quantity: "", item_image: new Blob()};
  newItem: boolean = true;
  stockImage: boolean = true;
  newImage: any = {};
  permission: boolean = true;
  currentUser: novaUser = dataBaseAPI.getCurrentUser();

  constructor() {
    super();
  }

  created(){
    if(this.$route.params.item != undefined){
      this.item = dataBaseAPI.getItem(this.$route.params.item.toLowerCase());
      this.newItem = false;
      this.stockImage = false;
    }
    if(this.newItem || this.currentUser.role == 'admin'){
      this.permission = false;
    }
  }

  async uploadImage(){
    await photoService.takePhoto();
    this.stockImage = false;
    this.item.item_image = photoService.photoState.photos[0].data;
  }

  addItem(ev) {
      if(!dataBaseAPI.checkItem(this.item.name.toLowerCase()) && this.item.name != ""){
        dataBaseAPI.newItem(this.item);
        ev.preventDefault();
      } else {
        alert('Item name already exists');
      }
  }

  updateItem(ev) {
    if(this.currentUser.role == 'admin'){
      dataBaseAPI.updateItem(this.item);
      this.$router.push('/inventory');
    }
  }
}
</script>
