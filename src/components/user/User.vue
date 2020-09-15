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
    <form>
      <ion-avatar>
        <img src="@/assets/husky.png" alt="Picture of a husky." width="400px" />
      </ion-avatar>

      <ion-item>
        <ion-label position="floating" v-if="newUser">name</ion-label>
        <ion-label position="floating" v-if="!newUser">{{user.name}}</ion-label>
        <ion-input type="custom" name="name" id="name" v-model="user.name" @ionChange="user.name = $event.target.value" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating" v-if="newUser">Password</ion-label>
        <ion-label position="floating" v-if="!newUser">{{user.password}}</ion-label>
        <ion-input type="password" name="password" id="password" v-model="user.password" @ionChange="user.password = $event.target.value" required />
      </ion-item>

      <ion-item>
        <ion-label position="floating" v-if="newUser">Email</ion-label>
        <ion-label position="floating" v-if="!newUser">{{user.email}}</ion-label>
        <ion-input type="text" name="email" id="email" v-model="user.email" @ionChange="user.email = $event.target.value" required />
      </ion-item>

      <ion-item>
        <ion-label class="role">Role</ion-label>
        <ion-select placeholder="Select One" :value="user.role" @ionChange="user.role = $event.target.value">
          <ion-select-option value="member">Member</ion-select-option>
          <ion-select-option value="admin">Admin</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label position="fixed">Alerts</ion-label>
        <ion-segment @ionChange="user.alerts = $event.target.value" :value="user.alerts">
          <ion-segment-button value="1">
            <ion-label>Yes</ion-label>
          </ion-segment-button>
          <ion-segment-button value="0">
            <ion-label>No</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-item>
        <ion-button class="newUser" type="submit" @click="addUser($event)" v-if="newUser">Create New User</ion-button>
        <ion-button class="newUser" type="submit" @click="updateUser($event)" v-if="!newUser">Update User</ion-button>
    </form>

  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { novaUser } from "@/types/index";

@Component
export default class NewUser extends Vue {
  user: novaUser = {name: "", password: "" , email: "", alerts: 0, role: ""};
  newUser: boolean = true;

  constructor() {
    super();
  }

  created(){
    if(this.$route.params.user != undefined){
      console.log("router param" + this.$route.params.user);
      this.user = dataBaseAPI.getUser(this.$route.params.user);
      this.newUser = false;
    }
  }

  addUser(ev) {
    if(this.user.role == ""){
        ev.preventDefault();
        alert("Please choose a role");
    } else if(!dataBaseAPI.checkUser(this.user.name.toLowerCase())) {
      dataBaseAPI.newUser(this.user);
      alert("User " + this.user.name + " has been created.");
    } else {
      alert('Username already exists');
    }
  }

  updateUser(ev) {
    if(this.user.role == ""){
        ev.preventDefault();
        alert("Please choose a role");
    } else {
      dataBaseAPI.updateUser(this.user);
      alert("User " + this.user.name + " has been updated.")
    }
  }
}
</script>
