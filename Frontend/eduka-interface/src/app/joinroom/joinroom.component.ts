import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room/room.service';
import {Router} from "@angular/router";
import {AccountServiceService} from "../../services/AccountService/account-service.service";

@Component({
  selector: 'app-joinroom',
  templateUrl: './joinroom.component.html',
  styleUrls: ['./joinroom.component.scss']
})
export class JoinroomComponent implements OnInit {
  roomCode: string;
  errorMsg = '';
  loading = false;

  constructor(private api: RoomService, private router: Router, private accountService: AccountServiceService) {
  }

  ngOnInit(): void {
    this.accountService.hasAccess();
  }

  joinRoom() {
    this.errorMsg = '';

    if (!this.roomCode) {
      this.errorMsg = 'Please enter the Room Code';
      return;
    }

    const data = {
      roomCode: this.roomCode,
      member_id: this.accountService.userValue.id
    };
    this.loading = true;
    this.api.joinRoom(data).subscribe(res => {
      this.loading = false;
      console.log('success: ' + JSON.stringify(res));
      if (!res.success) {
        this.errorMsg = res.message;
        return;
      }

      this.router.navigate(['\classrooms', {message: 'Room joined successfully'}]);
    }, err => {
      this.loading = false;
      console.log('error: ' + JSON.stringify(err));
    });
  }
}
