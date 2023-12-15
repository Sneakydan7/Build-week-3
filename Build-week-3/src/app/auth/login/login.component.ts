import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/service/posts.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private postSrv: PostsService
  ) {}

  ngOnInit(): void {}

  accedi(form: NgForm) {
    try {
      this.authSrv.login(form.value).subscribe();
      let passwordInputValue = document.getElementById(
        'password'
      ) as HTMLInputElement;
      this.postSrv.password = passwordInputValue.value;
      console.log(passwordInputValue.value);
    } catch (error) {
      alert('Login errato!');
      this.router.navigate(['/login']);
    }
  }
}
