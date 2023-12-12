import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/service/posts.service';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
posts: Posts[] | undefined
userId: number = 0

  constructor(private postsSrv: PostsService , private authSrv: AuthService) { }

  ngOnInit(): void {
 this.userId = this.postsSrv.getUserId();
 this.postsSrv.getPosts().subscribe((posts: Posts[]) => {
  this.posts = posts
})


  }

}
