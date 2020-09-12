<style scoped>
.loginMain{
    text-align: center;
    margin-top: 350px;
}
</style>

<template>
  <div class="loginMain">
      <ion-button class="login" v-if="isClicked" @click="isClicked = !isClicked">Login</ion-button>
      <form class="form" v-if="!isClicked" @submit="login()">
          <input type="text" name="username" id="username" placeholder="Username" v-model="username"/>
          <input type="password" name="password" id="password" placeholder="Password" v-model="password"/>
          <input type="submit" value="Submit" />
      </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    isClicked: boolean = true;
    username: string = "";
    password: string = "";
  constructor() {
    super();
  }

  login(){

  }
}
</script>
