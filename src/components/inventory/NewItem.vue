<style scoped>
ion-row.hydrated {
  justify-content: center;
}

.missingImg{
  margin: 10px;
  border: dotted;
  border-radius: 6px;
  width: 400px;
  height: 400px;
}

.photoTaken{
  margin: 10px;
  border: solid;
  border-radius: 6px;
  width: 400px;
}

.missingImg img{
  display: block;
  margin: auto;
  margin-top: 90px;
  cursor: pointer;
}
</style>

<template>
  <ion-page>
      <ion-grid>
        <form>
            <ion-row>
              <div class="missingImg" v-if="itemImage == ''" @click="addImage()">
                <img src="@/assets/addPhoto.png" alt="Picture of a husky." width="200px" />
              </div>
              <ion-img class="photoTaken" v-if="!itemImage == ''" :src="itemImage.webviewPath"></ion-img>
            </ion-row>
            <ion-row>
                <input type="text" v-model="itemName" id="itemName" placeholder="Item Name" />
            </ion-row>
            <ion-row>
                <input type="text" v-model="itemDescription" id="itemDescription" placeholder="Item Description" />
            </ion-row>
            <ion-row>
                <input type="number" v-model="itemQuantity" id="itemQuantity" placeholder="itemQuantity" />
            </ion-row>
            <ion-row>
                <input type="submit" value="Add New Item" />
            </ion-row>
          </form>
        </ion-grid>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { photoService } from "@/services/PhotoService";
import { Photo } from "@/types/index";

@Component
export default class NewItem extends Vue {
  itemName: string = "";
  itemDescription: string = "";
  itemQuantity: string = "";
  itemImage: any = "";
  photoList: Photo[] = photoService.photoState.photos;

  constructor() {
    super();
  }
  
  async addImage(){
    await photoService.takePhoto();
    this.itemImage = photoService.photoState.photos[0];
    console.log("Item Image" + this.itemImage);
  }

  submit(){

  }
}
</script>
