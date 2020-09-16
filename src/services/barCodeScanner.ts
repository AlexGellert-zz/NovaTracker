import Vue from 'vue';
import Quagga from 'quagga';
const Quagga = require('quagga').default;
interface barcode {
    code: string;
    type: string;
  }
  
interface codeResult {
    code: string;
    format: string;
}

export default class BarCodeAPI {
    scannerActive: boolean = false;
    foundCodes: barcode | null = null;
    foundResult: any;

    constructor(){
        Quagga.onDetected((data: Array<object>) => {
            // console.log(data);
            this.foundResult = data[0];
            const foundCode: barcode = {
              code: this.foundResult.codeResult.code,
              type: this.foundResult.codeResult.format
            };
            console.log("found code " + foundCode);
            this.foundCodes = foundCode;
          });
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
          readers: ["ean_reader"],
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
  
    stop() {
      this.scannerActive = false;
      Quagga.stop();
    }
  
}

export const barCodeApi = new BarCodeAPI();