<style scoped>
@import './../../styles/themes.less';

.layout-body-background {
  margin-top: 0px !important;
  padding: 5px;
  padding-top: 20px;
}

.header{
  padding-top: 4px;
  margin-left: 8px;
}

h4{
    text-align: left;
}

.singleLine{
    margin-left: 8px;
    margin-bottom: 4%;
    width: 95.5%;
    height: 1px;
    background: white;
}

/** Accordian CSS **/
.accordion {
    background-color: var(--button-background);
    color: var(--nav-fill);
    justify-content: center;
    display: block;
    cursor: pointer;
    margin: auto;
    width: 90%;
    padding: 18px;
    border: none;
    text-align: left;
    outline: none;
    font-size: 24px;
    font-weight: bold;
    transition: 0.4s;
    border-radius: 8px;
}

.list-item{
  display: flex;
  overflow: hidden;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.m-button-edit{
  background-color: var(--button-edit);
    padding: 6px;
    border-radius: 6px;
}

.item-details{
  float: right;
}

.label-inner{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  font-size: 16px;
  padding-top: 3px;
}

.counter{
    color: white;
    margin-left: 30px;
    padding-top: 3px;
}

.container-background{
  display: block;
  margin: auto;
  width: 90%;
  margin-top: -9px;
  padding-bottom: 20px;
  border-radius: 0px 0px 15px 15px;
}
.container{
    height: 100%;
    display: grid;
    grid-template-columns: 50% 25% 25%;
    border-bottom: 1px solid #8B8B8B;
    padding-bottom: 4px;
    padding-top: 16px;
    width: 88%;
}

</style>

<template>
  <ion-page class="layout-body-background">
    <h4 class="header">Check Inventory</h4>
    <div class="singleLine"></div>
      <button class="accordion" @click="panel1 = !panel1">Category 1</button>
      <div v-if="panel1" class="accordion-background container-background">
        <div class="accordion-background list-item container" v-for="(item, index) in inventory" :key="index">
          <label class="label-inner">{{item.name}}</label>
          <label class="counter">{{('000' + item.item_quantity).substr(-3)}}</label>
          <router-link :to="{path: `/inventory/${item.id}`, params:{id: item.id}}"><button class="m-button m-button-edit">Edit/Delete</button></router-link>
        </div>
     </div>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { novaItem } from "@/types/index";

@Component
export default class Inventory extends Vue {
  inventory: novaItem[] = [];
  panel1 = false;
  constructor() {
    super();
  }

  async mounted(){
    setTimeout(() => {this.$forceUpdate}, 2000);
    this.inventory = await dataBaseAPI.readInventory();
  }
}
</script>
