import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { kycForm } from '../../models/kycForm';
import { storage, initializeApp } from 'firebase';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { KycSelfiePage } from '../kyc-selfie/kyc-selfie';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-kyc-form',
  templateUrl: 'kyc-form.html',
})
export class KycFormPage {

  kyc_form = {} as kycForm;
  data:Observable<any>;
  userId : string;
  selfiephoto:string;
  passportphoto:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fbProvider:FirebaseServiceProvider, public http:HttpClient) {
    
    this.userId = navParams.get('param1');
    this.passportphoto= "test"
    this.selfiephoto= "test"
  }

  submitForm(data){
    console.log("The user ID being passed:  ",this.userId);
    this.navCtrl.push(KycSelfiePage,{ param1 : data, param2: this.userId});
  }

}
