import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {HTTPCustomResponse} from '../../models/response.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountServiceService} from '../../services/AccountService/account-service.service';
import {Member} from '../../models/member.model';

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
  message = '';

  loading = false;

  constructor(private api: AuthService, private router: Router, private route: ActivatedRoute, private accountService: AccountServiceService) {
  }

  ngOnInit(): void {
    this.message = this.route.snapshot.paramMap.get('message');
  }

  doLogin() {
    this.response = null;
    this.errorMsg = '';
    this.message = '';

    const data = {
      email: this.email,
      password: this.password
    };

    if (!data.email || !data.password) {
      this.errorMsg = 'Email and Password must be filled';
      return;
    }

    this.loading = true;
    this.api.doAuthentication(data)
      .subscribe(res => {
        this.loading = false;
        this.response = res;

        if (!res.success) {
          this.errorMsg = res.message;
          return;
        }

        const user = res.data as Member;
        this.accountService.login(user);



        this.router.navigate(['/classrooms']);
      }, err => {
        this.loading = false;
        console.log('error:' + err.json);
        this.response = null;
        this.errorMsg = err.message;
      });
  }

}
