import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => console.log(data))
  }

}
