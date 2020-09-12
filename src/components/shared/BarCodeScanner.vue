<style scoped>
</style>

<template>
  <div>
    Barcode Scanner
    <ion-button @click="camera()">Smile!</ion-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Plugins, CameraSource, CameraResultType } from "@capacitor/core";
const { Camera } = Plugins;

@Component
export default class BarCodeScanner extends Vue {
  constructor() {
    super();
  }

  camera() {
    Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });
  }
}
</script>
