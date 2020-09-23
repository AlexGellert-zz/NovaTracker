<style scoped>
@import './../../styles/themes.less';

.avatar-md{
    border-radius: 50%;
    width: 150px;
    height: 150px;
    margin: 4%;
    margin-left: 40px;
}

.layout-body-background {
  margin-top: 0px !important;
  padding: 5px;
  padding-top: 20px;
}

h4{
    text-align: left;
}

.singleLine{
    margin-left: 4px;
    margin-bottom: 4%;
    width: 97%;
    height: 1px;
    background: white;
}

.item-input{
  outline: none;
  border: none;
  border-radius: 0px 15px 15px 0px;
    padding: 12px;
    font-size: 19px;
}

.item-md{
  background: var(--layout-body-background) !important;
}

.item-md {
  padding-left: 0px;
  justify-content: center;
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.pencil{
  background: white;
  padding: 4px;
  border: none;
  fill: black;
  height: 46px;
  width: 46px;
  border-radius: 15px 0px 0px 15px;
  text-align: center;
}

.m-button{
    border-radius: 8px;
    margin: auto;
    overflow: hidden;
    height: 34px;
    width: 32%;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.ion-item{
  width: 311px;
  margin: auto;
}

.item-md.item-interactive{
  border-radius: 15px !important;
}

.bottom-buttons{
  margin: 0px 15px;
  margin-top: 15px;
  display: flex;
}

.m-button-off{
  color: #565655;
}

.trash{
    fill: var(--button-delete);
    height: 4em;
    width: 4em;
    margin-top: 20px;
    margin-left: auto;
    margin-right: 50px;
}

.m-button-login:focus{
  outline: none;
  box-shadow: none;
}

.top-image{
  display: flex;
}
</style>

<template>
  <ion-page class="layout-body-background">
      <h4 class="header" v-if="!newUser">User Management</h4>
      <h4 class="header" v-if="newUser">New User</h4>
      <div class="singleLine"></div>

    <!-- Admin & Create Item Form -->
    <div class="item-form">
      <div class="top-image">
      <ion-avatar>
        <img v-if="stockImage || user.user_image == ''" src="@/assets/husky.png" alt="Picture of a husky." width="400px" @click="uploadImage()"/>
        <img v-if="!stockImage && user.user_image != ''" :src="user.user_image" @click="uploadImage()"  width="400px" />
      </ion-avatar>
      <svg-icon class="trash" name="trash"></svg-icon>
      </div>
      <div class="item-md">
        <svg-icon class="pencil" name="pencil"></svg-icon>
        <input class="item-input" type="text" v-model="user.name" placeholder="Username" required />
      </div>

      <div class="item-md">
        <svg-icon class="pencil" name="pencil"></svg-icon>
        <input class="item-input" type="password" placeholder="Password" v-model="user.password" required />
      </div>

      <div class="item-md">
        <svg-icon class="pencil" name="pencil"></svg-icon>
        <input class="item-input" type="email" placeholder="Email Address" v-model="user.email" required />
      </div>

      <div class="ion-item">
      <ion-item>
        <ion-label class="role">Role</ion-label>
        <ion-select placeholder="Select One" :value="user.role" @ionChange="user.role = $event.target.value">
          <ion-select-option value="member">Member</ion-select-option>
          <ion-select-option value="admin">Admin</ion-select-option>
        </ion-select>
      </ion-item>
      </div>

      <div class="bottom-buttons">
        <button class="m-button m-button-login m-button-off" @click="user.alerts = true" v-if="!user.alerts">Alerts Off</button>
        <button class="m-button m-button-login" @click="user.alerts = false" v-if="user.alerts">Alerts On</button>
        <button class="m-button m-button-login" type="submit" @click="addUser($event)" v-if="newUser">Create User</button>
        <button class="m-button m-button-login" type="submit" @click="updateUser($event)" v-if="!newUser">Save</button>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { photoService } from "@/services/PhotoService";
import { novaUser } from "@/types/index";
import SvgIcon from "@/components/shared/svg/svg.vue";

@Component({
  components: {
    SvgIcon
  }
})
export default class NewUser extends Vue {
  user: any = {name: "", password: "" , email: "", alerts: 0, role: ""};
  newUser: boolean = true;
  stockImage = true;

  constructor() {
    super();
  }

  async created(){
    if(this.$route.params.id != undefined){
      this.user = await dataBaseAPI.findUser(this.$route.params.id);
      this.newUser = false;
      this.stockImage = false;
    }
  }

  async uploadImage(){
    await photoService.takePhoto();
    this.stockImage = false;
    this.user.user_image = photoService.photoState.photos[0].data;
  }

  async addUser(ev) {
    ev.preventDefault();
    let newUser = await dataBaseAPI.checkUser(this.user.name.toLowerCase());
    if(this.user.role == ""){
        alert("Please choose a role");
    } else if(newUser) {
      await dataBaseAPI.newUser(this.user).then((res) => {
        this.$router.push('/userList');
      });
    } else {
      alert('Username already exists');
    }
  }

  updateUser(ev) {
    ev.preventDefault();
    if(this.user.role == ""){
        alert("Please choose a role");
    } else {
      dataBaseAPI.updateUser(this.user);
      this.$router.push('/userList');
    }
  }

  async deleteUser(id){
    await dataBaseAPI.deleteUser(id).then((res) => {
      this.$router.push('/userList');
    });
  }
}
</script>
