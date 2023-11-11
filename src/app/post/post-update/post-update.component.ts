import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css'],
})
export class PostUpdateComponent implements OnInit {
  updatePostServiceInstance: PostService;
  private postId: string;
  form: FormGroup;
  imagePreviewBefore: string;
  imagePreviewAfter: string;

  constructor(postService: PostService, public route: ActivatedRoute) {
    this.updatePostServiceInstance = postService;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get('postId');
        this.form = new FormGroup({
          id: new FormControl(this.postId, { validators: Validators.required }),
          title: new FormControl(null, { validators: Validators.required }),
          content: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)],}),
          image: new FormControl(null, { validators: Validators.required }),
        });   

        this.updatePostServiceInstance
          .getItem(this.postId)
          .subscribe((postData) => {
            this.form.patchValue({
              title: postData.title,
              content: postData.content,
            });
            // 设置 imagePreview 以显示之前的图片
            this.imagePreviewBefore = postData.imagePath;
        });
      }
    });
  }

  updatePost() {

    this.updatePostServiceInstance.updateItem(
      this.postId,
      this.form.value.title,
      this.form.value.content
    );
    console.log('updatePost successfully', this.form);
    this.form.reset();
  }

  uploadImage(event: Event) {   // 这个是一个js的特性
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.form.patchValue({image: file});    // 把前面传进来的图片绑到form里去
      this.form.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () =>{
        this.imagePreviewAfter = reader.result as string;
        console.log(this.imagePreviewAfter);
      };
      reader.readAsDataURL(file);
    }
  }

}