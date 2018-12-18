import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppOrderRoutingModule } from './app-order-routing.module';
import { AppOrderComponent } from './app-order.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';
import {CookieStoreService} from '../../shared/cookies/cookie-store.service';
import {DpDatePickerModule} from "ng2-date-picker";
import {SelectUserModule} from "../../shared/common/select-user/select-user.module";
import {VerifyFrameModule} from "../../shared/common/verify-frame/verify-frame.module";

@NgModule({
  imports: [
    CommonModule,
    I3otpModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    SelectUserModule,
    VerifyFrameModule,
    AppOrderRoutingModule
  ],
  declarations: [AppOrderComponent],
  providers:[ CookieService,CookieStoreService ]
})
export class AppOrderModule { }
