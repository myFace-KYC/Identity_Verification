webpackJsonp([5],{

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(65);
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

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KycFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service_firebase_service__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__kyc_selfie_kyc_selfie__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(66);
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__kyc_selfie_kyc_selfie__["a" /* KycSelfiePage */], { param1: data, param2: this.userId });
    };
    KycFormPage.prototype.submitFormCall = function (form_data) {
        console.log("Posting KYC data to server");
        // var url = 'https://myface-server.herokuapp.com/api/v1/new-user-submit';
        var url = window.location.origin + '/kyc-submit';
        var postData = new FormData();
        console.log("userID value");
        console.log(this.userId);
        postData.append('uid', this.userId);
        postData.append('selfie_url', 'https://firebasestorage.googleapis.com/v0/b/kyc-app-db.appspot.com/o/0321%200900%20Charles%20Wong.jpg?alt=media&token=24dea5e5-2dc2-4d60-81f2-616b19d0da6e');
        postData.append('passport_url', 'https://firebasestorage.googleapis.com/v0/b/kyc-app-db.appspot.com/o/4CC09F46-DD71-477B-A1C9-197455BE2106%20-%20Joel%20Tan.jpeg?alt=media&token=127b241d-72e3-41cb-8ba5-3bd2e97a20ba');
        // postData.append('last-name',form_data.last_name)
        // postData.append('address',form_data.address)
        // postData.append('phone',form_data.phone)
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
            selector: 'page-kyc-form',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/kyc-form/kyc-form.html"*/'<!--\n  Generated template for the KycFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Verification Form</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n<ion-content padding>\n\n  <div>\n    <h1 ion-text>\n      Please enter your details\n    </h1>\n  </div>\n\n  <ion-item>\n      <ion-label floating>First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="kyc_form.first_name"></ion-input>\n  </ion-item>\n  \n  <ion-item>\n    <ion-label floating>Last Name</ion-label>\n    <ion-input type="text" [(ngModel)]="kyc_form.last_name"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Phone Number</ion-label>\n    <ion-input type="number" [(ngModel)]="kyc_form.phone"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Address</ion-label>\n    <ion-input type="text" [(ngModel)]="kyc_form.address"></ion-input>\n  </ion-item>\n  \n  <div padding >\n    <button ion-button (click)="submitForm(kyc_form)">Next Step</button>\n  </div>\n  \n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/kyc-form/kyc-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]])
    ], KycFormPage);
    return KycFormPage;
}());

//# sourceMappingURL=kyc-form.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KycSelfiePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__submit_submit__ = __webpack_require__(154);
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
            selector: 'page-kyc-selfie',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/kyc-selfie/kyc-selfie.html"*/'<!--\n  Generated template for the KycSelfiePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Upload Selfie</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n	<b>Selfie with passport photo</b>\n	<p align="center">\n 		<img src="{{ selfiephoto }}">\n 	</p>\n  	<ion-row>\n  		<ion-col col-6>\n			<button ion-button full (click)="takeselfiePhoto()">\n 				Take Photo\n 			</button>\n 		</ion-col>\n 		<ion-col col-6>\n 			<button ion-button full (click)="getselfiePhoto()">\n 				From Gallery\n 			</button>\n 		</ion-col>\n 	</ion-row>\n\n\n 	<b>Passport photo</b>\n	<p align="center">\n 		<img src="{{ passportphoto }}">\n 	</p>\n  	<ion-row>\n  		<ion-col col-6>\n			<button ion-button full (click)="takepassportPhoto()">\n 				Take Photo\n 			</button>\n 		</ion-col>\n 		<ion-col col-6>\n 			<button ion-button full (click)="getpassportPhoto()">\n 				From Gallery\n 			</button>\n 		</ion-col>\n 	</ion-row>\n 	\n\n 	<button ion-button full (click)="upload()">\n 		Upload\n	 </button>\n	 \n\n</ion-content>'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/kyc-selfie/kyc-selfie.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]])
    ], KycSelfiePage);
    return KycSelfiePage;
}());

//# sourceMappingURL=kyc-selfie.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(66);
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
    function SubmitPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.kyc_form = {};
        this.kyc_form = navParams.get('param1');
        this.userId = navParams.get('param2');
    }
    SubmitPage.prototype.ionViewWillLoad = function () {
        console.log('ionViewDidLoad SubmitPage');
        this.getSelfieUrl();
        this.getPassportUrl();
    };
    SubmitPage.prototype.getSelfieUrl = function () {
        var _this = this;
        var storageRef = Object(__WEBPACK_IMPORTED_MODULE_2_firebase__["storage"])().ref();
        var starsRef = storageRef.child('selfie/' + 'userid');
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
        var starsRef = storageRef.child('passport/' + 'userid');
        // Get the download URL
        starsRef.getDownloadURL().then(function (result) {
            console.log("Passport", result);
            _this.passport_url = result;
        }).catch(function (error) {
            // Handle any errors
        });
    };
    SubmitPage.prototype.submitFormCall = function () {
        console.log("Posting KYC data to server");
        // var url = 'https://myface-server.herokuapp.com/api/v1/new-user-submit';
        var url = window.location.origin + '/kyc-submit';
        var postData = new FormData();
        console.log("uid", this.userId);
        console.log("Selfie", this.selfie_url);
        console.log("Passport", this.passport_url);
        postData.append('uid', this.userId);
        postData.append('selfie_url', this.selfie_url);
        postData.append('passport_url', this.passport_url);
        // postData.append('last-name',form_data.last_name)
        // postData.append('address',form_data.address)
        // postData.append('phone',form_data.phone)
        console.log(postData);
        this.data = this.http.put(url, postData);
        this.data.subscribe(function (data) {
            console.log(data);
        });
    };
    SubmitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-submit',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/submit/submit.html"*/'<!--\n  Generated template for the SubmitPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>submit</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div padding >\n        <button ion-button (click)="submitFormCall()">Submit</button>\n      </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/submit/submit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], SubmitPage);
    return SubmitPage;
}());

//# sourceMappingURL=submit.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(275);
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
    function LoginPage(afAuth, toast, navCtrl, navParams) {
        this.afAuth = afAuth;
        this.toast = toast;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = {};
    }
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
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary" >\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n	<ion-item>\n		<ion-label floating>Email Address</ion-label>\n		<ion-input type="text" [(ngModel)]="user.email"></ion-input>\n	</ion-item>\n\n	<ion-item>\n		<ion-label floating>Password</ion-label>\n		<ion-input type="password" [(ngModel)]="user.password"></ion-input>\n	</ion-item>\n\n	<div padding >\n		<button ion-button (click)="login(user)">Login</button>\n		<button ion-button color="light" (click)="register()">Register</button>\n	</div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(66);
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
        // var url = 'https://myface-server.herokuapp.com/api/v1/new-user-submit';
        var url = window.location.origin + '/register';
        ;
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
            selector: 'page-register',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-item>\n		<ion-label floating>Email Address</ion-label>\n		<ion-input type="text" [(ngModel)]="user.email"></ion-input>\n	</ion-item>\n\n	<ion-item>\n		<ion-label floating>Password</ion-label>\n		<ion-input type="password" [(ngModel)]="user.password"></ion-input>\n	</ion-item>\n\n	<div padding >\n		<button ion-button (click)=\'register(user)\'>Submit</button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 169:
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
webpackEmptyAsyncContext.id = 169;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/kyc-form/kyc-form.module": [
		506,
		4
	],
	"../pages/kyc-selfie/kyc-selfie.module": [
		507,
		3
	],
	"../pages/login/login.module": [
		508,
		2
	],
	"../pages/register/register.module": [
		509,
		1
	],
	"../pages/submit/submit.module": [
		510,
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
webpackAsyncContext.id = 211;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__kyc_form_kyc_form__ = __webpack_require__(152);
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
    }
    // Check verification Status
    HomePage.prototype.checkStatus2 = function () {
        var _this = this;
        console.log("Checking Status");
        this.itemRef = this.afd.object('/users/' + this.userId + '/email_confirmed');
        this.itemRef.snapshotChanges().subscribe(function (action) {
            status = action.payload.val();
            _this.userStatus = status;
            console.log(status);
        });
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__kyc_form_kyc_form__["a" /* KycFormPage */], { param1: this.userId });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h1>Welcome to the KYC application!</h1>\n\n  <div [ngSwitch]="userStatus">\n    <h3 *ngSwitchCase= "\'true\'"> Your Identity is verified </h3>\n    <div *ngSwitchCase= "\'false\'">\n      <h3 > Your Identity is not verified,please proceed with verification</h3>\n      <button ion-button (click)="goToForm()">Verify Me</button>\n    </div>\n    \n    <h3  *ngSwitchCase= "\'processing\'"> Your KYC application is being processed</h3>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_firebase_service_firebase_service__["a" /* FirebaseServiceProvider */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(337);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_firebase_config__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_register_register__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_firebase_service_firebase_service__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_kyc_form_kyc_form__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_kyc_selfie_kyc_selfie__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_common_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_submit_submit__ = __webpack_require__(154);
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
                        { loadChildren: '../pages/kyc-form/kyc-form.module#KycFormPageModule', name: 'KycFormPage', segment: 'kyc-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/kyc-selfie/kyc-selfie.module#KycSelfiePageModule', name: 'KycSelfiePage', segment: 'kyc-selfie', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
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
                __WEBPACK_IMPORTED_MODULE_19__pages_submit_submit__["a" /* SubmitPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_18__angular_common_http__["b" /* HttpClientModule */],
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

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(155);
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
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/Skara/Documents/Skara/Academics/ISTD/Term 5/ESC/Ionic Project/MK_1/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 504:
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

/***/ })

},[317]);
//# sourceMappingURL=main.js.map