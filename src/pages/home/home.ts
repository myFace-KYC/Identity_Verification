import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireList } from "angularfire2/database";
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from '@firebase/util';
import { KycFormPage } from '../kyc-form/kyc-form';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  


  constructor(private afAuth: AngularFireAuth, private toast:ToastController,
    public navCtrl: NavController, private fbs:FirebaseServiceProvider) {
      

  } 

  checkStatus(){
    console.log(this.fbs.checkStatus());
  }
  

  ionViewWillLoad() {

    // Ensuring that the user is authorized to be on the homepage
    this.afAuth.authState.subscribe(data => {
      if (data.email && data.uid){
        this.toast.create({
          message:`Welcome to KYC, ${data.email}`,
          duration : 3000
        }).present();
      }

      else{
        this.toast.create({
          message:"Could not find authentication details",
          duration:3000
        }).present();
      }
    })
  }

  goToForm(){
    this.navCtrl.push(KycFormPage)
    
  }


  
}
