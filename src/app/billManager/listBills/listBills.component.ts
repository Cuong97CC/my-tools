import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../shared/services/bills.service';
import { tags } from '../../../environments/environment';
import * as moment from 'moment';

declare var bootbox :any;

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
  cost: Number;
  date: Date = new Date();
  from_time: Date = new Date();
  to_time: Date = new Date();
  tag_filter: String = "";
  keyword: String = "";
  maxDate: Date;
  bsConfig: any;
  message: String;
  bills: any = [];
  suggest_details: any = [];
  suggest_cost: any = [];
  total_cost = 0;
  tags: any;
  processing = false;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private billsService: BillsService,
    private modalService: BsModalService
  ) {
    this.bsConfig = {
      dateInputFormat: 'DD/MM/YYYY',
    }
    this.tag_filter = "";
    this.tags = tags;
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.route.queryParams['_value']['from_time']) this.from_time = new Date(this.route.queryParams['_value']['from_time']);
    else this.from_time = new Date();
    if (this.route.queryParams['_value']['to_time']) this.to_time = new Date(this.route.queryParams['_value']['to_time']);
    else this.to_time = new Date();
    this.maxDate = new Date();
    this.filter();
  }

  initBillForm() {
    this.tag = "";
    this.details = "";
    this.cost = 0;
    this.date = new Date();
  }

  initSuggestion() {
    switch (this.tag) {
      case 'Đi lại':
        this.suggest_cost = [7000, 40000, 50000, 55000];
        this.suggest_details = ["Về quê", "Lên HN", "Đổ xăng", "Gửi xe"];
        break;
      case 'Ăn uống':
        this.suggest_cost = [30000, 7000];
        this.suggest_details = ["Ăn trưa", "Ăn tối", "Ăn vặt"];
        break;
      case 'Nhà ở':
        this.suggest_cost = [];
        this.suggest_details = ["Tiền nhà"];
        break;
      case 'Đồ dùng':
        this.suggest_cost = [];
        this.suggest_details = ["Quần áo", "Bàn chải"];
        break;
      case 'Game':
        this.suggest_cost = [];
        this.suggest_details = [];
        break;
      case 'Khác':
        this.suggest_cost = [20000, 50000];
        this.suggest_details = ["Lego", "Cắt tóc", "Tiền điện thoại"];
        break;
      default: break;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  clearFromTime() {
    this.from_time = null;
  }

  clearToTime() {
    this.to_time = null;
  }

  createBill() {
    if (this.currentUser && !this.processing) {
      if (this.tag && this.cost && this.date) {
        // Temporary fix timezone bug in server
        var date = this.setTimeInHour(this.date, 11, 0, 0);
        let data = {
          tag: this.tag,
          details: this.details,
          cost: this.cost,
          time: date
        }
        this.processing = true;
        this.billsService.createBill(data, this.token).subscribe(res => {
          if (res.code == 1) {
            this.toastr.success(res.message);
            this.modalService.hide(1);
            this.initBillForm();
            let time = new Date(res.data.new_bill.time);
            if (time >= this.from_time && time <= this.to_time) {
              res.data.new_bill.time = moment(new Date(time)).format("DD/MM/YYYY");
              this.bills.push(res.data.new_bill);
              this.total_cost += res.data.new_bill.cost;
            }
          } else {
            this.toastr.error(res.message);
          }
          this.processing = false;
        })
      } else {
        this.message = "Vui lòng nhập đầy đủ thông tin";
      }
    } else {
      this.message = "Vui lòng đăng nhập";
    }
  }

  filter() {
    var from_time = this.setTimeInHour(this.from_time, 0, 0, 0);
    var to_time = this.setTimeInHour(this.to_time, 23, 59, 59);
    this.billsService.getBills(this.tag_filter, from_time, to_time, this.keyword, this.token).subscribe(res => {
      if (res.code == 1) {
        this.bills = res.data.bills;
        this.total_cost = 0;
        if (this.bills.length > 0) {
          this.bills.forEach(bill => {
            bill.time = moment(new Date(bill.time)).format("DD/MM/YYYY");
            this.total_cost += bill.cost;
          });
        }
      } else this.toastr.error(res.message);
    });
  }

  confirmDeleteBill(id) {
    bootbox.confirm({
      message: "Bạn chắc chắc chắn muốn xóa chi tiêu này?",
      buttons: {
        confirm: {
            label: "Xác nhận",
            className: 'btn-primary'
        },
        cancel: {
            label: "Hủy",
            className: 'btn-secondary'
        }
      },
      callback: (result) => {
        if (result) {
          this.deleteBill(id);
        }
      }
    });
  }

  deleteBill(id) {
    this.billsService.deleteBill(id, this.token).subscribe(res => {
      if (res.code == 1) {
        let index = this.bills.findIndex(val => val._id == id);
        if (index > -1) {
          this.total_cost -= this.bills[index].cost;
          this.bills.splice(index, 1);
        }
        this.toastr.success(res.message);
      } else this.toastr.error(res.message);
    });
  }

  setTimeInHour(date: Date, hour, minute, second) {
    if (!date) return '';
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    return date.getTime();
  }
}
