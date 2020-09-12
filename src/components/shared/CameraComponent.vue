<style scoped>
</style>

<template>
  <div>
    <ion-button @click="camera()">Take Picture</ion-button>
    <ion-grid>
      <ion-row>
        <ion-col size="6" v-for="(photo, index) in photoList" :key="index">
          <ion-img :src="photo.webviewPath"></ion-img>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Plugins, CameraSource, CameraResultType } from "@capacitor/core";
import { photoService } from "./../../services/PhotoService";
import { Photo } from "@/types/index"
const { Camera } = Plugins;

@Component
export default class CameraComponent extends Vue {
  photoList: Photo[] = photoService.photoState.photos;
  constructor() {
    super();
  }

  camera() {
    photoService.takePhoto();
  }
}
</script>
