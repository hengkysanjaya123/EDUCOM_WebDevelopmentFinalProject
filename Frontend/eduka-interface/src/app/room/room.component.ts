import {Component, OnInit} from '@angular/core';
import {AccountServiceService} from "../../services/AccountService/account-service.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private accountService: AccountServiceService) {
  }

  ngOnInit(): void {
    this.accountService.hasAccess();
  }

  doSomething() {
    alert('test');
  }

  logout() {
    this.accountService.logout();
  }
}
