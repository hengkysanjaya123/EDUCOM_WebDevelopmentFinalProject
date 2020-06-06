import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room/room.service';

@Component({
  selector: 'app-joinroom',
  templateUrl: './joinroom.component.html',
  styleUrls: ['./joinroom.component.scss']
})
export class JoinroomComponent implements OnInit {

  constructor() { }
  roomCode: string;

  ngOnInit(): void {
  }

}
