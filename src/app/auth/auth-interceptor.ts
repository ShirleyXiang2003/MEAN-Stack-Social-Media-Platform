import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { AuthService } from './auth.service';
  import { Injectable } from '@angular/core';
  
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      console.log('original header', req.headers);
      const authToken = this.authService.getToken();
      console.log(authToken);
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });
      console.log(authRequest.headers);
  
      return next.handle(authRequest);
    }
}