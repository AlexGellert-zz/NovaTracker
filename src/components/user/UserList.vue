<style scoped>
@import "./../../styles/grid.less";

ion-col{
  border: 1px solid grey;
}

.newUser{
  float: right;
}

</style>

<template>
  <ion-page>
    <router-link to="/newUser"><ion-button class="newUser">Add User</ion-button></router-link>
    <ion-grid>
      <ion-row>
        <ion-col>User List</ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="six">name</ion-col>
        <ion-col>Edit</ion-col>
        <ion-col>Delete</ion-col>
      </ion-row>
      <ion-row v-for="(user, index) in userList" :key="index">
        <ion-col class="six">{{user.name}}</ion-col>
        <ion-col><router-link :to="{path: `/userList/${user.id}`, params:{user: user.id}}"><ion-button>Edit</ion-button></router-link></ion-col>
        <ion-col><fa-icon class="delete" icon="times-circle" @click="deleteUser(user.id)" /></ion-col>
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

  async created(){
    this.userList = await dataBaseAPI.readUsers();
  }

  async deleteUser(id){
    var user = await dataBaseAPI.findUser(id);
    console.log(user);
    dataBaseAPI.deleteUser(user);
    console.log(user);
  }
}
</script>
