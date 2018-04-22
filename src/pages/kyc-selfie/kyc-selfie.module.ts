import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KycSelfiePage } from './kyc-selfie';

@NgModule({
  declarations: [
    KycSelfiePage,
  ],
  imports: [
    IonicPageModule.forChild(KycSelfiePage),
  ],
})
export class KycSelfiePageModule {}
