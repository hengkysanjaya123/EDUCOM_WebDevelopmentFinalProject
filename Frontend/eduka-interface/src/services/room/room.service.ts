import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HTTPCustomResponse} from '../../models/response.model';
import {tap} from 'rxjs/operators';

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

  constructor(private http: HttpClient) {

  }

  getRooms() {
    return this.http.get(apiUrl + '/rooms/mine');
  }

  getSharedRooms() {
    return this.http.get(apiUrl +  '/rooms/shared');
  }

  joinRoom(data): Observable<HTTPCustomResponse> {
    return this.http.post<HTTPCustomResponse>(apiUrl + '/room_participants', data, httpOptions)
      .pipe(
        tap((response: HTTPCustomResponse) => console.log('result: ' + JSON.stringify(response)))
      );
  }

}
