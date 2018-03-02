import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountCompanyRoutingModule } from './account-company-routing.module';
import { AccountCompanyComponent } from './account-company.component';
import {I3otpModule} from "../../shared/i3otp.module";
import {I3otpEditorsModule} from "../../shared/forms/editors/i3otp-editors.module";
import {CookieService} from "angular2-cookie/core";
import {CookieStoreService} from "../../shared/cookies/cookie-store.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
      I3otpModule,
      I3otpEditorsModule,
    FormsModule,
    ReactiveFormsModule,
    AccountCompanyRoutingModule
  ],
  declarations: [AccountCompanyComponent],
  providers:[ CookieService,CookieStoreService ]
})
export class AccountCompanyModule { }
