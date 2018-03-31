var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FirebaseServiceProvider = /** @class */ (function () {
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
        Injectable(),
        __metadata("design:paramtypes", [AngularFireDatabase, AngularFireAuth])
    ], FirebaseServiceProvider);
    return FirebaseServiceProvider;
}());
export { FirebaseServiceProvider };
//# sourceMappingURL=firebase-service.js.map