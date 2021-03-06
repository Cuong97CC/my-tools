import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../_helpers/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class BillsService {

  constructor(
    private httpHelper: HttpHelper
  ) { }

  getBills(tag, from_time, to_time, min_cost, max_cost, keyword, token) {
    let params = new HttpParams().set("tag", tag).set("from_time", from_time).set("to_time", to_time).set("min_cost", min_cost).set("max_cost", max_cost).set("keyword", keyword);
    return this.httpHelper.get("/api/money/getBills", params, token);
  }

  createBill(data, token) {
    let params = new HttpParams();
    return this.httpHelper.post("/api/money/createBill", data, params, token);
  }

  deleteBill(id, token) {
    let params = new HttpParams().set("id", id);
    return this.httpHelper.delete("/api/money", params, token);
  }

  getSalaryAndConsumption(token) {
    let params = new HttpParams();
    return this.httpHelper.get("/api/salary/analyze", params, token);
  }

  setSalary(data, month, year, token) {
    let params = new HttpParams().set("month", month).set("year", year);
    return this.httpHelper.post("/api/salary", data, params, token);
  }

  getSalary(token) {
    let params = new HttpParams();
    return this.httpHelper.get("/api/salary", params, token);
  }

  getChart(from_time, to_time, token) {
    let params = new HttpParams().set("from_time", from_time).set("to_time", to_time);
    return this.httpHelper.get("/api/money/analysisByMonth", params, token);
  }
}
