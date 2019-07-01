import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username: String = '';
  constructor(private _router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('userName');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');

    this._router.navigateByUrl('/login');
  }
}
