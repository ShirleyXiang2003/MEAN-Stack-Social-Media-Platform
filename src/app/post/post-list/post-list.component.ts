import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
    listPostServiceInstance: PostService;
     posts: PostModel[] = [
      // { title: 'first title', content: 'first content' },
      // { title: 'second title', content: 'second content' },
      // { title: 'third title', content: 'third content' },
    
    ];

    constructor(postService : PostService){
      this.listPostServiceInstance = postService;
    }
  ngOnInit(): void {
    this.posts = this.listPostServiceInstance.getItems();
    this.listPostServiceInstance.getItemUpdatedListener().subscribe((newPosts: PostModel[]) =>{
      this.posts = newPosts;
    });    // 如果有任何变化，获取它
  }

}
