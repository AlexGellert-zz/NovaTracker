<style scoped>
ion-col {
  border: 1px solid grey;
  text-align: center;
}
</style>

<template>
  <ion-page>
      UserList
        <ion-grid>
          <ion-row>
            <ion-col>
              User List
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="6">
              1
            </ion-col>
            <ion-col>
              2
            </ion-col>
            <ion-col>
              3
            </ion-col>
          </ion-row>
        </ion-grid>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { novaUser } from "@/types/index";

@Component
export default class UserList extends Vue {
  userList: novaUser[] = [];
  constructor() {
    super();
    
  }

  async beforeCreate(){
    await dataBaseAPI.readUsers();
    this.userList = dataBaseAPI.state.userList;
  }

}
</script>
