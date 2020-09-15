<style scoped>
.centerMain{
  margin-top: 250px !important;
}
</style>

<template>
  <ion-page>
    <div class="centerMain">
      <ion-button class="login" v-if="isClicked" @click="isClicked = !isClicked">Login</ion-button>
      <form class="form" v-if="!isClicked" @submit="login()">
          <input type="text" name="name" id="name" placeholder="name" v-model="name"/>
          <input type="password" name="password" id="password" placeholder="Password" v-model="password"/>
          <input type="submit" value="Submit" />
      </form>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    isClicked: boolean = true;
    name: string = "";
    password: string = "";
  constructor() {
    super();
  }

  login(){
      console.log("logging in");
  }
}
</script>
