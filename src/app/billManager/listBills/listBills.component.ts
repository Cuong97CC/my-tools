import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../shared/services/bills.service';
import { Bill } from '../../../classes/Bill';
import { tags } from '../../../environments/environment';

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
  from_time: Date = new Date();
  to_time: Date = new Date();
  tag_filter: String = "";
  keyword: String = "";
  maxDate: Date;
  bsConfig: any;
  message: String;
  bills: Bill[];
  new_bill: Bill;
  suggest_details: any = [];
  suggest_cost: any = [];
  tags: any;
  processing = false;
  min_cost: Number;
  max_cost: Number;

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
    this.initBillForm();
    this.filter();
  }

  initBillForm() {
    this.new_bill = new Bill({date: new Date()});
  }

  initSuggestion() {
    switch (this.new_bill.tag) {
      case 'Đi lại':
        this.suggest_cost = [7000, 40000, 50000];
        this.suggest_details = ["Về quê", "Lên HN", "Đổ xăng", "Gửi xe"];
        break;
      case 'Ăn uống':
        this.suggest_cost = [20000, 40000, 50000];
        this.suggest_details = ["Ăn sáng", "Ăn trưa", "Ăn tối", "Ăn vặt"];
        break;
      case 'Nhà ở':
        this.suggest_cost = [];
        this.suggest_details = ["Tiền nhà"];
        break;
      case 'Đồ dùng':
        this.suggest_cost = [];
        this.suggest_details = ["Quần áo", "Bàn chải"];
        break;
      case 'Thú cưng':
        this.suggest_cost = [90000];
        this.suggest_details = ["Hạt", "Cát", "Đồ chơi", "Pate"];
        break;
      case 'Game':
        this.suggest_cost = [];
        this.suggest_details = [];
        break;
      case 'Khác':
        this.suggest_cost = [20000, 25000, 50000];
        this.suggest_details = ["Giặt quần áo", "Cắt tóc", "Tiền điện thoại"];
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
      if (this.new_bill.tag && this.new_bill.cost && this.new_bill.date) {
        // Temporary fix timezone bug in server
        let data:any = this.new_bill.submit_data;
        var date = this.setTimeInHour(this.new_bill.date, 11, 0, 0);
        data.time = date;
        this.processing = true;
        this.billsService.createBill(data, this.token).subscribe(res => {
          if (res.code == 1) {
            this.toastr.success(res.message);
            this.modalService.hide(1);
            this.initBillForm();
            let time = new Date(res.data.new_bill.time);
            if (time >= this.from_time && time <= this.to_time) {
              if (!this.bills) this.bills = [];
              this.bills.push(new Bill(res.data.new_bill));
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
    this.billsService.getBills(this.tag_filter, from_time, to_time, this.min_cost || "", this.max_cost || "", this.keyword, this.token).subscribe(res => {
      if (res.code == 1) {
        this.bills = res.data.bills.map(val => new Bill(val));
      } else this.toastr.error(res.message);
    });
  }

  get total_cost() {
    return (this.bills || []).reduce((acc, cur) => {
      return acc + cur._cost;
    }, 0);
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
