<style scoped>
@import "./../../styles/main.less";

.loginIcon {
  margin: auto;
  height: 210px;
  width: 250px;
}

.centerMain {
  text-align: center;
  padding-top: 150px !important;
  padding-bottom: 100%;
  height: 100%;
  background: var(--layout-login-background);
}

.form {
  display: inline-grid;
  padding-top: 30px;
}

.input-login {
  outline: none;
  border: none;
  border-radius: 0px 15px 15px 0px;
  padding: 10px;
  font-size: 18px;
}

.user {
  background: white;
  padding: 4px;
  border: none;
  fill: black;
  height: 41px;
  width: 41px;
  border-radius: 15px 0px 0px 15px;
  text-align: center;
}

.lock {
  background: white;
  padding: 4px;
  border: none;
  fill: black;
  height: 41px;
  width: 41px;
  border-radius: 15px 0px 0px 15px;
  text-align: center;
}

.input-container {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.m-button {
  border-radius: 8px;
  margin: 25px 14px;
  padding: 8px 30px 9px 23px;
  overflow: hidden;
  height: 50px;
  width: 90%;
  font-size: 35px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>

<template>
  <ion-page>
    <div class="centerMain">
      <svg-icon v-if="isClicked" class="loginIcon" name="giftBox"></svg-icon>
      <button class="m-button m-button-login" v-if="isClicked" @click="isClicked = !isClicked">Login</button>
      <form class="form" v-if="!isClicked">
        <div class="input-container">
          <svg-icon class="user" name="user"></svg-icon>
          <input
            class="input-login"
            type="text"
            username="username"
            id="username"
            placeholder="Username"
            v-model="username"
          />
        </div>
        <div class="input-container">
          <svg-icon class="lock" name="lock"></svg-icon>
          <input
            class="input-login"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <button class="m-button m-button-login" type="submit" @click="login($event)">Submit</button>
      </form>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import SvgIcon from "@/components/shared/svg/svg.vue";

@Component({
  components: {
    SvgIcon,
  },
})
export default class Login extends Vue {
  isClicked: boolean = true;
  username: string = "";
  password: string = "";
  constructor() {
    super();
  }

  async login(ev) {
    ev.preventDefault();
    let checkLogin = await dataBaseAPI.login(
      this.username.toLowerCase(),
      this.password
    );
    console.log("checkLogin " + checkLogin);
    if (checkLogin) {
      this.$emit("success");
    } else {
      alert("Invalid username and password");
    }
  }
}
</script>
