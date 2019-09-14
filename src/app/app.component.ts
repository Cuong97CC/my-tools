import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = hostName;
  }

}
