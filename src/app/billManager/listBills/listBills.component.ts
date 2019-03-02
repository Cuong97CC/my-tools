import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../shared/services/bills.service';
import { tags } from '../../../environments/environment';

declare var $ :any;

@Component({
  selector: 'list-bills',
  templateUrl: './listBills.component.html',
  styleUrls: ['./listBills.component.css']
})
export class ListBillsComponent implements OnInit {
  modalRef: BsModalRef;
  token: String;
  currentUser: any;
  tag: String;
  details: String = "";
  cost: Number = 0;
  date: Date = new Date();
  from_time: Date = new Date();
  to_time: Date = new Date();
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
      dateInputFormat: 'DD/MM/YYYY',
    }
    this.from_time = new Date();
    this.to_time = new Date();
    this.tag_filter = "";
    this.tags = tags;
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.maxDate = new Date();
    this.filter();
  }

  initBillForm() {
    this.tag = "";
    this.details = "";
    this.cost = 0;
    this.date = new Date();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hideModal() {
    this.modalService.hide(1);
  }

  createBill() {
    if (this.currentUser) {
      if (this.tag && this.cost && this.date) {
        let data = {
          tag: this.tag,
          details: this.details,
          cost: this.cost,
          time: this.date.getTime()
        }
        this.billsService.createBill(data, this.token).subscribe(res => {
          if (res.code == 1) {
            this.toastr.success(res.message);
            this.hideModal();
            this.initBillForm();
          } else {
            this.toastr.error(res.message);
          }
        })
      } else {
        this.message = "Vui lòng nhập đầy đủ thông tin";
      }
    } else {
      this.message = "Vui lòng đăng nhập";
    }
  }

  filter() {
    this.billsService.getBills(this.tag_filter, this.from_time.getTime(), this.to_time.getTime(), this.token).subscribe(res => {
      if (res.code == 1) {
        this.bills = res.data.bills;
        if (this.bills.length > 0) {
          let costs = this.bills.map(val => val.cost);
          this.total_cost = costs.reduce(this.add);
        } else this.total_cost = 0;
      }
    });
  }

  add(accumulator, a) {
    return accumulator + a;
  }
}
