import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from "../../app/app.firebase.config";


@IonicPage()
@Component({
  selector: 'page-kyc-selfie',
  templateUrl: 'kyc-selfie.html',
})
export class KycSelfiePage {

  selfiephoto:string;
  passportphoto:string;
  userId;any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera) 
  {
    this.userId = navParams.get('param1');
    console.log(this.userId);
  }

  takeselfiePhoto(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight:600,
      targetWidth:600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true,
      allowEdit:true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.selfiephoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getselfiePhoto(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight:600,
      targetWidth:600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false,
      allowEdit:true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.selfiephoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  takepassportPhoto(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight:600,
      targetWidth:600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true,
      allowEdit:true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.passportphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  getpassportPhoto(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight:600,
      targetWidth:600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false,
      allowEdit:true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.passportphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  upload(){
    const selfiepictures = storage().ref('selfie/'+this.userId);
    selfiepictures.putString(this.selfiephoto,'data_url');
    const passportpictures = storage().ref('passport/'+this.userId);
    passportpictures.putString(this.passportphoto,'data_url');    
  }

}
