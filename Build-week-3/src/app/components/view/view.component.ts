import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/service/posts.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  postId!: number | null;
  post!: Posts;
  postArr: Posts[] = [];
  id: number = 0;
  URL = environment.apiURL;
  isEditing = this.postSrv.isEditing;
  isCreating = this.postSrv.isCreating;
  isViewing = this.postSrv.isViewing;
  constructor(
    private route: ActivatedRoute,
    private postSrv: PostsService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log(this.isViewing);
    console.log(this.isEditing);
    if (this.isEditing || this.isViewing) {
      this.route.params.subscribe((params) => {
        this.postId = +params['postId'];
        console.log(this.postId);

        this.id = this.postSrv.getUserId();
        this.postSrv.getPosts().subscribe((res) => {
          let update: Posts[] = res.filter((user) => user.userId === this.id);
          this.postArr = update;
          console.log(this.postArr);
          return this.postArr;
        });
        this.postSrv.getPostsById(this.postId).subscribe((post) => {
          this.post = post;

          let title = document.getElementById('title') as HTMLInputElement;
          let body = document.getElementById('body') as HTMLInputElement;

          title.value = this.post.title;
          body.value = this.post.body;
        });
      });
    }
  }
  modifyPost() {
    let title = document.getElementById('title') as HTMLInputElement;
    let body = document.getElementById('body') as HTMLInputElement;
    let image = document.getElementById('img') as HTMLInputElement;

    this.modifyRequest(
      title.value,
      body.value,
      this.id,
      this.postSrv.getUserId(),
      image.value
    );
  }

  modifyRequest(
    titleMod: string,
    bodyMod: string,
    idMod: number,
    userIdMod: number,
    imgMod: string
  ) {
    const post: Posts = {
      title: titleMod,
      body: bodyMod,
      id: idMod,
      userId: userIdMod,
      img: imgMod,
    };

    this.http
      .put<Posts>(`${this.URL}/posts/${this.postId}`, post)
      .subscribe((data) => {
        this.postId = data.id;
      });
  }

  createPost() {
    let title = document.getElementById('title-create') as HTMLInputElement;
    let body = document.getElementById('body-create') as HTMLInputElement;
    let image = document.getElementById('img-create') as HTMLInputElement;
    this.createRequest(
      this.postSrv.getUserId(),
      title.value,
      body.value,
      this.id,
      image.value
    );
  }

  createRequest(
    userIdPost: number,
    titlePost: string,
    bodyPost: string,
    idPost: number,
    imgPost: string
  ) {
    const newPost: Posts = {
      userId: userIdPost,
      title: titlePost,
      body: bodyPost,
      id: idPost,
      img: imgPost,
    };

    console.log(newPost);
    this.http.post<Posts>(`${this.URL}/posts`, newPost).subscribe();
    console.log(newPost);
  }
}
