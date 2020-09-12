<style scoped>
.centerMain{
    margin-top: 250px;
}
</style>

<template>
  <div class="centerMain">
      <form @submit="search()">
        <input type="text" name="searchTerm" id="searchTerm" placeholder="Search for an item" v-model="searchTerm" />
        <input type="submit" value="Search" />
      </form>
      <ion-button>Scan Barcode</ion-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { photoService } from "./../services/PhotoService";

@Component
export default class QuickEdit extends Vue {
    searchTerm: string = "";
    constructor() {
        super();
    }

    search(){
        console.log("Searching...");
    }
}
</script>
