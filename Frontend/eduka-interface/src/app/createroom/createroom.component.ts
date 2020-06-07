import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room/room.service';
import {Router} from "@angular/router";
import {AccountServiceService} from "../../services/AccountService/account-service.service";

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrls: ['./createroom.component.scss']
})
export class CreateroomComponent implements OnInit {

  roomName: string;
  errorMsg: string;
  roomDescription: string;
  loading = false;

  constructor(private api: RoomService, private router: Router, private accountService: AccountServiceService) {
  }




  ngOnInit(): void {
    this.accountService.hasAccess();
  }

  createRoom() {
    this.errorMsg = '';

    if (!this.roomName || !this.roomDescription) {
      this.errorMsg = 'Please fill in all the fields!';
      return;
    }
    const data = {
      name: this.roomName,
      description: this.roomDescription,
      owner: this.accountService.userValue.id
    };
    this.loading = true;
    this.api.createRoom(data).subscribe(res => {
      this.loading = false;

      console.log('success: ' + JSON.stringify(res));
      if (!res.success) {
        this.errorMsg = res.message;
        return;
      }
      this.router.navigate(['\classrooms', {message: 'Room created successfully'}]);
    }, err => {
      this.loading = false;
      console.log('error: ' + JSON.stringify(err));
    });
  }
}
