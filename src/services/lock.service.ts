import { Injectable } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
import { LoginPage } from '../pages/login/login';

@Injectable()
export class LockService {
	private onPauseSubscription:Subscription;
	private onResumeSubscription:Subscription;
	private lockScreen:any;
	private initialized:boolean = false;
	private isLocked:boolean = false;

	constructor (
		public platform:Platform,
		public splashScreen: SplashScreen,
		public modalCtrl:ModalController,
		public fAuth: AndroidFingerprintAuth){

	}

	init(){
		if (this.initialized){
			return;
		}
		//SK you can change the lockscreen to an image or so.
		//Don;t have to use lock page because I'm popping out the fingerprint dialog
		this.lockScreen=this.modalCtrl.create(AuthPage);
		
		this.platform.ready().then(()=>{
			
			this.onPauseSubscription=this.platform.pause.subscribe(()=>{
				this.splashScreen.show();
			
			});
			
			this.onResumeSubscription=this.platform.resume.subscribe(()=>{
				if(!this.isLocked){
					this.isLocked=true;
					this.lockScreen.present();
					//Immediately pops up the fingerprint dialog
					this.showFingerPrint();
				}
				this.splashScreen.hide();
			});
		});
	}
	
	showFingerPrint(){
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
            		this.lockScreen.dismiss();
            		this.isLocked=false;
  					console.log('Sucessfully encrypted credentials.');
  					console.log('Encrypted credentials: ' + result.token);
  				}
          		else if (result.withBackup){
            		this.lockScreen.dismiss();
            		this.isLocked=false;
  					console.log ('Sucessfully authenticated with backup password!');
  				}
          		else 
            		console.log('Not authenticate!');
  			})
  			.catch (error=>{
  				if(error===this.fAuth.ERRORS.FINGERPRINT_CANCELLED){
  					console.log('Fingerprint authentication cancelled');
  				}
  				else 
  					console.error(error)
  			});
  			}
      		else{}
  			//fingerprint auth isn't available
  		})
  	.catch(error=>console.error(error));
	}

}
