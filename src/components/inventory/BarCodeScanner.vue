<style>
.video {
  width: 100%;
}
</style>

<template>
  <ion-page>
    <div v-if="foundCodes" class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{foundCodes.type}}</p>
          <p class="title">{{foundCodes.code}}</p>
        </div>
      </div>
    </div>
    <div id="videoWindow" class="video"></div>
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
  scannerActive: boolean = false;
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
    let item = await dataBaseAPI.findItemName(foundCode.code.toLowerCase())
      this.$router.push({
        name: 'Item',
        params: { id: item.id }
    })
  }

}
</script>