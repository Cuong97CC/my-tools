import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { routing } from './bill.routing';
//component
import { ListBillsComponent } from './listBills/listBills.component';
import { SavedComponent } from './saved/saved.component';
import { SalaryComponent } from './salary/salary.component';

import { BillsService } from './shared/services/bills.service';

@NgModule({
  imports: [
    routing,
    BsDatepickerModule.forRoot(),
    SharedModule
  ],
  declarations: [
    ListBillsComponent,
    SavedComponent,
    SalaryComponent
  ],
  providers: [
    BillsService
  ]
})
export class BillManagerModule { }
