import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../shared/services/bills.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  @ViewChild('template') update_salary_modal: TemplateRef<any>;
  modalRef: BsModalRef;
  token: String;
  currentUser: any;
  data: any;
  time: Date;
  amount: Number;
  message: String;
  processing = false;

  bsValue: Date = new Date(2017, 7);
  minMode: BsDatepickerViewMode = 'month';

  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private billsService: BillsService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode,
      dateInputFormat: 'MM-YYYY'
    });
    this.billsService.getSalary(this.token).subscribe(res => {
      if (res.code == 1) {
        this.data = res.data;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  updateSalary() {
    if (this.time && this.amount) {
      this.processing = true;
      let month = this.time.getMonth() + 1;
      let year = this.time.getFullYear()
      this.billsService.setSalary({amount: this.amount}, month, year, this.token)
        .subscribe(res => {
          if (res.code == 1) {
            this.toastr.success(res.message);
            let salary = res.data;
            let updated_month = this.data.find(val => val.year == salary.year && val.month == salary.month);
            if (updated_month) updated_month.amount = salary.amount;
            else this.data.push(salary);
            this.modalService.hide(1);
            this.time = null;
            this.amount = null;
          } else this.toastr.error(res.message);
          this.processing = false;
        })
    } else this.message = "Vui lòng nhập đầy đủ thông tin";
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
