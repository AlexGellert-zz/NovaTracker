<style scoped>
@import './../../styles/themes.less';

.layout-body-background {
  margin-top: 0px !important;
  padding: 5px;
  padding-top: 20px;
}

h4{
    text-align: left;
}

.singleLine{
    margin-left: 4px;
    margin-bottom: 4%;
    width: 97%;
    height: 1px;
    background: white;
}

.item-input{
  outline: none;
  border: none;
  border-radius: 0px 15px 15px 0px;
    padding: 12px;
font-size: 17px;
}

.stockImage{
    border-radius: 20px !important;
    margin-bottom: -5px;
    margin-top: -5px;
    width: 250px;
    height: 175px;
}
.item-md {
  background: var(--layout-body-background) !important;
  padding-left: 0px;
  justify-content: center;
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.pencil{
  background: white;
  padding: 4px;
  border: none;
  fill: black;
  height: 46px;
  width: 46px;
  border-radius: 15px 0px 0px 15px;
  text-align: center;
}

.m-button-delete{
  background: var(--button-delete);
}

.m-button{
    border-radius: 8px;
    margin: 0px 10px;
    padding: 8px 28px 9px 21px;
    overflow: hidden;
    height: 45px;
    width: 38%;
    font-size: 18px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.centerButton{
  display: block;
  margin: auto;
}

.item-h2{
  padding-top: 40px;
  font-size: 25px;
}

.label-quantity{
    background: white;
    margin: 10px 0px;
    font-size: 20px;
    padding: 8px 14px;
    border-radius: 12px;
}

#moveBtn{
  float: right;
}

.container-quantity{
  margin: 10px 0px;
}

.quantity{
  cursor: pointer;
  background: var(--quantity-background);
    border-radius: 50%;
    padding: 12px;
    margin: auto 35px;
    fill: var(--nav-fill);
    height: 50px;
    width: 50px
}

.item-button{
    height: 40px;
    width: 36%;
    font-size: 16px;
    font-weight: bold;
}

.error{
  font-size: 16px;
  color: red;
  margin-bottom: 10px;
  font-weight: bold;
}
.error-message{
  justify-content: center;
  display: flex;
}
</style>

<template>
  <ion-page class="layout-body-background">
      <h4 class="header" v-if="!newItem">Edit Inventory</h4>
      <h4 class="header" v-if="newItem">New Item</h4>
      <div class="singleLine"></div>

    <!-- Member Update Item -->
    <div class="item-form" v-if="permission">
      <div class="item-md">
        <h2 class="item-h2">{{item.name}}</h2>
      </div>
      <div class="item-md">
        <img class="stockImage" v-if="stockImage || item.item_image == ''" src="@/assets/husky.png" alt="Picture of a husky." width="250px" @click="uploadImage()"/>
        <img class="stockImage" v-if="!stockImage && item.item_image != ''" :src="item.item_image" @click="uploadImage()"  width="250px" />
      </div>
      <div class="item-md container-quantity">
        <div class="quantity" @click="subtract()"><svg-icon name="subtract" ></svg-icon></div>
        <label class="label-quantity">{{('000' + item.item_quantity).substr(-3)}}</label>
        <div class="quantity" @click="add()"><svg-icon name="add-circle"></svg-icon></div>
      </div>
      <button class="m-button m-button-list centerButton" @click="updateItem($event)" v-if="!newItem">Update Item</button>
    </div>

    <!-- Admin & Create Item Form -->
    <form class="item-form" v-if="!permission">
      <div class="item-md">
        <svg-icon class="pencil" name="pencil"></svg-icon>
        <input class="item-input" type="text" v-model="item.name" placeholder="Item Name" required />
      </div>

      <div class="item-md">
        <img class="stockImage" v-if="stockImage || item.item_image == ''" src="@/assets/husky.png" alt="Picture of a husky." width="250px" @click="uploadImage()"/>
        <img class="stockImage" v-if="!stockImage && item.item_image != ''" :src="item.item_image" @click="uploadImage()"  width="250px" />
      </div>

      <div class="item-md">
        <svg-icon class="pencil" name="pencil"></svg-icon>
        <input class="item-input" type="text" placeholder="Item Description" v-model="item.item_description" required />
      </div>

      <div class="item-md">
        <svg-icon class="pencil" name="pencil"></svg-icon>
        <input class="item-input" type="number" placeholder="Item Quantity 000" v-model="item.item_quantity" required />
      </div>

      <div class="item-md">
        <svg-icon class="pencil" name="pencil"></svg-icon>
        <input style="color: red; font-weight: bold; font-size: 16.5px;" class="item-input" type="number" placeholder="Low Stock 000" v-model="item.low_stock" required />
      </div>

      <div class="error" v-if="blankCheck.length > 0">
        <div class="error-message" v-for="item in blankCheck" :key="item">
            {{ item }} is empty.
        </div>
      </div>

        <button class="m-button m-button-list centerButton" style="font-size: 24px;" @click="addItem($event)" v-if="newItem">Create</button>
        <button class="m-button m-button-list item-button" @click="updateItem($event)" v-if="!newItem">Update Item</button>
        <button class="m-button m-button-delete item-button" id="moveBtn" @click="deleteItem($event)" v-if="!newItem">Delete Item</button>
    </form>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { photoService } from "@/services/PhotoService"
import { novaItem, novaUser } from "@/types/index";
import SvgIcon from "@/components/shared/svg/svg.vue"

@Component({
  components: {
    SvgIcon
  }
})
export default class Inventory extends Vue {
  item: any = {name: "", item_description: "" , item_quantity: "", low_stock: "", item_image: new Blob()};
  newItem: boolean = true;
  stockImage: boolean = true;
  newImage: any = {};
  permission: boolean = true;
  blankCheck: String[] = [];
  currentUser: novaUser = dataBaseAPI.getCurrentUser();

  constructor() {
    super();
  }

  async created(){
    setTimeout(() => {this.$forceUpdate}, 1000);
    if(this.$route.params.id != undefined){
      this.item = await dataBaseAPI.findItem(this.$route.params.id);
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

  add(){
    if(this.item.item_quantity < 999){
      this.item.item_quantity++;
    }
  }

  subtract(){
    if(this.item.item_quantity > 0){
      this.item.item_quantity--;
    }
  }

  addItem(ev) {
    ev.preventDefault();
    let newItem = dataBaseAPI.checkItemName(this.item.name);
    this.blankCheck = [];
    Object.keys(this.item).forEach(e => this.item[e] ? '' : this.blankCheck.push(e));
    if(newItem && this.blankCheck.length === 0 ){
      dataBaseAPI.newItem(this.item);
      setTimeout(() => {this.$router.push('/inventory')}, 1000);
    } else if(!newItem && this.blankCheck) {
    } else {
      alert('Item name already exists');
    }
  }

  deleteItem(ev){
    ev.preventDefault();
    dataBaseAPI.deleteItem(this.item.id);
    this.$router.push('/inventory');
  }

  updateItem(ev) {
      ev.preventDefault();
      dataBaseAPI.updateItem(this.item);
      setTimeout(() => {this.$router.push('/inventory')}, 1000);
  }
}
</script>
