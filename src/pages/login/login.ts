import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from '../home/home';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { AuthPage } from '../auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


	user = {} as User;

  constructor(private afAuth: AngularFireAuth, private toast:ToastController,
    public navCtrl: NavController, public navParams: NavParams, private fAuth: AndroidFingerprintAuth) {
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
