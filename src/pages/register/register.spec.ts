import { browser, by, element } from 'protractor';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RegisterPage } from './register';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";

import { NavControllerMock, NavParamsMock, ToastControllerMock} from 'ionic-mocks';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuthMock, FirebaseAuthMock } from '../login/login.spec';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';

describe('Initial Registration (Register Page)', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let passwordHTMLElement: HTMLElement;
  let usernameHTMLElement: HTMLElement;

  let navcontroller: NavController;
  let navparams: NavParams;
  let toastcontroller: ToastController;
  let firebaseauth: AngularFireAuthMock;
  let registerPageTest: RegisterPage;
  let database: AngularFireDatabase;
  let app: FirebaseApp;


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
      database = new AngularFireDatabase(app);
      registerPageTest = new RegisterPage(firebaseauth, toastcontroller, navcontroller, navparams, database);

      // Change unit testing flag to true
      registerPageTest.unit_testing = true;
   });

    // Test Case 1: 
  it("Uncorrected Email Address Format - Pass\nEmail: ohmygod@GG\nPassword: test123456", function(done) {
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

    // Test Case 2: 
  it("Invalid Email Address - Fail\nEmail: hahaha\nPassword: test123456", function(done) {
    let user_test = {
    email: "hahaha",
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
  it("Password too short - Fail\nEmail: guanlun_zhao@mymail.sutd.edu.sg\nPassword: 666", function(done) {
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