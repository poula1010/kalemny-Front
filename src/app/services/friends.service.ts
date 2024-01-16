import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FriendsService {
    constructor(private http: HttpClient) {
    }

    getFriends() {
        return this.http.get("http://localhost:8081/api/user/friends");
    }
}