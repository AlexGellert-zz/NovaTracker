<style scoped>
@import './../../styles/main.less';

.loginIcon{
  margin: auto;
  height: 210px;
  width: 250px;
}

.centerMain{
    text-align: center;
    padding-top: 150px !important;
    height: 100%;
    background: var(--layout-login-background);
}

.m-button{
    border-radius: 8px;
    margin: 8px 2px;
    padding: 8px 40px 20px 40px;
    overflow: hidden;
    height: 55px;
    font-size: 35px;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
}

</style>

<template>
  <ion-page>
    <div class="centerMain">
      <svg-icon v-if="isClicked" class="loginIcon" name="giftBox"></svg-icon>
      <button class="m-button m-button-login" v-if="isClicked" @click="isClicked = !isClicked">Login</button>
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
import SvgIcon from "@/components/shared/svg/svg.vue";

@Component({
  components: {
    SvgIcon
  }
})
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
