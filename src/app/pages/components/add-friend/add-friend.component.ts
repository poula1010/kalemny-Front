import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendRequestRowComponent } from '../friend-request-row/friend-request-row.component';
import { UserDto } from '../../../testpage/friends-bar/friend-row/friend-row.component';
import { FriendsService } from '../../../services/friends.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, elementAt } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [CommonModule, FriendRequestRowComponent, ReactiveFormsModule],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.css'
})
export class AddFriendComponent implements OnInit, OnDestroy {
  constructor(private friendsService: FriendsService, private authService: AuthService) { }
  friendsSubscription: Subscription;

  ngOnDestroy(): void {
    this.friendsSubscription.unsubscribe();
  }

  userSearchForm: FormGroup;
  users: UserDto[];
  usersWithSentRequestsMap: Map<number, boolean>;
  alreadyFriendsSet: Set<number>;
  UsersWithSentRequests: UserDto[];

  ngOnInit(): void {
    this.users = [];
    this.alreadyFriendsSet = new Set<number>();
    this.friendsSubscription = this.friendsService.friendsSubject.subscribe(friends => {
      for (let friend of friends) {
        this.alreadyFriendsSet.add(friend.id);
      }
    })
    this.usersWithSentRequestsMap = new Map<number, boolean>();
    this.userSearchForm = new FormGroup({
      "username": new FormControl("", [Validators.minLength(4)])
    })
    this.friendsService.getSentFriendRequests().subscribe(users => {
      for (let user of users) {
        this.usersWithSentRequestsMap.set(user.id, true);
      }
    })
  }
  test() {
    const username: string = this.userSearchForm.value.username;
    if (username.length > 2) {
      this.userNameChange(username);
    }
  }
  userNameChange(username: string) {
    this.friendsService.getSimilarUsers(username).subscribe(users => {
      const loadedUser: User = JSON.parse(localStorage.getItem("user"));
      const foundUsers = users.filter(user => {
        return user.username !== loadedUser.username;
      })
      this.users = foundUsers;
    })
  }
}
