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
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  userId : string;

  // constructor
  constructor(private afAuth: AngularFireAuth, private toast:ToastController,
    public navCtrl: NavController, private fbs:FirebaseServiceProvider,public afd: AngularFireDatabase) {
  }
 

 // Check verification Status
  checkStatus2(){
    console.log("Checking Status");
    this.itemRef = this.afd.object('/users/'+this.userId+'/state');
    this.itemRef.snapshotChanges().subscribe(action => {
      status = action.payload.val();
      this.userStatus = status;
      console.log(status);
    });
  }

  // When screen loads
  ionViewWillLoad() {

    // Ensuring that the user is authorized to be on the homepage
    this.afAuth.authState.subscribe(data => {
      if (data.email && data.uid){
        this.userId = data.uid;
        this.checkStatus2();
        
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
    this.navCtrl.push(KycFormPage)
    
  }
  
}
