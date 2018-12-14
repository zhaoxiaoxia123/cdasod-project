import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentBeaconComponent } from './equipment-beacon/equipment-beacon.component';
import { EquipmentPositioningComponent } from './equipment-positioning/equipment-positioning.component';
import { HelmetListComponent } from './helmet-list/helmet-list.component';
import { StationListComponent } from './station-list/station-list.component';
import {I3otpModule} from '../shared/i3otp.module';
import {routing} from './equipment.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {AddI3otpComponent} from './add-i3otp/add-i3otp.component';
import {CookieStoreService} from '../shared/cookies/cookie-store.service';
import {CookieService} from 'angular2-cookie/core';
import { AddPhonicsComponent } from './add-phonics/add-phonics.component';
import { HelmetChartComponent } from './helmet-chart/helmet-chart.component';
import {AngularEchartsModule} from 'ngx-echarts';
import { StationChartComponent } from './station-chart/station-chart.component';
import { ChartSettingComponent } from './chart-setting/chart-setting.component';
import {DataMapComponent, KeysPipe} from './data-map/data-map.component';
import {UnsavedGuard} from "../shared/cookies/unsaved.guard";
import {ChartGuard} from "../shared/cookies/chart.guard";
import { FullTablesComponent } from './full-tables/full-tables.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import {XEditableWidgetComponent} from "./x-editable-widget/x-editable-widget.component";
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import {HelmetChartGuard} from "../shared/cookies/helmetChart.guard";
import { PhonicsListComponent } from './phonics-list/phonics-list.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    I3otpModule,
    ReactiveFormsModule,
    AngularEchartsModule,
  ],
  declarations: [
    EquipmentBeaconComponent,
    EquipmentPositioningComponent,
    HelmetListComponent,
    StationListComponent,
    AddI3otpComponent,
    AddPhonicsComponent,
    HelmetChartComponent,
    StationChartComponent,
    ChartSettingComponent,
    DataMapComponent,
    KeysPipe,
    FullTablesComponent,
    TodoDetailsComponent,
    EquipmentListComponent,
    AddEquipmentComponent,
    PhonicsListComponent
  ],
    exports : [
      KeysPipe
    ],
  providers:[CookieService,CookieStoreService,UnsavedGuard,ChartGuard,HelmetChartGuard]
})
export class EquipmentModule { }
