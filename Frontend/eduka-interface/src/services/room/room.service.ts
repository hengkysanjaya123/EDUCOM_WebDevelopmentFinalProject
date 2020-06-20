import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {HTTPCustomResponse} from '../../models/response.model';
import {tap} from 'rxjs/operators';
import {AccountServiceService} from "../AccountService/account-service.service";
import {Room} from "../../models/room.model";

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  )
};
const apiUrl = 'https://call.educom.club/api';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomSubject: BehaviorSubject<Room>;
  public room: Observable<Room>;

  constructor(private http: HttpClient, private accountService: AccountServiceService) {
    this.roomSubject = new BehaviorSubject<Room>(JSON.parse(localStorage.getItem('room')));
    this.room = this.roomSubject.asObservable();
  }

  public get getRoom(): Room {
    return this.roomSubject.value;
  }

  public setRoom(room) {
    localStorage.setItem('room', JSON.stringify(room));
    this.roomSubject.next(room);
  }

  getRooms() {
    return this.http.get(apiUrl + '/rooms/mine/' + this.accountService.userValue.id);
  }

  getSharedRooms() {
    console.log(this.accountService.userValue);
    console.log(apiUrl + '/rooms/shared/' + this.accountService.userValue.id);
    return this.http.get(apiUrl + '/rooms/shared/' + this.accountService.userValue.id);
  }

  joinRoom(data): Observable<HTTPCustomResponse> {
    return this.http.post<HTTPCustomResponse>(apiUrl + '/room_participants', data, httpOptions)
      .pipe(
        tap((response: HTTPCustomResponse) => console.log('result: ' + JSON.stringify(response)))
      );
  }

  createRoom(data): Observable<HTTPCustomResponse> {
    return this.http.post<HTTPCustomResponse>(apiUrl + '/rooms', data, httpOptions)
      .pipe(
        tap((response: HTTPCustomResponse) => console.log('result: ' + JSON.stringify(response)))
      );
  }

}
