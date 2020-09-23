import Vue from 'vue';
import {
    Plugins, CameraResultType, FilesystemDirectory,
    CameraPhoto, CameraSource
} from '@capacitor/core';
import { Photo } from '@/types/index'

const { Camera } = Plugins;

/**
 * PhotoService is used to take and save pictures.
 */
export default class PhotoService {
    public photoState = Vue.observable({ photos: <Photo[]>[] });

    public async takePhoto() {
        this.photoState.photos = [];
        // Take a photo
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        let base64Data = await this.readAsBase64(capturedPhoto);
        let fileName = new Date().getTime() + ".jpeg";

        let savedImageFile = {filepath: fileName, webviewPath: capturedPhoto.webPath, data: base64Data};

        this.photoState.photos.unshift(savedImageFile);
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