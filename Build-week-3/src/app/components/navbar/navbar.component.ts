import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from 'src/app/service/posts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user!: Auth | null;

  constructor(
    private authSrv: AuthService,
    private postSrv: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;
    });
  }

  logout() {
    this.authSrv.logout();
  }

  isCreateChange() {
    this.postSrv.isEditing = false;
    this.postSrv.isCreating = true;
    this.router.navigate(['/view']);
  }
}
