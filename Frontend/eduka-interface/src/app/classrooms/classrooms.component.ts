import {Component, OnInit} from '@angular/core';
import { RoomService } from '../../services/room/room.service';


@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {


  rooms: Object;

  constructor(private _http: RoomService) {
  }

  ngOnInit(): void {
    this._http.getRooms().subscribe(data => {
        this.rooms = data;
        console.log(this.rooms);
      }
    );
  }

}
