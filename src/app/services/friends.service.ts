import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDto } from "../testpage/friends-bar/friend-row/friend-row.component";
import { SuccessOrFailDto } from "../interfaces/SuccessOrFailDto";
import { BehaviorSubject, } from "rxjs";

@Injectable({ providedIn: "root" })
export class FriendsService {
    constructor(private http: HttpClient) {
    }
    friendsSubject = new BehaviorSubject<UserDto[]>(null);
    pendingFriends = new BehaviorSubject<UserDto[]>([]);
    getFriends() {
        return this.http.get("http://localhost:8081/api/user/friends");
    }

    getSimilarUsers(username: string) {
        return this.http.post<UserDto[]>("http://localhost:8081/api/user/name", username);
    }

    getSentFriendRequests() {
        return this.http.get<UserDto[]>("http://localhost:8081/api/user/sentFriendRequests");
    }

    getFriendRequests() {
        return this.http.get<UserDto[]>("http://localhost:8081/api/user/friends/requests")
    }

    sendFriendRequest(username: string) {
        return this.http.post<SuccessOrFailDto>("http://localhost:8081/api/user/friends/request", username);
    }

    addFriend(username: string) {
        return this.http.post<SuccessOrFailDto>("http://localhost:8081/api/user/friends", username);
    }

    removeFriendRequest(username: string) {
        return this.http.delete<SuccessOrFailDto>("http://localhost:8081/api/user/friends/requests", {
            params: {
                "username": username
            }
        });
    }
}