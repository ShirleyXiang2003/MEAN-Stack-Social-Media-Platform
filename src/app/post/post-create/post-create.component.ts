import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  createPostServiceInstance: PostService;
  postItem = {};    /*这里就相当于是一个list，把所有东西装起来*/
  addPost(form: NgForm){
    this.postItem = {title:form.value.title, content:form.value.content};
    console.log(this.postItem);
    this.createPostServiceInstance.addItems(form.value.title, form.value.content);
  }

  constructor(postService : PostService){
    this.createPostServiceInstance = postService;
  }
}
