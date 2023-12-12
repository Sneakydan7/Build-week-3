import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../models/posts';
import { Auth } from '../auth/auth';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
URL = environment.apiURL




  constructor(private http:HttpClient) { }

getPosts(){
  return this.http.get<Posts[]>( `${this.URL}/posts`)
}


getUserId():number{
const user = localStorage.getItem('user')
if(user){
  const userData : Auth = JSON.parse(user)
  return userData.user.userId
} return 0;


}

}
