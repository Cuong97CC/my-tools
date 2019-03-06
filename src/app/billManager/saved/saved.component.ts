import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../shared/services/bills.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
  @ViewChild('template') update_salary_modal: TemplateRef<any>;
  modalRef: BsModalRef;
  token: String;
  currentUser: any;
  data: any;
  total_saved = 0;
  editting_data: any;
  index;
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
    this.billsService.getSalaryAndConsumption(this.token).subscribe(res => {
      if (res.code == 1) {
        this.data = res.data;
        this.data.sort((a, b) => {
          if (a.year > b.year) return 1;
          else if (a.year < b.year) return -1;
          else {
            if (a.month > b.month) return 1;
            else if (a.month < b.month) return -1;
            else return 0;
          }
        });
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  updateSalaryModal(i) {
    this.editting_data = Object.assign({}, this.data[i]);
    this.index = i;
    this.editting_data.time = new Date(this.editting_data.year, this.editting_data.month - 1);
    this.openModal(this.update_salary_modal);
  }

  updateSalary() {
    if (this.editting_data && !isNaN(this.editting_data.amount)) {
      this.processing = true;
      this.billsService.setSalary({amount: this.editting_data.amount}, this.editting_data.month, this.editting_data.year, this.token)
        .subscribe(res => {
          if (res.code == 1) {
            this.toastr.success(res.message);
            this.data[this.index].amount = res.data.amount;
            this.modalService.hide(1);
          } else this.toastr.error(res.message);
          this.processing = false;
        })
    } else this.message = "Dữ liệu không hợp lệ"
  }

  totalSaved() {
    let total_saved = 0;
    this.data.forEach(element => {
      total_saved += (element.amount || 0) - (element.totalConsumption || 0);
    });
    return total_saved;
  }

  showConsumpDetails(year, month) {
    let day;
    if ([4,6,9,11].includes(month)) day = 30;
    else if (month == 2) {
      if (year % 4 == 0) day = 29;
      else day = 28;
    } else day = 31;
    let start = new Date(year, month - 1, 1, 11, 0, 0).toISOString();
    let end = new Date(year, month - 1, day, 11, 0, 0).toISOString();
    this.router.navigate(["/billManage/listBills"], { replaceUrl: true, queryParams: {from_time: start, to_time: end} });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
