import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  createPostServiceInstance: PostService;
  postItem = {};    /*这里就相当于是一个list，把所有东西装起来*/
  form: FormGroup;
  imagePreview: string;

  addPost(){
    if (this.form.invalid) {
      return;
    }
    this.postItem = {title: this.form.value.title, content: this.form.value.content};
    console.log(this.postItem);
    this.createPostServiceInstance.addItems(
      this.form.value.title, 
      this.form.value.content,
      this.form.value.image
      );
    this.form.reset();
  }

  uploadImage(event: Event) {   // 这个是一个js的特性
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.form.patchValue({image: file});    // 把前面传进来的图片绑到form里去
      this.form.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () =>{
        this.imagePreview = reader.result as string;
        console.log(this.imagePreview);
      };
      reader.readAsDataURL(file);
    }
  }

  constructor(postService : PostService){
    this.createPostServiceInstance = postService;
  }
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: Validators.required}),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],   // 输入的content的最少length是3
      }),
      image: new FormControl(null, { validators: Validators.required}),
    });
  }
}




