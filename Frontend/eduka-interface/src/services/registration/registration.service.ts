import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HTTPCustomResponse} from '../../models/response.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  )
};
const apiUrl = 'https://34.71.254.24:8000/api/members';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
  }

  doRegister(data): Observable<HTTPCustomResponse> {
    return this.httpClient.post<HTTPCustomResponse>(apiUrl, data, httpOptions)
      .pipe(
        tap((response: HTTPCustomResponse) => console.log('result : ' + response))
      );
  }
}
