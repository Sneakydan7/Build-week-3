import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/service/posts.service';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { environment } from 'src/environments/environment';


=======
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { environment } from 'src/environments/environment';
>>>>>>> develop-working

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
<<<<<<< HEAD
posts!: Posts[] 
userId: number = 0
id:number = 0
URL = environment.apiURL

// rotateState: string = 'initial';
// showOtherImage: boolean = false;

  constructor(private postsSrv: PostsService , private authSrv: AuthService , private http:HttpClient) { }

  ngOnInit(): void {
 this.id = this.postsSrv.getUserId();
 console.log(this.id)
 this.http.get<Posts[]>( `${this.URL}/posts`).subscribe((res) => {
  let update:Posts[] = res.filter((user) => user.userId === this.id)
this.posts = update
console.log(this.posts)
return this.posts
})
 console.log(this.posts)
=======
  posts: Posts[] | undefined;
  id: number = 0;
  URL = environment.apiURL;

  rotateState: string = 'initial';
  showOtherImage: boolean = false;

  constructor(
    private postsSrv: PostsService,
    private authSrv: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.postsSrv.getUserId();
    console.log(this.id);
    this.http.get<Posts[]>(`${this.URL}/posts`).subscribe((res) => {
      let update: Posts[] = res.filter((user) => user.userId === this.id);
      this.posts = update;
      console.log(this.posts);
      return this.posts;
    });
  }
>>>>>>> develop-working

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


//   rotateImage() {
//     this.showOtherImage = !this.showOtherImage;
//     this.rotateState = this.rotateState === 'initial' ? 'rotated' : 'initial';
//   }

//   onRotateStart(event: any) {
//     if (event.toState === 'rotated') {
//       this.showOtherImage = true;
//     }
//   }
}
