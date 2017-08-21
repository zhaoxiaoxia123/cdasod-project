import {NgModule} from '@angular/core';

import {SmartadminModule} from '../shared/smartadmin.module';

import {routing} from './tables.routing';
import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";
import { ListStaffComponent } from './list-staff/list-staff.component';
import { ListProductComponent } from './list-product/list-product.component';


@NgModule({
  declarations: [

  ListStaffComponent,

  ListProductComponent],
  imports: [
    SmartadminModule,
    SmartadminDatatableModule,

    routing
  ],
})
export class TablesModule {}
