import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { kycForm } from '../../models/kycForm';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


@IonicPage()
@Component({
  selector: 'page-kyc-form',
  templateUrl: 'kyc-form.html',
})
export class KycFormPage {

  kyc_form = {} as kycForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fbProvider:FirebaseServiceProvider) {
  }

  submitForm(data){
    this.fbProvider.sendForm(data);
  }


}
