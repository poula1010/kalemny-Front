import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendRowComponent, UserDto } from './friend-row/friend-row.component';
import { FriendsService } from '../../services/friends.service';
import { CommonModule } from '@angular/common';
import { Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'app-friends-bar',
  standalone: true,
  imports: [FriendRowComponent, CommonModule],
  templateUrl: './friends-bar.component.html',
  styleUrl: './friends-bar.component.css'
})
export class FriendsBarComponent implements OnInit, OnDestroy {
  constructor(private friendsService: FriendsService) { }
  friendsSubscription: Subscription;
  ngOnDestroy(): void {
    this.friendsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.friends = [];
    this.friendsSubscription = this.friendsService.friendsSubject.subscribe(friends => {
      this.friends = friends;
    })
  }
  friends: UserDto[];
}
