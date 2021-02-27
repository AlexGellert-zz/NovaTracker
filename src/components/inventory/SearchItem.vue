<style scoped>
.centerMain {
  margin-top: 0px !important;
  padding: 5px;
  padding-top: 20px;
}

.layout-body-background{
  padding: 0px !important;
}

h4{
    text-align: left;
}

.singleLine{
  margin-left: 3px;
  margin-bottom: 10%;
  width: 98%;
  height: 1px;
  background: white;
}

.bcode{
  margin-top: -5px;
  width: 75px;
}

.magnify{
    width: 64px;
    fill: white;
}

.innerText{
    margin: auto;
}

a{
    text-decoration: none;
}

.itemchoice {
  display: flex;
  border-radius: 50px;
  margin: 25px 14px;
  padding: 8px 30px 9px 23px;
  overflow: hidden;
  height: 80px;
  width: 90%;
  font-size: 30px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.input-search{
  outline: none;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 16px;
}

.searchForm{
  display: inline-grid;
  margin-top: 40%;
}

.m-search{
    border-radius: 8px;
    margin: auto;
    margin-top: 25px;
    padding: 8px 30px 9px 23px;
    overflow: hidden;
    height: 40px;
    width: 150px;
    font-size: 20px;
}

.error{
  font-size: 16px;
  font-weight: bold;
  color: red;
}
</style>

<template>
  <ion-page>
    <div class="centerMain" v-if="!itemsFound">
        <h4 class="header">Item Search</h4>
        <div class="singleLine"></div>
        <div class="error" v-if="notFound">Nothing Found!</div>
        <form class="searchForm">
          <input type="text" class="searchTerm input-search" placeholder="Search for an item" v-model="searchTerm" />
          <button class="m-search m-button m-button-list " type="submit" @click="search($event)">Search</button>
        </form>
    </div>
    <div class="centerMain" v-if="itemsFound">
      <inventory :displayInventory="itemList" :expanded="true" />
    </div>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { novaItem } from "@/types/index";
import Inventory from "./Inventory.vue";

@Component({
  components: {
    Inventory
  }
})
export default class SearchItem extends Vue {
  searchTerm: string = "";
  private itemList: novaItem[];
  private itemsFound: boolean = false;
  private notFound: boolean = false;
  constructor() {
    super();
  }

  async search(ev) {
    ev.preventDefault();
    await dataBaseAPI.findItems(this.searchTerm.toLowerCase()).then(res => {
      if(res.data){
        this.itemList = res.data;
        this.itemsFound = true;
        let panelState = dataBaseAPI.getPanel();
        if(!panelState){
          dataBaseAPI.togglePanel();
        }
      } else {
        this.notFound = true;
      }
    });
  }
}
</script>
