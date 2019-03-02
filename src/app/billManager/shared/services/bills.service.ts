import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../_helpers/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class BillsService {

  constructor(
    private httpHelper: HttpHelper
  ) { }

  getBills(tag, day, month, year, token) {
    let params = new HttpParams().set("tag", tag).set("day", day).set("month", month).set("year", year);
    return this.httpHelper.get("/api/money/getBills", params, token);
  }

  createBill(data, token) {
    let params = new HttpParams();
    return this.httpHelper.post("/api/money/createBill", data, params, token);
  }
}
