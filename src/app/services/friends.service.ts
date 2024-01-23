import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDto } from "../testpage/friends-bar/friend-row/friend-row.component";
import { SuccessOrFailDto } from "../interfaces/SuccessOrFailDto";
import { BehaviorSubject, } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class FriendsService {
    constructor(private http: HttpClient) {
    }
    friendsSubject = new BehaviorSubject<UserDto[]>(null);
    pendingFriends = new BehaviorSubject<UserDto[]>([]);
    getFriends() {
        return this.http.get(environment.serverUrl + "/api/user/friends");
    }

    getSimilarUsers(username: string) {
        return this.http.post<UserDto[]>(environment.serverUrl + "/api/user/name", username);
    }

    getSentFriendRequests() {
        return this.http.get<UserDto[]>(environment.serverUrl + "/api/user/sentFriendRequests");
    }

    getFriendRequests() {
        return this.http.get<UserDto[]>(environment.serverUrl + "/api/user/friends/requests")
    }

    sendFriendRequest(username: string) {
        return this.http.post<SuccessOrFailDto>(environment.serverUrl + "/api/user/friends/request", username);
    }

    addFriend(username: string) {
        return this.http.post<SuccessOrFailDto>(environment.serverUrl + "/api/user/friends", username);
    }

    removeFriendRequest(username: string) {
        return this.http.delete<SuccessOrFailDto>(environment.serverUrl + "/api/user/friends/requests", {
            params: {
                "username": username
            }
        });
    }
}