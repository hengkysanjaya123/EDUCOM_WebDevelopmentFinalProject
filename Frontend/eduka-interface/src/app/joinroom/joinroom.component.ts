import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-joinroom',
  templateUrl: './joinroom.component.html',
  styleUrls: ['./joinroom.component.scss']
})
export class JoinroomComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  joinRoom(roomCode) {
    const code = roomCode.target.value;
    // TODO: change to current signed in member_id
    const member_id = 1;


  }
}
