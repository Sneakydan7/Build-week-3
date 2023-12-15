import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Build-week-3';
  constructor(private authSrv: AuthService) {
    this.authSrv.restore();
  }
  // ngOnInit(): void {
  //   this.authSrv.restore();
  // }
}
