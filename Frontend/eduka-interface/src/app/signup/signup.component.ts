import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../../services/registration/registration.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender = '';
  errorMsg = '';
  response: any;

  loading = false;

  constructor(private api: RegistrationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  signUp() {
    this.errorMsg = '';

    const data = {
      fullname: this.name,
      email: this.email,
      password: this.password,
      gender: this.gender
    };

    if (!data.fullname || !data.email || !data.password || !data.gender) {
      this.errorMsg = 'All data must be filled';
      return;
    }

    if (data.password !== this.confirmPassword) {
      this.errorMsg = 'Please check your confirm password';
      return;
    }

    console.log(data);
    this.loading = true;
    this.api.doRegister(data).subscribe(res => {
      this.loading = false;
      console.log('success : ' + JSON.stringify(res));
      this.response = res;

      if (!res.success) {
        this.errorMsg = res.message;
        return;
      }

      this.router.navigate(['\login', {message : 'Registration success! You can Login now :)'}]);
    }, err => {
      this.loading = false;
      console.log('error : ' + JSON.stringify(err));
      this.response = err;
    });
  }

}
