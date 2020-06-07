import {Component, OnInit} from '@angular/core';
import {AccountServiceService} from '../../services/AccountService/account-service.service';

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

  sendMessage(item) {
    const text = item.target.value;
    const currentUser = this.accountService.userValue;

    const data = {
      room_channel_id: 1,
      name: '',
      message: ''
    };
    if (!text) {
      return;
    }

    alert(text);
  }
}
