import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStorageRoutingModule } from './add-storage-routing.module';
import { AddStorageComponent } from './add-storage.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {I3otpEditorsModule} from "../../shared/forms/editors/i3otp-editors.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DpDatePickerModule} from "ng2-date-picker";
import {VerifyFrameModule} from "../../shared/common/verify-frame/verify-frame.module";
import {SelectUserModule} from "../../shared/common/select-user/select-user.module";

@NgModule({
  imports: [
    CommonModule,
      I3otpModule,
      I3otpEditorsModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    SelectUserModule,
    VerifyFrameModule,
    AddStorageRoutingModule
  ],
  declarations: [AddStorageComponent]
})
export class AddStorageModule { }
