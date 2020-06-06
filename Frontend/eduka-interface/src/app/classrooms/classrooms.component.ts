import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';


@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {


  rooms: Object;

  constructor(private _http: HttpService) {
  }

  ngOnInit(): void {
    this._http.getRooms().subscribe(data => {
        this.rooms = data;
        console.log(this.rooms);
      }
    );
  }

}
