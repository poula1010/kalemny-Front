import { UserDto } from "../testpage/friends-bar/friend-row/friend-row.component";

export class User {
    constructor(public username: string, public email: string, public id: number, public _tokenExpirationDate: number, private _token: string) { }
    get token() {
        if (!this._tokenExpirationDate || new Date().getTime() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    // toDto():UserDto{
    //     return {
    //         "email":,
    //         "id":,
    //         "image":null,
    //         "username":this.username
    //     }
    // }
}