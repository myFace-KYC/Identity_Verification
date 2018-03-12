import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';
import { isString } from 'ionic-angular/util/util';
/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  items : AngularFireList<any>;
  userId : string;

  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  status : string; 

  constructor(public afd: AngularFireDatabase, private afAuth: AngularFireAuth)  {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }

  sendForm(data){
    this.afd.list('/users/'+this.userId).push(data);
  }

  checkStatus(user_id){
    console.log("Checking Status");
    console.log('/users/'+this.userId+'/state');
    this.itemRef = this.afd.object('/users/'+user_id+'/state');
    this.itemRef.snapshotChanges().subscribe(action => {
      status = action.payload.val();
      console.log(status);
    });
    return status;
  }

  getUserId(){
    return this.userId;
  }


}
