import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room/room.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountServiceService} from "../../services/AccountService/account-service.service";


@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  message = '';
  rooms: any;
  sharedRooms: any;

  constructor(private _http: RoomService, private route: ActivatedRoute, private router: Router, private accountService: AccountServiceService, private roomApi: RoomService) {
    this.message = this.route.snapshot.paramMap.get('message');
  }

  hideMessage() {
    this.message = '';
  }

  ngOnInit(): void {
    this.accountService.hasAccess();

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

  logout() {
    this.accountService.logout();
  }

  selectRoom(room) {
    this.roomApi.setRoom(room);
    this.router.navigate(['/room']);
  }

}
