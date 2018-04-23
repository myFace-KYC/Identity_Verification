import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private fAuth: AndroidFingerprintAuth) {
  }

  ionViewDidLoad() {
   
  }

  login_auth(){
  	this.fAuth.isAvailable()
  	.then((result)=>{
  		if(result.isAvailable){
  			//it is available
        var encryptConfig={
          clientId:"myAppName",
          username:"currentUser",
          password:"currentUserPassword"
        };

  			this.fAuth.encrypt(encryptConfig)
  			.then(result=>{
  				if(result.withFingerprint){
            this.navCtrl.setRoot(LoginPage);
  					console.log('Sucessfully encrypted credentials.');
  					console.log('Encrypted credentials: ' + result.token);
  				}
          else if (result.withBackup){
            this.navCtrl.setRoot(LoginPage);
  					console.log ('Sucessfully authenticated with backup password!');
  				}
          else 
            console.log('Not authenticate!');
  			})
  			.catch (error=>{
  				if(error===this.fAuth.ERRORS.FINGERPRINT_CANCELLED){
  					console.log('Fingerprint authentication cancelled');
  				}else console.error(error)
  			});
  		}
      else{
  			//fingerprint auth isn't available
  		}
  	})
  	.catch(error=>console.error(error));
  }

}
