import { NgModule } from '@angular/core';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { routing } from './bill.routing';
//component
import { ListBillsComponent } from './listBills/listBills.component';

import { BillsService } from './shared/services/bills.service';

@NgModule({
  imports: [
    routing,
    BsDatepickerModule.forRoot(),
    SharedModule
  ],
  declarations: [
    ListBillsComponent
  ],
  providers: [
    BillsService
  ]
})
export class BillManagerModule { }
