import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../_helpers/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(
    private httpHelper: HttpHelper
  ) { }

  signUp(data) {
    let params = new HttpParams();
    return this.httpHelper.post("/api/user/signUp", data, params, null);
  }

  logIn(data) {
    let params = new HttpParams();
    return this.httpHelper.post("/api/user/logIn", data, params, null);
  }
}
