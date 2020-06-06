import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room/room.service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  message = '';
  rooms: any;
  sharedRooms: any;

  constructor(private _http: RoomService, private route: ActivatedRoute) {
    this.message = this.route.snapshot.paramMap.get('message');
  }

  hideMessage() {
    this.message = '';
  }

  ngOnInit(): void {
    this._http.getRooms().subscribe(data => {
        this.rooms = data;
        console.log(this.rooms);
      }
    );

    this._http.getSharedRooms().subscribe(data => {
      this.sharedRooms = data;
    });

    // setTimeout(function () {
    //   console.log('message: ' + this.message);
    // }, 3000);
  }

}
