<style scoped>
.centerMain {
  margin-top: 0px !important;
  padding: 5px;
  padding-top: 20px;
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
  font-size: 18px;
}

.searchForm{
  display: inline-grid;
  margin-top: 40%;
}

.m-search{
  border-radius: 8px;
  margin: 25px 14px;
  padding: 8px 30px 9px 23px;
  overflow: hidden;
  height: 50px;
  width: 90%;
  font-size: 35px;
}
</style>

<template>
  <ion-page>
    <div class="centerMain">
      <div v-if="!findItem">
        <h4 class="header">Search Inventory</h4>
        <div class="singleLine"></div>
          <button class="itemchoice m-button m-button-secondary" @click="findItem = true"><svg-icon class="magnify" name="magnify"></svg-icon><div class="innerText">Search Inventory</div></button>
          <router-link to="/barCodeScanner">
            <button class="itemchoice m-button m-button-secondary"><svg-icon class="bcode" name="bcode"></svg-icon><div class="innerText">Scan Barcode</div></button>
          </router-link>
      </div>
      <div v-if="findItem">
        <h4 class="header">Item Search</h4>
        <div class="singleLine"></div>
        <form class="searchForm">
          <input type="text" class="searchTerm input-search" placeholder="Search for an item" v-model="searchTerm" />
          <button class="m-search m-button m-button-list " type="submit" @click="search($event)">Search</button>
        </form>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { photoService } from "@/services/PhotoService";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import SvgIcon from "@/components/shared/svg/svg.vue";

@Component({
  components: {
    SvgIcon,
  },
})
export default class QuickEdit extends Vue {
  searchTerm: string = "";
  findItem: boolean = false; //Change to false after editing
  constructor() {
    super();
  }

  async search(ev) {
    ev.preventDefault();
    let item = await dataBaseAPI.findItemName(this.searchTerm.toLowerCase());
    setTimeout(() => {
      this.$router.push({
        name: "Item",
        params: { id: item.id },
      });
    }, 1000);
  }
}
</script>
