import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from '../../../services/friends.service';
import { UserDto } from '../../../testpage/friends-bar/friend-row/friend-row.component';
import { CommonModule } from '@angular/common';
import { IncomingFriendRequestsComponent } from '../incoming-friend-requests/incoming-friend-requests.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [CommonModule, IncomingFriendRequestsComponent],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css'
})
export class PendingComponent implements OnInit, OnDestroy {
  constructor(private friendsService: FriendsService) { }
  ngOnDestroy(): void {
    this.friendReqSub.unsubscribe();
  }
  friendRequests: UserDto[];
  friendReqSub: Subscription;
  ngOnInit(): void {
    this.friendRequests = [];
    this.friendsService.getFriendRequests().subscribe(friendRequests => {
      this.friendsService.pendingFriends.next(friendRequests);
    })
    this.friendReqSub = this.friendsService.pendingFriends.subscribe(friends => {
      this.friendRequests = friends;
    })
  }

}
