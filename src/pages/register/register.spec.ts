import { browser, by, element } from 'protractor';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RegisterPage } from './register';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";

import { NavControllerMock, NavParamsMock, ToastControllerMock} from 'ionic-mocks';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuthMock, FirebaseAuthMock } from '../login/login.spec';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { HttpClient } from "@angular/common/http";

export class MockRegisterPage {   // added this class
  auth_result: boolean = false;
  constructor(private afAuth: AngularFireAuthMock, private toast:ToastController,
    public navCtrl: NavController, public navParams: NavParams, 
    public http:HttpClient, public alertCtrl: AlertController) {
  }
  register(user_test: User) {
		// Use Regex to match valid email temporarily, since cannot know validate method used by Firebase Server
		// Follows General Email Regex (RFC 5322 Official Standard)
	    let email_test: boolean = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user_test.email);

	    // Password regex: Minimum eight characters, at least one letter and one number
	    let password_test: boolean = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(user_test.password);

	    // return (email_test && password_test);

	    this.auth_result = email_test && password_test;
  }

}

describe('Initial Registration (Register Page)', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let passwordHTMLElement: HTMLElement;
  let usernameHTMLElement: HTMLElement;

  let navcontroller: NavController;
  let navparams: NavParams;
  let toastcontroller: ToastController;
  let firebaseauth: AngularFireAuthMock;
  let registerPageTest: MockRegisterPage;
  let database: AngularFireDatabase;
  let app: FirebaseApp;
  let httpclient: HttpClient;
  let alertController: AlertController;


  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [LoginPage]
  //   }).compileComponents();
  // }));

  //   beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [LoginPage],
  //     providers: [
  //       { provide: AngularFireAuth, useClass: StatusBarMock },
  //       { provide: ToastController, useClass: SplashScreenMock },
  //       { provide: NavController, useClass: PlatformMock },
  //       { provide: NavParams, useClass: PlatformMock }
  //     ]
  //   })
  // }));

    beforeEach(() => {
      navcontroller = NavControllerMock.instance();
      navparams = NavParamsMock.instance();
      toastcontroller = ToastControllerMock.instance();
      firebaseauth = new AngularFireAuthMock();
      // database = new AngularFireDatabase(app);
      registerPageTest = new MockRegisterPage(firebaseauth, toastcontroller, navcontroller, navparams, httpclient, alertController);
   });

    // Test Case 1: 
  it("Valid Email Address & Password - Pass\nEmail: qnlzgl@126.com\nPassword: test123456", function(done) {
    let user_test = {
    email: "qnlzgl@126.com",
    password: "test123456"
    };
    
    registerPageTest.register(user_test);
    // Trigger this anonymous function after 100ms
    setTimeout(function() {
      expect(registerPageTest.auth_result).toBe(true);
      done();  // done() tells jasmine that this test case has finished
      }, 100);
    });

    // Test Case 2: 
  it("Invalid Email Address Format - Pass\nEmail: ohmygod@GG\nPassword: test123456", function(done) {
    let user_test = {
    email: "ohmygod@GG",
    password: "test123456"
    };
    
    registerPageTest.register(user_test);
    // Trigger this anonymous function after 100ms
    setTimeout(function() {
      expect(registerPageTest.auth_result).toBe(true);
      done();  // done() tells jasmine that this test case has finished
      }, 100);
    });

    // Test Case 3: 
  it("Account not enabled - Fail\nEmail: guanlun_zhao@qq.com\nPassword: test123456", function(done) {
    let user_test = {
    email: "guanlun_zhao@qq.com",
    password: "test123456"
    };
    
    registerPageTest.register(user_test);
    // Trigger this anonymous function after 100ms
    setTimeout(function() {
      expect(false).toBe(true);
      done();  // done() tells jasmine that this test case has finished
      }, 100);
    });

    // Test Case 4: 
  it("Password too weak - Fail\nEmail: guanlun_zhao@mymail.sutd.edu.sg\nPassword: 666", function(done) {
    let user_test = {
    email: "guanlun_zhao@mymail.sutd.edu.sg",
    password: "666"
    };
    
    registerPageTest.register(user_test);
    // Trigger this anonymous function after 100ms
    setTimeout(function() {
      expect(registerPageTest.auth_result).toBe(true);
      done();  // done() tells jasmine that this test case has finished
      }, 100);
    });

})