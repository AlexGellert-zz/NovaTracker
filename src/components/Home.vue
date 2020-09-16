<style scoped>
@import './../styles/home.less';
</style>

<template>
  <ion-page>
    <ion-grid>
      <ion-row>
        <ion-col>
          <router-link to="/inventory">
            <ion-button class="homeBtn">Check Inventory</ion-button>
          </router-link>
        </ion-col>
        <ion-col>
          <router-link to="/quickEdit">
            <ion-button class="homeBtn">Quick Edit</ion-button>
          </router-link>
        </ion-col>
      </ion-row>
      <ion-row v-if="isAdmin">
        <ion-col>
          <router-link to="/userList">
            <ion-button class="homeBtn">View Users</ion-button>
          </router-link>
        </ion-col>
        <ion-col>
          <router-link to="/newItem">
            <ion-button class="homeBtn">New Item</ion-button>
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

@Component({
  components: {
    CameraComponent,
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
