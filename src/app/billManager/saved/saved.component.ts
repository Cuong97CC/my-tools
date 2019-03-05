import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../shared/services/bills.service';

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

  constructor(
    private toastr: ToastrService,
    private billsService: BillsService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.billsService.getSalaryAndConsumption(this.token).subscribe(res => {
      if (res.code == 1) {
        this.data = res.data;
        this.total_saved = 0;
        this.data.forEach(element => {
          this.total_saved += (element.amount || 0) - (element.totalConsumption || 0);
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
