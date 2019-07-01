import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecureService {


  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDE5Y2M4OTc1YTgxMjE5MWZiOWMxZjAiLCJpYXQiOjE1NjE5NzE4NDl9.8j5p58YPVYDdw5Slm9v_8afZIG6pkr45yze7qEDeBrQ'
    })
  };

  constructor(
    private http: HttpClient
  ) {

  }

  getAllGroups() {
    return this.http.get(environment.api + 'api/v1/sensor/groups', this.httpOptions).pipe(map((response: any) => response));
  }

  addGroup(data) {
    return this.http.post(environment.api + 'api/v1/sensor/group', data, this.httpOptions).pipe(map((response: any) => response));
  }

  addSensor(data) {
    return this.http.post(environment.api + 'api/v1/sensor', data, this.httpOptions).pipe(map((response: any) => response));
  }
}
