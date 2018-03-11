import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KycFormPage } from './kyc-form';

@NgModule({
  declarations: [
    KycFormPage,
  ],
  imports: [
    IonicPageModule.forChild(KycFormPage),
  ],
})
export class KycFormPageModule {}
