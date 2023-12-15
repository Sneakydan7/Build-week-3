import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Auth } from 'src/app/auth/auth';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/service/posts.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('flipImage', [
      state('initial', style({ transform: 'scaleX(1)' })),
      state('flipped', style({ transform: 'scaleX(-1)' })),
      transition('initial => flipped', animate('1s linear')),
      transition('flipped => initial', animate('1s linear')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  posts: Posts[] | undefined;
  id: number = 0;
  URL = environment.apiURL;
  user!: Auth;
  userProfile!: UserProfile;

  rotateState: string = 'initial';
  showMod: boolean = false;
  showOtherImage: boolean = false;
  editingBiography: boolean = false;

  constructor(
    private postsSrv: PostsService,
    private authSrv: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.postsSrv.getUserId();
    this.getUserJSON();
    console.log(this.id);
    this.http.get<Posts[]>(`${this.URL}/posts`).subscribe((res) => {
      let update: Posts[] = res.filter((user) => user.userId === this.id);
      this.posts = update;
      console.log(this.posts);
      return this.posts;
    });

    this.authSrv.user$.subscribe((_user) => {
      if (_user) {
        this.user = _user;
      }
    });
    console.log(this.user);
  }

  rotateImage() {
    this.showOtherImage = !this.showOtherImage;
    this.rotateState = this.rotateState === 'initial' ? 'flipped' : 'initial';
  }

  onRotateStart(event: any) {
    if (event.toState === 'flipped') {
      this.showOtherImage = true;
    }
  }

  isEditingChange(id: number) {
    this.postsSrv.isEditing = true;
    this.router.navigate(['/view', id]);
    this.postsSrv.isCreating = false;
  }

  isEditingView(id: number) {
    this.postsSrv.isEditing = false;
    this.router.navigate(['/view', id]);
    this.postsSrv.isCreating = false;
  }

  modifyPage() {
    let body = document.getElementById('bio') as HTMLInputElement;
    let image = document.getElementById('img') as HTMLInputElement;
    this.modifyUser(this.id, body.value, image.value);
  }

  modifyUser(userIdMod: number, bioMod: string, img: string) {
    const user: UserProfile = {
      biografia: bioMod,
      image: img,
      id: this.id,
    };
    this.http
      .patch<UserProfile>(`${this.URL}/users/${this.id}`, user)
      .subscribe((user) => {
        this.userProfile = user;
        // localStorage.setItem(
        //   'user',
        //   JSON.stringify(this.authSrv.getUserByIdJSON)
        // );
        location.reload();
      });
  }

  showEdit() {
    this.showMod = !this.showMod;
  }

  getUserJSON() {
    this.authSrv.getUserByIdJSON(this.id).subscribe((user) => {
      this.userProfile = user;
    });
  }
}
