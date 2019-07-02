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
      'Authorization': localStorage.getItem('token')
    })
  };

  constructor(
    private http: HttpClient
  ) {

  }

  getAllGroups() {
    return this.http.get(environment.api + 'api/v1/sensor/groups', this.httpOptions).pipe(map((response: any) => response));
  }

  getGroup(id) {
    return this.http.get(environment.api + 'api/v1/sensor/group/' + id, this.httpOptions).pipe(map((response: any) => response));
  }

  addGroup(data) {
    return this.http.post(environment.api + 'api/v1/sensor/group', data, this.httpOptions).pipe(map((response: any) => response));
  }

  addSensor(data) {
    return this.http.post(environment.api + 'api/v1/sensor', data, this.httpOptions).pipe(map((response: any) => response));
  }

  updateGroup(id: String, data: any) {
    return this.http.put(environment.api + 'api/v1/sensor/group/' + id, data, this.httpOptions).pipe(map((response: any) => response));
  }

  updateSensor(id: String, data: any) {
    return this.http.put(environment.api + 'api/v1/sensor/' + id, data, this.httpOptions).pipe(map((response: any) => response));
  }

  deleteGroup(id: String) {
    return this.http.delete(environment.api + 'api/v1/sensor/group/' + id, this.httpOptions).pipe(map((response: any) => response));
  }

  deleteSensor(id: String) {
    return this.http.delete(environment.api + 'api/v1/sensor/' + id, this.httpOptions).pipe(map((response: any) => response));
  }

}
