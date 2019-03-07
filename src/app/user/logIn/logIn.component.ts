import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { hostName } from '../../../environments/environment';

@Component({
  selector: 'log-in',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css']
})
export class LogInComponent implements OnInit {
  email: String;
  password: String;
  message: String;
  processing = false;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
  }

  logIn() {
    if (!this.processing) {
      let data = {
        email: this.email,
        password: this.password
      }
      this.processing = true;
      this.userService.logIn(data).subscribe(res => {
        if (res.code == 1) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));
          window.location.href = hostName;
        } else {
          this.message = res.message;
        }
        this.processing = false;
      })
    }
  }
}
