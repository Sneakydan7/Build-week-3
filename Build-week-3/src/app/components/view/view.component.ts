import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/service/posts.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
postId!:number 
post!: Posts


  constructor(private route:ActivatedRoute , private postSrv: PostsService) {
   }

  ngOnInit(): void {
    
    this.route.params.subscribe( params =>{
      this.postId = +params['postId'];
      console.log(this.postId)    
      this.postSrv.getPostsById(this.postId).subscribe(post => {
        this.post = post;
      

      
      console.log(this.post)
     
      
    })})
  }




 

  
}
