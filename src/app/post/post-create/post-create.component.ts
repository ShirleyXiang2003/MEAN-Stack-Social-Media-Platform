import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  createPostServiceInstance: PostService;
  postService: any;
  // postItem = {};    /*这里就相当于是一个list，把所有东西装起来*/
  addPost(form: NgForm){
    // this.postItem = {title:form.value.title, content:form.value.content};
    // console.log(this.postItem);
    // this.createPostServiceInstance.addItems(form.value.title, form.value.content);

    const title = form.value.title;
    const content = form.value.content;

    const post: PostModel = {
      title: title,
      content: content
    };

    // 调用PostService的addItems方法发送帖子数据到后端
    this.postService.addItems(post);
    form.resetForm();

  }

  constructor(postService : PostService){
    this.createPostServiceInstance = postService;
  }
}
