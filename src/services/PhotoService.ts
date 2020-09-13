import Vue from 'vue';
import {
    Plugins, CameraResultType, Capacitor, FilesystemDirectory,
    CameraPhoto, CameraSource
} from '@capacitor/core';
import { Photo } from '@/types/index'

const { Camera, Filesystem, Storage } = Plugins;

/**
 * PhotoService is used to take and save pictures.
 */
export default class PhotoService {
    public photoState = Vue.observable({ photos: <Photo[]>[] });

    public async takePhoto() {
        // Take a photo
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        console.log(capturedPhoto);

        const savedImageFile = await this.savePicture(capturedPhoto);

        this.photoState.photos.unshift(savedImageFile);
    }

    public async savePicture(cameraPhoto: CameraPhoto){
        let base64Data = await this.readAsBase64(cameraPhoto);
        let fileName = new Date().getTime() + ".jpeg";

        //Change this to talk to API connecting to DB
        let savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        })

        return {filepath: fileName, webviewPath: cameraPhoto.webPath}

    }

    private async readAsBase64(cameraPhoto: CameraPhoto) {
        // Fetch the photo, read as a blob, then convert to base64 format
        let response = await fetch(cameraPhoto.webPath!);
        let blob = await response.blob();
      
        return await this.convertBlobToBase64(blob) as string;  
      }
      
      convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        let reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });

}
export const photoService = new PhotoService();