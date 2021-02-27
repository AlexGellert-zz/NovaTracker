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
    width: 95.5%;
    height: 1px;
    background: white;
}

.user-item{
    background: var(--user-list);
    color: var(--layout-body-color);
    border-radius: 6px;
    height: 54px;
    margin: 4px 20px;
    font-size: 20px;
    padding: 14px;
    display: grid;
    grid-template-columns: 65% 25%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.delete{
  background: red;
}

.m-button{
  border-radius: 8px;
  margin: 12px 14px;
  overflow: hidden;
  height: 50px;
  width: 90%;
  font-size: 35px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.m-button-edit-user{
    padding: 6px 16px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
}

.newUser{
  justify-content: center;
  display: flex;
  text-decoration: none;
}

.edit{
  margin-right: 10px;
}

.editDelete{
  float: right;
}

.label-inner{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
  display: block;
}

.user-container{
  overflow-x: auto;
  height: 64%;
}
</style>

<template>
  <ion-page class="layout-body-background">
    <h4 class="header">User List</h4>
    <div class="singleLine"></div>
    <router-link class="newUser" to="/newUser"><button class="m-button m-button-list">New User</button></router-link>
    <div class="user-container">
    <div class="user-item m-button-list" v-for="(user, index) in userList" :key="index">
      <label class="label-inner">{{user.name}}</label>
        <div class="editDelete">
        <router-link :to="{path: `/userList/${user.id}`, params:{id: user.id}}"><button class="m-button-edit-user edit">Edit / Delete</button></router-link>
        </div>
    </div>
    </div>
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

  async mounted(){
    setTimeout(() => {this.$forceUpdate}, 3000);
    this.userList = await dataBaseAPI.readUsers().then();
  }
}
</script>
