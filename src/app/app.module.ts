import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PostCreateComponent } from './post/post-create/post-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { PostListComponent } from './post/post-list/post-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PostUpdateComponent } from './post/post-update/post-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';


@NgModule({
  declarations: [   // 自己定义的放在这里
    AppComponent,
    HeaderComponent,
    PostCreateComponent,
    PostListComponent,
    PostUpdateComponent,
    SignupComponent,

  ],
  imports: [    // 写好的包放在这里
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
