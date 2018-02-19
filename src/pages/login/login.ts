import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login(){
    

  }

  register(){
    this.navCtrl.push(RegisterPage)
    
  }

}
