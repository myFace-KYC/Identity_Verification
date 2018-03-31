import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  userId: string;
  user = {} as User;
  
  constructor(private afAuth: AngularFireAuth, private toast:ToastController,
    public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // When user registers create db entry and state KYC verification to false
  createInitialDBEntry(user_id){
    const itemRef = this.db.object('/users/'+user_id);
    itemRef.update({ state: "false" });
  }

  // async call
  async register(user: User){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
   
      // Create DB entry for kyc (separate from login and register database)
      this.createInitialDBEntry(result['uid']);
      let toast = this.toast.create({
        message: 'Successfully Registered',
        duration: 3000,
        
      });
      toast.present();
    }
    catch (e){
      console.error(e);
      let toast = this.toast.create({
        message: 'Registration failed, password must be at least 6 characters long.',
        duration: 3000,
        cssClass: 'error'
      });
      toast.present();
    }

  }

}
