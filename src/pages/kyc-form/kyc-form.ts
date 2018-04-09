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
    // this.fbProvider.sendForm(data);
    // const userId = this.fbProvider.getUserId();
    // this.submitFormCall(data);
    console.log("The user ID being passed:  ",this.userId);
    this.navCtrl.push(KycSelfiePage,{ param1 : data, param2: this.userId});
  }








  submitFormCall(form_data){
    console.log("Posting KYC data to server")
    var url = 'https://myface-server.herokuapp.com/api/v1/new-kyc-submit';

    // var url = window.location.origin + '/kyc-submit';
    let postData = new FormData();
    console.log("userID value")
    console.log(this.userId);
    postData.append('uid' , this.userId)
    
    postData.append('selfie_url','https://firebasestorage.googleapis.com/v0/b/kyc-app-db.appspot.com/o/0321%200900%20Charles%20Wong.jpg?alt=media&token=24dea5e5-2dc2-4d60-81f2-616b19d0da6e')
    postData.append('passport_url','https://firebasestorage.googleapis.com/v0/b/kyc-app-db.appspot.com/o/4CC09F46-DD71-477B-A1C9-197455BE2106%20-%20Joel%20Tan.jpeg?alt=media&token=127b241d-72e3-41cb-8ba5-3bd2e97a20ba')
    // postData.append('last-name',form_data.last_name)
    // postData.append('address',form_data.address)
    // postData.append('phone',form_data.phone)
    console.log(postData);
    this.data = this.http.put(url,postData);
    this.data.subscribe(data => {
      console.log(data);

      
    });
    
  }

  getUrl(){
    var storageRef = storage().ref();
    var starsRef = storageRef.child('selfie/'+"userid");
    // Get the download URL
    starsRef.getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'
    console.log(url)
  
    }).catch(function(error) {
      // Handle any errors
    });
  }


}
