<style scoped>
ion-row.hydrated {
  justify-content: center;
}
</style>

<template>
  <ion-page>
      <ion-grid>
            <ion-row>
                <img src="@/assets/husky.png" alt="Picture of a husky." width="400px" />
            </ion-row>
            <ion-row>
                <h3>{{user.username}}</h3>
            </ion-row>
            <ion-row>
                <ion-button>{{user.password}}</ion-button>
            </ion-row>
            <ion-row>
                <ion-button>{{user.role}}</ion-button>
            </ion-row>
            <ion-row>
                <!-- Add Modal for every Edit -->
                <ion-button>{{user.email}}</ion-button>
            </ion-row>
              <ion-row>
                <ion-button>{{user.alerts}}</ion-button>
            </ion-row>
            <ion-row>
                <ion-button @click="save()">Save</ion-button>
            </ion-row>
        </ion-grid>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import { novaUser } from "@/types/index"

@Component
export default class UserDisplay extends Vue {
    user: any;
  constructor() {
    super();
  }
  
  created(){
    this.user = dataBaseAPI.getUser(this.$route.params.user);
  }

  save(){
    this.$router.push("/userList");
  }
}
</script>
