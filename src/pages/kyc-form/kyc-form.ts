import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { kycForm } from '../../models/kycForm';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private fbProvider:FirebaseServiceProvider, public http:HttpClient) {
  }

  // submitForm(data){
  //   this.fbProvider.sendForm(data);
  //   const userId = this.fbProvider.getUserId();
  //   this.navCtrl.push(KycSelfiePage,{ param1 : userId})
  // }


  submitForm(form_data){
    console.log("Posting KYC data to server")
    // var url = 'https://myface-server.herokuapp.com/api/v1/new-user-submit';

    var url = window.location.origin + '/kyc-submit';
    let postData = new FormData();
    postData.append('uid',form_data.first_name)
    postData.append('last-name',form_data.last_name)
    postData.append('address',form_data.address)
    postData.append('phone',form_data.phone)
    this.data = this.http.put(url,postData);
    this.data.subscribe(data => {
      console.log(data);

      
    });
    
  }


}
