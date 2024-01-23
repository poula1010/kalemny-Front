import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../auth/user.model";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { UserDto } from "../testpage/friends-bar/friend-row/friend-row.component";
import { environment } from "../../environments/environment";
import { SuccessOrFailDto } from "../interfaces/SuccessOrFailDto";
export interface RegisterDto {
    name: string,
    email: string,
    username: string,
    password: string
}
interface JwtAuthResponse {
    "accessToken": string,
    "tokenType": string,
    "tokenExpiration": number,
    "userDto": UserDto
}
@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private router: Router) { }
    SIGNUP_API_URL = environment.serverUrl + "/api/auth/register";
    LOGIN_API_URL = environment.serverUrl + "/api/auth/login";
    AUTHENTICATED_API_URL = environment.serverUrl + '/api/auth/authenticated';
    USERNAMEAVAILABLE_API_URL = environment.serverUrl + '/api/auth/username'
    EMAILAVAILABLE_API_URL = environment.serverUrl + '/api/auth/email'
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    signUp(registerDto: RegisterDto) {
        return this.http.post<SuccessOrFailDto>(this.SIGNUP_API_URL, registerDto);
    }
    login(usernameOrEmail: string, password: string) {
        const loginDto = { usernameOrEmail: usernameOrEmail, password: password };
        return this.http.post<JwtAuthResponse>(this.LOGIN_API_URL, loginDto).pipe(catchError(this.pipeError), tap(resData => {
            this.handleAuth(resData.userDto.username, resData.userDto.email, resData.userDto.id, resData.tokenExpiration, resData.accessToken);
        }));
    }
    private handleAuth(name: string, email: string, localId: number, _tokenExpirationDate: number, token: string) {
        const user = new User(name, email, localId, _tokenExpirationDate, token)
        this.user.next(user);
        this.autoLogout(_tokenExpirationDate - Date.now());
        localStorage.setItem('user', JSON.stringify(user))
    }
    isAuthenticated() {
        return this.http.get(this.AUTHENTICATED_API_URL);
    }
    usernameAvailable(username: string) {
        return this.http.get<boolean>(this.USERNAMEAVAILABLE_API_URL, { params: { username: username } });
    }
    emailAvailable(email: string) {
        return this.http.get<boolean>(this.EMAILAVAILABLE_API_URL, { params: { email: email } })
    }
    autologin() {

        const userData: {
            username: string,
            email: string,
            _tokenExpirationDate: number,
            _token: string,
            id: number;
        } = JSON.parse(localStorage.getItem('user'));

        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.username,
            userData.email,
            userData.id,
            userData._tokenExpirationDate,
            userData._token
        );
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
                userData._tokenExpirationDate -
                new Date().getTime();
            this.autoLogout(expirationDuration);
            this.router.navigate([""])
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    private pipeError(error: HttpErrorResponse) {
        let errorMessage = 'an unknown error has occured!';
        if (!error.error || !error.error.error) {
            return throwError(() => new Error(errorMessage));
        }
        switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'this email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'this email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'wrong password';
                break;
        }
        return throwError(() => new Error(errorMessage));
    }
}