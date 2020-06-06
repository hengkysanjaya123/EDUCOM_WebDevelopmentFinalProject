import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room/room.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrls: ['./createroom.component.scss']
})
export class CreateroomComponent implements OnInit {

  constructor(private api: RoomService, private router: Router) { }

  roomName: string;
  errorMsg: string;
  roomDescription: string;
  ngOnInit(): void {
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
      owner: '1'
    };	
    this.api.createRoom(data).subscribe(res => {
	      console.log('success: ' + JSON.stringify(res));
	      if (!res.success) {
	        this.errorMsg = res.message;
	        return;
      }
      this.router.navigate(['\classrooms', {message: 'Room created successfully'}]);
    }, err => {
      console.log('error: ' + JSON.stringify(err));
  	});
  }
}
