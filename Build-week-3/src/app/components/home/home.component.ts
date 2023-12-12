import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/service/posts.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
posts!: Posts[] 
userId: number = 0
id:number = 0
URL = environment.apiURL


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

}


  





}
