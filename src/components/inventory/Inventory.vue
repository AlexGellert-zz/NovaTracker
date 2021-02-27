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
    display: flex;
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
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
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
  padding: 6px 8px;
  border-radius: 6px;
  font-weight: bold;
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
    color: var(--nav-fill);
    margin-left: 15px;
    padding-top: 5px;
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
    grid-template-columns: 50% 20% 30%;
    border-bottom: 1px solid #8B8B8B;
    padding-bottom: 4px;
    padding-top: 16px;
    width: 88%;
}

.arrow{
    margin-left: auto;
    height: 20px;
    width: 14px;
    margin-top: -6px;
}
.arrow-down{
    margin-left: auto;
    height: 20px;
    width: 20px;
    margin-top: -7px;
}

</style>

<template>
  <ion-page class="layout-body-background">
    <h4 class="header">Check Inventory</h4>
    <div class="singleLine"></div>
      <button class="accordion" @click="toggle()">Category 1<svg-icon class="arrow" name="left" v-if="!panel1"></svg-icon><svg-icon class="arrow-down" name="down" v-if="panel1"></svg-icon></button>
      <div v-if="panel1" class="accordion-background container-background">
        <div class="accordion-background list-item container" v-for="(item, index) in inventory" :key="index">
          <label class="label-inner">{{item.name}}</label>
          <label class="counter">{{('000' + item.item_quantity).substr(-3)}}</label>
          <router-link :to="{path: `/inventory/${item.id}`, params:{id: item.id}}"><button class="m-button m-button-edit">Edit / Delete</button></router-link>
        </div>
     </div>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { novaItem } from "@/types/index";
import SvgIcon from "@/components/shared/svg/svg.vue"

@Component({
  components: {
    SvgIcon
  }
})
export default class Inventory extends Vue {
  @Prop() displayInventory: novaItem[];
  inventory: novaItem[] = [];
  panel1 = dataBaseAPI.state.panel1;
  constructor() {
    super();
  }

  toggle(){
    dataBaseAPI.togglePanel();
    this.panel1 = dataBaseAPI.state.panel1;
  }

  async mounted(){
    setTimeout(() => {this.$forceUpdate}, 2000);
    if(this.displayInventory){
      this.inventory = this.displayInventory
    } else {
      this.inventory = await dataBaseAPI.readInventory();
    }
  }
}
</script>
