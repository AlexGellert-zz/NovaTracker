<style scoped>
ion-row.hydrated {
  justify-content: center;
}

.avatar-md {
  width: 200px;
  height: 200px;
}

.role{
    color: black;
}

h1{
    text-align: center;
}

.newUser{
    float: right;
}

</style>

<template>
  <ion-page>
      <h1>New User</h1>
    <form @submit="addUser()">
      <ion-avatar>
        <img src="@/assets/husky.png" alt="Picture of a husky." width="400px" />
      </ion-avatar>

      <ion-item>
        <ion-label position="floating">Username</ion-label>
        <ion-input type="custom" name="username" id="username" v-model="user.username" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input type="password" name="password" id="password" v-model="user.password" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input type="text" name="email" id="email" v-model="user.email" required />
      </ion-item>

      <ion-item>
        <ion-label class="role">Role</ion-label>
        <ion-select placeholder="Select One" v-model="user.role">
          <ion-select-option value="member">Member</ion-select-option>
          <ion-select-option value="admin">Admin</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label position="fixed">Alerts</ion-label>
        <ion-segment @ionChange="segmentChanged($event)">
          <ion-segment-button value="1">
            <ion-label>Yes</ion-label>
          </ion-segment-button>
          <ion-segment-button value="0">
            <ion-label>No</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-item>
          <ion-button class="newUser" type="submit">Create New User</ion-button>
    </form>

  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { novaUser } from "@/types/index";
let regex = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$");

@Component
export default class NewUser extends Vue {
  user: novaUser = {
    username: "",
    password: "",
    email: "",
    alerts: 0,
    role: "",
  };
  constructor() {
    super();
  }

  segmentChanged(ev) {
    this.user.alerts = ev.detail.value;
  }

  addUser() {
      if(!regex.test(this.user.email)){
          alert("Please enter a valid email");
      }
    console.log(this.user);
  }
}
</script>
