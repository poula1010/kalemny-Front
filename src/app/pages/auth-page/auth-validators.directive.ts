import { Injectable, inject } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Observable, catchError, debounceTime, map, of, switchMap } from "rxjs";

export function MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        const control = group.get(controlName);
        const matchingControl = group.get(matchingControlName);
        if (control.value !== matchingControl.value) {
            return { unmatchedPasswords: true };
        }
        return null;
    }
}

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) { }
    validate(control: AbstractControl<any, any>): Promise<ValidationErrors> | Observable<ValidationErrors> {
        const username = control.value;

        // If the username is empty, return null (no validation error)
        if (!username) {
            return of(null);
        }
        return of(username).pipe(debounceTime(300), switchMap(value => {
            return this.authService.usernameAvailable(value).pipe(map(isAvailable => (isAvailable ? null : { usernameTaken: true })),
                catchError(() => of(null)))
        }))

    }


}

@Injectable({ providedIn: 'root' })
export class UniqueEmail implements AsyncValidator {
    constructor(private authService: AuthService) { }
    validate(control: AbstractControl<any, any>): Promise<ValidationErrors> | Observable<ValidationErrors> {
        const email = control.value;

        // If the username is empty, return null (no validation error)
        if (!email) {
            return of(null);
        }
        return of(email).pipe(debounceTime(300), switchMap(value => {
            return this.authService.emailAvailable(value).pipe(map(isAvailable => (isAvailable ? null : { emailTaken: true })),
                catchError(() => of(null)))
        }))

    }


}