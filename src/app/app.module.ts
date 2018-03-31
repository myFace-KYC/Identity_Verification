import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera'


// Firebase Imports
import { AngularFireModule } from "angularfire2"
import { FIREBASE_CONFIG } from  "./app.firebase.config"
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { HttpModule } from "@angular/http";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { KycFormPage } from '../pages/kyc-form/kyc-form';
import { KycSelfiePage } from '../pages/kyc-selfie/kyc-selfie';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    KycFormPage,
    KycSelfiePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    KycFormPage,
    KycSelfiePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFireDatabase,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider
  ]
})
export class AppModule {}
