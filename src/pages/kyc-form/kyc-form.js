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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { KycSelfiePage } from '../kyc-selfie/kyc-selfie';
var KycFormPage = /** @class */ (function () {
    function KycFormPage(navCtrl, navParams, fbProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fbProvider = fbProvider;
        this.kyc_form = {};
    }
    KycFormPage.prototype.submitForm = function (data) {
        this.fbProvider.sendForm(data);
        var userId = this.fbProvider.getUserId();
        this.navCtrl.push(KycSelfiePage, { param1: userId });
    };
    KycFormPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-kyc-form',
            templateUrl: 'kyc-form.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, FirebaseServiceProvider])
    ], KycFormPage);
    return KycFormPage;
}());
export { KycFormPage };
//# sourceMappingURL=kyc-form.js.map