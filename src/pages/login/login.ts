import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


	user = {} as User;

  constructor(private afAuth: AngularFireAuth, private toast:ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user:User){
  
    try { 
      console.log("Loging in")
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
      console.log("Login Successful")
      if (result){
        this.navCtrl.setRoot(HomePage)
      }
    }
    catch(e){
      console.error(e);
      let toast = this.toast.create({
        message: e['message'],
        duration: 3000,
        cssClass: 'error'
      });
      toast.present();
    }
  }

  register(){
    this.navCtrl.push(RegisterPage)
    
  }

}
