import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { hostName } from '../../../environments/environment';

@Component({
  selector: 'sign-up',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent implements OnInit {
  email: String;
  username: String;
  password: String;
  passwordConf: String;
  message: String;
  processing = false;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
  }

  signUp() {
    if (!this.processing) {
      let data = {
        email: this.email,
        username: this.username,
        password: this.password,
        passwordConf: this.passwordConf
      }
      this.processing = true;
      this.userService.signUp(data).subscribe(res => {
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
