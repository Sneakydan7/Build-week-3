import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../models/posts';
import { Auth } from '../auth/auth';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
<<<<<<< HEAD
URL = environment.apiURL
posts!:Posts[]
id:number = 0
=======
  URL = environment.apiURL;

  constructor(private http: HttpClient) {}
>>>>>>> develop-working

  getPosts() {
    return this.http.get<Posts[]>(`${this.URL}/posts`);
  }

<<<<<<< HEAD

  constructor(private http:HttpClient) { }



getUserId():number{
const user = localStorage.getItem('user')
if(user){
  const userData : Auth = JSON.parse(user)
  return userData.user.id
} else {
  return 0;
}}







=======
  getUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      const userData: Auth = JSON.parse(user);
      return userData.user.id;
    }
    return 0;
  }
>>>>>>> develop-working
}
