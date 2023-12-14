import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../models/posts';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  URL = environment.apiURL;
  isEditing: boolean = false;
  isCreating: boolean = false;
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Posts[]>(`${this.URL}/posts`);
  }

  getPostsById(id: number) {
    return this.http.get<Posts>(`${this.URL}/posts/${id}`);
  }

  getUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      const userData: Auth = JSON.parse(user);
      return userData.user.id;
    }
    return 0;
  }
}
