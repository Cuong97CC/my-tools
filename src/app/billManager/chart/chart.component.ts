import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../shared/services/bills.service';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { tags } from '../../../environments/environment';
import * as moment from 'moment';
import { Chart } from 'angular-highcharts';
import { validateConfig } from '@angular/router/src/config';
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart: any;
  token: String;
  currentUser: any;
  from_time: Date = new Date();
  to_time: Date = new Date();
  bsConfig: any;
  message: String;
  processing = false;
  minMode: BsDatepickerViewMode = 'month';
  data: any;
  tags: any;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private billsService: BillsService
  ) {
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode,
      dateInputFormat: 'MM-YYYY'
    });
    this.tags = tags;
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.route.queryParams['_value']['from_time']) this.from_time = new Date(this.route.queryParams['_value']['from_time']);
    if (this.route.queryParams['_value']['to_time']) this.to_time = new Date(this.route.queryParams['_value']['to_time']);
    this.filter();
  }

  clearFromTime() {
    this.from_time = null;
  }

  clearToTime() {
    this.to_time = null;
  }

  filter() {
    this.processing = true;
    let day = 31;
    switch (this.to_time.getMonth() + 1) {
      case 2:
        day = 28;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        day = 30;
        break;
      default: break;
    }
    let from_time = this.setTimeInDate(this.from_time, 12, 0, 0, 1);
    let to_time = this.setTimeInDate(this.to_time, 12, 0, 0, day);
    this.billsService.getChart(from_time, to_time, this.token).subscribe((res) => {
      console.log(res)
      if (res.code == 1) {
        let axis = this.createXAxis(from_time, to_time);
        this.chart = new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Linechart'
          },
          credits: {
            enabled: false
          },
          xAxis: {
            categories: axis
          },
          series: this.parseData(res.data, axis)
        });
      } else this.toastr.error(res.message);
      this.processing = false;
    })
  }

  createXAxis(from_time, to_time) {
    let axis = [];
    from_time = new Date(from_time);
    to_time = new Date(to_time);
    let start_month = from_time.getMonth() + 1;
    let end_month = to_time.getMonth() + 1;
    let start_year = from_time.getFullYear();
    let end_year = to_time.getFullYear();
    if (from_time > to_time) return [];
    if (start_year == end_year) {
      for (let i = start_month; i <= end_month; i++) {
        axis.push(i + '/' + start_year);
      }
    } else {
      for (let i = start_month; i <= 12; i++) {
        axis.push(i + '/' + start_year);
      }
      for (let i = start_year + 1; i < end_year; i++) {
        for (let j = 1; j <= 12; j++) {
          axis.push(j + '/' + i);
        }
      }
      for (let i = 1; i <= end_month; i++) {
        axis.push(i + '/' + end_year);
      }
    }
    return axis;
  }

  parseData(data, axis) {
    data = data.map((val) => {
      return {
        total: val.totalConsumption,
        time: val._id.month + "/" + val._id.year,
        tag: val._id.tag
      }
    });
    let result = [];
    this.tags.forEach(val => {
      result.push({name: val, type: undefined, data: new Array(axis.length).fill(0)});
    });
    result.forEach(element => {
      let consumptions = data.filter(e => e.tag == element.name);
      consumptions.forEach(e => {
        let index = axis.indexOf(e.time);
        element.data[index] = e.total;
      });
    });
    return result;
  }

  setTimeInDate(date: Date, hour, minute, second, day) {
    if (!date) return '';
    date.setDate(day);
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    return date.getTime();
  }
}
