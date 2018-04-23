webpackJsonp([6],{

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__kyc_form_kyc_form__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    // constructor
    function HomePage(afAuth, toast, navCtrl, fbs, afd) {
        this.afAuth = afAuth;
        this.toast = toast;
        this.navCtrl = navCtrl;
        this.fbs = fbs;
        this.afd = afd;
        // variables 
        this.userStatus = "false";
        this.overall_status = "email_unconfirmed";
    }
    // Check verification Status
    HomePage.prototype.checkStatus2 = function () {
        var _this = this;
        console.log("Checking Status");
        this.itemRef = this.afd.object('/users/' + this.userId + '/email_confirmed');
        this.itemRef.snapshotChanges().subscribe(function (action) {
            status = action.payload.val();
            _this.userStatus = status;
            _this.setOverallStatus();
            console.log("OVERALL STATUS:", _this.overall_status);
            console.log(status);
        });
    };
    HomePage.prototype.checkKYCStatus = function () {
        var _this = this;
        console.log("Checking KYC Status");
        this.itemRef = this.afd.object('/users/' + this.userId + '/kyc_status');
        this.itemRef.snapshotChanges().subscribe(function (action) {
            status = action.payload.val();
            _this.kyc_status = status;
            _this.setOverallStatus();
            console.log("OVERALL STATUS:", _this.overall_status);
            console.log(status);
        });
    };
    HomePage.prototype.setOverallStatus = function () {
        if (this.userStatus == "false") {
            this.overall_status = "email_unconfirmed";
        }
        else if (this.userStatus == "true") {
            this.overall_status = "email_confirmed";
            if (this.kyc_status == "APPROVED") {
                this.overall_status = "approved";
            }
            else if (this.kyc_status == "REJECTED") {
                this.overall_status = "rejected";
            }
            else if (this.kyc_status == "PENDING") {
                this.overall_status = "pending";
            }
            else {
                this.overall_status = "rejected";
            }
        }
    };
    // When screen loads
    HomePage.prototype.ionViewWillLoad = function () {
        var _this = this;
        console.log("View loaded");
        // Ensuring that the user is authorized to be on the homepage
        this.afAuth.authState.subscribe(function (data) {
            console.log("autherising");
            if (data.email && data.uid) {
                _this.userId = data.uid;
                _this.checkStatus2();
                _this.checkKYCStatus();
                console.log(_this.userId);
                _this.toast.create({
                    message: "Welcome to KYC, " + data.email,
                    duration: 3000
                }).present();
            }
            else {
                _this.toast.create({
                    message: "Could not find authentication details",
                    duration: 3000
                }).present();
            }
        });
    };
    // navigation to form page
    HomePage.prototype.goToForm = function () {
        console.log("The user ID being passed:  ", this.userId);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__kyc_form_kyc_form__["a" /* KycFormPage */], { param1: this.userId });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/home/home.html"*/'<ion-header>\n</ion-header>\n\n<ion-content padding class="background">\n\n  <h1 class="title-home">Welcome to myFace\'s KYC Verification</h1>\n\n\n  <div margin [ngSwitch]="overall_status">\n    <ion-card class="Absolute-Center">\n      \n        <img *ngSwitchCase= "\'email_unconfirmed\'" src="assets/imgs/email_unverified.jpg"/>\n        <img *ngSwitchCase= "\'email_confirmed\'" src="assets/imgs/Proceed.jpg"/>\n        <img *ngSwitchCase= "\'approved\'" src="assets/imgs/Approved.jpg"/>\n        <img *ngSwitchCase= "\'rejected\'" src="assets/imgs/Rejected.jpg"/>\n        <img *ngSwitchCase= "\'pending\'" src="assets/imgs/Pending.jpg"/>\n      <ion-card-content>\n      <ion-row center>\n        <ion-col>\n          <button class="proceed-button" *ngSwitchCase= "\'email_confirmed\'" ion-button (click)="goToForm()">Proceed to KYC</button>\n          <button class="proceed-button" *ngSwitchCase= "\'rejected\'" ion-button (click)="goToForm()">Resubmit KYC</button>\n        </ion-col>\n      </ion-row>\n      </ion-card-content>\n    </ion-card>\n  </div>\n  \n\n\n\n  <!-- <div margin [ngSwitch]="userStatus">\n    <h3 *ngSwitchCase= "\'false\'"> Your email has not been verified, please check your email and click on the provided link </h3>\n    <div *ngSwitchCase= "\'true\'">\n      <h3 > Your email has been verified you may proceed with the KYC process</h3>\n      <button ion-button (click)="goToForm()">Proceed to KYC</button>\n    </div>\n    \n    \n  </div> -->\n\n\n  <!-- <div margin [ngSwitch]="kyc_status">\n            <h3 style="color:red"  *ngSwitchCase= "\'REJECTED\'"> Your KYC has been rejected </h3>\n            <div *ngSwitchCase= "\'APPROVED\'">\n              <h3 style="color:green" > Your KYC has been approved!</h3>\n            </div>\n            <h3 style="color:orange" *ngSwitchCase= "\'PENDING\'"> Your KYC is been processed </h3>    \n  </div> -->\n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FirebaseServiceProvider = (function () {
    function FirebaseServiceProvider(afd, afAuth) {
        var _this = this;
        this.afd = afd;
        this.afAuth = afAuth;
        this.afAuth.authState.subscribe(function (user) {
            if (user)
                _this.userId = user.uid;
        });
    }
    FirebaseServiceProvider.prototype.sendForm = function (data) {
        this.afd.list('/users/' + this.userId).push(data);
    };
    FirebaseServiceProvider.prototype.checkStatus = function (user_id) {
        console.log("Checking Status");
        console.log('/users/' + this.userId + '/state');
        this.itemRef = this.afd.object('/users/' + user_id + '/state');
        this.itemRef.snapshotChanges().subscribe(function (action) {
            status = action.payload.val();
            console.log(status);
        });
        return status;
    };
    FirebaseServiceProvider.prototype.getUserId = function () {
        return this.userId;
    };
    FirebaseServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], FirebaseServiceProvider);
    return FirebaseServiceProvider;
}());

//# sourceMappingURL=firebase-service.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_fingerprint_auth__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(afAuth, toast, navCtrl, navParams, fAuth) {
        this.afAuth = afAuth;
        this.toast = toast;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fAuth = fAuth;
        this.user = {};
    }
    LoginPage_1 = LoginPage;
    LoginPage.prototype.ionViewDidLoad = function () {
        // this.login_auth();
    };
    LoginPage.prototype.login_auth = function () {
        var _this = this;
        this.fAuth.isAvailable()
            .then(function (result) {
            if (result.isAvailable) {
                //it is available
                var encryptConfig = {
                    clientId: "myAppName",
                    username: "currentUser",
                    password: "currentUserPassword"
                };
                _this.fAuth.encrypt(encryptConfig)
                    .then(function (result) {
                    if (result.withFingerprint) {
                        _this.navCtrl.setRoot(LoginPage_1);
                        console.log('Sucessfully encrypted credentials.');
                        console.log('Encrypted credentials: ' + result.token);
                    }
                    else if (result.withBackup) {
                        _this.navCtrl.setRoot(LoginPage_1);
                        console.log('Sucessfully authenticated with backup password!');
                    }
                    else
                        console.log('Not authenticate!');
                })
                    .catch(function (error) {
                    if (error === _this.fAuth.ERRORS.FINGERPRINT_CANCELLED) {
                        console.log('Fingerprint authentication cancelled');
                    }
                    else
                        console.error(error);
                });
            }
            else {
                //fingerprint auth isn't available
            }
        })
            .catch(function (error) { return console.error(error); });
    };
    LoginPage.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1, toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("Loging in");
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        console.log("Login Successful");
                        if (result) {
                            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        toast = this.toast.create({
                            message: e_1['message'],
                            duration: 3000,
                            cssClass: 'error'
                        });
                        toast.present();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
    };
    LoginPage = LoginPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n\n\n</ion-header>\n\n\n<ion-content padding class="background">\n\n\n\n	<ion-card class="Absolute-Center">\n		<img src="assets/imgs/SignIn.jpg"/>\n		<ion-card-content>\n		\n\n		<div class="form-container">\n			<ion-row>\n\n				<ion-item>\n					<ion-input center type="text" placeholder= "Email" [(ngModel)]="user.email"></ion-input>\n				</ion-item>\n\n			</ion-row>\n			<ion-row>\n					<ion-item>\n						<ion-input justify-center type="password" placeholder= "Password" [(ngModel)]="user.password" ></ion-input>\n					</ion-item>\n			</ion-row>\n	 \n		</div>\n			<ion-row>\n				<ion-col>\n					<button ion-button class="login-button" (click)="login(user)">Login</button>\n				</ion-col>\n				<ion-col>\n					<button ion-button class="register-button" color="light" (click)="register()">Register</button>\n				</ion-col>\n			</ion-row>\n			\n		</ion-card-content>\n	</ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_fingerprint_auth__["a" /* AndroidFingerprintAuth */]])
    ], LoginPage);
    return LoginPage;
    var LoginPage_1;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var RegisterPage = (function () {
    function RegisterPage(afAuth, toast, navCtrl, navParams, db, http, alertCtrl) {
        this.afAuth = afAuth;
        this.toast = toast;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.user = {};
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
    };
    // When user registers create db entry and state KYC verification to false
    RegisterPage.prototype.createInitialDBEntry = function (user_id) {
        var itemRef = this.db.object('/users/' + user_id);
        itemRef.update({ state: "false" });
    };
    // Registers new user with server 
    RegisterPage.prototype.registerWithServer = function (user, user_id) {
        console.log("Register call is beginning");
        var url = 'https://myface-server.herokuapp.com/api/v1/new-user-submit';
        // var url = window.location.origin + '/register';
        var postData = new FormData();
        postData.append('email', user.email);
        postData.append('uid', user_id);
        this.data = this.http.put(url, postData);
        this.data.subscribe(function (data) {
            console.log(data);
        });
    };
    // async call
    RegisterPage.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, alert_1, e_1, toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)];
                    case 1:
                        result = _a.sent();
                        // Create DB entry for kyc (separate from login and register database)
                        // this.createInitialDBEntry(result['uid']);
                        console.log(result);
                        this.registerWithServer(user, result['uid']);
                        alert_1 = this.alertCtrl.create({
                            title: 'Successfully Registered!',
                            subTitle: 'Please check your email for verification link',
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: function (data) {
                                        // OK button sends back to the login page
                                        _this.navCtrl.pop();
                                    }
                                }
                            ]
                        });
                        alert_1.present();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        toast = this.toast.create({
                            message: e_1['message'],
                            duration: 3000,
                            cssClass: 'error'
                        });
                        toast.present();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Registration</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="background">\n\n\n\n		<ion-card class="Absolute-Center">\n			<img src="assets/imgs/Register.jpg"/>\n			<ion-card-content>\n			\n	\n			<div class="form-container">\n				<ion-row>\n	\n					<ion-item>\n						<ion-input center type="text" placeholder= "Email" [(ngModel)]="user.email"></ion-input>\n					</ion-item>\n	\n				</ion-row>\n				<ion-row>\n						<ion-item>\n							<ion-input justify-center type="password" placeholder= "Password" [(ngModel)]="user.password" ></ion-input>\n						</ion-item>\n				</ion-row>\n		 \n			</div>\n				<ion-row>\n					<ion-col>\n						<button ion-button class="register-button" (click)="register(user)">Submit</button>\n					</ion-col>\n				</ion-row>\n				\n			</ion-card-content>\n		</ion-card>\n	\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KycFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service_firebase_service__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__kyc_selfie_kyc_selfie__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var KycFormPage = (function () {
    function KycFormPage(navCtrl, navParams, fbProvider, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fbProvider = fbProvider;
        this.http = http;
        this.kyc_form = {};
        this.userId = navParams.get('param1');
        this.passportphoto = "test";
        this.selfiephoto = "test";
    }
    KycFormPage.prototype.submitForm = function (data) {
        // this.fbProvider.sendForm(data);
        // const userId = this.fbProvider.getUserId();
        // this.submitFormCall(data);
        console.log("The user ID being passed:  ", this.userId);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__kyc_selfie_kyc_selfie__["a" /* KycSelfiePage */], { param1: data, param2: this.userId });
    };
    KycFormPage.prototype.submitFormCall = function (form_data) {
        console.log("Posting KYC data to server");
        var url = 'https://myface-server.herokuapp.com/api/v1/new-kyc-submit';
        // var url = window.location.origin + '/kyc-submit';
        var postData = new FormData();
        console.log("userID value");
        console.log(this.userId);
        postData.append('uid', this.userId);
        postData.append('firstName', form_data.first_name);
        postData.append('lastNname', form_data.last_name);
        postData.append('nric', form_data.nric);
        postData.append('phone', form_data.phone);
        postData.append('address', form_data.address);
        console.log(postData);
        this.data = this.http.put(url, postData);
        this.data.subscribe(function (data) {
            console.log(data);
        });
    };
    KycFormPage.prototype.getUrl = function () {
        var storageRef = Object(__WEBPACK_IMPORTED_MODULE_2_firebase__["storage"])().ref();
        var starsRef = storageRef.child('selfie/' + "userid");
        // Get the download URL
        starsRef.getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'
            console.log(url);
        }).catch(function (error) {
            // Handle any errors
        });
    };
    KycFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-kyc-form',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/kyc-form/kyc-form.html"*/'<!--\n  Generated template for the KycFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Verification Form</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n<ion-content padding class="background">\n\n  <div>\n    <h1 ion-text class="form-header">\n      Please enter your details\n    </h1>\n  </div>\n\n  <div class="kyc-form-container">\n  <ion-item>\n      <ion-label floating>First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="kyc_form.firstName"></ion-input>\n  </ion-item>\n  \n  <ion-item>\n    <ion-label floating>Last Name</ion-label>\n    <ion-input type="text" [(ngModel)]="kyc_form.lastName"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>NRIC</ion-label>\n    <ion-input type="text" [(ngModel)]="kyc_form.nric"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Phone Number</ion-label>\n    <ion-input type="number" [(ngModel)]="kyc_form.phone"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Address</ion-label>\n    <ion-input type="text" [(ngModel)]="kyc_form.address"></ion-input>\n  </ion-item>\n  </div>\n  \n  <div padding >\n    <button full ion-button (click)="submitForm(kyc_form)">Next Step</button>\n  </div>\n  \n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/kyc-form/kyc-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]])
    ], KycFormPage);
    return KycFormPage;
}());

//# sourceMappingURL=kyc-form.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KycSelfiePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__submit_submit__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var KycSelfiePage = (function () {
    function KycSelfiePage(navCtrl, navParams, camera, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.http = http;
        this.kyc_form = {};
        this.kyc_form = navParams.get('param1');
        this.userId = navParams.get('param2');
        console.log(this.userId);
        console.log(this.kyc_form);
    }
    KycSelfiePage.prototype.takeselfiePhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            targetHeight: 600,
            targetWidth: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.selfiephoto = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    KycSelfiePage.prototype.getselfiePhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            targetHeight: 600,
            targetWidth: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.selfiephoto = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    KycSelfiePage.prototype.takepassportPhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            targetHeight: 600,
            targetWidth: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.passportphoto = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    KycSelfiePage.prototype.getpassportPhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            targetHeight: 600,
            targetWidth: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.passportphoto = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    KycSelfiePage.prototype.upload = function () {
        var selfiepictures = Object(__WEBPACK_IMPORTED_MODULE_3_firebase__["storage"])().ref('selfie/' + this.userId);
        selfiepictures.putString(this.selfiephoto, 'data_url');
        var passportpictures = Object(__WEBPACK_IMPORTED_MODULE_3_firebase__["storage"])().ref('passport/' + this.userId);
        passportpictures.putString(this.passportphoto, 'data_url');
        console.log("The user ID being passed:  ", this.userId);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__submit_submit__["a" /* SubmitPage */], { param1: this.kyc_form, param2: this.userId });
        // this.getSelfieUrl()
    };
    KycSelfiePage.prototype.nextPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__submit_submit__["a" /* SubmitPage */], { param1: this.kyc_form, param2: this.userId });
    };
    KycSelfiePage.prototype.getSelfieUrl = function () {
        var _this = this;
        var storageRef = Object(__WEBPACK_IMPORTED_MODULE_3_firebase__["storage"])().ref();
        var starsRef = storageRef.child('selfie/' + 'userid');
        // Get the download URL
        starsRef.getDownloadURL().then(function (result) {
            // `url` is the download URL for 'images/stars.jpg'
            // this.selfie_url = url;
            console.log("Selfie", result);
            _this.selfie_url = result;
            console.log();
        }).catch(function (error) {
            console.log(error);
        });
    };
    KycSelfiePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-kyc-selfie',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/kyc-selfie/kyc-selfie.html"*/'<!--\n  Generated template for the KycSelfiePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Upload Selfie</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n		<h1 class="image-headers">Selfie with passport photo</h1>\n\n	<p align="center">\n 		<img src="{{ selfiephoto }}">\n 	</p>\n  	<ion-row>\n  		<ion-col col-6>\n			<button ion-button full (click)="takeselfiePhoto()">\n 				Take Photo\n 			</button>\n 		</ion-col>\n 		<ion-col col-6>\n 			<button ion-button full (click)="getselfiePhoto()">\n 				From Gallery\n 			</button>\n 		</ion-col>\n 	</ion-row>\n\n	\n	 <h1 class="image-headers">Passport photo</h1>\n\n	<p align="center">\n 		<img src="{{ passportphoto }}">\n 	</p>\n  	<ion-row>\n  		<ion-col col-6>\n			<button ion-button full (click)="takepassportPhoto()">\n 				Take Photo\n 			</button>\n 		</ion-col>\n 		<ion-col col-6>\n 			<button ion-button full (click)="getpassportPhoto()">\n 				From Gallery\n 			</button>\n 		</ion-col>\n 	</ion-row>\n 	\n\n 	<button ion-button full (click)="upload()">\n 		Upload\n	 </button>\n	 \n\n</ion-content>'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/kyc-selfie/kyc-selfie.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]])
    ], KycSelfiePage);
    return KycSelfiePage;
}());

//# sourceMappingURL=kyc-selfie.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SubmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SubmitPage = (function () {
    function SubmitPage(navCtrl, navParams, http, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.kyc_form = {};
        this.kyc_form = navParams.get('param1');
        this.userId = navParams.get('param2');
        console.log("The user ID being recieved:  ", this.userId);
    }
    SubmitPage.prototype.ionViewWillLoad = function () {
        console.log('ionViewDidLoad SubmitPage');
        // this.getSelfieUrl();
        // this.getPassportUrl();
    };
    SubmitPage.prototype.getSelfieUrl = function () {
        var _this = this;
        var storageRef = Object(__WEBPACK_IMPORTED_MODULE_2_firebase__["storage"])().ref();
        var starsRef = storageRef.child('selfie/' + this.userId);
        // Get the download URL
        starsRef.getDownloadURL().then(function (result) {
            console.log("Selfie", result);
            _this.selfie_url = result;
        }).catch(function (error) {
            console.log(error);
        });
    };
    SubmitPage.prototype.getPassportUrl = function () {
        var _this = this;
        console.log('Entered Passport Call');
        var storageRef = Object(__WEBPACK_IMPORTED_MODULE_2_firebase__["storage"])().ref();
        var starsRef = storageRef.child('passport/' + this.userId);
        // Get the download URL
        starsRef.getDownloadURL().then(function (result) {
            console.log("Passport", result);
            _this.passport_url = result;
        }).catch(function (error) {
            // Handle any errors
        });
    };
    SubmitPage.prototype.presentLoadingCrescent = function () {
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Your applicaiton is being evaluated and processed on our servers',
            duration: 3000
        });
        loading.present();
        this.submitFormCall2();
    };
    SubmitPage.prototype.submitFormCall = function () {
        var _this = this;
        this.getSelfieUrl();
        this.getPassportUrl();
        var alert = this.alertCtrl.create({
            title: 'Upload Success!',
            subTitle: 'Your KYC Application Is Being Processed',
            buttons: [
                {
                    text: 'Return Home',
                    handler: function (data) {
                        // Change this to return home 
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                        _this.presentLoadingCrescent();
                    }
                }
            ]
        });
        alert.present();
    };
    SubmitPage.prototype.submitFormCall2 = function () {
        console.log("Posting KYC data to server");
        // for app
        var url = 'https://myface-server.herokuapp.com/api/v1/new-kyc-submit';
        // for ionic serve and browser testing
        // var url = window.location.origin + '/kyc-submit';
        var postData = new FormData();
        console.log("uid", this.userId);
        console.log("Selfie", this.selfie_url);
        console.log("Passport", this.passport_url);
        // if (this.selfie_url == undefined)
        // {
        //   this.getSelfieUrl();
        //   this.getPassportUrl();
        //   this.presentLoadingCrescent()
        // }
        postData.append('uid', this.userId);
        postData.append('selfie_url', this.selfie_url);
        postData.append('passport_url', this.passport_url);
        postData.append('firstName', this.kyc_form.firstName);
        postData.append('lastName', this.kyc_form.lastName);
        postData.append('nric', this.kyc_form.nric);
        postData.append('phone', this.kyc_form.phone);
        postData.append('address', this.kyc_form.address);
        // postData.append('last-name',form_data.last_name)
        // postData.append('address',form_data.address)
        // postData.append('phone',form_data.phone)
        console.log(postData);
        this.data = this.http.put(url, postData);
        this.data = this.http.put(url, postData);
        // let alert = this.alertCtrl.create({
        //   title: 'Upload Success!',
        //   subTitle: 'Your KYC Application Is Being Processed',
        //   buttons: [
        //     {
        //       text: 'Return Home',
        //       handler: data => {
        //         // Change this to return home 
        //         this.navCtrl.setRoot(HomePage)
        //       }
        //     }
        //   ]
        // });
        // alert.present();
        this.data.subscribe(function (data) {
            console.log(data);
        });
    };
    SubmitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-submit',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/submit/submit.html"*/'<!--\n  Generated template for the SubmitPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>submit</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-grid>\n  <ion-row>\n    <ion-col text-center>\n      <img src="assets/imgs/Tick.jpg"/>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col text-center>\n      <div padding >\n        <button class ="submit_button" ion-button (click)="submitFormCall()">Confirm KYC Submission</button>\n      </div>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/submit/submit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], SubmitPage);
    return SubmitPage;
}());

//# sourceMappingURL=submit.js.map

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/auth/auth.module": [
		509,
		5
	],
	"../pages/kyc-form/kyc-form.module": [
		510,
		4
	],
	"../pages/kyc-selfie/kyc-selfie.module": [
		511,
		3
	],
	"../pages/login/login.module": [
		513,
		2
	],
	"../pages/register/register.module": [
		512,
		1
	],
	"../pages/submit/submit.module": [
		514,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 215;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LockService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_fingerprint_auth__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_auth_auth__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LockService = (function () {
    function LockService(platform, splashScreen, modalCtrl, fAuth) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.modalCtrl = modalCtrl;
        this.fAuth = fAuth;
        this.initialized = false;
        this.isLocked = false;
    }
    LockService.prototype.init = function () {
        var _this = this;
        if (this.initialized) {
            return;
        }
        //SK you can change the lockscreen to an image or so.
        //Don;t have to use lock page because I'm popping out the fingerprint dialog
        this.lockScreen = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_auth_auth__["a" /* AuthPage */]);
        this.platform.ready().then(function () {
            _this.onPauseSubscription = _this.platform.pause.subscribe(function () {
                _this.splashScreen.show();
            });
            _this.onResumeSubscription = _this.platform.resume.subscribe(function () {
                if (!_this.isLocked) {
                    _this.isLocked = true;
                    _this.lockScreen.present();
                    //Immediately pops up the fingerprint dialog
                    _this.showFingerPrint();
                }
                _this.splashScreen.hide();
            });
        });
    };
    LockService.prototype.showFingerPrint = function () {
        var _this = this;
        this.fAuth.isAvailable()
            .then(function (result) {
            if (result.isAvailable) {
                //it is available
                var encryptConfig = {
                    clientId: "myAppName",
                    username: "currentUser",
                    password: "currentUserPassword"
                };
                _this.fAuth.encrypt(encryptConfig)
                    .then(function (result) {
                    if (result.withFingerprint) {
                        _this.lockScreen.dismiss();
                        _this.isLocked = false;
                        console.log('Sucessfully encrypted credentials.');
                        console.log('Encrypted credentials: ' + result.token);
                    }
                    else if (result.withBackup) {
                        _this.lockScreen.dismiss();
                        _this.isLocked = false;
                        console.log('Sucessfully authenticated with backup password!');
                    }
                    else
                        console.log('Not authenticate!');
                })
                    .catch(function (error) {
                    if (error === _this.fAuth.ERRORS.FINGERPRINT_CANCELLED) {
                        console.log('Fingerprint authentication cancelled');
                    }
                    else
                        console.error(error);
                });
            }
            else { }
            //fingerprint auth isn't available
        })
            .catch(function (error) { return console.error(error); });
    };
    LockService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_fingerprint_auth__["a" /* AndroidFingerprintAuth */]])
    ], LockService);
    return LockService;
}());

//# sourceMappingURL=lock.service.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(340);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_firebase_config__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_register_register__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_firebase_service_firebase_service__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_kyc_form_kyc_form__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_kyc_selfie_kyc_selfie__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_common_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_submit_submit__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_lock_service__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_android_fingerprint_auth__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_auth_auth__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Firebase Imports


















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_kyc_form_kyc_form__["a" /* KycFormPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_kyc_selfie_kyc_selfie__["a" /* KycSelfiePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_auth_auth__["a" /* AuthPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_submit_submit__["a" /* SubmitPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_18__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/auth/auth.module#AuthPageModule', name: 'AuthPage', segment: 'auth', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/kyc-form/kyc-form.module#KycFormPageModule', name: 'KycFormPage', segment: 'kyc-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/kyc-selfie/kyc-selfie.module#KycSelfiePageModule', name: 'KycSelfiePage', segment: 'kyc-selfie', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/submit/submit.module#SubmitPageModule', name: 'SubmitPage', segment: 'submit', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_6__app_firebase_config__["a" /* FIREBASE_CONFIG */])
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_kyc_form_kyc_form__["a" /* KycFormPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_kyc_selfie_kyc_selfie__["a" /* KycSelfiePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_auth_auth__["a" /* AuthPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_submit_submit__["a" /* SubmitPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_18__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_android_fingerprint_auth__["a" /* AndroidFingerprintAuth */],
                __WEBPACK_IMPORTED_MODULE_20__services_lock_service__["a" /* LockService */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_lock_service__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_auth_auth__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, lockService) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_auth_auth__["a" /* AuthPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            lockService.init();
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__services_lock_service__["a" /* LockService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyArnIf1ZRn6g6JvjwOsuvvAvJcsJ-A5mYc",
    authDomain: "kyc-app-db.firebaseapp.com",
    databaseURL: "https://kyc-app-db.firebaseio.com",
    projectId: "kyc-app-db",
    storageBucket: "kyc-app-db.appspot.com",
    messagingSenderId: "639748516061"
};
//# sourceMappingURL=app.firebase.config.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_android_fingerprint_auth__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AuthPage = (function () {
    function AuthPage(navCtrl, navParams, fAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fAuth = fAuth;
    }
    AuthPage.prototype.ionViewDidLoad = function () {
    };
    AuthPage.prototype.login_auth = function () {
        var _this = this;
        this.fAuth.isAvailable()
            .then(function (result) {
            if (result.isAvailable) {
                //it is available
                var encryptConfig = {
                    clientId: "myAppName",
                    username: "currentUser",
                    password: "currentUserPassword"
                };
                _this.fAuth.encrypt(encryptConfig)
                    .then(function (result) {
                    if (result.withFingerprint) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        console.log('Sucessfully encrypted credentials.');
                        console.log('Encrypted credentials: ' + result.token);
                    }
                    else if (result.withBackup) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                        console.log('Sucessfully authenticated with backup password!');
                    }
                    else
                        console.log('Not authenticate!');
                })
                    .catch(function (error) {
                    if (error === _this.fAuth.ERRORS.FINGERPRINT_CANCELLED) {
                        console.log('Fingerprint authentication cancelled');
                    }
                    else
                        console.error(error);
                });
            }
            else {
                //fingerprint auth isn't available
            }
        })
            .catch(function (error) { return console.error(error); });
    };
    AuthPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-auth',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/auth/auth.html"*/'<!--\n  Generated template for the AuthPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title text-center>myFace Authentication</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content text-center padding>\n\n    <img src="assets/imgs/ID.jpg" width="300px" />\n\n    <button class="fingerprint-button" ion-button (click)="login_auth()">Tap to Begin</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1_fingerprint /src/pages/auth/auth.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_android_fingerprint_auth__["a" /* AndroidFingerprintAuth */]])
    ], AuthPage);
    return AuthPage;
}());

//# sourceMappingURL=auth.js.map

/***/ })

},[320]);
//# sourceMappingURL=main.js.map