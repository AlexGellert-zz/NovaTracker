<style>
.video {
  width: 100%;
}

ion-spinner.spinner-md{
  display: block;
  margin-top: 250px;
  margin-left: auto;
  margin-right: auto;
  height: 100px;
  width: 100px;
}
</style>

<template>
  <ion-page>
    <div v-if="scannerActive" id="videoWindow" class="video"></div>
    <ion-spinner v-if="!scannerActive" name="lines"></ion-spinner>
  </ion-page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { dataBaseAPI } from "@/services/dataBaseAPI";
import Quagga from "quagga";


interface barcode {
  code: string;
  type: string;
}

interface codeResult {
  code: string;
  format: string;
}

@Component
export default class BarCodeScanner extends Vue {
  scannerActive: boolean = true;
  foundCodes: barcode | null = null;
  foundResult: any;

  constructor(){
    super();
  }

  created(){
    Quagga.onDetected((data: Array<object>) => {
      this.foundResult = data[0];
      let foundCode: barcode = {
        code: this.foundResult.codeResult.code,
        type: this.foundResult.codeResult.format
      };
      this.stop(foundCode);
    });
  }
 async mounted() {
    this.start();
  }
  start() {
    this.scannerActive = true;
    const config: object = {
      locate: true,
      inputStream: {
        name: "live",
        type: "LiveStream",
        target: document.querySelector("#videoWindow")
      },
      decoder: {
        readers: ["ean_reader", "code_128_reader"],
        multiple: true
      },
      locator: {
        halfSample: true,
        patchSize: "medium"
      }
    };
    Quagga.init(config, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("initialization complete");
      Quagga.start();
    });
  }
  async stop(foundCode) {
    this.scannerActive = false;
    Quagga.stop();
    console.log("object" + foundCode.code)
    let item = await dataBaseAPI.findItemName(foundCode.code.toLowerCase())
    setTimeout(() => {this.$router.push({
        name: 'Item',
        params: { id: item.id }
    })}, 1000)
  }

}
</script>