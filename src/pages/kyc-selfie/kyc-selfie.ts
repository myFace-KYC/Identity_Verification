import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase/app'
import 'firebase/storage'


@IonicPage()
@Component({
  selector: 'page-kyc-selfie',
  templateUrl: 'kyc-selfie.html',
})
export class KycSelfiePage {

  // picdata:any;
  // picurl:any;
  mypicref:any;
  userId;any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
    this.userId = navParams.get('param1');
    this.mypicref= firebase.storage().ref('/')
    console.log(this.userId);
  }

  async takePhoto (){
  //   try {
  //   const options: CameraOptions = {
  //     quality: 50,
  //     targetHeight:600,
  //     targetWidth:600,
  //     destinationType : this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE

  //   }
  //   const result  = await this.camera.getPicture(options)
  //   const image = `data:image/jpeg;base64,${result}`;
  //   const pictures = firebase.storage().ref('pictures');
  //   pictures.putString(image,'data_url')
  // }
  // catch(e){
  //   console.error(e)
  // }

  }

  // takepic(){
  //   this.camera.getPicture({
  //     quality: 50,
  //     targetHeight:600,
  //     targetWidth:600,
  //     destinationType : this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }).then(ImageData =>{
  //     this.picdata=ImageData;
  //     this.upload();
  //   })
  // }

  // upload(){
  //   this.mypicref.child(this.userId).child('pic.png')
  //   .putString(this.picdata,'base64',{contentType:'image/png'})
    
  // }

}
