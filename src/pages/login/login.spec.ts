import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoginPage } from './login';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";

import { NavControllerMock, NavParamsMock, ToastControllerMock} from 'ionic-mocks';
import { NavController, NavParams, ToastController } from 'ionic-angular';
var waitsfor = require('waitsfor')


class AngularFireAuthMock {   // added this class
  auth: FirebaseAuthMock = new FirebaseAuthMock();
  constructor() {
  }
}

export class FirebaseAuthMock {
	
	constructor() {
	}

	// Mock signInWithEmailAndPassword to validate email && password locally
	signInWithEmailAndPassword(email: string, password: string): boolean {

		// Use Regex to match valid email temporarily, since cannot know validate method used by Firebase Server
		// Follows General Email Regex (RFC 5322 Official Standard)
	    let email_test: boolean = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

	    // Password regex: Minimum eight characters, at least one letter and one number
	    let password_test: boolean = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

	    // return (email_test && password_test);
	    return email_test && password_test;
	}
}


describe('Initial Registration (Login Page)', () => {
	let component: LoginPage;
	let fixture: ComponentFixture<LoginPage>;
	let passwordHTMLElement: HTMLElement;
	let usernameHTMLElement: HTMLElement;

	let navcontroller: NavController;
	let navparams: NavParams;
	let toastcontroller: ToastController;
	let firebaseauth: AngularFireAuthMock;
	let loginPageTest: LoginPage;


	// beforeEach(async(() => {
	// 	TestBed.configureTestingModule({
	// 		declarations: [LoginPage]
	// 	}).compileComponents();
	// }));

  // 	beforeEach(async(() => {
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
      loginPageTest = new LoginPage(firebaseauth, toastcontroller, navcontroller, navparams);
 	});

  	// Test Case 1: 
	it("Correct Email Address - Pass", function(done) {
		let user_test = {
		email: "qnlzgl@126.com",
		password: "test123456"
		};
		
		loginPageTest.login(user_test);
		// Trigger this anonymous function after 100ms
		setTimeout(function() {
			expect(loginPageTest.auth_result).toBe(true);
			done();	// done() tells jasmine that this test case has finished
			}, 100);
		});

  	// Test Case 2: 
	it("Invalid Email Address - Fail", function(done) {
		let user_test = {
		email: "hahaha",
		password: "test123456"
		};
		
		loginPageTest.login(user_test);
		// Trigger this anonymous function after 100ms
		setTimeout(function() {
			expect(loginPageTest.auth_result).toBe(true);
			done();	// done() tells jasmine that this test case has finished
			}, 100);
		});

  	// Test Case 3: 
	it("Password too short - Fail", function(done) {
		let user_test = {
		email: "guanlun_zhao@mymail.sutd.edu.sg",
		password: "666"
		};
		
		loginPageTest.login(user_test);
		// Trigger this anonymous function after 100ms
		setTimeout(function() {
			expect(loginPageTest.auth_result).toBe(true);
			done();	// done() tells jasmine that this test case has finished
			}, 100);
		});

})