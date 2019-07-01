import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecureService {



  constructor(
    private http: HttpClient
  ) {

  }

  getAllGroups() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDE5Y2M4OTc1YTgxMjE5MWZiOWMxZjAiLCJpYXQiOjE1NjE5NzE4NDl9.8j5p58YPVYDdw5Slm9v_8afZIG6pkr45yze7qEDeBrQ'
      })
    };
    let headers = new HttpHeaders();
    console.log(headers);
    return this.http.get(environment.api + 'api/v1/sensor/groups', httpOptions).pipe(map((response: any) => response));
  }
}
  