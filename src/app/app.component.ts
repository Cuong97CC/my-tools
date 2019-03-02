import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpHelper } from './_helpers/http';
import { HttpParams } from '@angular/common/http';
import { hostName } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'My Tools';
  token: String;
  currentUser: any;

  constructor(
    private toastr: ToastrService,
    private httpHelper: HttpHelper
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.currentUser = localStorage.getItem('currentUser');
  }

  logOut() {
    let params = new HttpParams();
    return this.httpHelper.get("/api/user/logOut", params, null).subscribe(res => {
      if (res.code == 1) {
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        window.location.href = hostName;
      }
    });
  }

}
