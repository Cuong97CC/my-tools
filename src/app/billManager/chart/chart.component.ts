import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../shared/services/bills.service';
import { tags } from '../../../environments/environment';

declare var $ :any;

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  modalRef: BsModalRef;
  token: String;
  currentUser: any;
  tag: String;
  details: String = "";
  cost: Number = 0;
  date: Date = new Date();
  month_filter: Date;
  tag_filter: String = "";
  maxDate: Date;
  bsConfig: any;
  message: String;
  bills: any;
  total_cost = 0;
  tags: any;

  constructor(
    private toastr: ToastrService,
    private billsService: BillsService,
    private modalService: BsModalService
  ) {
    this.bsConfig = {
      dateInputFormat: 'MM-YYYY',
      minMode: 'month'
    }
    this.month_filter = new Date();
    this.tag_filter = "";
    this.tags = tags;
  }

  ngOnInit() {
  }
}
