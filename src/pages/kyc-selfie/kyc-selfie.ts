import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseStorage } from '@firebase/storage-types';

/**
 * Generated class for the KycSelfiePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kyc-selfie',
  templateUrl: 'kyc-selfie.html',
})
export class KycSelfiePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private fStorage:FirebaseStorage) {
    const userId = navParams.get('param1');
    console.log(userId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KycSelfiePage');
  }

  async takePhoto (){

    try {
    const options: CameraOptions = {
      quality: 50,
      targetHeight:600,
      targetWidth:600,
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE

    }
    const result  = await this.camera.getPicture(options)
    const image = `data:image/jpeg;base64,${result}`;
    const pictures = this.fStorage.ref('pictures');
    pictures.putString(image,'data_url')
  }
  catch(e){
    console.error(e)
  }

  }

}
