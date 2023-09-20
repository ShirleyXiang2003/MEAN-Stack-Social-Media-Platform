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
     posts: PostModel[] = [];

    constructor(postService : PostService){
      this.listPostServiceInstance = postService;
    }

    onDelete(postId: string) {
      console.log(postId);
      this.listPostServiceInstance.deleteItem(postId);
    }

    ngOnInit(): void {
      this.listPostServiceInstance.getItems();
      this.listPostServiceInstance.getItemUpdatedListener().subscribe((newPosts: PostModel[]) =>{
        this.posts = newPosts;
      });    // 如果有任何变化，获取它
    }

}
