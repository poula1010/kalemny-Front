import { Component, Input } from '@angular/core';
import { UserDto } from '../../../testpage/friends-bar/friend-row/friend-row.component';
import { CommonModule } from '@angular/common';
import { FriendsService } from '../../../services/friends.service';

@Component({
  selector: 'app-friend-request-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friend-request-row.component.html',
  styleUrl: './friend-request-row.component.css'
})
export class FriendRequestRowComponent {
  constructor(private friendsService: FriendsService) { }
  @Input()
  user: UserDto;

  @Input()
  requestSent: boolean;

  @Input()
  alreadyFriends: boolean;
  sendFriendRequest(username: string) {
    this.friendsService.sendFriendRequest(username).subscribe(response => {
      if (response.success) {
        this.requestSent = true;
      }
    });
  }
}
