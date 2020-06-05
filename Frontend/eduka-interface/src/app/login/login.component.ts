import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {HTTPCustomResponse} from '../../models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  response: HTTPCustomResponse = null;
  errorMsg = '';

  constructor(private api: AuthService) {
  }

  ngOnInit(): void {
  }

  doLogin() {
    this.response = null;

    const data = {
      email: this.email,
      password: this.password
    };

    this.api.doAuthentication(data)
      .subscribe(res => {
        this.response = res;
      }, err => {
        console.log('error:' + err.json);
        this.response = null;
        this.errorMsg = err.message;
      });
  }

}
