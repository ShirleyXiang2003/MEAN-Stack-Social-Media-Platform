import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthGuard{
    constructor(private authService: AuthService, private router: Router) {}
    canActivate() {
        const isAuth = this.authService.getisAuth();
        if (!isAuth) {
            this.router.navigate(['/login']);
        }
        return isAuth;
    }
}