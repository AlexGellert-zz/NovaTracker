<style scoped>
.centerMain{
    margin-top: 250px !important;
}
</style>

<template>
  <ion-page>
      <div class="centerMain">
            <form @submit="search()">
                <input type="text" name="searchTerm" id="searchTerm" placeholder="Search for an item" v-model="searchTerm" />
                <input type="submit" value="Search" @click="search($event)" />
            </form>
        <router-link to="/barCodeScanner">
            <ion-button >Scan Barcode</ion-button>
        </router-link>
      </div>
  </ion-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { photoService } from "@/services/PhotoService";
import { dataBaseAPI } from "@/services/dataBaseAPI";

@Component
export default class QuickEdit extends Vue {
    searchTerm: string = "";
    constructor() {
        super();
    }

    async search(ev){
        ev.preventDefault();
        let item = await dataBaseAPI.findItemName(this.searchTerm.toLowerCase())
        setTimeout(() => {this.$router.push({
            name: 'Item',
            params: { id: item.id }
        })}, 1000);
        
    }
}
</script>
