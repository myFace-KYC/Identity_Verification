var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { KycFormPage } from '../kyc-form/kyc-form';
var HomePage = /** @class */ (function () {
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
        this.itemRef = this.afd.object('/users/' + this.userId + '/state');
        this.itemRef.snapshotChanges().subscribe(function (action) {
            status = action.payload.val();
            _this.userStatus = status;
            console.log(status);
        });
    };
    // When screen loads
    HomePage.prototype.ionViewWillLoad = function () {
        var _this = this;
        // Ensuring that the user is authorized to be on the homepage
        this.afAuth.authState.subscribe(function (data) {
            if (data.email && data.uid) {
                _this.userId = data.uid;
                _this.checkStatus2();
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
        this.navCtrl.push(KycFormPage);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [AngularFireAuth, ToastController,
            NavController, FirebaseServiceProvider, AngularFireDatabase])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map