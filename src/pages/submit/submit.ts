import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from "../../app/app.firebase.config";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { kycForm } from '../../models/kycForm';
import { HomePage } from '../home/home';
/**
 * Generated class for the SubmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html',
})
export class SubmitPage {

  userId : string;
  selfie_url: string;
  passport_url: string;
  data:Observable<any>;
  kyc_form = {} as kycForm;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http:HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.kyc_form = navParams.get('param1');
      this.userId = navParams.get('param2');
      console.log("The user ID being recieved:  ",this.userId);
      
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad SubmitPage');
    this.getSelfieUrl();
    this.getPassportUrl();
  }

  getSelfieUrl(){
    var storageRef = storage().ref();
    var starsRef = storageRef.child('selfie/'+ this.userId);
    // Get the download URL
    starsRef.getDownloadURL().then((result) => {

    console.log("Selfie",result);
    this.selfie_url = result;
   
    }).catch(function(error) {
      console.log(error)
    });
  }

  getPassportUrl(){
    console.log('Entered Passport Call');
    var storageRef = storage().ref();
    var starsRef = storageRef.child('passport/'+ this.userId);
    // Get the download URL
    starsRef.getDownloadURL().then((result) =>  {

      console.log("Passport",result);
      this.passport_url = result;
      
    }).catch(function(error) {
      // Handle any errors
    });
  }

  presentLoadingCrescent() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Your applicaiton is being evaluated and processed on our servers',
      duration: 3000
    });

    loading.present();
  }

  submitFormCall(){
    console.log("Posting KYC data to server")
    // for app
    var url = 'https://myface-server.herokuapp.com/api/v1/new-kyc-submit';

    // for ionic serve and browser testing
    // var url = window.location.origin + '/kyc-submit';
    let postData = new FormData();

    console.log("uid",this.userId)
    console.log("Selfie",this.selfie_url)
    console.log("Passport",this.passport_url)

    if (this.selfie_url == undefined)
    {
      this.getSelfieUrl();
      this.getPassportUrl();
      this.presentLoadingCrescent()
    }

    postData.append('uid' , this.userId)
    postData.append('selfie_url',this.selfie_url)
    postData.append('passport_url',this.passport_url)

    postData.append('firstName',this.kyc_form.firstName)
    postData.append('lastName',this.kyc_form.lastName)
    postData.append('nric',this.kyc_form.nric)
    postData.append('phone',this.kyc_form.phone)
    postData.append('address',this.kyc_form.address)
    // postData.append('last-name',form_data.last_name)
    // postData.append('address',form_data.address)
    // postData.append('phone',form_data.phone)
    console.log(postData);
    this.data = this.http.put(url,postData);
    let alert = this.alertCtrl.create({
      title: 'Upload Success!',
      subTitle: 'Your KYC Application Is Being Processed',
      buttons: [
        {
          text: 'Return Home',
          handler: data => {
            // Change this to return home 
            this.navCtrl.setRoot(HomePage)
          }
        }
      ]
    });
    alert.present();
    this.data.subscribe(data => {
      console.log(data);

      // let alert = this.alertCtrl.create({
      //   title: 'Upload Success!',
      //   subTitle: 'Your KYC Application Is Being Processed',
      //   buttons: [
      //     {
      //       text: 'Return Home',
      //       handler: data => {
      //         // Change this to return home 
      //         this.navCtrl.push(HomePage)
      //       }
      //     }
      //   ]
      // });
      // alert.present();

      
    });

  }

}
