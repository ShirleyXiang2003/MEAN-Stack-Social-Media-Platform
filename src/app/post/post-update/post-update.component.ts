import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css'],
})
export class PostUpdateComponent implements OnInit {
  post!: PostModel;
  updatePostServiceInstance: PostService;
  private postId: string = '';
  postItem = {};

  updatePost(form: NgForm) {
    this.postItem = { title: form.value.title, content: form.value.content };

    this.updatePostServiceInstance.updateItem(
      this.postId,
      form.value.title,
      form.value.content
    );
    console.log('updatePost successfully', this.post);
  }

  constructor(postService: PostService, public route: ActivatedRoute) {
    this.updatePostServiceInstance = postService;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get('postId')!;
        this.updatePostServiceInstance
          .getItem(this.postId)
          .subscribe((postData) => {
            this.post = {
              id: postData._id.toString(),
              title: postData.title.toString(),
              content: postData.content,
            };
          });
      }
    });
  }
}