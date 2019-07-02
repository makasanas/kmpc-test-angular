import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  constructor(
    private http: HttpClient
  ) { }

  socialsignup(data) {
    return this.http.post(environment.api + 'api/v1/user/login', data).pipe(map((response: any) => response));
  }
}
