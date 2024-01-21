import { HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable, exhaustMap, take } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    return authService.user.pipe(take(1),
        exhaustMap(user => {

            if (!user) {
                return next(req);
            }
            const modifiedRequest = req.clone({ headers: new HttpHeaders().set("Authorization", "Bearer " + user.token) })
            return next(modifiedRequest);
        }))
}