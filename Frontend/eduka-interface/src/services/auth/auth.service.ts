import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HTTPCustomResponse} from '../../models/response.model';
import {tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  )
};
const apiUrl = 'https://34.71.254.24:8000/api/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  doAuthentication(data): Observable<HTTPCustomResponse> {
    return this.httpClient.post<HTTPCustomResponse>(apiUrl, data, httpOptions)
      .pipe(
        tap((response: HTTPCustomResponse) => console.log('result: ' + response))
      );
  }

}
