import {Injectable} from '@angular/core';
import {Member} from '../../models/member.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private userSubject: BehaviorSubject<Member>;
  public user: Observable<Member>;

  constructor(private router: Router,
              private http: HttpClient) {
    this.userSubject = new BehaviorSubject<Member>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Member {
    return this.userSubject.value;
  }


  login(user) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  hasAccess() {
    if (this.userValue == null) {
      alert("Please login first to get access to this page!");
      this.router.navigate(['/login']);
    }
  }
}
