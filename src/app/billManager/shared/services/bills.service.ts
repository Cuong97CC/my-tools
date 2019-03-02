import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../_helpers/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class BillsService {

  constructor(
    private httpHelper: HttpHelper
  ) { }

  getBills(tag, from_time, to_time, token) {
    let params = new HttpParams().set("tag", tag).set("from_time", from_time).set("to_time", to_time);
    return this.httpHelper.get("/api/money/getBills", params, token);
  }

  createBill(data, token) {
    let params = new HttpParams();
    return this.httpHelper.post("/api/money/createBill", data, params, token);
  }

  getSalary(month, year, token) {
    let params = new HttpParams().set("month", month).set("year", year);
    return this.httpHelper.get("/api/salary/getSalary", params, token);
  }

  setSalary(data, month, year, token) {
    let params = new HttpParams().set("month", month).set("year", year);
    return this.httpHelper.post("/api/salary/setSalary", data, params, token);
  }
}
