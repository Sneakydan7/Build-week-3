import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/service/posts.service';
import { HttpClient } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('rotateImage', [
      state('initial', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('initial => rotated', animate('1s linear')),
      transition('rotated => initial', animate('1s linear')),
    ]),
    trigger('fadeOutIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('1s')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  posts: Posts[] | undefined;
  userId: number = 0;

  rotateState: string = 'initial';
  showOtherImage: boolean = false;

  constructor(private postsSrv: PostsService, public authSrv: AuthService) {}

  ngOnInit(): void {
    this.userId = this.postsSrv.getUserId();
    this.postsSrv.getPosts().subscribe((posts: Posts[]) => {
      this.posts = posts;
    });
  }

  rotateImage() {
    this.showOtherImage = !this.showOtherImage;
    this.rotateState = this.rotateState === 'initial' ? 'rotated' : 'initial';
  }

  onRotateStart(event: any) {
    if (event.toState === 'rotated') {
      this.showOtherImage = true;
    }
  }
}
