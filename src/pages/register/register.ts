import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { RequestOptions } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  userId: string;
  user = {} as User;

  
  data:Observable<any>;
  
  constructor(private afAuth: AngularFireAuth, private toast:ToastController,
    public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public http:HttpClient) {
  }


  ionViewDidLoad() {
  
  }

  // When user registers create db entry and state KYC verification to false
  createInitialDBEntry(user_id){
    const itemRef = this.db.object('/users/'+user_id);
    itemRef.update({ state: "false" });
  }

  // Registers new user with server 
  registerWithServer(user: User,user_id){
    console.log("Register call is beginning")
    // var url = 'https://myface-server.herokuapp.com/api/v1/new-user-submit';

    var url = window.location.origin + '/register';;
    let postData = new FormData();
    postData.append('email',user.email)
    postData.append('uid',user_id)
    this.data = this.http.put(url,postData);
    this.data.subscribe(data => {
      console.log(data);
    });
    
  }

  // async call
  async register(user: User){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
   
      // Create DB entry for kyc (separate from login and register database)
      // this.createInitialDBEntry(result['uid']);

      this.registerWithServer(user,result['uid']);

      let toast = this.toast.create({
        message: 'Successfully Registered',
        duration: 3000,
        
      });
      toast.present();
    }
    catch (e){
      console.error(e);
      let toast = this.toast.create({
        message: e['message'],
        duration: 3000,
        cssClass: 'error'
      });
      toast.present();
    }

  }

}
