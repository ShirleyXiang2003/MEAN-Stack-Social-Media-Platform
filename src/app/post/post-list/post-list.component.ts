import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  listPostServiceInstance: PostService;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  posts: PostModel[] = [];

  constructor(postService: PostService, private authService: AuthService) {
    this.listPostServiceInstance = postService;
  }

  onDelete(postId: string) {
    console.log(postId);
    this.listPostServiceInstance.deleteItem(postId);
  }

  ngOnInit() {

    this.listPostServiceInstance.getItems();
    this.listPostServiceInstance
      .getItemUpdatedListener()
      .subscribe((newPosts: PostModel[]) => {
        this.posts = newPosts;
      });
    this.userIsAuthenticated = this.authService.getisAuth();  // 看下是不是验证过的
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}