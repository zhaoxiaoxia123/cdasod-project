import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalPatientRoutingModule } from './medical-patient-routing.module';
import { MedicalPatientComponent } from './medical-patient.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {I3otpEditorsModule} from "../../shared/forms/editors/i3otp-editors.module";

@NgModule({
  imports: [
    CommonModule,
      I3otpModule,
      I3otpEditorsModule,
    MedicalPatientRoutingModule
  ],
  declarations: [MedicalPatientComponent]
})
export class MedicalPatientModule { }
