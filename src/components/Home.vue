<style scoped>
@import './../styles/home.less';
@import './../styles/themes.less';

.homeBtn{
    border-radius: 8px;
    overflow: hidden;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
}

.administration{
  padding-top: 15px;
}

.singleLine{
  margin-left: 3px;
  margin-bottom: 10px;
  width: 98%;
  height: 1px;
  background: white;
}

.hButton{
  margin-bottom: 10px;
}

svg.checkSquare{
  color: var(--button-background);
  background: var(--button-icon-color);
  border-radius: 20px;
  height: 100px;
  width: 100px
}

.user{
  fill: var(--button-icon-color);
  margin: auto;
  border-radius: 20px;
  height: 100px;
  width: 100px
}

.magnify{
  fill: var(--button-icon-color);
  margin: auto;
  border-radius: 20px;
  height: 100px;
  width: 100px
}
</style>

<template>
  <ion-page>
    <ion-grid>
      <h4 class="administration">Administration</h4>
      <div class="singleLine"></div>
      <ion-row>
        <ion-col>
          <router-link to="/inventory">
            <button class="homeBtn m-button m-button-secondary"><h4 class="hButton">Inventory</h4><div><fa-icon class="checkSquare" icon="check-square" /></div></button>
          </router-link>
        </ion-col>
        <ion-col>
          <router-link to="/quickEdit">
            <button class="homeBtn m-button m-button-secondary"><h4 class="hButton">Quick Edit</h4><div><svg-icon class="magnify" name="magnify" /></div></button>
          </router-link>
        </ion-col>
        <ion-col>
          <router-link to="/newItem">
            <button class="homeBtn m-button m-button-secondary"><h4 class="hButton">New Item</h4><div><svg-icon class="magnify" name="add-circle" /></div></button>
          </router-link>
        </ion-col>
      </ion-row>
      <ion-row v-if="isAdmin">
        <ion-col>
          <router-link to="/userList">
            <button class="homeBtn m-button m-button-secondary"><h4 class="hButton">Edit Users</h4><div><svg-icon class="user" name="user" /></div></button>
          </router-link>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CameraComponent from "./shared/CameraComponent.vue";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { novaUser } from "@/types/index"
import SvgIcon from "./shared/svg/svg.vue";

@Component({
  components: {
    CameraComponent,
    SvgIcon
  },
})
export default class Home extends Vue {
  isAdmin: boolean = false;
  currentUser: novaUser = dataBaseAPI.getCurrentUser();
  constructor() {
    super();
  }
  
  created(){
    if(this.currentUser.role == 'admin'){
      this.isAdmin = true;
    }
  }
}
</script>
