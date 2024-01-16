import { Injectable, OnDestroy, OnInit, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, Subscription, map, take } from "rxjs";
import { User } from "./user.model";

@Injectable({ providedIn: "root" })
class PermissionsServices implements OnDestroy, OnInit {
    constructor(private router: Router, private authService: AuthService) { }
    userSubscription: Subscription;
    user: User;
    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe(user => {
            this.user = user;
            console.log(this.user);
        })
    }
    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
            // tap(isAuth => {
            //   if (!isAuth) {
            //     this.router.navigate(['/auth']);
            //   }
            // })
        );
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> => {
    return inject(PermissionsServices).canActivate(next, state);
}