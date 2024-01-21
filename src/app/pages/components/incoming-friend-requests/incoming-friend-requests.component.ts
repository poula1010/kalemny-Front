import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from '../../../testpage/friends-bar/friend-row/friend-row.component';
import { FriendsService } from '../../../services/friends.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-incoming-friend-requests',
  standalone: true,
  imports: [],
  templateUrl: './incoming-friend-requests.component.html',
  styleUrl: './incoming-friend-requests.component.css'
})
export class IncomingFriendRequestsComponent implements OnInit {
  constructor(private friendsService: FriendsService) { }

  ngOnInit(): void {

  }
  @Input()
  user: UserDto;

  rejectFriend(username: string) {
    this.friendsService.removeFriendRequest(username).subscribe(response => {
      if (response.success) {
        const newRequests = this.friendsService.pendingFriends.value.filter(user => {
          return user.username !== username;
        })
        this.friendsService.pendingFriends.next(newRequests);
      }
    })
  }

  addFriend(username: string) {
    this.friendsService.addFriend(username).subscribe(response => {
      console.log(response);
      if (response.success) {
        const newFriends = this.friendsService.friendsSubject.value.slice();
        newFriends.push(this.user);
        this.friendsService.friendsSubject.next(newFriends);
        const newRequests = this.friendsService.pendingFriends.value.filter(user => {
          return user.username !== username;
        })
        this.friendsService.pendingFriends.next(newRequests);
      }
    })
  }
}
