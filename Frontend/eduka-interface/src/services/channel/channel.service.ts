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
export class ChannelService {

  constructor(private http: HttpClient) {
  }

  getRoomChannels(id): Observable<HTTPCustomResponse> {
    return this.http.get<HTTPCustomResponse>(apiUrl + '/room_channels/room/' + id, httpOptions)
      .pipe(
        tap((response: HTTPCustomResponse) => console.log('result: ' + JSON.stringify(response)))
      );
  }

  createChannel(data): Observable<HTTPCustomResponse> {
    return this.http.post<HTTPCustomResponse>(apiUrl + '/room_channels', data, httpOptions)
      .pipe(
        tap((response: HTTPCustomResponse) => console.log('result: ' + JSON.stringify(response)))
      );
  }
}
