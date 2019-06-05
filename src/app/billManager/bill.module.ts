import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'angular-highcharts';

import { routing } from './bill.routing';
//component
import { ListBillsComponent } from './listBills/listBills.component';
import { SavedComponent } from './saved/saved.component';
import { SalaryComponent } from './salary/salary.component';
import { ChartComponent } from './chart/chart.component';

import { BillsService } from './shared/services/bills.service';

@NgModule({
  imports: [
    routing,
    BsDatepickerModule.forRoot(),
    SharedModule,
    ChartModule
  ],
  declarations: [
    ListBillsComponent,
    SavedComponent,
    SalaryComponent,
    ChartComponent
  ],
  providers: [
    BillsService
  ]
})
export class BillManagerModule { }
