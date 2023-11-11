import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostCreateComponent } from "./post/post-create/post-create.component";
import { PostUpdateComponent } from "./post/post-update/post-update.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
    { path: '', component: PostListComponent},
    { path: 'create', component: PostCreateComponent},
    { path: 'edit/:postId', component: PostUpdateComponent},        //每次从url里面读出来的东西都是这个postId
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule], 
})

export class AppRoutingModule {}