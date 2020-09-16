<style scoped>
.centerMain{
  margin-top: 250px !important;
}
</style>

<template>
  <ion-page>
    <div class="centerMain">
      <ion-button class="login" v-if="isClicked" @click="isClicked = !isClicked">Login</ion-button>
      <form class="form" v-if="!isClicked">
          <input type="text" username="username" id="username" placeholder="username" v-model="username"/>
          <input type="password" name="password" id="password" placeholder="Password" v-model="password"/>
          <input type="submit" value="Submit" @click="login($event)" />
      </form>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";

@Component
export default class Login extends Vue {
    isClicked: boolean = true;
    username: string = "";
    password: string = "";
  constructor() {
    super();
  }

  async login(ev){
    ev.preventDefault();
    let checkLogin = await dataBaseAPI.login(this.username.toLowerCase(), this.password);
    console.log("checkLogin " + checkLogin);
    if(checkLogin){
      this.$emit('success');
    } else {
      alert('Invalid username and password');
    };
  }
}
</script>
