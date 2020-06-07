import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HTTPCustomResponse} from '../../models/response.model';
import {tap} from 'rxjs/operators';
import {AccountServiceService} from "../AccountService/account-service.service";

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  )
};
const apiUrl = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private accountService: AccountServiceService) {

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
