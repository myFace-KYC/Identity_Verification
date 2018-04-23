import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireList, AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from '@firebase/util';
import { KycFormPage } from '../kyc-form/kyc-form';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // variables 
  public userStatus = "false";
  public kyc_status : string;
  public overall_status = "email_unconfirmed";

  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  userId : string;

  // constructor
  constructor(private afAuth: AngularFireAuth, 
    private toast:ToastController,
    public navCtrl: NavController,
    private fbs:FirebaseServiceProvider,
    public afd: AngularFireDatabase) {

  } 


 // Check email verification status from database
  checkStatus(){
    console.log("Checking Status");
    this.itemRef = this.afd.object('/users/'+this.userId+'/email_confirmed');
    this.itemRef.snapshotChanges().subscribe(action => {
      status = action.payload.val();
      this.userStatus = status;
      this.setOverallStatus()
      console.log("OVERALL STATUS:",this.overall_status)
      console.log(status);
    });
  }

  // Check KYC application status from database 
  checkKYCStatus(){
    console.log("Checking KYC Status");
    this.itemRef = this.afd.object('/users/'+this.userId+'/kyc_status');
    this.itemRef.snapshotChanges().subscribe(action => {
      status = action.payload.val();
      this.kyc_status = status;
      this.setOverallStatus()
      console.log("OVERALL STATUS:",this.overall_status)
      console.log(status);
    });
  }
  
  setOverallStatus(){
    if (this.userStatus == "false"){
      this.overall_status =  "email_unconfirmed";
    }

    else if (this.userStatus =="true"){
      
      this.overall_status =  "email_confirmed";
      if (this.kyc_status=="APPROVED"){
        this.overall_status =  "approved";
      } 
      else if(this.kyc_status=="REJECTED"){
        this.overall_status =  "rejected";
      }
      else if(this.kyc_status=="PENDING"){
        this.overall_status =  "pending";
      }
      else {
        this.overall_status =  "rejected";
      }
    }
  }

  // When screen loads
  ionViewWillLoad() {
    console.log("View loaded");

    // Ensuring that the user is authorized to be on the homepage
    this.afAuth.authState.subscribe(data => {
      console.log("autherising");
      if (data.email && data.uid){
        this.userId = data.uid;
        this.checkStatus();
        this.checkKYCStatus();
        console.log(this.userId);
        
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

  // navigation to form page
  goToForm(){
    console.log("The user ID being passed:  ",this.userId);
    this.navCtrl.push(KycFormPage,{ param1 : this.userId})
    
    
  }


  
}
