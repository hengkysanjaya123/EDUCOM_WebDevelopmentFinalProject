import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HTTPCustomResponse} from "../../models/response.model";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  )
};
const apiUrl = 'http://localhost:8000/api/channel_chats';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  sendMessage(data): Observable<HTTPCustomResponse> {
    return this.http.post<HTTPCustomResponse>(apiUrl, data, httpOptions)
      .pipe(
        tap((response: HTTPCustomResponse) => console.log('result: ' + JSON.stringify(response)))
      );
  }

  loadMessage(data): Observable<HTTPCustomResponse> {
    return this.http.get<HTTPCustomResponse>(apiUrl, httpOptions)
      .pipe(
        tap((response: HTTPCustomResponse) => console.log('result: ' + JSON.stringify(response)))
      );
  }

}
